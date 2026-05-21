/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, mt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (mt && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = At.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && At.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (e) => new Bt(typeof e == "string" ? e : e + "", void 0, bt), _ = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, a, n) => r + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[n + 1], e[0]);
  return new Bt(s, e, bt);
}, Kt = (e, t) => {
  if (mt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), a = st.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = s.cssText, e.appendChild(r);
  }
}, Et = mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return Wt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Gt, defineProperty: qt, getOwnPropertyDescriptor: Yt, getOwnPropertyNames: Zt, getOwnPropertySymbols: Jt, getPrototypeOf: Qt } = Object, it = globalThis, St = it.trustedTypes, Xt = St ? St.emptyScript : "", te = it.reactiveElementPolyfillSupport, K = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Xt : null;
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
} }, _t = (e, t) => !Gt(e, t), Ct = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ??= Symbol("metadata"), it.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ct) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), a = this.getPropertyDescriptor(t, r, s);
      a !== void 0 && qt(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: a, set: n } = Yt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: a, set(i) {
      const c = a?.call(this);
      n?.call(this, i), this.requestUpdate(t, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ct;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = Qt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const s = this.properties, r = [...Zt(s), ...Jt(s)];
      for (const a of r) this.createProperty(a, s[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [r, a] of s) this.elementProperties.set(r, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, r] of this.elementProperties) {
      const a = this._$Eu(s, r);
      a !== void 0 && this._$Eh.set(a, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const a of r) s.unshift(Et(a));
    } else t !== void 0 && s.push(Et(t));
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
    return Kt(t, this.constructor.elementStyles), t;
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
    const r = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, r);
    if (a !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : rt).toAttribute(s, r.type);
      this._$Em = t, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const r = this.constructor, a = r._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const n = r.getPropertyOptions(a), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : rt;
      this._$Em = a;
      const c = i.fromAttribute(s, n.type);
      this[a] = c ?? this._$Ej?.get(a) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, a = !1, n) {
    if (t !== void 0) {
      const i = this.constructor;
      if (a === !1 && (n = this[t]), r ??= i.getPropertyOptions(t), !((r.hasChanged ?? _t)(n, s) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, r)))) return;
      this.C(t, s, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: r, reflect: a, wrapped: n }, i) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? s ?? this[t]), n !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (s = void 0), this._$AL.set(t, s)), a === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [a, n] of this._$Ep) this[a] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, n] of r) {
        const { wrapped: i } = n, c = this[a];
        i !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, n, c);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[K("elementProperties")] = /* @__PURE__ */ new Map(), D[K("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: D }), (it.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Pt = (e) => e, at = yt.trustedTypes, zt = at ? at.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, It = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Ut = "?" + A, ee = `<${Ut}>`, z = document, G = () => z.createComment(""), q = (e) => e === null || typeof e != "object" && typeof e != "function", xt = Array.isArray, se = (e) => xt(e) || typeof e?.[Symbol.iterator] == "function", vt = `[ 	
\f\r]`, W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Mt = />/g, C = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tt = /'/g, Dt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, re = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = re(1), F = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function Vt(e, t) {
  if (!xt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(t) : t;
}
const ae = (e, t) => {
  const s = e.length - 1, r = [];
  let a, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = W;
  for (let c = 0; c < s; c++) {
    const o = e[c];
    let p, h, d = -1, v = 0;
    for (; v < o.length && (i.lastIndex = v, h = i.exec(o), h !== null); ) v = i.lastIndex, i === W ? h[1] === "!--" ? i = Ot : h[1] !== void 0 ? i = Mt : h[2] !== void 0 ? (Rt.test(h[2]) && (a = RegExp("</" + h[2], "g")), i = C) : h[3] !== void 0 && (i = C) : i === C ? h[0] === ">" ? (i = a ?? W, d = -1) : h[1] === void 0 ? d = -2 : (d = i.lastIndex - h[2].length, p = h[1], i = h[3] === void 0 ? C : h[3] === '"' ? Dt : Tt) : i === Dt || i === Tt ? i = C : i === Ot || i === Mt ? i = W : (i = C, a = void 0);
    const m = i === C && e[c + 1].startsWith("/>") ? " " : "";
    n += i === W ? o + ee : d >= 0 ? (r.push(p), o.slice(0, d) + It + o.slice(d) + A + m) : o + A + (d === -2 ? c : m);
  }
  return [Vt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Y {
  constructor({ strings: t, _$litType$: s }, r) {
    let a;
    this.parts = [];
    let n = 0, i = 0;
    const c = t.length - 1, o = this.parts, [p, h] = ae(t, s);
    if (this.el = Y.createElement(p, r), P.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (a = P.nextNode()) !== null && o.length < c; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const d of a.getAttributeNames()) if (d.endsWith(It)) {
          const v = h[i++], m = a.getAttribute(d).split(A), b = /([.?@])?(.*)/.exec(v);
          o.push({ type: 1, index: n, name: b[2], strings: m, ctor: b[1] === "." ? ie : b[1] === "?" ? oe : b[1] === "@" ? le : ot }), a.removeAttribute(d);
        } else d.startsWith(A) && (o.push({ type: 6, index: n }), a.removeAttribute(d));
        if (Rt.test(a.tagName)) {
          const d = a.textContent.split(A), v = d.length - 1;
          if (v > 0) {
            a.textContent = at ? at.emptyScript : "";
            for (let m = 0; m < v; m++) a.append(d[m], G()), P.nextNode(), o.push({ type: 2, index: ++n });
            a.append(d[v], G());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Ut) o.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = a.data.indexOf(A, d + 1)) !== -1; ) o.push({ type: 7, index: n }), d += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const r = z.createElement("template");
    return r.innerHTML = t, r;
  }
}
function H(e, t, s = e, r) {
  if (t === F) return t;
  let a = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const n = q(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== n && (a?._$AO?.(!1), n === void 0 ? a = void 0 : (a = new n(e), a._$AT(e, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = a : s._$Cl = a), a !== void 0 && (t = H(e, a._$AS(e, t.values), a, r)), t;
}
class ne {
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
    const { el: { content: s }, parts: r } = this._$AD, a = (t?.creationScope ?? z).importNode(s, !0);
    P.currentNode = a;
    let n = P.nextNode(), i = 0, c = 0, o = r[0];
    for (; o !== void 0; ) {
      if (i === o.index) {
        let p;
        o.type === 2 ? p = new J(n, n.nextSibling, this, t) : o.type === 1 ? p = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (p = new ce(n, this, t)), this._$AV.push(p), o = r[++c];
      }
      i !== o?.index && (n = P.nextNode(), i++);
    }
    return P.currentNode = z, a;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class J {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, r, a) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
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
    t = H(this, t, s), q(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== F && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : se(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: r } = t, a = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Y.createElement(Vt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(s);
    else {
      const n = new ne(a, this), i = n.u(this.options);
      n.p(s), this.T(i), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Ft.get(t.strings);
    return s === void 0 && Ft.set(t.strings, s = new Y(t)), s;
  }
  k(t) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, a = 0;
    for (const n of t) a === s.length ? s.push(r = new J(this.O(G()), this.O(G()), this, this.options)) : r = s[a], r._$AI(n), a++;
    a < s.length && (this._$AR(r && r._$AB.nextSibling, a), s.length = a);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const r = Pt(t).nextSibling;
      Pt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, a, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = s, this._$AM = a, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(t, s = this, r, a) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) t = H(this, t, s, 0), i = !q(t) || t !== this._$AH && t !== F, i && (this._$AH = t);
    else {
      const c = t;
      let o, p;
      for (t = n[0], o = 0; o < n.length - 1; o++) p = H(this, c[r + o], s, o), p === F && (p = this._$AH[o]), i ||= !q(p) || p !== this._$AH[o], p === g ? t = g : t !== g && (t += (p ?? "") + n[o + 1]), this._$AH[o] = p;
    }
    i && !a && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ie extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class oe extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class le extends ot {
  constructor(t, s, r, a, n) {
    super(t, s, r, a, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = H(this, t, s, 0) ?? g) === F) return;
    const r = this._$AH, a = t === g && r !== g || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== g && (r === g || a);
    a && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ce {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const pe = yt.litHtmlPolyfillSupport;
pe?.(Y, J), (yt.litHtmlVersions ??= []).push("3.3.3");
const de = (e, t, s) => {
  const r = s?.renderBefore ?? t;
  let a = r._$litPart$;
  if (a === void 0) {
    const n = s?.renderBefore ?? null;
    r._$litPart$ = a = new J(t.insertBefore(G(), n), n, void 0, s ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis;
class f extends D {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = de(s, this.renderRoot, this.renderOptions);
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
f._$litElement$ = !0, f.finalized = !0, $t.litElementHydrateSupport?.({ LitElement: f });
const he = $t.litElementPolyfillSupport;
he?.({ LitElement: f });
($t.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = { attribute: !0, type: String, converter: rt, reflect: !1, hasChanged: _t }, ve = (e = ue, t, s) => {
  const { kind: r, metadata: a } = s;
  let n = globalThis.litPropertyMetadata.get(a);
  if (n === void 0 && globalThis.litPropertyMetadata.set(a, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), r === "accessor") {
    const { name: i } = s;
    return { set(c) {
      const o = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(i, o, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(i, void 0, e, c), c;
    } };
  }
  if (r === "setter") {
    const { name: i } = s;
    return function(c) {
      const o = this[i];
      t.call(this, c), this.requestUpdate(i, o, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(e) {
  return (t, s) => typeof s == "object" ? ve(e, t, s) : ((r, a, n) => {
    const i = a.hasOwnProperty(n);
    return a.constructor.createProperty(n, r), i ? Object.getOwnPropertyDescriptor(a, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
const w = _`
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
`, Q = _`
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
var ge = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, lt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? fe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && ge(t, s, a), a;
};
const me = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z",
  security: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
}, Ht = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
};
let N = class extends f {
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
            aria-label=${Ht[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${me[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Ht[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
N.styles = [w, _`
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
lt([
  u({ type: Array })
], N.prototype, "pages", 2);
lt([
  u({ type: String })
], N.prototype, "activePage", 2);
lt([
  u({ attribute: !1 })
], N.prototype, "customLabels", 2);
N = lt([
  y("nspanel-bottom-nav")
], N);
var be = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, M = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? _e(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && be(t, s, a), a;
};
const ye = {
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
}, xe = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function $e(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const s = t.lastIndexOf("="), r = t.slice(0, s).split(",").map((n) => n.trim().toLowerCase()).filter(Boolean), a = t.slice(s + 1).trim() || "🗑️";
    return { keywords: r, icon: a };
  });
}
function tt(e, t) {
  const s = $e(t ?? xe), r = e.toLowerCase();
  for (const a of s)
    if (a.keywords.some((n) => r.includes(n))) return a.icon;
  return "🗑️";
}
function gt(e) {
  const t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  const s = new Date(t);
  s.setDate(t.getDate() + 1);
  const r = new Date(e);
  if (r.setHours(0, 0, 0, 0), r.getTime() === t.getTime()) return "Heute";
  if (r.getTime() === s.getTime()) return "Morgen";
  const a = Math.round((r.getTime() - t.getTime()) / 864e5);
  return a > 0 && a <= 6 ? e.toLocaleDateString("de-AT", { weekday: "short" }) : `+${a}d`;
}
let k = class extends f {
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
          for (const $ of p) {
            const T = $.start.date ?? $.start.dateTime ?? "", V = new Date(T);
            if (isNaN(V.getTime())) continue;
            V.setHours(0, 0, 0, 0);
            const ut = V.toISOString();
            h.has(ut) || h.set(ut, []), h.get(ut).push($.summary);
          }
          const [d, v] = [...h.entries()].sort(($, T) => $[0].localeCompare(T[0]))[0], m = this.config?.trash_mapping, b = [...new Set(v.map(($) => tt($, m)))].join("");
          this._trashChip = `${b} ${gt(new Date(d))}`;
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
      this._trashChip = `${i ? tt(i, s) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const i = t.attributes.start_time, c = t.attributes.message;
      if (i) {
        const o = new Date(i);
        if (!isNaN(o.getTime())) {
          this._trashChip = `${c ? tt(c, s) : "🗑️"} ${gt(o)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const a = parseInt(t.state, 10);
    if (!isNaN(a) && String(a) === t.state.trim()) {
      const i = t.attributes.message, c = a === 0 ? "Heute" : a === 1 ? "Morgen" : `+${a}d`;
      this._trashChip = `${i ? tt(i, s) : "🗑️"} ${c}`;
      return;
    }
    const n = new Date(t.state);
    isNaN(n.getTime()) || (this._trashChip = `🗑️ ${gt(n)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, r = s?.attributes.temperature, a = s ? ye[s.state] ?? "🌡️" : null;
    return l`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${a ? l`<span class="chip">${a}${r != null ? ` ${Math.round(r)}°` : ""}</span>` : ""}
          ${this._trashChip ? l`<span class="chip">${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
k.styles = [w, _`
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
  u({ attribute: !1 })
], k.prototype, "hass", 2);
M([
  u({ attribute: !1 })
], k.prototype, "config", 2);
M([
  u({ type: Boolean })
], k.prototype, "dark", 2);
M([
  x()
], k.prototype, "_time", 2);
M([
  x()
], k.prototype, "_date", 2);
M([
  x()
], k.prototype, "_trashChip", 2);
k = M([
  y("nspanel-status-bar")
], k);
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, wt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? ke(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && we(t, s, a), a;
};
let Z = class extends f {
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
Z.styles = [w, _`
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
wt([
  u({ attribute: !1 })
], Z.prototype, "hass", 2);
wt([
  u({ type: String })
], Z.prototype, "cameraEntity", 2);
Z = wt([
  y("nspanel-doorbell-popup")
], Z);
var Ae = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, U = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ee(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ae(t, s, a), a;
};
function Se(e) {
  if (e.start.date) return "Ganztag";
  const t = new Date(e.start.dateTime), s = e.end.dateTime ? new Date(e.end.dateTime) : null, r = (a) => a.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return s ? `${r(t)} – ${r(s)}` : r(t);
}
const Ce = {
  cleaning: "Saugt gerade",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
};
let E = class extends f {
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
    const r = `/api/calendars/${e}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(s.toISOString())}`;
    try {
      const a = await this.hass.fetchWithAuth(r);
      if (a.ok) {
        this._calEvents = await a.json();
        return;
      }
    } catch {
    }
    try {
      const a = await this.hass.callWS({
        type: "calendar/event/list",
        entity_id: e,
        start_date_time: t.toISOString(),
        end_date_time: s.toISOString()
      });
      this._calEvents = a ?? [];
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
    const e = this.config ?? {}, t = this.hass, s = e.garden_light ? t?.states[e.garden_light] : null, r = e.light_2 ? t?.states[e.light_2] : null, a = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, n = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, i = n && parseFloat(n.state) || 0, c = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0;
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
                    <div class="event-time">${Se(o)}</div>
                  </div>
                </div>
              `) : l`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : l`<div class="spacer"></div>`}

        ${s || r ? l`
          <div class="lights-row">
            ${s ? this._renderLight(e.garden_light, s, e.garden_light_icon ?? "💡") : ""}
            ${r ? this._renderLight(e.light_2, r, e.light_2_icon ?? "💡") : ""}
          </div>
        ` : ""}

        ${a ? l`
          <div class="vacuum-row">
            ${this._renderVacuum(e.vacuum_entity, a)}
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
    const r = t.state === "on", a = t.attributes.friendly_name ?? e.split(".")[1];
    return l`
      <button class="light-btn" @click=${() => this._toggleLight(e)}>
        <span class="light-icon">${s}</span>
        <span class="light-name">${a}</span>
        <div class="toggle-track ${r ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
  _renderVacuum(e, t) {
    const s = t.state, r = Ce[s] ?? s, a = s === "cleaning" || s === "returning" || s === "paused", n = s !== "error" && s !== "returning";
    return l`
      <button class="vacuum-btn ${a ? "active" : ""}"
        @click=${n ? () => this._vacuumAction(e, s) : void 0}
        ?disabled=${!n}>
        <span class="vacuum-icon">🤖</span>
        <span class="vacuum-label">${r}</span>
        ${n ? l`
          <div class="vacuum-action ${a ? "stop" : "start"}">${a ? "⏹" : "▶"}</div>
        ` : ""}
      </button>
    `;
  }
};
E.styles = [w, Q, _`
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
  u({ attribute: !1 })
], E.prototype, "hass", 2);
U([
  u({ attribute: !1 })
], E.prototype, "config", 2);
U([
  u({ type: Boolean })
], E.prototype, "dark", 2);
U([
  x()
], E.prototype, "_calEvents", 2);
U([
  x()
], E.prototype, "_dishMax", 2);
E = U([
  y("nspanel-page-home")
], E);
var Pe = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, ct = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? ze(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Pe(t, s, a), a;
};
let j = class extends f {
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
    const s = t.attributes.current_temperature, r = t.attributes.temperature, a = t.state, n = a === "heat";
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Thermostat</div>

        <div class="circle-wrap">
          <div class="temp-circle ${n ? "heating" : ""}">
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
          <button class="mode-btn ${a === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${n ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
j.styles = [w, Q, _`
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
ct([
  u({ attribute: !1 })
], j.prototype, "hass", 2);
ct([
  u({ attribute: !1 })
], j.prototype, "config", 2);
ct([
  u({ type: Boolean })
], j.prototype, "dark", 2);
j = ct([
  y("nspanel-page-climate")
], j);
var Oe = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, X = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Me(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Oe(t, s, a), a;
};
const Te = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let O = class extends f {
  constructor() {
    super(...arguments), this.dark = !1, this._moving = {}, this._movingFrom = {};
  }
  updated(e) {
    if (!e.has("hass") || !this.hass) return;
    const t = { ...this._moving };
    let s = !1;
    for (const r of Object.keys(t)) {
      const a = this.hass.states[r];
      if (!a) continue;
      const n = t[r], i = a.state, c = a.attributes.current_position, o = this._movingFrom[r];
      (n === "up" ? i === "open" || c === 100 : n === "down" ? i === "closed" || c === 0 : !1) && i !== o && (delete t[r], delete this._movingFrom[r], s = !0);
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
    const e = this.config ?? {}, t = this.hass, s = Te.map((r) => e[r]).filter((r) => !!r);
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${s.map((r) => {
      const a = t?.states[r];
      if (!a) return l``;
      const n = a.attributes.friendly_name ?? r, i = a.attributes.current_position, c = i != null ? 100 - i : null, o = this._moving[r], p = i != null ? `${i}%` : a.state === "open" ? "Offen" : a.state === "closed" ? "Zu" : "–", h = a.state === "open" ? "st-open" : a.state === "closed" ? "st-closed" : "st-mid";
      return l`
              <div class="cover-row">
                ${c != null ? l`
                  <div class="pos-bar" style="width:${c}%"></div>
                ` : ""}
                <div class="cover-name">${n}</div>
                <div class="cover-pos ${h}">${p}</div>
                <button class="cov-btn ${o === "up" ? "active" : ""}"
                  @click=${() => this._cover(r, o === "up" ? "stop_cover" : "open_cover")}
                  aria-label="${o === "up" ? "Stop" : "Öffnen"}">${o === "up" ? "■" : "▲"}</button>
                <button class="cov-btn ${o === "down" ? "active" : ""}"
                  @click=${() => this._cover(r, o === "down" ? "stop_cover" : "close_cover")}
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
O.styles = [w, Q, _`
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
  u({ attribute: !1 })
], O.prototype, "hass", 2);
X([
  u({ attribute: !1 })
], O.prototype, "config", 2);
X([
  u({ type: Boolean })
], O.prototype, "dark", 2);
X([
  x()
], O.prototype, "_moving", 2);
O = X([
  y("nspanel-page-blinds")
], O);
var De = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, pt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Fe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && De(t, s, a), a;
};
function Nt(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let L = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _call(e, t) {
    const s = this.config?.media_player;
    if (!s) return;
    const [r, a] = e.split(".");
    this.hass.callService(r, a, { entity_id: s, ...t });
  }
  _volume(e) {
    this._call("media_player.volume_set", { volume_level: e.target.valueAsNumber });
  }
  render() {
    const e = this.config?.media_player, t = e ? this.hass?.states[e] : null;
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const s = t.state === "playing", r = t.attributes.media_title ?? "", a = t.attributes.media_artist ?? "", n = t.attributes.entity_picture ?? "", i = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, o = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let h = o;
    s && p && (h = Math.min(o + (Date.now() - new Date(p).getTime()) / 1e3, c));
    const d = c > 0 ? h / c : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${n ? l`<img class="art" src="${n}" alt="cover" />` : l`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${r || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${a ? l`<div class="track-artist">${a}</div>` : ""}
        </div>

        ${c > 0 ? l`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${Nt(h)}</span>
              <span>${Nt(c)}</span>
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
L.styles = [w, Q, _`
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
pt([
  u({ attribute: !1 })
], L.prototype, "hass", 2);
pt([
  u({ attribute: !1 })
], L.prototype, "config", 2);
pt([
  u({ type: Boolean })
], L.prototype, "dark", 2);
L = pt([
  y("nspanel-page-media")
], L);
var He = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, dt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ne(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && He(t, s, a), a;
};
function ft(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function et(e) {
  return `${e.toFixed(1)} kWh`;
}
let B = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, r = e.grid_entity ? t?.states[e.grid_entity] : null, a = e.ev_entity ? t?.states[e.ev_entity] : null, n = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, i = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, c = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, o = s ? parseFloat(s.state) : null, p = r ? parseFloat(r.state) : null, h = a ? parseFloat(a.state) : null, d = n ? parseFloat(n.state) : null, v = i ? parseFloat(i.state) : null, m = c ? parseFloat(c.state) : null, b = p != null && p < 0, $ = o != null && p != null ? o + (b ? p : 0) + (b ? 0 : p) : null, T = v != null && v > 0 && d != null ? Math.min(d / v, 1) : null, V = v != null || m != null;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="pg-title">Energie</div>

        <div class="stats-grid">
          <!-- PV Production -->
          <div class="stat pv">
            <div class="stat-icon">☀️</div>
            <div class="stat-val">${o != null ? ft(o) : "–"}</div>
            <div class="stat-lbl">Erzeugung</div>
            ${d != null ? l`
              <div class="stat-sub">Heute ${et(d)}</div>
            ` : ""}
          </div>

          <!-- Home Consumption -->
          <div class="stat home">
            <div class="stat-icon">🏠</div>
            <div class="stat-val">${$ != null ? ft(Math.abs($)) : "–"}</div>
            <div class="stat-lbl">Verbrauch</div>
          </div>

          <!-- Grid -->
          <div class="stat grid ${b ? "export" : "import"}">
            <div class="stat-icon">${b ? "⬆️" : "⬇️"}</div>
            <div class="stat-val">${p != null ? ft(Math.abs(p)) : "–"}</div>
            <div class="stat-lbl">${b ? "Einspeisung" : "Netzbezug"}</div>
          </div>

          <!-- Tesla / EV -->
          <div class="stat ev ${a ? "" : "unavail"}">
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
        ${V ? l`
          <div class="forecast-row">
            ${v != null ? l`
              <div class="fc-card">
                <div class="fc-label">Prognose Heute</div>
                <div class="fc-val">${et(v)}</div>
                ${T != null ? l`
                  <div class="fc-track">
                    <div class="fc-fill" style="width:${T * 100}%"></div>
                  </div>
                  <div class="fc-sub">${d != null ? et(d) : ""} erreicht</div>
                ` : ""}
              </div>
            ` : ""}
            ${m != null ? l`
              <div class="fc-card">
                <div class="fc-label">Prognose Morgen</div>
                <div class="fc-val">${et(m)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }
};
B.styles = [w, Q, _`
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
dt([
  u({ attribute: !1 })
], B.prototype, "hass", 2);
dt([
  u({ attribute: !1 })
], B.prototype, "config", 2);
dt([
  u({ type: Boolean })
], B.prototype, "dark", 2);
B = dt([
  y("nspanel-page-energy")
], B);
var je = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, ht = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Le(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && je(t, s, a), a;
};
const Be = ["camera_1", "camera_2", "camera_3", "camera_4"];
let I = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = !!e.cameras_portrait, r = Be.map((n) => e[n]).filter((n) => !!n);
    if (r.length === 0)
      return l`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const a = `page ${this.dark ? "nsp-dark" : ""} count-${r.length} ${s ? "portrait" : ""}`;
    return l`
      <div class="${a}">
        ${r.map((n) => {
      const i = t?.states[n], c = i?.attributes.friendly_name ?? n;
      return l`
            <div class="cam-cell">
              ${i ? l`
                <ha-camera-stream
                  .hass=${t}
                  .stateObj=${i}
                  muted
                  autoPlay
                ></ha-camera-stream>
              ` : l`<div class="cam-unavail">Nicht verfügbar</div>`}
              <div class="cam-label">${c}</div>
            </div>
          `;
    })}
      </div>
    `;
  }
};
I.styles = [w, _`
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
ht([
  u({ attribute: !1 })
], I.prototype, "hass", 2);
ht([
  u({ attribute: !1 })
], I.prototype, "config", 2);
ht([
  u({ type: Boolean })
], I.prototype, "dark", 2);
I = ht([
  y("nspanel-page-security")
], I);
var Ie = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, kt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ue(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ie(t, s, a), a;
};
const jt = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
}, Lt = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" },
  { id: "security" }
], Re = [
  { name: "weather_entity", label: "Weather", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Calendar", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Trash Collection", selector: { entity: { domain: ["sensor", "calendar"] } } }
], Ve = [
  { name: "garden_light", label: "Light 1", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Light 1 Icon — emoji, default 💡", selector: { text: {} } },
  { name: "light_2", label: "Light 2 (optional)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Light 2 Icon — emoji, default 💡", selector: { text: {} } }
], We = [
  { name: "vacuum_entity", label: "Robot Vacuum (optional)", selector: { entity: { domain: "vacuum" } } },
  { name: "dishwasher_entity", label: "Dishwasher (optional) — remaining time sensor in min", selector: { entity: { domain: "sensor" } } }
], Ke = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], Ge = [
  { name: "cover_1", label: "Blind 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Blind 2 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Blind 3 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Blind 4 (optional)", selector: { entity: { domain: "cover" } } }
], qe = [
  { name: "cover_5", label: "Blind 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Blind 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Blind 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Blind 8", selector: { entity: { domain: "cover" } } }
], Ye = [
  { name: "scene_up", label: "Open All — scene or script", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Close All — scene or script", selector: { entity: { domain: ["scene", "script"] } } }
], Ze = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } }
], Je = [
  { name: "pv_entity", label: "Solar Production — sensor in W or kW", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Grid Power — positive = import, negative = export (W or kW)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV Battery (optional) — state of charge sensor in %", selector: { entity: { domain: "sensor" } } }
], Qe = [
  { name: "pv_today_entity", label: "Solar Energy Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Solar Forecast Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Solar Forecast Tomorrow — sensor in kWh", selector: { entity: { domain: "sensor" } } }
], Xe = [
  { name: "camera_1", label: "Camera 1", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Camera 2 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Camera 3 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Camera 4 (optional)", selector: { entity: { domain: "camera" } } }
], ts = [
  { name: "doorbell_trigger", label: "Doorbell Trigger — binary_sensor or input_boolean", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Doorbell Camera (optional)", selector: { entity: { domain: "camera" } } }
], es = [
  { name: "bg_accent_1", label: "Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)", selector: { text: {} } },
  { name: "bg_accent_2", label: "Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)", selector: { text: {} } }
], ss = (e) => e.label ?? e.name;
let nt = class extends f {
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
    const t = [...this._config.pages ?? ["home"]], s = t.indexOf(e);
    s >= 0 ? t.length > 1 && t.splice(s, 1) : t.push(e), this._config = { ...this._config, pages: t }, this._emit();
  }
  _setPortrait(e) {
    this._config = { ...this._config, cameras_portrait: e }, this._emit();
  }
  _form(e) {
    return l`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${ss} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return l``;
    const e = this._config, t = e.pages ?? ["home"], s = (r) => e[`${r}_label`] ?? "";
    return l`
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
        ${Lt.map((r) => l`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${s(r.id) || jt[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(Lt.map((r) => ({
      name: `${r.id}_label`,
      label: `${jt[r.id]} — custom label`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Weather, calendar events, lights and appliances shown on the Home tab.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(Re)}
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

      <div class="nsp-group">Lights</div>
      ${this._form(Ve)}

      <div class="nsp-group">Appliances</div>
      ${this._form(We)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Control your heating and cooling system.</p>
      ${this._form(Ke)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(Ge)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(qe)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(Ye)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(Ze)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(Je)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(Qe)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(Xe)}
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
      ${this._form(ts)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(es)}
    `;
  }
};
kt([
  u({ attribute: !1 })
], nt.prototype, "hass", 2);
kt([
  x()
], nt.prototype, "_config", 2);
nt = kt([
  y("nspanel-dashboard-editor")
], nt);
var rs = Object.defineProperty, as = Object.getOwnPropertyDescriptor, R = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? as(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && rs(t, s, a), a;
};
let S = class extends f {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(e, t) {
    if (!e) return "";
    const s = e.replace("#", "");
    if (s.length !== 6) return "";
    const r = parseInt(s.slice(0, 2), 16), a = parseInt(s.slice(2, 4), 16), n = parseInt(s.slice(4, 6), 16);
    return `rgba(${r},${a},${n},${t})`;
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
        const s = this.hass.states[t]?.state;
        this._prevTriggerState !== "on" && s === "on" && (this._doorbellActive = !0), this._prevTriggerState = s;
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return l``;
    const e = this._dark, t = e ? 0.18 : 0.09, s = this._glowVar(this._config.bg_accent_1, t), r = this._glowVar(this._config.bg_accent_2, t), a = [s ? `--nsp-glow-1:${s}` : "", r ? `--nsp-glow-2:${r}` : ""].filter(Boolean).join(";");
    return l`
      <div class="shell ${e ? "nsp-dark" : ""}" style="${a}">
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
          @page-change=${(n) => {
      this._activePage = n.detail.page;
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
        return l`<nspanel-page-energy   .hass=${e} .config=${t} ?dark=${s}></nspanel-page-energy>`;
      case "security":
        return l`<nspanel-page-security .hass=${e} .config=${t} ?dark=${s}></nspanel-page-security>`;
      default:
        return l``;
    }
  }
};
S.styles = [w, _`
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
R([
  u({ attribute: !1 })
], S.prototype, "hass", 2);
R([
  x()
], S.prototype, "_config", 2);
R([
  x()
], S.prototype, "_activePage", 2);
R([
  x()
], S.prototype, "_doorbellActive", 2);
R([
  x()
], S.prototype, "_dark", 2);
S = R([
  y("nspanel-dashboard")
], S);
export {
  S as NspanelDashboard
};
