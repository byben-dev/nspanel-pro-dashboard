/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, _t = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), St = /* @__PURE__ */ new WeakMap();
let Rt = class {
  constructor(t, s, a) {
    if (this._$cssResult$ = !0, a !== yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (_t && t === void 0) {
      const a = s !== void 0 && s.length === 1;
      a && (t = St.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && St.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const qt = (e) => new Rt(typeof e == "string" ? e : e + "", void 0, yt), y = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((a, r, n) => a + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Rt(s, e, yt);
}, Zt = (e, t) => {
  if (_t) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const a = document.createElement("style"), r = ot.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = s.cssText, e.appendChild(a);
  }
}, Pt = _t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const a of t.cssRules) s += a.cssText;
  return qt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Yt, defineProperty: Jt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: Xt, getOwnPropertySymbols: te, getPrototypeOf: ee } = Object, dt = globalThis, zt = dt.trustedTypes, se = zt ? zt.emptyScript : "", ae = dt.reactiveElementPolyfillSupport, Z = (e, t) => e, lt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? se : null;
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
} }, xt = (e, t) => !Yt(e, t), Ot = { attribute: !0, type: String, converter: lt, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= Symbol("metadata"), dt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let F = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = Ot) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const a = Symbol(), r = this.getPropertyDescriptor(t, a, s);
      r !== void 0 && Jt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, a) {
    const { get: r, set: n } = Qt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: r, set(i) {
      const l = r?.call(this);
      n?.call(this, i), this.requestUpdate(t, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const t = ee(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const s = this.properties, a = [...Xt(s), ...te(s)];
      for (const r of a) this.createProperty(r, s[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [a, r] of s) this.elementProperties.set(a, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, a] of this.elementProperties) {
      const r = this._$Eu(s, a);
      r !== void 0 && this._$Eh.set(r, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const a = new Set(t.flat(1 / 0).reverse());
      for (const r of a) s.unshift(Pt(r));
    } else t !== void 0 && s.push(Pt(t));
    return s;
  }
  static _$Eu(t, s) {
    const a = s.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const a of s.keys()) this.hasOwnProperty(a) && (t.set(a, this[a]), delete this[a]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Zt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, s, a) {
    this._$AK(t, a);
  }
  _$ET(t, s) {
    const a = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, a);
    if (r !== void 0 && a.reflect === !0) {
      const n = (a.converter?.toAttribute !== void 0 ? a.converter : lt).toAttribute(s, a.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const a = this.constructor, r = a._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = a.getPropertyOptions(r), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : lt;
      this._$Em = r;
      const l = i.fromAttribute(s, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, s, a, r = !1, n) {
    if (t !== void 0) {
      const i = this.constructor;
      if (r === !1 && (n = this[t]), a ??= i.getPropertyOptions(t), !((a.hasChanged ?? xt)(n, s) || a.useDefault && a.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, a)))) return;
      this.C(t, s, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: a, reflect: r, wrapped: n }, i) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? s ?? this[t]), n !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || a || (s = void 0), this._$AL.set(t, s)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [r, n] of a) {
        const { wrapped: i } = n, l = this[r];
        i !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
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
F.elementStyles = [], F.shadowRootOptions = { mode: "open" }, F[Z("elementProperties")] = /* @__PURE__ */ new Map(), F[Z("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: F }), (dt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Mt = (e) => e, ct = $t.trustedTypes, Tt = ct ? ct.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Vt = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Wt = "?" + E, re = `<${Wt}>`, T = document, Y = () => T.createComment(""), J = (e) => e === null || typeof e != "object" && typeof e != "function", wt = Array.isArray, ne = (e) => wt(e) || typeof e?.[Symbol.iterator] == "function", gt = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dt = /-->/g, Nt = />/g, O = RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Ft = /"/g, Gt = /^(?:script|style|textarea|title)$/i, ie = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), o = ie(1), j = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), jt = /* @__PURE__ */ new WeakMap(), M = T.createTreeWalker(T, 129);
function Kt(e, t) {
  if (!wt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(t) : t;
}
const oe = (e, t) => {
  const s = e.length - 1, a = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = q;
  for (let l = 0; l < s; l++) {
    const c = e[l];
    let h, p, d = -1, v = 0;
    for (; v < c.length && (i.lastIndex = v, p = i.exec(c), p !== null); ) v = i.lastIndex, i === q ? p[1] === "!--" ? i = Dt : p[1] !== void 0 ? i = Nt : p[2] !== void 0 ? (Gt.test(p[2]) && (r = RegExp("</" + p[2], "g")), i = O) : p[3] !== void 0 && (i = O) : i === O ? p[0] === ">" ? (i = r ?? q, d = -1) : p[1] === void 0 ? d = -2 : (d = i.lastIndex - p[2].length, h = p[1], i = p[3] === void 0 ? O : p[3] === '"' ? Ft : Ht) : i === Ft || i === Ht ? i = O : i === Dt || i === Nt ? i = q : (i = O, r = void 0);
    const g = i === O && e[l + 1].startsWith("/>") ? " " : "";
    n += i === q ? c + re : d >= 0 ? (a.push(h), c.slice(0, d) + Vt + c.slice(d) + E + g) : c + E + (d === -2 ? l : g);
  }
  return [Kt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), a];
};
class Q {
  constructor({ strings: t, _$litType$: s }, a) {
    let r;
    this.parts = [];
    let n = 0, i = 0;
    const l = t.length - 1, c = this.parts, [h, p] = oe(t, s);
    if (this.el = Q.createElement(h, a), M.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = M.nextNode()) !== null && c.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Vt)) {
          const v = p[i++], g = r.getAttribute(d).split(E), $ = /([.?@])?(.*)/.exec(v);
          c.push({ type: 1, index: n, name: $[2], strings: g, ctor: $[1] === "." ? ce : $[1] === "?" ? pe : $[1] === "@" ? de : ht }), r.removeAttribute(d);
        } else d.startsWith(E) && (c.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Gt.test(r.tagName)) {
          const d = r.textContent.split(E), v = d.length - 1;
          if (v > 0) {
            r.textContent = ct ? ct.emptyScript : "";
            for (let g = 0; g < v; g++) r.append(d[g], Y()), M.nextNode(), c.push({ type: 2, index: ++n });
            r.append(d[v], Y());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Wt) c.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(E, d + 1)) !== -1; ) c.push({ type: 7, index: n }), d += E.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const a = T.createElement("template");
    return a.innerHTML = t, a;
  }
}
function B(e, t, s = e, a) {
  if (t === j) return t;
  let r = a !== void 0 ? s._$Co?.[a] : s._$Cl;
  const n = J(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, a)), a !== void 0 ? (s._$Co ??= [])[a] = r : s._$Cl = r), r !== void 0 && (t = B(e, r._$AS(e, t.values), r, a)), t;
}
class le {
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
    const { el: { content: s }, parts: a } = this._$AD, r = (t?.creationScope ?? T).importNode(s, !0);
    M.currentNode = r;
    let n = M.nextNode(), i = 0, l = 0, c = a[0];
    for (; c !== void 0; ) {
      if (i === c.index) {
        let h;
        c.type === 2 ? h = new tt(n, n.nextSibling, this, t) : c.type === 1 ? h = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (h = new he(n, this, t)), this._$AV.push(h), c = a[++l];
      }
      i !== c?.index && (n = M.nextNode(), i++);
    }
    return M.currentNode = T, r;
  }
  p(t) {
    let s = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, s), s += a.strings.length - 2) : a._$AI(t[s])), s++;
  }
}
class tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, a, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = a, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = B(this, t, s), J(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== j && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ne(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && J(this._$AH) ? this._$AA.nextSibling.data = t : this.T(T.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: a } = t, r = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = Q.createElement(Kt(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new le(r, this), i = n.u(this.options);
      n.p(s), this.T(i), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = jt.get(t.strings);
    return s === void 0 && jt.set(t.strings, s = new Q(t)), s;
  }
  k(t) {
    wt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let a, r = 0;
    for (const n of t) r === s.length ? s.push(a = new tt(this.O(Y()), this.O(Y()), this, this.options)) : a = s[r], a._$AI(n), r++;
    r < s.length && (this._$AR(a && a._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const a = Mt(t).nextSibling;
      Mt(t).remove(), t = a;
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
  constructor(t, s, a, r, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = f;
  }
  _$AI(t, s = this, a, r) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) t = B(this, t, s, 0), i = !J(t) || t !== this._$AH && t !== j, i && (this._$AH = t);
    else {
      const l = t;
      let c, h;
      for (t = n[0], c = 0; c < n.length - 1; c++) h = B(this, l[a + c], s, c), h === j && (h = this._$AH[c]), i ||= !J(h) || h !== this._$AH[c], h === f ? t = f : t !== f && (t += (h ?? "") + n[c + 1]), this._$AH[c] = h;
    }
    i && !r && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ce extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class pe extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class de extends ht {
  constructor(t, s, a, r, n) {
    super(t, s, a, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = B(this, t, s, 0) ?? f) === j) return;
    const a = this._$AH, r = t === f && a !== f || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, n = t !== f && (a === f || r);
    r && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class he {
  constructor(t, s, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const ue = $t.litHtmlPolyfillSupport;
ue?.(Q, tt), ($t.litHtmlVersions ??= []).push("3.3.3");
const ve = (e, t, s) => {
  const a = s?.renderBefore ?? t;
  let r = a._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    a._$litPart$ = r = new tt(t.insertBefore(Y(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = globalThis;
class m extends F {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ve(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return j;
  }
}
m._$litElement$ = !0, m.finalized = !0, kt.litElementHydrateSupport?.({ LitElement: m });
const fe = kt.litElementPolyfillSupport;
fe?.({ LitElement: m });
(kt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ge = { attribute: !0, type: String, converter: lt, reflect: !1, hasChanged: xt }, me = (e = ge, t, s) => {
  const { kind: a, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), a === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), a === "accessor") {
    const { name: i } = s;
    return { set(l) {
      const c = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(i, c, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(i, void 0, e, l), l;
    } };
  }
  if (a === "setter") {
    const { name: i } = s;
    return function(l) {
      const c = this[i];
      t.call(this, l), this.requestUpdate(i, c, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function u(e) {
  return (t, s) => typeof s == "object" ? me(e, t, s) : ((a, r, n) => {
    const i = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, a), i ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(e, t, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(e) {
  return u({ ...e, state: !0, attribute: !1 });
}
const w = y`
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
`, et = y`
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
var be = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, ut = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? _e(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && be(t, s, r), r;
};
const ye = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z",
  security: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
}, Bt = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
};
let L = class extends m {
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
            aria-label=${Bt[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${ye[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Bt[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
L.styles = [w, y`
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
], L.prototype, "pages", 2);
ut([
  u({ type: String })
], L.prototype, "activePage", 2);
ut([
  u({ attribute: !1 })
], L.prototype, "customLabels", 2);
L = ut([
  x("nspanel-bottom-nav")
], L);
var xe = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, H = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? $e(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && xe(t, s, r), r;
};
const we = {
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
}, ke = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function Ae(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const s = t.lastIndexOf("="), a = t.slice(0, s).split(",").map((n) => n.trim().toLowerCase()).filter(Boolean), r = t.slice(s + 1).trim() || "🗑️";
    return { keywords: a, icon: r };
  });
}
function nt(e, t) {
  const s = Ae(t ?? ke), a = e.toLowerCase();
  for (const r of s)
    if (r.keywords.some((n) => a.includes(n))) return r.icon;
  return "🗑️";
}
function mt(e) {
  const t = /* @__PURE__ */ new Date();
  t.setHours(0, 0, 0, 0);
  const s = new Date(t);
  s.setDate(t.getDate() + 1);
  const a = new Date(e);
  if (a.setHours(0, 0, 0, 0), a.getTime() === t.getTime()) return "Heute";
  if (a.getTime() === s.getTime()) return "Morgen";
  const r = Math.round((a.getTime() - t.getTime()) / 864e5);
  return r > 0 && r <= 6 ? e.toLocaleDateString("de-AT", { weekday: "short" }) : `+${r}d`;
}
let C = class extends m {
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
    const e = this.config ?? {}, t = this.hass, s = e.person_1 ? t?.states[e.person_1]?.state === "home" : !1, a = e.person_2 ? t?.states[e.person_2]?.state === "home" : !1, r = [s ? "👨🏻" : "", a ? "👩🏻" : ""].filter(Boolean).join("");
    return r ? o`<span class="chip">${r}</span>` : "";
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
            const G = A.toISOString();
            p.has(G) || p.set(G, []), p.get(G).push(_.summary);
          }
          const [d, v] = [...p.entries()].sort((_, k) => _[0].localeCompare(k[0]))[0], g = this.config?.trash_mapping, $ = [...new Set(v.map((_) => nt(_, g)))].join("");
          this._trashChip = `${$} ${mt(new Date(d))}`;
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
      this._trashChip = `${i ? nt(i, s) : "🗑️"} Heute`;
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const i = t.attributes.start_time, l = t.attributes.message;
      if (i) {
        const c = new Date(i);
        if (!isNaN(c.getTime())) {
          this._trashChip = `${l ? nt(l, s) : "🗑️"} ${mt(c)}`;
          return;
        }
      }
      this._trashChip = null;
      return;
    }
    const r = parseInt(t.state, 10);
    if (!isNaN(r) && String(r) === t.state.trim()) {
      const i = t.attributes.message, l = r === 0 ? "Heute" : r === 1 ? "Morgen" : `+${r}d`;
      this._trashChip = `${i ? nt(i, s) : "🗑️"} ${l}`;
      return;
    }
    const n = new Date(t.state);
    isNaN(n.getTime()) || (this._trashChip = `🗑️ ${mt(n)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, a = s?.attributes.temperature, r = s ? we[s.state] ?? "🌡️" : null;
    return o`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">${this._presenceChip()}</div>
        <div class="center">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${r ? o`<span class="chip">${r}${a != null ? ` ${Math.round(a)}°` : ""}</span>` : ""}
          ${this._trashChip ? o`<span class="chip">${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
C.styles = [w, y`
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
], C.prototype, "hass", 2);
H([
  u({ attribute: !1 })
], C.prototype, "config", 2);
H([
  u({ type: Boolean })
], C.prototype, "dark", 2);
H([
  b()
], C.prototype, "_time", 2);
H([
  b()
], C.prototype, "_date", 2);
H([
  b()
], C.prototype, "_trashChip", 2);
C = H([
  x("nspanel-status-bar")
], C);
var Ce = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, At = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Ee(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ce(t, s, r), r;
};
let X = class extends m {
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
X.styles = [w, y`
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
At([
  u({ attribute: !1 })
], X.prototype, "hass", 2);
At([
  u({ type: String })
], X.prototype, "cameraEntity", 2);
X = At([
  x("nspanel-doorbell-popup")
], X);
var Se = Object.defineProperty, Pe = Object.getOwnPropertyDescriptor, R = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Pe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Se(t, s, r), r;
};
function ze(e) {
  if (e.start.date) return "Ganztag";
  const t = new Date(e.start.dateTime), s = e.end.dateTime ? new Date(e.end.dateTime) : null, a = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return s ? `${a(t)} – ${a(s)}` : a(t);
}
const Oe = {
  cleaning: "Saugt gerade",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
};
let S = class extends m {
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
    const a = `/api/calendars/${e}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(s.toISOString())}`;
    try {
      const r = await this.hass.fetchWithAuth(a);
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
    const e = this.config ?? {}, t = this.hass, s = e.garden_light ? t?.states[e.garden_light] : null, a = e.light_2 ? t?.states[e.light_2] : null, r = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, n = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, i = n && parseFloat(n.state) || 0, l = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        ${e.calendar_entity ? o`
          <div class="section-label">Heute</div>
          <div class="events-list">
            ${this._calEvents.length > 0 ? this._calEvents.map((c) => o`
                <div class="event-row">
                  <div class="event-dot"></div>
                  <div class="event-body">
                    <div class="event-title">${c.summary}</div>
                    <div class="event-time">${ze(c)}</div>
                  </div>
                </div>
              `) : o`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : o`<div class="spacer"></div>`}

        ${s || a ? o`
          <div class="lights-row">
            ${s ? this._renderLight(e.garden_light, s, e.garden_light_icon ?? "💡") : ""}
            ${a ? this._renderLight(e.light_2, a, e.light_2_icon ?? "💡") : ""}
          </div>
        ` : ""}

        ${r ? o`
          <div class="vacuum-row">
            ${this._renderVacuum(e.vacuum_entity, r)}
          </div>
        ` : ""}

        ${i > 0 ? o`
          <div class="dish-row">
            <span class="dish-icon">🍽️</span>
            <div class="dish-track">
              <div class="dish-fill" style="width:${l}%"></div>
            </div>
            <span class="dish-time">${Math.round(i)} min</span>
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderLight(e, t, s) {
    const a = t.state === "on", r = t.attributes.friendly_name ?? e.split(".")[1];
    return o`
      <button class="light-btn" @click=${() => this._toggleLight(e)}>
        <span class="light-icon">${s}</span>
        <span class="light-name">${r}</span>
        <div class="toggle-track ${a ? "on" : ""}">
          <div class="toggle-knob"></div>
        </div>
      </button>
    `;
  }
  _renderVacuum(e, t) {
    const s = t.state, a = Oe[s] ?? s, r = s === "cleaning" || s === "returning" || s === "paused", n = s !== "error" && s !== "returning";
    return o`
      <button class="vacuum-btn ${r ? "active" : ""}"
        @click=${n ? () => this._vacuumAction(e, s) : void 0}
        ?disabled=${!n}>
        <span class="vacuum-icon">🤖</span>
        <span class="vacuum-label">${a}</span>
        ${n ? o`
          <div class="vacuum-action ${r ? "stop" : "start"}">${r ? "⏹" : "▶"}</div>
        ` : ""}
      </button>
    `;
  }
};
S.styles = [w, et, y`
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
      height: 52px;
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
      height: 52px;
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
R([
  u({ attribute: !1 })
], S.prototype, "hass", 2);
R([
  u({ attribute: !1 })
], S.prototype, "config", 2);
R([
  u({ type: Boolean })
], S.prototype, "dark", 2);
R([
  b()
], S.prototype, "_calEvents", 2);
R([
  b()
], S.prototype, "_dishMax", 2);
S = R([
  x("nspanel-page-home")
], S);
var Me = Object.defineProperty, Te = Object.getOwnPropertyDescriptor, vt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Te(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Me(t, s, r), r;
};
let I = class extends m {
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
    const s = t.attributes.current_temperature, a = t.attributes.temperature, r = t.state, n = r === "heat";
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
            <div class="set-val">${a != null ? `${a}°` : "–"}</div>
            <div class="set-label">Zieltemperatur</div>
          </div>
          <button class="btn-round" @click=${() => this._setTemp(0.5)}>+</button>
        </div>

        <div class="mode-row">
          <button class="mode-btn ${r === "off" ? "active-off" : ""}"
            @click=${() => this._setMode("off")}>Aus</button>
          <button class="mode-btn ${n ? "active-heat" : ""}"
            @click=${() => this._setMode("heat")}>Heizen</button>
        </div>
      </div>
    `;
  }
};
I.styles = [w, et, y`
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
], I.prototype, "hass", 2);
vt([
  u({ attribute: !1 })
], I.prototype, "config", 2);
vt([
  u({ type: Boolean })
], I.prototype, "dark", 2);
I = vt([
  x("nspanel-page-climate")
], I);
var De = Object.defineProperty, Ne = Object.getOwnPropertyDescriptor, st = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Ne(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && De(t, s, r), r;
};
const He = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let D = class extends m {
  constructor() {
    super(...arguments), this.dark = !1, this._moving = {}, this._movingFrom = {};
  }
  updated(e) {
    if (!e.has("hass") || !this.hass) return;
    const t = { ...this._moving };
    let s = !1;
    for (const a of Object.keys(t)) {
      const r = this.hass.states[a];
      if (!r) continue;
      const n = t[a], i = r.state, l = r.attributes.current_position, c = this._movingFrom[a];
      (n === "up" ? i === "open" || l === 100 : n === "down" ? i === "closed" || l === 0 : !1) && i !== c && (delete t[a], delete this._movingFrom[a], s = !0);
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
    const e = this.config ?? {}, t = this.hass, s = He.map((n) => e[n]).filter((n) => !!n), a = s.filter((n) => t?.states[n]?.state === "open").length, r = s.filter((n) => t?.states[n]?.state === "closed").length;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="summary-bar">
          <span class="summary-text">
            <span class="summary-open">${a} Offen</span>
            <span class="summary-dot"> · </span>
            <span class="summary-closed">${r} Zu</span>
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
      const c = l.attributes.friendly_name ?? n, h = l.attributes.current_position, p = this._moving[n], d = h != null ? `${h}%` : l.state === "open" ? "Offen" : l.state === "closed" ? "Zu" : "–", v = l.state === "open" ? "st-open" : l.state === "closed" ? "st-closed" : "st-mid";
      return o`
              <div class="cover-card">
                <div class="cover-info">
                  <div class="cover-name-row">
                    <span class="cover-num">${String(i + 1).padStart(2, "0")}</span>
                    <span class="cover-name">${c}</span>
                  </div>
                  <div class="cover-status ${v}">${d}</div>
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
D.styles = [w, et, y`
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

    .cover-name-row {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }

    .cover-num {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      color: var(--nsp-accent);
      background: rgba(100, 210, 255, 0.18);
      padding: 2px 5px;
      border-radius: 4px;
      flex-shrink: 0;
      letter-spacing: 0.02em;
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
st([
  u({ attribute: !1 })
], D.prototype, "hass", 2);
st([
  u({ attribute: !1 })
], D.prototype, "config", 2);
st([
  u({ type: Boolean })
], D.prototype, "dark", 2);
st([
  b()
], D.prototype, "_moving", 2);
D = st([
  x("nspanel-page-blinds")
], D);
var Fe = Object.defineProperty, je = Object.getOwnPropertyDescriptor, at = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? je(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Fe(t, s, r), r;
};
function Lt(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let N = class extends m {
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
    const [a, r] = e.split(".");
    this.hass.callService(a, r, { entity_id: s, ...t });
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
    const a = t.state === "playing", r = t.attributes.media_title ?? "", n = t.attributes.media_artist ?? "", i = t.attributes.entity_picture ?? "";
    t.attributes.volume_level;
    const l = t.attributes.media_duration ?? 0, c = t.attributes.media_position ?? 0, h = t.attributes.media_position_updated_at ?? "";
    let p = c;
    a && h && (p = Math.min(c + (Date.now() - new Date(h).getTime()) / 1e3, l));
    const d = l > 0 ? p / l : 0;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${i ? o`<img class="art" src="${i}" alt="cover" />` : o`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${r || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
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
              <span>${Lt(p)}</span>
              <span>-${Lt(l - p)}</span>
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
            ${a ? o`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : o`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`}
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
N.styles = [w, et, y`
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
at([
  u({ attribute: !1 })
], N.prototype, "hass", 2);
at([
  u({ attribute: !1 })
], N.prototype, "config", 2);
at([
  u({ type: Boolean })
], N.prototype, "dark", 2);
at([
  b()
], N.prototype, "_tick", 2);
N = at([
  x("nspanel-page-media")
], N);
var Be = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, ft = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Le(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Be(t, s, r), r;
};
function bt(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function it(e) {
  return `${e.toFixed(1)} kWh`;
}
let U = class extends m {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, a = e.grid_entity ? t?.states[e.grid_entity] : null, r = e.ev_entity ? t?.states[e.ev_entity] : null, n = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, i = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, l = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, c = s ? parseFloat(s.state) : null, h = a ? parseFloat(a.state) : null, p = r ? parseFloat(r.state) : NaN, d = isNaN(p) ? null : p, v = n ? parseFloat(n.state) : null, g = i ? parseFloat(i.state) : null, $ = l ? parseFloat(l.state) : null, _ = h != null && h < 0, k = c != null && h != null ? c + h : null, A = c != null && k != null && k > 0 ? Math.min(c / k, 1) * 100 : _ ? 100 : null, G = A != null ? Math.max(100 - A, 0) : null, Et = g != null && g > 0 && v != null ? Math.min(v / g, 1) : null, K = h != null ? {
      icon: _ ? "⬆️" : "⬇️",
      label: _ ? "EINSPEISUNG" : "NETZBEZUG",
      val: bt(Math.abs(h)),
      cls: _ ? "col-green" : "col-orange"
    } : null, rt = v != null ? { icon: "☀️", label: "HEUTE", val: it(v) } : d != null ? { icon: "🔋", label: "AKKU", val: `${Math.round(d)}%` } : null;
    return o`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <!-- Hero card: PV production -->
        <div class="hero-card">
          <div class="hero-top">
            <div>
              <div class="hero-label">PV-ERZEUGUNG</div>
              <div class="hero-value">${c != null ? bt(c) : "–"}</div>
            </div>
            <div class="hero-icon">☀️</div>
          </div>

          ${A != null ? o`
            <div class="flow-bar">
              <div class="flow-solar" style="width:${A}%"></div>
              <div class="flow-grid"  style="width:${G}%"></div>
            </div>
            <div class="flow-labels">
              <span>Solar → Haus</span>
              <span>${Math.round(A)}% autark</span>
            </div>
          ` : ""}
        </div>

        <!-- Bottom stat cards -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon">🏠</div>
            <div class="stat-label">VERBRAUCH</div>
            <div class="stat-value">${k != null ? bt(Math.abs(k)) : "–"}</div>
          </div>
          ${K ? o`
            <div class="stat-card">
              <div class="stat-icon">${K.icon}</div>
              <div class="stat-label">${K.label}</div>
              <div class="stat-value ${K.cls}">${K.val}</div>
            </div>
          ` : ""}
          ${rt ? o`
            <div class="stat-card">
              <div class="stat-icon">${rt.icon}</div>
              <div class="stat-label">${rt.label}</div>
              <div class="stat-value">${rt.val}</div>
            </div>
          ` : ""}
        </div>

        <!-- Forecast row (optional) -->
        ${g != null || $ != null ? o`
          <div class="forecast-row">
            ${g != null ? o`
              <div class="fc-card">
                <div class="fc-label">Prognose Heute</div>
                <div class="fc-val">${it(g)}</div>
                ${Et != null ? o`
                  <div class="fc-track"><div class="fc-fill" style="width:${Et * 100}%"></div></div>
                  <div class="fc-sub">${v != null ? it(v) : ""} erreicht</div>
                ` : ""}
              </div>
            ` : ""}
            ${$ != null ? o`
              <div class="fc-card">
                <div class="fc-label">Prognose Morgen</div>
                <div class="fc-val">${it($)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}

        <!-- EV row if configured alongside pvToday (not already shown in stat2) -->
        ${d != null && v != null ? o`
          <div class="ev-row">
            <span class="ev-label">🔋 ${Math.round(d)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${d}%"></div></div>
          </div>
        ` : ""}
      </div>
    `;
  }
};
U.styles = [w, et, y`
    .page { gap: var(--nsp-s2); }

    /* ── Hero card ── */
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

    .flow-labels {
      display: flex;
      justify-content: space-between;
      font-family: var(--nsp-font);
      font-size: 11px;
      color: var(--nsp-text-3);
      margin-top: -4px;
    }

    /* ── Bottom stats ── */
    .stats-row {
      display: flex;
      gap: var(--nsp-s2);
      flex-shrink: 0;
    }

    .stat-card {
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
      gap: 2px;
    }

    .stat-icon { font-size: 16px; }

    .stat-label {
      font-family: var(--nsp-font);
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--nsp-text-3);
    }

    .stat-value {
      font-family: var(--nsp-font);
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .stat-value.col-green  { color: var(--nsp-green); }
    .stat-value.col-orange { color: var(--nsp-orange); }

    /* ── EV row ── */
    .ev-row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s2);
      flex-shrink: 0;
      padding: 0 2px;
    }
    .ev-label {
      font-family: var(--nsp-font);
      font-size: 12px;
      font-weight: 600;
      color: var(--nsp-text-2);
      white-space: nowrap;
    }
    .ev-track {
      flex: 1;
      height: 4px;
      background: var(--nsp-surface-3);
      border-radius: 2px;
      overflow: hidden;
    }
    .ev-fill {
      height: 100%;
      background: var(--nsp-green);
      border-radius: 2px;
    }

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
  `];
ft([
  u({ attribute: !1 })
], U.prototype, "hass", 2);
ft([
  u({ attribute: !1 })
], U.prototype, "config", 2);
ft([
  u({ type: Boolean })
], U.prototype, "dark", 2);
U = ft([
  x("nspanel-page-energy")
], U);
var Ie = Object.defineProperty, Ue = Object.getOwnPropertyDescriptor, V = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Ue(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ie(t, s, r), r;
};
const Re = ["camera_1", "camera_2", "camera_3", "camera_4"];
let P = class extends m {
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
    const e = this.config ?? {}, t = this.hass, s = !!e.cameras_portrait, a = Re.map((i) => e[i]).filter((i) => !!i);
    if (a.length === 0)
      return o`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const r = `page ${this.dark ? "nsp-dark" : ""} count-${a.length} ${s ? "portrait" : ""}`, n = (i) => {
      const l = t?.states[i];
      return l ? l.attributes.frontend_stream_type ? o`<ha-camera-stream .hass=${t} .stateObj=${l} muted autoPlay></ha-camera-stream>` : o`<img class="cam-img" src="/api/camera_proxy/${i}?token=${l.attributes.access_token}&_=${this._tick}" alt="${l.attributes.friendly_name ?? i}" />` : o`<div class="cam-unavail">Not available</div>`;
    };
    return o`
      <div class="${r}">
        ${a.map((i) => {
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
P.styles = [w, y`
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
V([
  u({ attribute: !1 })
], P.prototype, "hass", 2);
V([
  u({ attribute: !1 })
], P.prototype, "config", 2);
V([
  u({ type: Boolean })
], P.prototype, "dark", 2);
V([
  b()
], P.prototype, "_tick", 2);
V([
  b()
], P.prototype, "_fullscreenCam", 2);
P = V([
  x("nspanel-page-security")
], P);
var Ve = Object.defineProperty, We = Object.getOwnPropertyDescriptor, Ct = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? We(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ve(t, s, r), r;
};
const It = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security"
}, Ut = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" },
  { id: "security" }
], Ge = [
  { name: "weather_entity", label: "Weather", selector: { entity: { domain: "weather" } } },
  { name: "calendar_entity", label: "Calendar", selector: { entity: { domain: "calendar" } } },
  { name: "trash_entity", label: "Trash Collection", selector: { entity: { domain: ["sensor", "calendar"] } } }
], Ke = [
  { name: "person_1", label: "Person 1 — shown as 👦 in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_2", label: "Person 2 — shown as 👧 in status bar", selector: { entity: { domain: "person" } } }
], qe = [
  { name: "garden_light", label: "Light 1", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Light 1 Icon — emoji, default 💡", selector: { text: {} } },
  { name: "light_2", label: "Light 2 (optional)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Light 2 Icon — emoji, default 💡", selector: { text: {} } }
], Ze = [
  { name: "vacuum_entity", label: "Robot Vacuum (optional)", selector: { entity: { domain: "vacuum" } } },
  { name: "dishwasher_entity", label: "Dishwasher (optional) — remaining time sensor in min", selector: { entity: { domain: "sensor" } } }
], Ye = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], Je = [
  { name: "cover_1", label: "Blind 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Blind 2 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Blind 3 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Blind 4 (optional)", selector: { entity: { domain: "cover" } } }
], Qe = [
  { name: "cover_5", label: "Blind 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Blind 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Blind 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Blind 8", selector: { entity: { domain: "cover" } } }
], Xe = [
  { name: "scene_up", label: "Open All — scene or script", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Close All — scene or script", selector: { entity: { domain: ["scene", "script"] } } }
], ts = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } },
  { name: "media_default_source", label: "Default Source (optional) — e.g. Spotify, Bluetooth", selector: { text: {} } }
], es = [
  { name: "pv_entity", label: "Solar Production — sensor in W or kW", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Grid Power — positive = import, negative = export (W or kW)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV Battery (optional) — state of charge sensor in %", selector: { entity: { domain: "sensor" } } }
], ss = [
  { name: "pv_today_entity", label: "Solar Energy Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Solar Forecast Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Solar Forecast Tomorrow — sensor in kWh", selector: { entity: { domain: "sensor" } } }
], as = [
  { name: "camera_1", label: "Camera 1", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Camera 2 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Camera 3 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Camera 4 (optional)", selector: { entity: { domain: "camera" } } }
], rs = [
  { name: "doorbell_trigger", label: "Doorbell Trigger — binary_sensor or input_boolean", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Doorbell Camera (optional)", selector: { entity: { domain: "camera" } } }
], ns = [
  { name: "bg_accent_1", label: "Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)", selector: { text: {} } },
  { name: "bg_accent_2", label: "Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)", selector: { text: {} } }
], is = (e) => e.label ?? e.name;
let pt = class extends m {
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
        .computeLabel=${is} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return o``;
    const e = this._config, t = e.pages ?? ["home"], s = (a) => e[`${a}_label`] ?? "";
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
        ${Ut.map((a) => o`
          <button class="nsp-chip ${t.includes(a.id) ? "active" : ""}"
            @click=${() => this._togglePage(a.id)}>
            ${s(a.id) || It[a.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(Ut.map((a) => ({
      name: `${a.id}_label`,
      label: `${It[a.id]} — custom label`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Weather, calendar events, lights and appliances shown on the Home tab.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(Ge)}
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
      ${this._form(Ke)}

      <div class="nsp-group">Lights</div>
      ${this._form(qe)}

      <div class="nsp-group">Appliances</div>
      ${this._form(Ze)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Control your heating and cooling system.</p>
      ${this._form(Ye)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(Je)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(Qe)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(Xe)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(ts)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(es)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(ss)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(as)}
      <div class="nsp-toggle-row">
        <div>
          <div class="nsp-toggle-label">Portrait Mode (9:16)</div>
          <div class="nsp-toggle-hint">Enable for vertical / doorbell cameras</div>
        </div>
        <ha-switch
          ?checked=${!!e.cameras_portrait}
          @change=${(a) => this._setPortrait(a.target.checked)}
        ></ha-switch>
      </div>

      <!-- ── Doorbell ── -->
      <div class="nsp-sec">Doorbell</div>
      <p class="nsp-desc">Shows a live camera popup when someone rings the bell.</p>
      ${this._form(rs)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(ns)}
    `;
  }
};
Ct([
  u({ attribute: !1 })
], pt.prototype, "hass", 2);
Ct([
  b()
], pt.prototype, "_config", 2);
pt = Ct([
  x("nspanel-dashboard-editor")
], pt);
var os = Object.defineProperty, ls = Object.getOwnPropertyDescriptor, W = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? ls(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && os(t, s, r), r;
};
let z = class extends m {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._dark = !1;
  }
  _glowVar(e, t) {
    if (!e) return "";
    const s = e.replace("#", "");
    if (s.length !== 6) return "";
    const a = parseInt(s.slice(0, 2), 16), r = parseInt(s.slice(2, 4), 16), n = parseInt(s.slice(4, 6), 16);
    return `rgba(${a},${r},${n},${t})`;
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
    const e = this._dark, t = e ? 0.18 : 0.09, s = this._glowVar(this._config.bg_accent_1, t), a = this._glowVar(this._config.bg_accent_2, t), r = [s ? `--nsp-glow-1:${s}` : "", a ? `--nsp-glow-2:${a}` : ""].filter(Boolean).join(";");
    return o`
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
z.styles = [w, y`
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
W([
  u({ attribute: !1 })
], z.prototype, "hass", 2);
W([
  b()
], z.prototype, "_config", 2);
W([
  b()
], z.prototype, "_activePage", 2);
W([
  b()
], z.prototype, "_doorbellActive", 2);
W([
  b()
], z.prototype, "_dark", 2);
z = W([
  x("nspanel-dashboard")
], z);
export {
  z as NspanelDashboard
};
