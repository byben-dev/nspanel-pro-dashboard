/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, ft = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), wt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(t, s, n) {
    if (this._$cssResult$ = !0, n !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (ft && t === void 0) {
      const n = s !== void 0 && s.length === 1;
      n && (t = wt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && wt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (e) => new Nt(typeof e == "string" ? e : e + "", void 0, gt), _ = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((n, r, a) => n + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[a + 1], e[0]);
  return new Nt(s, e, gt);
}, Vt = (e, t) => {
  if (ft) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const n = document.createElement("style"), r = et.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = s.cssText, e.appendChild(n);
  }
}, kt = ft ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const n of t.cssRules) s += n.cssText;
  return Rt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wt, defineProperty: Kt, getOwnPropertyDescriptor: Jt, getOwnPropertyNames: qt, getOwnPropertySymbols: Gt, getPrototypeOf: Zt } = Object, at = globalThis, At = at.trustedTypes, Yt = At ? At.emptyScript : "", Xt = at.reactiveElementPolyfillSupport, W = (e, t) => e, st = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Yt : null;
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
} }, mt = (e, t) => !Wt(e, t), Et = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= Symbol("metadata"), at.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Et) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, s);
      r !== void 0 && Kt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, n) {
    const { get: r, set: a } = Jt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: r, set(i) {
      const c = r?.call(this);
      a?.call(this, i), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(W("elementProperties"))) return;
    const t = Zt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(W("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(W("properties"))) {
      const s = this.properties, n = [...qt(s), ...Gt(s)];
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
      for (const r of n) s.unshift(kt(r));
    } else t !== void 0 && s.push(kt(t));
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
    return Vt(t, this.constructor.elementStyles), t;
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
      const a = (n.converter?.toAttribute !== void 0 ? n.converter : st).toAttribute(s, n.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = n.getPropertyOptions(r), i = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : st;
      this._$Em = r;
      const c = i.fromAttribute(s, a.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, n, r = !1, a) {
    if (t !== void 0) {
      const i = this.constructor;
      if (r === !1 && (a = this[t]), n ??= i.getPropertyOptions(t), !((n.hasChanged ?? mt)(a, s) || n.useDefault && n.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, n)))) return;
      this.C(t, s, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: n, reflect: r, wrapped: a }, i) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? s ?? this[t]), a !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [r, a] of n) {
        const { wrapped: i } = a, c = this[r];
        i !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[W("elementProperties")] = /* @__PURE__ */ new Map(), D[W("finalized")] = /* @__PURE__ */ new Map(), Xt?.({ ReactiveElement: D }), (at.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Ct = (e) => e, rt = bt.trustedTypes, St = rt ? rt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, jt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + A, Qt = `<${Bt}>`, z = document, K = () => z.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", _t = Array.isArray, te = (e) => _t(e) || typeof e?.[Symbol.iterator] == "function", ht = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, zt = />/g, S = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Mt = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ee = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = ee(1), F = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Tt = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function It(e, t) {
  if (!_t(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return St !== void 0 ? St.createHTML(t) : t;
}
const se = (e, t) => {
  const s = e.length - 1, n = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = V;
  for (let c = 0; c < s; c++) {
    const o = e[c];
    let p, h, d = -1, u = 0;
    for (; u < o.length && (i.lastIndex = u, h = i.exec(o), h !== null); ) u = i.lastIndex, i === V ? h[1] === "!--" ? i = Pt : h[1] !== void 0 ? i = zt : h[2] !== void 0 ? (Ut.test(h[2]) && (r = RegExp("</" + h[2], "g")), i = S) : h[3] !== void 0 && (i = S) : i === S ? h[0] === ">" ? (i = r ?? V, d = -1) : h[1] === void 0 ? d = -2 : (d = i.lastIndex - h[2].length, p = h[1], i = h[3] === void 0 ? S : h[3] === '"' ? Mt : Ot) : i === Mt || i === Ot ? i = S : i === Pt || i === zt ? i = V : (i = S, r = void 0);
    const g = i === S && e[c + 1].startsWith("/>") ? " " : "";
    a += i === V ? o + Qt : d >= 0 ? (n.push(p), o.slice(0, d) + jt + o.slice(d) + A + g) : o + A + (d === -2 ? c : g);
  }
  return [It(e, a + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class q {
  constructor({ strings: t, _$litType$: s }, n) {
    let r;
    this.parts = [];
    let a = 0, i = 0;
    const c = t.length - 1, o = this.parts, [p, h] = se(t, s);
    if (this.el = q.createElement(p, n), P.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = P.nextNode()) !== null && o.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(jt)) {
          const u = h[i++], g = r.getAttribute(d).split(A), b = /([.?@])?(.*)/.exec(u);
          o.push({ type: 1, index: a, name: b[2], strings: g, ctor: b[1] === "." ? ne : b[1] === "?" ? ae : b[1] === "@" ? ie : it }), r.removeAttribute(d);
        } else d.startsWith(A) && (o.push({ type: 6, index: a }), r.removeAttribute(d));
        if (Ut.test(r.tagName)) {
          const d = r.textContent.split(A), u = d.length - 1;
          if (u > 0) {
            r.textContent = rt ? rt.emptyScript : "";
            for (let g = 0; g < u; g++) r.append(d[g], K()), P.nextNode(), o.push({ type: 2, index: ++a });
            r.append(d[u], K());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Bt) o.push({ type: 2, index: a });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(A, d + 1)) !== -1; ) o.push({ type: 7, index: a }), d += A.length - 1;
      }
      a++;
    }
  }
  static createElement(t, s) {
    const n = z.createElement("template");
    return n.innerHTML = t, n;
  }
}
function H(e, t, s = e, n) {
  if (t === F) return t;
  let r = n !== void 0 ? s._$Co?.[n] : s._$Cl;
  const a = J(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(e), r._$AT(e, s, n)), n !== void 0 ? (s._$Co ??= [])[n] = r : s._$Cl = r), r !== void 0 && (t = H(e, r._$AS(e, t.values), r, n)), t;
}
class re {
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
    const { el: { content: s }, parts: n } = this._$AD, r = (t?.creationScope ?? z).importNode(s, !0);
    P.currentNode = r;
    let a = P.nextNode(), i = 0, c = 0, o = n[0];
    for (; o !== void 0; ) {
      if (i === o.index) {
        let p;
        o.type === 2 ? p = new Z(a, a.nextSibling, this, t) : o.type === 1 ? p = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (p = new oe(a, this, t)), this._$AV.push(p), o = n[++c];
      }
      i !== o?.index && (a = P.nextNode(), i++);
    }
    return P.currentNode = z, r;
  }
  p(t) {
    let s = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, s), s += n.strings.length - 2) : n._$AI(t[s])), s++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, n, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = H(this, t, s), J(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = q.createElement(It(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const a = new re(r, this), i = a.u(this.options);
      a.p(s), this.T(i), this._$AH = a;
    }
  }
  _$AC(t) {
    let s = Tt.get(t.strings);
    return s === void 0 && Tt.set(t.strings, s = new q(t)), s;
  }
  k(t) {
    _t(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let n, r = 0;
    for (const a of t) r === s.length ? s.push(n = new Z(this.O(K()), this.O(K()), this, this.options)) : n = s[r], n._$AI(a), r++;
    r < s.length && (this._$AR(n && n._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const n = Ct(t).nextSibling;
      Ct(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class it {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, n, r, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, s = this, n, r) {
    const a = this.strings;
    let i = !1;
    if (a === void 0) t = H(this, t, s, 0), i = !J(t) || t !== this._$AH && t !== F, i && (this._$AH = t);
    else {
      const c = t;
      let o, p;
      for (t = a[0], o = 0; o < a.length - 1; o++) p = H(this, c[n + o], s, o), p === F && (p = this._$AH[o]), i ||= !J(p) || p !== this._$AH[o], p === f ? t = f : t !== f && (t += (p ?? "") + a[o + 1]), this._$AH[o] = p;
    }
    i && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ne extends it {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class ae extends it {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ie extends it {
  constructor(t, s, n, r, a) {
    super(t, s, n, r, a), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = H(this, t, s, 0) ?? f) === F) return;
    const n = this._$AH, r = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== f && (n === f || r);
    r && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
  constructor(t, s, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const le = bt.litHtmlPolyfillSupport;
le?.(q, Z), (bt.litHtmlVersions ??= []).push("3.3.3");
const ce = (e, t, s) => {
  const n = s?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const a = s?.renderBefore ?? null;
    n._$litPart$ = r = new Z(t.insertBefore(K(), a), a, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis;
class m extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ce(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return F;
  }
}
m._$litElement$ = !0, m.finalized = !0, yt.litElementHydrateSupport?.({ LitElement: m });
const pe = yt.litElementPolyfillSupport;
pe?.({ LitElement: m });
(yt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: mt }, he = (e = de, t, s) => {
  const { kind: n, metadata: r } = s;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(s.name, e), n === "accessor") {
    const { name: i } = s;
    return { set(c) {
      const o = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(i, o, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(i, void 0, e, c), c;
    } };
  }
  if (n === "setter") {
    const { name: i } = s;
    return function(c) {
      const o = this[i];
      t.call(this, c), this.requestUpdate(i, o, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function v(e) {
  return (t, s) => typeof s == "object" ? he(e, t, s) : ((n, r, a) => {
    const i = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, n), i ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(e) {
  return v({ ...e, state: !0, attribute: !1 });
}
const k = _`
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
`, Y = _`
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
var ve = Object.defineProperty, ue = Object.getOwnPropertyDescriptor, ot = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? ue(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && ve(t, s, r), r;
};
const fe = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z"
}, Dt = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
};
let L = class extends m {
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
            aria-label=${Dt[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${fe[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Dt[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
L.styles = [k, _`
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
  v({ type: Array })
], L.prototype, "pages", 2);
ot([
  v({ type: String })
], L.prototype, "activePage", 2);
ot([
  v({ attribute: !1 })
], L.prototype, "customLabels", 2);
L = ot([
  $("nspanel-bottom-nav")
], L);
var ge = Object.defineProperty, me = Object.getOwnPropertyDescriptor, M = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? me(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && ge(t, s, r), r;
};
const be = {
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
}, _e = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function ye(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const s = t.lastIndexOf("="), n = t.slice(0, s).split(",").map((a) => a.trim().toLowerCase()).filter(Boolean), r = t.slice(s + 1).trim() || "🗑️";
    return { keywords: n, icon: r };
  });
}
function Q(e, t) {
  const s = ye(t ?? _e), n = e.toLowerCase();
  for (const r of s)
    if (r.keywords.some((a) => n.includes(a))) return r.icon;
  return "🗑️";
}
function vt(e) {
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
let w = class extends m {
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
      const i = /* @__PURE__ */ new Date();
      i.setHours(0, 0, 0, 0);
      const c = new Date(i);
      c.setDate(c.getDate() + 14);
      const o = await this.hass.fetchWithAuth(
        `/api/calendars/${e}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(c.toISOString())}`
      );
      if (o.ok) {
        const p = await o.json();
        if (p.length > 0) {
          const h = /* @__PURE__ */ new Map();
          for (const x of p) {
            const T = x.start.date ?? x.start.dateTime ?? "", R = new Date(T);
            if (isNaN(R.getTime())) continue;
            R.setHours(0, 0, 0, 0);
            const dt = R.toISOString();
            h.has(dt) || h.set(dt, []), h.get(dt).push(x.summary);
          }
          const [d, u] = [...h.entries()].sort((x, T) => x[0].localeCompare(T[0]))[0], g = this.config?.trash_mapping, b = [...new Set(u.map((x) => Q(x, g)))].join("");
          this._trashChip = `${b} ${vt(new Date(d))}`;
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
      const i = t.attributes.message;
      this._trashChip = `${i ? Q(i, s) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const i = t.attributes.start_time, c = t.attributes.message;
      if (i) {
        const o = new Date(i);
        if (!isNaN(o.getTime())) {
          this._trashChip = `${c ? Q(c, s) : "🗑️"} ${vt(o)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const r = parseInt(t.state, 10);
    if (!isNaN(r) && String(r) === t.state.trim()) {
      const i = t.attributes.message, c = r === 0 ? "Heute" : r === 1 ? "Morgen" : `+${r}d`;
      this._trashChip = `${i ? Q(i, s) : "🗑️"} ${c}`;
      return;
    }
    const a = new Date(t.state);
    isNaN(a.getTime()) || (this._trashChip = `🗑️ ${vt(a)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, n = s?.attributes.temperature, r = s ? be[s.state] ?? "🌡️" : null;
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
w.styles = [k, _`
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
M([
  v({ attribute: !1 })
], w.prototype, "hass", 2);
M([
  v({ attribute: !1 })
], w.prototype, "config", 2);
M([
  v({ type: Boolean })
], w.prototype, "dark", 2);
M([
  y()
], w.prototype, "_time", 2);
M([
  y()
], w.prototype, "_date", 2);
M([
  y()
], w.prototype, "_trashChip", 2);
w = M([
  $("nspanel-status-bar")
], w);
var xe = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, xt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? $e(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && xe(t, s, r), r;
};
let G = class extends m {
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
G.styles = [k, _`
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
xt([
  v({ attribute: !1 })
], G.prototype, "hass", 2);
xt([
  v({ type: String })
], G.prototype, "cameraEntity", 2);
G = xt([
  $("nspanel-doorbell-popup")
], G);
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, U = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? ke(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && we(t, s, r), r;
};
function Ae(e) {
  if (e.start.date) return "Ganztag";
  const t = new Date(e.start.dateTime), s = e.end.dateTime ? new Date(e.end.dateTime) : null, n = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return s ? `${n(t)} – ${n(s)}` : n(t);
}
const Ee = {
  cleaning: "Saugt gerade",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
};
let E = class extends m {
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
        const s = parseFloat(this.hass.states[t]?.state ?? "0") || 0;
        s > this._dishMax && (this._dishMax = s), s === 0 && (this._dishMax = 0);
      }
    }
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
    const t = this.hass?.states[e]?.state === "on";
    this.hass.callService(e.split(".")[0], t ? "turn_off" : "turn_on", { entity_id: e });
  }
  _vacuumAction(e, t) {
    const s = t === "cleaning" || t === "returning" || t === "paused" ? "return_to_base" : "start";
    this.hass.callService("vacuum", s, { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.garden_light ? t?.states[e.garden_light] : null, n = e.light_2 ? t?.states[e.light_2] : null, r = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, a = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, i = a && parseFloat(a.state) || 0, c = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        ${e.calendar_entity ? l`
          <div class="section-label">Heute</div>
          <div class="events-list">
            ${this._calEvents.length > 0 ? this._calEvents.map((o) => l`
                <div class="event-row">
                  <div class="event-dot"></div>
                  <div class="event-body">
                    <div class="event-title">${o.summary}</div>
                    <div class="event-time">${Ae(o)}</div>
                  </div>
                </div>
              `) : l`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : l`<div class="spacer"></div>`}

        ${s || n ? l`
          <div class="lights-row">
            ${s ? this._renderLight(e.garden_light, s, e.garden_light_icon ?? "💡") : ""}
            ${n ? this._renderLight(e.light_2, n, e.light_2_icon ?? "💡") : ""}
          </div>
        ` : ""}

        ${r ? l`
          <div class="vacuum-row">
            ${this._renderVacuum(e.vacuum_entity, r)}
          </div>
        ` : ""}

        ${i > 0 ? l`
          <div class="dish-row">
            <span class="dish-icon">🍽️</span>
            <div class="dish-track">
              <div class="dish-fill" style="width:${c}%"></div>
            </div>
            <span class="dish-time">${Math.round(i)} min</span>
          </div>
        ` : ""}

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
  _renderVacuum(e, t) {
    const s = t.state, n = Ee[s] ?? s, r = s === "cleaning" || s === "returning" || s === "paused", a = s !== "error" && s !== "returning";
    return l`
      <button class="vacuum-btn ${r ? "active" : ""}"
        @click=${a ? () => this._vacuumAction(e, s) : void 0}
        ?disabled=${!a}>
        <span class="vacuum-icon">🤖</span>
        <span class="vacuum-label">${n}</span>
        ${a ? l`
          <div class="vacuum-action ${r ? "stop" : "start"}">${r ? "⏹" : "▶"}</div>
        ` : ""}
      </button>
    `;
  }
};
E.styles = [k, Y, _`
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

    /* Lights */
    .lights-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .light-btn {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
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

    /* Vacuum */
    .vacuum-row { flex-shrink: 0; }

    .vacuum-btn {
      width: 100%;
      box-sizing: border-box;
      height: 46px;
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
      gap: var(--nsp-s2);
      padding: 0 var(--nsp-s3);
    }
    .vacuum-btn.active {
      background: rgba(48,209,88,0.12);
      border-color: rgba(48,209,88,0.3);
    }
    .vacuum-btn:disabled { opacity: 0.6; cursor: default; }
    .vacuum-btn:not(:disabled):active { opacity: 0.7; }
    .vacuum-icon { font-size: 18px; flex-shrink: 0; }
    .vacuum-label {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      text-align: left;
    }
    .vacuum-action {
      width: 32px;
      height: 32px;
      border-radius: var(--nsp-r1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      flex-shrink: 0;
    }
    .vacuum-action.start { background: var(--nsp-green); color: white; }
    .vacuum-action.stop  { background: var(--nsp-red);   color: white; }

    /* Dishwasher */
    .dish-row {
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
    .dish-icon { font-size: 16px; flex-shrink: 0; }
    .dish-track {
      flex: 1;
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .dish-fill {
      height: 100%;
      background: var(--nsp-teal);
      border-radius: 2px;
      transition: width 1s linear;
    }
    .dish-time {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
      flex-shrink: 0;
      min-width: 36px;
      text-align: right;
    }
  `];
U([
  v({ attribute: !1 })
], E.prototype, "hass", 2);
U([
  v({ attribute: !1 })
], E.prototype, "config", 2);
U([
  v({ type: Boolean })
], E.prototype, "dark", 2);
U([
  y()
], E.prototype, "_calEvents", 2);
U([
  y()
], E.prototype, "_dishMax", 2);
E = U([
  $("nspanel-page-home")
], E);
var Ce = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, lt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Se(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && Ce(t, s, r), r;
};
let N = class extends m {
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
    const s = t.attributes.current_temperature, n = t.attributes.temperature, r = t.state, a = r === "heat";
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${a ? "heating" : ""}">
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
          <button class="mode-btn ${a ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
N.styles = [k, Y, _`
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
lt([
  v({ attribute: !1 })
], N.prototype, "hass", 2);
lt([
  v({ attribute: !1 })
], N.prototype, "config", 2);
lt([
  v({ type: Boolean })
], N.prototype, "dark", 2);
N = lt([
  $("nspanel-page-climate")
], N);
var Pe = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, X = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? ze(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && Pe(t, s, r), r;
};
const Oe = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let O = class extends m {
  constructor() {
    super(...arguments), this.dark = !1, this._moving = {}, this._movingFrom = {};
  }
  updated(e) {
    if (!e.has("hass") || !this.hass) return;
    const t = { ...this._moving };
    let s = !1;
    for (const n of Object.keys(t)) {
      const r = this.hass.states[n];
      if (!r) continue;
      const a = t[n], i = r.state, c = r.attributes.current_position, o = this._movingFrom[n];
      (a === "up" ? i === "open" || c === 100 : a === "down" ? i === "closed" || c === 0 : !1) && i !== o && (delete t[n], delete this._movingFrom[n], s = !0);
    }
    s && (this._moving = t);
  }
  _cover(e, t) {
    if (this.hass.callService("cover", t, { entity_id: e }), t === "open_cover")
      this._movingFrom[e] = this.hass.states[e]?.state ?? "", this._moving = { ...this._moving, [e]: "up" };
    else if (t === "close_cover")
      this._movingFrom[e] = this.hass.states[e]?.state ?? "", this._moving = { ...this._moving, [e]: "down" };
    else {
      const s = { ...this._moving };
      delete s[e], delete this._movingFrom[e], this._moving = s;
    }
  }
  _scene(e) {
    const t = e.split(".")[0];
    this.hass.callService(t === "scene" ? "scene" : "script", "turn_on", { entity_id: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = Oe.map((n) => e[n]).filter((n) => !!n);
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${s.map((n) => {
      const r = t?.states[n];
      if (!r) return l``;
      const a = r.attributes.friendly_name ?? n, i = r.attributes.current_position, c = i != null ? 100 - i : null, o = this._moving[n], p = i != null ? `${i}%` : r.state === "open" ? "Offen" : r.state === "closed" ? "Zu" : "–", h = r.state === "open" ? "st-open" : r.state === "closed" ? "st-closed" : "st-mid";
      return l`
              <div class="cover-row">
                ${c != null ? l`
                  <div class="pos-bar" style="width:${c}%"></div>
                ` : ""}
                <div class="cover-name">${a}</div>
                <div class="cover-pos ${h}">${p}</div>
                <button class="cov-btn ${o === "up" ? "active" : ""}"
                  @click=${() => this._cover(n, o === "up" ? "stop_cover" : "open_cover")}
                  aria-label="${o === "up" ? "Stop" : "Öffnen"}">${o === "up" ? "■" : "▲"}</button>
                <button class="cov-btn ${o === "down" ? "active" : ""}"
                  @click=${() => this._cover(n, o === "down" ? "stop_cover" : "close_cover")}
                  aria-label="${o === "down" ? "Stop" : "Schließen"}">${o === "down" ? "■" : "▼"}</button>
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
O.styles = [k, Y, _`
    .page { gap: var(--nsp-s2); }

    .covers-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--nsp-s2);
      overflow-y: auto;
      min-height: 0;
    }

    .cover-row {
      position: relative;
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
      height: 52px;
      flex-shrink: 0;
      box-sizing: border-box;
      overflow: hidden;
    }

    /* Position shown as a frosted bar on the left edge */
    .pos-bar {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: var(--nsp-surface-3);
      border-radius: var(--nsp-r2) 0 0 var(--nsp-r2);
      pointer-events: none;
      transition: width 0.4s ease;
      max-width: 100%;
    }

    .cover-name {
      position: relative;
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    .cover-pos {
      position: relative;
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 500;
      color: var(--nsp-text-3);
      flex-shrink: 0;
      min-width: 36px;
      text-align: right;
    }
    .cover-pos.st-open   { color: var(--nsp-green); }
    .cover-pos.st-closed { color: var(--nsp-text-3); }
    .cover-pos.st-mid    { color: var(--nsp-text-3); opacity: 0.5; }

    .cov-btn {
      position: relative;
      width: 44px;
      height: 44px;
      border-radius: var(--nsp-r1);
      border: none;
      background: var(--nsp-surface-3);
      color: var(--nsp-text-1);
      font-size: 13px;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cov-btn.active { background: var(--nsp-orange); color: white; }
    .cov-btn:active { opacity: 0.5; }

    .bottom-bar {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .scene-btn {
      flex: 1;
      min-width: 0;
      box-sizing: border-box;
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
X([
  v({ attribute: !1 })
], O.prototype, "hass", 2);
X([
  v({ attribute: !1 })
], O.prototype, "config", 2);
X([
  v({ type: Boolean })
], O.prototype, "dark", 2);
X([
  y()
], O.prototype, "_moving", 2);
O = X([
  $("nspanel-page-blinds")
], O);
var Me = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, ct = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Te(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && Me(t, s, r), r;
};
function Ft(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let j = class extends m {
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
    const s = t.state === "playing", n = t.attributes.media_title ?? "", r = t.attributes.media_artist ?? "", a = t.attributes.entity_picture ?? "", i = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, o = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let h = o;
    s && p && (h = Math.min(o + (Date.now() - new Date(p).getTime()) / 1e3, c));
    const d = c > 0 ? h / c : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${a ? l`<img class="art" src="${a}" alt="cover" />` : l`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${n || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${r ? l`<div class="track-artist">${r}</div>` : ""}
        </div>

        ${c > 0 ? l`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Ft(h)}</span>
              <span>${Ft(c)}</span>
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
            .value=${String(i)} @change=${this._volume} />
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </div>
      </div>
    `;
  }
};
j.styles = [k, Y, _`
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
ct([
  v({ attribute: !1 })
], j.prototype, "hass", 2);
ct([
  v({ attribute: !1 })
], j.prototype, "config", 2);
ct([
  v({ type: Boolean })
], j.prototype, "dark", 2);
j = ct([
  $("nspanel-page-media")
], j);
var De = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, pt = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Fe(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && De(t, s, r), r;
};
function ut(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function tt(e) {
  return `${e.toFixed(1)} kWh`;
}
let B = class extends m {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, n = e.grid_entity ? t?.states[e.grid_entity] : null, r = e.ev_entity ? t?.states[e.ev_entity] : null, a = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, i = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, c = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, o = s ? parseFloat(s.state) : null, p = n ? parseFloat(n.state) : null, h = r ? parseFloat(r.state) : null, d = a ? parseFloat(a.state) : null, u = i ? parseFloat(i.state) : null, g = c ? parseFloat(c.state) : null, b = p != null && p < 0, x = o != null && p != null ? o + (b ? p : 0) + (b ? 0 : p) : null, T = u != null && u > 0 && d != null ? Math.min(d / u, 1) : null, R = u != null || g != null;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <!-- PV Production -->
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${o != null ? ut(o) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
            ${d != null ? l`
              <div class="stat-sub">Heute ${tt(d)}</div>
            ` : ""}
          </div>

          <!-- Home Consumption -->
          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${x != null ? ut(Math.abs(x)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <!-- Grid -->
          <div class="stat grid ${b ? "export" : "import"}">
            <div class="stat-icon">${b ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${p != null ? ut(Math.abs(p)) : "–"}</div>
            <div class="stat-lbl">${b ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <!-- Tesla / EV -->
          <div class="stat ev ${r ? "" : "unavail"}">
            <div class="stat-icon">🔋</div>
            <div class="stat-val">${h != null ? `${Math.round(h)}%` : "–"}</div>
            <div class="stat-lbl">Tesla</div>
            ${h != null ? l`
              <div class="ev-track">
                <div class="ev-fill" style="width:${h}%"></div>
              </div>
            ` : l`<div class="stat-hint">nicht verbunden</div>`}
          </div>
        </div>

        <!-- Forecast row -->
        ${R ? l`
          <div class="forecast-row">
            ${u != null ? l`
              <div class="fc-card">
                <div class="fc-label">Prognose Heute</div>
                <div class="fc-val">${tt(u)}</div>
                ${T != null ? l`
                  <div class="fc-track">
                    <div class="fc-fill" style="width:${T * 100}%"></div>
                  </div>
                  <div class="fc-sub">${d != null ? tt(d) : ""} erreicht</div>
                ` : ""}
              </div>
            ` : ""}
            ${g != null ? l`
              <div class="fc-card">
                <div class="fc-label">Prognose Morgen</div>
                <div class="fc-val">${tt(g)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
};
B.styles = [k, Y, _`
    .pg-title {
      font-family: var(--nsp-font);
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--nsp-text-3);
      text-align: center;
      flex-shrink: 0;
    }
    .stats-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--nsp-s2);
      min-height: 0;
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
      overflow: hidden;
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
    .stat-sub {
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: 2px;
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

    /* Forecast row */
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
      margin-top: 3px;
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
  `];
pt([
  v({ attribute: !1 })
], B.prototype, "hass", 2);
pt([
  v({ attribute: !1 })
], B.prototype, "config", 2);
pt([
  v({ type: Boolean })
], B.prototype, "dark", 2);
B = pt([
  $("nspanel-page-energy")
], B);
var He = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, $t = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Le(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && He(t, s, r), r;
};
const Ht = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy"
}, Lt = [
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
  { name: "light_2_icon", label: "Licht 2 Icon (Emoji, leer = 💡)", selector: { text: {} } },
  { name: "vacuum_entity", label: "Saugroboter (vacuum.*) — optional", selector: { entity: { domain: "vacuum" } } },
  { name: "dishwasher_entity", label: "Spülmaschine Restzeit (sensor.*, Minuten) — optional", selector: { entity: { domain: "sensor" } } }
], je = [
  { name: "thermostat_entity", label: "Thermostat (climate.*)", selector: { entity: { domain: "climate" } } }
], Be = [
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
], Ue = [
  { name: "media_player", label: "Media Player (media_player.*)", selector: { entity: { domain: "media_player" } } }
], Ie = [
  { name: "pv_entity", label: "PV Erzeugung (sensor.*, W oder kW)", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV / Akku SoC in % (sensor.*) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "pv_today_entity", label: "PV Tagesertrag (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Prognose Heute (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Prognose Morgen (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } }
], Re = [
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.* oder input_boolean.*)", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Ve = (e) => e.label ?? e.name;
let nt = class extends m {
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
        .computeLabel=${Ve} @value-changed=${this._merge}></ha-form>
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
        ${Lt.map((r) => l`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${n(r.id) || Ht[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(Lt.map((r) => ({
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
      ${this._form(je)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(Be)}

      <div class="nsp-sec">Media</div>
      ${this._form(Ue)}

      <div class="nsp-sec">Energie</div>
      ${this._form(Ie)}

      <div class="nsp-sec">Türklingel</div>
      ${this._form(Re)}

      <div class="nsp-sec">Hintergrund</div>
      ${this._form([
      { name: "bg_accent_1", label: "Glow-Farbe 1 (Hex, z.B. #0A84FF — leer = iOS Blau)", selector: { text: {} } },
      { name: "bg_accent_2", label: "Glow-Farbe 2 (Hex, z.B. #BF5AF2 — leer = iOS Lila)", selector: { text: {} } }
    ])}
    `;
  }
};
$t([
  v({ attribute: !1 })
], nt.prototype, "hass", 2);
$t([
  y()
], nt.prototype, "_config", 2);
nt = $t([
  $("nspanel-dashboard-editor")
], nt);
var We = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, I = (e, t, s, n) => {
  for (var r = n > 1 ? void 0 : n ? Ke(t, s) : t, a = e.length - 1, i; a >= 0; a--)
    (i = e[a]) && (r = (n ? i(t, s, r) : i(r)) || r);
  return n && r && We(t, s, r), r;
};
let C = class extends m {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(e, t) {
    if (!e) return "";
    const s = e.replace("#", "");
    if (s.length !== 6) return "";
    const n = parseInt(s.slice(0, 2), 16), r = parseInt(s.slice(2, 4), 16), a = parseInt(s.slice(4, 6), 16);
    return `rgba(${n},${r},${a},${t})`;
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
          @page-change=${(a) => {
      this._activePage = a.detail.page;
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
C.styles = [k, _`
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
  `];
I([
  v({ attribute: !1 })
], C.prototype, "hass", 2);
I([
  y()
], C.prototype, "_config", 2);
I([
  y()
], C.prototype, "_activePage", 2);
I([
  y()
], C.prototype, "_doorbellActive", 2);
I([
  y()
], C.prototype, "_dark", 2);
C = I([
  $("nspanel-dashboard")
], C);
export {
  C as NspanelDashboard
};
