/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, xt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Mt = /* @__PURE__ */ new WeakMap();
let Kt = class {
  constructor(t, s, r) {
    if (this._$cssResult$ = !0, r !== $t) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (xt && t === void 0) {
      const r = s !== void 0 && s.length === 1;
      r && (t = Mt.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Xt = (e) => new Kt(typeof e == "string" ? e : e + "", void 0, $t), x = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((r, a, n) => r + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[n + 1], e[0]);
  return new Kt(s, e, $t);
}, te = (e, t) => {
  if (xt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const r = document.createElement("style"), a = ot.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = s.cssText, e.appendChild(r);
  }
}, Ot = xt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const r of t.cssRules) s += r.cssText;
  return Xt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ee, defineProperty: se, getOwnPropertyDescriptor: ae, getOwnPropertyNames: re, getOwnPropertySymbols: ne, getPrototypeOf: ie } = Object, dt = globalThis, Tt = dt.trustedTypes, oe = Tt ? Tt.emptyScript : "", le = dt.reactiveElementPolyfillSupport, Z = (e, t) => e, lt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? oe : null;
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
} }, wt = (e, t) => !ee(e, t), Dt = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ??= Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let B = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Dt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const r = Symbol(), a = this.getPropertyDescriptor(t, r, s);
      a !== void 0 && se(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, s, r) {
    const { get: a, set: n } = ae(this.prototype, t) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: a, set(i) {
      const l = a?.call(this);
      n?.call(this, i), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = ie(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const s = this.properties, r = [...re(s), ...ne(s)];
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
      for (const a of r) s.unshift(Ot(a));
    } else t !== void 0 && s.push(Ot(t));
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
    return te(t, this.constructor.elementStyles), t;
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
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : lt).toAttribute(s, r.type);
      this._$Em = t, n == null ? this.removeAttribute(a) : this.setAttribute(a, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const r = this.constructor, a = r._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const n = r.getPropertyOptions(a), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : lt;
      this._$Em = a;
      const l = i.fromAttribute(s, n.type);
      this[a] = l ?? this._$Ej?.get(a) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, r, a = !1, n) {
    if (t !== void 0) {
      const i = this.constructor;
      if (a === !1 && (n = this[t]), r ??= i.getPropertyOptions(t), !((r.hasChanged ?? wt)(n, s) || r.useDefault && r.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, r)))) return;
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
        const { wrapped: i } = n, l = this[a];
        i !== !0 || this._$AL.has(a) || l === void 0 || this.C(a, void 0, n, l);
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
B.elementStyles = [], B.shadowRootOptions = { mode: "open" }, B[Z("elementProperties")] = /* @__PURE__ */ new Map(), B[Z("finalized")] = /* @__PURE__ */ new Map(), le?.({ ReactiveElement: B }), (dt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = globalThis, Nt = (e) => e, ct = kt.trustedTypes, Ft = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, qt = "$lit$", P = `lit$${Math.random().toFixed(9).slice(2)}$`, Yt = "?" + P, ce = `<${Yt}>`, N = document, J = () => N.createComment(""), Q = (e) => e === null || typeof e != "object" && typeof e != "function", Ct = Array.isArray, pe = (e) => Ct(e) || typeof e?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, Y = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, jt = /-->/g, Ht = />/g, T = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Bt = /'/g, Lt = /"/g, Zt = /^(?:script|style|textarea|title)$/i, de = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), o = de(1), L = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), D = N.createTreeWalker(N, 129);
function Jt(e, t) {
  if (!Ct(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const he = (e, t) => {
  const s = e.length - 1, r = [];
  let a, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = Y;
  for (let l = 0; l < s; l++) {
    const c = e[l];
    let h, p, d = -1, g = 0;
    for (; g < c.length && (i.lastIndex = g, p = i.exec(c), p !== null); ) g = i.lastIndex, i === Y ? p[1] === "!--" ? i = jt : p[1] !== void 0 ? i = Ht : p[2] !== void 0 ? (Zt.test(p[2]) && (a = RegExp("</" + p[2], "g")), i = T) : p[3] !== void 0 && (i = T) : i === T ? p[0] === ">" ? (i = a ?? Y, d = -1) : p[1] === void 0 ? d = -2 : (d = i.lastIndex - p[2].length, h = p[1], i = p[3] === void 0 ? T : p[3] === '"' ? Lt : Bt) : i === Lt || i === Bt ? i = T : i === jt || i === Ht ? i = Y : (i = T, a = void 0);
    const v = i === T && e[l + 1].startsWith("/>") ? " " : "";
    n += i === Y ? c + ce : d >= 0 ? (r.push(h), c.slice(0, d) + qt + c.slice(d) + P + v) : c + P + (d === -2 ? l : v);
  }
  return [Jt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class X {
  constructor({ strings: t, _$litType$: s }, r) {
    let a;
    this.parts = [];
    let n = 0, i = 0;
    const l = t.length - 1, c = this.parts, [h, p] = he(t, s);
    if (this.el = X.createElement(h, r), D.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (a = D.nextNode()) !== null && c.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const d of a.getAttributeNames()) if (d.endsWith(qt)) {
          const g = p[i++], v = a.getAttribute(d).split(P), m = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: n, name: m[2], strings: v, ctor: m[1] === "." ? ve : m[1] === "?" ? fe : m[1] === "@" ? ge : ht }), a.removeAttribute(d);
        } else d.startsWith(P) && (c.push({ type: 6, index: n }), a.removeAttribute(d));
        if (Zt.test(a.tagName)) {
          const d = a.textContent.split(P), g = d.length - 1;
          if (g > 0) {
            a.textContent = ct ? ct.emptyScript : "";
            for (let v = 0; v < g; v++) a.append(d[v], J()), D.nextNode(), c.push({ type: 2, index: ++n });
            a.append(d[g], J());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Yt) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = a.data.indexOf(P, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += P.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const r = N.createElement("template");
    return r.innerHTML = t, r;
  }
}
function R(e, t, s = e, r) {
  if (t === L) return t;
  let a = r !== void 0 ? s._$Co?.[r] : s._$Cl;
  const n = Q(t) ? void 0 : t._$litDirective$;
  return a?.constructor !== n && (a?._$AO?.(!1), n === void 0 ? a = void 0 : (a = new n(e), a._$AT(e, s, r)), r !== void 0 ? (s._$Co ??= [])[r] = a : s._$Cl = a), a !== void 0 && (t = R(e, a._$AS(e, t.values), a, r)), t;
}
class ue {
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
    const { el: { content: s }, parts: r } = this._$AD, a = (t?.creationScope ?? N).importNode(s, !0);
    D.currentNode = a;
    let n = D.nextNode(), i = 0, l = 0, c = r[0];
    for (; c !== void 0; ) {
      if (i === c.index) {
        let h;
        c.type === 2 ? h = new et(n, n.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (h = new me(n, this, t)), this._$AV.push(h), c = r[++l];
      }
      i !== c?.index && (n = D.nextNode(), i++);
    }
    return D.currentNode = N, a;
  }
  p(t) {
    let s = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, s), s += r.strings.length - 2) : r._$AI(t[s])), s++;
  }
}
class et {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, r, a) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
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
    t = R(this, t, s), Q(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== L && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : pe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && Q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(N.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: r } = t, a = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = X.createElement(Jt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(s);
    else {
      const n = new ue(a, this), i = n.u(this.options);
      n.p(s), this.T(i), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Rt.get(t.strings);
    return s === void 0 && Rt.set(t.strings, s = new X(t)), s;
  }
  k(t) {
    Ct(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let r, a = 0;
    for (const n of t) a === s.length ? s.push(r = new et(this.O(J()), this.O(J()), this, this.options)) : r = s[a], r._$AI(n), a++;
    a < s.length && (this._$AR(r && r._$AB.nextSibling, a), s.length = a);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const r = Nt(t).nextSibling;
      Nt(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, s, r, a, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = s, this._$AM = a, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = f;
  }
  _$AI(t, s = this, r, a) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) t = R(this, t, s, 0), i = !Q(t) || t !== this._$AH && t !== L, i && (this._$AH = t);
    else {
      const l = t;
      let c, h;
      for (t = n[0], c = 0; c < n.length - 1; c++) h = R(this, l[r + c], s, c), h === L && (h = this._$AH[c]), i ||= !Q(h) || h !== this._$AH[c], h === f ? t = f : t !== f && (t += (h ?? "") + n[c + 1]), this._$AH[c] = h;
    }
    i && !a && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ve extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class fe extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class ge extends ht {
  constructor(t, s, r, a, n) {
    super(t, s, r, a, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = R(this, t, s, 0) ?? f) === L) return;
    const r = this._$AH, a = t === f && r !== f || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, n = t !== f && (r === f || a);
    a && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class me {
  constructor(t, s, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    R(this, t);
  }
}
const be = kt.litHtmlPolyfillSupport;
be?.(X, et), (kt.litHtmlVersions ??= []).push("3.3.3");
const _e = (e, t, s) => {
  const r = s?.renderBefore ?? t;
  let a = r._$litPart$;
  if (a === void 0) {
    const n = s?.renderBefore ?? null;
    r._$litPart$ = a = new et(t.insertBefore(J(), n), n, void 0, s ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const At = globalThis;
class b extends B {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = _e(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return L;
  }
}
b._$litElement$ = !0, b.finalized = !0, At.litElementHydrateSupport?.({ LitElement: b });
const ye = At.litElementPolyfillSupport;
ye?.({ LitElement: b });
(At.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: wt }, $e = (e = xe, t, s) => {
  const { kind: r, metadata: a } = s;
  let n = globalThis.litPropertyMetadata.get(a);
  if (n === void 0 && globalThis.litPropertyMetadata.set(a, n = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), r === "accessor") {
    const { name: i } = s;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(i, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(i, void 0, e, l), l;
    } };
  }
  if (r === "setter") {
    const { name: i } = s;
    return function(l) {
      const c = this[i];
      t.call(this, l), this.requestUpdate(i, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function u(e) {
  return (t, s) => typeof s == "object" ? $e(e, t, s) : ((r, a, n) => {
    const i = a.hasOwnProperty(n);
    return a.constructor.createProperty(n, r), i ? Object.getOwnPropertyDescriptor(a, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
const C = x`
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
`, st = x`
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
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, ut = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? ke(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && we(t, s, a), a;
};
const Ce = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z",
  security: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
}, It = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
};
let I = class extends b {
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
            aria-label=${It[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${Ce[e]} />
            </svg>
            <span>${this.customLabels[e] ?? It[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
I.styles = [C, x`
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
ut([
  u({ type: Array })
], I.prototype, "pages", 2);
ut([
  u({ type: String })
], I.prototype, "activePage", 2);
ut([
  u({ attribute: !1 })
], I.prototype, "customLabels", 2);
I = ut([
  w("nspanel-bottom-nav")
], I);
var Ae = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, H = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ee(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ae(t, s, a), a;
};
const Se = {
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
}, Pe = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function ze(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const s = t.lastIndexOf("="), r = t.slice(0, s).split(",").map((n) => n.trim().toLowerCase()).filter(Boolean), a = t.slice(s + 1).trim() || "🗑️";
    return { keywords: r, icon: a };
  });
}
function it(e, t) {
  const s = ze(t ?? Pe), r = e.toLowerCase();
  for (const a of s)
    if (a.keywords.some((n) => r.includes(n))) return a.icon;
  return "🗑️";
}
function _t(e) {
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
let S = class extends b {
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
    const e = this.config ?? {}, t = this.hass, s = e.person_1 ? t?.states[e.person_1]?.state === "home" : !1, r = e.person_2 ? t?.states[e.person_2]?.state === "home" : !1, a = [s ? "👨🏻" : "", r ? "👩🏻" : ""].filter(Boolean).join("");
    return a ? o`<span class="chip">${a}</span>` : "";
  }
  async _fetchTrash() {
    const e = this.config?.trash_entity;
    if (!e || !this.hass) return;
    try {
      const i = /* @__PURE__ */ new Date();
      i.setHours(0, 0, 0, 0);
      const l = new Date(i);
      l.setDate(l.getDate() + 14);
      const c = await this.hass.fetchWithAuth(
        `/api/calendars/${e}?start=${encodeURIComponent(i.toISOString())}&end=${encodeURIComponent(l.toISOString())}`
      );
      if (c.ok) {
        const h = await c.json();
        if (h.length > 0) {
          const p = /* @__PURE__ */ new Map();
          for (const _ of h) {
            const k = _.start.date ?? _.start.dateTime ?? "", A = new Date(k);
            if (isNaN(A.getTime())) continue;
            A.setHours(0, 0, 0, 0);
            const E = A.toISOString();
            p.has(E) || p.set(E, []), p.get(E).push(_.summary);
          }
          const [d, g] = [...p.entries()].sort((_, k) => _[0].localeCompare(k[0]))[0], v = this.config?.trash_mapping, m = [...new Set(g.map((_) => it(_, v)))].join("");
          this._trashChip = `${m} ${_t(new Date(d))}`;
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
      this._trashChip = `${i ? it(i, s) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const i = t.attributes.start_time, l = t.attributes.message;
      if (i) {
        const c = new Date(i);
        if (!isNaN(c.getTime())) {
          this._trashChip = `${l ? it(l, s) : "🗑️"} ${_t(c)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const a = parseInt(t.state, 10);
    if (!isNaN(a) && String(a) === t.state.trim()) {
      const i = t.attributes.message, l = a === 0 ? "Heute" : a === 1 ? "Morgen" : `+${a}d`;
      this._trashChip = `${i ? it(i, s) : "🗑️"} ${l}`;
      return;
    }
    const n = new Date(t.state);
    isNaN(n.getTime()) || (this._trashChip = `🗑️ ${_t(n)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, r = s?.attributes.temperature, a = s ? Se[s.state] ?? "🌡️" : null;
    return o`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">${this._presenceChip()}</div>
        <div class="center">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${a ? o`<span class="chip">${a}${r != null ? ` ${Math.round(r)}°` : ""}</span>` : ""}
          ${this._trashChip ? o`<span class="chip">${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
S.styles = [C, x`
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
H([
  u({ attribute: !1 })
], S.prototype, "hass", 2);
H([
  u({ attribute: !1 })
], S.prototype, "config", 2);
H([
  u({ type: Boolean })
], S.prototype, "dark", 2);
H([
  y()
], S.prototype, "_time", 2);
H([
  y()
], S.prototype, "_date", 2);
H([
  y()
], S.prototype, "_trashChip", 2);
S = H([
  w("nspanel-status-bar")
], S);
var Me = Object.defineProperty, Oe = Object.getOwnPropertyDescriptor, Et = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Oe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Me(t, s, a), a;
};
let tt = class extends b {
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
tt.styles = [C, x`
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
Et([
  u({ attribute: !1 })
], tt.prototype, "hass", 2);
Et([
  u({ type: String })
], tt.prototype, "cameraEntity", 2);
tt = Et([
  w("nspanel-doorbell-popup")
], tt);
var Te = Object.defineProperty, De = Object.getOwnPropertyDescriptor, W = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? De(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Te(t, s, a), a;
};
function Ne(e) {
  return e.start.date ? "Ganztag" : new Date(e.start.dateTime).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
}
const Fe = {
  cleaning: "Saugt",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
};
let z = class extends b {
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
  _adjustTemp(e) {
    const t = this.config?.thermostat_entity;
    if (!t || !this.hass) return;
    const s = this.hass.states[t]?.attributes.temperature;
    s != null && this.hass.callService("climate", "set_temperature", {
      entity_id: t,
      temperature: Math.round((s + e) * 2) / 2
    });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.garden_light ? t?.states[e.garden_light] : null, r = e.light_2 ? t?.states[e.light_2] : null, a = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, n = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, i = n && parseFloat(n.state) || 0, l = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0, c = e.indoor_temp_entity ? t?.states[e.indoor_temp_entity] : null, h = e.thermostat_entity ? t?.states[e.thermostat_entity] : null, p = c ? parseFloat(c.state) : h ? h.attributes.current_temperature ?? null : null, d = h ? h.attributes.temperature ?? null : null, g = p != null || d != null, v = e.ev_entity ? t?.states[e.ev_entity] : null, m = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, _ = v ? parseFloat(v.state) : NaN, k = isNaN(_) ? null : _, A = m ? parseFloat(m.state) : NaN, E = isNaN(A) ? null : Math.round(A), nt = /* @__PURE__ */ new Date(), q = this._calEvents.filter(($) => $.start.date ? !0 : ($.end.dateTime ? new Date($.end.dateTime) : new Date($.start.dateTime)) > nt);
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <div class="main-grid">

          <!-- Left: Calendar -->
          <div class="cal-card">
            <div class="cal-header">Heute</div>
            <div class="cal-list">
              ${q.length > 0 ? q.map(($) => o`
                  <div class="cal-event">
                    <div class="cal-dot"></div>
                    <div class="cal-body">
                      <div class="cal-title">${$.summary}</div>
                      <div class="cal-time">${Ne($)}</div>
                    </div>
                  </div>
                `) : o`<div class="cal-empty">Keine weiteren Termine</div>`}
            </div>
          </div>

          <!-- Right: Controls -->
          <div class="controls-col">

            <!-- Temperature + threshold -->
            ${g ? o`
              <div class="temp-card">
                <div class="temp-label">INNENRAUM</div>
                ${p != null ? o`
                  <div class="temp-current">${(Math.round(p * 10) / 10).toFixed(1)}°</div>
                ` : ""}
                ${d != null ? o`
                  <div class="temp-divider"></div>
                  <div class="temp-stepper">
                    <button class="step-btn" @click=${() => this._adjustTemp(-0.5)}>−</button>
                    <span class="step-val">${d.toFixed(1)}°</span>
                    <button class="step-btn" @click=${() => this._adjustTemp(0.5)}>+</button>
                  </div>
                  <div class="temp-hint">Heizgrenze</div>
                ` : ""}
              </div>
            ` : ""}

            ${s ? this._renderLight(e.garden_light, s, e.garden_light_icon ?? "💡") : ""}
            ${r ? this._renderLight(e.light_2, r, e.light_2_icon ?? "💡") : ""}

            ${a ? o`
              <button class="ctrl-btn vac-btn ${a.state === "cleaning" ? "active" : ""}"
                @click=${() => this._vacuumAction(e.vacuum_entity, a.state)}>
                <span class="ctrl-icon">🤖</span>
                <span class="ctrl-name">${Fe[a.state] ?? a.state}</span>
                ${a.state !== "error" && a.state !== "returning" ? o`
                  <div class="vac-action ${a.state === "cleaning" || a.state === "paused" ? "stop" : "start"}">
                    ${a.state === "cleaning" || a.state === "paused" ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 6h12v12H6z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>`}
                  </div>
                ` : ""}
              </button>
            ` : ""}

            ${i > 0 ? o`
              <div class="ctrl-btn dish-btn">
                <span class="ctrl-icon">🍽️</span>
                <div class="dish-track">
                  <div class="dish-fill" style="width:${l}%"></div>
                </div>
                <span class="dish-time">${Math.round(i)} min</span>
              </div>
            ` : ""}

          </div>
        </div>

        <!-- EV bar: full width, only when connected -->
        ${k != null ? o`
          <div class="ev-bar">
            <span class="ev-label">🚗 ${Math.round(k)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${k}%"></div></div>
            ${E != null ? o`<span class="ev-km">${E} km</span>` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderLight(e, t, s) {
    const r = t.state === "on", a = t.attributes.friendly_name ?? e.split(".")[1];
    return o`
      <button class="ctrl-btn" @click=${() => this._toggleLight(e)}>
        <span class="ctrl-icon">${s}</span>
        <span class="ctrl-name">${a}</span>
        <div class="toggle-track ${r ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
};
z.styles = [C, st, x`
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
    .temp-label {
      font-family: var(--nsp-font);
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--nsp-text-3);
      align-self: flex-start;
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
      font-size: 9px;
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
W([
  u({ attribute: !1 })
], z.prototype, "hass", 2);
W([
  u({ attribute: !1 })
], z.prototype, "config", 2);
W([
  u({ type: Boolean })
], z.prototype, "dark", 2);
W([
  y()
], z.prototype, "_calEvents", 2);
W([
  y()
], z.prototype, "_dishMax", 2);
z = W([
  w("nspanel-page-home")
], z);
var je = Object.defineProperty, He = Object.getOwnPropertyDescriptor, vt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? He(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && je(t, s, a), a;
};
let U = class extends b {
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
    const s = t.attributes.current_temperature, r = t.attributes.temperature, a = t.state, n = a === "heat";
    return o`
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
U.styles = [C, st, x`
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
vt([
  u({ attribute: !1 })
], U.prototype, "hass", 2);
vt([
  u({ attribute: !1 })
], U.prototype, "config", 2);
vt([
  u({ type: Boolean })
], U.prototype, "dark", 2);
U = vt([
  w("nspanel-page-climate")
], U);
var Be = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, at = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Le(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Be(t, s, a), a;
};
const Re = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let F = class extends b {
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
      const n = t[r], i = a.state, l = a.attributes.current_position, c = this._movingFrom[r];
      (n === "up" ? i === "open" || l === 100 : n === "down" ? i === "closed" || l === 0 : !1) && i !== c && (delete t[r], delete this._movingFrom[r], s = !0);
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
    const e = this.config ?? {}, t = this.hass, s = Re.map((n) => e[n]).filter((n) => !!n), r = s.filter((n) => t?.states[n]?.state === "open").length, a = s.filter((n) => t?.states[n]?.state === "closed").length;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="summary-bar">
          <span class="summary-text">
            <span class="summary-open">${r} Offen</span>
            <span class="summary-dot"> · </span>
            <span class="summary-closed">${a} Zu</span>
          </span>
          <div class="summary-actions">
            ${e.scene_up ? o`<button class="pill-btn" @click=${() => this._scene(e.scene_up)}>↑ Alle</button>` : ""}
            ${e.scene_down ? o`<button class="pill-btn" @click=${() => this._scene(e.scene_down)}>↓ Alle</button>` : ""}
          </div>
        </div>

        <div class="covers-grid">
          ${s.map((n, i) => {
      const l = t?.states[n];
      if (!l) return o``;
      const c = l.attributes.friendly_name ?? n, h = l.attributes.current_position, p = this._moving[n], d = h != null ? `${h}%` : l.state === "open" ? "Offen" : l.state === "closed" ? "Zu" : "–", g = l.state === "open" ? "st-open" : l.state === "closed" ? "st-closed" : "st-mid";
      return o`
              <div class="cover-card">
                <div class="cover-info">
                  <div class="cover-name">${c}</div>
                  <div class="cover-status ${g}">${d}</div>
                </div>
                <div class="cover-btns">
                  <button class="cov-btn ${p === "up" ? "active" : ""}"
                    @click=${() => this._cover(n, p === "up" ? "stop_cover" : "open_cover")}
                    aria-label="${p === "up" ? "Stop" : "Öffnen"}">
                    ${p === "up" ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`}
                  </button>
                  <button class="cov-btn ${p === "down" ? "active" : ""}"
                    @click=${() => this._cover(n, p === "down" ? "stop_cover" : "close_cover")}
                    aria-label="${p === "down" ? "Stop" : "Schließen"}">
                    ${p === "down" ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`}
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
F.styles = [C, st, x`
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
at([
  u({ attribute: !1 })
], F.prototype, "hass", 2);
at([
  u({ attribute: !1 })
], F.prototype, "config", 2);
at([
  u({ type: Boolean })
], F.prototype, "dark", 2);
at([
  y()
], F.prototype, "_moving", 2);
F = at([
  w("nspanel-page-blinds")
], F);
var Ie = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, rt = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ue(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ie(t, s, a), a;
};
function Ut(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let j = class extends b {
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
    if (!t) return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">No media player configured</div></div>
    `;
    if (t.state === "off" || t.state === "unavailable" || t.state === "standby") return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="offline">
          <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40" style="opacity:.25">
            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
          </svg>
          <div class="offline-name">${t.attributes.friendly_name ?? e}</div>
          <div class="offline-hint">Start playback from the Spotify or B&O app<br>to control it here</div>
        </div>
      </div>
    `;
    const r = t.state === "playing", a = t.attributes.media_title ?? "", n = t.attributes.media_artist ?? "", i = t.attributes.entity_picture ?? "";
    t.attributes.volume_level;
    const l = t.attributes.media_duration ?? 0, c = t.attributes.media_position ?? 0, h = t.attributes.media_position_updated_at ?? "";
    let p = c;
    r && h && (p = Math.min(c + (Date.now() - new Date(h).getTime()) / 1e3, l));
    const d = l > 0 ? p / l : 0;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${i ? o`<img class="art" src="${i}" alt="cover" />` : o`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${a || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${n ? o`<div class="track-artist">${n}</div>` : ""}
        </div>

        ${l > 0 ? o`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%">
                <div class="progress-thumb"></div>
              </div>
            </div>
            <div class="progress-times">
              <span>${Ut(p)}</span>
              <span>-${Ut(l - p)}</span>
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
            ${r ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`}
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
j.styles = [C, st, x`
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
rt([
  u({ attribute: !1 })
], j.prototype, "hass", 2);
rt([
  u({ attribute: !1 })
], j.prototype, "config", 2);
rt([
  u({ type: Boolean })
], j.prototype, "dark", 2);
rt([
  y()
], j.prototype, "_tick", 2);
j = rt([
  w("nspanel-page-media")
], j);
var Ve = Object.defineProperty, We = Object.getOwnPropertyDescriptor, ft = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? We(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ve(t, s, a), a;
};
function Vt(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function yt(e) {
  return `${e.toFixed(1)} kWh`;
}
let V = class extends b {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setMode(e) {
    const t = this.config.evcc_mode_entity;
    t && this.hass.callService("select", "select_option", { entity_id: t, option: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, r = e.grid_entity ? t?.states[e.grid_entity] : null, a = s ? parseFloat(s.state) : null, n = r ? parseFloat(r.state) : null, i = n != null && n < 0, l = a != null && n != null ? a + n : null, c = a != null && l != null && l > 0 ? Math.min(a / l, 1) * 100 : i ? 100 : null, h = c != null ? Math.max(100 - c, 0) : null, p = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, d = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, g = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, v = p ? parseFloat(p.state) : null, m = d ? parseFloat(d.state) : null, _ = g ? parseFloat(g.state) : null, k = m != null && m > 0 && v != null ? Math.min(v / m, 1) : null, A = e.ev_entity ? t?.states[e.ev_entity] : null, E = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, nt = e.evcc_mode_entity ? t?.states[e.evcc_mode_entity] : null, q = A ? parseFloat(A.state) : NaN, $ = isNaN(q) ? null : q, gt = E ? parseFloat(E.state) : NaN, Pt = isNaN(gt) ? null : Math.round(gt), Qt = nt?.state ?? null, zt = nt?.attributes.options ?? [];
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <!-- Hero: PV + grid state -->
        <div class="hero-card">
          <div class="hero-top">
            <div>
              <div class="hero-label">PV-ERZEUGUNG</div>
              <div class="hero-value">${a != null ? Vt(a) : "–"}</div>
            </div>
            <div class="hero-icon">☀️</div>
          </div>

          ${c != null ? o`
            <div class="flow-bar">
              <div class="flow-solar" style="width:${c}%"></div>
              <div class="flow-grid"  style="width:${h}%"></div>
            </div>
          ` : ""}

          ${n != null ? o`
            <div class="grid-line ${i ? "grid-export" : "grid-import"}">
              <span>${i ? "⬆️" : "⬇️"} ${Vt(Math.abs(n))} ${i ? "Einspeisung" : "Netzbezug"}</span>
              ${c != null ? o`<span>${Math.round(c)}% autark</span>` : ""}
            </div>
          ` : ""}
        </div>

        <!-- Forecast -->
        ${v != null || m != null || _ != null ? o`
          <div class="forecast-row">
            ${v != null || m != null ? o`
              <div class="fc-card">
                <div class="fc-label">Heute</div>
                <div class="fc-val">${m != null ? yt(m) : yt(v)}</div>
                ${k != null ? o`
                  <div class="fc-track"><div class="fc-fill" style="width:${k * 100}%"></div></div>
                ` : ""}
              </div>
            ` : ""}
            ${_ != null ? o`
              <div class="fc-card">
                <div class="fc-label">Morgen</div>
                <div class="fc-val">${yt(_)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}

        <!-- EV card (only when connected) -->
        ${$ != null ? o`
          <div class="ev-card">
            <div class="ev-top">
              <span class="ev-pct">🚗 ${Math.round($)}%</span>
              <div class="ev-track"><div class="ev-fill" style="width:${$}%"></div></div>
              ${Pt != null ? o`<span class="ev-km">${Pt} km</span>` : ""}
            </div>
            ${zt.length > 0 ? o`
              <div class="ev-modes">
                ${zt.map((mt) => o`
                  <button class="mode-btn ${Qt === mt ? "active" : ""}"
                    @click=${() => this._setMode(mt)}>${mt}</button>
                `)}
              </div>
            ` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
};
V.styles = [C, st, x`
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
ft([
  u({ attribute: !1 })
], V.prototype, "hass", 2);
ft([
  u({ attribute: !1 })
], V.prototype, "config", 2);
ft([
  u({ type: Boolean })
], V.prototype, "dark", 2);
V = ft([
  w("nspanel-page-energy")
], V);
var Ge = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, G = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ke(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ge(t, s, a), a;
};
const qe = ["camera_1", "camera_2", "camera_3", "camera_4"];
let M = class extends b {
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
    const e = this.config ?? {}, t = this.hass, s = !!e.cameras_portrait, r = qe.map((i) => e[i]).filter((i) => !!i);
    if (r.length === 0)
      return o`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const a = `page ${this.dark ? "nsp-dark" : ""} count-${r.length} ${s ? "portrait" : ""}`, n = (i) => {
      const l = t?.states[i];
      return l ? l.attributes.frontend_stream_type ? o`<ha-camera-stream .hass=${t} .stateObj=${l} muted autoPlay></ha-camera-stream>` : o`<img class="cam-img" src="/api/camera_proxy/${i}?token=${l.attributes.access_token}&_=${this._tick}" alt="${l.attributes.friendly_name ?? i}" />` : o`<div class="cam-unavail">Not available</div>`;
    };
    return o`
      <div class="${a}">
        ${r.map((i) => {
      const l = t?.states[i]?.attributes.friendly_name ?? i;
      return o`
            <div class="cam-cell" @click=${() => {
        this._fullscreenCam = i;
      }}>
              ${n(i)}
              <div class="cam-label">${l}</div>
            </div>
          `;
    })}

        ${this._fullscreenCam ? o`
          <div class="cam-fullscreen" @click=${() => {
      this._fullscreenCam = null;
    }}>
            ${n(this._fullscreenCam)}
            <div class="cam-label">${t?.states[this._fullscreenCam]?.attributes.friendly_name ?? this._fullscreenCam}</div>
            <div class="cam-close">✕</div>
          </div>
        ` : f}
      </div>
    `;
  }
};
M.styles = [C, x`
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
G([
  u({ attribute: !1 })
], M.prototype, "hass", 2);
G([
  u({ attribute: !1 })
], M.prototype, "config", 2);
G([
  u({ type: Boolean })
], M.prototype, "dark", 2);
G([
  y()
], M.prototype, "_tick", 2);
G([
  y()
], M.prototype, "_fullscreenCam", 2);
M = G([
  w("nspanel-page-security")
], M);
var Ye = Object.defineProperty, Ze = Object.getOwnPropertyDescriptor, St = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? Ze(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && Ye(t, s, a), a;
};
const Wt = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
}, Gt = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" },
  { id: "security" }
], Je = [
  { name: "weather_entity", label: "Weather", selector: { entity: { domain: "weather" } } },
  { name: "indoor_temp_entity", label: "Indoor Temperature — temperature sensor", selector: { entity: { domain: "sensor", device_class: "temperature" } } },
  { name: "calendar_entity", label: "Calendar", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Trash Collection", selector: { entity: { domain: ["sensor", "calendar"] } } }
], Qe = [
  { name: "person_1", label: "Person 1 — shown as 👦 in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 — shown as 👧 in status bar", selector: { entity: { domain: "person" } } }
], Xe = [
  { name: "garden_light", label: "Light 1", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Light 1 Icon — emoji, default 💡", selector: { text: {} } },
  { name: "light_2", label: "Light 2 (optional)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Light 2 Icon — emoji, default 💡", selector: { text: {} } }
], ts = [
  { name: "vacuum_entity", label: "Robot Vacuum (optional)", selector: { entity: { domain: "vacuum" } } },
  { name: "dishwasher_entity", label: "Dishwasher (optional) — remaining time sensor in min", selector: { entity: { domain: "sensor" } } }
], es = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], ss = [
  { name: "cover_1", label: "Blind 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Blind 2 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Blind 3 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Blind 4 (optional)", selector: { entity: { domain: "cover" } } }
], as = [
  { name: "cover_5", label: "Blind 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Blind 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Blind 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Blind 8", selector: { entity: { domain: "cover" } } }
], rs = [
  { name: "scene_up", label: "Open All — scene or script", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Close All — scene or script", selector: { entity: { domain: ["scene", "script"] } } }
], ns = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } },
  { name: "media_default_source", label: "Default Source (optional) — e.g. Spotify, Bluetooth", selector: { text: {} } }
], is = [
  { name: "pv_entity", label: "Solar Production — sensor in W or kW", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Grid Power — positive = import, negative = export (W or kW)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV Battery (optional) — state of charge sensor in %", selector: { entity: { domain: "sensor" } } },
  { name: "ev_range_entity", label: "EV Range (optional) — range sensor in km", selector: { entity: { domain: "sensor" } } },
  { name: "evcc_mode_entity", label: "EVCC Charge Mode (optional) — select entity for mode", selector: { entity: { domain: "select" } } }
], os = [
  { name: "pv_today_entity", label: "Solar Energy Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Solar Forecast Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Solar Forecast Tomorrow — sensor in kWh", selector: { entity: { domain: "sensor" } } }
], ls = [
  { name: "camera_1", label: "Camera 1", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Camera 2 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Camera 3 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Camera 4 (optional)", selector: { entity: { domain: "camera" } } }
], cs = [
  { name: "doorbell_trigger", label: "Doorbell Trigger — binary_sensor or input_boolean", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Doorbell Camera (optional)", selector: { entity: { domain: "camera" } } }
], ps = [
  { name: "bg_accent_1", label: "Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)", selector: { text: {} } },
  { name: "bg_accent_2", label: "Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)", selector: { text: {} } }
], ds = (e) => e.label ?? e.name;
let pt = class extends b {
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
    return o`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${ds} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return o``;
    const e = this._config, t = e.pages ?? ["home"], s = (r) => e[`${r}_label`] ?? "";
    return o`
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
        ${Gt.map((r) => o`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${s(r.id) || Wt[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(Gt.map((r) => ({
      name: `${r.id}_label`,
      label: `${Wt[r.id]} — custom label`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Weather, calendar events, lights and appliances shown on the Home tab.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(Je)}
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
      ${this._form(Qe)}

      <div class="nsp-group">Lights</div>
      ${this._form(Xe)}

      <div class="nsp-group">Appliances</div>
      ${this._form(ts)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Control your heating and cooling system.</p>
      ${this._form(es)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(ss)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(as)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(rs)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(ns)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(is)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(os)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(ls)}
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
      ${this._form(cs)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(ps)}
    `;
  }
};
St([
  u({ attribute: !1 })
], pt.prototype, "hass", 2);
St([
  y()
], pt.prototype, "_config", 2);
pt = St([
  w("nspanel-dashboard-editor")
], pt);
var hs = Object.defineProperty, us = Object.getOwnPropertyDescriptor, K = (e, t, s, r) => {
  for (var a = r > 1 ? void 0 : r ? us(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (a = (r ? i(t, s, a) : i(a)) || a);
  return r && a && hs(t, s, a), a;
};
let O = class extends b {
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
    if (!this._config) return o``;
    const e = this._dark, t = e ? 0.18 : 0.09, s = this._glowVar(this._config.bg_accent_1, t), r = this._glowVar(this._config.bg_accent_2, t), a = [s ? `--nsp-glow-1:${s}` : "", r ? `--nsp-glow-2:${r}` : ""].filter(Boolean).join(";");
    return o`
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
      energy: this._config.energy_label,
      security: this._config.security_label
    }}
          @page-change=${(n) => {
      this._activePage = n.detail.page;
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
        return o`<nspanel-page-energy   .hass=${e} .config=${t} ?dark=${s}></nspanel-page-energy>`;
      case "security":
        return o`<nspanel-page-security .hass=${e} .config=${t} ?dark=${s}></nspanel-page-security>`;
      default:
        return o``;
    }
  }
};
O.styles = [C, x`
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
K([
  u({ attribute: !1 })
], O.prototype, "hass", 2);
K([
  y()
], O.prototype, "_config", 2);
K([
  y()
], O.prototype, "_activePage", 2);
K([
  y()
], O.prototype, "_doorbellActive", 2);
K([
  y()
], O.prototype, "_dark", 2);
O = K([
  w("nspanel-dashboard")
], O);
export {
  O as NspanelDashboard
};
