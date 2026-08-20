/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = globalThis, ae = Bt.ShadowRoot && (Bt.ShadyCSS === void 0 || Bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, oe = Symbol(), ye = /* @__PURE__ */ new WeakMap();
let Ue = class {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== oe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (ae && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = ye.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && ye.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ds = (e) => new Ue(typeof e == "string" ? e : e + "", void 0, oe), M = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, s, i) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[i + 1], e[0]);
  return new Ue(n, e, oe);
}, ps = (e, t) => {
  if (ae) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const r = document.createElement("style"), s = Bt.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = n.cssText, e.appendChild(r);
  }
}, we = ae ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules) n += r.cssText;
  return ds(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: hs, defineProperty: us, getOwnPropertyDescriptor: fs, getOwnPropertyNames: gs, getOwnPropertySymbols: vs, getPrototypeOf: ms } = Object, Rt = globalThis, xe = Rt.trustedTypes, bs = xe ? xe.emptyScript : "", _s = Rt.reactiveElementPolyfillSupport, gt = (e, t) => e, Nt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? bs : null;
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
} }, le = (e, t) => !hs(e, t), $e = { attribute: !0, type: String, converter: Nt, reflect: !1, useDefault: !1, hasChanged: le };
Symbol.metadata ??= Symbol("metadata"), Rt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let X = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = $e) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(t, r, n);
      s !== void 0 && us(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    const { get: s, set: i } = fs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(gt("elementProperties"))) return;
    const t = ms(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(gt("properties"))) {
      const n = this.properties, r = [...gs(n), ...vs(n)];
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
      for (const s of r) n.unshift(we(s));
    } else t !== void 0 && n.push(we(t));
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
    return ps(t, this.constructor.elementStyles), t;
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
      const i = (r.converter?.toAttribute !== void 0 ? r.converter : Nt).toAttribute(n, r.type);
      this._$Em = t, i == null ? this.removeAttribute(s) : this.setAttribute(s, i), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const r = this.constructor, s = r._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const i = r.getPropertyOptions(s), a = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : Nt;
      this._$Em = s;
      const o = a.fromAttribute(n, i.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, n, r, s = !1, i) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (i = this[t]), r ??= a.getPropertyOptions(t), !((r.hasChanged ?? le)(i, n) || r.useDefault && r.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, r)))) return;
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
X.elementStyles = [], X.shadowRootOptions = { mode: "open" }, X[gt("elementProperties")] = /* @__PURE__ */ new Map(), X[gt("finalized")] = /* @__PURE__ */ new Map(), _s?.({ ReactiveElement: X }), (Rt.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis, Ee = (e) => e, zt = ce.trustedTypes, Ce = zt ? zt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, je = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, He = "?" + U, ys = `<${He}>`, J = document, mt = () => J.createComment(""), bt = (e) => e === null || typeof e != "object" && typeof e != "function", de = Array.isArray, ws = (e) => de(e) || typeof e?.[Symbol.iterator] == "function", Jt = `[ 	
\f\r]`, ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ke = /-->/g, Ae = />/g, Y = RegExp(`>|${Jt}(?:([^\\s"'>=/]+)(${Jt}*=${Jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Pe = /"/g, Ve = /^(?:script|style|textarea|title)$/i, xs = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), c = xs(1), tt = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), Me = /* @__PURE__ */ new WeakMap(), q = J.createTreeWalker(J, 129);
function Ke(e, t) {
  if (!de(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ce !== void 0 ? Ce.createHTML(t) : t;
}
const $s = (e, t) => {
  const n = e.length - 1, r = [];
  let s, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ut;
  for (let o = 0; o < n; o++) {
    const l = e[o];
    let p, d, f = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, d = a.exec(l), d !== null); ) u = a.lastIndex, a === ut ? d[1] === "!--" ? a = ke : d[1] !== void 0 ? a = Ae : d[2] !== void 0 ? (Ve.test(d[2]) && (s = RegExp("</" + d[2], "g")), a = Y) : d[3] !== void 0 && (a = Y) : a === Y ? d[0] === ">" ? (a = s ?? ut, f = -1) : d[1] === void 0 ? f = -2 : (f = a.lastIndex - d[2].length, p = d[1], a = d[3] === void 0 ? Y : d[3] === '"' ? Pe : Se) : a === Pe || a === Se ? a = Y : a === ke || a === Ae ? a = ut : (a = Y, s = void 0);
    const h = a === Y && e[o + 1].startsWith("/>") ? " " : "";
    i += a === ut ? l + ys : f >= 0 ? (r.push(p), l.slice(0, f) + je + l.slice(f) + U + h) : l + U + (f === -2 ? o : h);
  }
  return [Ke(e, i + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class _t {
  constructor({ strings: t, _$litType$: n }, r) {
    let s;
    this.parts = [];
    let i = 0, a = 0;
    const o = t.length - 1, l = this.parts, [p, d] = $s(t, n);
    if (this.el = _t.createElement(p, r), q.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (s = q.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const f of s.getAttributeNames()) if (f.endsWith(je)) {
          const u = d[a++], h = s.getAttribute(f).split(U), g = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: i, name: g[2], strings: h, ctor: g[1] === "." ? Cs : g[1] === "?" ? ks : g[1] === "@" ? As : Ft }), s.removeAttribute(f);
        } else f.startsWith(U) && (l.push({ type: 6, index: i }), s.removeAttribute(f));
        if (Ve.test(s.tagName)) {
          const f = s.textContent.split(U), u = f.length - 1;
          if (u > 0) {
            s.textContent = zt ? zt.emptyScript : "";
            for (let h = 0; h < u; h++) s.append(f[h], mt()), q.nextNode(), l.push({ type: 2, index: ++i });
            s.append(f[u], mt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === He) l.push({ type: 2, index: i });
      else {
        let f = -1;
        for (; (f = s.data.indexOf(U, f + 1)) !== -1; ) l.push({ type: 7, index: i }), f += U.length - 1;
      }
      i++;
    }
  }
  static createElement(t, n) {
    const r = J.createElement("template");
    return r.innerHTML = t, r;
  }
}
function et(e, t, n = e, r) {
  if (t === tt) return t;
  let s = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const i = bt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== i && (s?._$AO?.(!1), i === void 0 ? s = void 0 : (s = new i(e), s._$AT(e, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = s : n._$Cl = s), s !== void 0 && (t = et(e, s._$AS(e, t.values), s, r)), t;
}
class Es {
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
    const { el: { content: n }, parts: r } = this._$AD, s = (t?.creationScope ?? J).importNode(n, !0);
    q.currentNode = s;
    let i = q.nextNode(), a = 0, o = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new $t(i, i.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (p = new Ss(i, this, t)), this._$AV.push(p), l = r[++o];
      }
      a !== l?.index && (i = q.nextNode(), a++);
    }
    return q.currentNode = J, s;
  }
  p(t) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
}
class $t {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, r, s) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = et(this, t, n), bt(t) ? t === S || t == null || t === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : t !== this._$AH && t !== tt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ws(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== S && bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(J.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: r } = t, s = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = _t.createElement(Ke(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(n);
    else {
      const i = new Es(s, this), a = i.u(this.options);
      i.p(n), this.T(a), this._$AH = i;
    }
  }
  _$AC(t) {
    let n = Me.get(t.strings);
    return n === void 0 && Me.set(t.strings, n = new _t(t)), n;
  }
  k(t) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, s = 0;
    for (const i of t) s === n.length ? n.push(r = new $t(this.O(mt()), this.O(mt()), this, this.options)) : r = n[s], r._$AI(i), s++;
    s < n.length && (this._$AR(r && r._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const r = Ee(t).nextSibling;
      Ee(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ft {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, r, s, i) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = S;
  }
  _$AI(t, n = this, r, s) {
    const i = this.strings;
    let a = !1;
    if (i === void 0) t = et(this, t, n, 0), a = !bt(t) || t !== this._$AH && t !== tt, a && (this._$AH = t);
    else {
      const o = t;
      let l, p;
      for (t = i[0], l = 0; l < i.length - 1; l++) p = et(this, o[r + l], n, l), p === tt && (p = this._$AH[l]), a ||= !bt(p) || p !== this._$AH[l], p === S ? t = S : t !== S && (t += (p ?? "") + i[l + 1]), this._$AH[l] = p;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Cs extends Ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === S ? void 0 : t;
  }
}
class ks extends Ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== S);
  }
}
class As extends Ft {
  constructor(t, n, r, s, i) {
    super(t, n, r, s, i), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = et(this, t, n, 0) ?? S) === tt) return;
    const r = this._$AH, s = t === S && r !== S || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, i = t !== S && (r === S || s);
    s && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ss {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    et(this, t);
  }
}
const Ps = ce.litHtmlPolyfillSupport;
Ps?.(_t, $t), (ce.litHtmlVersions ??= []).push("3.3.3");
const Ms = (e, t, n) => {
  const r = n?.renderBefore ?? t;
  let s = r._$litPart$;
  if (s === void 0) {
    const i = n?.renderBefore ?? null;
    r._$litPart$ = s = new $t(t.insertBefore(mt(), i), i, void 0, n ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis;
class P extends X {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ms(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return tt;
  }
}
P._$litElement$ = !0, P.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: P });
const Ts = pe.litElementPolyfillSupport;
Ts?.({ LitElement: P });
(pe.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const B = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bs = { attribute: !0, type: String, converter: Nt, reflect: !1, hasChanged: le }, Ns = (e = Bs, t, n) => {
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
function w(e) {
  return (t, n) => typeof n == "object" ? Ns(e, t, n) : ((r, s, i) => {
    const a = s.hasOwnProperty(i);
    return s.constructor.createProperty(i, r), a ? Object.getOwnPropertyDescriptor(s, i) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(e) {
  return w({ ...e, state: !0, attribute: !1 });
}
const N = M`
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
`, ct = M`
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
var zs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, Ut = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Is(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && zs(t, n, s), s;
};
const Ds = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  climate: "M12 2a7 7 0 0 0-7 7c0 2.62 1.44 4.9 3.57 6.12L9 22h6l.43-6.88A7 7 0 0 0 19 9a7 7 0 0 0-7-7zm0 2a5 5 0 0 1 5 5 5 5 0 0 1-3 4.52V18h-4v-4.48A5 5 0 0 1 7 9a5 5 0 0 1 5-5z",
  blinds: "M20 3H4v2h16V3zm0 4H4v2h16V7zm0 4H4v2h16v-2zm0 4H4v2h16v-2zm0 4H4v2h16v-2z",
  media: "M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z",
  energy: "M7 2v11h3v9l7-12h-4l4-8z",
  security: "M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",
  wifi: "M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4 2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
}, Te = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security",
  wifi: "WiFi"
};
let st = class extends P {
  constructor() {
    super(...arguments), this.pages = [], this.activePage = "home", this.customLabels = {};
  }
  _tap(e) {
    this.dispatchEvent(new CustomEvent("page-change", { detail: { page: e }, bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
      <nav>
        ${this.pages.map((e) => c`
          <button
            class=${e === this.activePage ? "active" : ""}
            @click=${() => this._tap(e)}
            aria-label=${Te[e]}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d=${Ds[e]} />
            </svg>
            <span>${this.customLabels[e] ?? Te[e]}</span>
          </button>
        `)}
      </nav>
    `;
  }
};
st.styles = [N, M`
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
Ut([
  w({ type: Array })
], st.prototype, "pages", 2);
Ut([
  w({ type: String })
], st.prototype, "activePage", 2);
Ut([
  w({ attribute: !1 })
], st.prototype, "customLabels", 2);
st = Ut([
  B("nspanel-bottom-nav")
], st);
const We = [
  { key: "person_1", iconKey: "person_1_icon", icon: "👩🏻" },
  { key: "person_2", iconKey: "person_2_icon", icon: "👨🏻" },
  { key: "person_3", iconKey: "person_3_icon", icon: "👵🏻" },
  { key: "person_4", iconKey: "person_4_icon", icon: "👴🏻" },
  { key: "person_5", iconKey: "person_5_icon", icon: "🧒🏻" },
  { key: "person_6", iconKey: "person_6_icon", icon: "🧒🏻" }
];
var Ls = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, K = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Os(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ls(t, n, s), s;
};
const Rs = {
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
}, Fs = `papier,altpapier=🔴
gelb,gelber sack=🟡
rest,sperrmüll,sperr=⚫
bio,bioabfall=🟤
glas=🟢`;
function Us(e) {
  return e.trim().split(`
`).map((t) => t.trim()).filter((t) => t && t.includes("=")).map((t) => {
    const n = t.lastIndexOf("="), r = t.slice(0, n).split(",").map((i) => i.trim().toLowerCase()).filter(Boolean), s = t.slice(n + 1).trim() || "🗑️";
    return { keywords: r, icon: s };
  });
}
function ft(e, t) {
  const n = Us(t ?? Fs), r = e.toLowerCase();
  for (const s of n)
    if (s.keywords.some((i) => r.includes(i))) return s.icon;
  return "🗑️";
}
function Pt(e) {
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
let L = class extends P {
  constructor() {
    super(...arguments), this.dark = !1, this._time = "", this._date = "", this._trashChip = null, this._trashEvents = [], this._trashFetched = !1;
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
    const e = this.config ?? {}, t = this.hass, n = We.map(
      ({ key: r, iconKey: s, icon: i }) => e[r] && t?.states[e[r]]?.state === "home" ? e[s] || i : ""
    ).filter(Boolean).join("");
    return n ? c`<span class="chip" @click=${this._openPresence}>${n}</span>` : "";
  }
  _openPresence() {
    this.dispatchEvent(new CustomEvent("presence-tap", { bubbles: !0, composed: !0 }));
  }
  _openTrash() {
    this.dispatchEvent(new CustomEvent("trash-tap", {
      detail: { events: this._trashEvents },
      bubbles: !0,
      composed: !0
    }));
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
        const p = await l.json();
        if (p.length > 0) {
          const d = /* @__PURE__ */ new Map();
          for (const x of p) {
            const m = x.start.date ?? x.start.dateTime ?? "", _ = new Date(m);
            if (isNaN(_.getTime())) continue;
            _.setHours(0, 0, 0, 0);
            const v = _.toISOString();
            d.has(v) || d.set(v, []), d.get(v).push(x.summary);
          }
          const f = this.config?.trash_mapping, u = [...d.entries()].sort((x, m) => x[0].localeCompare(m[0]));
          this._trashEvents = u.map(([x, m]) => ({
            label: Pt(new Date(x)),
            icons: [...new Set(m.map((_) => ft(_, f)))].join("")
          }));
          const [h, g] = u[0], y = [...new Set(g.map((x) => ft(x, f)))].join("");
          this._trashChip = `${y} ${Pt(new Date(h))}`;
          return;
        }
        this._trashChip = null, this._trashEvents = [];
        return;
      }
    } catch {
    }
    const t = this.hass.states[e];
    if (!t) return;
    const n = this.config?.trash_mapping;
    if (t.state === "on") {
      const a = t.attributes.message, o = a ? ft(a, n) : "🗑️";
      this._trashChip = `${o} Heute`, this._trashEvents = [{ label: "Heute", icons: o }];
      return;
    }
    if (["off", "unavailable", "unknown", "none", ""].includes(t.state.toLowerCase())) {
      const a = t.attributes.start_time, o = t.attributes.message;
      if (a) {
        const l = new Date(a);
        if (!isNaN(l.getTime())) {
          const p = o ? ft(o, n) : "🗑️", d = Pt(l);
          this._trashChip = `${p} ${d}`, this._trashEvents = [{ label: d, icons: p }];
          return;
        }
      }
      this._trashChip = null, this._trashEvents = [];
      return;
    }
    const s = parseInt(t.state, 10);
    if (!isNaN(s) && String(s) === t.state.trim()) {
      const a = t.attributes.message, o = a ? ft(a, n) : "🗑️", l = s === 0 ? "Heute" : s === 1 ? "Morgen" : `+${s}d`;
      this._trashChip = `${o} ${l}`, this._trashEvents = [{ label: l, icons: o }];
      return;
    }
    const i = new Date(t.state);
    if (!isNaN(i.getTime())) {
      const a = Pt(i);
      this._trashChip = `🗑️ ${a}`, this._trashEvents = [{ label: a, icons: "🗑️" }];
    }
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = e.weather_entity ? t?.states[e.weather_entity] : null, r = n?.attributes.temperature, s = n ? Rs[n.state] ?? "🌡️" : null;
    return c`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">${this._presenceChip()}</div>
        <div class="center">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${s ? c`<span class="chip">${s}${r != null ? ` ${Math.round(r)}°` : ""}</span>` : ""}
          ${this._trashChip ? c`<span class="chip" @click=${this._openTrash}>${this._trashChip}</span>` : ""}
        </div>
      </div>
    `;
  }
};
L.styles = [N, M`
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
      cursor: pointer;
    }
  `];
K([
  w({ attribute: !1 })
], L.prototype, "hass", 2);
K([
  w({ attribute: !1 })
], L.prototype, "config", 2);
K([
  w({ type: Boolean })
], L.prototype, "dark", 2);
K([
  A()
], L.prototype, "_time", 2);
K([
  A()
], L.prototype, "_date", 2);
K([
  A()
], L.prototype, "_trashChip", 2);
K([
  A()
], L.prototype, "_trashEvents", 2);
L = K([
  B("nspanel-status-bar")
], L);
var js = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, he = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Hs(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && js(t, n, s), s;
};
let yt = class extends P {
  constructor() {
    super(...arguments), this.cameraEntity = "";
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
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

          ${this.cameraEntity ? c`
            <div class="stream">
              <ha-camera-stream
                .hass=${this.hass}
                .stateObj=${this.hass.states[this.cameraEntity]}
                muted
                autoPlay
              ></ha-camera-stream>
            </div>
          ` : c`
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
yt.styles = [N, M`
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
he([
  w({ attribute: !1 })
], yt.prototype, "hass", 2);
he([
  w({ type: String })
], yt.prototype, "cameraEntity", 2);
yt = he([
  B("nspanel-doorbell-popup")
], yt);
var Vs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, ue = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Ks(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Vs(t, n, s), s;
};
let wt = class extends P {
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  _formatSince(e) {
    const t = new Date(e), n = /* @__PURE__ */ new Date(), r = t.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
    return t.toDateString() === n.toDateString() ? r : `${t.toLocaleDateString("de-AT", { day: "2-digit", month: "2-digit" })}, ${r}`;
  }
  get _people() {
    const e = this.config ?? {}, t = this.hass;
    return We.map(({ key: n, iconKey: r, icon: s }) => {
      const i = e[n], a = i ? t?.states[i] : void 0;
      if (!i || !a) return null;
      const o = a.state === "home", l = a.attributes.friendly_name ?? i.split(".")[1], p = this._formatSince(a.last_changed);
      return { icon: e[r] || s, name: l, since: p, home: o };
    }).filter((n) => n !== null).sort((n, r) => Number(r.home) - Number(n.home));
  }
  render() {
    const e = this._people;
    return c`
      <div class="overlay" @click=${this._dismiss}>
        <div class="popup" @click=${(t) => t.stopPropagation()}>
          <div class="header">
            <span class="title">Anwesenheit</span>
          </div>

          <div class="list">
            ${e.map((t) => c`
              <div class="row ${t.home ? "" : "away"}">
                <span class="icon">${t.icon}</span>
                <span class="name">${t.name}</span>
                <span class="since">${t.home ? "seit" : "abwesend seit"} ${t.since}</span>
              </div>
            `)}
          </div>

          <button class="dismiss" @click=${this._dismiss}>Schließen</button>
        </div>
      </div>
    `;
  }
};
wt.styles = [N, M`
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
      width: 300px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }

    .header {
      padding: var(--nsp-s4) var(--nsp-s5) var(--nsp-s2);
    }

    .title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .list {
      display: flex;
      flex-direction: column;
      padding: 0 var(--nsp-s5);
      gap: var(--nsp-s3);
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .icon { font-size: 20px; flex-shrink: 0; }
    .row.away .icon { opacity: 0.4; }
    .row.away .name { color: var(--nsp-text-3); }
    .name {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
    }
    .since {
      font-family: var(--nsp-font);
      font-size: 12px;
      color: var(--nsp-text-3);
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
  w({ attribute: !1 })
], wt.prototype, "hass", 2);
ue([
  w({ attribute: !1 })
], wt.prototype, "config", 2);
wt = ue([
  B("nspanel-presence-popup")
], wt);
var Ws = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, Ye = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Ys(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Ws(t, n, s), s;
};
let It = class extends P {
  constructor() {
    super(...arguments), this.events = [];
  }
  _dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss", { bubbles: !0, composed: !0 }));
  }
  render() {
    return c`
      <div class="overlay" @click=${this._dismiss}>
        <div class="popup" @click=${(e) => e.stopPropagation()}>
          <div class="header">
            <span class="title">Müllabholung</span>
          </div>

          <div class="list">
            ${this.events.length > 0 ? this.events.map((e) => c`
              <div class="row">
                <span class="icons">${e.icons}</span>
                <span class="label">${e.label}</span>
              </div>
            `) : c`<div class="empty">Keine Termine bekannt</div>`}
          </div>

          <button class="dismiss" @click=${this._dismiss}>Schließen</button>
        </div>
      </div>
    `;
  }
};
It.styles = [N, M`
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
      width: 300px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4);
    }

    .header {
      padding: var(--nsp-s4) var(--nsp-s5) var(--nsp-s2);
    }

    .title {
      font-family: var(--nsp-font);
      font-size: 17px;
      font-weight: 600;
      color: var(--nsp-text-1);
    }

    .list {
      display: flex;
      flex-direction: column;
      padding: 0 var(--nsp-s5);
      gap: var(--nsp-s3);
      max-height: 280px;
      overflow-y: auto;
    }

    .row {
      display: flex;
      align-items: center;
      gap: var(--nsp-s3);
    }

    .icons {
      font-size: 18px;
      flex-shrink: 0;
      width: 44px;
    }
    .label {
      flex: 1;
      font-family: var(--nsp-font);
      font-size: 14px;
      font-weight: 500;
      color: var(--nsp-text-1);
    }

    .empty {
      font-family: var(--nsp-font);
      font-size: 13px;
      color: var(--nsp-text-3);
      padding: var(--nsp-s2) 0;
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
Ye([
  w({ attribute: !1 })
], It.prototype, "events", 2);
It = Ye([
  B("nspanel-trash-popup")
], It);
var qs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, dt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? Js(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && qs(t, n, s), s;
};
function Be(e) {
  const t = new Date(e).getTime();
  return isNaN(t) ? 0 : Math.max(0, (t - Date.now()) / 6e4);
}
function Gs(e) {
  return e.start.date ? "Ganztag" : new Date(e.start.dateTime).toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
}
const Qs = {
  cleaning: "Saugt",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  idle: "Bereit",
  error: "Fehler"
}, Zs = {
  mowing: "Mäht",
  returning: "Kehrt zurück",
  paused: "Pausiert",
  docked: "Angedockt",
  error: "Fehler"
};
let H = class extends P {
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
        const n = Be(this.hass.states[t]?.state ?? "");
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
  _lawnMowerAction(e, t) {
    const n = t === "mowing" || t === "returning" || t === "paused" ? "dock" : "start_mowing";
    this.hass.callService("lawn_mower", n, { entity_id: e });
  }
  _formatDishTime(e) {
    const t = Math.round(e), n = Math.floor(t / 60), r = t % 60;
    return n > 0 ? `${n}h ${r}min` : `${r} min`;
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
    const e = this.config ?? {}, t = this.hass, n = e.garden_light ? t?.states[e.garden_light] : null, r = e.light_2 ? t?.states[e.light_2] : null, s = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, i = e.lawn_mower_entity ? t?.states[e.lawn_mower_entity] : null, a = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, o = a ? Be(a.state) : 0, l = e.dishwasher_program_entity ? t?.states[e.dishwasher_program_entity] : void 0, p = l ? t?.formatEntityState?.(l) ?? l.state : void 0, d = o > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - o / this._dishMax) * 100, 100))) : 0, f = e.indoor_temp_entity ? t?.states[e.indoor_temp_entity] : null, u = e.thermostat_entity ? t?.states[e.thermostat_entity] : null, h = f ? parseFloat(f.state) : u ? u.attributes.current_temperature ?? null : null, g = u ? u.attributes.temperature ?? null : null, y = h != null || g != null, x = e.ev_entity ? t?.states[e.ev_entity] : null, m = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, _ = x ? parseFloat(x.state) : NaN, v = isNaN(_) ? null : _, b = m ? parseFloat(m.state) : NaN, $ = isNaN(b) ? null : Math.round(b), E = /* @__PURE__ */ new Date(), C = this._calEvents.filter((k) => k.start.date ? !0 : (k.end.dateTime ? new Date(k.end.dateTime) : new Date(k.start.dateTime)) > E);
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <div class="main-grid">

          <!-- Left: Calendar -->
          <div class="cal-card">
            <div class="cal-header">Heute</div>
            <div class="cal-list">
              ${C.length > 0 ? C.map((k) => c`
                  <div class="cal-event">
                    <div class="cal-dot"></div>
                    <div class="cal-body">
                      <div class="cal-title">${k.summary}</div>
                      <div class="cal-time">${Gs(k)}</div>
                    </div>
                  </div>
                `) : c`<div class="cal-empty">Keine weiteren Termine</div>`}
            </div>
          </div>

          <!-- Right: Controls -->
          <div class="controls-col">

            <!-- Temperature + threshold -->
            ${y ? c`
              <div class="temp-card">
                ${h != null ? c`
                  <div class="temp-current">${(Math.round(h * 10) / 10).toFixed(1)}°</div>
                ` : ""}
                ${g != null ? c`
                  ${h != null ? c`<div class="temp-divider"></div>` : ""}
                  <div class="temp-stepper">
                    <button class="step-btn" @click=${() => this._adjustTemp(-0.5)}>−</button>
                    <span class="step-val">${g.toFixed(1)}°</span>
                    <button class="step-btn" @click=${() => this._adjustTemp(0.5)}>+</button>
                  </div>
                  <div class="temp-hint">Heizgrenze</div>
                ` : ""}
              </div>
            ` : ""}

            ${n ? this._renderLight(e.garden_light, n, e.garden_light_icon ?? "💡") : ""}
            ${r ? this._renderLight(e.light_2, r, e.light_2_icon ?? "💡") : ""}

            ${s ? c`
              <button class="ctrl-btn vac-btn ${s.state === "cleaning" ? "active" : ""}"
                @click=${() => this._vacuumAction(e.vacuum_entity, s.state)}>
                <span class="ctrl-icon">🤖</span>
                <span class="ctrl-name">${Qs[s.state] ?? s.state}</span>
                ${s.state !== "error" && s.state !== "returning" ? c`
                  <div class="vac-action ${s.state === "cleaning" || s.state === "paused" ? "stop" : "start"}">
                    ${s.state === "cleaning" || s.state === "paused" ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 6h12v12H6z"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>`}
                  </div>
                ` : ""}
              </button>
            ` : ""}

            ${i ? c`
              <button class="ctrl-btn mow-btn ${i.state === "mowing" ? "active" : ""}"
                @click=${() => this._lawnMowerAction(e.lawn_mower_entity, i.state)}>
                <span class="ctrl-icon">🌱</span>
                <span class="ctrl-name">${Zs[i.state] ?? i.state}</span>
                ${i.state !== "error" && i.state !== "returning" ? c`
                  <div class="vac-action ${i.state === "mowing" || i.state === "paused" ? "stop" : "start"}">
                    ${i.state === "mowing" || i.state === "paused" ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 6h12v12H6z"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 5v14l11-7z"/></svg>`}
                  </div>
                ` : ""}
              </button>
            ` : ""}

            ${o > 0 ? c`
              <div class="ctrl-btn dish-btn">
                <span class="ctrl-icon">🍽️</span>
                ${p ? c`<span class="ctrl-name">${p}</span>` : ""}
                <div class="dish-track ${p ? "narrow" : ""}">
                  <div class="dish-fill" style="width:${d}%"></div>
                </div>
                <span class="dish-time">${this._formatDishTime(o)}</span>
              </div>
            ` : ""}

          </div>
        </div>

        <!-- EV bar: full width, only when connected -->
        ${v != null ? c`
          <div class="ev-bar">
            <span class="ev-label">🚗 ${Math.round(v)}%</span>
            <div class="ev-track"><div class="ev-fill" style="width:${v}%"></div></div>
            ${$ != null ? c`<span class="ev-km">${$} km</span>` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
  _renderLight(e, t, n) {
    const r = t.state === "on", s = t.attributes.friendly_name ?? e.split(".")[1];
    return c`
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
H.styles = [N, ct, M`
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
      gap: 6px;
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
      padding: 6px var(--nsp-s3) 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0px;
      flex-shrink: 0;
    }
    .temp-current {
      font-family: var(--nsp-font);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--nsp-text-1);
      line-height: 1.1;
    }
    .temp-divider {
      width: 100%;
      height: 1px;
      background: var(--nsp-surface-3);
      margin: 3px 0 2px;
    }
    .temp-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 4px;
    }
    .step-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: var(--nsp-surface-3);
      font-family: var(--nsp-font);
      font-size: 15px;
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
      font-size: 14px;
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
    }

    /* ── Generic control button ── */
    .ctrl-btn {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
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

    .vac-btn.active, .mow-btn.active {
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
    .dish-track.narrow { flex: none; width: 50px; }
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
dt([
  w({ attribute: !1 })
], H.prototype, "hass", 2);
dt([
  w({ attribute: !1 })
], H.prototype, "config", 2);
dt([
  w({ type: Boolean })
], H.prototype, "dark", 2);
dt([
  A()
], H.prototype, "_calEvents", 2);
dt([
  A()
], H.prototype, "_dishMax", 2);
H = dt([
  B("nspanel-page-home")
], H);
var Xs = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, jt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? tn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && Xs(t, n, s), s;
};
let nt = class extends P {
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
    if (!t) return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Thermostat konfiguriert</div></div>
    `;
    const n = t.attributes.friendly_name, r = t.attributes.current_temperature, s = t.attributes.temperature, i = t.state, a = i === "heat", o = a && r != null && s != null && r < s - 0.3, l = a && r != null && s != null && Math.abs(r - s) <= 0.3;
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <div class="circle-wrap">
          <div class="temp-circle ${a ? "heating" : ""}">
            <div class="cur-temp">${r != null ? `${r.toFixed(1)}°` : "–"}</div>
            <div class="cur-label">${n ?? "aktuell"}</div>
            ${o ? c`<div class="heat-status heating-active">heizt…</div>` : l ? c`<div class="heat-status heating-done">✓ erreicht</div>` : ""}
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
nt.styles = [N, ct, M`
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
jt([
  w({ attribute: !1 })
], nt.prototype, "hass", 2);
jt([
  w({ attribute: !1 })
], nt.prototype, "config", 2);
jt([
  w({ type: Boolean })
], nt.prototype, "dark", 2);
nt = jt([
  B("nspanel-page-climate")
], nt);
var en = Object.defineProperty, sn = Object.getOwnPropertyDescriptor, Et = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? sn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && en(t, n, s), s;
};
const nn = ["cover_1", "cover_2", "cover_3", "cover_4", "cover_5", "cover_6", "cover_7", "cover_8"];
let G = class extends P {
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
    const e = this.config ?? {}, t = this.hass, n = nn.map((i) => e[i]).filter((i) => !!i), r = n.filter((i) => t?.states[i]?.state === "open").length, s = n.filter((i) => t?.states[i]?.state === "closed").length;
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="summary-bar">
          <span class="summary-text">
            <span class="summary-open">${r} Offen</span>
            <span class="summary-dot"> · </span>
            <span class="summary-closed">${s} Zu</span>
          </span>
          <div class="summary-actions">
            ${e.scene_up ? c`<button class="pill-btn" @click=${() => this._scene(e.scene_up)}>↑ Alle</button>` : ""}
            ${e.scene_down ? c`<button class="pill-btn" @click=${() => this._scene(e.scene_down)}>↓ Alle</button>` : ""}
          </div>
        </div>

        <div class="covers-grid">
          ${n.map((i, a) => {
      const o = t?.states[i];
      if (!o) return c``;
      const l = o.attributes.friendly_name ?? i, p = o.attributes.current_position, d = this._moving[i], f = p != null ? `${p}%` : o.state === "open" ? "Offen" : o.state === "closed" ? "Zu" : "–", u = o.state === "open" ? "st-open" : o.state === "closed" ? "st-closed" : "st-mid";
      return c`
              <div class="cover-card">
                <div class="cover-info">
                  <div class="cover-name">${l}</div>
                  <div class="cover-bottom">
                    ${p != null ? c`
                      <div class="pos-bar">
                        <div class="pos-shade" style="height:${100 - p}%"></div>
                      </div>
                    ` : ""}
                    <div class="cover-status ${u}">${f}</div>
                  </div>
                </div>
                <div class="cover-btns">
                  <button class="cov-btn ${d === "up" ? "active" : ""}"
                    @click=${() => this._cover(i, d === "up" ? "stop_cover" : "open_cover")}
                    aria-label="${d === "up" ? "Stop" : "Öffnen"}">
                    ${d === "up" ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>`}
                  </button>
                  <button class="cov-btn ${d === "down" ? "active" : ""}"
                    @click=${() => this._cover(i, d === "down" ? "stop_cover" : "close_cover")}
                    aria-label="${d === "down" ? "Stop" : "Schließen"}">
                    ${d === "down" ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 6h12v12H6z"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>`}
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
G.styles = [N, ct, M`
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
Et([
  w({ attribute: !1 })
], G.prototype, "hass", 2);
Et([
  w({ attribute: !1 })
], G.prototype, "config", 2);
Et([
  w({ type: Boolean })
], G.prototype, "dark", 2);
Et([
  A()
], G.prototype, "_moving", 2);
G = Et([
  B("nspanel-page-blinds")
], G);
var rn = Object.defineProperty, an = Object.getOwnPropertyDescriptor, Ct = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? an(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && rn(t, n, s), s;
};
function Ne(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let Q = class extends P {
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
    if (!t) return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">No media player configured</div></div>
    `;
    if (t.state === "off" || t.state === "unavailable" || t.state === "standby") return c`
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
    const o = t.attributes.media_duration ?? 0, l = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let d = l;
    r && p && (d = Math.min(l + (Date.now() - new Date(p).getTime()) / 1e3, o));
    const f = o > 0 ? d / o : 0;
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${a ? c`<img class="art" src="${a}" alt="cover" />` : c`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${s || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${i ? c`<div class="track-artist">${i}</div>` : ""}
        </div>

        ${o > 0 ? c`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${f * 100}%">
                <div class="progress-thumb"></div>
              </div>
            </div>
            <div class="progress-times">
              <span>${Ne(d)}</span>
              <span>-${Ne(o - d)}</span>
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
            ${r ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`}
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
Q.styles = [N, ct, M`
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
Ct([
  w({ attribute: !1 })
], Q.prototype, "hass", 2);
Ct([
  w({ attribute: !1 })
], Q.prototype, "config", 2);
Ct([
  w({ type: Boolean })
], Q.prototype, "dark", 2);
Ct([
  A()
], Q.prototype, "_tick", 2);
Q = Ct([
  B("nspanel-page-media")
], Q);
var on = Object.defineProperty, ln = Object.getOwnPropertyDescriptor, Ht = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? ln(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && on(t, n, s), s;
};
const cn = {
  off: "Aus",
  pv: "Solar",
  minpv: "Min+Solar",
  now: "Schnell",
  fast: "Schnell"
};
function dn(e) {
  return cn[e.toLowerCase()] ?? e;
}
function ze(e) {
  return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${Math.round(e)} W`;
}
function Gt(e) {
  return `${e.toFixed(1)} kWh`;
}
let rt = class extends P {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  _setMode(e) {
    const t = this.config.evcc_mode_entity;
    t && this.hass.callService("select", "select_option", { entity_id: t, option: e });
  }
  render() {
    const e = this.config ?? {}, t = this.hass, n = e.pv_entity ? t?.states[e.pv_entity] : null, r = e.grid_entity ? t?.states[e.grid_entity] : null, s = n ? parseFloat(n.state) : null, i = r ? parseFloat(r.state) : null, a = i != null && i < 0, o = s != null && i != null ? s + i : null, l = s != null && o != null && o > 0 ? Math.min(s / o, 1) * 100 : a ? 100 : null, p = l != null ? Math.max(100 - l, 0) : null, d = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, f = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, u = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, h = d ? parseFloat(d.state) : null, g = f ? parseFloat(f.state) : null, y = u ? parseFloat(u.state) : null, x = g != null && g > 0 && h != null ? Math.min(h / g, 1) : null, m = e.ev_entity ? t?.states[e.ev_entity] : null, _ = e.ev_range_entity ? t?.states[e.ev_range_entity] : null, v = e.evcc_mode_entity ? t?.states[e.evcc_mode_entity] : null, b = m ? parseFloat(m.state) : NaN, $ = isNaN(b) ? null : b, E = _ ? parseFloat(_.state) : NaN, C = isNaN(E) ? null : Math.round(E), k = v?.state ?? null, I = v?.attributes.options ?? [];
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">

        <!-- Hero: PV + grid state -->
        <div class="hero-card">
          <div class="hero-top">
            <div>
              <div class="hero-label">PV-ERZEUGUNG</div>
              <div class="hero-value">${s != null ? ze(s) : "–"}</div>
            </div>
            <div class="hero-icon">☀️</div>
          </div>

          ${l != null ? c`
            <div class="flow-bar">
              <div class="flow-solar" style="width:${l}%"></div>
              <div class="flow-grid"  style="width:${p}%"></div>
            </div>
          ` : ""}

          ${i != null ? c`
            <div class="grid-line ${a ? "grid-export" : "grid-import"}">
              <span>${a ? "⬆️" : "⬇️"} ${ze(Math.abs(i))} ${a ? "Einspeisung" : "Netzbezug"}</span>
              ${l != null && (a || l >= 50) ? c`<span>${Math.round(l)}% autark</span>` : ""}
            </div>
          ` : ""}
        </div>

        <!-- Forecast -->
        ${h != null || g != null || y != null ? c`
          <div class="forecast-row">
            ${h != null || g != null ? c`
              <div class="fc-card">
                <div class="fc-label">Heute</div>
                <div class="fc-val">${g != null ? Gt(g) : Gt(h)}</div>
                ${x != null ? c`
                  <div class="fc-track"><div class="fc-fill" style="width:${x * 100}%"></div></div>
                ` : ""}
              </div>
            ` : ""}
            ${y != null ? c`
              <div class="fc-card">
                <div class="fc-label">Morgen</div>
                <div class="fc-val">${Gt(y)}</div>
              </div>
            ` : ""}
          </div>
        ` : ""}

        <!-- EV card (only when connected) -->
        ${$ != null ? c`
          <div class="ev-card">
            <div class="ev-top">
              <span class="ev-pct">🚗 ${Math.round($)}%</span>
              <div class="ev-track"><div class="ev-fill" style="width:${$}%"></div></div>
              ${C != null ? c`<span class="ev-km">${C} km</span>` : ""}
            </div>
            ${I.length > 0 ? c`
              <div class="ev-modes">
                ${I.map((T) => c`
                  <button class="mode-btn ${k === T ? "active" : ""}"
                    @click=${() => this._setMode(T)}>${dn(T)}</button>
                `)}
              </div>
            ` : ""}
          </div>
        ` : ""}

      </div>
    `;
  }
};
rt.styles = [N, ct, M`
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
Ht([
  w({ attribute: !1 })
], rt.prototype, "hass", 2);
Ht([
  w({ attribute: !1 })
], rt.prototype, "config", 2);
Ht([
  w({ type: Boolean })
], rt.prototype, "dark", 2);
rt = Ht([
  B("nspanel-page-energy")
], rt);
var pn = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, pt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? hn(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && pn(t, n, s), s;
};
const un = ["camera_1", "camera_2", "camera_3", "camera_4"];
let V = class extends P {
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
    const e = this.config ?? {}, t = this.hass, n = !!e.cameras_portrait, r = un.map((a) => e[a]).filter((a) => !!a);
    if (r.length === 0)
      return c`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const s = `page ${this.dark ? "nsp-dark" : ""} count-${r.length} ${n ? "portrait" : ""}`, i = (a) => {
      const o = t?.states[a];
      return o ? o.attributes.frontend_stream_type ? c`<ha-camera-stream .hass=${t} .stateObj=${o} muted autoPlay></ha-camera-stream>` : c`<img class="cam-img" src="/api/camera_proxy/${a}?token=${o.attributes.access_token}&_=${this._tick}" alt="${o.attributes.friendly_name ?? a}" />` : c`<div class="cam-unavail">Not available</div>`;
    };
    return c`
      <div class="${s}">
        ${r.map((a) => {
      const o = t?.states[a]?.attributes.friendly_name ?? a;
      return c`
            <div class="cam-cell" @click=${() => {
        this._fullscreenCam = a;
      }}>
              ${i(a)}
              <div class="cam-label">${o}</div>
            </div>
          `;
    })}

        ${this._fullscreenCam ? c`
          <div class="cam-fullscreen" @click=${() => {
      this._fullscreenCam = null;
    }}>
            ${i(this._fullscreenCam)}
            <div class="cam-label">${t?.states[this._fullscreenCam]?.attributes.friendly_name ?? this._fullscreenCam}</div>
            <div class="cam-close">✕</div>
          </div>
        ` : S}
      </div>
    `;
  }
};
V.styles = [N, M`
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
pt([
  w({ attribute: !1 })
], V.prototype, "hass", 2);
pt([
  w({ attribute: !1 })
], V.prototype, "config", 2);
pt([
  w({ type: Boolean })
], V.prototype, "dark", 2);
pt([
  A()
], V.prototype, "_tick", 2);
pt([
  A()
], V.prototype, "_fullscreenCam", 2);
V = pt([
  B("nspanel-page-security")
], V);
var kt = {}, fn = function() {
  return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
}, qe = {}, z = {};
let fe;
const gn = [
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
z.getSymbolSize = function(t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40) throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
z.getSymbolTotalCodewords = function(t) {
  return gn[t];
};
z.getBCHDigit = function(e) {
  let t = 0;
  for (; e !== 0; )
    t++, e >>>= 1;
  return t;
};
z.setToSJISFunction = function(t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  fe = t;
};
z.isKanjiModeEnabled = function() {
  return typeof fe < "u";
};
z.toSJIS = function(t) {
  return fe(t);
};
var Vt = {};
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
})(Vt);
function Je() {
  this.buffer = [], this.length = 0;
}
Je.prototype = {
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
var vn = Je;
function At(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e);
}
At.prototype.set = function(e, t, n, r) {
  const s = e * this.size + t;
  this.data[s] = n, r && (this.reservedBit[s] = !0);
};
At.prototype.get = function(e, t) {
  return this.data[e * this.size + t];
};
At.prototype.xor = function(e, t, n) {
  this.data[e * this.size + t] ^= n;
};
At.prototype.isReserved = function(e, t) {
  return this.reservedBit[e * this.size + t];
};
var mn = At, Ge = {};
(function(e) {
  const t = z.getSymbolSize;
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
})(Ge);
var Qe = {};
const bn = z.getSymbolSize, Ie = 7;
Qe.getPositions = function(t) {
  const n = bn(t);
  return [
    // top-left
    [0, 0],
    // top-right
    [n - Ie, 0],
    // bottom-left
    [0, n - Ie]
  ];
};
var Ze = {};
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
    let a = 0, o = 0, l = 0, p = null, d = null;
    for (let f = 0; f < i; f++) {
      o = l = 0, p = d = null;
      for (let u = 0; u < i; u++) {
        let h = s.get(f, u);
        h === p ? o++ : (o >= 5 && (a += t.N1 + (o - 5)), p = h, o = 1), h = s.get(u, f), h === d ? l++ : (l >= 5 && (a += t.N1 + (l - 5)), d = h, l = 1);
      }
      o >= 5 && (a += t.N1 + (o - 5)), l >= 5 && (a += t.N1 + (l - 5));
    }
    return a;
  }, e.getPenaltyN2 = function(s) {
    const i = s.size;
    let a = 0;
    for (let o = 0; o < i - 1; o++)
      for (let l = 0; l < i - 1; l++) {
        const p = s.get(o, l) + s.get(o, l + 1) + s.get(o + 1, l) + s.get(o + 1, l + 1);
        (p === 4 || p === 0) && a++;
      }
    return a * t.N2;
  }, e.getPenaltyN3 = function(s) {
    const i = s.size;
    let a = 0, o = 0, l = 0;
    for (let p = 0; p < i; p++) {
      o = l = 0;
      for (let d = 0; d < i; d++)
        o = o << 1 & 2047 | s.get(p, d), d >= 10 && (o === 1488 || o === 93) && a++, l = l << 1 & 2047 | s.get(d, p), d >= 10 && (l === 1488 || l === 93) && a++;
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
    for (let p = 0; p < a; p++) {
      i(p), e.applyMask(p, s);
      const d = e.getPenaltyN1(s) + e.getPenaltyN2(s) + e.getPenaltyN3(s) + e.getPenaltyN4(s);
      e.applyMask(p, s), d < l && (l = d, o = p);
    }
    return o;
  };
})(Ze);
var Kt = {};
const j = Vt, Mt = [
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
], Tt = [
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
Kt.getBlocksCount = function(t, n) {
  switch (n) {
    case j.L:
      return Mt[(t - 1) * 4 + 0];
    case j.M:
      return Mt[(t - 1) * 4 + 1];
    case j.Q:
      return Mt[(t - 1) * 4 + 2];
    case j.H:
      return Mt[(t - 1) * 4 + 3];
    default:
      return;
  }
};
Kt.getTotalCodewordsCount = function(t, n) {
  switch (n) {
    case j.L:
      return Tt[(t - 1) * 4 + 0];
    case j.M:
      return Tt[(t - 1) * 4 + 1];
    case j.Q:
      return Tt[(t - 1) * 4 + 2];
    case j.H:
      return Tt[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var Xe = {}, Wt = {};
const vt = new Uint8Array(512), Dt = new Uint8Array(256);
(function() {
  let t = 1;
  for (let n = 0; n < 255; n++)
    vt[n] = t, Dt[t] = n, t <<= 1, t & 256 && (t ^= 285);
  for (let n = 255; n < 512; n++)
    vt[n] = vt[n - 255];
})();
Wt.log = function(t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return Dt[t];
};
Wt.exp = function(t) {
  return vt[t];
};
Wt.mul = function(t, n) {
  return t === 0 || n === 0 ? 0 : vt[Dt[t] + Dt[n]];
};
(function(e) {
  const t = Wt;
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
})(Xe);
const ts = Xe;
function ge(e) {
  this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree);
}
ge.prototype.initialize = function(t) {
  this.degree = t, this.genPoly = ts.generateECPolynomial(this.degree);
};
ge.prototype.encode = function(t) {
  if (!this.genPoly)
    throw new Error("Encoder not initialized");
  const n = new Uint8Array(t.length + this.degree);
  n.set(t);
  const r = ts.mod(n, this.genPoly), s = this.degree - r.length;
  if (s > 0) {
    const i = new Uint8Array(this.degree);
    return i.set(r, s), i;
  }
  return r;
};
var _n = ge, es = {}, W = {}, ve = {};
ve.isValid = function(t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var O = {};
const ss = "[0-9]+", yn = "[A-Z $%*+\\-./:]+";
let xt = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
xt = xt.replace(/u/g, "\\u");
const wn = "(?:(?![A-Z0-9 $%*+\\-./:]|" + xt + `)(?:.|[\r
]))+`;
O.KANJI = new RegExp(xt, "g");
O.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
O.BYTE = new RegExp(wn, "g");
O.NUMERIC = new RegExp(ss, "g");
O.ALPHANUMERIC = new RegExp(yn, "g");
const xn = new RegExp("^" + xt + "$"), $n = new RegExp("^" + ss + "$"), En = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
O.testKanji = function(t) {
  return xn.test(t);
};
O.testNumeric = function(t) {
  return $n.test(t);
};
O.testAlphanumeric = function(t) {
  return En.test(t);
};
(function(e) {
  const t = ve, n = O;
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
})(W);
(function(e) {
  const t = z, n = Kt, r = Vt, s = W, i = ve, a = 7973, o = t.getBCHDigit(a);
  function l(u, h, g) {
    for (let y = 1; y <= 40; y++)
      if (h <= e.getCapacity(y, g, u))
        return y;
  }
  function p(u, h) {
    return s.getCharCountIndicator(u, h) + 4;
  }
  function d(u, h) {
    let g = 0;
    return u.forEach(function(y) {
      const x = p(y.mode, h);
      g += x + y.getBitsLength();
    }), g;
  }
  function f(u, h) {
    for (let g = 1; g <= 40; g++)
      if (d(u, g) <= e.getCapacity(g, h, s.MIXED))
        return g;
  }
  e.from = function(h, g) {
    return i.isValid(h) ? parseInt(h, 10) : g;
  }, e.getCapacity = function(h, g, y) {
    if (!i.isValid(h))
      throw new Error("Invalid QR Code version");
    typeof y > "u" && (y = s.BYTE);
    const x = t.getSymbolTotalCodewords(h), m = n.getTotalCodewordsCount(h, g), _ = (x - m) * 8;
    if (y === s.MIXED) return _;
    const v = _ - p(y, h);
    switch (y) {
      case s.NUMERIC:
        return Math.floor(v / 10 * 3);
      case s.ALPHANUMERIC:
        return Math.floor(v / 11 * 2);
      case s.KANJI:
        return Math.floor(v / 13);
      case s.BYTE:
      default:
        return Math.floor(v / 8);
    }
  }, e.getBestVersionForData = function(h, g) {
    let y;
    const x = r.from(g, r.M);
    if (Array.isArray(h)) {
      if (h.length > 1)
        return f(h, x);
      if (h.length === 0)
        return 1;
      y = h[0];
    } else
      y = h;
    return l(y.mode, y.getLength(), x);
  }, e.getEncodedBits = function(h) {
    if (!i.isValid(h) || h < 7)
      throw new Error("Invalid QR Code version");
    let g = h << 12;
    for (; t.getBCHDigit(g) - o >= 0; )
      g ^= a << t.getBCHDigit(g) - o;
    return h << 12 | g;
  };
})(es);
var ns = {};
const se = z, rs = 1335, Cn = 21522, De = se.getBCHDigit(rs);
ns.getEncodedBits = function(t, n) {
  const r = t.bit << 3 | n;
  let s = r << 10;
  for (; se.getBCHDigit(s) - De >= 0; )
    s ^= rs << se.getBCHDigit(s) - De;
  return (r << 10 | s) ^ Cn;
};
var is = {};
const kn = W;
function it(e) {
  this.mode = kn.NUMERIC, this.data = e.toString();
}
it.getBitsLength = function(t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? t % 3 * 3 + 1 : 0);
};
it.prototype.getLength = function() {
  return this.data.length;
};
it.prototype.getBitsLength = function() {
  return it.getBitsLength(this.data.length);
};
it.prototype.write = function(t) {
  let n, r, s;
  for (n = 0; n + 3 <= this.data.length; n += 3)
    r = this.data.substr(n, 3), s = parseInt(r, 10), t.put(s, 10);
  const i = this.data.length - n;
  i > 0 && (r = this.data.substr(n), s = parseInt(r, 10), t.put(s, i * 3 + 1));
};
var An = it;
const Sn = W, Qt = [
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
function at(e) {
  this.mode = Sn.ALPHANUMERIC, this.data = e;
}
at.getBitsLength = function(t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
at.prototype.getLength = function() {
  return this.data.length;
};
at.prototype.getBitsLength = function() {
  return at.getBitsLength(this.data.length);
};
at.prototype.write = function(t) {
  let n;
  for (n = 0; n + 2 <= this.data.length; n += 2) {
    let r = Qt.indexOf(this.data[n]) * 45;
    r += Qt.indexOf(this.data[n + 1]), t.put(r, 11);
  }
  this.data.length % 2 && t.put(Qt.indexOf(this.data[n]), 6);
};
var Pn = at;
const Mn = W;
function ot(e) {
  this.mode = Mn.BYTE, typeof e == "string" ? this.data = new TextEncoder().encode(e) : this.data = new Uint8Array(e);
}
ot.getBitsLength = function(t) {
  return t * 8;
};
ot.prototype.getLength = function() {
  return this.data.length;
};
ot.prototype.getBitsLength = function() {
  return ot.getBitsLength(this.data.length);
};
ot.prototype.write = function(e) {
  for (let t = 0, n = this.data.length; t < n; t++)
    e.put(this.data[t], 8);
};
var Tn = ot;
const Bn = W, Nn = z;
function lt(e) {
  this.mode = Bn.KANJI, this.data = e;
}
lt.getBitsLength = function(t) {
  return t * 13;
};
lt.prototype.getLength = function() {
  return this.data.length;
};
lt.prototype.getBitsLength = function() {
  return lt.getBitsLength(this.data.length);
};
lt.prototype.write = function(e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let n = Nn.toSJIS(this.data[t]);
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
var zn = lt, as = { exports: {} };
(function(e) {
  var t = {
    single_source_shortest_paths: function(n, r, s) {
      var i = {}, a = {};
      a[r] = 0;
      var o = t.PriorityQueue.make();
      o.push(r, 0);
      for (var l, p, d, f, u, h, g, y, x; !o.empty(); ) {
        l = o.pop(), p = l.value, f = l.cost, u = n[p] || {};
        for (d in u)
          u.hasOwnProperty(d) && (h = u[d], g = f + h, y = a[d], x = typeof a[d] > "u", (x || y > g) && (a[d] = g, o.push(d, g), i[d] = p));
      }
      if (typeof s < "u" && typeof a[s] > "u") {
        var m = ["Could not find a path from ", r, " to ", s, "."].join("");
        throw new Error(m);
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
})(as);
var In = as.exports;
(function(e) {
  const t = W, n = An, r = Pn, s = Tn, i = zn, a = O, o = z, l = In;
  function p(m) {
    return unescape(encodeURIComponent(m)).length;
  }
  function d(m, _, v) {
    const b = [];
    let $;
    for (; ($ = m.exec(v)) !== null; )
      b.push({
        data: $[0],
        index: $.index,
        mode: _,
        length: $[0].length
      });
    return b;
  }
  function f(m) {
    const _ = d(a.NUMERIC, t.NUMERIC, m), v = d(a.ALPHANUMERIC, t.ALPHANUMERIC, m);
    let b, $;
    return o.isKanjiModeEnabled() ? (b = d(a.BYTE, t.BYTE, m), $ = d(a.KANJI, t.KANJI, m)) : (b = d(a.BYTE_KANJI, t.BYTE, m), $ = []), _.concat(v, b, $).sort(function(C, k) {
      return C.index - k.index;
    }).map(function(C) {
      return {
        data: C.data,
        mode: C.mode,
        length: C.length
      };
    });
  }
  function u(m, _) {
    switch (_) {
      case t.NUMERIC:
        return n.getBitsLength(m);
      case t.ALPHANUMERIC:
        return r.getBitsLength(m);
      case t.KANJI:
        return i.getBitsLength(m);
      case t.BYTE:
        return s.getBitsLength(m);
    }
  }
  function h(m) {
    return m.reduce(function(_, v) {
      const b = _.length - 1 >= 0 ? _[_.length - 1] : null;
      return b && b.mode === v.mode ? (_[_.length - 1].data += v.data, _) : (_.push(v), _);
    }, []);
  }
  function g(m) {
    const _ = [];
    for (let v = 0; v < m.length; v++) {
      const b = m[v];
      switch (b.mode) {
        case t.NUMERIC:
          _.push([
            b,
            { data: b.data, mode: t.ALPHANUMERIC, length: b.length },
            { data: b.data, mode: t.BYTE, length: b.length }
          ]);
          break;
        case t.ALPHANUMERIC:
          _.push([
            b,
            { data: b.data, mode: t.BYTE, length: b.length }
          ]);
          break;
        case t.KANJI:
          _.push([
            b,
            { data: b.data, mode: t.BYTE, length: p(b.data) }
          ]);
          break;
        case t.BYTE:
          _.push([
            { data: b.data, mode: t.BYTE, length: p(b.data) }
          ]);
      }
    }
    return _;
  }
  function y(m, _) {
    const v = {}, b = { start: {} };
    let $ = ["start"];
    for (let E = 0; E < m.length; E++) {
      const C = m[E], k = [];
      for (let I = 0; I < C.length; I++) {
        const T = C[I], ht = "" + E + I;
        k.push(ht), v[ht] = { node: T, lastCount: 0 }, b[ht] = {};
        for (let qt = 0; qt < $.length; qt++) {
          const R = $[qt];
          v[R] && v[R].node.mode === T.mode ? (b[R][ht] = u(v[R].lastCount + T.length, T.mode) - u(v[R].lastCount, T.mode), v[R].lastCount += T.length) : (v[R] && (v[R].lastCount = T.length), b[R][ht] = u(T.length, T.mode) + 4 + t.getCharCountIndicator(T.mode, _));
        }
      }
      $ = k;
    }
    for (let E = 0; E < $.length; E++)
      b[$[E]].end = 0;
    return { map: b, table: v };
  }
  function x(m, _) {
    let v;
    const b = t.getBestModeForData(m);
    if (v = t.from(_, b), v !== t.BYTE && v.bit < b.bit)
      throw new Error('"' + m + '" cannot be encoded with mode ' + t.toString(v) + `.
 Suggested mode is: ` + t.toString(b));
    switch (v === t.KANJI && !o.isKanjiModeEnabled() && (v = t.BYTE), v) {
      case t.NUMERIC:
        return new n(m);
      case t.ALPHANUMERIC:
        return new r(m);
      case t.KANJI:
        return new i(m);
      case t.BYTE:
        return new s(m);
    }
  }
  e.fromArray = function(_) {
    return _.reduce(function(v, b) {
      return typeof b == "string" ? v.push(x(b, null)) : b.data && v.push(x(b.data, b.mode)), v;
    }, []);
  }, e.fromString = function(_, v) {
    const b = f(_, o.isKanjiModeEnabled()), $ = g(b), E = y($, v), C = l.find_path(E.map, "start", "end"), k = [];
    for (let I = 1; I < C.length - 1; I++)
      k.push(E.table[C[I]].node);
    return e.fromArray(h(k));
  }, e.rawSplit = function(_) {
    return e.fromArray(
      f(_, o.isKanjiModeEnabled())
    );
  };
})(is);
const Yt = z, Zt = Vt, Dn = vn, Ln = mn, On = Ge, Rn = Qe, ne = Ze, re = Kt, Fn = _n, Lt = es, Un = ns, jn = W, Xt = is;
function Hn(e, t) {
  const n = e.size, r = Rn.getPositions(t);
  for (let s = 0; s < r.length; s++) {
    const i = r[s][0], a = r[s][1];
    for (let o = -1; o <= 7; o++)
      if (!(i + o <= -1 || n <= i + o))
        for (let l = -1; l <= 7; l++)
          a + l <= -1 || n <= a + l || (o >= 0 && o <= 6 && (l === 0 || l === 6) || l >= 0 && l <= 6 && (o === 0 || o === 6) || o >= 2 && o <= 4 && l >= 2 && l <= 4 ? e.set(i + o, a + l, !0, !0) : e.set(i + o, a + l, !1, !0));
  }
}
function Vn(e) {
  const t = e.size;
  for (let n = 8; n < t - 8; n++) {
    const r = n % 2 === 0;
    e.set(n, 6, r, !0), e.set(6, n, r, !0);
  }
}
function Kn(e, t) {
  const n = On.getPositions(t);
  for (let r = 0; r < n.length; r++) {
    const s = n[r][0], i = n[r][1];
    for (let a = -2; a <= 2; a++)
      for (let o = -2; o <= 2; o++)
        a === -2 || a === 2 || o === -2 || o === 2 || a === 0 && o === 0 ? e.set(s + a, i + o, !0, !0) : e.set(s + a, i + o, !1, !0);
  }
}
function Wn(e, t) {
  const n = e.size, r = Lt.getEncodedBits(t);
  let s, i, a;
  for (let o = 0; o < 18; o++)
    s = Math.floor(o / 3), i = o % 3 + n - 8 - 3, a = (r >> o & 1) === 1, e.set(s, i, a, !0), e.set(i, s, a, !0);
}
function te(e, t, n) {
  const r = e.size, s = Un.getEncodedBits(t, n);
  let i, a;
  for (i = 0; i < 15; i++)
    a = (s >> i & 1) === 1, i < 6 ? e.set(i, 8, a, !0) : i < 8 ? e.set(i + 1, 8, a, !0) : e.set(r - 15 + i, 8, a, !0), i < 8 ? e.set(8, r - i - 1, a, !0) : i < 9 ? e.set(8, 15 - i - 1 + 1, a, !0) : e.set(8, 15 - i - 1, a, !0);
  e.set(r - 8, 8, 1, !0);
}
function Yn(e, t) {
  const n = e.size;
  let r = -1, s = n - 1, i = 7, a = 0;
  for (let o = n - 1; o > 0; o -= 2)
    for (o === 6 && o--; ; ) {
      for (let l = 0; l < 2; l++)
        if (!e.isReserved(s, o - l)) {
          let p = !1;
          a < t.length && (p = (t[a] >>> i & 1) === 1), e.set(s, o - l, p), i--, i === -1 && (a++, i = 7);
        }
      if (s += r, s < 0 || n <= s) {
        s -= r, r = -r;
        break;
      }
    }
}
function qn(e, t, n) {
  const r = new Dn();
  n.forEach(function(l) {
    r.put(l.mode.bit, 4), r.put(l.getLength(), jn.getCharCountIndicator(l.mode, e)), l.write(r);
  });
  const s = Yt.getSymbolTotalCodewords(e), i = re.getTotalCodewordsCount(e, t), a = (s - i) * 8;
  for (r.getLengthInBits() + 4 <= a && r.put(0, 4); r.getLengthInBits() % 8 !== 0; )
    r.putBit(0);
  const o = (a - r.getLengthInBits()) / 8;
  for (let l = 0; l < o; l++)
    r.put(l % 2 ? 17 : 236, 8);
  return Jn(r, e, t);
}
function Jn(e, t, n) {
  const r = Yt.getSymbolTotalCodewords(t), s = re.getTotalCodewordsCount(t, n), i = r - s, a = re.getBlocksCount(t, n), o = r % a, l = a - o, p = Math.floor(r / a), d = Math.floor(i / a), f = d + 1, u = p - d, h = new Fn(u);
  let g = 0;
  const y = new Array(a), x = new Array(a);
  let m = 0;
  const _ = new Uint8Array(e.buffer);
  for (let C = 0; C < a; C++) {
    const k = C < l ? d : f;
    y[C] = _.slice(g, g + k), x[C] = h.encode(y[C]), g += k, m = Math.max(m, k);
  }
  const v = new Uint8Array(r);
  let b = 0, $, E;
  for ($ = 0; $ < m; $++)
    for (E = 0; E < a; E++)
      $ < y[E].length && (v[b++] = y[E][$]);
  for ($ = 0; $ < u; $++)
    for (E = 0; E < a; E++)
      v[b++] = x[E][$];
  return v;
}
function Gn(e, t, n, r) {
  let s;
  if (Array.isArray(e))
    s = Xt.fromArray(e);
  else if (typeof e == "string") {
    let p = t;
    if (!p) {
      const d = Xt.rawSplit(e);
      p = Lt.getBestVersionForData(d, n);
    }
    s = Xt.fromString(e, p || 40);
  } else
    throw new Error("Invalid data");
  const i = Lt.getBestVersionForData(s, n);
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
  const a = qn(t, n, s), o = Yt.getSymbolSize(t), l = new Ln(o);
  return Hn(l, t), Vn(l), Kn(l, t), te(l, n, 0), t >= 7 && Wn(l, t), Yn(l, a), isNaN(r) && (r = ne.getBestMask(
    l,
    te.bind(null, l, n)
  )), ne.applyMask(r, l), te(l, n, r), {
    modules: l,
    version: t,
    errorCorrectionLevel: n,
    maskPattern: r,
    segments: s
  };
}
qe.create = function(t, n) {
  if (typeof t > "u" || t === "")
    throw new Error("No input text");
  let r = Zt.M, s, i;
  return typeof n < "u" && (r = Zt.from(n.errorCorrectionLevel, Zt.M), s = Lt.from(n.version), i = ne.from(n.maskPattern), n.toSJISFunc && Yt.setToSJISFunction(n.toSJISFunc)), Gn(t, s, r, i);
};
var os = {}, me = {};
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
    const a = s.modules.size, o = s.modules.data, l = e.getScale(a, i), p = Math.floor((a + i.margin * 2) * l), d = i.margin * l, f = [i.color.light, i.color.dark];
    for (let u = 0; u < p; u++)
      for (let h = 0; h < p; h++) {
        let g = (u * p + h) * 4, y = i.color.light;
        if (u >= d && h >= d && u < p - d && h < p - d) {
          const x = Math.floor((u - d) / l), m = Math.floor((h - d) / l);
          y = f[o[x * a + m] ? 1 : 0];
        }
        r[g++] = y.r, r[g++] = y.g, r[g++] = y.b, r[g] = y.a;
      }
  };
})(me);
(function(e) {
  const t = me;
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
    let l = o, p = a;
    typeof l > "u" && (!a || !a.getContext) && (l = a, a = void 0), a || (p = r()), l = t.getOptions(l);
    const d = t.getImageWidth(i.modules.size, l), f = p.getContext("2d"), u = f.createImageData(d, d);
    return t.qrToImageData(u.data, i, l), n(f, p, d), f.putImageData(u, 0, 0), p;
  }, e.renderToDataURL = function(i, a, o) {
    let l = o;
    typeof l > "u" && (!a || !a.getContext) && (l = a, a = void 0), l || (l = {});
    const p = e.render(i, a, l), d = l.type || "image/png", f = l.rendererOpts || {};
    return p.toDataURL(d, f.quality);
  };
})(os);
var ls = {};
const Qn = me;
function Le(e, t) {
  const n = e.a / 255, r = t + '="' + e.hex + '"';
  return n < 1 ? r + " " + t + '-opacity="' + n.toFixed(2).slice(1) + '"' : r;
}
function ee(e, t, n) {
  let r = e + t;
  return typeof n < "u" && (r += " " + n), r;
}
function Zn(e, t, n) {
  let r = "", s = 0, i = !1, a = 0;
  for (let o = 0; o < e.length; o++) {
    const l = Math.floor(o % t), p = Math.floor(o / t);
    !l && !i && (i = !0), e[o] ? (a++, o > 0 && l > 0 && e[o - 1] || (r += i ? ee("M", l + n, 0.5 + p + n) : ee("m", s, 0), s = 0, i = !1), l + 1 < t && e[o + 1] || (r += ee("h", a), a = 0)) : s++;
  }
  return r;
}
ls.render = function(t, n, r) {
  const s = Qn.getOptions(n), i = t.modules.size, a = t.modules.data, o = i + s.margin * 2, l = s.color.light.a ? "<path " + Le(s.color.light, "fill") + ' d="M0 0h' + o + "v" + o + 'H0z"/>' : "", p = "<path " + Le(s.color.dark, "stroke") + ' d="' + Zn(a, i, s.margin) + '"/>', d = 'viewBox="0 0 ' + o + " " + o + '"', u = '<svg xmlns="http://www.w3.org/2000/svg" ' + (s.width ? 'width="' + s.width + '" height="' + s.width + '" ' : "") + d + ' shape-rendering="crispEdges">' + l + p + `</svg>
`;
  return typeof r == "function" && r(null, u), u;
};
const Xn = fn, ie = qe, cs = os, tr = ls;
function be(e, t, n, r, s) {
  const i = [].slice.call(arguments, 1), a = i.length, o = typeof i[a - 1] == "function";
  if (!o && !Xn())
    throw new Error("Callback required as last argument");
  if (o) {
    if (a < 2)
      throw new Error("Too few arguments provided");
    a === 2 ? (s = n, n = t, t = r = void 0) : a === 3 && (t.getContext && typeof s > "u" ? (s = r, r = void 0) : (s = r, r = n, n = t, t = void 0));
  } else {
    if (a < 1)
      throw new Error("Too few arguments provided");
    return a === 1 ? (n = t, t = r = void 0) : a === 2 && !t.getContext && (r = n, n = t, t = void 0), new Promise(function(l, p) {
      try {
        const d = ie.create(n, r);
        l(e(d, t, r));
      } catch (d) {
        p(d);
      }
    });
  }
  try {
    const l = ie.create(n, r);
    s(null, e(l, t, r));
  } catch (l) {
    s(l);
  }
}
kt.create = ie.create;
kt.toCanvas = be.bind(null, cs.render);
kt.toDataURL = be.bind(null, cs.renderToDataURL);
kt.toString = be.bind(null, function(e, t, n) {
  return tr.render(e, n);
});
var er = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, St = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? sr(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && er(t, n, s), s;
};
function Oe(e) {
  return e.replace(/[\\;,":]/g, (t) => "\\" + t);
}
let Z = class extends P {
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
    const r = `WIFI:T:${t};S:${Oe(e.wifi_ssid)};P:${Oe(e.wifi_password ?? "")};H:false;;`;
    try {
      this._qrUrl = await kt.toDataURL(r, {
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
    return c`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        ${e.wifi_ssid ? c`
          <div class="wifi-card">
            <div class="wifi-header">GÄSTE-WLAN</div>
            ${this._qrUrl ? c`<img class="qr" src=${this._qrUrl} width="200" height="200" alt="QR Code">` : c`<div class="qr-placeholder"></div>`}
            <div class="wifi-ssid">📶  ${e.wifi_ssid}</div>
            ${e.wifi_password ? c`
              <div class="wifi-pass-row">
                <span class="wifi-pass">${this._showPass ? e.wifi_password : "••••••••"}</span>
                <button class="pass-toggle" @click=${() => {
      this._showPass = !this._showPass;
    }}>
                  ${this._showPass ? c`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>` : c`<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`}
                </button>
              </div>
            ` : ""}
          </div>
        ` : c`
          <div class="empty">Kein WLAN konfiguriert</div>
        `}
      </div>
    `;
  }
};
Z.styles = [N, ct, M`
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
St([
  w({ attribute: !1 })
], Z.prototype, "config", 2);
St([
  w({ type: Boolean })
], Z.prototype, "dark", 2);
St([
  A()
], Z.prototype, "_qrUrl", 2);
St([
  A()
], Z.prototype, "_showPass", 2);
Z = St([
  B("nspanel-page-wifi")
], Z);
var nr = Object.defineProperty, rr = Object.getOwnPropertyDescriptor, _e = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? rr(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && nr(t, n, s), s;
};
const Re = {
  home: "Home",
  climate: "Climate",
  blinds: "Blinds",
  media: "Media",
  energy: "Energy",
  security: "Security",
  wifi: "WiFi"
}, Fe = [
  { id: "home" },
  { id: "climate" },
  { id: "blinds" },
  { id: "media" },
  { id: "energy" },
  { id: "security" },
  { id: "wifi" }
], ir = [
  { name: "weather_entity", label: "Weather — shown in status bar", selector: { entity: { domain: "weather" } } },
  { name: "trash_entity", label: "Trash Collection — sensor or calendar", selector: { entity: { domain: ["sensor", "calendar"] } } }
], ar = [
  { name: "calendar_entity", label: "Calendar", selector: { entity: { domain: "calendar" } } },
  { name: "indoor_temp_entity", label: "Indoor Temperature — also powers Home tab temp card", selector: { entity: { domain: "sensor", device_class: "temperature" } } }
], or = [
  { name: "person_1", label: "Mama — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_1_icon", label: "Mama Icon — emoji, default 👩🏻", selector: { text: {} } },
  { name: "person_2", label: "Papa — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_2_icon", label: "Papa Icon — emoji, default 👨🏻", selector: { text: {} } },
  { name: "person_3", label: "Oma — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_3_icon", label: "Oma Icon — emoji, default 👵🏻", selector: { text: {} } },
  { name: "person_4", label: "Opa — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_4_icon", label: "Opa Icon — emoji, default 👴🏻", selector: { text: {} } },
  { name: "person_5", label: "Kind 1 — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_5_icon", label: "Kind 1 Icon — emoji, default 🧒🏻", selector: { text: {} } },
  { name: "person_6", label: "Kind 2 — shown in status bar", selector: { entity: { domain: "person" } } },
  { name: "person_6_icon", label: "Kind 2 Icon — emoji, default 🧒🏻", selector: { text: {} } }
], lr = [
  { name: "garden_light", label: "Light 1", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "garden_light_icon", label: "Light 1 Icon — emoji, default 💡", selector: { text: {} } },
  { name: "light_2", label: "Light 2 (optional)", selector: { entity: { domain: ["light", "switch"] } } },
  { name: "light_2_icon", label: "Light 2 Icon — emoji, default 💡", selector: { text: {} } }
], cr = [
  { name: "vacuum_entity", label: "Robot Vacuum (optional)", selector: { entity: { domain: "vacuum" } } },
  { name: "lawn_mower_entity", label: "Lawn Mower (optional)", selector: { entity: { domain: "lawn_mower" } } },
  { name: "dishwasher_entity", label: "Dishwasher (optional) — end time entity", selector: { entity: { domain: "sensor" } } },
  { name: "dishwasher_program_entity", label: "Dishwasher Active Program (optional) — shown as title", selector: { entity: { domain: "select" } } }
], dr = [
  { name: "thermostat_entity", label: "Thermostat", selector: { entity: { domain: "climate" } } }
], pr = [
  { name: "cover_1", label: "Blind 1", selector: { entity: { domain: "cover" } } },
  { name: "cover_2", label: "Blind 2 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_3", label: "Blind 3 (optional)", selector: { entity: { domain: "cover" } } },
  { name: "cover_4", label: "Blind 4 (optional)", selector: { entity: { domain: "cover" } } }
], hr = [
  { name: "cover_5", label: "Blind 5", selector: { entity: { domain: "cover" } } },
  { name: "cover_6", label: "Blind 6", selector: { entity: { domain: "cover" } } },
  { name: "cover_7", label: "Blind 7", selector: { entity: { domain: "cover" } } },
  { name: "cover_8", label: "Blind 8", selector: { entity: { domain: "cover" } } }
], ur = [
  { name: "scene_up", label: "Open All — scene or script", selector: { entity: { domain: ["scene", "script"] } } },
  { name: "scene_down", label: "Close All — scene or script", selector: { entity: { domain: ["scene", "script"] } } }
], fr = [
  { name: "media_player", label: "Media Player", selector: { entity: { domain: "media_player" } } }
], gr = [
  { name: "pv_entity", label: "Solar Production — sensor in W or kW", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Grid Power — positive = import, negative = export (W or kW)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV Battery (optional) — state of charge sensor in %", selector: { entity: { domain: "sensor" } } },
  { name: "ev_range_entity", label: "EV Range (optional) — range sensor in km", selector: { entity: { domain: "sensor" } } },
  { name: "evcc_mode_entity", label: "EVCC Charge Mode (optional) — select entity for mode", selector: { entity: { domain: "select" } } }
], vr = [
  { name: "pv_today_entity", label: "Solar Energy Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Solar Forecast Today — sensor in kWh", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Solar Forecast Tomorrow — sensor in kWh", selector: { entity: { domain: "sensor" } } }
], mr = [
  { name: "camera_1", label: "Camera 1", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Camera 2 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Camera 3 (optional)", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Camera 4 (optional)", selector: { entity: { domain: "camera" } } }
], br = [
  { name: "doorbell_trigger", label: "Doorbell Trigger — binary_sensor or input_boolean", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Doorbell Camera (optional)", selector: { entity: { domain: "camera" } } }
], _r = [
  { name: "wifi_ssid", label: "WLAN Name (SSID)", selector: { text: {} } },
  { name: "wifi_password", label: "Passwort", selector: { text: {} } },
  { name: "wifi_security", label: "Sicherheit — WPA (Standard), WEP, nopass (offen)", selector: { select: { options: ["WPA", "WEP", "nopass"] } } }
], yr = [
  { name: "bg_accent_1", label: "Glow Color 1 — hex, e.g. #0A84FF (default: iOS Blue)", selector: { text: {} } },
  { name: "bg_accent_2", label: "Glow Color 2 — hex, e.g. #BF5AF2 (default: iOS Purple)", selector: { text: {} } }
], wr = (e) => e.label ?? e.name;
let Ot = class extends P {
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
    return c`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${wr} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return c``;
    const e = this._config, t = e.pages ?? ["home"], n = (r) => e[`${r}_label`] ?? "";
    return c`
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
        ${Fe.map((r) => c`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${n(r.id) || Re[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Customize tab labels</summary>
        <div class="nsp-details-body">
          ${this._form(Fe.map((r) => ({
      name: `${r.id}_label`,
      label: `${Re[r.id]} — custom label`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <!-- ── Home ── -->
      <div class="nsp-sec">Home</div>
      <p class="nsp-desc">Calendar, temperature, lights and appliances on the Home tab. EV bar appears automatically when EV Battery is configured.</p>

      <div class="nsp-group">Status Bar</div>
      ${this._form(ir)}
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

      <div class="nsp-group">Content</div>
      ${this._form(ar)}

      <div class="nsp-group">Presence</div>
      ${this._form(or)}

      <div class="nsp-group">Lights</div>
      ${this._form(lr)}

      <div class="nsp-group">Appliances</div>
      ${this._form(cr)}

      <!-- ── Climate ── -->
      <div class="nsp-sec">Climate</div>
      <p class="nsp-desc">Thermostat control. Also powers the temperature card and threshold stepper on the Home tab.</p>
      ${this._form(dr)}

      <!-- ── Blinds ── -->
      <div class="nsp-sec">Blinds</div>
      <p class="nsp-desc">Control covers, shutters and blinds. Add up to 8.</p>
      ${this._form(pr)}
      <details class="nsp-details">
        <summary>More blinds (5 – 8)</summary>
        <div class="nsp-details-body">${this._form(hr)}</div>
      </details>

      <div class="nsp-group">Quick Actions</div>
      ${this._form(ur)}

      <!-- ── Media ── -->
      <div class="nsp-sec">Media</div>
      <p class="nsp-desc">Control music, podcasts and other media.</p>
      ${this._form(fr)}

      <!-- ── Energy ── -->
      <div class="nsp-sec">Energy</div>
      <p class="nsp-desc">Monitor your solar production, grid usage and electric vehicle.</p>
      ${this._form(gr)}
      <details class="nsp-details">
        <summary>Daily totals & solar forecast</summary>
        <div class="nsp-details-body">${this._form(vr)}</div>
      </details>

      <!-- ── Security ── -->
      <div class="nsp-sec">Security</div>
      <p class="nsp-desc">Show live camera feeds. Add up to 4 cameras.</p>
      ${this._form(mr)}
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
      ${this._form(br)}

      <!-- ── WiFi ── -->
      <div class="nsp-sec">WiFi</div>
      <p class="nsp-desc">Displays a QR code for quick guest Wi-Fi access. Tap the eye icon on the panel to reveal the password.</p>
      ${this._form(_r)}

      <!-- ── Appearance ── -->
      <div class="nsp-sec">Appearance</div>
      <p class="nsp-desc">Customize the ambient glow colors behind the cards. Leave empty for iOS defaults.</p>
      ${this._form(yr)}
    `;
  }
};
_e([
  w({ attribute: !1 })
], Ot.prototype, "hass", 2);
_e([
  A()
], Ot.prototype, "_config", 2);
Ot = _e([
  B("nspanel-dashboard-editor")
], Ot);
var xr = Object.defineProperty, $r = Object.getOwnPropertyDescriptor, F = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? $r(t, n) : t, i = e.length - 1, a; i >= 0; i--)
    (a = e[i]) && (s = (r ? a(t, n, s) : a(s)) || s);
  return r && s && xr(t, n, s), s;
};
let D = class extends P {
  constructor() {
    super(...arguments), this._activePage = "home", this._doorbellActive = !1, this._presenceActive = !1, this._trashActive = !1, this._trashEvents = [], this._dark = !1;
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
        const r = this.hass.states[t]?.state;
        this._prevTriggerState !== "on" && r === "on" && (this._doorbellActive = !0), this._prevTriggerState = r;
      }
      const n = this._config?.media_player;
      if (n) {
        const r = this.hass.states[n]?.state;
        this._prevMediaState !== "playing" && r === "playing" && this._pages.includes("media") && (this._activePage = "media"), this._prevMediaState = r;
      }
    }
  }
  get _pages() {
    return this._config?.pages ?? ["home"];
  }
  render() {
    if (!this._config) return c``;
    const e = this._dark, t = e ? 0.18 : 0.09, n = this._glowVar(this._config.bg_accent_1, t), r = this._glowVar(this._config.bg_accent_2, t), s = [n ? `--nsp-glow-1:${n}` : "", r ? `--nsp-glow-2:${r}` : ""].filter(Boolean).join(";");
    return c`
      <div class="shell ${e ? "nsp-dark" : ""}" style="${s}">
        <nspanel-status-bar
          .hass=${this.hass}
          .config=${this._config}
          ?dark=${e}
          @presence-tap=${() => {
      this._presenceActive = !0;
    }}
          @trash-tap=${(i) => {
      this._trashEvents = i.detail.events, this._trashActive = !0;
    }}
        ></nspanel-status-bar>
        <div class="content">
          ${this._renderPage()}
        </div>

        ${this._presenceActive ? c`
          <nspanel-presence-popup
            .hass=${this.hass}
            .config=${this._config}
            @dismiss=${() => {
      this._presenceActive = !1;
    }}
          ></nspanel-presence-popup>
        ` : ""}

        ${this._trashActive ? c`
          <nspanel-trash-popup
            .events=${this._trashEvents}
            @dismiss=${() => {
      this._trashActive = !1;
    }}
          ></nspanel-trash-popup>
        ` : ""}

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

        ${this._doorbellActive ? c`
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
        return c`<nspanel-page-home    .hass=${e} .config=${t} ?dark=${n}></nspanel-page-home>`;
      case "climate":
        return c`<nspanel-page-climate .hass=${e} .config=${t} ?dark=${n}></nspanel-page-climate>`;
      case "blinds":
        return c`<nspanel-page-blinds  .hass=${e} .config=${t} ?dark=${n}></nspanel-page-blinds>`;
      case "media":
        return c`<nspanel-page-media   .hass=${e} .config=${t} ?dark=${n}></nspanel-page-media>`;
      case "energy":
        return c`<nspanel-page-energy   .hass=${e} .config=${t} ?dark=${n}></nspanel-page-energy>`;
      case "security":
        return c`<nspanel-page-security .hass=${e} .config=${t} ?dark=${n}></nspanel-page-security>`;
      case "wifi":
        return c`<nspanel-page-wifi .config=${t} ?dark=${n}></nspanel-page-wifi>`;
      default:
        return c``;
    }
  }
};
D.styles = [N, M`
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
F([
  w({ attribute: !1 })
], D.prototype, "hass", 2);
F([
  A()
], D.prototype, "_config", 2);
F([
  A()
], D.prototype, "_activePage", 2);
F([
  A()
], D.prototype, "_doorbellActive", 2);
F([
  A()
], D.prototype, "_presenceActive", 2);
F([
  A()
], D.prototype, "_trashActive", 2);
F([
  A()
], D.prototype, "_trashEvents", 2);
F([
  A()
], D.prototype, "_dark", 2);
D = F([
  B("nspanel-dashboard")
], D);
export {
  D as NspanelDashboard
};
