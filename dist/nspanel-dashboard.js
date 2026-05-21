/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = globalThis, re = Mt.ShadowRoot && (Mt.ShadyCSS === void 0 || Mt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), me = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (re && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = me.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && me.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rs = (e) => new De(typeof e == "string" ? e : e + "", void 0, ie), T = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, s, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[i + 1], e[0]);
  return new De(n, e, ie);
}, is = (e, t) => {
  if (re) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const r = document.createElement("style"), s = Mt.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = n.cssText, e.appendChild(r);
  }
}, be = re ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules) n += r.cssText;
  return rs(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: as, defineProperty: os, getOwnPropertyDescriptor: ls, getOwnPropertyNames: cs, getOwnPropertySymbols: ds, getPrototypeOf: ps } = Object, Lt = globalThis, ye = Lt.trustedTypes, hs = ye ? ye.emptyScript : "", us = Lt.reactiveElementPolyfillSupport, ft = (e, t) => e, Tt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? hs : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, ae = (e, t) => !as(e, t), _e = { attribute: !0, type: String, converter: Tt, reflect: !1, useDefault: !1, hasChanged: ae };
Symbol.metadata ??= Symbol("metadata"), Lt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Z = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = _e) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, n);
      s !== void 0 && os(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    const { get: s, set: i } = ls(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: s, set(a) {
      const o = s?.call(this);
      i?.call(this, a), this.requestUpdate(t, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ft("elementProperties"))) return;
    const t = ps(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ft("properties"))) {
      const n = this.properties, r = [...cs(n), ...ds(n)];
      for (const s of r) this.createProperty(s, n[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [r, s] of n) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const s = this._$Eu(n, r);
      s !== void 0 && this._$Eh.set(s, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r) n.unshift(be(s));
    } else t !== void 0 && n.push(be(t));
    return n;
  }
  static _$Eu(t, n) {
    const r = n.attribute;
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
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return is(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, r) {
    this._$AK(t, r);
  }
  _$ET(t, n) {
    const r = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, r);
    if (s !== void 0 && r.reflect === !0) {
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : Tt).toAttribute(n, r.type);
      this._$Em = t, i == null ? this.removeAttribute(s) : this.setAttribute(s, i), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const i = r.getPropertyOptions(s), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Tt;
      this._$Em = s;
      const o = a.fromAttribute(n, i.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, n, r, s = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (i = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? ae)(i, n) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: r, reflect: s, wrapped: i }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? n ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (n = void 0), this._$AL.set(t, n)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
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
        for (const [s, i] of this._$Ep) this[s] = i;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, i] of r) {
        const { wrapped: a } = i, o = this[s];
        a !== !0 || this._$AL.has(s) || o === void 0 || this.C(s, void 0, i, o);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Z.elementStyles = [], Z.shadowRootOptions = { mode: "open" }, Z[ft("elementProperties")] = /* @__PURE__ */ new Map(), Z[ft("finalized")] = /* @__PURE__ */ new Map(), us?.({ ReactiveElement: Z }), (Lt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = globalThis, we = (e) => e, Bt = oe.trustedTypes, xe = Bt ? Bt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Re = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, Oe = "?" + O, fs = `<${Oe}>`, Y = document, vt = () => Y.createComment(""), mt = (e) => e === null || typeof e != "object" && typeof e != "function", le = Array.isArray, gs = (e) => le(e) || typeof e?.[Symbol.iterator] == "function", Kt = `[ 	
\f\r]`, ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, Ce = />/g, W = RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, ke = /"/g, Fe = /^(?:script|style|textarea|title)$/i, vs = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), p = vs(1), X = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), K = Y.createTreeWalker(Y, 129);
function Ue(e, t) {
  if (!le(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xe !== void 0 ? xe.createHTML(t) : t;
}
const ms = (e, t) => {
  const n = e.length - 1, r = [];
  let s, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ut;
  for (let o = 0; o < n; o++) {
    const l = e[o];
    let d, c, u = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, c = a.exec(l), c !== null); ) f = a.lastIndex, a === ut ? c[1] === "!--" ? a = $e : c[1] !== void 0 ? a = Ce : c[2] !== void 0 ? (Fe.test(c[2]) && (s = RegExp("</" + c[2], "g")), a = W) : c[3] !== void 0 && (a = W) : a === W ? c[0] === ">" ? (a = s ?? ut, u = -1) : c[1] === void 0 ? u = -2 : (u = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? W : c[3] === '"' ? ke : Ee) : a === ke || a === Ee ? a = W : a === $e || a === Ce ? a = ut : (a = W, s = void 0);
    const h = a === W && e[o + 1].startsWith("/>") ? " " : "";
    i += a === ut ? l + fs : u >= 0 ? (r.push(d), l.slice(0, u) + Re + l.slice(u) + O + h) : l + O + (u === -2 ? o : h);
  }
  return [Ue(e, i + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class bt {
  constructor({ strings: t, _$litType$: n }, r) {
    let s;
    this.parts = [];
    let i = 0, a = 0;
    const o = t.length - 1, l = this.parts, [d, c] = ms(t, n);
    if (this.el = bt.createElement(d, r), K.currentNode = this.el.content, n === 2 || n === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = K.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Re)) {
          const f = c[a++], h = s.getAttribute(u).split(O), g = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: i, name: g[2], strings: h, ctor: g[1] === "." ? ys : g[1] === "?" ? _s : g[1] === "@" ? ws : Dt }), s.removeAttribute(u);
        } else u.startsWith(O) && (l.push({ type: 6, index: i }), s.removeAttribute(u));
        if (Fe.test(s.tagName)) {
          const u = s.textContent.split(O), f = u.length - 1;
          if (f > 0) {
            s.textContent = Bt ? Bt.emptyScript : "";
            for (let h = 0; h < f; h++) s.append(u[h], vt()), K.nextNode(), l.push({ type: 2, index: ++i });
            s.append(u[f], vt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Oe) l.push({ type: 2, index: i });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(O, u + 1)) !== -1; ) l.push({ type: 7, index: i }), u += O.length - 1;
      }
      i++;
    }
  }
  static createElement(t, n) {
    const r = Y.createElement("template");
    return r.innerHTML = t, r;
  }
}
function tt(e, t, n = e, r) {
  if (t === X) return t;
  let s = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const i = mt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== i && (s?._$AO?.(!1), i === void 0 ? s = void 0 : (s = new i(e), s._$AT(e, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = s : n._$Cl = s), s !== void 0 && (t = tt(e, s._$AS(e, t.values), s, r)), t;
}
class bs {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: r } = this._$AD, s = (t?.creationScope ?? Y).importNode(n, !0);
    K.currentNode = s;
    let i = K.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new wt(i, i.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (d = new xs(i, this, t)), this._$AV.push(d), l = r[++o];
      }
      a !== l?.index && (i = K.nextNode(), a++);
    }
    return K.currentNode = Y, s;
  }
  p(t) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
}
class wt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, r, s) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = tt(this, t, n), mt(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = bt.createElement(Ue(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const i = new bs(s, this), a = i.u(this.options);
      i.p(n), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let n = Ae.get(t.strings);
    return n === void 0 && Ae.set(t.strings, n = new bt(t)), n;
  }
  k(t) {
    le(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, s = 0;
    for (const i of t) s === n.length ? n.push(r = new wt(this.O(vt()), this.O(vt()), this, this.options)) : r = n[s], r._$AI(i), s++;
    s < n.length && (this._$AR(r && r._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const r = we(t).nextSibling;
      we(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, r, s, i) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = k;
  }
  _$AI(t, n = this, r, s) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = tt(this, t, n, 0), a = !mt(t) || t !== this._$AH && t !== X, a && (this._$AH = t);
    else {
      const o = t;
      let l, d;
      for (t = i[0], l = 0; l < i.length - 1; l++) d = tt(this, o[r + l], n, l), d === X && (d = this._$AH[l]), a ||= !mt(d) || d !== this._$AH[l], d === k ? t = k : t !== k && (t += (d ?? "") + i[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ys extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class _s extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class ws extends Dt {
  constructor(t, n, r, s, i) {
    super(t, n, r, s, i), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = tt(this, t, n, 0) ?? k) === X) return;
    const r = this._$AH, s = t === k && r !== k || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== k && (r === k || s);
    s && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class xs {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    tt(this, t);
  }
}
const $s = oe.litHtmlPolyfillSupport;
$s?.(bt, wt), (oe.litHtmlVersions ??= []).push("3.3.3");
const Cs = (e, t, n) => {
  const r = n?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const i = n?.renderBefore ?? null;
    r._$litPart$ = s = new wt(t.insertBefore(vt(), i), i, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis;
class A extends Z {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Cs(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return X;
  }
}
A._$litElement$ = !0, A.finalized = !0, ce.litElementHydrateSupport?.({ LitElement: A });
const Es = ce.litElementPolyfillSupport;
Es?.({ LitElement: A });
(ce.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ks = { attribute: !0, type: String, converter: Tt, reflect: !1, hasChanged: ae }, As = (e = ks, t, n) => {
  const { kind: r, metadata: s } = n;
  let i = globalThis.litPropertyMetadata.get(s);
  if (i === void 0 && globalThis.litPropertyMetadata.set(s, i = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(n.name, e), r === "accessor") {
    const { name: a } = n;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, e, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = n;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function x(e) {
  return (t, n) => typeof n == "object" ? As(e, t, n) : ((r, s, i) => {
    const a = s.hasOwnProperty(i);
    return s.constructor.createProperty(i, r), a ? Object.getOwnPropertyDescriptor(s, i) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(e) {
  return x({ ...e, state: !0, attribute: !1 });
}
const I = T`
  :host {
    /* --- Light Mode --- */
    --nsp-bg:            #FFFFFF;
    --nsp-bg-secondary:  #F2F2F7;
    --nsp-bg-tertiary:   #E5E5EA;
    --nsp-surface:       rgba(255,255,255,0.98);
    --nsp-surface-2:     rgba(255,255,255,0.95);
    --nsp-surface-3:     rgba(255,255,255,0.78);

    --nsp-text-1:        #000000;
    --nsp-text-2:        #3C3C43CC;
    --nsp-text-3:        #3C3C4399;
    --nsp-separator:     rgba(60,60,67,0.12);

    --nsp-accent:        #64D2FF;
    --nsp-green:         #34C759;
    --nsp-red:           #FF3B30;
    --nsp-orange:        #FF9500;
    --nsp-yellow:        #FFCC00;
    --nsp-teal:          #5AC8FA;
    --nsp-purple:        #AF52DE;

    --nsp-card-border:   rgba(0,0,0,0.07);
    --nsp-card-shadow:   0 1px 4px rgba(0,0,0,0.06);

    --nsp-glow-1: rgba(0,122,255,0.16);
    --nsp-glow-2: rgba(175,82,222,0.11);
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

    --nsp-accent:        #64D2FF;
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
`, lt = T`
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
    background: var(--nsp-bg-secondary);
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
var Ss = Object.defineProperty, Ps = Object.getOwnPropertyDescriptor, Rt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Ps(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ss(t, n, s), s;
};
const Ms = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z",
  security: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
  wifi: "M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
}, Se = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security",
  wifi: "WiFi"
};
let et = class extends A {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home", this.customLabels = {};
  }
  _tap(e) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: e }, bubbles: !0, composed: !0 }));
  }
  render() {
    return p`
      <nav>
        ${this.pages.map((e) => p`
          <button
            class=${e === this.activePage ? "active" : ""}
            @click=${() => this._tap(e)}
            aria-label=${Se[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${Ms[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Se[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
et.styles = [I, T`
    :host { display: block; }

    nav {
      height: var(--nsp-nav-h);
      background: var(--nsp-bg);
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
      position: relative;
    }

    button.active {
      color: var(--nsp-accent);
    }

    button.active::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 72px;
      height: 48px;
      background: rgba(100, 210, 255, 0.18);
      border-radius: 14px;
    }

    button svg {
      flex-shrink: 0;
      position: relative;
    }

    span {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: -0.01em;
      position: relative;
    }
  `];
Rt([
  x({ type: Array })
], et.prototype, "pages", 2);
Rt([
  x({ type: String })
], et.prototype, "activePage", 2);
Rt([
  x({ attribute: !1 })
], et.prototype, "customLabels", 2);
et = Rt([
  N("nspanel-bottom-nav")
], et);
var Ts = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, Q = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Bs(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ts(t, n, s), s;
};
const Ns = {
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
}, zs = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function Is(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const n = t.lastIndexOf("="), r = t.slice(0, n).split(",").map((i) => i.trim().toLowerCase()).filter(Boolean), s = t.slice(n + 1).trim() || "🗑️";
    return { keywords: r, icon: s };
  });
}
function At(e, t) {
  const n = Is(t ?? zs), r = e.toLowerCase();
  for (const s of n)
    if (s.keywords.some((i) => r.includes(i))) return s.icon;
  return "🗑️";
}
function Yt(e) {
  const t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  const n = new Date(t);
  n.setDate(t.getDate() + 1);
  const r = new Date(e);
  if (r.setHours(0, 0, 0, 0), r.getTime() === t.getTime()) return "Heute";
  if (r.getTime() === n.getTime()) return "Morgen";
  const s = Math.round((r.getTime() - t.getTime()) / 864e5);
  return s > 0 && s <= 6 ? e.toLocaleDateString("de-AT", { weekday: "short" }) : `+${s}d`;
}
let R = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._time = "", this._date = "", this._trashChip = null, this._trashFetched = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._tick(), this._clockTimer = window.setInterval(() => this._tick(), 1e3), this._trashTimer = window.setInterval(() => this._fetchTrash(), 30 * 60 * 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._clockTimer), clearInterval(this._trashTimer);
  }
  updated(e) {
    e.has("hass") && this.hass && !this._trashFetched && this.config?.trash_entity && (this._trashFetched = !0, this._fetchTrash());
  }
  _tick() {
    const e = /* @__PURE__ */ new Date();
    this._time = e.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = e.toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "short" });
  }
  _presenceChip() {
    const e = this.config ?? {}, t = this.hass, n = e.person_1 ? t?.states[e.person_1]?.state === "home" : !1, r = e.person_2 ? t?.states[e.person_2]?.state === "home" : !1, s = [n ? "👨🏻" : "", r ? "👩🏻" : ""].filter(Boolean).join("");
    return s ? p`<span class="chip">${s}</span>` : "";
  }
  async _fetchTrash() {
    const e = this.config?.trash_entity;
    if (!e || !this.hass) return;
    try {
      const a = /* @__PURE__ */ new Date();
      a.setHours(0, 0, 0, 0);
      const o = new Date(a);
      o.setDate(o.getDate() + 14);
      const l = await this.hass.fetchWithAuth(
        `/api/calendars/${e}?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(o.toISOString())}`
      );
      if (l.ok) {
        const d = await l.json();
        if (d.length > 0) {
          const c = /* @__PURE__ */ new Map();
          for (const b of d) {
            const $ = b.start.date ?? b.start.dateTime ?? "", v = new Date($);
            if (isNaN(v.getTime())) continue;
            v.setHours(0, 0, 0, 0);
            const _ = v.toISOString();
            c.has(_) || c.set(_, []), c.get(_).push(b.summary);
          }
          const [u, f] = [...c.entries()].sort((b, $) => b[0].localeCompare($[0]))[0], h = this.config?.trash_mapping, g = [...new Set(f.map((b) => At(b, h)))].join("");
          this._trashChip = `${g} ${Yt(new Date(u))}`;
          return;
        }
        this._trashChip = null;
        return;
      }
    } catch {
    }
    const t = this.hass.states[e];
    if (!t) return;
    const n = this.config?.trash_mapping;
    if (t.state === "on") {
      const a = t.attributes.message;
      this._trashChip = `${a ? At(a, n) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const a = t.attributes.start_time, o = t.attributes.message;
      if (a) {
        const l = new Date(a);
        if (!isNaN(l.getTime())) {
          this._trashChip = `${o ? At(o, n) : "🗑️"} ${Yt(l)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const s = parseInt(t.state, 10);
    if (!isNaN(s) && String(s) === t.state.trim()) {
      const a = t.attributes.message, o = s === 0 ? "Heute" : s === 1 ? "Morgen" : `+${s}d`;
      this._trashChip = `${a ? At(a, n) : "🗑️"} ${o}`;
      return;
    }
    const i = new Date(t.state);
    isNaN(i.getTime()) || (this._trashChip = `🗑️ ${Yt(i)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = e.weather_entity ? t?.states[e.weather_entity] : null, r = n?.attributes.temperature, s = n ? Ns[n.state] ?? "🌡️" : null;
    return p`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">${this._presenceChip()}</div>
        <div class="center">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${s ? p`<span class="chip">${s}${r != null ? ` ${Math.round(r)}°` : ""}</span>` : ""}
          ${this._trashChip ? p`<span class="chip">${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
R.styles = [I, T`
    .bar {
      height: 38px;
      padding: 0 var(--nsp-s3);
      display: flex;
      align-items: center;
      flex-shrink: 0;
      background: var(--nsp-bg-secondary);
    }
    .left {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
    }
    .center {
      flex-shrink: 0;
      display: flex;
      align-items: baseline;
      gap: 6px;
    }
    .right {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
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
    .chip {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
    }
  `];
Q([
  x({ attribute: !1 })
], R.prototype, "hass", 2);
Q([
  x({ attribute: !1 })
], R.prototype, "config", 2);
Q([
  x({ type: Boolean })
], R.prototype, "dark", 2);
Q([
  S()
], R.prototype, "_time", 2);
Q([
  S()
], R.prototype, "_date", 2);
Q([
  S()
], R.prototype, "_trashChip", 2);
R = Q([
  N("nspanel-status-bar")
], R);
var Ls = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, de = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Ds(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ls(t, n, s), s;
};
let yt = class extends A {
  constructor() {
    super(...arguments), this.cameraEntity = "";
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return p`
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

          ${this.cameraEntity ? p`
            <div class="stream">
              <ha-camera-stream
                .hass=${this.hass}
                .stateObj=${this.hass.states[this.cameraEntity]}
                muted
                autoPlay
              ></ha-camera-stream>
            </div>
          ` : p`
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
yt.styles = [I, T`
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
de([
  x({ attribute: !1 })
], yt.prototype, "hass", 2);
de([
  x({ type: String })
], yt.prototype, "cameraEntity", 2);
yt = de([
  N("nspanel-doorbell-popup")
], yt);
var Rs = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, ct = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Os(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Rs(t, n, s), s;
};
function Fs(e) {
  return e.start.date ? "Ganztag" : new Date(e.start.dateTime).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
}
const Us = {
  cleaning: "Saugt",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
};
let U = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._calEvents = [], this._dishMax = 0, this._calFetched = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._calTimer = window.setInterval(() => this._fetchCalendar(), 15 * 60 * 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._calTimer);
  }
  updated(e) {
    if (e.has("hass") && this.hass) {
      !this._calFetched && this.config?.calendar_entity && (this._calFetched = !0, this._fetchCalendar());
      const t = this.config?.dishwasher_entity;
      if (t) {
        const n = parseFloat(this.hass.states[t]?.state ?? "0") || 0;
        n > this._dishMax && (this._dishMax = n), n === 0 && (this._dishMax = 0);
      }
    }
  }
  async _fetchCalendar() {
    const e = this.config?.calendar_entity;
    if (!e || !this.hass) return;
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    const n = /* @__PURE__ */ new Date();
    n.setHours(23, 59, 59, 999);
    const r = `/api/calendars/${e}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(n.toISOString())}`;
    try {
      const s = await this.hass.fetchWithAuth(r);
      if (s.ok) {
        this._calEvents = await s.json();
        return;
      }
    } catch {
    }
    try {
      const s = await this.hass.callWS({
        type: "calendar/event/list",
        entity_id: e,
        start_date_time: t.toISOString(),
        end_date_time: n.toISOString()
      });
      this._calEvents = s ?? [];
    } catch {
      this._calEvents = [];
    }
  }
  _toggleLight(e) {
    const t = this.hass?.states[e]?.state === "on";
    this.hass.callService(e.split(".")[0], t ? "turn_off" : "turn_on", { entity_id: e });
  }
  _vacuumAction(e, t) {
    const n = t === "cleaning" || t === "returning" || t === "paused" ? "return_to_base" : "start";
    this.hass.callService("vacuum", n, { entity_id: e });
  }
  _adjustTemp(e) {
    const t = this.config?.thermostat_entity;
    if (!t || !this.hass) return;
    const n = this.hass.states[t]?.attributes.temperature;
    n != null && this.hass.callService("climate", "set_temperature", {
      entity_id: t,
      temperature: Math.round((n + e) * 2) / 2
    });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = e.garden_light ? t?.states[e.garden_light] : null, r = e.light_2 ? t?.states[e.light_2] : null, s = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, i = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, a = i && parseFloat(i.state) || 0, o = a > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - a / this._dishMax) * 100, 100))) : 0, l = e.indoor_temp_entity ? t?.states[e.indoor_temp_entity] : null, d = e.thermostat_entity ? t?.states[e.thermostat_entity] : null, c = l ? parseFloat(l.state) : d ? d.attributes.current_temperature ?? null : null, u = d ? d.attributes.temperature ?? null : null, f = c != null || u != null, h = e.ev_entity ? t?.states[e.ev_entity] : null, g = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, b = h ? parseFloat(h.state) : NaN, $ = isNaN(b) ? null : b, v = g ? parseFloat(g.state) : NaN, _ = isNaN(v) ? null : Math.round(v), y = /* @__PURE__ */ new Date(), m = this._calEvents.filter((w) => w.start.date ? !0 : (w.end.dateTime ? new Date(w.end.dateTime) : new Date(w.start.dateTime)) > y);
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <div class="main-grid">

          <!-- Left: Calendar -->
          <div class="cal-card">
            <div class="cal-header">Heute</div>
            <div class="cal-list">
              ${m.length > 0 ? m.map((w) => p`
                  <div class="cal-event">
                    <div class="cal-dot"></div>
                    <div class="cal-body">
                      <div class="cal-title">${w.summary}</div>
                      <div class="cal-time">${Fs(w)}</div>
                    </div>
                  </div>
                `) : p`<div class="cal-empty">Keine weiteren Termine</div>`}
            </div>
          </div>

          <!-- Right: Controls -->
          <div class="controls-col">

            <!-- Temperature + threshold -->
            ${f ? p`
              <div class="temp-card">
                ${c != null ? p`
                  <div class="temp-current">${(Math.round(c * 10) / 10).toFixed(1)}°</div>
                ` : ""}
                ${u != null ? p`
                  ${c != null ? p`<div class="temp-divider"></div>` : ""}
                  <div class="temp-stepper">
                    <button class="step-btn" @click=${() => this._adjustTemp(-0.5)}>−</button>
                    <span class="step-val">${u.toFixed(1)}°</span>
                    <button class="step-btn" @click=${() => this._adjustTemp(0.5)}>+</button>
                  </div>
                  <div class="temp-hint">Heizgrenze</div>
                ` : ""}
              </div>
            ` : ""}

            ${n ? this._renderLight(e.garden_light, n, e.garden_light_icon ?? "💡") : ""}
            ${r ? this._renderLight(e.light_2, r, e.light_2_icon ?? "💡") : ""}

            ${s ? p`
              <button class="ctrl-btn vac-btn ${s.state === "cleaning" ? "active" : ""}"
                @click=${() => this._vacuumAction(e.vacuum_entity, s.state)}>
                <span class="ctrl-icon">🤖</span>
                <span class="ctrl-name">${Us[s.state] ?? s.state}</span>
                ${s.state !== "error" && s.state !== "returning" ? p`
                  <div class="vac-action ${s.state === "cleaning" || s.state === "paused" ? "stop" : "start"}">
                    ${s.state === "cleaning" || s.state === "paused" ? p`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 6h12v12H6z"/></svg>` : p`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>`}
                  </div>
                ` : ""}
              </button>
            ` : ""}

            ${a > 0 ? p`
              <div class="ctrl-btn dish-btn">
                <span class="ctrl-icon">🍽️</span>
                <div class="dish-track">
                  <div class="dish-fill" style="width:${o}%"></div>
                </div>
                <span class="dish-time">${Math.round(a)} min</span>
              </div>
            ` : ""}

          </div>
        </div>

        <!-- EV bar: full width, only when connected -->
        ${$ != null ? p`
          <div class="ev-bar">
            <span class="ev-label">🚗 ${Math.round($)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${$}%"></div></div>
            ${_ != null ? p`<span class="ev-km">${_} km</span>` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderLight(e, t, n) {
    const r = t.state === "on", s = t.attributes.friendly_name ?? e.split(".")[1];
    return p`
      <button class="ctrl-btn" @click=${() => this._toggleLight(e)}>
        <span class="ctrl-icon">${n}</span>
        <span class="ctrl-name">${s}</span>
        <div class="toggle-track ${r ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
};
U.styles = [I, lt, T`
    .page { gap: var(--nsp-s2); }

    /* ── 50/50 grid ── */
    .main-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
      min-height: 0;
    }

    /* ── Calendar ── */
    .cal-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      min-height: 0;
      overflow: hidden;
    }
    .cal-header {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
      flex-shrink: 0;
    }
    .cal-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 0;
    }
    .cal-event {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      flex-shrink: 0;
    }
    .cal-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--nsp-accent);
      margin-top: 5px;
      flex-shrink: 0;
    }
    .cal-body { min-width: 0; }
    .cal-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cal-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 1px;
    }
    .cal-empty {
      flex: 1;
      display: flex;
      align-items: center;
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
    }

    /* ── Controls column ── */
    .controls-col {
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }

    /* ── Temperature card ── */
    .temp-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 10px var(--nsp-s3) 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }
    .temp-current {
      font-family: var(--nsp-font);
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .temp-divider {
      width: 100%;
      height: 1px;
      background: var(--nsp-surface-3);
      margin: 4px 0 2px;
    }
    .temp-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 4px;
    }
    .step-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: var(--nsp-surface-3);
      font-family: var(--nsp-font);
      font-size: 20px;
      font-weight: 300;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 1;
    }
    .step-btn:active { background: var(--nsp-accent); color: white; }
    .step-val {
      font-family: var(--nsp-font);
      font-size: 16px;
      font-weight: 700;
      color: var(--nsp-text-1);
      text-align: center;
      flex: 1;
    }
    .temp-hint {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-top: 1px;
    }

    /* ── Generic control button ── */
    .ctrl-btn {
      width: 100%;
      box-sizing: border-box;
      height: 44px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 var(--nsp-s2);
      flex-shrink: 0;
    }
    .ctrl-btn:not(.dish-btn):active { opacity: 0.7; }
    .ctrl-icon { font-size: 14px; flex-shrink: 0; }
    .ctrl-name {
      flex: 1;
      font-size: 11px;
      font-weight: 500;
      color: var(--nsp-text-1);
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .toggle-track {
      width: 36px;
      height: 22px;
      border-radius: 11px;
      background: var(--nsp-surface-3);
      position: relative;
      flex-shrink: 0;
      transition: background 0.25s;
    }
    .toggle-track.on { background: var(--nsp-green); }
    .toggle-knob {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.25s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .toggle-track.on .toggle-knob { transform: translateX(14px); }

    .vac-btn.active {
      background: rgba(48,209,88,0.12);
      border-color: rgba(48,209,88,0.3);
    }
    .vac-action {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .vac-action.start { background: var(--nsp-green);  color: white; }
    .vac-action.stop  { background: var(--nsp-orange); color: white; }

    .dish-btn { cursor: default; }
    .dish-track {
      flex: 1;
      height: 3px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .dish-fill {
      height: 100%;
      background: var(--nsp-teal);
      border-radius: 2px;
    }
    .dish-time {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      flex-shrink: 0;
    }

    /* ── EV bar ── */
    .ev-bar {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      height: 36px;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: 0 var(--nsp-s3);
      flex-shrink: 0;
    }
    .ev-label {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-track {
      flex: 1;
      height: 5px;
      background: var(--nsp-surface-3);
      border-radius: 3px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 3px;
    }
    .ev-km {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      white-space: nowrap;
      flex-shrink: 0;
    }
  `];
ct([
  x({ attribute: !1 })
], U.prototype, "hass", 2);
ct([
  x({ attribute: !1 })
], U.prototype, "config", 2);
ct([
  x({ type: Boolean })
], U.prototype, "dark", 2);
ct([
  S()
], U.prototype, "_calEvents", 2);
ct([
  S()
], U.prototype, "_dishMax", 2);
U = ct([
  N("nspanel-page-home")
], U);
var Hs = Object.defineProperty, js = Object.getOwnPropertyDescriptor, Ot = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? js(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Hs(t, n, s), s;
};
let st = class extends A {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setTemp(e) {
    const t = this.config?.thermostat_entity;
    if (!t) return;
    const n = this.hass?.states[t]?.attributes.temperature ?? 20;
    this.hass.callService("climate", "set_temperature", {
      entity_id: t,
      temperature: Math.round((n + e) * 2) / 2
    });
  }
  _setMode(e) {
    const t = this.config?.thermostat_entity;
    t && this.hass.callService("climate", "set_hvac_mode", { entity_id: t, hvac_mode: e });
  }
  render() {
    const e = this.config?.thermostat_entity, t = e ? this.hass?.states[e] : null;
    if (!t) return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const n = t.attributes.friendly_name, r = t.attributes.current_temperature, s = t.attributes.temperature, i = t.state, a = i === "heat", o = a && r != null && s != null && r < s - 0.3, l = a && r != null && s != null && Math.abs(r - s) <= 0.3;
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <div class="circle-wrap">
          <div class="temp-circle ${a ? "heating" : ""}">
            <div class="cur-temp">${r != null ? `${r.toFixed(1)}°` : "–"}</div>
            <div class="cur-label">${n ?? "aktuell"}</div>
            ${o ? p`<div class="heat-status heating-active">heizt…</div>` : l ? p`<div class="heat-status heating-done">✓ erreicht</div>` : ""}
          </div>
        </div>

        <div class="setpoint-row">
          <button class="btn-round" @click=${() => this._setTemp(-0.5)}>−</button>
          <div class="setpoint">
            <div class="set-val">${s != null ? `${s}°` : "–"}</div>
            <div class="set-label">Zieltemperatur</div>
          </div>
          <button class="btn-round" @click=${() => this._setTemp(0.5)}>+</button>
        </div>

        <div class="mode-row">
          <button class="mode-btn ${i === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${a ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
st.styles = [I, lt, T`
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
      max-width: 130px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .heat-status {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 600;
      margin-top: 4px;
      letter-spacing: 0.02em;
    }
    .heating-active { color: var(--nsp-orange); }
    .heating-done   { color: var(--nsp-green);  }
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
Ot([
  x({ attribute: !1 })
], st.prototype, "hass", 2);
Ot([
  x({ attribute: !1 })
], st.prototype, "config", 2);
Ot([
  x({ type: Boolean })
], st.prototype, "dark", 2);
st = Ot([
  N("nspanel-page-climate")
], st);
var Vs = Object.defineProperty, Ws = Object.getOwnPropertyDescriptor, xt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Ws(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Vs(t, n, s), s;
};
const Ks = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let q = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._moving = {}, this._movingFrom = {};
  }
  updated(e) {
    if (!e.has("hass") || !this.hass) return;
    const t = { ...this._moving };
    let n = !1;
    for (const r of Object.keys(t)) {
      const s = this.hass.states[r];
      if (!s) continue;
      const i = t[r], a = s.state, o = s.attributes.current_position, l = this._movingFrom[r];
      (i === "up" ? a === "open" || o === 100 : i === "down" ? a === "closed" || o === 0 : !1) && a !== l && (delete t[r], delete this._movingFrom[r], n = !0);
    }
    n && (this._moving = t);
  }
  _cover(e, t) {
    if (this.hass.callService("cover", t, { entity_id: e }), t === "open_cover")
      this._movingFrom[e] = this.hass.states[e]?.state ?? "", this._moving = { ...this._moving, [e]: "up" };
    else if (t === "close_cover")
      this._movingFrom[e] = this.hass.states[e]?.state ?? "", this._moving = { ...this._moving, [e]: "down" };
    else {
      const n = { ...this._moving };
      delete n[e], delete this._movingFrom[e], this._moving = n;
    }
  }
  _scene(e) {
    const t = e.split(".")[0];
    this.hass.callService(t === "scene" ? "scene" : "script", "turn_on", { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = Ks.map((i) => e[i]).filter((i) => !!i), r = n.filter((i) => t?.states[i]?.state === "open").length, s = n.filter((i) => t?.states[i]?.state === "closed").length;
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="summary-bar">
          <span class="summary-text">
            <span class="summary-open">${r} Offen</span>
            <span class="summary-dot"> · </span>
            <span class="summary-closed">${s} Zu</span>
          </span>
          <div class="summary-actions">
            ${e.scene_up ? p`<button class="pill-btn" @click=${() => this._scene(e.scene_up)}>↑ Alle</button>` : ""}
            ${e.scene_down ? p`<button class="pill-btn" @click=${() => this._scene(e.scene_down)}>↓ Alle</button>` : ""}
          </div>
        </div>

        <div class="covers-grid">
          ${n.map((i, a) => {
      const o = t?.states[i];
      if (!o) return p``;
      const l = o.attributes.friendly_name ?? i, d = o.attributes.current_position, c = this._moving[i], u = d != null ? `${d}%` : o.state === "open" ? "Offen" : o.state === "closed" ? "Zu" : "–", f = o.state === "open" ? "st-open" : o.state === "closed" ? "st-closed" : "st-mid";
      return p`
              <div class="cover-card">
                <div class="cover-info">
                  <div class="cover-name">${l}</div>
                  <div class="cover-bottom">
                    ${d != null ? p`
                      <div class="pos-bar">
                        <div class="pos-shade" style="height:${100 - d}%"></div>
                      </div>
                    ` : ""}
                    <div class="cover-status ${f}">${u}</div>
                  </div>
                </div>
                <div class="cover-btns">
                  <button class="cov-btn ${c === "up" ? "active" : ""}"
                    @click=${() => this._cover(i, c === "up" ? "stop_cover" : "open_cover")}
                    aria-label="${c === "up" ? "Stop" : "Öffnen"}">
                    ${c === "up" ? p`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : p`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`}
                  </button>
                  <button class="cov-btn ${c === "down" ? "active" : ""}"
                    @click=${() => this._cover(i, c === "down" ? "stop_cover" : "close_cover")}
                    aria-label="${c === "down" ? "Stop" : "Schließen"}">
                    ${c === "down" ? p`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : p`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`}
                  </button>
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
};
q.styles = [I, lt, T`
    .page { padding: var(--nsp-s3); gap: var(--nsp-s2); }

    .summary-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      padding: 0 2px;
      height: 28px;
    }

    .summary-text {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 500;
    }
    .summary-open   { color: var(--nsp-green); font-weight: 600; }
    .summary-dot    { color: var(--nsp-text-3); }
    .summary-closed { color: var(--nsp-text-3); }

    .summary-actions {
      display: flex;
      gap: var(--nsp-s1);
    }

    .pill-btn {
      height: 28px;
      padding: 0 12px;
      border-radius: 14px;
      border: none;
      background: var(--nsp-accent);
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: white;
      cursor: pointer;
    }
    .pill-btn:active { opacity: 0.7; }

    .covers-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      align-content: start;
      gap: var(--nsp-s2);
      overflow-y: auto;
      min-height: 0;
    }

    .cover-card {
      display: flex;
      align-items: center;
      padding: 0 var(--nsp-s2) 0 var(--nsp-s3);
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      min-height: 68px;
      gap: var(--nsp-s2);
      box-sizing: border-box;
    }

    .cover-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .cover-name {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .cover-status {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 500;
    }
    .cover-bottom {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .pos-bar {
      width: 3px;
      height: 18px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
    }
    .pos-shade {
      position: absolute;
      top: 0; left: 0; right: 0;
      background: var(--nsp-text-3);
      border-radius: 2px;
      transition: height 0.4s ease;
    }
    .cover-status.st-open   { color: var(--nsp-green); }
    .cover-status.st-closed { color: var(--nsp-text-3); }
    .cover-status.st-mid    { color: var(--nsp-text-3); opacity: 0.5; }

    .cover-btns {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    .cov-btn {
      width: 36px;
      height: 36px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      color: var(--nsp-text-2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .cov-btn.active { background: var(--nsp-orange); color: white; }
    .cov-btn:active { opacity: 0.5; }
  `];
xt([
  x({ attribute: !1 })
], q.prototype, "hass", 2);
xt([
  x({ attribute: !1 })
], q.prototype, "config", 2);
xt([
  x({ type: Boolean })
], q.prototype, "dark", 2);
xt([
  S()
], q.prototype, "_moving", 2);
q = xt([
  N("nspanel-page-blinds")
], q);
var Ys = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, $t = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? qs(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ys(t, n, s), s;
};
function Pe(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let G = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._tick = 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._timer = window.setInterval(() => {
      this._tick++;
    }, 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._timer);
  }
  _call(e, t) {
    const n = this.config?.media_player;
    if (!n) return;
    const [r, s] = e.split(".");
    this.hass.callService(r, s, { entity_id: n, ...t });
  }
  _volume(e) {
    this._call("media_player.volume_set", { volume_level: e.target.valueAsNumber });
  }
  render() {
    const e = this.config?.media_player, t = e ? this.hass?.states[e] : null;
    if (!t) return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">No media player configured</div></div>
    `;
    if (t.state === "off" || t.state === "unavailable" || t.state === "standby") return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="offline">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:.25">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
          </svg>
          <div class="offline-name">${t.attributes.friendly_name ?? e}</div>
          <div class="offline-hint">Wiedergabe in der Spotify- oder B&amp;O-App<br>starten, um sie hier zu steuern</div>
        </div>
      </div>
    `;
    const r = t.state === "playing", s = t.attributes.media_title ?? "", i = t.attributes.media_artist ?? "", a = t.attributes.entity_picture ?? "";
    t.attributes.volume_level;
    const o = t.attributes.media_duration ?? 0, l = t.attributes.media_position ?? 0, d = t.attributes.media_position_updated_at ?? "";
    let c = l;
    r && d && (c = Math.min(l + (Date.now() - new Date(d).getTime()) / 1e3, o));
    const u = o > 0 ? c / o : 0;
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${a ? p`<img class="art" src="${a}" alt="cover" />` : p`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${s || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${i ? p`<div class="track-artist">${i}</div>` : ""}
        </div>

        ${o > 0 ? p`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${u * 100}%">
                <div class="progress-thumb"></div>
              </div>
            </div>
            <div class="progress-times">
              <span>${Pe(c)}</span>
              <span>-${Pe(o - c)}</span>
            </div>
          </div>
        ` : ""}

        <div class="controls">
          <button class="ctrl-btn" @click=${() => this._call("media_player.media_previous_track")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
            </svg>
          </button>
          <button class="ctrl-btn play" @click=${() => this._call("media_player.media_play_pause")}>
            ${r ? p`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : p`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          <button class="ctrl-btn" @click=${() => this._call("media_player.media_next_track")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>

      </div>
    `;
  }
};
G.styles = [I, lt, T`
    .page { align-items: center; gap: var(--nsp-s3); padding: var(--nsp-s4); }

    .art-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 0;
    }
    .art {
      width: 172px;
      height: 172px;
      border-radius: var(--nsp-r3);
      object-fit: cover;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    }
    .art-empty {
      width: 172px;
      height: 172px;
      border-radius: var(--nsp-r3);
      background: var(--nsp-surface-2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 52px;
      color: var(--nsp-text-3);
    }

    .track-info { text-align: center; width: 100%; }
    .track-title {
      font-family: var(--nsp-font);
      font-size: 18px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
    }
    .track-artist {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-2);
      margin-top: 2px;
    }

    .progress-wrap { width: 100%; }
    .progress-bar {
      height: 2px;
      background: var(--nsp-surface-3);
      border-radius: 1px;
      overflow: visible;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: var(--nsp-text-1);
      border-radius: 1px;
      position: relative;
    }
    .progress-thumb {
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--nsp-text-1);
    }
    .progress-times {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 6px;
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
      width: 60px;
      height: 60px;
      background: var(--nsp-accent);
      color: white;
      padding: 0;
      border-radius: 50%;
    }

    .offline {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--nsp-s3);
      text-align: center;
    }
    .offline-name {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 600;
      color: var(--nsp-text-2);
    }
    .offline-hint {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      line-height: 1.5;
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
      height: 2px;
      border-radius: 1px;
      background: var(--nsp-surface-3);
      outline: none;
    }
    .vol-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--nsp-text-1);
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
$t([
  x({ attribute: !1 })
], G.prototype, "hass", 2);
$t([
  x({ attribute: !1 })
], G.prototype, "config", 2);
$t([
  x({ type: Boolean })
], G.prototype, "dark", 2);
$t([
  S()
], G.prototype, "_tick", 2);
G = $t([
  N("nspanel-page-media")
], G);
var Gs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, Ft = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Js(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Gs(t, n, s), s;
};
const Qs = {
  off: "Aus",
  pv: "Solar",
  minpv: "Min+Solar",
  now: "Schnell",
  fast: "Schnell"
};
function Zs(e) {
  return Qs[e.toLowerCase()] ?? e;
}
function Me(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function qt(e) {
  return `${e.toFixed(1)} kWh`;
}
let nt = class extends A {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setMode(e) {
    const t = this.config.evcc_mode_entity;
    t && this.hass.callService("select", "select_option", { entity_id: t, option: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = e.pv_entity ? t?.states[e.pv_entity] : null, r = e.grid_entity ? t?.states[e.grid_entity] : null, s = n ? parseFloat(n.state) : null, i = r ? parseFloat(r.state) : null, a = i != null && i < 0, o = s != null && i != null ? s + i : null, l = s != null && o != null && o > 0 ? Math.min(s / o, 1) * 100 : a ? 100 : null, d = l != null ? Math.max(100 - l, 0) : null, c = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, u = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, f = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, h = c ? parseFloat(c.state) : null, g = u ? parseFloat(u.state) : null, b = f ? parseFloat(f.state) : null, $ = g != null && g > 0 && h != null ? Math.min(h / g, 1) : null, v = e.ev_entity ? t?.states[e.ev_entity] : null, _ = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, y = e.evcc_mode_entity ? t?.states[e.evcc_mode_entity] : null, m = v ? parseFloat(v.state) : NaN, w = isNaN(m) ? null : m, C = _ ? parseFloat(_.state) : NaN, E = isNaN(C) ? null : Math.round(C), M = y?.state ?? null, z = y?.attributes.options ?? [];
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <!-- Hero: PV + grid state -->
        <div class="hero-card">
          <div class="hero-top">
            <div>
              <div class="hero-label">PV-ERZEUGUNG</div>
              <div class="hero-value">${s != null ? Me(s) : "–"}</div>
            </div>
            <div class="hero-icon">☀️</div>
          </div>

          ${l != null ? p`
            <div class="flow-bar">
              <div class="flow-solar" style="width:${l}%"></div>
              <div class="flow-grid"  style="width:${d}%"></div>
            </div>
          ` : ""}

          ${i != null ? p`
            <div class="grid-line ${a ? "grid-export" : "grid-import"}">
              <span>${a ? "⬆️" : "⬇️"} ${Me(Math.abs(i))} ${a ? "Einspeisung" : "Netzbezug"}</span>
              ${l != null && (a || l >= 50) ? p`<span>${Math.round(l)}% autark</span>` : ""}
            </div>
          ` : ""}
        </div>

        <!-- Forecast -->
        ${h != null || g != null || b != null ? p`
          <div class="forecast-row">
            ${h != null || g != null ? p`
              <div class="fc-card">
                <div class="fc-label">Heute</div>
                <div class="fc-val">${g != null ? qt(g) : qt(h)}</div>
                ${$ != null ? p`
                  <div class="fc-track"><div class="fc-fill" style="width:${$ * 100}%"></div></div>
                ` : ""}
              </div>
            ` : ""}
            ${b != null ? p`
              <div class="fc-card">
                <div class="fc-label">Morgen</div>
                <div class="fc-val">${qt(b)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}

        <!-- EV card (only when connected) -->
        ${w != null ? p`
          <div class="ev-card">
            <div class="ev-top">
              <span class="ev-pct">🚗 ${Math.round(w)}%</span>
              <div class="ev-track"><div class="ev-fill" style="width:${w}%"></div></div>
              ${E != null ? p`<span class="ev-km">${E} km</span>` : ""}
            </div>
            ${z.length > 0 ? p`
              <div class="ev-modes">
                ${z.map((P) => p`
                  <button class="mode-btn ${M === P ? "active" : ""}"
                    @click=${() => this._setMode(P)}>${Zs(P)}</button>
                `)}
              </div>
            ` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
};
nt.styles = [I, lt, T`
    .page { gap: var(--nsp-s2); }

    /* ── Hero ── */
    .hero-card {
      flex: 1;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: var(--nsp-s3);
      min-height: 0;
    }
    .hero-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .hero-label {
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
      margin-bottom: 4px;
    }
    .hero-value {
      font-family: var(--nsp-font);
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-yellow);
      line-height: 1;
    }
    .hero-icon { font-size: 28px; }

    .flow-bar {
      height: 6px;
      border-radius: 3px;
      background: var(--nsp-surface-3);
      display: flex;
      overflow: hidden;
    }
    .flow-solar {
      height: 100%;
      background: var(--nsp-yellow);
      border-radius: 3px 0 0 3px;
      transition: width 0.6s ease;
    }
    .flow-grid {
      height: 100%;
      background: var(--nsp-accent);
      transition: width 0.6s ease;
    }

    .grid-line {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
    }
    .grid-export { color: var(--nsp-green); }
    .grid-import { color: var(--nsp-orange); }

    /* ── Forecast ── */
    .forecast-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }
    .fc-card {
      flex: 1;
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .fc-label {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--nsp-text-3);
    }
    .fc-val {
      font-family: var(--nsp-font);
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-yellow);
    }
    .fc-track {
      height: 3px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .fc-fill {
      height: 100%;
      background: var(--nsp-yellow);
      border-radius: 2px;
      opacity: 0.7;
    }
    .fc-sub {
      font-family: var(--nsp-font);
      font-size: 10px;
      color: var(--nsp-text-3);
    }

    /* ── EV card ── */
    .ev-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r2);
      padding: var(--nsp-s3);
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }
    .ev-top {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
    }
    .ev-pct {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 700;
      color: var(--nsp-text-1);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-track {
      flex: 1;
      height: 6px;
      background: var(--nsp-surface-3);
      border-radius: 3px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 3px;
    }
    .ev-km {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: var(--nsp-text-3);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .ev-modes {
      display: flex;
      gap: var(--nsp-s1);
    }
    .mode-btn {
      flex: 1;
      height: 32px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 600;
      color: var(--nsp-text-2);
      cursor: pointer;
      white-space: nowrap;
    }
    .mode-btn.active {
      background: var(--nsp-accent);
      color: white;
    }
    .mode-btn:active { opacity: 0.6; }
  `];
Ft([
  x({ attribute: !1 })
], nt.prototype, "hass", 2);
Ft([
  x({ attribute: !1 })
], nt.prototype, "config", 2);
Ft([
  x({ type: Boolean })
], nt.prototype, "dark", 2);
nt = Ft([
  N("nspanel-page-energy")
], nt);
var Xs = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, dt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? tn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Xs(t, n, s), s;
};
const en = ["camera_1", "camera_2", "camera_3", "camera_4"];
let H = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._tick = 0, this._fullscreenCam = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._timer = window.setInterval(() => {
      this._tick++;
    }, 2e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearInterval(this._timer);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = !!e.cameras_portrait, r = en.map((a) => e[a]).filter((a) => !!a);
    if (r.length === 0)
      return p`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const s = `page ${this.dark ? "nsp-dark" : ""} count-${r.length} ${n ? "portrait" : ""}`, i = (a) => {
      const o = t?.states[a];
      return o ? o.attributes.frontend_stream_type ? p`<ha-camera-stream .hass=${t} .stateObj=${o} muted autoPlay></ha-camera-stream>` : p`<img class="cam-img" src="/api/camera_proxy/${a}?token=${o.attributes.access_token}&_=${this._tick}" alt="${o.attributes.friendly_name ?? a}" />` : p`<div class="cam-unavail">Not available</div>`;
    };
    return p`
      <div class="${s}">
        ${r.map((a) => {
      const o = t?.states[a]?.attributes.friendly_name ?? a;
      return p`
            <div class="cam-cell" @click=${() => {
        this._fullscreenCam = a;
      }}>
              ${i(a)}
              <div class="cam-label">${o}</div>
            </div>
          `;
    })}

        ${this._fullscreenCam ? p`
          <div class="cam-fullscreen" @click=${() => {
      this._fullscreenCam = null;
    }}>
            ${i(this._fullscreenCam)}
            <div class="cam-label">${t?.states[this._fullscreenCam]?.attributes.friendly_name ?? this._fullscreenCam}</div>
            <div class="cam-close">✕</div>
          </div>
        ` : k}
      </div>
    `;
  }
};
H.styles = [I, T`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .page {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: var(--nsp-s2);
      background: #000;
      display: grid;
      gap: var(--nsp-s2);
      overflow: hidden;
    }

    /* ── Landscape (default) ── */
    .page.count-1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }
    .page.count-2 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr; }
    .page.count-3 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }
    .page.count-3 .cam-cell:first-child { grid-column: span 2; }
    .page.count-4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; }

    /* ── Portrait (9:16) ──
       Cells get their natural aspect ratio; grid rows are auto-sized.
       Cameras are centered in the available space.              */
    .page.portrait {
      align-content: center;
      justify-content: center;
      grid-auto-rows: auto;
    }
    .page.portrait.count-1 {
      grid-template-columns: auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-2 {
      grid-template-columns: auto auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-3 {
      grid-template-columns: auto auto auto;
      grid-template-rows: auto;
    }
    .page.portrait.count-4 {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
    }
    /* Portrait cells: height fills available space, width follows 9:16 ratio */
    .page.portrait .cam-cell {
      height: calc((100% - var(--nsp-s2)) / 1);
      aspect-ratio: 9 / 16;
    }
    .page.portrait.count-2 .cam-cell,
    .page.portrait.count-3 .cam-cell {
      height: calc(100% - var(--nsp-s2) * 0);
    }
    .page.portrait.count-4 .cam-cell {
      height: calc((100% - var(--nsp-s2)) / 2);
    }
    /* Remove the count-3 first-child span in portrait mode */
    .page.portrait.count-3 .cam-cell:first-child { grid-column: unset; }

    /* ── Camera cell ── */
    .cam-cell {
      position: relative;
      background: #111;
      border-radius: var(--nsp-r1);
      overflow: hidden;
      min-width: 0;
      min-height: 0;
    }

    ha-camera-stream {
      display: block;
      width: 100%;
      height: 100%;
    }
    .cam-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .cam-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4px 8px 6px;
      background: linear-gradient(transparent, rgba(0,0,0,0.65));
      font-family: var(--nsp-font);
      font-size: 11px;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cam-fullscreen {
      position: absolute;
      inset: 0;
      background: #000;
      z-index: 10;
      cursor: pointer;
    }

    .cam-close {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 18px;
      color: rgba(255,255,255,0.8);
      line-height: 1;
      pointer-events: none;
    }

    .cam-unavail {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: rgba(255,255,255,0.25);
    }

    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--nsp-font);
      font-size: 13px;
      color: rgba(255,255,255,0.3);
    }
  `];
dt([
  x({ attribute: !1 })
], H.prototype, "hass", 2);
dt([
  x({ attribute: !1 })
], H.prototype, "config", 2);
dt([
  x({ type: Boolean })
], H.prototype, "dark", 2);
dt([
  S()
], H.prototype, "_tick", 2);
dt([
  S()
], H.prototype, "_fullscreenCam", 2);
H = dt([
  N("nspanel-page-security")
], H);
var Ct = {}, sn = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, He = {}, B = {};
let pe;
const nn = [
  0,
  // Not used
  26,
  44,
  70,
  100,
  134,
  172,
  196,
  242,
  292,
  346,
  404,
  466,
  532,
  581,
  655,
  733,
  815,
  901,
  991,
  1085,
  1156,
  1258,
  1364,
  1474,
  1588,
  1706,
  1828,
  1921,
  2051,
  2185,
  2323,
  2465,
  2611,
  2761,
  2876,
  3034,
  3196,
  3362,
  3532,
  3706
];
B.getSymbolSize = function(t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
B.getSymbolTotalCodewords = function(t) {
  return nn[t];
};
B.getBCHDigit = function(e) {
  let t = 0;
  for (; e !== 0; )
    t++, e >>>= 1;
  return t;
};
B.setToSJISFunction = function(t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  pe = t;
};
B.isKanjiModeEnabled = function() {
  return typeof pe < "u";
};
B.toSJIS = function(t) {
  return pe(t);
};
var Ut = {};
(function(e) {
  e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
  function t(n) {
    if (typeof n != "string")
      throw new Error("Param is not a string");
    switch (n.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + n);
    }
  }
  e.isValid = function(r) {
    return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
  }, e.from = function(r, s) {
    if (e.isValid(r))
      return r;
    try {
      return t(r);
    } catch {
      return s;
    }
  };
})(Ut);
function je() {
  this.buffer = [], this.length = 0;
}
je.prototype = {
  get: function(e) {
    const t = Math.floor(e / 8);
    return (this.buffer[t] >>> 7 - e % 8 & 1) === 1;
  },
  put: function(e, t) {
    for (let n = 0; n < t; n++)
      this.putBit((e >>> t - n - 1 & 1) === 1);
  },
  getLengthInBits: function() {
    return this.length;
  },
  putBit: function(e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
  }
};
var rn = je;
function Et(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
Et.prototype.set = function(e, t, n, r) {
  const s = e * this.size + t;
  this.data[s] = n, r && (this.reservedBit[s] = !0);
};
Et.prototype.get = function(e, t) {
  return this.data[e * this.size + t];
};
Et.prototype.xor = function(e, t, n) {
  this.data[e * this.size + t] ^= n;
};
Et.prototype.isReserved = function(e, t) {
  return this.reservedBit[e * this.size + t];
};
var an = Et, Ve = {};
(function(e) {
  const t = B.getSymbolSize;
  e.getRowColCoords = function(r) {
    if (r === 1) return [];
    const s = Math.floor(r / 7) + 2, i = t(r), a = i === 145 ? 26 : Math.ceil((i - 13) / (2 * s - 2)) * 2, o = [i - 7];
    for (let l = 1; l < s - 1; l++)
      o[l] = o[l - 1] - a;
    return o.push(6), o.reverse();
  }, e.getPositions = function(r) {
    const s = [], i = e.getRowColCoords(r), a = i.length;
    for (let o = 0; o < a; o++)
      for (let l = 0; l < a; l++)
        o === 0 && l === 0 || // top-left
        o === 0 && l === a - 1 || // bottom-left
        o === a - 1 && l === 0 || s.push([i[o], i[l]]);
    return s;
  };
})(Ve);
var We = {};
const on = B.getSymbolSize, Te = 7;
We.getPositions = function(t) {
  const n = on(t);
  return [
    // top-left
    [0, 0],
    // top-right
    [n - Te, 0],
    // bottom-left
    [0, n - Te]
  ];
};
var Ke = {};
(function(e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  };
  const t = {
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10
  };
  e.isValid = function(s) {
    return s != null && s !== "" && !isNaN(s) && s >= 0 && s <= 7;
  }, e.from = function(s) {
    return e.isValid(s) ? parseInt(s, 10) : void 0;
  }, e.getPenaltyN1 = function(s) {
    const i = s.size;
    let a = 0, o = 0, l = 0, d = null, c = null;
    for (let u = 0; u < i; u++) {
      o = l = 0, d = c = null;
      for (let f = 0; f < i; f++) {
        let h = s.get(u, f);
        h === d ? o++ : (o >= 5 && (a += t.N1 + (o - 5)), d = h, o = 1), h = s.get(f, u), h === c ? l++ : (l >= 5 && (a += t.N1 + (l - 5)), c = h, l = 1);
      }
      o >= 5 && (a += t.N1 + (o - 5)), l >= 5 && (a += t.N1 + (l - 5));
    }
    return a;
  }, e.getPenaltyN2 = function(s) {
    const i = s.size;
    let a = 0;
    for (let o = 0; o < i - 1; o++)
      for (let l = 0; l < i - 1; l++) {
        const d = s.get(o, l) + s.get(o, l + 1) + s.get(o + 1, l) + s.get(o + 1, l + 1);
        (d === 4 || d === 0) && a++;
      }
    return a * t.N2;
  }, e.getPenaltyN3 = function(s) {
    const i = s.size;
    let a = 0, o = 0, l = 0;
    for (let d = 0; d < i; d++) {
      o = l = 0;
      for (let c = 0; c < i; c++)
        o = o << 1 & 2047 | s.get(d, c), c >= 10 && (o === 1488 || o === 93) && a++, l = l << 1 & 2047 | s.get(c, d), c >= 10 && (l === 1488 || l === 93) && a++;
    }
    return a * t.N3;
  }, e.getPenaltyN4 = function(s) {
    let i = 0;
    const a = s.data.length;
    for (let l = 0; l < a; l++) i += s.data[l];
    return Math.abs(Math.ceil(i * 100 / a / 5) - 10) * t.N4;
  };
  function n(r, s, i) {
    switch (r) {
      case e.Patterns.PATTERN000:
        return (s + i) % 2 === 0;
      case e.Patterns.PATTERN001:
        return s % 2 === 0;
      case e.Patterns.PATTERN010:
        return i % 3 === 0;
      case e.Patterns.PATTERN011:
        return (s + i) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(s / 2) + Math.floor(i / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return s * i % 2 + s * i % 3 === 0;
      case e.Patterns.PATTERN110:
        return (s * i % 2 + s * i % 3) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (s * i % 3 + (s + i) % 2) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + r);
    }
  }
  e.applyMask = function(s, i) {
    const a = i.size;
    for (let o = 0; o < a; o++)
      for (let l = 0; l < a; l++)
        i.isReserved(l, o) || i.xor(l, o, n(s, l, o));
  }, e.getBestMask = function(s, i) {
    const a = Object.keys(e.Patterns).length;
    let o = 0, l = 1 / 0;
    for (let d = 0; d < a; d++) {
      i(d), e.applyMask(d, s);
      const c = e.getPenaltyN1(s) + e.getPenaltyN2(s) + e.getPenaltyN3(s) + e.getPenaltyN4(s);
      e.applyMask(d, s), c < l && (l = c, o = d);
    }
    return o;
  };
})(Ke);
var Ht = {};
const F = Ut, St = [
  // L  M  Q  H
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  2,
  2,
  4,
  1,
  2,
  4,
  4,
  2,
  4,
  4,
  4,
  2,
  4,
  6,
  5,
  2,
  4,
  6,
  6,
  2,
  5,
  8,
  8,
  4,
  5,
  8,
  8,
  4,
  5,
  8,
  11,
  4,
  8,
  10,
  11,
  4,
  9,
  12,
  16,
  4,
  9,
  16,
  16,
  6,
  10,
  12,
  18,
  6,
  10,
  17,
  16,
  6,
  11,
  16,
  19,
  6,
  13,
  18,
  21,
  7,
  14,
  21,
  25,
  8,
  16,
  20,
  25,
  8,
  17,
  23,
  25,
  9,
  17,
  23,
  34,
  9,
  18,
  25,
  30,
  10,
  20,
  27,
  32,
  12,
  21,
  29,
  35,
  12,
  23,
  34,
  37,
  12,
  25,
  34,
  40,
  13,
  26,
  35,
  42,
  14,
  28,
  38,
  45,
  15,
  29,
  40,
  48,
  16,
  31,
  43,
  51,
  17,
  33,
  45,
  54,
  18,
  35,
  48,
  57,
  19,
  37,
  51,
  60,
  19,
  38,
  53,
  63,
  20,
  40,
  56,
  66,
  21,
  43,
  59,
  70,
  22,
  45,
  62,
  74,
  24,
  47,
  65,
  77,
  25,
  49,
  68,
  81
], Pt = [
  // L  M  Q  H
  7,
  10,
  13,
  17,
  10,
  16,
  22,
  28,
  15,
  26,
  36,
  44,
  20,
  36,
  52,
  64,
  26,
  48,
  72,
  88,
  36,
  64,
  96,
  112,
  40,
  72,
  108,
  130,
  48,
  88,
  132,
  156,
  60,
  110,
  160,
  192,
  72,
  130,
  192,
  224,
  80,
  150,
  224,
  264,
  96,
  176,
  260,
  308,
  104,
  198,
  288,
  352,
  120,
  216,
  320,
  384,
  132,
  240,
  360,
  432,
  144,
  280,
  408,
  480,
  168,
  308,
  448,
  532,
  180,
  338,
  504,
  588,
  196,
  364,
  546,
  650,
  224,
  416,
  600,
  700,
  224,
  442,
  644,
  750,
  252,
  476,
  690,
  816,
  270,
  504,
  750,
  900,
  300,
  560,
  810,
  960,
  312,
  588,
  870,
  1050,
  336,
  644,
  952,
  1110,
  360,
  700,
  1020,
  1200,
  390,
  728,
  1050,
  1260,
  420,
  784,
  1140,
  1350,
  450,
  812,
  1200,
  1440,
  480,
  868,
  1290,
  1530,
  510,
  924,
  1350,
  1620,
  540,
  980,
  1440,
  1710,
  570,
  1036,
  1530,
  1800,
  570,
  1064,
  1590,
  1890,
  600,
  1120,
  1680,
  1980,
  630,
  1204,
  1770,
  2100,
  660,
  1260,
  1860,
  2220,
  720,
  1316,
  1950,
  2310,
  750,
  1372,
  2040,
  2430
];
Ht.getBlocksCount = function(t, n) {
  switch (n) {
    case F.L:
      return St[(t - 1) * 4 + 0];
    case F.M:
      return St[(t - 1) * 4 + 1];
    case F.Q:
      return St[(t - 1) * 4 + 2];
    case F.H:
      return St[(t - 1) * 4 + 3];
    default:
      return;
  }
};
Ht.getTotalCodewordsCount = function(t, n) {
  switch (n) {
    case F.L:
      return Pt[(t - 1) * 4 + 0];
    case F.M:
      return Pt[(t - 1) * 4 + 1];
    case F.Q:
      return Pt[(t - 1) * 4 + 2];
    case F.H:
      return Pt[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Ye = {}, jt = {};
const gt = new Uint8Array(512), Nt = new Uint8Array(256);
(function() {
  let t = 1;
  for (let n = 0; n < 255; n++)
    gt[n] = t, Nt[t] = n, t <<= 1, t & 256 && (t ^= 285);
  for (let n = 255; n < 512; n++)
    gt[n] = gt[n - 255];
})();
jt.log = function(t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return Nt[t];
};
jt.exp = function(t) {
  return gt[t];
};
jt.mul = function(t, n) {
  return t === 0 || n === 0 ? 0 : gt[Nt[t] + Nt[n]];
};
(function(e) {
  const t = jt;
  e.mul = function(r, s) {
    const i = new Uint8Array(r.length + s.length - 1);
    for (let a = 0; a < r.length; a++)
      for (let o = 0; o < s.length; o++)
        i[a + o] ^= t.mul(r[a], s[o]);
    return i;
  }, e.mod = function(r, s) {
    let i = new Uint8Array(r);
    for (; i.length - s.length >= 0; ) {
      const a = i[0];
      for (let l = 0; l < s.length; l++)
        i[l] ^= t.mul(s[l], a);
      let o = 0;
      for (; o < i.length && i[o] === 0; ) o++;
      i = i.slice(o);
    }
    return i;
  }, e.generateECPolynomial = function(r) {
    let s = new Uint8Array([1]);
    for (let i = 0; i < r; i++)
      s = e.mul(s, new Uint8Array([1, t.exp(i)]));
    return s;
  };
})(Ye);
const qe = Ye;
function he(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
he.prototype.initialize = function(t) {
  this.degree = t, this.genPoly = qe.generateECPolynomial(this.degree);
};
he.prototype.encode = function(t) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const n = new Uint8Array(t.length + this.degree);
  n.set(t);
  const r = qe.mod(n, this.genPoly), s = this.degree - r.length;
  if (s > 0) {
    const i = new Uint8Array(this.degree);
    return i.set(r, s), i;
  }
  return r;
};
var ln = he, Ge = {}, V = {}, ue = {};
ue.isValid = function(t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var L = {};
const Je = "[0-9]+", cn = "[A-Z $%*+\\-./:]+";
let _t = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
_t = _t.replace(/u/g, "\\u");
const dn = "(?:(?![A-Z0-9 $%*+\\-./:]|" + _t + `)(?:.|[\r
]))+`;
L.KANJI = new RegExp(_t, "g");
L.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
L.BYTE = new RegExp(dn, "g");
L.NUMERIC = new RegExp(Je, "g");
L.ALPHANUMERIC = new RegExp(cn, "g");
const pn = new RegExp("^" + _t + "$"), hn = new RegExp("^" + Je + "$"), un = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
L.testKanji = function(t) {
  return pn.test(t);
};
L.testNumeric = function(t) {
  return hn.test(t);
};
L.testAlphanumeric = function(t) {
  return un.test(t);
};
(function(e) {
  const t = ue, n = L;
  e.NUMERIC = {
    id: "Numeric",
    bit: 1,
    ccBits: [10, 12, 14]
  }, e.ALPHANUMERIC = {
    id: "Alphanumeric",
    bit: 2,
    ccBits: [9, 11, 13]
  }, e.BYTE = {
    id: "Byte",
    bit: 4,
    ccBits: [8, 16, 16]
  }, e.KANJI = {
    id: "Kanji",
    bit: 8,
    ccBits: [8, 10, 12]
  }, e.MIXED = {
    bit: -1
  }, e.getCharCountIndicator = function(i, a) {
    if (!i.ccBits) throw new Error("Invalid mode: " + i);
    if (!t.isValid(a))
      throw new Error("Invalid version: " + a);
    return a >= 1 && a < 10 ? i.ccBits[0] : a < 27 ? i.ccBits[1] : i.ccBits[2];
  }, e.getBestModeForData = function(i) {
    return n.testNumeric(i) ? e.NUMERIC : n.testAlphanumeric(i) ? e.ALPHANUMERIC : n.testKanji(i) ? e.KANJI : e.BYTE;
  }, e.toString = function(i) {
    if (i && i.id) return i.id;
    throw new Error("Invalid mode");
  }, e.isValid = function(i) {
    return i && i.bit && i.ccBits;
  };
  function r(s) {
    if (typeof s != "string")
      throw new Error("Param is not a string");
    switch (s.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + s);
    }
  }
  e.from = function(i, a) {
    if (e.isValid(i))
      return i;
    try {
      return r(i);
    } catch {
      return a;
    }
  };
})(V);
(function(e) {
  const t = B, n = Ht, r = Ut, s = V, i = ue, a = 7973, o = t.getBCHDigit(a);
  function l(f, h, g) {
    for (let b = 1; b <= 40; b++)
      if (h <= e.getCapacity(b, g, f))
        return b;
  }
  function d(f, h) {
    return s.getCharCountIndicator(f, h) + 4;
  }
  function c(f, h) {
    let g = 0;
    return f.forEach(function(b) {
      const $ = d(b.mode, h);
      g += $ + b.getBitsLength();
    }), g;
  }
  function u(f, h) {
    for (let g = 1; g <= 40; g++)
      if (c(f, g) <= e.getCapacity(g, h, s.MIXED))
        return g;
  }
  e.from = function(h, g) {
    return i.isValid(h) ? parseInt(h, 10) : g;
  }, e.getCapacity = function(h, g, b) {
    if (!i.isValid(h))
      throw new Error("Invalid QR Code version");
    typeof b > "u" && (b = s.BYTE);
    const $ = t.getSymbolTotalCodewords(h), v = n.getTotalCodewordsCount(h, g), _ = ($ - v) * 8;
    if (b === s.MIXED) return _;
    const y = _ - d(b, h);
    switch (b) {
      case s.NUMERIC:
        return Math.floor(y / 10 * 3);
      case s.ALPHANUMERIC:
        return Math.floor(y / 11 * 2);
      case s.KANJI:
        return Math.floor(y / 13);
      case s.BYTE:
      default:
        return Math.floor(y / 8);
    }
  }, e.getBestVersionForData = function(h, g) {
    let b;
    const $ = r.from(g, r.M);
    if (Array.isArray(h)) {
      if (h.length > 1)
        return u(h, $);
      if (h.length === 0)
        return 1;
      b = h[0];
    } else
      b = h;
    return l(b.mode, b.getLength(), $);
  }, e.getEncodedBits = function(h) {
    if (!i.isValid(h) || h < 7)
      throw new Error("Invalid QR Code version");
    let g = h << 12;
    for (; t.getBCHDigit(g) - o >= 0; )
      g ^= a << t.getBCHDigit(g) - o;
    return h << 12 | g;
  };
})(Ge);
var Qe = {};
const te = B, Ze = 1335, fn = 21522, Be = te.getBCHDigit(Ze);
Qe.getEncodedBits = function(t, n) {
  const r = t.bit << 3 | n;
  let s = r << 10;
  for (; te.getBCHDigit(s) - Be >= 0; )
    s ^= Ze << te.getBCHDigit(s) - Be;
  return (r << 10 | s) ^ fn;
};
var Xe = {};
const gn = V;
function rt(e) {
  this.mode = gn.NUMERIC, this.data = e.toString();
}
rt.getBitsLength = function(t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0);
};
rt.prototype.getLength = function() {
  return this.data.length;
};
rt.prototype.getBitsLength = function() {
  return rt.getBitsLength(this.data.length);
};
rt.prototype.write = function(t) {
  let n, r, s;
  for (n = 0; n + 3 <= this.data.length; n += 3)
    r = this.data.substr(n, 3), s = parseInt(r, 10), t.put(s, 10);
  const i = this.data.length - n;
  i > 0 && (r = this.data.substr(n), s = parseInt(r, 10), t.put(s, i * 3 + 1));
};
var vn = rt;
const mn = V, Gt = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  " ",
  "$",
  "%",
  "*",
  "+",
  "-",
  ".",
  "/",
  ":"
];
function it(e) {
  this.mode = mn.ALPHANUMERIC, this.data = e;
}
it.getBitsLength = function(t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
it.prototype.getLength = function() {
  return this.data.length;
};
it.prototype.getBitsLength = function() {
  return it.getBitsLength(this.data.length);
};
it.prototype.write = function(t) {
  let n;
  for (n = 0; n + 2 <= this.data.length; n += 2) {
    let r = Gt.indexOf(this.data[n]) * 45;
    r += Gt.indexOf(this.data[n + 1]), t.put(r, 11);
  }
  this.data.length % 2 && t.put(Gt.indexOf(this.data[n]), 6);
};
var bn = it;
const yn = V;
function at(e) {
  this.mode = yn.BYTE, typeof e == "string" ? this.data = new TextEncoder().encode(e) : this.data = new Uint8Array(e);
}
at.getBitsLength = function(t) {
  return t * 8;
};
at.prototype.getLength = function() {
  return this.data.length;
};
at.prototype.getBitsLength = function() {
  return at.getBitsLength(this.data.length);
};
at.prototype.write = function(e) {
  for (let t = 0, n = this.data.length; t < n; t++)
    e.put(this.data[t], 8);
};
var _n = at;
const wn = V, xn = B;
function ot(e) {
  this.mode = wn.KANJI, this.data = e;
}
ot.getBitsLength = function(t) {
  return t * 13;
};
ot.prototype.getLength = function() {
  return this.data.length;
};
ot.prototype.getBitsLength = function() {
  return ot.getBitsLength(this.data.length);
};
ot.prototype.write = function(e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let n = xn.toSJIS(this.data[t]);
    if (n >= 33088 && n <= 40956)
      n -= 33088;
    else if (n >= 57408 && n <= 60351)
      n -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " + this.data[t] + `
Make sure your charset is UTF-8`
      );
    n = (n >>> 8 & 255) * 192 + (n & 255), e.put(n, 13);
  }
};
var $n = ot, ts = { exports: {} };
(function(e) {
  var t = {
    single_source_shortest_paths: function(n, r, s) {
      var i = {}, a = {};
      a[r] = 0;
      var o = t.PriorityQueue.make();
      o.push(r, 0);
      for (var l, d, c, u, f, h, g, b, $; !o.empty(); ) {
        l = o.pop(), d = l.value, u = l.cost, f = n[d] || {};
        for (c in f)
          f.hasOwnProperty(c) && (h = f[c], g = u + h, b = a[c], $ = typeof a[c] > "u", ($ || b > g) && (a[c] = g, o.push(c, g), i[c] = d));
      }
      if (typeof s < "u" && typeof a[s] > "u") {
        var v = ["Could not find a path from ", r, " to ", s, "."].join("");
        throw new Error(v);
      }
      return i;
    },
    extract_shortest_path_from_predecessor_list: function(n, r) {
      for (var s = [], i = r; i; )
        s.push(i), n[i], i = n[i];
      return s.reverse(), s;
    },
    find_path: function(n, r, s) {
      var i = t.single_source_shortest_paths(n, r, s);
      return t.extract_shortest_path_from_predecessor_list(
        i,
        s
      );
    },
    /**
     * A very naive priority queue implementation.
     */
    PriorityQueue: {
      make: function(n) {
        var r = t.PriorityQueue, s = {}, i;
        n = n || {};
        for (i in r)
          r.hasOwnProperty(i) && (s[i] = r[i]);
        return s.queue = [], s.sorter = n.sorter || r.default_sorter, s;
      },
      default_sorter: function(n, r) {
        return n.cost - r.cost;
      },
      /**
       * Add a new item to the queue and ensure the highest priority element
       * is at the front of the queue.
       */
      push: function(n, r) {
        var s = { value: n, cost: r };
        this.queue.push(s), this.queue.sort(this.sorter);
      },
      /**
       * Return the highest priority element in the queue.
       */
      pop: function() {
        return this.queue.shift();
      },
      empty: function() {
        return this.queue.length === 0;
      }
    }
  };
  e.exports = t;
})(ts);
var Cn = ts.exports;
(function(e) {
  const t = V, n = vn, r = bn, s = _n, i = $n, a = L, o = B, l = Cn;
  function d(v) {
    return unescape(encodeURIComponent(v)).length;
  }
  function c(v, _, y) {
    const m = [];
    let w;
    for (; (w = v.exec(y)) !== null; )
      m.push({
        data: w[0],
        index: w.index,
        mode: _,
        length: w[0].length
      });
    return m;
  }
  function u(v) {
    const _ = c(a.NUMERIC, t.NUMERIC, v), y = c(a.ALPHANUMERIC, t.ALPHANUMERIC, v);
    let m, w;
    return o.isKanjiModeEnabled() ? (m = c(a.BYTE, t.BYTE, v), w = c(a.KANJI, t.KANJI, v)) : (m = c(a.BYTE_KANJI, t.BYTE, v), w = []), _.concat(y, m, w).sort(function(E, M) {
      return E.index - M.index;
    }).map(function(E) {
      return {
        data: E.data,
        mode: E.mode,
        length: E.length
      };
    });
  }
  function f(v, _) {
    switch (_) {
      case t.NUMERIC:
        return n.getBitsLength(v);
      case t.ALPHANUMERIC:
        return r.getBitsLength(v);
      case t.KANJI:
        return i.getBitsLength(v);
      case t.BYTE:
        return s.getBitsLength(v);
    }
  }
  function h(v) {
    return v.reduce(function(_, y) {
      const m = _.length - 1 >= 0 ? _[_.length - 1] : null;
      return m && m.mode === y.mode ? (_[_.length - 1].data += y.data, _) : (_.push(y), _);
    }, []);
  }
  function g(v) {
    const _ = [];
    for (let y = 0; y < v.length; y++) {
      const m = v[y];
      switch (m.mode) {
        case t.NUMERIC:
          _.push([
            m,
            { data: m.data, mode: t.ALPHANUMERIC, length: m.length },
            { data: m.data, mode: t.BYTE, length: m.length }
          ]);
          break;
        case t.ALPHANUMERIC:
          _.push([
            m,
            { data: m.data, mode: t.BYTE, length: m.length }
          ]);
          break;
        case t.KANJI:
          _.push([
            m,
            { data: m.data, mode: t.BYTE, length: d(m.data) }
          ]);
          break;
        case t.BYTE:
          _.push([
            { data: m.data, mode: t.BYTE, length: d(m.data) }
          ]);
      }
    }
    return _;
  }
  function b(v, _) {
    const y = {}, m = { start: {} };
    let w = ["start"];
    for (let C = 0; C < v.length; C++) {
      const E = v[C], M = [];
      for (let z = 0; z < E.length; z++) {
        const P = E[z], ht = "" + C + z;
        M.push(ht), y[ht] = { node: P, lastCount: 0 }, m[ht] = {};
        for (let Wt = 0; Wt < w.length; Wt++) {
          const D = w[Wt];
          y[D] && y[D].node.mode === P.mode ? (m[D][ht] = f(y[D].lastCount + P.length, P.mode) - f(y[D].lastCount, P.mode), y[D].lastCount += P.length) : (y[D] && (y[D].lastCount = P.length), m[D][ht] = f(P.length, P.mode) + 4 + t.getCharCountIndicator(P.mode, _));
        }
      }
      w = M;
    }
    for (let C = 0; C < w.length; C++)
      m[w[C]].end = 0;
    return { map: m, table: y };
  }
  function $(v, _) {
    let y;
    const m = t.getBestModeForData(v);
    if (y = t.from(_, m), y !== t.BYTE && y.bit < m.bit)
      throw new Error('"' + v + '" cannot be encoded with mode ' + t.toString(y) + `.
 Suggested mode is: ` + t.toString(m));
    switch (y === t.KANJI && !o.isKanjiModeEnabled() && (y = t.BYTE), y) {
      case t.NUMERIC:
        return new n(v);
      case t.ALPHANUMERIC:
        return new r(v);
      case t.KANJI:
        return new i(v);
      case t.BYTE:
        return new s(v);
    }
  }
  e.fromArray = function(_) {
    return _.reduce(function(y, m) {
      return typeof m == "string" ? y.push($(m, null)) : m.data && y.push($(m.data, m.mode)), y;
    }, []);
  }, e.fromString = function(_, y) {
    const m = u(_, o.isKanjiModeEnabled()), w = g(m), C = b(w, y), E = l.find_path(C.map, "start", "end"), M = [];
    for (let z = 1; z < E.length - 1; z++)
      M.push(C.table[E[z]].node);
    return e.fromArray(h(M));
  }, e.rawSplit = function(_) {
    return e.fromArray(
      u(_, o.isKanjiModeEnabled())
    );
  };
})(Xe);
const Vt = B, Jt = Ut, En = rn, kn = an, An = Ve, Sn = We, ee = Ke, se = Ht, Pn = ln, zt = Ge, Mn = Qe, Tn = V, Qt = Xe;
function Bn(e, t) {
  const n = e.size, r = Sn.getPositions(t);
  for (let s = 0; s < r.length; s++) {
    const i = r[s][0], a = r[s][1];
    for (let o = -1; o <= 7; o++)
      if (!(i + o <= -1 || n <= i + o))
        for (let l = -1; l <= 7; l++)
          a + l <= -1 || n <= a + l || (o >= 0 && o <= 6 && (l === 0 || l === 6) || l >= 0 && l <= 6 && (o === 0 || o === 6) || o >= 2 && o <= 4 && l >= 2 && l <= 4 ? e.set(i + o, a + l, !0, !0) : e.set(i + o, a + l, !1, !0));
  }
}
function Nn(e) {
  const t = e.size;
  for (let n = 8; n < t - 8; n++) {
    const r = n % 2 === 0;
    e.set(n, 6, r, !0), e.set(6, n, r, !0);
  }
}
function zn(e, t) {
  const n = An.getPositions(t);
  for (let r = 0; r < n.length; r++) {
    const s = n[r][0], i = n[r][1];
    for (let a = -2; a <= 2; a++)
      for (let o = -2; o <= 2; o++)
        a === -2 || a === 2 || o === -2 || o === 2 || a === 0 && o === 0 ? e.set(s + a, i + o, !0, !0) : e.set(s + a, i + o, !1, !0);
  }
}
function In(e, t) {
  const n = e.size, r = zt.getEncodedBits(t);
  let s, i, a;
  for (let o = 0; o < 18; o++)
    s = Math.floor(o / 3), i = o % 3 + n - 8 - 3, a = (r >> o & 1) === 1, e.set(s, i, a, !0), e.set(i, s, a, !0);
}
function Zt(e, t, n) {
  const r = e.size, s = Mn.getEncodedBits(t, n);
  let i, a;
  for (i = 0; i < 15; i++)
    a = (s >> i & 1) === 1, i < 6 ? e.set(i, 8, a, !0) : i < 8 ? e.set(i + 1, 8, a, !0) : e.set(r - 15 + i, 8, a, !0), i < 8 ? e.set(8, r - i - 1, a, !0) : i < 9 ? e.set(8, 15 - i - 1 + 1, a, !0) : e.set(8, 15 - i - 1, a, !0);
  e.set(r - 8, 8, 1, !0);
}
function Ln(e, t) {
  const n = e.size;
  let r = -1, s = n - 1, i = 7, a = 0;
  for (let o = n - 1; o > 0; o -= 2)
    for (o === 6 && o--; ; ) {
      for (let l = 0; l < 2; l++)
        if (!e.isReserved(s, o - l)) {
          let d = !1;
          a < t.length && (d = (t[a] >>> i & 1) === 1), e.set(s, o - l, d), i--, i === -1 && (a++, i = 7);
        }
      if (s += r, s < 0 || n <= s) {
        s -= r, r = -r;
        break;
      }
    }
}
function Dn(e, t, n) {
  const r = new En();
  n.forEach(function(l) {
    r.put(l.mode.bit, 4), r.put(l.getLength(), Tn.getCharCountIndicator(l.mode, e)), l.write(r);
  });
  const s = Vt.getSymbolTotalCodewords(e), i = se.getTotalCodewordsCount(e, t), a = (s - i) * 8;
  for (r.getLengthInBits() + 4 <= a && r.put(0, 4); r.getLengthInBits() % 8 !== 0; )
    r.putBit(0);
  const o = (a - r.getLengthInBits()) / 8;
  for (let l = 0; l < o; l++)
    r.put(l % 2 ? 17 : 236, 8);
  return Rn(r, e, t);
}
function Rn(e, t, n) {
  const r = Vt.getSymbolTotalCodewords(t), s = se.getTotalCodewordsCount(t, n), i = r - s, a = se.getBlocksCount(t, n), o = r % a, l = a - o, d = Math.floor(r / a), c = Math.floor(i / a), u = c + 1, f = d - c, h = new Pn(f);
  let g = 0;
  const b = new Array(a), $ = new Array(a);
  let v = 0;
  const _ = new Uint8Array(e.buffer);
  for (let E = 0; E < a; E++) {
    const M = E < l ? c : u;
    b[E] = _.slice(g, g + M), $[E] = h.encode(b[E]), g += M, v = Math.max(v, M);
  }
  const y = new Uint8Array(r);
  let m = 0, w, C;
  for (w = 0; w < v; w++)
    for (C = 0; C < a; C++)
      w < b[C].length && (y[m++] = b[C][w]);
  for (w = 0; w < f; w++)
    for (C = 0; C < a; C++)
      y[m++] = $[C][w];
  return y;
}
function On(e, t, n, r) {
  let s;
  if (Array.isArray(e))
    s = Qt.fromArray(e);
  else if (typeof e == "string") {
    let d = t;
    if (!d) {
      const c = Qt.rawSplit(e);
      d = zt.getBestVersionForData(c, n);
    }
    s = Qt.fromString(e, d || 40);
  } else
    throw new Error("Invalid data");
  const i = zt.getBestVersionForData(s, n);
  if (!i)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t)
    t = i;
  else if (t < i)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + i + `.
`
    );
  const a = Dn(t, n, s), o = Vt.getSymbolSize(t), l = new kn(o);
  return Bn(l, t), Nn(l), zn(l, t), Zt(l, n, 0), t >= 7 && In(l, t), Ln(l, a), isNaN(r) && (r = ee.getBestMask(
    l,
    Zt.bind(null, l, n)
  )), ee.applyMask(r, l), Zt(l, n, r), {
    modules: l,
    version: t,
    errorCorrectionLevel: n,
    maskPattern: r,
    segments: s
  };
}
He.create = function(t, n) {
  if (typeof t > "u" || t === "")
    throw new Error("No input text");
  let r = Jt.M, s, i;
  return typeof n < "u" && (r = Jt.from(n.errorCorrectionLevel, Jt.M), s = zt.from(n.version), i = ee.from(n.maskPattern), n.toSJISFunc && Vt.setToSJISFunction(n.toSJISFunc)), On(t, s, r, i);
};
var es = {}, fe = {};
(function(e) {
  function t(n) {
    if (typeof n == "number" && (n = n.toString()), typeof n != "string")
      throw new Error("Color should be defined as hex string");
    let r = n.slice().replace("#", "").split("");
    if (r.length < 3 || r.length === 5 || r.length > 8)
      throw new Error("Invalid hex color: " + n);
    (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(i) {
      return [i, i];
    }))), r.length === 6 && r.push("F", "F");
    const s = parseInt(r.join(""), 16);
    return {
      r: s >> 24 & 255,
      g: s >> 16 & 255,
      b: s >> 8 & 255,
      a: s & 255,
      hex: "#" + r.slice(0, 6).join("")
    };
  }
  e.getOptions = function(r) {
    r || (r = {}), r.color || (r.color = {});
    const s = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, i = r.width && r.width >= 21 ? r.width : void 0, a = r.scale || 4;
    return {
      width: i,
      scale: i ? 4 : a,
      margin: s,
      color: {
        dark: t(r.color.dark || "#000000ff"),
        light: t(r.color.light || "#ffffffff")
      },
      type: r.type,
      rendererOpts: r.rendererOpts || {}
    };
  }, e.getScale = function(r, s) {
    return s.width && s.width >= r + s.margin * 2 ? s.width / (r + s.margin * 2) : s.scale;
  }, e.getImageWidth = function(r, s) {
    const i = e.getScale(r, s);
    return Math.floor((r + s.margin * 2) * i);
  }, e.qrToImageData = function(r, s, i) {
    const a = s.modules.size, o = s.modules.data, l = e.getScale(a, i), d = Math.floor((a + i.margin * 2) * l), c = i.margin * l, u = [i.color.light, i.color.dark];
    for (let f = 0; f < d; f++)
      for (let h = 0; h < d; h++) {
        let g = (f * d + h) * 4, b = i.color.light;
        if (f >= c && h >= c && f < d - c && h < d - c) {
          const $ = Math.floor((f - c) / l), v = Math.floor((h - c) / l);
          b = u[o[$ * a + v] ? 1 : 0];
        }
        r[g++] = b.r, r[g++] = b.g, r[g++] = b.b, r[g] = b.a;
      }
  };
})(fe);
(function(e) {
  const t = fe;
  function n(s, i, a) {
    s.clearRect(0, 0, i.width, i.height), i.style || (i.style = {}), i.height = a, i.width = a, i.style.height = a + "px", i.style.width = a + "px";
  }
  function r() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  e.render = function(i, a, o) {
    let l = o, d = a;
    typeof l > "u" && (!a || !a.getContext) && (l = a, a = void 0), a || (d = r()), l = t.getOptions(l);
    const c = t.getImageWidth(i.modules.size, l), u = d.getContext("2d"), f = u.createImageData(c, c);
    return t.qrToImageData(f.data, i, l), n(u, d, c), u.putImageData(f, 0, 0), d;
  }, e.renderToDataURL = function(i, a, o) {
    let l = o;
    typeof l > "u" && (!a || !a.getContext) && (l = a, a = void 0), l || (l = {});
    const d = e.render(i, a, l), c = l.type || "image/png", u = l.rendererOpts || {};
    return d.toDataURL(c, u.quality);
  };
})(es);
var ss = {};
const Fn = fe;
function Ne(e, t) {
  const n = e.a / 255, r = t + '="' + e.hex + '"';
  return n < 1 ? r + " " + t + '-opacity="' + n.toFixed(2).slice(1) + '"' : r;
}
function Xt(e, t, n) {
  let r = e + t;
  return typeof n < "u" && (r += " " + n), r;
}
function Un(e, t, n) {
  let r = "", s = 0, i = !1, a = 0;
  for (let o = 0; o < e.length; o++) {
    const l = Math.floor(o % t), d = Math.floor(o / t);
    !l && !i && (i = !0), e[o] ? (a++, o > 0 && l > 0 && e[o - 1] || (r += i ? Xt("M", l + n, 0.5 + d + n) : Xt("m", s, 0), s = 0, i = !1), l + 1 < t && e[o + 1] || (r += Xt("h", a), a = 0)) : s++;
  }
  return r;
}
ss.render = function(t, n, r) {
  const s = Fn.getOptions(n), i = t.modules.size, a = t.modules.data, o = i + s.margin * 2, l = s.color.light.a ? "<path " + Ne(s.color.light, "fill") + ' d="M0 0h' + o + "v" + o + 'H0z"/>' : "", d = "<path " + Ne(s.color.dark, "stroke") + ' d="' + Un(a, i, s.margin) + '"/>', c = 'viewBox="0 0 ' + o + " " + o + '"', f = '<svg xmlns="http://www.w3.org/2000/svg" ' + (s.width ? 'width="' + s.width + '" height="' + s.width + '" ' : "") + c + ' shape-rendering="crispEdges">' + l + d + `</svg>
`;
  return typeof r == "function" && r(null, f), f;
};
const Hn = sn, ne = He, ns = es, jn = ss;
function ge(e, t, n, r, s) {
  const i = [].slice.call(arguments, 1), a = i.length, o = typeof i[a - 1] == "function";
  if (!o && !Hn())
    throw new Error("Callback required as last argument");
  if (o) {
    if (a < 2)
      throw new Error("Too few arguments provided");
    a === 2 ? (s = n, n = t, t = r = void 0) : a === 3 && (t.getContext && typeof s > "u" ? (s = r, r = void 0) : (s = r, r = n, n = t, t = void 0));
  } else {
    if (a < 1)
      throw new Error("Too few arguments provided");
    return a === 1 ? (n = t, t = r = void 0) : a === 2 && !t.getContext && (r = n, n = t, t = void 0), new Promise(function(l, d) {
      try {
        const c = ne.create(n, r);
        l(e(c, t, r));
      } catch (c) {
        d(c);
      }
    });
  }
  try {
    const l = ne.create(n, r);
    s(null, e(l, t, r));
  } catch (l) {
    s(l);
  }
}
Ct.create = ne.create;
Ct.toCanvas = ge.bind(null, ns.render);
Ct.toDataURL = ge.bind(null, ns.renderToDataURL);
Ct.toString = ge.bind(null, function(e, t, n) {
  return jn.render(e, n);
});
var Vn = Object.defineProperty, Wn = Object.getOwnPropertyDescriptor, kt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Wn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Vn(t, n, s), s;
};
function ze(e) {
  return e.replace(/[\\;,":]/g, (t) => "\\" + t);
}
let J = class extends A {
  constructor() {
    super(...arguments), this.dark = !1, this._qrUrl = "", this._showPass = !1, this._lastKey = "";
  }
  updated(e) {
    (e.has("config") || e.has("dark")) && this._generateQr();
  }
  async _generateQr() {
    const e = this.config ?? {};
    if (!e.wifi_ssid) {
      this._qrUrl = "";
      return;
    }
    const t = e.wifi_security ?? "WPA", n = `${e.wifi_ssid}|${e.wifi_password ?? ""}|${t}`;
    if (n === this._lastKey) return;
    this._lastKey = n;
    const r = `WIFI:T:${t};S:${ze(e.wifi_ssid)};P:${ze(e.wifi_password ?? "")};H:false;;`;
    try {
      this._qrUrl = await Ct.toDataURL(r, {
        width: 216,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" }
      });
    } catch {
      this._qrUrl = "";
    }
  }
  render() {
    const e = this.config ?? {};
    return p`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        ${e.wifi_ssid ? p`
          <div class="wifi-card">
            <div class="wifi-header">GÄSTE-WLAN</div>
            ${this._qrUrl ? p`<img class="qr" src=${this._qrUrl} width="200" height="200" alt="QR Code">` : p`<div class="qr-placeholder"></div>`}
            <div class="wifi-ssid">📶  ${e.wifi_ssid}</div>
            ${e.wifi_password ? p`
              <div class="wifi-pass-row">
                <span class="wifi-pass">${this._showPass ? e.wifi_password : "••••••••"}</span>
                <button class="pass-toggle" @click=${() => {
      this._showPass = !this._showPass;
    }}>
                  ${this._showPass ? p`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>` : p`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`}
                </button>
              </div>
            ` : ""}
          </div>
        ` : p`
          <div class="empty">Kein WLAN konfiguriert</div>
        `}
      </div>
    `;
  }
};
J.styles = [I, lt, T`
    .page {
      align-items: center;
      justify-content: center;
    }

    .wifi-card {
      background: var(--nsp-surface-2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      border-radius: var(--nsp-r3);
      padding: var(--nsp-s4);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--nsp-s3);
      width: 100%;
      max-width: 300px;
    }

    .wifi-header {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--nsp-text-3);
      align-self: flex-start;
    }

    .qr {
      border-radius: 10px;
      display: block;
    }

    .qr-placeholder {
      width: 200px;
      height: 200px;
      background: var(--nsp-surface-3);
      border-radius: 10px;
    }

    .wifi-ssid {
      font-family: var(--nsp-font);
      font-size: 15px;
      font-weight: 700;
      color: var(--nsp-text-1);
      letter-spacing: -0.01em;
    }

    .wifi-pass-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: -4px;
    }
    .wifi-pass {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      letter-spacing: 0.04em;
    }
    .pass-toggle {
      border: none;
      background: none;
      color: var(--nsp-text-3);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .pass-toggle:active { opacity: 0.6; }

    .empty {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
    }
  `];
kt([
  x({ attribute: !1 })
], J.prototype, "config", 2);
kt([
  x({ type: Boolean })
], J.prototype, "dark", 2);
kt([
  S()
], J.prototype, "_qrUrl", 2);
kt([
  S()
], J.prototype, "_showPass", 2);
J = kt([
  N("nspanel-page-wifi")
], J);
var Kn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, ve = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Yn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Kn(t, n, s), s;
};
const Ie = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security",
  wifi: "WiFi"
}, Le = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" },
  { id: "security" },
  { id: "wifi" }
], qn = [
  { name: "weather_entity", label: "Weather", selector: { entity: { domain: "weather" } } },
  { name: "indoor_temp_entity", label: "Indoor Temperature — temperature sensor", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
  { name: "calendar_entity", label: "Calendar", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Trash Collection", selector: { entity: { domain: ["sensor", "calendar"] } } }
], Gn = [
  { name: "person_1", label: "Person 1 — shown as 👦 in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 — shown as 👧 in status bar", selector: { entity: { domain: "person" } } }
], Jn = [
  { name: "garden_light", label: "Light 1", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Light 1 Icon — emoji, default 💡", selector: { text: {} } },
  { name: "light_2", label: "Light 2 (optional)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Light 2 Icon — emoji, default 💡", selector: { text: {} } }
], Qn = [
  { name: "vacuum_entity", label: "Robot Vacuum (optional)", selector: { entity: { domain: "vacuum" } } },
  { name: "dishwasher_entity", label: "Dishwasher (optional) — remaining time sensor in min", selector: { entity: { domain: "sensor" } } }
], Zn = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], Xn = [
  { name: "cover_1", label: "Blind 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Blind 2 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Blind 3 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Blind 4 (optional)", selector: { entity: { domain: "cover" } } }
], tr = [
  { name: "cover_5", label: "Blind 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Blind 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Blind 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Blind 8", selector: { entity: { domain: "cover" } } }
], er = [
  { name: "scene_up", label: "Open All — scene or script", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Close All — scene or script", selector: { entity: { domain: ["scene", "script"] } } }
], sr = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } },
  { name: "media_default_source", label: "Default Source (optional) — e.g. Spotify, Bluetooth", selector: { text: {} } }
], nr = [
  { name: "pv_entity", label: "Solar Production — sensor in W or kW", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Grid Power — positive = import, negative = export (W or kW)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV Battery (optional) — state of charge sensor in %", selector: { entity: { domain: "sensor" } } },
  { name: "ev_range_entity", label: "EV Range (optional) — range sensor in km", selector: { entity: { domain: "sensor" } } },
  { name: "evcc_mode_entity", label: "EVCC Charge Mode (optional) — select entity for mode", selector: { entity: { domain: "select" } } }
], rr = [
  { name: "pv_today_entity", label: "Solar Energy Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Solar Forecast Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Solar Forecast Tomorrow — sensor in kWh", selector: { entity: { domain: "sensor" } } }
], ir = [
  { name: "camera_1", label: "Camera 1", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Camera 2 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Camera 3 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Camera 4 (optional)", selector: { entity: { domain: "camera" } } }
], ar = [
  { name: "doorbell_trigger", label: "Doorbell Trigger — binary_sensor or input_boolean", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Doorbell Camera (optional)", selector: { entity: { domain: "camera" } } }
], or = [
  { name: "wifi_ssid", label: "WLAN Name (SSID)", selector: { text: {} } },
  { name: "wifi_password", label: "Passwort", selector: { text: {} } },
  { name: "wifi_security", label: "Sicherheit — WPA (Standard), WEP, nopass (offen)", selector: { select: { options: ["WPA", "WEP", "nopass"] } } }
], lr = [
  { name: "bg_accent_1", label: "Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)", selector: { text: {} } },
  { name: "bg_accent_2", label: "Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)", selector: { text: {} } }
], cr = (e) => e.label ?? e.name;
let It = class extends A {
  createRenderRoot() {
    return this;
  }
  setConfig(e) {
    this._config = e;
  }
  _merge(e) {
    this._config = { ...this._config, ...e.detail.value }, this._emit();
  }
  _emit() {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _togglePage(e) {
    const t = [...this._config.pages ?? ["home"]], n = t.indexOf(e);
    n >= 0 ? t.length > 1 && t.splice(n, 1) : t.push(e), this._config = { ...this._config, pages: t }, this._emit();
  }
  _setPortrait(e) {
    this._config = { ...this._config, cameras_portrait: e }, this._emit();
  }
  _form(e) {
    return p`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${cr} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return p``;
    const e = this._config, t = e.pages ?? ["home"], n = (r) => e[`${r}_label`] ?? "";
    return p`
      <style>
        .nsp-sec {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .07em; color: var(--secondary-text-color);
          margin: 24px 0 2px; padding-bottom: 6px;
          border-bottom: 1px solid var(--divider-color);
        }
        .nsp-sec:first-child { margin-top: 8px; }
        .nsp-desc {
          font-size: 13px; color: var(--secondary-text-color);
          margin: 4px 0 8px; line-height: 1.4;
        }
        .nsp-group {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: .05em; color: var(--secondary-text-color);
          margin: 12px 0 0; opacity: .7;
        }
        .nsp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .nsp-chip {
          padding: 6px 16px; border-radius: 980px;
          border: 1.5px solid var(--divider-color);
          background: none; cursor: pointer;
          font-size: 13px; color: var(--primary-text-color);
          transition: all .15s;
        }
        .nsp-chip.active {
          border-color: var(--primary-color);
          background: var(--primary-color); color: white;
        }
        .nsp-details {
          margin: 6px 0 0; border-radius: 8px;
          border: 1px solid var(--divider-color); overflow: hidden;
        }
        .nsp-details summary {
          padding: 10px 12px; cursor: pointer; font-size: 13px;
          color: var(--secondary-text-color); list-style: none;
          display: flex; align-items: center; gap: 8px;
          user-select: none;
        }
        .nsp-details summary::before {
          content: '▶'; font-size: 9px; transition: transform .2s;
          flex-shrink: 0;
        }
        .nsp-details[open] summary::before { transform: rotate(90deg); }
        .nsp-details-body { padding: 0 12px 12px; }
        .nsp-toggle-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-top: 1px solid var(--divider-color); margin-top: 4px;
        }
        .nsp-toggle-label { font-size: 14px; color: var(--primary-text-color); }
        .nsp-toggle-hint  { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
        .nsp-hint {
          font-size: 12px; color: var(--secondary-text-color);
          margin: 2px 0 8px; padding: 6px 10px;
          background: var(--secondary-background-color);
          border-radius: 6px; line-height: 1.4;
        }
        .nsp-hint code { font-size: 11px; background: var(--divider-color); padding: 1px 4px; border-radius: 3px; }
      </style>

      <!-- ── Pages ── -->
      <div class="nsp-sec">Pages</div>
      <p class="nsp-desc">Select which tabs appear on the panel. At least one must be active.</p>
      <div class="nsp-chips">
        ${Le.map((r) => p`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${n(r.id) || Ie[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(Le.map((r) => ({
      name: `${r.id}_label`,
      label: `${Ie[r.id]} — custom label`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Weather, calendar events, lights and appliances shown on the Home tab.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(qn)}
      <details class="nsp-details">
        <summary>Trash category colors</summary>
        <div class="nsp-details-body">
          <p class="nsp-hint">
            One category per line: <code>keyword,keyword2=🔴</code><br>
            Leave empty for defaults: paper=🔴 · yellow bag=🟡 · residual=⚫
          </p>
          ${this._form([{
      name: "trash_mapping",
      label: "Custom mapping (leave empty for defaults)",
      selector: { text: { multiline: !0 } }
    }])}
        </div>
      </details>

      <div class="nsp-group">Presence</div>
      ${this._form(Gn)}

      <div class="nsp-group">Lights</div>
      ${this._form(Jn)}

      <div class="nsp-group">Appliances</div>
      ${this._form(Qn)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Control your heating and cooling system.</p>
      ${this._form(Zn)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(Xn)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(tr)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(er)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(sr)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(nr)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(rr)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(ir)}
      <div class="nsp-toggle-row">
        <div>
          <div class="nsp-toggle-label">Portrait Mode (9:16)</div>
          <div class="nsp-toggle-hint">Enable for vertical / doorbell cameras</div>
        </div>
        <ha-switch
          ?checked=${!!e.cameras_portrait}
          @change=${(r) => this._setPortrait(r.target.checked)}
        ></ha-switch>
      </div>

      <!-- ── Doorbell ── -->
      <div class="nsp-sec">Doorbell</div>
      <p class="nsp-desc">Shows a live camera popup when someone rings the bell.</p>
      ${this._form(ar)}

      <!-- ── WiFi ── -->
      <div class="nsp-sec">WiFi</div>
      <p class="nsp-desc">QR-Code zum einfachen Verbinden mit dem Gäste-WLAN.</p>
      ${this._form(or)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(lr)}
    `;
  }
};
ve([
  x({ attribute: !1 })
], It.prototype, "hass", 2);
ve([
  S()
], It.prototype, "_config", 2);
It = ve([
  N("nspanel-dashboard-editor")
], It);
var dr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, pt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? pr(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && dr(t, n, s), s;
};
let j = class extends A {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(e, t) {
    if (!e) return "";
    const n = e.replace("#", "");
    if (n.length !== 6) return "";
    const r = parseInt(n.slice(0, 2), 16), s = parseInt(n.slice(2, 4), 16), i = parseInt(n.slice(4, 6), 16);
    return `rgba(${r},${s},${i},${t})`;
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
        const n = this.hass.states[t]?.state;
        this._prevTriggerState !== "on" && n === "on" && (this._doorbellActive = !0), this._prevTriggerState = n;
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return p``;
    const e = this._dark, t = e ? 0.18 : 0.09, n = this._glowVar(this._config.bg_accent_1, t), r = this._glowVar(this._config.bg_accent_2, t), s = [n ? `--nsp-glow-1:${n}` : "", r ? `--nsp-glow-2:${r}` : ""].filter(Boolean).join(";");
    return p`
      <div class="shell ${e ? "nsp-dark" : ""}" style="${s}">
        <nspanel-status-bar
          .hass=${this.hass}
          .config=${this._config}
          ?dark=${e}
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
      energy: this._config.energy_label,
      security: this._config.security_label,
      wifi: this._config.wifi_label
    }}
          @page-change=${(i) => {
      this._activePage = i.detail.page;
    }}
        ></nspanel-bottom-nav>

        ${this._doorbellActive ? p`
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
    const e = this.hass, t = this._config, n = this._dark;
    switch (this._activePage) {
      case "home":
        return p`<nspanel-page-home    .hass=${e} .config=${t} ?dark=${n}></nspanel-page-home>`;
      case "climate":
        return p`<nspanel-page-climate .hass=${e} .config=${t} ?dark=${n}></nspanel-page-climate>`;
      case "blinds":
        return p`<nspanel-page-blinds  .hass=${e} .config=${t} ?dark=${n}></nspanel-page-blinds>`;
      case "media":
        return p`<nspanel-page-media   .hass=${e} .config=${t} ?dark=${n}></nspanel-page-media>`;
      case "energy":
        return p`<nspanel-page-energy   .hass=${e} .config=${t} ?dark=${n}></nspanel-page-energy>`;
      case "security":
        return p`<nspanel-page-security .hass=${e} .config=${t} ?dark=${n}></nspanel-page-security>`;
      case "wifi":
        return p`<nspanel-page-wifi .config=${t} ?dark=${n}></nspanel-page-wifi>`;
      default:
        return p``;
    }
  }
};
j.styles = [I, T`
    :host {
      display: block;
      width: 480px;
      height: 480px;
    }
    .shell {
      width: 100%;
      height: 100%;
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
    .content > * {
      animation: nsp-page-in 0.18s ease;
    }
    @keyframes nsp-page-in {
      from { opacity: 0; transform: translateY(6px) scale(0.99); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
  `];
pt([
  x({ attribute: !1 })
], j.prototype, "hass", 2);
pt([
  S()
], j.prototype, "_config", 2);
pt([
  S()
], j.prototype, "_activePage", 2);
pt([
  S()
], j.prototype, "_doorbellActive", 2);
pt([
  S()
], j.prototype, "_dark", 2);
j = pt([
  N("nspanel-dashboard")
], j);
export {
  j as NspanelDashboard
};
