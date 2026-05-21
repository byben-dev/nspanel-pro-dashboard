/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = globalThis, ft = et.ShadowRoot && (et.ShadyCSS === void 0 || et.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), wt = /* @__PURE__ */ new WeakMap();
let Nt = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ft && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = wt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && wt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Rt = (s) => new Nt(typeof s == "string" ? s : s + "", void 0, gt), _ = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((n, r, a) => n + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[a + 1], s[0]);
  return new Nt(e, s, gt);
}, Vt = (s, t) => {
  if (ft) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), r = et.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = e.cssText, s.appendChild(n);
  }
}, kt = ft ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Rt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wt, defineProperty: Kt, getOwnPropertyDescriptor: Jt, getOwnPropertyNames: qt, getOwnPropertySymbols: Gt, getPrototypeOf: Zt } = Object, at = globalThis, At = at.trustedTypes, Yt = At ? At.emptyScript : "", Xt = at.reactiveElementPolyfillSupport, W = (s, t) => s, st = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Yt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, mt = (s, t) => !Wt(s, t), Et = { attribute: !0, type: String, converter: st, reflect: !1, useDefault: !1, hasChanged: mt };
Symbol.metadata ??= Symbol("metadata"), at.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(t, n, e);
      r !== void 0 && Kt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: r, set: a } = Jt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(i) {
      this[e] = i;
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
      const e = this.properties, n = [...qt(e), ...Gt(e)];
      for (const r of n) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, r] of e) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const r = this._$Eu(e, n);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const r of n) e.unshift(kt(r));
    } else t !== void 0 && e.push(kt(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
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
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
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
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    const n = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, n);
    if (r !== void 0 && n.reflect === !0) {
      const a = (n.converter?.toAttribute !== void 0 ? n.converter : st).toAttribute(e, n.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, r = n._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = n.getPropertyOptions(r), i = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : st;
      this._$Em = r;
      const c = i.fromAttribute(e, a.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, r = !1, a) {
    if (t !== void 0) {
      const i = this.constructor;
      if (r === !1 && (a = this[t]), n ??= i.getPropertyOptions(t), !((n.hasChanged ?? mt)(a, e) || n.useDefault && n.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: r, wrapped: a }, i) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? e ?? this[t]), a !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
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
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
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
const bt = globalThis, Ct = (s) => s, rt = bt.trustedTypes, St = rt ? rt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, jt = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Bt = "?" + A, Qt = `<${Bt}>`, z = document, K = () => z.createComment(""), J = (s) => s === null || typeof s != "object" && typeof s != "function", _t = Array.isArray, te = (s) => _t(s) || typeof s?.[Symbol.iterator] == "function", ht = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pt = /-->/g, zt = />/g, S = RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, Mt = /"/g, Ut = /^(?:script|style|textarea|title)$/i, ee = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), l = ee(1), F = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Tt = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function It(s, t) {
  if (!_t(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return St !== void 0 ? St.createHTML(t) : t;
}
const se = (s, t) => {
  const e = s.length - 1, n = [];
  let r, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = V;
  for (let c = 0; c < e; c++) {
    const o = s[c];
    let d, h, p = -1, u = 0;
    for (; u < o.length && (i.lastIndex = u, h = i.exec(o), h !== null); ) u = i.lastIndex, i === V ? h[1] === "!--" ? i = Pt : h[1] !== void 0 ? i = zt : h[2] !== void 0 ? (Ut.test(h[2]) && (r = RegExp("</" + h[2], "g")), i = S) : h[3] !== void 0 && (i = S) : i === S ? h[0] === ">" ? (i = r ?? V, p = -1) : h[1] === void 0 ? p = -2 : (p = i.lastIndex - h[2].length, d = h[1], i = h[3] === void 0 ? S : h[3] === '"' ? Mt : Ot) : i === Mt || i === Ot ? i = S : i === Pt || i === zt ? i = V : (i = S, r = void 0);
    const g = i === S && s[c + 1].startsWith("/>") ? " " : "";
    a += i === V ? o + Qt : p >= 0 ? (n.push(d), o.slice(0, p) + jt + o.slice(p) + A + g) : o + A + (p === -2 ? c : g);
  }
  return [It(s, a + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class q {
  constructor({ strings: t, _$litType$: e }, n) {
    let r;
    this.parts = [];
    let a = 0, i = 0;
    const c = t.length - 1, o = this.parts, [d, h] = se(t, e);
    if (this.el = q.createElement(d, n), P.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (r = P.nextNode()) !== null && o.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const p of r.getAttributeNames()) if (p.endsWith(jt)) {
          const u = h[i++], g = r.getAttribute(p).split(A), b = /([.?@])?(.*)/.exec(u);
          o.push({ type: 1, index: a, name: b[2], strings: g, ctor: b[1] === "." ? ne : b[1] === "?" ? ae : b[1] === "@" ? ie : it }), r.removeAttribute(p);
        } else p.startsWith(A) && (o.push({ type: 6, index: a }), r.removeAttribute(p));
        if (Ut.test(r.tagName)) {
          const p = r.textContent.split(A), u = p.length - 1;
          if (u > 0) {
            r.textContent = rt ? rt.emptyScript : "";
            for (let g = 0; g < u; g++) r.append(p[g], K()), P.nextNode(), o.push({ type: 2, index: ++a });
            r.append(p[u], K());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Bt) o.push({ type: 2, index: a });
      else {
        let p = -1;
        for (; (p = r.data.indexOf(A, p + 1)) !== -1; ) o.push({ type: 7, index: a }), p += A.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const n = z.createElement("template");
    return n.innerHTML = t, n;
  }
}
function H(s, t, e = s, n) {
  if (t === F) return t;
  let r = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const a = J(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(s), r._$AT(s, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = r : e._$Cl = r), r !== void 0 && (t = H(s, r._$AS(s, t.values), r, n)), t;
}
class re {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, r = (t?.creationScope ?? z).importNode(e, !0);
    P.currentNode = r;
    let a = P.nextNode(), i = 0, c = 0, o = n[0];
    for (; o !== void 0; ) {
      if (i === o.index) {
        let d;
        o.type === 2 ? d = new Z(a, a.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(a, o.name, o.strings, this, t) : o.type === 6 && (d = new oe(a, this, t)), this._$AV.push(d), o = n[++c];
      }
      i !== o?.index && (a = P.nextNode(), i++);
    }
    return P.currentNode = z, r;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = H(this, t, e), J(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : te(t) ? this.k(t) : this._(t);
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
    const { values: e, _$litType$: n } = t, r = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = q.createElement(It(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const a = new re(r, this), i = a.u(this.options);
      a.p(e), this.T(i), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Tt.get(t.strings);
    return e === void 0 && Tt.set(t.strings, e = new q(t)), e;
  }
  k(t) {
    _t(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, r = 0;
    for (const a of t) r === e.length ? e.push(n = new Z(this.O(K()), this.O(K()), this, this.options)) : n = e[r], n._$AI(a), r++;
    r < e.length && (this._$AR(n && n._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
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
  constructor(t, e, n, r, a) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, e = this, n, r) {
    const a = this.strings;
    let i = !1;
    if (a === void 0) t = H(this, t, e, 0), i = !J(t) || t !== this._$AH && t !== F, i && (this._$AH = t);
    else {
      const c = t;
      let o, d;
      for (t = a[0], o = 0; o < a.length - 1; o++) d = H(this, c[n + o], e, o), d === F && (d = this._$AH[o]), i ||= !J(d) || d !== this._$AH[o], d === f ? t = f : t !== f && (t += (d ?? "") + a[o + 1]), this._$AH[o] = d;
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
  constructor(t, e, n, r, a) {
    super(t, e, n, r, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? f) === F) return;
    const n = this._$AH, r = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== f && (n === f || r);
    r && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class oe {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
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
const ce = (s, t, e) => {
  const n = e?.renderBefore ?? t;
  let r = n._$litPart$;
  if (r === void 0) {
    const a = e?.renderBefore ?? null;
    n._$litPart$ = r = new Z(t.insertBefore(K(), a), a, void 0, e ?? {});
  }
  return r._$AI(s), r;
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
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ce(e, this.renderRoot, this.renderOptions);
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
const $ = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = { attribute: !0, type: String, converter: st, reflect: !1, hasChanged: mt }, he = (s = de, t, e) => {
  const { kind: n, metadata: r } = e;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), n === "setter" && ((s = Object.create(s)).wrapped = !0), a.set(e.name, s), n === "accessor") {
    const { name: i } = e;
    return { set(c) {
      const o = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(i, o, s, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(i, void 0, s, c), c;
    } };
  }
  if (n === "setter") {
    const { name: i } = e;
    return function(c) {
      const o = this[i];
      t.call(this, c), this.requestUpdate(i, o, s, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function v(s) {
  return (t, e) => typeof e == "object" ? he(s, t, e) : ((n, r, a) => {
    const i = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, n), i ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(s) {
  return v({ ...s, state: !0, attribute: !1 });
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
var ve = Object.defineProperty, ue = Object.getOwnPropertyDescriptor, ot = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? ue(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && ve(t, e, r), r;
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
  _tap(s) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    return l`
      <nav>
        ${this.pages.map((s) => l`
          <button
            class=${s === this.activePage ? "active" : ""}
            @click=${() => this._tap(s)}
            aria-label=${Dt[s]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${fe[s]} />
            </svg>
            <span>${this.customLabels[s] ?? Dt[s]}</span>
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
var ge = Object.defineProperty, me = Object.getOwnPropertyDescriptor, M = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? me(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && ge(t, e, r), r;
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
function ye(s) {
  return s.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const e = t.lastIndexOf("="), n = t.slice(0, e).split(",").map((a) => a.trim().toLowerCase()).filter(Boolean), r = t.slice(e + 1).trim() || "🗑️";
    return { keywords: n, icon: r };
  });
}
function Q(s, t) {
  const e = ye(t ?? _e), n = s.toLowerCase();
  for (const r of e)
    if (r.keywords.some((a) => n.includes(a))) return r.icon;
  return "🗑️";
}
function vt(s) {
  const t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  const e = new Date(t);
  e.setDate(t.getDate() + 1);
  const n = new Date(s);
  if (n.setHours(0, 0, 0, 0), n.getTime() === t.getTime()) return "Heute";
  if (n.getTime() === e.getTime()) return "Morgen";
  const r = Math.round((n.getTime() - t.getTime()) / 864e5);
  return r > 0 && r <= 6 ? s.toLocaleDateString("de-AT", { weekday: "short" }) : `+${r}d`;
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
  updated(s) {
    s.has("hass") && this.hass && !this._trashFetched && this.config?.trash_entity && (this._trashFetched = !0, this._fetchTrash());
  }
  _tick() {
    const s = /* @__PURE__ */ new Date();
    this._time = s.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" }), this._date = s.toLocaleDateString("de-AT", { weekday: "short", day: "numeric", month: "short" });
  }
  async _fetchTrash() {
    const s = this.config?.trash_entity;
    if (!s || !this.hass) return;
    try {
      const i = /* @__PURE__ */ new Date();
      i.setHours(0, 0, 0, 0);
      const c = new Date(i);
      c.setDate(c.getDate() + 14);
      const o = await this.hass.fetchWithAuth(
        `/api/calendars/${s}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(c.toISOString())}`
      );
      if (o.ok) {
        const d = await o.json();
        if (d.length > 0) {
          const h = /* @__PURE__ */ new Map();
          for (const x of d) {
            const T = x.start.date ?? x.start.dateTime ?? "", R = new Date(T);
            if (isNaN(R.getTime())) continue;
            R.setHours(0, 0, 0, 0);
            const dt = R.toISOString();
            h.has(dt) || h.set(dt, []), h.get(dt).push(x.summary);
          }
          const [p, u] = [...h.entries()].sort((x, T) => x[0].localeCompare(T[0]))[0], g = this.config?.trash_mapping, b = [...new Set(u.map((x) => Q(x, g)))].join("");
          this._trashChip = `${b} ${vt(new Date(p))}`;
          return;
        }
        this._trashChip = null;
        return;
      }
    } catch {
    }
    const t = this.hass.states[s];
    if (!t) return;
    const e = this.config?.trash_mapping;
    if (t.state === "on") {
      const i = t.attributes.message;
      this._trashChip = `${i ? Q(i, e) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const i = t.attributes.start_time, c = t.attributes.message;
      if (i) {
        const o = new Date(i);
        if (!isNaN(o.getTime())) {
          this._trashChip = `${c ? Q(c, e) : "🗑️"} ${vt(o)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const r = parseInt(t.state, 10);
    if (!isNaN(r) && String(r) === t.state.trim()) {
      const i = t.attributes.message, c = r === 0 ? "Heute" : r === 1 ? "Morgen" : `+${r}d`;
      this._trashChip = `${i ? Q(i, e) : "🗑️"} ${c}`;
      return;
    }
    const a = new Date(t.state);
    isNaN(a.getTime()) || (this._trashChip = `🗑️ ${vt(a)}`);
  }
  render() {
    const s = this.config ?? {}, t = this.hass, e = s.weather_entity ? t?.states[s.weather_entity] : null, n = e?.attributes.temperature, r = e ? be[e.state] ?? "🌡️" : null;
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
var xe = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, xt = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? $e(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && xe(t, e, r), r;
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
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, U = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? ke(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && we(t, e, r), r;
};
function Ae(s) {
  if (s.start.date) return "Ganztag";
  const t = new Date(s.start.dateTime), e = s.end.dateTime ? new Date(s.end.dateTime) : null, n = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return e ? `${n(t)} – ${n(e)}` : n(t);
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
  updated(s) {
    if (s.has("hass") && this.hass) {
      !this._calFetched && this.config?.calendar_entity && (this._calFetched = !0, this._fetchCalendar());
      const t = this.config?.dishwasher_entity;
      if (t) {
        const e = parseFloat(this.hass.states[t]?.state ?? "0") || 0;
        e > this._dishMax && (this._dishMax = e), e === 0 && (this._dishMax = 0);
      }
    }
  }
  async _fetchCalendar() {
    const s = this.config?.calendar_entity;
    if (!s || !this.hass) return;
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    const e = /* @__PURE__ */ new Date();
    e.setHours(23, 59, 59, 999);
    const n = `/api/calendars/${s}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`;
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
        entity_id: s,
        start_date_time: t.toISOString(),
        end_date_time: e.toISOString()
      });
      this._calEvents = r ?? [];
    } catch {
      this._calEvents = [];
    }
  }
  _toggleLight(s) {
    const t = this.hass?.states[s]?.state === "on";
    this.hass.callService(s.split(".")[0], t ? "turn_off" : "turn_on", { entity_id: s });
  }
  _vacuumAction(s, t) {
    const e = t === "cleaning" || t === "returning" || t === "paused" ? "return_to_base" : "start";
    this.hass.callService("vacuum", e, { entity_id: s });
  }
  render() {
    const s = this.config ?? {}, t = this.hass, e = s.garden_light ? t?.states[s.garden_light] : null, n = s.light_2 ? t?.states[s.light_2] : null, r = s.vacuum_entity ? t?.states[s.vacuum_entity] : null, a = s.dishwasher_entity ? t?.states[s.dishwasher_entity] : null, i = a && parseFloat(a.state) || 0, c = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        ${s.calendar_entity ? l`
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

        ${e || n ? l`
          <div class="lights-row">
            ${e ? this._renderLight(s.garden_light, e, s.garden_light_icon ?? "💡") : ""}
            ${n ? this._renderLight(s.light_2, n, s.light_2_icon ?? "💡") : ""}
          </div>
        ` : ""}

        ${r ? l`
          <div class="vacuum-row">
            ${this._renderVacuum(s.vacuum_entity, r)}
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
  _renderLight(s, t, e) {
    const n = t.state === "on", r = t.attributes.friendly_name ?? s.split(".")[1];
    return l`
      <button class="light-btn" @click=${() => this._toggleLight(s)}>
        <span class="light-icon">${e}</span>
        <span class="light-name">${r}</span>
        <div class="toggle-track ${n ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
  _renderVacuum(s, t) {
    const e = t.state, n = Ee[e] ?? e, r = e === "cleaning" || e === "returning" || e === "paused", a = e !== "error" && e !== "returning";
    return l`
      <button class="vacuum-btn ${r ? "active" : ""}"
        @click=${a ? () => this._vacuumAction(s, e) : void 0}
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
var Ce = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, lt = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? Se(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && Ce(t, e, r), r;
};
let N = class extends m {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setTemp(s) {
    const t = this.config?.thermostat_entity;
    if (!t) return;
    const e = this.hass?.states[t]?.attributes.temperature ?? 20;
    this.hass.callService("climate", "set_temperature", {
      entity_id: t,
      temperature: Math.round((e + s) * 2) / 2
    });
  }
  _setMode(s) {
    const t = this.config?.thermostat_entity;
    t && this.hass.callService("climate", "set_hvac_mode", { entity_id: t, hvac_mode: s });
  }
  render() {
    const s = this.config?.thermostat_entity, t = s ? this.hass?.states[s] : null;
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const e = t.attributes.current_temperature, n = t.attributes.temperature, r = t.state, a = r === "heat";
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${a ? "heating" : ""}">
            <div class="cur-temp">${e != null ? `${e.toFixed(1)}°` : "–"}</div>
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
var Pe = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, X = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? ze(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && Pe(t, e, r), r;
};
const Oe = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let O = class extends m {
  constructor() {
    super(...arguments), this.dark = !1, this._moving = {};
  }
  updated(s) {
    if (!s.has("hass") || !this.hass) return;
    const t = { ...this._moving };
    let e = !1;
    for (const n of Object.keys(t)) {
      const r = this.hass.states[n];
      if (!r) continue;
      const a = r.attributes.current_position;
      (r.state === "open" || r.state === "closed" || a === 0 || a === 100) && (delete t[n], e = !0);
    }
    e && (this._moving = t);
  }
  _cover(s, t) {
    if (this.hass.callService("cover", t, { entity_id: s }), t === "open_cover") this._moving = { ...this._moving, [s]: "up" };
    else if (t === "close_cover") this._moving = { ...this._moving, [s]: "down" };
    else {
      const e = { ...this._moving };
      delete e[s], this._moving = e;
    }
  }
  _scene(s) {
    const t = s.split(".")[0];
    this.hass.callService(t === "scene" ? "scene" : "script", "turn_on", { entity_id: s });
  }
  render() {
    const s = this.config ?? {}, t = this.hass, e = Oe.map((n) => s[n]).filter((n) => !!n);
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${e.map((n) => {
      const r = t?.states[n];
      if (!r) return l``;
      const a = r.attributes.friendly_name ?? n, i = r.attributes.current_position, c = i != null ? 100 - i : null, o = this._moving[n], d = i != null ? `${i}%` : r.state === "open" ? "Offen" : r.state === "closed" ? "Zu" : "–", h = r.state === "open" ? "st-open" : r.state === "closed" ? "st-closed" : "st-mid";
      return l`
              <div class="cover-row">
                ${c != null ? l`
                  <div class="pos-bar" style="width:${c}%"></div>
                ` : ""}
                <div class="cover-name">${a}</div>
                <div class="cover-pos ${h}">${d}</div>
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

        ${s.scene_up || s.scene_down ? l`
          <div class="bottom-bar">
            ${s.scene_up ? l`<button class="scene-btn" @click=${() => this._scene(s.scene_up)}>▲ Alle</button>` : ""}
            ${s.scene_down ? l`<button class="scene-btn" @click=${() => this._scene(s.scene_down)}>▼ Alle</button>` : ""}
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
var Me = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, ct = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? Te(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && Me(t, e, r), r;
};
function Ft(s) {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
}
let j = class extends m {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _call(s, t) {
    const e = this.config?.media_player;
    if (!e) return;
    const [n, r] = s.split(".");
    this.hass.callService(n, r, { entity_id: e, ...t });
  }
  _volume(s) {
    this._call("media_player.volume_set", { volume_level: s.target.valueAsNumber });
  }
  render() {
    const s = this.config?.media_player, t = s ? this.hass?.states[s] : null;
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const e = t.state === "playing", n = t.attributes.media_title ?? "", r = t.attributes.media_artist ?? "", a = t.attributes.entity_picture ?? "", i = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, o = t.attributes.media_position ?? 0, d = t.attributes.media_position_updated_at ?? "";
    let h = o;
    e && d && (h = Math.min(o + (Date.now() - new Date(d).getTime()) / 1e3, c));
    const p = c > 0 ? h / c : 0;
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
              <div class="progress-fill" style="width:${p * 100}%"></div>
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
            ${e ? l`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : l`<svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M8 5v14l11-7z"/></svg>`}
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
var De = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, pt = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? Fe(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && De(t, e, r), r;
};
function ut(s) {
  return Math.abs(s) >= 1e3 ? `${(s / 1e3).toFixed(1)} kW` : `${Math.round(s)} W`;
}
function tt(s) {
  return `${s.toFixed(1)} kWh`;
}
let B = class extends m {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const s = this.config ?? {}, t = this.hass, e = s.pv_entity ? t?.states[s.pv_entity] : null, n = s.grid_entity ? t?.states[s.grid_entity] : null, r = s.ev_entity ? t?.states[s.ev_entity] : null, a = s.pv_today_entity ? t?.states[s.pv_today_entity] : null, i = s.forecast_today_entity ? t?.states[s.forecast_today_entity] : null, c = s.forecast_tomorrow_entity ? t?.states[s.forecast_tomorrow_entity] : null, o = e ? parseFloat(e.state) : null, d = n ? parseFloat(n.state) : null, h = r ? parseFloat(r.state) : null, p = a ? parseFloat(a.state) : null, u = i ? parseFloat(i.state) : null, g = c ? parseFloat(c.state) : null, b = d != null && d < 0, x = o != null && d != null ? o + (b ? d : 0) + (b ? 0 : d) : null, T = u != null && u > 0 && p != null ? Math.min(p / u, 1) : null, R = u != null || g != null;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <!-- PV Production -->
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${o != null ? ut(o) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
            ${p != null ? l`
              <div class="stat-sub">Heute ${tt(p)}</div>
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
            <div class="stat-val">${d != null ? ut(Math.abs(d)) : "–"}</div>
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
                  <div class="fc-sub">${p != null ? tt(p) : ""} erreicht</div>
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
var He = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, $t = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? Le(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && He(t, e, r), r;
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
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.*)", selector: { entity: { domain: "binary_sensor" } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Ve = (s) => s.label ?? s.name;
let nt = class extends m {
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
    const t = [...this._config.pages ?? ["home"]], e = t.indexOf(s);
    e >= 0 ? t.length > 1 && t.splice(e, 1) : t.push(s), this._config = { ...this._config, pages: t }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _form(s) {
    return l`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${s}
        .computeLabel=${Ve} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return l``;
    const s = this._config, t = s.pages ?? ["home"], e = (r) => `${r}_label`, n = (r) => s[e(r)] ?? "";
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
var We = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, I = (s, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? Ke(t, e) : t, a = s.length - 1, i; a >= 0; a--)
    (i = s[a]) && (r = (n ? i(t, e, r) : i(r)) || r);
  return n && r && We(t, e, r), r;
};
let C = class extends m {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(s, t) {
    if (!s) return "";
    const e = s.replace("#", "");
    if (e.length !== 6) return "";
    const n = parseInt(e.slice(0, 2), 16), r = parseInt(e.slice(2, 4), 16), a = parseInt(e.slice(4, 6), 16);
    return `rgba(${n},${r},${a},${t})`;
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
    const t = s.pages ?? ["home"];
    t.includes(this._activePage) || (this._activePage = t[0]);
  }
  updated(s) {
    if (s.has("hass") && this.hass) {
      this._dark = this.hass.themes?.darkMode ?? !1;
      const t = this._config?.doorbell_trigger;
      if (t) {
        const n = s.get("hass")?.states[t]?.state !== "on", r = this.hass.states[t]?.state === "on";
        n && r && (this._doorbellActive = !0);
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return l``;
    const s = this._dark, t = s ? 0.18 : 0.09, e = this._glowVar(this._config.bg_accent_1, t), n = this._glowVar(this._config.bg_accent_2, t), r = [e ? `--nsp-glow-1:${e}` : "", n ? `--nsp-glow-2:${n}` : ""].filter(Boolean).join(";");
    return l`
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
    const s = this.hass, t = this._config, e = this._dark;
    switch (this._activePage) {
      case "home":
        return l`<nspanel-page-home    .hass=${s} .config=${t} ?dark=${e}></nspanel-page-home>`;
      case "climate":
        return l`<nspanel-page-climate .hass=${s} .config=${t} ?dark=${e}></nspanel-page-climate>`;
      case "blinds":
        return l`<nspanel-page-blinds  .hass=${s} .config=${t} ?dark=${e}></nspanel-page-blinds>`;
      case "media":
        return l`<nspanel-page-media   .hass=${s} .config=${t} ?dark=${e}></nspanel-page-media>`;
      case "energy":
        return l`<nspanel-page-energy  .hass=${s} .config=${t} ?dark=${e}></nspanel-page-energy>`;
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
