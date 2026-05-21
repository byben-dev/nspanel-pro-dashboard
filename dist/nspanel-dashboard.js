/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, ut = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ft = Symbol(), xt = /* @__PURE__ */ new WeakMap();
let Ft = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== ft) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (ut && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = xt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && xt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const It = (e) => new Ft(typeof e == "string" ? e : e + "", void 0, ft), m = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, r, i) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[i + 1], e[0]);
  return new Ft(s, e, ft);
}, Rt = (e, t) => {
  if (ut) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), r = Y.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = s.cssText, e.appendChild(n);
  }
}, wt = ut ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return It(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Vt, defineProperty: Wt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: Jt, getOwnPropertySymbols: qt, getPrototypeOf: Gt } = Object, et = globalThis, At = et.trustedTypes, Zt = At ? At.emptyScript : "", Yt = et.reactiveElementPolyfillSupport, I = (e, t) => e, X = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Zt : null;
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
} }, gt = (e, t) => !Vt(e, t), kt = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: gt };
Symbol.metadata ??= Symbol("metadata"), et.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let M = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = kt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, s);
      r !== void 0 && Wt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: r, set: i } = Kt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(a) {
      this[s] = a;
    } };
    return { get: r, set(a) {
      const c = r?.call(this);
      i?.call(this, a), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const t = Gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const s = this.properties, n = [...Jt(s), ...qt(s)];
      for (const r of n) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [n, r] of s) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, n] of this.elementProperties) {
      const r = this._$Eu(s, n);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const r of n) s.unshift(wt(r));
    } else t !== void 0 && s.push(wt(t));
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
    return Rt(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const i = (n.converter?.toAttribute !== void 0 ? n.converter : X).toAttribute(s, n.type);
      this._$Em = t, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const i = n.getPropertyOptions(r), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : X;
      this._$Em = r;
      const c = a.fromAttribute(s, i.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, r = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (r === !1 && (i = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? gt)(i, s) || n.useDefault && n.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: n, reflect: r, wrapped: i }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? s ?? this[t]), i !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, i] of this._$Ep) this[r] = i;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, i] of n) {
        const { wrapped: a } = i, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, i, c);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[I("elementProperties")] = /* @__PURE__ */ new Map(), M[I("finalized")] = /* @__PURE__ */ new Map(), Yt?.({ ReactiveElement: M }), (et.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = globalThis, Et = (e) => e, Q = mt.trustedTypes, Ct = Q ? Q.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jt = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, Lt = "?" + w, Xt = `<${Lt}>`, S = document, R = () => S.createComment(""), V = (e) => e === null || typeof e != "object" && typeof e != "function", bt = Array.isArray, Qt = (e) => bt(e) || typeof e?.[Symbol.iterator] == "function", dt = `[ 	
\f\r]`, B = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, St = /-->/g, Pt = />/g, E = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zt = /'/g, Ot = /"/g, Ut = /^(?:script|style|textarea|title)$/i, te = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = te(1), T = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Mt = /* @__PURE__ */ new WeakMap(), C = S.createTreeWalker(S, 129);
function Bt(e, t) {
  if (!bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ct !== void 0 ? Ct.createHTML(t) : t;
}
const ee = (e, t) => {
  const s = e.length - 1, n = [];
  let r, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = B;
  for (let c = 0; c < s; c++) {
    const o = e[c];
    let d, v, p = -1, g = 0;
    for (; g < o.length && (a.lastIndex = g, v = a.exec(o), v !== null); ) g = a.lastIndex, a === B ? v[1] === "!--" ? a = St : v[1] !== void 0 ? a = Pt : v[2] !== void 0 ? (Ut.test(v[2]) && (r = RegExp("</" + v[2], "g")), a = E) : v[3] !== void 0 && (a = E) : a === E ? v[0] === ">" ? (a = r ?? B, p = -1) : v[1] === void 0 ? p = -2 : (p = a.lastIndex - v[2].length, d = v[1], a = v[3] === void 0 ? E : v[3] === '"' ? Ot : zt) : a === Ot || a === zt ? a = E : a === St || a === Pt ? a = B : (a = E, r = void 0);
    const b = a === E && e[c + 1].startsWith("/>") ? " " : "";
    i += a === B ? o + Xt : p >= 0 ? (n.push(d), o.slice(0, p) + jt + o.slice(p) + w + b) : o + w + (p === -2 ? c : b);
  }
  return [Bt(e, i + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class W {
  constructor({ strings: t, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let i = 0, a = 0;
    const c = t.length - 1, o = this.parts, [d, v] = ee(t, s);
    if (this.el = W.createElement(d, n), C.currentNode = this.el.content, s === 2 || s === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = C.nextNode()) !== null && o.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(jt)) {
          const g = v[a++], b = r.getAttribute(p).split(w), O = /([.?@])?(.*)/.exec(g);
          o.push({ type: 1, index: i, name: O[2], strings: b, ctor: O[1] === "." ? re : O[1] === "?" ? ne : O[1] === "@" ? ie : st }), r.removeAttribute(p);
        } else p.startsWith(w) && (o.push({ type: 6, index: i }), r.removeAttribute(p));
        if (Ut.test(r.tagName)) {
          const p = r.textContent.split(w), g = p.length - 1;
          if (g > 0) {
            r.textContent = Q ? Q.emptyScript : "";
            for (let b = 0; b < g; b++) r.append(p[b], R()), C.nextNode(), o.push({ type: 2, index: ++i });
            r.append(p[g], R());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Lt) o.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(w, p + 1)) !== -1; ) o.push({ type: 7, index: i }), p += w.length - 1;
      }
      i++;
    }
  }
  static createElement(t, s) {
    const n = S.createElement("template");
    return n.innerHTML = t, n;
  }
}
function D(e, t, s = e, n) {
  if (t === T) return t;
  let r = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const i = V(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== i && (r?._$AO?.(!1), i === void 0 ? r = void 0 : (r = new i(e), r._$AT(e, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = r : s._$Cl = r), r !== void 0 && (t = D(e, r._$AS(e, t.values), r, n)), t;
}
class se {
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
    const { el: { content: s }, parts: n } = this._$AD, r = (t?.creationScope ?? S).importNode(s, !0);
    C.currentNode = r;
    let i = C.nextNode(), a = 0, c = 0, o = n[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new J(i, i.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(i, o.name, o.strings, this, t) : o.type === 6 && (d = new ae(i, this, t)), this._$AV.push(d), o = n[++c];
      }
      a !== o?.index && (i = C.nextNode(), a++);
    }
    return C.currentNode = S, r;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class J {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, r) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = D(this, t, s), V(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = W.createElement(Bt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const i = new se(r, this), a = i.u(this.options);
      i.p(s), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let s = Mt.get(t.strings);
    return s === void 0 && Mt.set(t.strings, s = new W(t)), s;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, r = 0;
    for (const i of t) r === s.length ? s.push(n = new J(this.O(R()), this.O(R()), this, this.options)) : n = s[r], n._$AI(i), r++;
    r < s.length && (this._$AR(n && n._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = Et(t).nextSibling;
      Et(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class st {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, n, r, i) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = u;
  }
  _$AI(t, s = this, n, r) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = D(this, t, s, 0), a = !V(t) || t !== this._$AH && t !== T, a && (this._$AH = t);
    else {
      const c = t;
      let o, d;
      for (t = i[0], o = 0; o < i.length - 1; o++) d = D(this, c[n + o], s, o), d === T && (d = this._$AH[o]), a ||= !V(d) || d !== this._$AH[o], d === u ? t = u : t !== u && (t += (d ?? "") + i[o + 1]), this._$AH[o] = d;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class re extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ne extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class ie extends st {
  constructor(t, s, n, r, i) {
    super(t, s, n, r, i), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = D(this, t, s, 0) ?? u) === T) return;
    const n = this._$AH, r = t === u && n !== u || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, i = t !== u && (n === u || r);
    r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ae {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    D(this, t);
  }
}
const oe = mt.litHtmlPolyfillSupport;
oe?.(W, J), (mt.litHtmlVersions ??= []).push("3.3.3");
const le = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const i = s?.renderBefore ?? null;
    n._$litPart$ = r = new J(t.insertBefore(R(), i), i, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = globalThis;
class f extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = le(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return T;
  }
}
f._$litElement$ = !0, f.finalized = !0, _t.litElementHydrateSupport?.({ LitElement: f });
const ce = _t.litElementPolyfillSupport;
ce?.({ LitElement: f });
(_t.litElementVersions ??= []).push("4.2.2");
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
const pe = { attribute: !0, type: String, converter: X, reflect: !1, hasChanged: gt }, de = (e = pe, t, s) => {
  const { kind: n, metadata: r } = s;
  let i = globalThis.litPropertyMetadata.get(r);
  if (i === void 0 && globalThis.litPropertyMetadata.set(r, i = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(s.name, e), n === "accessor") {
    const { name: a } = s;
    return { set(c) {
      const o = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(a, o, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, e, c), c;
    } };
  }
  if (n === "setter") {
    const { name: a } = s;
    return function(c) {
      const o = this[a];
      t.call(this, c), this.requestUpdate(a, o, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function h(e) {
  return (t, s) => typeof s == "object" ? de(e, t, s) : ((n, r, i) => {
    const a = r.hasOwnProperty(i);
    return r.constructor.createProperty(i, n), a ? Object.getOwnPropertyDescriptor(r, i) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $(e) {
  return h({ ...e, state: !0, attribute: !1 });
}
const x = m`
  :host {
    /* --- Light Mode --- */
    --nsp-bg:            #FFFFFF;
    --nsp-bg-secondary:  #F2F2F7;
    --nsp-bg-tertiary:   #E5E5EA;
    --nsp-surface:       rgba(255,255,255,0.80);
    --nsp-surface-2:     rgba(255,255,255,0.62);
    --nsp-surface-3:     rgba(255,255,255,0.45);

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
`, q = m`
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
var he = Object.defineProperty, ve = Object.getOwnPropertyDescriptor, rt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? ve(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && he(t, s, r), r;
};
const ue = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z"
}, Tt = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
};
let H = class extends f {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home", this.customLabels = {};
  }
  _tap(e) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: e }, bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <nav>
        ${this.pages.map((e) => l`
          <button
            class=${e === this.activePage ? "active" : ""}
            @click=${() => this._tap(e)}
            aria-label=${Tt[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${ue[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Tt[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
H.styles = [x, m`
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
rt([
  h({ type: Array })
], H.prototype, "pages", 2);
rt([
  h({ type: String })
], H.prototype, "activePage", 2);
rt([
  h({ attribute: !1 })
], H.prototype, "customLabels", 2);
H = rt([
  _("nspanel-bottom-nav")
], H);
var fe = Object.defineProperty, ge = Object.getOwnPropertyDescriptor, z = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? ge(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && fe(t, s, r), r;
};
const me = {
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
}, be = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function _e(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const s = t.lastIndexOf("="), n = t.slice(0, s).split(",").map((i) => i.trim().toLowerCase()).filter(Boolean), r = t.slice(s + 1).trim() || "🗑️";
    return { keywords: n, icon: r };
  });
}
function Z(e, t) {
  const s = _e(t ?? be), n = e.toLowerCase();
  for (const r of s)
    if (r.keywords.some((i) => n.includes(i))) return r.icon;
  return "🗑️";
}
function ht(e) {
  const t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  const s = new Date(t);
  s.setDate(t.getDate() + 1);
  const n = new Date(e);
  if (n.setHours(0, 0, 0, 0), n.getTime() === t.getTime()) return "Heute";
  if (n.getTime() === s.getTime()) return "Morgen";
  const r = Math.round((n.getTime() - t.getTime()) / 864e5);
  return r > 0 && r <= 6 ? e.toLocaleDateString("de-AT", { weekday: "short" }) : `+${r}d`;
}
let y = class extends f {
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
  async _fetchTrash() {
    const e = this.config?.trash_entity;
    if (!e || !this.hass) return;
    try {
      const a = /* @__PURE__ */ new Date();
      a.setHours(0, 0, 0, 0);
      const c = new Date(a);
      c.setDate(c.getDate() + 14);
      const o = await this.hass.fetchWithAuth(
        `/api/calendars/${e}?start=${encodeURIComponent(a.toISOString())}&end=${encodeURIComponent(c.toISOString())}`
      );
      if (o.ok) {
        const d = await o.json();
        if (d.length > 0) {
          const v = /* @__PURE__ */ new Map();
          for (const k of d) {
            const lt = k.start.date ?? k.start.dateTime ?? "", ct = new Date(lt);
            if (isNaN(ct.getTime())) continue;
            ct.setHours(0, 0, 0, 0);
            const pt = ct.toISOString();
            v.has(pt) || v.set(pt, []), v.get(pt).push(k.summary);
          }
          const [p, g] = [...v.entries()].sort((k, lt) => k[0].localeCompare(lt[0]))[0], b = this.config?.trash_mapping, O = [...new Set(g.map((k) => Z(k, b)))].join("");
          this._trashChip = `${O} ${ht(new Date(p))}`;
          return;
        }
        this._trashChip = null;
        return;
      }
    } catch {
    }
    const t = this.hass.states[e];
    if (!t) return;
    const s = this.config?.trash_mapping;
    if (t.state === "on") {
      const a = t.attributes.message;
      this._trashChip = `${a ? Z(a, s) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const a = t.attributes.start_time, c = t.attributes.message;
      if (a) {
        const o = new Date(a);
        if (!isNaN(o.getTime())) {
          this._trashChip = `${c ? Z(c, s) : "🗑️"} ${ht(o)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const r = parseInt(t.state, 10);
    if (!isNaN(r) && String(r) === t.state.trim()) {
      const a = t.attributes.message, c = r === 0 ? "Heute" : r === 1 ? "Morgen" : `+${r}d`;
      this._trashChip = `${a ? Z(a, s) : "🗑️"} ${c}`;
      return;
    }
    const i = new Date(t.state);
    isNaN(i.getTime()) || (this._trashChip = `🗑️ ${ht(i)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, n = s?.attributes.temperature, r = s ? me[s.state] ?? "🌡️" : null;
    return l`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${r ? l`<span class="chip">${r}${n != null ? ` ${Math.round(n)}°` : ""}</span>` : ""}
          ${this._trashChip ? l`<span class="chip">${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
y.styles = [x, m`
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
z([
  h({ attribute: !1 })
], y.prototype, "hass", 2);
z([
  h({ attribute: !1 })
], y.prototype, "config", 2);
z([
  h({ type: Boolean })
], y.prototype, "dark", 2);
z([
  $()
], y.prototype, "_time", 2);
z([
  $()
], y.prototype, "_date", 2);
z([
  $()
], y.prototype, "_trashChip", 2);
y = z([
  _("nspanel-status-bar")
], y);
var ye = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, yt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? $e(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && ye(t, s, r), r;
};
let K = class extends f {
  constructor() {
    super(...arguments), this.cameraEntity = "";
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
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

          ${this.cameraEntity ? l`
            <div class="stream">
              <ha-camera-stream
                .hass=${this.hass}
                .stateObj=${this.hass.states[this.cameraEntity]}
                muted
                autoPlay
              ></ha-camera-stream>
            </div>
          ` : l`
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
K.styles = [x, m`
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
yt([
  h({ attribute: !1 })
], K.prototype, "hass", 2);
yt([
  h({ type: String })
], K.prototype, "cameraEntity", 2);
K = yt([
  _("nspanel-doorbell-popup")
], K);
var xe = Object.defineProperty, we = Object.getOwnPropertyDescriptor, G = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? we(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && xe(t, s, r), r;
};
function Ae(e) {
  if (e.start.date) return "Ganztag";
  const t = new Date(e.start.dateTime), s = e.end.dateTime ? new Date(e.end.dateTime) : null, n = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return s ? `${n(t)} – ${n(s)}` : n(t);
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
  updated(e) {
    e.has("hass") && this.hass && !this._calFetched && this.config?.calendar_entity && (this._calFetched = !0, this._fetchCalendar());
  }
  async _fetchCalendar() {
    const e = this.config?.calendar_entity;
    if (!e || !this.hass) return;
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    const s = /* @__PURE__ */ new Date();
    s.setHours(23, 59, 59, 999);
    const n = `/api/calendars/${e}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(s.toISOString())}`;
    try {
      const r = await this.hass.fetchWithAuth(n);
      if (r.ok) {
        this._calEvents = await r.json();
        return;
      }
    } catch {
    }
    try {
      const r = await this.hass.callWS({
        type: "calendar/event/list",
        entity_id: e,
        start_date_time: t.toISOString(),
        end_date_time: s.toISOString()
      });
      this._calEvents = r ?? [];
    } catch {
      this._calEvents = [];
    }
  }
  _toggleLight(e) {
    const t = this.hass?.states[e]?.state === "on", s = e.split(".")[0];
    this.hass.callService(s, t ? "turn_off" : "turn_on", { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.person_1 ? t?.states[e.person_1] : null, n = e.person_2 ? t?.states[e.person_2] : null, r = e.garden_light ? t?.states[e.garden_light] : null, i = e.light_2 ? t?.states[e.light_2] : null;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        ${e.calendar_entity ? l`
          <div class="section-label">Heute</div>
          <div class="events-list">
            ${this._calEvents.length > 0 ? this._calEvents.map((a) => l`
                <div class="event-row">
                  <div class="event-dot"></div>
                  <div class="event-body">
                    <div class="event-title">${a.summary}</div>
                    <div class="event-time">${Ae(a)}</div>
                  </div>
                </div>
              `) : l`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : l`<div class="spacer"></div>`}

        ${s || n ? l`
          <div class="persons-row">
            ${s ? this._renderPerson(e.person_1, s) : ""}
            ${n ? this._renderPerson(e.person_2, n) : ""}
          </div>
        ` : ""}

        ${r || i ? l`
          <div class="lights-row">
            ${r ? this._renderLight(e.garden_light, r, e.garden_light_icon ?? "💡") : ""}
            ${i ? this._renderLight(e.light_2, i, e.light_2_icon ?? "💡") : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderPerson(e, t) {
    const n = (t.attributes.friendly_name ?? e).split(" ")[0], r = t.state === "home", i = t.attributes.entity_picture;
    return l`
      <div class="person-chip">
        <div class="person-avatar ${r ? "home" : ""}">
          ${i ? l`<img src="${i}" alt="${n}" />` : l`<span>${n[0]?.toUpperCase() ?? "?"}</span>`}
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
  _renderLight(e, t, s) {
    const n = t.state === "on", r = t.attributes.friendly_name ?? e.split(".")[1];
    return l`
      <button class="light-btn" @click=${() => this._toggleLight(e)}>
        <span class="light-icon">${s}</span>
        <span class="light-name">${r}</span>
        <div class="toggle-track ${n ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
};
P.styles = [x, q, m`
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
      min-width: 0;
      height: 52px;
      border-radius: var(--nsp-r2);
      border: 0.5px solid var(--nsp-card-border, transparent);
      box-shadow: var(--nsp-card-shadow, none);
      backdrop-filter: var(--nsp-glass-blur);
      -webkit-backdrop-filter: var(--nsp-glass-blur);
      background: var(--nsp-surface-2);
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      padding: 0 var(--nsp-s3);
      text-align: left;
    }
    .light-btn:active { opacity: 0.7; }
    .light-icon { font-size: 18px; flex-shrink: 0; }
    .light-name {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .toggle-track {
      width: 44px;
      height: 26px;
      border-radius: 13px;
      background: var(--nsp-surface-3);
      position: relative;
      flex-shrink: 0;
      transition: background 0.25s;
    }
    .toggle-track.on { background: var(--nsp-green); }
    .toggle-knob {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: white;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.25s;
      box-shadow: 0 2px 4px rgba(0,0,0,0.25);
    }
    .toggle-track.on .toggle-knob { transform: translateX(18px); }
  `];
G([
  h({ attribute: !1 })
], P.prototype, "hass", 2);
G([
  h({ attribute: !1 })
], P.prototype, "config", 2);
G([
  h({ type: Boolean })
], P.prototype, "dark", 2);
G([
  $()
], P.prototype, "_calEvents", 2);
P = G([
  _("nspanel-page-home")
], P);
var ke = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, nt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Ee(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && ke(t, s, r), r;
};
let N = class extends f {
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
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const s = t.attributes.current_temperature, n = t.attributes.temperature, r = t.state, i = r === "heat";
    return l`
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
N.styles = [x, q, m`
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
  _("nspanel-page-climate")
], N);
var Ce = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, it = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Se(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && Ce(t, s, r), r;
};
const Pe = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let F = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _cover(e, t) {
    this.hass.callService("cover", t, { entity_id: e });
  }
  _scene(e) {
    const t = e.split(".")[0];
    this.hass.callService(t === "scene" ? "scene" : "script", "turn_on", { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = Pe.map((n) => e[n]).filter((n) => !!n);
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${s.map((n) => {
      const r = t?.states[n];
      if (!r) return l``;
      const i = r.attributes.friendly_name ?? n, a = r.attributes.current_position;
      return l`
              <div class="cover-row">
                <div class="cover-name">${i}</div>
                ${a != null ? l`<div class="cover-pos">${a}%</div>` : ""}
                <div class="cover-btns">
                  <button class="cov-btn" @click=${() => this._cover(n, "open_cover")}>▲</button>
                  <button class="cov-btn" @click=${() => this._cover(n, "stop_cover")}>■</button>
                  <button class="cov-btn" @click=${() => this._cover(n, "close_cover")}>▼</button>
                </div>
              </div>
            `;
    })}
        </div>

        ${e.scene_up || e.scene_down ? l`
          <div class="bottom-bar">
            ${e.scene_up ? l`<button class="scene-btn" @click=${() => this._scene(e.scene_up)}>▲ Alle</button>` : ""}
            ${e.scene_down ? l`<button class="scene-btn" @click=${() => this._scene(e.scene_down)}>▼ Alle</button>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
};
F.styles = [x, q, m`
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
it([
  h({ attribute: !1 })
], F.prototype, "hass", 2);
it([
  h({ attribute: !1 })
], F.prototype, "config", 2);
it([
  h({ type: Boolean })
], F.prototype, "dark", 2);
F = it([
  _("nspanel-page-blinds")
], F);
var ze = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, at = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Oe(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && ze(t, s, r), r;
};
function Dt(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let j = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _call(e, t) {
    const s = this.config?.media_player;
    if (!s) return;
    const [n, r] = e.split(".");
    this.hass.callService(n, r, { entity_id: s, ...t });
  }
  _volume(e) {
    this._call("media_player.volume_set", { volume_level: e.target.valueAsNumber });
  }
  render() {
    const e = this.config?.media_player, t = e ? this.hass?.states[e] : null;
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const s = t.state === "playing", n = t.attributes.media_title ?? "", r = t.attributes.media_artist ?? "", i = t.attributes.entity_picture ?? "", a = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, o = t.attributes.media_position ?? 0, d = t.attributes.media_position_updated_at ?? "";
    let v = o;
    s && d && (v = Math.min(o + (Date.now() - new Date(d).getTime()) / 1e3, c));
    const p = c > 0 ? v / c : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${i ? l`<img class="art" src="${i}" alt="cover" />` : l`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${n || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${r ? l`<div class="track-artist">${r}</div>` : ""}
        </div>

        ${c > 0 ? l`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${p * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Dt(v)}</span>
              <span>${Dt(c)}</span>
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
            ${s ? l`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : l`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>`}
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
j.styles = [x, q, m`
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
at([
  h({ attribute: !1 })
], j.prototype, "hass", 2);
at([
  h({ attribute: !1 })
], j.prototype, "config", 2);
at([
  h({ type: Boolean })
], j.prototype, "dark", 2);
j = at([
  _("nspanel-page-media")
], j);
var Me = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, ot = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Te(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && Me(t, s, r), r;
};
function vt(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
let L = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, n = e.grid_entity ? t?.states[e.grid_entity] : null, r = e.ev_entity ? t?.states[e.ev_entity] : null, i = s ? parseFloat(s.state) : null, a = n ? parseFloat(n.state) : null, c = r ? parseFloat(r.state) : null, o = a != null && a < 0, d = i != null && a != null ? i + (o ? a : 0) + (o ? 0 : a) : null;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${i != null ? vt(i) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
          </div>

          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${d != null ? vt(Math.abs(d)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <div class="stat grid ${o ? "export" : "import"}">
            <div class="stat-icon">${o ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${a != null ? vt(Math.abs(a)) : "–"}</div>
            <div class="stat-lbl">${o ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <div class="stat ev ${r ? "" : "unavail"}">
            <div class="stat-icon">🔋</div>
            <div class="stat-val">${c != null ? `${Math.round(c)}%` : "–"}</div>
            <div class="stat-lbl">Tesla</div>
            ${c != null ? l`
              <div class="ev-track">
                <div class="ev-fill" style="width:${c}%"></div>
              </div>
            ` : l`<div class="stat-hint">nicht verbunden</div>`}
          </div>
        </div>
      </div>
    `;
  }
};
L.styles = [x, q, m`
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
ot([
  h({ attribute: !1 })
], L.prototype, "hass", 2);
ot([
  h({ attribute: !1 })
], L.prototype, "config", 2);
ot([
  h({ type: Boolean })
], L.prototype, "dark", 2);
L = ot([
  _("nspanel-page-energy")
], L);
var De = Object.defineProperty, He = Object.getOwnPropertyDescriptor, $t = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? He(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && De(t, s, r), r;
};
const Ht = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
}, Nt = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" }
], Ne = [
  { name: "weather_entity", label: "Wetter (weather.*)", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Kalender (calendar.*)", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Müllabfuhr (sensor.* / calendar.*)", selector: { entity: { domain: ["sensor", "calendar"] } } },
  { name: "person_1", label: "Person 1 (person.*)", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 (person.*)", selector: { entity: { domain: "person" } } },
  { name: "garden_light", label: "Licht 1 (light.* / switch.*)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Licht 1 Icon (Emoji, leer = 💡)", selector: { text: {} } },
  { name: "light_2", label: "Licht 2 (light.* / switch.*) — optional", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Licht 2 Icon (Emoji, leer = 💡)", selector: { text: {} } }
], Fe = [
  { name: "thermostat_entity", label: "Thermostat (climate.*)", selector: { entity: { domain: "climate" } } }
], je = [
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
], Le = [
  { name: "media_player", label: "Media Player (media_player.*)", selector: { entity: { domain: "media_player" } } }
], Ue = [
  { name: "pv_entity", label: "PV Erzeugung (sensor.*, W oder kW)", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV / Akku SoC in % (sensor.*) — optional", selector: { entity: { domain: "sensor" } } }
], Be = [
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.*)", selector: { entity: { domain: "binary_sensor" } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Ie = (e) => e.label ?? e.name;
let tt = class extends f {
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
    return l`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${Ie} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return l``;
    const e = this._config, t = e.pages ?? ["home"], s = (r) => `${r}_label`, n = (r) => e[s(r)] ?? "";
    return l`
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
        ${Nt.map((r) => l`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${n(r.id) || Ht[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(Nt.map((r) => ({
      name: `${r.id}_label`,
      label: `${Ht[r.id]} — benutzerdefinierter Name`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <div class="nsp-sec">Home</div>
      ${this._form(Ne)}
      <details class="nsp-details">
        <summary>🗑️ Müll-Kategorien anpassen</summary>
        <div class="nsp-details-body">
          <p style="font-size:12px;color:var(--secondary-text-color);margin:0 0 8px">
            Format: <code>schlüsselwort,weiteres=🔴</code> (eine Kategorie pro Zeile)<br>
            Leer lassen für Standard: papier=🔴 · gelb,sack=🟡 · rest,sperr=⚫
          </p>
          ${this._form([{
      name: "trash_mapping",
      label: "Kategorie-Mapping (leer = Standard)",
      selector: { text: { multiline: !0 } }
    }])}
        </div>
      </details>

      <div class="nsp-sec">Climate</div>
      ${this._form(Fe)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(je)}

      <div class="nsp-sec">Media</div>
      ${this._form(Le)}

      <div class="nsp-sec">Energie</div>
      ${this._form(Ue)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(Be)}

      <div class="nsp-sec">Hintergrund</div>
      ${this._form([
      { name: "bg_accent_1", label: "Glow-Farbe 1 (Hex, z.B. #0A84FF — leer = iOS Blau)", selector: { text: {} } },
      { name: "bg_accent_2", label: "Glow-Farbe 2 (Hex, z.B. #BF5AF2 — leer = iOS Lila)", selector: { text: {} } }
    ])}
    `;
  }
};
$t([
  h({ attribute: !1 })
], tt.prototype, "hass", 2);
$t([
  $()
], tt.prototype, "_config", 2);
tt = $t([
  _("nspanel-dashboard-editor")
], tt);
var Re = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, U = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Ve(t, s) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (r = (n ? a(t, s, r) : a(r)) || r);
  return n && r && Re(t, s, r), r;
};
let A = class extends f {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(e, t) {
    if (!e) return "";
    const s = e.replace("#", "");
    if (s.length !== 6) return "";
    const n = parseInt(s.slice(0, 2), 16), r = parseInt(s.slice(2, 4), 16), i = parseInt(s.slice(4, 6), 16);
    return `rgba(${n},${r},${i},${t})`;
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
        const n = e.get("hass")?.states[t]?.state !== "on", r = this.hass.states[t]?.state === "on";
        n && r && (this._doorbellActive = !0);
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return l``;
    const e = this._dark, t = e ? 0.18 : 0.09, s = this._glowVar(this._config.bg_accent_1, t), n = this._glowVar(this._config.bg_accent_2, t), r = [s ? `--nsp-glow-1:${s}` : "", n ? `--nsp-glow-2:${n}` : ""].filter(Boolean).join(";");
    return l`
      <div class="shell ${e ? "nsp-dark" : ""}" style="${r}">
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
      energy: this._config.energy_label
    }}
          @page-change=${(i) => {
      this._activePage = i.detail.page;
    }}
        ></nspanel-bottom-nav>

        ${this._doorbellActive ? l`
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
        return l`<nspanel-page-home    .hass=${e} .config=${t} ?dark=${s}></nspanel-page-home>`;
      case "climate":
        return l`<nspanel-page-climate .hass=${e} .config=${t} ?dark=${s}></nspanel-page-climate>`;
      case "blinds":
        return l`<nspanel-page-blinds  .hass=${e} .config=${t} ?dark=${s}></nspanel-page-blinds>`;
      case "media":
        return l`<nspanel-page-media   .hass=${e} .config=${t} ?dark=${s}></nspanel-page-media>`;
      case "energy":
        return l`<nspanel-page-energy  .hass=${e} .config=${t} ?dark=${s}></nspanel-page-energy>`;
      default:
        return l``;
    }
  }
};
A.styles = [x, m`
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
U([
  h({ attribute: !1 })
], A.prototype, "hass", 2);
U([
  $()
], A.prototype, "_config", 2);
U([
  $()
], A.prototype, "_activePage", 2);
U([
  $()
], A.prototype, "_doorbellActive", 2);
U([
  $()
], A.prototype, "_dark", 2);
A = U([
  _("nspanel-dashboard")
], A);
export {
  A as NspanelDashboard
};
