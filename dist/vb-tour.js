import { ref as W, computed as j, openBlock as Et, createElementBlock as It, createElementVNode as P, toDisplayString as mt, withDirectives as rt, vShow as st, normalizeClass as Rt, unref as I, pushScopeId as Mt, popScopeId as Ht, toRef as Wt, watchEffect as jt, onMounted as zt, onUnmounted as Xt, createBlock as Ut, createCommentVNode as Yt } from "vue";
function tt(t) {
  return t.split("-")[1];
}
function St(t) {
  return t === "y" ? "height" : "width";
}
function V(t) {
  return t.split("-")[0];
}
function et(t) {
  return ["top", "bottom"].includes(V(t)) ? "x" : "y";
}
function gt(t, e, o) {
  let { reference: n, floating: s } = t;
  const a = n.x + n.width / 2 - s.width / 2, i = n.y + n.height / 2 - s.height / 2, c = et(e), d = St(c), r = n[d] / 2 - s[d] / 2, u = c === "x";
  let l;
  switch (V(e)) {
    case "top":
      l = { x: a, y: n.y - s.height };
      break;
    case "bottom":
      l = { x: a, y: n.y + n.height };
      break;
    case "right":
      l = { x: n.x + n.width, y: i };
      break;
    case "left":
      l = { x: n.x - s.width, y: i };
      break;
    default:
      l = { x: n.x, y: n.y };
  }
  switch (tt(e)) {
    case "start":
      l[c] -= r * (o && u ? -1 : 1);
      break;
    case "end":
      l[c] += r * (o && u ? -1 : 1);
  }
  return l;
}
const qt = async (t, e, o) => {
  const { placement: n = "bottom", strategy: s = "absolute", middleware: a = [], platform: i } = o, c = a.filter(Boolean), d = await (i.isRTL == null ? void 0 : i.isRTL(e));
  let r = await i.getElementRects({ reference: t, floating: e, strategy: s }), { x: u, y: l } = gt(r, n, d), f = n, p = {}, m = 0;
  for (let g = 0; g < c.length; g++) {
    const { name: h, fn: v } = c[g], { x: y, y: x, data: b, reset: w } = await v({ x: u, y: l, initialPlacement: n, placement: f, strategy: s, middlewareData: p, rects: r, platform: i, elements: { reference: t, floating: e } });
    u = y ?? u, l = x ?? l, p = { ...p, [h]: { ...p[h], ...b } }, w && m <= 50 && (m++, typeof w == "object" && (w.placement && (f = w.placement), w.rects && (r = w.rects === !0 ? await i.getElementRects({ reference: t, floating: e, strategy: s }) : w.rects), { x: u, y: l } = gt(r, f, d)), g = -1);
  }
  return { x: u, y: l, placement: f, strategy: s, middlewareData: p };
};
function Qt(t) {
  return typeof t != "number" ? function(e) {
    return { top: 0, right: 0, bottom: 0, left: 0, ...e };
  }(t) : { top: t, right: t, bottom: t, left: t };
}
function G(t) {
  return { ...t, top: t.y, left: t.x, right: t.x + t.width, bottom: t.y + t.height };
}
async function Lt(t, e) {
  var o;
  e === void 0 && (e = {});
  const { x: n, y: s, platform: a, rects: i, elements: c, strategy: d } = t, { boundary: r = "clippingAncestors", rootBoundary: u = "viewport", elementContext: l = "floating", altBoundary: f = !1, padding: p = 0 } = e, m = Qt(p), g = c[f ? l === "floating" ? "reference" : "floating" : l], h = G(await a.getClippingRect({ element: (o = await (a.isElement == null ? void 0 : a.isElement(g))) == null || o ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(c.floating)), boundary: r, rootBoundary: u, strategy: d })), v = l === "floating" ? { ...i.floating, x: n, y: s } : i.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c.floating)), x = await (a.isElement == null ? void 0 : a.isElement(y)) && await (a.getScale == null ? void 0 : a.getScale(y)) || { x: 1, y: 1 }, b = G(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: v, offsetParent: y, strategy: d }) : v);
  return { top: (h.top - b.top + m.top) / x.y, bottom: (b.bottom - h.bottom + m.bottom) / x.y, left: (h.left - b.left + m.left) / x.x, right: (b.right - h.right + m.right) / x.x };
}
const Zt = Math.min, Gt = Math.max;
function ht(t, e, o) {
  return Gt(t, Zt(e, o));
}
const Jt = ["top", "right", "bottom", "left"];
Jt.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
const Kt = { left: "right", right: "left", bottom: "top", top: "bottom" };
function J(t) {
  return t.replace(/left|right|bottom|top/g, (e) => Kt[e]);
}
function te(t, e, o) {
  o === void 0 && (o = !1);
  const n = tt(t), s = et(t), a = St(s);
  let i = s === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (i = J(i)), { main: i, cross: J(i) };
}
const ee = { start: "end", end: "start" };
function lt(t) {
  return t.replace(/start|end/g, (e) => ee[e]);
}
const ne = function(t) {
  return t === void 0 && (t = {}), { name: "flip", options: t, async fn(e) {
    var o;
    const { placement: n, middlewareData: s, rects: a, initialPlacement: i, platform: c, elements: d } = e, { mainAxis: r = !0, crossAxis: u = !0, fallbackPlacements: l, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...g } = t, h = V(n), v = V(i) === i, y = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), x = l || (v || !m ? [J(i)] : function(_) {
      const S = J(_);
      return [lt(_), S, lt(S)];
    }(i));
    l || p === "none" || x.push(...function(_, S, C, $) {
      const O = tt(_);
      let E = function(H, it, Ct) {
        const dt = ["left", "right"], pt = ["right", "left"], Vt = ["top", "bottom"], Nt = ["bottom", "top"];
        switch (H) {
          case "top":
          case "bottom":
            return Ct ? it ? pt : dt : it ? dt : pt;
          case "left":
          case "right":
            return it ? Vt : Nt;
          default:
            return [];
        }
      }(V(_), C === "start", $);
      return O && (E = E.map((H) => H + "-" + O), S && (E = E.concat(E.map(lt)))), E;
    }(i, m, p, y));
    const b = [i, ...x], w = await Lt(e, g), R = [];
    let F = ((o = s.flip) == null ? void 0 : o.overflows) || [];
    if (r && R.push(w[h]), u) {
      const { main: _, cross: S } = te(n, a, y);
      R.push(w[_], w[S]);
    }
    if (F = [...F, { placement: n, overflows: R }], !R.every((_) => _ <= 0)) {
      var Y, q;
      const _ = (((Y = s.flip) == null ? void 0 : Y.index) || 0) + 1, S = b[_];
      if (S)
        return { data: { index: _, overflows: F }, reset: { placement: S } };
      let C = (q = F.filter(($) => $.overflows[0] <= 0).sort(($, O) => $.overflows[1] - O.overflows[1])[0]) == null ? void 0 : q.placement;
      if (!C)
        switch (f) {
          case "bestFit": {
            var Q;
            const $ = (Q = F.map((O) => [O.placement, O.overflows.filter((E) => E > 0).reduce((E, H) => E + H, 0)]).sort((O, E) => O[1] - E[1])[0]) == null ? void 0 : Q[0];
            $ && (C = $);
            break;
          }
          case "initialPlacement":
            C = i;
        }
      if (n !== C)
        return { reset: { placement: C } };
    }
    return {};
  } };
}, oe = function(t) {
  return t === void 0 && (t = 0), { name: "offset", options: t, async fn(e) {
    const { x: o, y: n } = e, s = await async function(a, i) {
      const { placement: c, platform: d, elements: r } = a, u = await (d.isRTL == null ? void 0 : d.isRTL(r.floating)), l = V(c), f = tt(c), p = et(c) === "x", m = ["left", "top"].includes(l) ? -1 : 1, g = u && p ? -1 : 1, h = typeof i == "function" ? i(a) : i;
      let { mainAxis: v, crossAxis: y, alignmentAxis: x } = typeof h == "number" ? { mainAxis: h, crossAxis: 0, alignmentAxis: null } : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...h };
      return f && typeof x == "number" && (y = f === "end" ? -1 * x : x), p ? { x: y * g, y: v * m } : { x: v * m, y: y * g };
    }(e, t);
    return { x: o + s.x, y: n + s.y, data: s };
  } };
};
function ie(t) {
  return t === "x" ? "y" : "x";
}
const re = function(t) {
  return t === void 0 && (t = {}), { name: "shift", options: t, async fn(e) {
    const { x: o, y: n, placement: s } = e, { mainAxis: a = !0, crossAxis: i = !1, limiter: c = { fn: (h) => {
      let { x: v, y } = h;
      return { x: v, y };
    } }, ...d } = t, r = { x: o, y: n }, u = await Lt(e, d), l = et(V(s)), f = ie(l);
    let p = r[l], m = r[f];
    if (a) {
      const h = l === "y" ? "bottom" : "right";
      p = ht(p + u[l === "y" ? "top" : "left"], p, p - u[h]);
    }
    if (i) {
      const h = f === "y" ? "bottom" : "right";
      m = ht(m + u[f === "y" ? "top" : "left"], m, m - u[h]);
    }
    const g = c.fn({ ...e, [l]: p, [f]: m });
    return { ...g, data: { x: g.x - o, y: g.y - n } };
  } };
};
function T(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function k(t) {
  return T(t).getComputedStyle(t);
}
function At(t) {
  return t instanceof T(t).Node;
}
function B(t) {
  return At(t) ? (t.nodeName || "").toLowerCase() : "";
}
let Z;
function Ft() {
  if (Z)
    return Z;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (Z = t.brands.map((e) => e.brand + "/" + e.version).join(" "), Z) : navigator.userAgent;
}
function A(t) {
  return t instanceof T(t).HTMLElement;
}
function L(t) {
  return t instanceof T(t).Element;
}
function vt(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof T(t).ShadowRoot || t instanceof ShadowRoot;
}
function nt(t) {
  const { overflow: e, overflowX: o, overflowY: n, display: s } = k(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + o) && !["inline", "contents"].includes(s);
}
function se(t) {
  return ["table", "td", "th"].includes(B(t));
}
function at(t) {
  const e = /firefox/i.test(Ft()), o = k(t), n = o.backdropFilter || o.WebkitBackdropFilter;
  return o.transform !== "none" || o.perspective !== "none" || !!n && n !== "none" || e && o.willChange === "filter" || e && !!o.filter && o.filter !== "none" || ["transform", "perspective"].some((s) => o.willChange.includes(s)) || ["paint", "layout", "strict", "content"].some((s) => {
    const a = o.contain;
    return a != null && a.includes(s);
  });
}
function ct() {
  return /^((?!chrome|android).)*safari/i.test(Ft());
}
function ft(t) {
  return ["html", "body", "#document"].includes(B(t));
}
const yt = Math.min, z = Math.max, K = Math.round;
function kt(t) {
  const e = k(t);
  let o = parseFloat(e.width), n = parseFloat(e.height);
  const s = A(t), a = s ? t.offsetWidth : o, i = s ? t.offsetHeight : n, c = K(o) !== a || K(n) !== i;
  return c && (o = a, n = i), { width: o, height: n, fallback: c };
}
function Ot(t) {
  return L(t) ? t : t.contextElement;
}
const $t = { x: 1, y: 1 };
function M(t) {
  const e = Ot(t);
  if (!A(e))
    return $t;
  const o = e.getBoundingClientRect(), { width: n, height: s, fallback: a } = kt(e);
  let i = (a ? K(o.width) : o.width) / n, c = (a ? K(o.height) : o.height) / s;
  return i && Number.isFinite(i) || (i = 1), c && Number.isFinite(c) || (c = 1), { x: i, y: c };
}
function N(t, e, o, n) {
  var s, a;
  e === void 0 && (e = !1), o === void 0 && (o = !1);
  const i = t.getBoundingClientRect(), c = Ot(t);
  let d = $t;
  e && (n ? L(n) && (d = M(n)) : d = M(t));
  const r = c ? T(c) : window, u = ct() && o;
  let l = (i.left + (u && ((s = r.visualViewport) == null ? void 0 : s.offsetLeft) || 0)) / d.x, f = (i.top + (u && ((a = r.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / d.y, p = i.width / d.x, m = i.height / d.y;
  if (c) {
    const g = T(c), h = n && L(n) ? T(n) : n;
    let v = g.frameElement;
    for (; v && n && h !== g; ) {
      const y = M(v), x = v.getBoundingClientRect(), b = getComputedStyle(v);
      x.x += (v.clientLeft + parseFloat(b.paddingLeft)) * y.x, x.y += (v.clientTop + parseFloat(b.paddingTop)) * y.y, l *= y.x, f *= y.y, p *= y.x, m *= y.y, l += x.x, f += x.y, v = T(v).frameElement;
    }
  }
  return G({ width: p, height: m, x: l, y: f });
}
function D(t) {
  return ((At(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function ot(t) {
  return L(t) ? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop } : { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
}
function Pt(t) {
  return N(D(t)).left + ot(t).scrollLeft;
}
function U(t) {
  if (B(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || vt(t) && t.host || D(t);
  return vt(e) ? e.host : e;
}
function Dt(t) {
  const e = U(t);
  return ft(e) ? e.ownerDocument.body : A(e) && nt(e) ? e : Dt(e);
}
function X(t, e) {
  var o;
  e === void 0 && (e = []);
  const n = Dt(t), s = n === ((o = t.ownerDocument) == null ? void 0 : o.body), a = T(n);
  return s ? e.concat(a, a.visualViewport || [], nt(n) ? n : []) : e.concat(n, X(n));
}
function xt(t, e, o) {
  let n;
  if (e === "viewport")
    n = function(i, c) {
      const d = T(i), r = D(i), u = d.visualViewport;
      let l = r.clientWidth, f = r.clientHeight, p = 0, m = 0;
      if (u) {
        l = u.width, f = u.height;
        const g = ct();
        (!g || g && c === "fixed") && (p = u.offsetLeft, m = u.offsetTop);
      }
      return { width: l, height: f, x: p, y: m };
    }(t, o);
  else if (e === "document")
    n = function(i) {
      const c = D(i), d = ot(i), r = i.ownerDocument.body, u = z(c.scrollWidth, c.clientWidth, r.scrollWidth, r.clientWidth), l = z(c.scrollHeight, c.clientHeight, r.scrollHeight, r.clientHeight);
      let f = -d.scrollLeft + Pt(i);
      const p = -d.scrollTop;
      return k(r).direction === "rtl" && (f += z(c.clientWidth, r.clientWidth) - u), { width: u, height: l, x: f, y: p };
    }(D(t));
  else if (L(e))
    n = function(i, c) {
      const d = N(i, !0, c === "fixed"), r = d.top + i.clientTop, u = d.left + i.clientLeft, l = A(i) ? M(i) : { x: 1, y: 1 };
      return { width: i.clientWidth * l.x, height: i.clientHeight * l.y, x: u * l.x, y: r * l.y };
    }(e, o);
  else {
    const i = { ...e };
    if (ct()) {
      var s, a;
      const c = T(t);
      i.x -= ((s = c.visualViewport) == null ? void 0 : s.offsetLeft) || 0, i.y -= ((a = c.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    }
    n = i;
  }
  return G(n);
}
function wt(t, e) {
  return A(t) && k(t).position !== "fixed" ? e ? e(t) : t.offsetParent : null;
}
function bt(t, e) {
  const o = T(t);
  if (!A(t))
    return o;
  let n = wt(t, e);
  for (; n && se(n) && k(n).position === "static"; )
    n = wt(n, e);
  return n && (B(n) === "html" || B(n) === "body" && k(n).position === "static" && !at(n)) ? o : n || function(s) {
    let a = U(s);
    for (; A(a) && !ft(a); ) {
      if (at(a))
        return a;
      a = U(a);
    }
    return null;
  }(t) || o;
}
function le(t, e, o) {
  const n = A(e), s = D(e), a = N(t, !0, o === "fixed", e);
  let i = { scrollLeft: 0, scrollTop: 0 };
  const c = { x: 0, y: 0 };
  if (n || !n && o !== "fixed")
    if ((B(e) !== "body" || nt(s)) && (i = ot(e)), A(e)) {
      const d = N(e, !0);
      c.x = d.x + e.clientLeft, c.y = d.y + e.clientTop;
    } else
      s && (c.x = Pt(s));
  return { x: a.left + i.scrollLeft - c.x, y: a.top + i.scrollTop - c.y, width: a.width, height: a.height };
}
const ae = { getClippingRect: function(t) {
  let { element: e, boundary: o, rootBoundary: n, strategy: s } = t;
  const a = o === "clippingAncestors" ? function(r, u) {
    const l = u.get(r);
    if (l)
      return l;
    let f = X(r).filter((h) => L(h) && B(h) !== "body"), p = null;
    const m = k(r).position === "fixed";
    let g = m ? U(r) : r;
    for (; L(g) && !ft(g); ) {
      const h = k(g), v = at(g);
      h.position === "fixed" && (p = null), (m ? v || p : v || h.position !== "static" || !p || !["absolute", "fixed"].includes(p.position)) ? p = h : f = f.filter((y) => y !== g), g = U(g);
    }
    return u.set(r, f), f;
  }(e, this._c) : [].concat(o), i = [...a, n], c = i[0], d = i.reduce((r, u) => {
    const l = xt(e, u, s);
    return r.top = z(l.top, r.top), r.right = yt(l.right, r.right), r.bottom = yt(l.bottom, r.bottom), r.left = z(l.left, r.left), r;
  }, xt(e, c, s));
  return { width: d.right - d.left, height: d.bottom - d.top, x: d.left, y: d.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t) {
  let { rect: e, offsetParent: o, strategy: n } = t;
  const s = A(o), a = D(o);
  if (o === a)
    return e;
  let i = { scrollLeft: 0, scrollTop: 0 }, c = { x: 1, y: 1 };
  const d = { x: 0, y: 0 };
  if ((s || !s && n !== "fixed") && ((B(o) !== "body" || nt(a)) && (i = ot(o)), A(o))) {
    const r = N(o);
    c = M(o), d.x = r.x + o.clientLeft, d.y = r.y + o.clientTop;
  }
  return { width: e.width * c.x, height: e.height * c.y, x: e.x * c.x - i.scrollLeft * c.x + d.x, y: e.y * c.y - i.scrollTop * c.y + d.y };
}, isElement: L, getDimensions: function(t) {
  return kt(t);
}, getOffsetParent: bt, getDocumentElement: D, getScale: M, async getElementRects(t) {
  let { reference: e, floating: o, strategy: n } = t;
  const s = this.getOffsetParent || bt, a = this.getDimensions;
  return { reference: le(e, await s(o), n), floating: { x: 0, y: 0, ...await a(o) } };
}, getClientRects: (t) => Array.from(t.getClientRects()), isRTL: (t) => k(t).direction === "rtl" };
function ce(t, e, o, n) {
  n === void 0 && (n = {});
  const { ancestorScroll: s = !0, ancestorResize: a = !0, elementResize: i = !0, animationFrame: c = !1 } = n, d = s && !c, r = d || a ? [...L(t) ? X(t) : t.contextElement ? X(t.contextElement) : [], ...X(e)] : [];
  r.forEach((p) => {
    d && p.addEventListener("scroll", o, { passive: !0 }), a && p.addEventListener("resize", o);
  });
  let u, l = null;
  i && (l = new ResizeObserver(() => {
    o();
  }), L(t) && !c && l.observe(t), L(t) || !t.contextElement || c || l.observe(t.contextElement), l.observe(e));
  let f = c ? N(t) : null;
  return c && function p() {
    const m = N(t);
    !f || m.x === f.x && m.y === f.y && m.width === f.width && m.height === f.height || o(), f = m, u = requestAnimationFrame(p);
  }(), o(), () => {
    var p;
    r.forEach((m) => {
      d && m.removeEventListener("scroll", o), a && m.removeEventListener("resize", o);
    }), (p = l) == null || p.disconnect(), l = null, c && cancelAnimationFrame(u);
  };
}
const ue = (t, e, o) => {
  const n = /* @__PURE__ */ new Map(), s = { platform: ae, ...o }, a = { ...s.platform, _c: n };
  return qt(t, e, { ...s, platform: a });
};
var ut = {}, fe = {
  get exports() {
    return ut;
  },
  set exports(t) {
    ut = t;
  }
};
/*!
 * MoveTo - A lightweight scroll animation javascript library without any dependency.
 * Version 1.8.2 (28-06-2019 14:30)
 * Licensed under MIT
 * Copyright 2019 Hasan Aydoğdu <hsnaydd@gmail.com>
 */
(function(t) {
  var e = function() {
    var o = {
      tolerance: 0,
      duration: 800,
      easing: "easeOutQuart",
      container: window,
      callback: function() {
      }
    };
    function n(r, u, l, f) {
      return r /= f, r--, -l * (r * r * r * r - 1) + u;
    }
    function s(r, u) {
      var l = {};
      return Object.keys(r).forEach(function(f) {
        l[f] = r[f];
      }), Object.keys(u).forEach(function(f) {
        l[f] = u[f];
      }), l;
    }
    function a(r) {
      return r.replace(/([A-Z])/g, function(u) {
        return "-" + u.toLowerCase();
      });
    }
    function i(r) {
      return r instanceof HTMLElement ? r.scrollTop : r.pageYOffset;
    }
    function c() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      this.options = s(o, r), this.easeFunctions = s({
        easeOutQuart: n
      }, u);
    }
    c.prototype.registerTrigger = function(r, u) {
      var l = this;
      if (r) {
        var f = r.getAttribute("href") || r.getAttribute("data-target"), p = f && f !== "#" ? document.getElementById(f.substring(1)) : document.body, m = s(this.options, d(r, this.options));
        typeof u == "function" && (m.callback = u);
        var g = function(v) {
          v.preventDefault(), l.move(p, m);
        };
        return r.addEventListener("click", g, !1), function() {
          return r.removeEventListener("click", g, !1);
        };
      }
    }, c.prototype.move = function(r) {
      var u = this, l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (!(r !== 0 && !r)) {
        l = s(this.options, l);
        var f = typeof r == "number" ? r : r.getBoundingClientRect().top, p = i(l.container), m = null, g;
        f -= l.tolerance;
        var h = function v(y) {
          var x = i(u.options.container);
          m || (m = y - 1);
          var b = y - m;
          if (g && (f > 0 && g > x || f < 0 && g < x))
            return l.callback(r);
          g = x;
          var w = u.easeFunctions[l.easing](b, p, f, l.duration);
          l.container.scroll(0, w), b < l.duration ? window.requestAnimationFrame(v) : (l.container.scroll(0, f + p), l.callback(r));
        };
        window.requestAnimationFrame(h);
      }
    }, c.prototype.addEaseFunction = function(r, u) {
      this.easeFunctions[r] = u;
    };
    function d(r, u) {
      var l = {};
      return Object.keys(u).forEach(function(f) {
        var p = r.getAttribute("data-mt-".concat(a(f)));
        p && (l[f] = isNaN(p) ? p : parseInt(p, 10));
      }), l;
    }
    return c;
  }();
  t.exports = e;
})(fe);
const de = ut;
const Bt = (t, e) => {
  const o = t.__vccOpts || t;
  for (const [n, s] of e)
    o[n] = s;
  return o;
}, pe = (t) => (Mt("data-v-f6c3cd49"), t = t(), Ht(), t), me = { class: "h4" }, ge = { class: "text" }, he = { class: "actions" }, ve = /* @__PURE__ */ pe(() => /* @__PURE__ */ P("div", { class: "spacer" }, null, -1)), ye = ["disabled"], xe = {
  __name: "VBTourStep",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      title: String,
      default: ""
    },
    isFirst: {
      type: Boolean,
      default: !1
    },
    isLast: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["next", "previous", "restart", "finish"],
  setup(t, { expose: e }) {
    const o = t, n = W(null), s = j(
      () => o.isLast ? "__vt_btn-success" : "__vt_btn-secondary"
    );
    return e({
      __vt_step: n
    }), (a, i) => (Et(), It("div", {
      ref_key: "__vt_step",
      ref: n,
      class: "__vt_step"
    }, [
      P("div", me, mt(t.title), 1),
      P("div", ge, mt(t.description), 1),
      P("div", he, [
        ve,
        rt(P("button", {
          onClick: i[0] || (i[0] = (c) => a.$emit("restart")),
          class: "__vt_btn-secondary"
        }, " Restart ", 512), [
          [st, t.isLast]
        ]),
        rt(P("button", {
          onClick: i[1] || (i[1] = (c) => a.$emit("previous")),
          class: "__vt_btn-secondary"
        }, " Previous ", 512), [
          [st, !t.isFirst]
        ]),
        P("button", {
          onClick: i[2] || (i[2] = (c) => a.$emit("finish")),
          class: Rt(["__vt_btn", I(s)]),
          disabled: t.isFirst
        }, " Finish ", 10, ye),
        rt(P("button", {
          onClick: i[3] || (i[3] = (c) => a.$emit("next")),
          class: "__vt_btn-primary"
        }, " Next ", 512), [
          [st, t.isFirst || !t.isLast]
        ])
      ])
    ], 512));
  }
}, we = /* @__PURE__ */ Bt(xe, [["__scopeId", "data-v-f6c3cd49"]]), be = {
  placement: "top",
  strategy: "fixed",
  middleware: [re(), ne(), oe(20)]
}, _e = {
  tolerance: 0,
  duration: 10,
  easing: "easeOutQuart",
  container: window
}, _t = {
  NEXT: "NEXT",
  PREV: "PREV",
  FINISH: "FINISH",
  RESTARTED: "RESTARTED"
};
function Te(t, e) {
  const o = (n) => `[🍞] - ${n}`;
  switch (t) {
    case "success":
      return console.log(o(e));
    case "error":
      return console.error(o(e));
    case "warn":
      return console.warn(o(e));
  }
}
const Ee = {
  name: "VTour"
}, Re = /* @__PURE__ */ Object.assign(Ee, {
  props: {
    startPoint: {
      type: Number,
      default: 0
    },
    highlight: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    },
    outlined: {
      type: Boolean,
      default: !1
    },
    tour: {
      type: Array,
      default: () => []
    },
    debugMode: {
      type: Boolean,
      default: !1
    },
    scrollToStep: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["updated"],
  setup(t, { expose: e, emit: o }) {
    const n = t, s = W(0), a = Wt(n, "tour"), i = W(!1), c = W(null), d = W(null), r = new de(_e), u = j(() => a.value[s.value]), l = j(() => s.value === 0), f = j(() => s.value === a.value.length - 1), p = j(() => [
      {
        "vt__animation-highlight": !n.debugMode && n.highlight,
        rounded: n.rounded,
        outlined: n.outlined
      },
      "vt__card-step"
    ]);
    function m(w) {
      return _t[w] || _t.FINISH;
    }
    function g() {
      s.value !== 0 && (s.value -= 1, o("updated", m("PREV")));
    }
    function h() {
      if (s.value === a.value.length - 1) {
        s.value = 0;
        return;
      }
      s.value += 1, o("updated", m("NEXT"));
    }
    function v() {
      s.value = 0, i.value && (i.value = !1), o("updated", m("RESTARTED"));
    }
    function y() {
      i.value = !0, o("updated", m("FINISH"));
    }
    function x(w, R, F) {
      const Y = Object.assign(be, F), q = ({ x: Q, y: _ }) => {
        const S = { top: `${_}px`, left: `${Q}px` };
        Object.assign(R.style, S);
      };
      i.value || (n.scrollToStep && r.move(w), d.value = ce(
        w,
        R,
        () => ue(w, R, Y).then(q)
      ), o("updated", m("NEXT")));
    }
    function b() {
      var F;
      if (!((F = c.value) != null && F.__vt_step))
        return;
      const w = c.value.__vt_step, R = document.querySelector(u.value.ref);
      x(R, w, {
        placement: u.value.position
      });
    }
    return e({
      currentStep: s,
      prevStep: g,
      nextStep: h,
      restartSteps: v,
      finishSteps: y
    }), jt(() => {
      s.value >= 0 && b();
    }), zt(() => {
      if (n.startPoint > n.tour.length) {
        n.debugMode && Te(
          "warn",
          "`start-point` property is invalid - is greater than tour length, zero will be used instead"
        ), s.value = 0;
        return;
      }
      s.value = n.startPoint;
    }), Xt(() => {
      d.value && d.value();
    }), (w, R) => i.value ? Yt("", !0) : (Et(), Ut(we, {
      key: 0,
      ref_key: "__vt_step",
      ref: c,
      title: I(u).title,
      description: I(u).description,
      "is-first": I(l),
      "is-last": I(f),
      class: Rt(I(p)),
      onRestart: v,
      onNext: h,
      onPrevious: g,
      onFinish: y
    }, null, 8, ["title", "description", "is-first", "is-last", "class"]));
  }
}), Tt = /* @__PURE__ */ Bt(Re, [["__scopeId", "data-v-5a0c6711"]]), Le = {
  install(t, e) {
    return t.component(Tt.name, Tt), t;
  }
};
export {
  Tt as VBTour,
  Le as VBTourPlugin
};
