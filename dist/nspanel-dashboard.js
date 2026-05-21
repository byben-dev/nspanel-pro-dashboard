/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = globalThis, mt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bt = Symbol(), At = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, s, a) {
    if (this._$cssResult$ = !0, a !== bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (mt && t === void 0) {
      const a = s !== void 0 && s.length === 1;
      a && (t = At.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), a && At.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wt = (e) => new Bt(typeof e == "string" ? e : e + "", void 0, bt), _ = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((a, r, n) => a + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + e[n + 1], e[0]);
  return new Bt(s, e, bt);
}, Kt = (e, t) => {
  if (mt) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const a = document.createElement("style"), r = st.litNonce;
    r !== void 0 && a.setAttribute("nonce", r), a.textContent = s.cssText, e.appendChild(a);
  }
}, Et = mt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const a of t.cssRules) s += a.cssText;
  return Wt(s);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jt, defineProperty: qt, getOwnPropertyDescriptor: Gt, getOwnPropertyNames: Yt, getOwnPropertySymbols: Zt, getPrototypeOf: Xt } = Object, it = globalThis, Ct = it.trustedTypes, Qt = Ct ? Ct.emptyScript : "", te = it.reactiveElementPolyfillSupport, K = (e, t) => e, rt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Qt : null;
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
} }, _t = (e, t) => !Jt(e, t), St = { attribute: !0, type: String, converter: rt, reflect: !1, useDefault: !1, hasChanged: _t };
Symbol.metadata ??= Symbol("metadata"), it.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let D = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = St) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const a = Symbol(), r = this.getPropertyDescriptor(t, a, s);
      r !== void 0 && qt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, s, a) {
    const { get: r, set: n } = Gt(this.prototype, t) ?? { get() {
      return this[s];
    }, set(i) {
      this[s] = i;
    } };
    return { get: r, set(i) {
      const c = r?.call(this);
      n?.call(this, i), this.requestUpdate(t, c, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? St;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const t = Xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const s = this.properties, a = [...Yt(s), ...Zt(s)];
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
      for (const r of a) s.unshift(Et(r));
    } else t !== void 0 && s.push(Et(t));
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
  attributeChangedCallback(t, s, a) {
    this._$AK(t, a);
  }
  _$ET(t, s) {
    const a = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, a);
    if (r !== void 0 && a.reflect === !0) {
      const n = (a.converter?.toAttribute !== void 0 ? a.converter : rt).toAttribute(s, a.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const a = this.constructor, r = a._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = a.getPropertyOptions(r), i = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : rt;
      this._$Em = r;
      const c = i.fromAttribute(s, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, s, a, r = !1, n) {
    if (t !== void 0) {
      const i = this.constructor;
      if (r === !1 && (n = this[t]), a ??= i.getPropertyOptions(t), !((a.hasChanged ?? _t)(n, s) || a.useDefault && a.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, a)))) return;
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
        const { wrapped: i } = n, c = this[r];
        i !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
D.elementStyles = [], D.shadowRootOptions = { mode: "open" }, D[K("elementProperties")] = /* @__PURE__ */ new Map(), D[K("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: D }), (it.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis, Pt = (e) => e, at = yt.trustedTypes, zt = at ? at.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ut = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, It = "?" + A, ee = `<${It}>`, z = document, J = () => z.createComment(""), q = (e) => e === null || typeof e != "object" && typeof e != "function", xt = Array.isArray, se = (e) => xt(e) || typeof e?.[Symbol.iterator] == "function", vt = `[ 	
\f\r]`, W = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Mt = />/g, S = RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tt = /'/g, Dt = /"/g, Rt = /^(?:script|style|textarea|title)$/i, re = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), l = re(1), F = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ft = /* @__PURE__ */ new WeakMap(), P = z.createTreeWalker(z, 129);
function Vt(e, t) {
  if (!xt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return zt !== void 0 ? zt.createHTML(t) : t;
}
const ae = (e, t) => {
  const s = e.length - 1, a = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = W;
  for (let c = 0; c < s; c++) {
    const o = e[c];
    let p, h, d = -1, v = 0;
    for (; v < o.length && (i.lastIndex = v, h = i.exec(o), h !== null); ) v = i.lastIndex, i === W ? h[1] === "!--" ? i = Ot : h[1] !== void 0 ? i = Mt : h[2] !== void 0 ? (Rt.test(h[2]) && (r = RegExp("</" + h[2], "g")), i = S) : h[3] !== void 0 && (i = S) : i === S ? h[0] === ">" ? (i = r ?? W, d = -1) : h[1] === void 0 ? d = -2 : (d = i.lastIndex - h[2].length, p = h[1], i = h[3] === void 0 ? S : h[3] === '"' ? Dt : Tt) : i === Dt || i === Tt ? i = S : i === Ot || i === Mt ? i = W : (i = S, r = void 0);
    const m = i === S && e[c + 1].startsWith("/>") ? " " : "";
    n += i === W ? o + ee : d >= 0 ? (a.push(p), o.slice(0, d) + Ut + o.slice(d) + A + m) : o + A + (d === -2 ? c : m);
  }
  return [Vt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), a];
};
class G {
  constructor({ strings: t, _$litType$: s }, a) {
    let r;
    this.parts = [];
    let n = 0, i = 0;
    const c = t.length - 1, o = this.parts, [p, h] = ae(t, s);
    if (this.el = G.createElement(p, a), P.currentNode = this.el.content, s === 2 || s === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = P.nextNode()) !== null && o.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Ut)) {
          const v = h[i++], m = r.getAttribute(d).split(A), b = /([.?@])?(.*)/.exec(v);
          o.push({ type: 1, index: n, name: b[2], strings: m, ctor: b[1] === "." ? ie : b[1] === "?" ? oe : b[1] === "@" ? le : ot }), r.removeAttribute(d);
        } else d.startsWith(A) && (o.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Rt.test(r.tagName)) {
          const d = r.textContent.split(A), v = d.length - 1;
          if (v > 0) {
            r.textContent = at ? at.emptyScript : "";
            for (let m = 0; m < v; m++) r.append(d[m], J()), P.nextNode(), o.push({ type: 2, index: ++n });
            r.append(d[v], J());
          }
        }
      } else if (r.nodeType === 8) if (r.data === It) o.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(A, d + 1)) !== -1; ) o.push({ type: 7, index: n }), d += A.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const a = z.createElement("template");
    return a.innerHTML = t, a;
  }
}
function H(e, t, s = e, a) {
  if (t === F) return t;
  let r = a !== void 0 ? s._$Co?.[a] : s._$Cl;
  const n = q(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(e), r._$AT(e, s, a)), a !== void 0 ? (s._$Co ??= [])[a] = r : s._$Cl = r), r !== void 0 && (t = H(e, r._$AS(e, t.values), r, a)), t;
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
    const { el: { content: s }, parts: a } = this._$AD, r = (t?.creationScope ?? z).importNode(s, !0);
    P.currentNode = r;
    let n = P.nextNode(), i = 0, c = 0, o = a[0];
    for (; o !== void 0; ) {
      if (i === o.index) {
        let p;
        o.type === 2 ? p = new Z(n, n.nextSibling, this, t) : o.type === 1 ? p = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (p = new ce(n, this, t)), this._$AV.push(p), o = a[++c];
      }
      i !== o?.index && (n = P.nextNode(), i++);
    }
    return P.currentNode = z, r;
  }
  p(t) {
    let s = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(t, a, s), s += a.strings.length - 2) : a._$AI(t[s])), s++;
  }
}
class Z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, a, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = a, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    const { values: s, _$litType$: a } = t, r = typeof a == "number" ? this._$AC(t) : (a.el === void 0 && (a.el = G.createElement(Vt(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === r) this._$AH.p(s);
    else {
      const n = new ne(r, this), i = n.u(this.options);
      n.p(s), this.T(i), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = Ft.get(t.strings);
    return s === void 0 && Ft.set(t.strings, s = new G(t)), s;
  }
  k(t) {
    xt(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let a, r = 0;
    for (const n of t) r === s.length ? s.push(a = new Z(this.O(J()), this.O(J()), this, this.options)) : a = s[r], a._$AI(n), r++;
    r < s.length && (this._$AR(a && a._$AB.nextSibling, r), s.length = r);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const a = Pt(t).nextSibling;
      Pt(t).remove(), t = a;
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
  constructor(t, s, a, r, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = s, this._$AM = r, this.options = n, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = g;
  }
  _$AI(t, s = this, a, r) {
    const n = this.strings;
    let i = !1;
    if (n === void 0) t = H(this, t, s, 0), i = !q(t) || t !== this._$AH && t !== F, i && (this._$AH = t);
    else {
      const c = t;
      let o, p;
      for (t = n[0], o = 0; o < n.length - 1; o++) p = H(this, c[a + o], s, o), p === F && (p = this._$AH[o]), i ||= !q(p) || p !== this._$AH[o], p === g ? t = g : t !== g && (t += (p ?? "") + n[o + 1]), this._$AH[o] = p;
    }
    i && !r && this.j(t);
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
  constructor(t, s, a, r, n) {
    super(t, s, a, r, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = H(this, t, s, 0) ?? g) === F) return;
    const a = this._$AH, r = t === g && a !== g || t.capture !== a.capture || t.once !== a.once || t.passive !== a.passive, n = t !== g && (a === g || r);
    r && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ce {
  constructor(t, s, a) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const pe = yt.litHtmlPolyfillSupport;
pe?.(G, Z), (yt.litHtmlVersions ??= []).push("3.3.3");
const de = (e, t, s) => {
  const a = s?.renderBefore ?? t;
  let r = a._$litPart$;
  if (r === void 0) {
    const n = s?.renderBefore ?? null;
    a._$litPart$ = r = new Z(t.insertBefore(J(), n), n, void 0, s ?? {});
  }
  return r._$AI(e), r;
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
  const { kind: a, metadata: r } = s;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), a === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), a === "accessor") {
    const { name: i } = s;
    return { set(c) {
      const o = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(i, o, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(i, void 0, e, c), c;
    } };
  }
  if (a === "setter") {
    const { name: i } = s;
    return function(c) {
      const o = this[i];
      t.call(this, c), this.requestUpdate(i, o, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function u(e) {
  return (t, s) => typeof s == "object" ? ve(e, t, s) : ((a, r, n) => {
    const i = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, a), i ? Object.getOwnPropertyDescriptor(r, n) : void 0;
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
`, X = _`
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
var ge = Object.defineProperty, fe = Object.getOwnPropertyDescriptor, lt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? fe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && ge(t, s, r), r;
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
let j = class extends f {
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
j.styles = [w, _`
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
], j.prototype, "pages", 2);
lt([
  u({ type: String })
], j.prototype, "activePage", 2);
lt([
  u({ attribute: !1 })
], j.prototype, "customLabels", 2);
j = lt([
  y("nspanel-bottom-nav")
], j);
var be = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, M = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? _e(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && be(t, s, r), r;
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
    const s = t.lastIndexOf("="), a = t.slice(0, s).split(",").map((n) => n.trim().toLowerCase()).filter(Boolean), r = t.slice(s + 1).trim() || "🗑️";
    return { keywords: a, icon: r };
  });
}
function tt(e, t) {
  const s = $e(t ?? xe), a = e.toLowerCase();
  for (const r of s)
    if (r.keywords.some((n) => a.includes(n))) return r.icon;
  return "🗑️";
}
function gt(e) {
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
    const r = parseInt(t.state, 10);
    if (!isNaN(r) && String(r) === t.state.trim()) {
      const i = t.attributes.message, c = r === 0 ? "Heute" : r === 1 ? "Morgen" : `+${r}d`;
      this._trashChip = `${i ? tt(i, s) : "🗑️"} ${c}`;
      return;
    }
    const n = new Date(t.state);
    isNaN(n.getTime()) || (this._trashChip = `🗑️ ${gt(n)}`);
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = e.weather_entity ? t?.states[e.weather_entity] : null, a = s?.attributes.temperature, r = s ? ye[s.state] ?? "🌡️" : null;
    return l`
      <div class="bar ${this.dark ? "nsp-dark" : ""}">
        <div class="left">
          <span class="time">${this._time}</span>
          <span class="date">${this._date}</span>
        </div>
        <div class="right">
          ${r ? l`<span class="chip">${r}${a != null ? ` ${Math.round(a)}°` : ""}</span>` : ""}
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
var we = Object.defineProperty, ke = Object.getOwnPropertyDescriptor, wt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? ke(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && we(t, s, r), r;
};
let Y = class extends f {
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
Y.styles = [w, _`
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
], Y.prototype, "hass", 2);
wt([
  u({ type: String })
], Y.prototype, "cameraEntity", 2);
Y = wt([
  y("nspanel-doorbell-popup")
], Y);
var Ae = Object.defineProperty, Ee = Object.getOwnPropertyDescriptor, I = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Ee(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ae(t, s, r), r;
};
function Ce(e) {
  if (e.start.date) return "Ganztag";
  const t = new Date(e.start.dateTime), s = e.end.dateTime ? new Date(e.end.dateTime) : null, a = (r) => r.toLocaleTimeString("de-AT", { hour: "2-digit", minute: "2-digit" });
  return s ? `${a(t)} – ${a(s)}` : a(t);
}
const Se = {
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
    const e = this.config ?? {}, t = this.hass, s = e.garden_light ? t?.states[e.garden_light] : null, a = e.light_2 ? t?.states[e.light_2] : null, r = e.vacuum_entity ? t?.states[e.vacuum_entity] : null, n = e.dishwasher_entity ? t?.states[e.dishwasher_entity] : null, i = n && parseFloat(n.state) || 0, c = i > 0 && this._dishMax > 0 ? Math.round(Math.max(0, Math.min((1 - i / this._dishMax) * 100, 100))) : 0;
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
                    <div class="event-time">${Ce(o)}</div>
                  </div>
                </div>
              `) : l`<div class="no-events">Keine Termine heute</div>`}
          </div>
        ` : l`<div class="spacer"></div>`}

        ${s || a ? l`
          <div class="lights-row">
            ${s ? this._renderLight(e.garden_light, s, e.garden_light_icon ?? "💡") : ""}
            ${a ? this._renderLight(e.light_2, a, e.light_2_icon ?? "💡") : ""}
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
    const a = t.state === "on", r = t.attributes.friendly_name ?? e.split(".")[1];
    return l`
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
    const s = t.state, a = Se[s] ?? s, r = s === "cleaning" || s === "returning" || s === "paused", n = s !== "error" && s !== "returning";
    return l`
      <button class="vacuum-btn ${r ? "active" : ""}"
        @click=${n ? () => this._vacuumAction(e, s) : void 0}
        ?disabled=${!n}>
        <span class="vacuum-icon">🤖</span>
        <span class="vacuum-label">${a}</span>
        ${n ? l`
          <div class="vacuum-action ${r ? "stop" : "start"}">${r ? "⏹" : "▶"}</div>
        ` : ""}
      </button>
    `;
  }
};
E.styles = [w, X, _`
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
I([
  u({ attribute: !1 })
], E.prototype, "hass", 2);
I([
  u({ attribute: !1 })
], E.prototype, "config", 2);
I([
  u({ type: Boolean })
], E.prototype, "dark", 2);
I([
  x()
], E.prototype, "_calEvents", 2);
I([
  x()
], E.prototype, "_dishMax", 2);
E = I([
  y("nspanel-page-home")
], E);
var Pe = Object.defineProperty, ze = Object.getOwnPropertyDescriptor, ct = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? ze(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Pe(t, s, r), r;
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
    const s = t.attributes.current_temperature, a = t.attributes.temperature, r = t.state, n = r === "heat";
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
N.styles = [w, X, _`
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
], N.prototype, "hass", 2);
ct([
  u({ attribute: !1 })
], N.prototype, "config", 2);
ct([
  u({ type: Boolean })
], N.prototype, "dark", 2);
N = ct([
  y("nspanel-page-climate")
], N);
var Oe = Object.defineProperty, Me = Object.getOwnPropertyDescriptor, Q = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Me(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Oe(t, s, r), r;
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
    for (const a of Object.keys(t)) {
      const r = this.hass.states[a];
      if (!r) continue;
      const n = t[a], i = r.state, c = r.attributes.current_position, o = this._movingFrom[a];
      (n === "up" ? i === "open" || c === 100 : n === "down" ? i === "closed" || c === 0 : !1) && i !== o && (delete t[a], delete this._movingFrom[a], s = !0);
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
    const e = this.config ?? {}, t = this.hass, s = Te.map((a) => e[a]).filter((a) => !!a);
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="covers-list">
          ${s.map((a) => {
      const r = t?.states[a];
      if (!r) return l``;
      const n = r.attributes.friendly_name ?? a, i = r.attributes.current_position, c = i != null ? 100 - i : null, o = this._moving[a], p = i != null ? `${i}%` : r.state === "open" ? "Offen" : r.state === "closed" ? "Zu" : "–", h = r.state === "open" ? "st-open" : r.state === "closed" ? "st-closed" : "st-mid";
      return l`
              <div class="cover-row">
                ${c != null ? l`
                  <div class="pos-bar" style="width:${c}%"></div>
                ` : ""}
                <div class="cover-name">${n}</div>
                <div class="cover-pos ${h}">${p}</div>
                <button class="cov-btn ${o === "up" ? "active" : ""}"
                  @click=${() => this._cover(a, o === "up" ? "stop_cover" : "open_cover")}
                  aria-label="${o === "up" ? "Stop" : "Öffnen"}">${o === "up" ? "■" : "▲"}</button>
                <button class="cov-btn ${o === "down" ? "active" : ""}"
                  @click=${() => this._cover(a, o === "down" ? "stop_cover" : "close_cover")}
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
O.styles = [w, X, _`
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
Q([
  u({ attribute: !1 })
], O.prototype, "hass", 2);
Q([
  u({ attribute: !1 })
], O.prototype, "config", 2);
Q([
  u({ type: Boolean })
], O.prototype, "dark", 2);
Q([
  x()
], O.prototype, "_moving", 2);
O = Q([
  y("nspanel-page-blinds")
], O);
var De = Object.defineProperty, Fe = Object.getOwnPropertyDescriptor, pt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Fe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && De(t, s, r), r;
};
function jt(e) {
  return `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
}
let L = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
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
    if (!t) return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}"><div class="empty">Kein Media Player konfiguriert</div></div>
    `;
    const s = t.state === "playing", a = t.attributes.media_title ?? "", r = t.attributes.media_artist ?? "", n = t.attributes.entity_picture ?? "", i = t.attributes.volume_level ?? 0.5, c = t.attributes.media_duration ?? 0, o = t.attributes.media_position ?? 0, p = t.attributes.media_position_updated_at ?? "";
    let h = o;
    s && p && (h = Math.min(o + (Date.now() - new Date(p).getTime()) / 1e3, c));
    const d = c > 0 ? h / c : 0;
    return l`
      <div class="page ${this.dark ? "nsp-dark" : ""}">
        <div class="art-wrap">
          ${n ? l`<img class="art" src="${n}" alt="cover" />` : l`<div class="art art-empty">♪</div>`}
        </div>

        <div class="track-info">
          <div class="track-title">${a || (t.state === "off" ? "Aus" : "Kein Titel")}</div>
          ${r ? l`<div class="track-artist">${r}</div>` : ""}
        </div>

        ${c > 0 ? l`
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${d * 100}%"></div>
            </div>
            <div class="progress-times">
              <span>${jt(h)}</span>
              <span>${jt(c)}</span>
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
L.styles = [w, X, _`
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
var He = Object.defineProperty, je = Object.getOwnPropertyDescriptor, dt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? je(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && He(t, s, r), r;
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
    const e = this.config ?? {}, t = this.hass, s = e.pv_entity ? t?.states[e.pv_entity] : null, a = e.grid_entity ? t?.states[e.grid_entity] : null, r = e.ev_entity ? t?.states[e.ev_entity] : null, n = e.pv_today_entity ? t?.states[e.pv_today_entity] : null, i = e.forecast_today_entity ? t?.states[e.forecast_today_entity] : null, c = e.forecast_tomorrow_entity ? t?.states[e.forecast_tomorrow_entity] : null, o = s ? parseFloat(s.state) : null, p = a ? parseFloat(a.state) : null, h = r ? parseFloat(r.state) : null, d = n ? parseFloat(n.state) : null, v = i ? parseFloat(i.state) : null, m = c ? parseFloat(c.state) : null, b = p != null && p < 0, $ = o != null && p != null ? o + (b ? p : 0) + (b ? 0 : p) : null, T = v != null && v > 0 && d != null ? Math.min(d / v, 1) : null, V = v != null || m != null;
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
B.styles = [w, X, _`
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
var Ne = Object.defineProperty, Le = Object.getOwnPropertyDescriptor, ht = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Le(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ne(t, s, r), r;
};
const Be = ["camera_1", "camera_2", "camera_3", "camera_4"];
let U = class extends f {
  constructor() {
    super(...arguments), this.dark = !1;
  }
  render() {
    const e = this.config ?? {}, t = this.hass, s = !!e.cameras_portrait, a = Be.map((n) => e[n]).filter((n) => !!n);
    if (a.length === 0)
      return l`
        <div class="page ${this.dark ? "nsp-dark" : ""}">
          <div class="empty">Keine Kameras konfiguriert</div>
        </div>
      `;
    const r = `page ${this.dark ? "nsp-dark" : ""} count-${a.length} ${s ? "portrait" : ""}`;
    return l`
      <div class="${r}">
        ${a.map((n) => {
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
U.styles = [w, _`
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
], U.prototype, "hass", 2);
ht([
  u({ attribute: !1 })
], U.prototype, "config", 2);
ht([
  u({ type: Boolean })
], U.prototype, "dark", 2);
U = ht([
  y("nspanel-page-security")
], U);
var Ue = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, kt = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Ie(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ue(t, s, r), r;
};
const Nt = {
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
], Ve = [
  { name: "thermostat_entity", label: "Thermostat (climate.*)", selector: { entity: { domain: "climate" } } }
], We = [
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
], Ke = [
  { name: "media_player", label: "Media Player (media_player.*)", selector: { entity: { domain: "media_player" } } }
], Je = [
  { name: "pv_entity", label: "PV Erzeugung (sensor.*, W oder kW)", selector: { entity: { domain: "sensor" } } },
  { name: "grid_entity", label: "Netzbezug/-einspeisung (sensor.*, W oder kW — negativ = Einspeisung)", selector: { entity: { domain: "sensor" } } },
  { name: "ev_entity", label: "EV / Akku SoC in % (sensor.*) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "pv_today_entity", label: "PV Tagesertrag (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_today_entity", label: "Prognose Heute (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } },
  { name: "forecast_tomorrow_entity", label: "Prognose Morgen (sensor.*, kWh) — optional", selector: { entity: { domain: "sensor" } } }
], qe = [
  { name: "camera_1", label: "Kamera 1 (camera.*)", selector: { entity: { domain: "camera" } } },
  { name: "camera_2", label: "Kamera 2 (camera.*) — optional", selector: { entity: { domain: "camera" } } },
  { name: "camera_3", label: "Kamera 3 (camera.*) — optional", selector: { entity: { domain: "camera" } } },
  { name: "camera_4", label: "Kamera 4 (camera.*) — optional", selector: { entity: { domain: "camera" } } }
], Ge = [
  { name: "doorbell_trigger", label: "Klingel-Auslöser (binary_sensor.* oder input_boolean.*)", selector: { entity: { domain: ["binary_sensor", "input_boolean"] } } },
  { name: "doorbell_camera", label: "Kamera für Livestream (camera.*)", selector: { entity: { domain: "camera" } } }
], Ye = (e) => e.label ?? e.name;
let nt = class extends f {
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
  _setPortrait(e) {
    this._config = { ...this._config, cameras_portrait: e }, this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: !0,
      composed: !0
    }));
  }
  _form(e) {
    return l`
      <ha-form .hass=${this.hass} .data=${this._config} .schema=${e}
        .computeLabel=${Ye} @value-changed=${this._merge}></ha-form>
    `;
  }
  render() {
    if (!this._config) return l``;
    const e = this._config, t = e.pages ?? ["home"], s = (r) => `${r}_label`, a = (r) => e[s(r)] ?? "";
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
        .nsp-toggle-row { display:flex; align-items:center; justify-content:space-between;
          padding:8px 0; font-size:14px; color:var(--primary-text-color); }
      </style>

      <div class="nsp-sec">Seiten</div>
      <div class="nsp-chips">
        ${Lt.map((r) => l`
          <button class="nsp-chip ${t.includes(r.id) ? "active" : ""}"
            @click=${() => this._togglePage(r.id)}>
            ${a(r.id) || Nt[r.id]}
          </button>
        `)}
      </div>
      <details class="nsp-details">
        <summary>Tab-Namen anpassen</summary>
        <div class="nsp-details-body">
          ${this._form(Lt.map((r) => ({
      name: `${r.id}_label`,
      label: `${Nt[r.id]} — benutzerdefinierter Name`,
      selector: { text: {} }
    })))}
        </div>
      </details>

      <div class="nsp-sec">Home</div>
      ${this._form(Re)}
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
      ${this._form(Ve)}

      <div class="nsp-sec">Cover / Jalousien</div>
      ${this._form(We)}

      <div class="nsp-sec">Media</div>
      ${this._form(Ke)}

      <div class="nsp-sec">Energie</div>
      ${this._form(Je)}

      <div class="nsp-sec">Security</div>
      ${this._form(qe)}
      <div class="nsp-toggle-row">
        <span>Hochformat (9:16)</span>
        <ha-switch
          ?checked=${!!e.cameras_portrait}
          @change=${(r) => this._setPortrait(r.target.checked)}
        ></ha-switch>
      </div>

      <div class="nsp-sec">Türklingel</div>
      ${this._form(Ge)}

      <div class="nsp-sec">Hintergrund</div>
      ${this._form([
      { name: "bg_accent_1", label: "Glow-Farbe 1 (Hex, z.B. #0A84FF — leer = iOS Blau)", selector: { text: {} } },
      { name: "bg_accent_2", label: "Glow-Farbe 2 (Hex, z.B. #BF5AF2 — leer = iOS Lila)", selector: { text: {} } }
    ])}
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
var Ze = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, R = (e, t, s, a) => {
  for (var r = a > 1 ? void 0 : a ? Xe(t, s) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (r = (a ? i(t, s, r) : i(r)) || r);
  return a && r && Ze(t, s, r), r;
};
let C = class extends f {
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
    if (!this._config) return l``;
    const e = this._dark, t = e ? 0.18 : 0.09, s = this._glowVar(this._config.bg_accent_1, t), a = this._glowVar(this._config.bg_accent_2, t), r = [s ? `--nsp-glow-1:${s}` : "", a ? `--nsp-glow-2:${a}` : ""].filter(Boolean).join(";");
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
C.styles = [w, _`
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
], C.prototype, "hass", 2);
R([
  x()
], C.prototype, "_config", 2);
R([
  x()
], C.prototype, "_activePage", 2);
R([
  x()
], C.prototype, "_doorbellActive", 2);
R([
  x()
], C.prototype, "_dark", 2);
C = R([
  y("nspanel-dashboard")
], C);
export {
  C as NspanelDashboard
};
