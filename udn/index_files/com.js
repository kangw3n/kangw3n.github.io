! function(a) {
  "use strict";
  var a;
  a.matchMedia = a.matchMedia || function(a) {
    var b, c = a.documentElement,
      d = c.firstElementChild || c.firstChild,
      e = a.createElement("body"),
      f = a.createElement("div");
    return f.id = "mq-test-1", f.style.cssText = "position:absolute;top:-100em", e.style.background = "none", e.appendChild(f),
      function(a) {
        return f.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', c.insertBefore(e, d), b = 42 === f.offsetWidth, c.removeChild(e), {
          matches: b,
          media: a
        }
      }
  }(a.document)
}(this),
function(a) {
  "use strict";

  function b() {
    v(!0)
  }
  var c = {};
  a.respond = c, c.update = function() {};
  var d = [],
    e = function() {
      var b = !1;
      try {
        b = new a.XMLHttpRequest
      } catch (c) {
        b = new a.ActiveXObject("Microsoft.XMLHTTP")
      }
      return function() {
        return b
      }
    }(),
    f = function(a, b) {
      var c = e();
      c && (c.open("GET", a, !0), c.onreadystatechange = function() {
        4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText)
      }, 4 !== c.readyState && c.send(null))
    },
    g = function(a) {
      return a.replace(c.regex.minmaxwh, "").match(c.regex.other)
    };
  if (c.ajax = f, c.queue = d, c.unsupportedmq = g, c.regex = {
      media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
      keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
      comments: /\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,
      urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
      findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
      only: /(only\s+)?([a-zA-Z]+)\s?/,
      minw: /\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
      maxw: /\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,
      minmaxwh: /\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,
      other: /\([^\)]*\)/g
    }, c.mediaQueriesSupported = a.matchMedia && null !== a.matchMedia("only all") && a.matchMedia("only all").matches, !c.mediaQueriesSupported) {
    var h, i, j, k = a.document,
      l = k.documentElement,
      m = [],
      n = [],
      o = [],
      p = {},
      q = 30,
      r = k.getElementsByTagName("head")[0] || l,
      s = k.getElementsByTagName("base")[0],
      t = r.getElementsByTagName("link"),
      u = function() {
        var a, b = k.createElement("div"),
          c = k.body,
          d = l.style.fontSize,
          e = c && c.style.fontSize,
          f = !1;
        return b.style.cssText = "position:absolute;font-size:1em;width:1em", c || (c = f = k.createElement("body"), c.style.background = "none"), l.style.fontSize = "100%", c.style.fontSize = "100%", c.appendChild(b), f && l.insertBefore(c, l.firstChild), a = b.offsetWidth, f ? l.removeChild(c) : c.removeChild(b), l.style.fontSize = d, e && (c.style.fontSize = e), a = j = parseFloat(a)
      },
      v = function(b) {
        var c = "clientWidth",
          d = l[c],
          e = "CSS1Compat" === k.compatMode && d || k.body[c] || d,
          f = {},
          g = t[t.length - 1],
          p = (new Date).getTime();
        if (b && h && q > p - h) return a.clearTimeout(i), i = a.setTimeout(v, q), void 0;
        h = p;
        for (var s in m)
          if (m.hasOwnProperty(s)) {
            var w = m[s],
              x = w.minw,
              y = w.maxw,
              z = null === x,
              A = null === y,
              B = "em";
            x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? j || u() : 1)), y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? j || u() : 1)), w.hasquery && (z && A || !(z || e >= x) || !(A || y >= e)) || (f[w.media] || (f[w.media] = []), f[w.media].push(n[w.rules]))
          }
        for (var C in o) o.hasOwnProperty(C) && o[C] && o[C].parentNode === r && r.removeChild(o[C]);
        o.length = 0;
        for (var D in f)
          if (f.hasOwnProperty(D)) {
            var E = k.createElement("style"),
              F = f[D].join("\n");
            E.type = "text/css", E.media = D, r.insertBefore(E, g.nextSibling), E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(k.createTextNode(F)), o.push(E)
          }
      },
      w = function(a, b, d) {
        var e = a.replace(c.regex.comments, "").replace(c.regex.keyframes, "").match(c.regex.media),
          f = e && e.length || 0;
        b = b.substring(0, b.lastIndexOf("/"));
        var h = function(a) {
            return a.replace(c.regex.urls, "$1" + b + "$2$3")
          },
          i = !f && d;
        b.length && (b += "/"), i && (f = 1);
        for (var j = 0; f > j; j++) {
          var k, l, o, p;
          i ? (k = d, n.push(h(a))) : (k = e[j].match(c.regex.findStyles) && RegExp.$1, n.push(RegExp.$2 && h(RegExp.$2))), o = k.split(","), p = o.length;
          for (var q = 0; p > q; q++) l = o[q], g(l) || m.push({
            media: l.split("(")[0].match(c.regex.only) && RegExp.$2 || "all",
            rules: n.length - 1,
            hasquery: l.indexOf("(") > -1,
            minw: l.match(c.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
            maxw: l.match(c.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
          })
        }
        v()
      },
      x = function() {
        if (d.length) {
          var b = d.shift();
          f(b.href, function(c) {
            w(c, b.href, b.media), p[b.href] = !0, a.setTimeout(function() {
              x()
            }, 0)
          })
        }
      },
      y = function() {
        for (var b = 0; b < t.length; b++) {
          var c = t[b],
            e = c.href,
            f = c.media,
            g = c.rel && "stylesheet" === c.rel.toLowerCase();
          e && g && !p[e] && (c.styleSheet && c.styleSheet.rawCssText ? (w(c.styleSheet.rawCssText, e, f), p[e] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(e) && !s || e.replace(RegExp.$1, "").split("/")[0] === a.location.host) && ("//" === e.substring(0, 2) && (e = a.location.protocol + e), d.push({
            href: e,
            media: f
          })))
        }
        x()
      };
    y(), c.update = y, c.getEmValue = u, a.addEventListener ? a.addEventListener("resize", b, !1) : a.attachEvent && a.attachEvent("onresize", b)
  }
}(this);
! function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
    d = c.slice,
    e = c.concat,
    f = c.push,
    g = c.indexOf,
    h = {},
    i = h.toString,
    j = h.hasOwnProperty,
    k = {},
    l = "1.11.1",
    m = function(a, b) {
      return new m.fn.init(a, b)
    },
    n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    o = /^-ms-/,
    p = /-([\da-z])/gi,
    q = function(a, b) {
      return b.toUpperCase()
    };
  m.fn = m.prototype = {
    jquery: l,
    constructor: m,
    selector: "",
    length: 0,
    toArray: function() {
      return d.call(this)
    },
    get: function(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
    },
    pushStack: function(a) {
      var b = m.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function(a, b) {
      return m.each(this, a, b)
    },
    map: function(a) {
      return this.pushStack(m.map(this, function(b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function() {
      return this.pushStack(d.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: f,
    sort: c.sort,
    splice: c.splice
  }, m.extend = m.fn.extend = function() {
    var a, b, c, d, e, f, g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (e = arguments[h]))
        for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
    return g
  }, m.extend({
    expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(a) {
      throw new Error(a)
    },
    noop: function() {},
    isFunction: function(a) {
      return "function" === m.type(a)
    },
    isArray: Array.isArray || function(a) {
      return "array" === m.type(a)
    },
    isWindow: function(a) {
      return null != a && a == a.window
    },
    isNumeric: function(a) {
      return !m.isArray(a) && a - parseFloat(a) >= 0
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    isPlainObject: function(a) {
      var b;
      if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
      try {
        if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
      } catch (c) {
        return !1
      }
      if (k.ownLast)
        for (b in a) return j.call(a, b);
      for (b in a);
      return void 0 === b || j.call(a, b)
    },
    type: function(a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
    },
    globalEval: function(b) {
      b && m.trim(b) && (a.execScript || function(b) {
        a.eval.call(a, b)
      })(b)
    },
    camelCase: function(a) {
      return a.replace(o, "ms-").replace(p, q)
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function(a, b, c) {
      var d, e = 0,
        f = a.length,
        g = r(a);
      if (c) {
        if (g) {
          for (; f > e; e++)
            if (d = b.apply(a[e], c), d === !1) break
        } else
          for (e in a)
            if (d = b.apply(a[e], c), d === !1) break
      } else if (g) {
        for (; f > e; e++)
          if (d = b.call(a[e], e, a[e]), d === !1) break
      } else
        for (e in a)
          if (d = b.call(a[e], e, a[e]), d === !1) break; return a
    },
    trim: function(a) {
      return null == a ? "" : (a + "").replace(n, "")
    },
    makeArray: function(a, b) {
      var c = b || [];
      return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
    },
    inArray: function(a, b, c) {
      var d;
      if (b) {
        if (g) return g.call(b, a, c);
        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
          if (c in b && b[c] === a) return c
      }
      return -1
    },
    merge: function(a, b) {
      var c = +b.length,
        d = 0,
        e = a.length;
      while (c > d) a[e++] = b[d++];
      if (c !== c)
        while (void 0 !== b[d]) a[e++] = b[d++];
      return a.length = e, a
    },
    grep: function(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
      return e
    },
    map: function(a, b, c) {
      var d, f = 0,
        g = a.length,
        h = r(a),
        i = [];
      if (h)
        for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
      else
        for (f in a) d = b(a[f], f, c), null != d && i.push(d);
      return e.apply([], i)
    },
    guid: 1,
    proxy: function(a, b) {
      var c, e, f;
      return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
        return a.apply(b || this, c.concat(d.call(arguments)))
      }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
    },
    now: function() {
      return +new Date
    },
    support: k
  }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    h["[object " + b + "]"] = b.toLowerCase()
  });

  function r(a) {
    var b = a.length,
      c = m.type(a);
    return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var s = function(a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date,
      v = a.document,
      w = 0,
      x = 0,
      y = gb(),
      z = gb(),
      A = gb(),
      B = function(a, b) {
        return a === b && (l = !0), 0
      },
      C = "undefined",
      D = 1 << 31,
      E = {}.hasOwnProperty,
      F = [],
      G = F.pop,
      H = F.push,
      I = F.push,
      J = F.slice,
      K = F.indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (this[b] === a) return b;
        return -1
      },
      L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      M = "[\\x20\\t\\r\\n\\f]",
      N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      O = N.replace("w", "w#"),
      P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]",
      Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
      R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
      S = new RegExp("^" + M + "*," + M + "*"),
      T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
      U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
      V = new RegExp(Q),
      W = new RegExp("^" + O + "$"),
      X = {
        ID: new RegExp("^#(" + N + ")"),
        CLASS: new RegExp("^\\.(" + N + ")"),
        TAG: new RegExp("^(" + N.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + P),
        PSEUDO: new RegExp("^" + Q),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + L + ")$", "i"),
        needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
      },
      Y = /^(?:input|select|textarea|button)$/i,
      Z = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ab = /[+~]/,
      bb = /'|\\/g,
      cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
      db = function(a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      };
    try {
      I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType
    } catch (eb) {
      I = {
        apply: F.length ? function(a, b) {
          H.apply(a, J.call(b))
        } : function(a, b) {
          var c = a.length,
            d = 0;
          while (a[c++] = b[d++]);
          a.length = c - 1
        }
      }
    }

    function fb(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w, x;
      if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a) return d;
      if (1 !== (k = b.nodeType) && 9 !== k) return [];
      if (p && !e) {
        if (f = _.exec(a))
          if (j = f[1]) {
            if (9 === k) {
              if (h = b.getElementById(j), !h || !h.parentNode) return d;
              if (h.id === j) return d.push(h), d
            } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
          } else {
            if (f[2]) return I.apply(d, b.getElementsByTagName(a)), d;
            if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return I.apply(d, b.getElementsByClassName(j)), d
          }
        if (c.qsa && (!q || !q.test(a))) {
          if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
            while (l--) o[l] = s + qb(o[l]);
            w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",")
          }
          if (x) try {
            return I.apply(d, w.querySelectorAll(x)), d
          } catch (y) {} finally {
            r || b.removeAttribute("id")
          }
        }
      }
      return i(a.replace(R, "$1"), b, d, e)
    }

    function gb() {
      var a = [];

      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
      }
      return b
    }

    function hb(a) {
      return a[u] = !0, a
    }

    function ib(a) {
      var b = n.createElement("div");
      try {
        return !!a(b)
      } catch (c) {
        return !1
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function jb(a, b) {
      var c = a.split("|"),
        e = a.length;
      while (e--) d.attrHandle[c[e]] = b
    }

    function kb(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D);
      if (d) return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function lb(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function mb(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function nb(a) {
      return hb(function(b) {
        return b = +b, hb(function(c, d) {
          var e, f = a([], c.length, b),
            g = f.length;
          while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function ob(a) {
      return a && typeof a.getElementsByTagName !== C && a
    }
    c = fb.support = {}, f = fb.isXML = function(a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, m = fb.setDocument = function(a) {
      var b, e = a ? a.ownerDocument || a : v,
        g = e.defaultView;
      return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function() {
        m()
      }, !1) : g.attachEvent && g.attachEvent("onunload", function() {
        m()
      })), c.attributes = ib(function(a) {
        return a.className = "i", !a.getAttribute("className")
      }), c.getElementsByTagName = ib(function(a) {
        return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length
      }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function(a) {
        return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
      }), c.getById = ib(function(a) {
        return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length
      }), c.getById ? (d.find.ID = function(a, b) {
        if (typeof b.getElementById !== C && p) {
          var c = b.getElementById(a);
          return c && c.parentNode ? [c] : []
        }
      }, d.filter.ID = function(a) {
        var b = a.replace(cb, db);
        return function(a) {
          return a.getAttribute("id") === b
        }
      }) : (delete d.find.ID, d.filter.ID = function(a) {
        var b = a.replace(cb, db);
        return function(a) {
          var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
        return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0
      } : function(a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++]) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
        return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0
      }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function(a) {
        a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked")
      }), ib(function(a) {
        var b = e.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function(a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q)
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function(a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a) return !0;
        return !1
      }, B = b ? function(a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1)
      } : function(a, b) {
        if (a === b) return l = !0, 0;
        var c, d = 0,
          f = a.parentNode,
          g = b.parentNode,
          h = [a],
          i = [b];
        if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0;
        if (f === g) return kb(a, b);
        c = a;
        while (c = c.parentNode) h.unshift(c);
        c = b;
        while (c = c.parentNode) i.unshift(c);
        while (h[d] === i[d]) d++;
        return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
      }, e) : n
    }, fb.matches = function(a, b) {
      return fb(a, null, null, b)
    }, fb.matchesSelector = function(a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      } catch (e) {}
      return fb(b, n, null, [a]).length > 0
    }, fb.contains = function(a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b)
    }, fb.attr = function(a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
        f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
    }, fb.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, fb.uniqueSort = function(a) {
      var b, d = [],
        e = 0,
        f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) b === a[f] && (e = d.push(f));
        while (e--) a.splice(d[e], 1)
      }
      return k = null, a
    }, e = fb.getText = function(a) {
      var b, c = "",
        d = 0,
        f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
        } else if (3 === f || 4 === f) return a.nodeValue
      } else
        while (b = a[d++]) c += e(b);
      return c
    }, d = fb.selectors = {
      cacheLength: 50,
      createPseudo: hb,
      match: X,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(a) {
          return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a
        },
        PSEUDO: function(a) {
          var b, c = !a[6] && a[2];
          return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function(a) {
          var b = a.replace(cb, db).toLowerCase();
          return "*" === a ? function() {
            return !0
          } : function(a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function(a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function(a) {
            return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || "")
          })
        },
        ATTR: function(a, b, c) {
          return function(d) {
            var e = fb.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
          }
        },
        CHILD: function(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function(a) {
            return !!a.parentNode
          } : function(b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h;
            if (q) {
              if (f) {
                while (p) {
                  l = b;
                  while (l = l[p])
                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if (1 === l.nodeType && ++m && l === b) {
                    k[a] = [w, n, m];
                    break
                  }
              } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
              else
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
            }
          }
        },
        PSEUDO: function(a, b) {
          var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function(a, c) {
            var d, f = e(a, b),
              g = f.length;
            while (g--) d = K.call(a, f[g]), a[d] = !(c[d] = f[g])
          }) : function(a) {
            return e(a, 0, c)
          }) : e
        }
      },
      pseudos: {
        not: hb(function(a) {
          var b = [],
            c = [],
            d = h(a.replace(R, "$1"));
          return d[u] ? hb(function(a, b, c, e) {
            var f, g = d(a, null, e, []),
              h = a.length;
            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function(a, e, f) {
            return b[0] = a, d(b, null, f, c), !c.pop()
          }
        }),
        has: hb(function(a) {
          return function(b) {
            return fb(a, b).length > 0
          }
        }),
        contains: hb(function(a) {
          return function(b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
          }
        }),
        lang: hb(function(a) {
          return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(),
            function(b) {
              var c;
              do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
              while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function(a) {
          return a === o
        },
        focus: function(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function(a) {
          return a.disabled === !1
        },
        disabled: function(a) {
          return a.disabled === !0
        },
        checked: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function(a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6) return !1;
          return !0
        },
        parent: function(a) {
          return !d.pseudos.empty(a)
        },
        header: function(a) {
          return Z.test(a.nodeName)
        },
        input: function(a) {
          return Y.test(a.nodeName)
        },
        button: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        },
        first: nb(function() {
          return [0]
        }),
        last: nb(function(a, b) {
          return [b - 1]
        }),
        eq: nb(function(a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: nb(function(a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: nb(function(a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: nb(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: nb(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) d.pseudos[b] = lb(b);
    for (b in {
        submit: !0,
        reset: !0
      }) d.pseudos[b] = mb(b);

    function pb() {}
    pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function(a, b) {
      var c, e, f, g, h, i, j, k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(R, " ")
        }), h = h.slice(c.length));
        for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
          value: c,
          type: g,
          matches: e
        }), h = h.slice(c.length));
        if (!c) break
      }
      return b ? h.length : h ? fb.error(a) : z(a, i).slice(0)
    };

    function qb(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function rb(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first ? function(b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function(b, c, g) {
        var h, i, j = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        } else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
              if (i[d] = j, j[2] = a(b, c, g)) return !0
            }
      }
    }

    function sb(a) {
      return a.length > 1 ? function(b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function tb(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) fb(a, b[d], c);
      return c
    }

    function ub(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      return g
    }

    function vb(a, b, c, d, e, f) {
      return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function(f, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = f || tb(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : ub(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = ub(r, n), d(j, [], h, i), k = j.length;
          while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)(l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i)
            }
            k = r.length;
            while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
          }
        } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r)
      })
    }

    function wb(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function(a) {
          return a === b
        }, h, !0), l = rb(function(a) {
          return K.call(b, a) > -1
        }, h, !0), m = [function(a, c, d) {
          return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d))
        }]; f > i; i++)
        if (c = d.relative[a[i].type]) m = [rb(sb(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type]) break;
            return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a))
          }
          m.push(c)
        }
      return sb(m)
    }

    function xb(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function(f, g, h, i, k) {
          var l, m, o, p = 0,
            q = "0",
            r = f && [],
            s = [],
            t = j,
            u = f || e && d.find.TAG("*", k),
            v = w += null == t ? 1 : Math.random() || .1,
            x = u.length;
          for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
            if (e && l) {
              m = 0;
              while (o = a[m++])
                if (o(l, g, h)) {
                  i.push(l);
                  break
                }
              k && (w = v)
            }
            c && ((l = !o && l) && p--, f && r.push(l))
          }
          if (p += q, c && q !== p) {
            m = 0;
            while (o = b[m++]) o(r, s, g, h);
            if (f) {
              if (p > 0)
                while (q--) r[q] || s[q] || (s[q] = G.call(i));
              s = ub(s)
            }
            I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i)
          }
          return k && (w = v, j = t), r
        };
      return c ? hb(f) : f
    }
    return h = fb.compile = function(a, b) {
      var c, d = [],
        e = [],
        f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--) f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, xb(e, d)), f.selector = a
      }
      return f
    }, i = fb.select = function(a, b, e, f) {
      var i, j, k, l, m, n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length)
        }
        i = X.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type]) break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && qb(j), !a) return I.apply(e, f), e;
            break
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function(a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"))
    }), ib(function(a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || jb("type|href|height|width", function(a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), c.attributes && ib(function(a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || jb("value", function(a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), ib(function(a) {
      return null == a.getAttribute("disabled")
    }) || jb(L, function(a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
    }), fb
  }(a);
  m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
  var t = m.expr.match.needsContext,
    u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    v = /^.[^:#\[\.,]*$/;

  function w(a, b, c) {
    if (m.isFunction(b)) return m.grep(a, function(a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return m.grep(a, function(a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (v.test(b)) return m.filter(b, a, c);
      b = m.filter(b, a)
    }
    return m.grep(a, function(a) {
      return m.inArray(a, b) >= 0 !== c
    })
  }
  m.filter = function(a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
      return 1 === a.nodeType
    }))
  }, m.fn.extend({
    find: function(a) {
      var b, c = [],
        d = this,
        e = d.length;
      if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
        for (b = 0; e > b; b++)
          if (m.contains(d[b], this)) return !0
      }));
      for (b = 0; e > b; b++) m.find(a, d[b], c);
      return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
    },
    filter: function(a) {
      return this.pushStack(w(this, a || [], !1))
    },
    not: function(a) {
      return this.pushStack(w(this, a || [], !0))
    },
    is: function(a) {
      return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
    }
  });
  var x, y = a.document,
    z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    A = m.fn.init = function(a, b) {
      var c, d;
      if (!a) return this;
      if ("string" == typeof a) {
        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
        if (c[1]) {
          if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
            for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
          return this
        }
        if (d = y.getElementById(c[2]), d && d.parentNode) {
          if (d.id !== c[2]) return x.find(a);
          this.length = 1, this[0] = d
        }
        return this.context = y, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
    };
  A.prototype = m.fn, x = m(y);
  var B = /^(?:parents|prev(?:Until|All))/,
    C = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  m.extend({
    dir: function(a, b, c) {
      var d = [],
        e = a[b];
      while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
      return d
    },
    sibling: function(a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    }
  }), m.fn.extend({
    has: function(a) {
      var b, c = m(a, this),
        d = c.length;
      return this.filter(function() {
        for (b = 0; d > b; b++)
          if (m.contains(this, c[b])) return !0
      })
    },
    closest: function(a, b) {
      for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
            f.push(c);
            break
          }
      return this.pushStack(f.length > 1 ? m.unique(f) : f)
    },
    index: function(a) {
      return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(a, b) {
      return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  });

  function D(a, b) {
    do a = a[b]; while (a && 1 !== a.nodeType);
    return a
  }
  m.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function(a) {
      return m.dir(a, "parentNode")
    },
    parentsUntil: function(a, b, c) {
      return m.dir(a, "parentNode", c)
    },
    next: function(a) {
      return D(a, "nextSibling")
    },
    prev: function(a) {
      return D(a, "previousSibling")
    },
    nextAll: function(a) {
      return m.dir(a, "nextSibling")
    },
    prevAll: function(a) {
      return m.dir(a, "previousSibling")
    },
    nextUntil: function(a, b, c) {
      return m.dir(a, "nextSibling", c)
    },
    prevUntil: function(a, b, c) {
      return m.dir(a, "previousSibling", c)
    },
    siblings: function(a) {
      return m.sibling((a.parentNode || {}).firstChild, a)
    },
    children: function(a) {
      return m.sibling(a.firstChild)
    },
    contents: function(a) {
      return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
    }
  }, function(a, b) {
    m.fn[a] = function(c, d) {
      var e = m.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
    }
  });
  var E = /\S+/g,
    F = {};

  function G(a) {
    var b = F[a] = {};
    return m.each(a.match(E) || [], function(a, c) {
      b[c] = !0
    }), b
  }
  m.Callbacks = function(a) {
    a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
    var b, c, d, e, f, g, h = [],
      i = !a.once && [],
      j = function(l) {
        for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
          if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break
          }
        b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
      },
      k = {
        add: function() {
          if (h) {
            var d = h.length;
            ! function f(b) {
              m.each(b, function(b, c) {
                var d = m.type(c);
                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
              })
            }(arguments), b ? e = h.length : c && (g = d, j(c))
          }
          return this
        },
        remove: function() {
          return h && m.each(arguments, function(a, c) {
            var d;
            while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
          }), this
        },
        has: function(a) {
          return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
        },
        empty: function() {
          return h = [], e = 0, this
        },
        disable: function() {
          return h = i = c = void 0, this
        },
        disabled: function() {
          return !h
        },
        lock: function() {
          return i = void 0, c || k.disable(), this
        },
        locked: function() {
          return !i
        },
        fireWith: function(a, c) {
          return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
        },
        fire: function() {
          return k.fireWith(this, arguments), this
        },
        fired: function() {
          return !!d
        }
      };
    return k
  }, m.extend({
    Deferred: function(a) {
      var b = [
          ["resolve", "done", m.Callbacks("once memory"), "resolved"],
          ["reject", "fail", m.Callbacks("once memory"), "rejected"],
          ["notify", "progress", m.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function() {
            return c
          },
          always: function() {
            return e.done(arguments).fail(arguments), this
          },
          then: function() {
            var a = arguments;
            return m.Deferred(function(c) {
              m.each(b, function(b, f) {
                var g = m.isFunction(a[b]) && a[b];
                e[f[1]](function() {
                  var a = g && g.apply(this, arguments);
                  a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function(a) {
            return null != a ? m.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, m.each(b, function(a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function(a) {
      var b = 0,
        c = d.call(arguments),
        e = c.length,
        f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
        g = 1 === f ? a : m.Deferred(),
        h = function(a, b, c) {
          return function(e) {
            b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
          }
        },
        i, j, k;
      if (e > 1)
        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
      return f || g.resolveWith(k, c), g.promise()
    }
  });
  var H;
  m.fn.ready = function(a) {
    return m.ready.promise().done(a), this
  }, m.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? m.readyWait++ : m.ready(!0)
    },
    ready: function(a) {
      if (a === !0 ? !--m.readyWait : !m.isReady) {
        if (!y.body) return setTimeout(m.ready);
        m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
      }
    }
  });

  function I() {
    y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
  }

  function J() {
    (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
  }
  m.ready.promise = function(b) {
    if (!H)
      if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
      else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
    else {
      y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
      var c = !1;
      try {
        c = null == a.frameElement && y.documentElement
      } catch (d) {}
      c && c.doScroll && ! function e() {
        if (!m.isReady) {
          try {
            c.doScroll("left")
          } catch (a) {
            return setTimeout(e, 50)
          }
          I(), m.ready()
        }
      }()
    }
    return H.promise(b)
  };
  var K = "undefined",
    L;
  for (L in m(k)) break;
  k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
      var a, b, c, d;
      c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }),
    function() {
      var a = y.createElement("div");
      if (null == k.deleteExpando) {
        k.deleteExpando = !0;
        try {
          delete a.test
        } catch (b) {
          k.deleteExpando = !1
        }
      }
      a = null
    }(), m.acceptData = function(a) {
      var b = m.noData[(a.nodeName + " ").toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
  var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    N = /([A-Z])/g;

  function O(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = "data-" + b.replace(N, "-$1").toLowerCase();
      if (c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
        } catch (e) {}
        m.data(a, b, c)
      } else c = void 0
    }
    return c
  }

  function P(a) {
    var b;
    for (b in a)
      if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
    return !0
  }

  function Q(a, b, d, e) {
    if (m.acceptData(a)) {
      var f, g, h = m.expando,
        i = a.nodeType,
        j = i ? m.cache : a,
        k = i ? a[h] : a[h] && h;
      if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
        toJSON: m.noop
      }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
    }
  }

  function R(a, b, c) {
    if (m.acceptData(a)) {
      var d, e, f = a.nodeType,
        g = f ? m.cache : a,
        h = f ? a[m.expando] : m.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
          while (e--) delete d[b[e]];
          if (c ? !P(d) : !m.isEmptyObject(d)) return
        }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
      }
    }
  }
  m.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(a) {
      return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
    },
    data: function(a, b, c) {
      return Q(a, b, c)
    },
    removeData: function(a, b) {
      return R(a, b)
    },
    _data: function(a, b, c) {
      return Q(a, b, c, !0)
    },
    _removeData: function(a, b) {
      return R(a, b, !0)
    }
  }), m.fn.extend({
    data: function(a, b) {
      var c, d, e, f = this[0],
        g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
          c = g.length;
          while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
          m._data(f, "parsedAttrs", !0)
        }
        return e
      }
      return "object" == typeof a ? this.each(function() {
        m.data(this, a)
      }) : arguments.length > 1 ? this.each(function() {
        m.data(this, a, b)
      }) : f ? O(f, a, m.data(f, a)) : void 0
    },
    removeData: function(a) {
      return this.each(function() {
        m.removeData(this, a)
      })
    }
  }), m.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = m.queue(a, b),
        d = c.length,
        e = c.shift(),
        f = m._queueHooks(a, b),
        g = function() {
          m.dequeue(a, b)
        };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return m._data(a, c) || m._data(a, c, {
        empty: m.Callbacks("once memory").add(function() {
          m._removeData(a, b + "queue"), m._removeData(a, c)
        })
      })
    }
  }), m.fn.extend({
    queue: function(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
        var c = m.queue(this, a, b);
        m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
      })
    },
    dequeue: function(a) {
      return this.each(function() {
        m.dequeue(this, a)
      })
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", [])
    },
    promise: function(a, b) {
      var c, d = 1,
        e = m.Deferred(),
        f = this,
        g = this.length,
        h = function() {
          --d || e.resolveWith(f, [f])
        };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b)
    }
  });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = ["Top", "Right", "Bottom", "Left"],
    U = function(a, b) {
      return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
    },
    V = m.access = function(a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === m.type(c)) {
        e = !0;
        for (h in c) m.access(a, b, h, c[h], !0, f, g)
      } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
          return j.call(m(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    },
    W = /^(?:checkbox|radio)$/i;
  ! function() {
    var a = y.createElement("input"),
      b = y.createElement("div"),
      c = y.createDocumentFragment();
    if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
        k.noCloneEvent = !1
      }), b.cloneNode(!0).click()), null == k.deleteExpando) {
      k.deleteExpando = !0;
      try {
        delete b.test
      } catch (d) {
        k.deleteExpando = !1
      }
    }
  }(),
  function() {
    var b, c, d = y.createElement("div");
    for (b in {
        submit: !0,
        change: !0,
        focusin: !0
      }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
    d = null
  }();
  var X = /^(?:input|select|textarea)$/i,
    Y = /^key/,
    Z = /^(?:mouse|pointer|contextmenu)|click/,
    $ = /^(?:focusinfocus|focusoutblur)$/,
    _ = /^([^.]*)(?:\.(.+)|)$/;

  function ab() {
    return !0
  }

  function bb() {
    return !1
  }

  function cb() {
    try {
      return y.activeElement
    } catch (a) {}
  }
  m.event = {
    global: {},
    add: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
      if (r) {
        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
          return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
        }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
        while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && m.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
        a = null
      }
    },
    remove: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
      if (r && (k = r.events)) {
        b = (b || "").match(E) || [""], j = b.length;
        while (j--)
          if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
            while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
            i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
          } else
            for (o in k) m.event.remove(a, o + b[j], c, d, !0);
        m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
      }
    },
    trigger: function(b, c, d, e) {
      var f, g, h, i, k, l, n, o = [d || y],
        p = j.call(b, "type") ? b.type : b,
        q = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
        if (!e && !k.noBubble && !m.isWindow(d)) {
          for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
          l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
        }
        n = 0;
        while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
        if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
          l = d[g], l && (d[g] = null), m.event.triggered = p;
          try {
            d[p]()
          } catch (r) {}
          m.event.triggered = void 0, l && (d[g] = l)
        }
        return b.result
      }
    },
    dispatch: function(a) {
      a = m.event.fix(a);
      var b, c, e, f, g, h = [],
        i = d.call(arguments),
        j = (m._data(this, "events") || {})[a.type] || [],
        k = m.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = m.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, g = 0;
          while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function(a, b) {
      var c, d, e, f, g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
            e.length && g.push({
              elem: i,
              handlers: e
            })
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g
    },
    fix: function(a) {
      if (a[m.expando]) return a;
      var b, c, d, e = a.type,
        f = a,
        g = this.fixHooks[e];
      g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
      while (b--) c = d[b], a[c] = f[c];
      return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, b) {
        var c, d, e, f = b.button,
          g = b.fromElement;
        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          if (this !== cb() && this.focus) try {
            return this.focus(), !1
          } catch (a) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === cb() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        },
        _default: function(a) {
          return m.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }
      }
    },
    simulate: function(a, b, c, d) {
      var e = m.extend(new m.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }
  }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function(a, b, c) {
    var d = "on" + b;
    a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
  }, m.Event = function(a, b) {
    return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
  }, m.Event.prototype = {
    isDefaultPrevented: bb,
    isPropagationStopped: bb,
    isImmediatePropagationStopped: bb,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    },
    stopImmediatePropagation: function() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
    }
  }, m.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(a, b) {
    m.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), k.submitBubbles || (m.event.special.submit = {
    setup: function() {
      return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
        var b = a.target,
          c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
        c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
          a._submit_bubble = !0
        }), m._data(c, "submitBubbles", !0))
      })
    },
    postDispatch: function(a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
    },
    teardown: function() {
      return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
    }
  }), k.changeBubbles || (m.event.special.change = {
    setup: function() {
      return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
      }), m.event.add(this, "click._change", function(a) {
        this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
      })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
        var b = a.target;
        X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
          !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
        }), m._data(b, "changeBubbles", !0))
      })
    },
    handle: function(a) {
      var b = a.target;
      return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function() {
      return m.event.remove(this, "._change"), !X.test(this.nodeName)
    }
  }), k.focusinBubbles || m.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = function(a) {
      m.event.simulate(b, a.target, m.event.fix(a), !0)
    };
    m.event.special[b] = {
      setup: function() {
        var d = this.ownerDocument || this,
          e = m._data(d, b);
        e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
      },
      teardown: function() {
        var d = this.ownerDocument || this,
          e = m._data(d, b) - 1;
        e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
      }
    }
  }), m.fn.extend({
    on: function(a, b, c, d, e) {
      var f, g;
      if ("object" == typeof a) {
        "string" != typeof b && (c = c || b, b = void 0);
        for (f in a) this.on(f, b, c, a[f], e);
        return this
      }
      if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = bb;
      else if (!d) return this;
      return 1 === e && (g = d, d = function(a) {
        return m().off(a), g.apply(this, arguments)
      }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
        m.event.add(this, a, d, c, b)
      })
    },
    one: function(a, b, c, d) {
      return this.on(a, b, c, d, 1)
    },
    off: function(a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this
      }
      return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() {
        m.event.remove(this, a, c, b)
      })
    },
    trigger: function(a, b) {
      return this.each(function() {
        m.event.trigger(a, b, this)
      })
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? m.event.trigger(a, b, c, !0) : void 0
    }
  });

  function db(a) {
    var b = eb.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement)
      while (b.length) c.createElement(b.pop());
    return c
  }
  var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    fb = / jQuery\d+="(?:null|\d+)"/g,
    gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"),
    hb = /^\s+/,
    ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    jb = /<([\w:]+)/,
    kb = /<tbody/i,
    lb = /<|&#?\w+;/,
    mb = /<(?:script|style|link)/i,
    nb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ob = /^$|\/(?:java|ecma)script/i,
    pb = /^true\/(.*)/,
    qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    rb = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    sb = db(y),
    tb = sb.appendChild(y.createElement("div"));
  rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;

  function ub(a, b) {
    var c, d, e = 0,
      f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b));
    return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
  }

  function vb(a) {
    W.test(a.type) && (a.defaultChecked = a.checked)
  }

  function wb(a, b) {
    return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function xb(a) {
    return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
  }

  function yb(a) {
    var b = pb.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function zb(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
  }

  function Ab(a, b) {
    if (1 === b.nodeType && m.hasData(a)) {
      var c, d, e, f = m._data(a),
        g = m._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
      }
      g.data && (g.data = m.extend({}, g.data))
    }
  }

  function Bb(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
        e = m._data(b);
        for (d in e.events) m.removeEvent(b, d, e.handle);
        b.removeAttribute(m.expando)
      }
      "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
  }
  m.extend({
    clone: function(a, b, c) {
      var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
      if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
        for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g) d[g] && Bb(e, d[g]);
      if (b)
        if (c)
          for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++) Ab(e, d[g]);
        else Ab(a, f);
      return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f
    },
    buildFragment: function(a, b, c, d) {
      for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)
        if (f = a[q], f || 0 === f)
          if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
          else if (lb.test(f)) {
        h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
        while (e--) h = h.lastChild;
        if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
          f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
          while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
        }
        m.merge(p, h.childNodes), h.textContent = "";
        while (h.firstChild) h.removeChild(h.firstChild);
        h = o.lastChild
      } else p.push(b.createTextNode(f));
      h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0;
      while (f = p[q++])
        if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
          e = 0;
          while (f = h[e++]) ob.test(f.type || "") && c.push(f)
        }
      return h = null, o
    },
    cleanData: function(a, b) {
      for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
        if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
          if (g.events)
            for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
          j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
        }
    }
  }), m.fn.extend({
    text: function(a) {
      return V(this, function(a) {
        return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
      }, null, a, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = wb(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = wb(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    remove: function(a, b) {
      for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c));
      return this
    },
    empty: function() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && m.cleanData(ub(a, !1));
        while (a.firstChild) a.removeChild(a.firstChild);
        a.options && m.nodeName(a, "select") && (a.options.length = 0)
      }
      return this
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return m.clone(this, a, b)
      })
    },
    html: function(a) {
      return V(this, function(a) {
        var b = this[0] || {},
          c = 0,
          d = this.length;
        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0;
        if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
          a = a.replace(ib, "<$1></$2>");
          try {
            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
            b = 0
          } catch (e) {}
        }
        b && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function() {
      var a = arguments[0];
      return this.domManip(arguments, function(b) {
        a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this)
      }), a && (a.length || a.nodeType) ? this : this.remove()
    },
    detach: function(a) {
      return this.remove(a, !0)
    },
    domManip: function(a, b) {
      a = e.apply([], a);
      var c, d, f, g, h, i, j = 0,
        l = this.length,
        n = this,
        o = l - 1,
        p = a[0],
        q = m.isFunction(p);
      if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p)) return this.each(function(c) {
        var d = n.eq(c);
        q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
      });
      if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
        for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
        if (f)
          for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++) d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
        i = c = null
      }
      return this
    }
  }), m.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    m.fn[a] = function(a) {
      for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
      return this.pushStack(e)
    }
  });
  var Cb, Db = {};

  function Eb(b, c) {
    var d, e = m(c.createElement(b)).appendTo(c.body),
      f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
    return e.detach(), f
  }

  function Fb(a) {
    var b = y,
      c = Db[a];
    return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c
  }! function() {
    var a;
    k.shrinkWrapBlocks = function() {
      if (null != a) return a;
      a = !1;
      var b, c, d;
      return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
    }
  }();
  var Gb = /^margin/,
    Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
    Ib, Jb, Kb = /^(top|right|bottom|left)$/;
  a.getComputedStyle ? (Ib = function(a) {
    return a.ownerDocument.defaultView.getComputedStyle(a, null)
  }, Jb = function(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
  }) : y.documentElement.currentStyle && (Ib = function(a) {
    return a.currentStyle
  }, Jb = function(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
  });

  function Lb(a, b) {
    return {
      get: function() {
        var c = a();
        if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }! function() {
    var b, c, d, e, f, g, h;
    if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
      c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
        reliableHiddenOffsets: function() {
          return null == g && i(), g
        },
        boxSizingReliable: function() {
          return null == f && i(), f
        },
        pixelPosition: function() {
          return null == e && i(), e
        },
        reliableMarginRight: function() {
          return null == h && i(), h
        }
      });

      function i() {
        var b, c, d, i;
        c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
          width: "4px"
        }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
      }
    }
  }(), m.swap = function(a, b, c, d) {
    var e, f, g = {};
    for (f in b) g[f] = a.style[f], a.style[f] = b[f];
    e = c.apply(a, d || []);
    for (f in b) a.style[f] = g[f];
    return e
  };
  var Mb = /alpha\([^)]*\)/i,
    Nb = /opacity\s*=\s*([^)]*)/,
    Ob = /^(none|table(?!-c[ea]).+)/,
    Pb = new RegExp("^(" + S + ")(.*)$", "i"),
    Qb = new RegExp("^([+-])=(" + S + ")", "i"),
    Rb = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Sb = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    Tb = ["Webkit", "O", "Moz", "ms"];

  function Ub(a, b) {
    if (b in a) return b;
    var c = b.charAt(0).toUpperCase() + b.slice(1),
      d = b,
      e = Tb.length;
    while (e--)
      if (b = Tb[e] + c, b in a) return b;
    return d
  }

  function Vb(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }

  function Wb(a, b, c) {
    var d = Pb.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }

  function Xb(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
    return g
  }

  function Yb(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ib(a),
      g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e)) return e;
      d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }
  m.extend({
    cssHooks: {
      opacity: {
        get: function(a, b) {
          if (b) {
            var c = Jb(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": k.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = m.camelCase(b),
          i = a.style;
        if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
          i[b] = c
        } catch (j) {}
      }
    },
    css: function(a, b, c, d) {
      var e, f, g, h = m.camelCase(b);
      return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
    }
  }), m.each(["height", "width"], function(a, b) {
    m.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function() {
          return Yb(a, b, d)
        }) : Yb(a, b, d) : void 0
      },
      set: function(a, c, d) {
        var e = d && Ib(a);
        return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
      }
    }
  }), k.opacity || (m.cssHooks.opacity = {
    get: function(a, b) {
      return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    },
    set: function(a, b) {
      var c = a.style,
        d = a.currentStyle,
        e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
        f = d && d.filter || c.filter || "";
      c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e)
    }
  }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function(a, b) {
    return b ? m.swap(a, {
      display: "inline-block"
    }, Jb, [a, "marginRight"]) : void 0
  }), m.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    m.cssHooks[a + b] = {
      expand: function(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Gb.test(a) || (m.cssHooks[a + b].set = Wb)
  }), m.fn.extend({
    css: function(a, b) {
      return V(this, function(a, b, c) {
        var d, e, f = {},
          g = 0;
        if (m.isArray(b)) {
          for (d = Ib(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
          return f
        }
        return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
      }, a, b, arguments.length > 1)
    },
    show: function() {
      return Vb(this, !0)
    },
    hide: function() {
      return Vb(this)
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        U(this) ? m(this).show() : m(this).hide()
      })
    }
  });

  function Zb(a, b, c, d, e) {
    return new Zb.prototype.init(a, b, c, d, e)
  }
  m.Tween = Zb, Zb.prototype = {
    constructor: Zb,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
    },
    cur: function() {
      var a = Zb.propHooks[this.prop];
      return a && a.get ? a.get(this) : Zb.propHooks._default.get(this)
    },
    run: function(a) {
      var b, c = Zb.propHooks[this.prop];
      return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this
    }
  }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = {
    _default: {
      get: function(a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
      },
      set: function(a) {
        m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
      }
    }
  }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = {
    set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, m.easing = {
    linear: function(a) {
      return a
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2
    }
  }, m.fx = Zb.prototype.init, m.fx.step = {};
  var $b, _b, ac = /^(?:toggle|show|hide)$/,
    bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
    cc = /queueHooks$/,
    dc = [ic],
    ec = {
      "*": [function(a, b) {
        var c = this.createTween(a, b),
          d = c.cur(),
          e = bc.exec(b),
          f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
          g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)),
          h = 1,
          i = 20;
        if (g && g[3] !== f) {
          f = f || g[3], e = e || [], g = +d || 1;
          do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
        }
        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
      }]
    };

  function fc() {
    return setTimeout(function() {
      $b = void 0
    }), $b = m.now()
  }

  function gc(a, b) {
    var c, d = {
        height: a
      },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
    return b && (d.opacity = d.width = a), d
  }

  function hc(a, b, c) {
    for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function ic(a, b, c) {
    var d, e, f, g, h, i, j, l, n = this,
      o = {},
      p = a.style,
      q = a.nodeType && U(a),
      r = m._data(a, "fxshow");
    c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
      h.unqueued || i()
    }), h.unqueued++, n.always(function() {
      n.always(function() {
        h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
      p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
    }));
    for (d in b)
      if (e = b[d], ac.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
          if ("show" !== e || !r || void 0 === r[d]) continue;
          q = !0
        }
        o[d] = r && r[d] || m.style(a, d)
      } else j = void 0;
    if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j);
    else {
      r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
        m(a).hide()
      }), n.done(function() {
        var b;
        m._removeData(a, "fxshow");
        for (b in o) m.style(a, b, o[b])
      });
      for (d in o) g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }

  function jc(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      } else b[d] = e
  }

  function kc(a, b, c) {
    var d, e, f = 0,
      g = dc.length,
      h = m.Deferred().always(function() {
        delete i.elem
      }),
      i = function() {
        if (e) return !1;
        for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: m.extend({}, b),
        opts: m.extend(!0, {
          specialEasing: {}
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: $b || fc(),
        duration: c.duration,
        tweens: [],
        createTween: function(b, c) {
          var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function(b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for (jc(k, j.opts.specialEasing); g > f; f++)
      if (d = dc[f].call(j, a, k, j.opts)) return d;
    return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  m.Animation = m.extend(kc, {
      tweener: function(a, b) {
        m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b)
      },
      prefilter: function(a, b) {
        b ? dc.unshift(a) : dc.push(a)
      }
    }), m.speed = function(a, b, c) {
      var d = a && "object" == typeof a ? m.extend({}, a) : {
        complete: c || !c && b || m.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !m.isFunction(b) && b
      };
      return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
        m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
      }, d
    }, m.fn.extend({
      fadeTo: function(a, b, c, d) {
        return this.filter(U).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function(a, b, c, d) {
        var e = m.isEmptyObject(a),
          f = m.speed(b, c, d),
          g = function() {
            var b = kc(this, m.extend({}, a), f);
            (e || m._data(this, "finish")) && b.stop(!0)
          };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function(a, b, c) {
        var d = function(a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
          var b = !0,
            e = null != a && a + "queueHooks",
            f = m.timers,
            g = m._data(this);
          if (e) g[e] && g[e].stop && d(g[e]);
          else
            for (e in g) g[e] && g[e].stop && cc.test(e) && d(g[e]);
          for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          (b || !c) && m.dequeue(this, a)
        })
      },
      finish: function(a) {
        return a !== !1 && (a = a || "fx"), this.each(function() {
          var b, c = m._data(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = m.timers,
            g = d ? d.length : 0;
          for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), m.each(["toggle", "show", "hide"], function(a, b) {
      var c = m.fn[b];
      m.fn[b] = function(a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e)
      }
    }), m.each({
      slideDown: gc("show"),
      slideUp: gc("hide"),
      slideToggle: gc("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(a, b) {
      m.fn[a] = function(a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), m.timers = [], m.fx.tick = function() {
      var a, b = m.timers,
        c = 0;
      for ($b = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
      b.length || m.fx.stop(), $b = void 0
    }, m.fx.timer = function(a) {
      m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
    }, m.fx.interval = 13, m.fx.start = function() {
      _b || (_b = setInterval(m.fx.tick, m.fx.interval))
    }, m.fx.stop = function() {
      clearInterval(_b), _b = null
    }, m.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, m.fn.delay = function(a, b) {
      return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
        var d = setTimeout(b, a);
        c.stop = function() {
          clearTimeout(d)
        }
      })
    },
    function() {
      var a, b, c, d, e;
      b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
    }();
  var lc = /\r/g;
  m.fn.extend({
    val: function(a) {
      var b, c, d, e = this[0]; {
        if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
            return null == a ? "" : a + ""
          })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        });
        if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c)
      }
    }
  }), m.extend({
    valHooks: {
      option: {
        get: function(a) {
          var b = m.find.attr(a, "value");
          return null != b ? b : m.trim(m.text(a))
        }
      },
      select: {
        get: function(a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
              if (b = m(c).val(), f) return b;
              g.push(b)
            }
          return g
        },
        set: function(a, b) {
          var c, d, e = a.options,
            f = m.makeArray(b),
            g = e.length;
          while (g--)
            if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
              d.selected = c = !0
            } catch (h) {
              d.scrollHeight
            } else d.selected = !1;
          return c || (a.selectedIndex = -1), e
        }
      }
    }
  }), m.each(["radio", "checkbox"], function() {
    m.valHooks[this] = {
      set: function(a, b) {
        return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
      }
    }, k.checkOn || (m.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var mc, nc, oc = m.expr.attrHandle,
    pc = /^(?:checked|selected)$/i,
    qc = k.getSetAttribute,
    rc = k.input;
  m.fn.extend({
    attr: function(a, b) {
      return V(this, m.attr, a, b, arguments.length > 1)
    },
    removeAttr: function(a) {
      return this.each(function() {
        m.removeAttr(this, a)
      })
    }
  }), m.extend({
    attr: function(a, b, c) {
      var d, e, f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
    },
    removeAttr: function(a, b) {
      var c, d, e = 0,
        f = b && b.match(E);
      if (f && 1 === a.nodeType)
        while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d)
    },
    attrHooks: {
      type: {
        set: function(a, b) {
          if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    }
  }), nc = {
    set: function(a, b, c) {
      return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
    }
  }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = oc[b] || m.find.attr;
    oc[b] = rc && qc || !pc.test(b) ? function(a, b, d) {
      var e, f;
      return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e
    } : function(a, b, c) {
      return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
    }
  }), rc && qc || (m.attrHooks.value = {
    set: function(a, b, c) {
      return m.nodeName(a, "input") ? void(a.defaultValue = b) : mc && mc.set(a, b, c)
    }
  }), qc || (mc = {
    set: function(a, b, c) {
      var d = a.getAttributeNode(c);
      return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
    }
  }, oc.id = oc.name = oc.coords = function(a, b, c) {
    var d;
    return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
  }, m.valHooks.button = {
    get: function(a, b) {
      var c = a.getAttributeNode(b);
      return c && c.specified ? c.value : void 0
    },
    set: mc.set
  }, m.attrHooks.contenteditable = {
    set: function(a, b, c) {
      mc.set(a, "" === b ? !1 : b, c)
    }
  }, m.each(["width", "height"], function(a, b) {
    m.attrHooks[b] = {
      set: function(a, c) {
        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
      }
    }
  })), k.style || (m.attrHooks.style = {
    get: function(a) {
      return a.style.cssText || void 0
    },
    set: function(a, b) {
      return a.style.cssText = b + ""
    }
  });
  var sc = /^(?:input|select|textarea|button|object)$/i,
    tc = /^(?:a|area)$/i;
  m.fn.extend({
    prop: function(a, b) {
      return V(this, m.prop, a, b, arguments.length > 1)
    },
    removeProp: function(a) {
      return a = m.propFix[a] || a, this.each(function() {
        try {
          this[a] = void 0, delete this[a]
        } catch (b) {}
      })
    }
  }), m.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(a, b, c) {
      var d, e, f, g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
    },
    propHooks: {
      tabIndex: {
        get: function(a) {
          var b = m.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1
        }
      }
    }
  }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
    m.propHooks[b] = {
      get: function(a) {
        return a.getAttribute(b, 4)
      }
    }
  }), k.optSelected || (m.propHooks.selected = {
    get: function(a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    }
  }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    m.propFix[this.toLowerCase()] = this
  }), k.enctype || (m.propFix.enctype = "encoding");
  var uc = /[\t\r\n\f]/g;
  m.fn.extend({
    addClass: function(a) {
      var b, c, d, e, f, g, h = 0,
        i = this.length,
        j = "string" == typeof a && a;
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).addClass(a.call(this, b, this.className))
      });
      if (j)
        for (b = (a || "").match(E) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
            f = 0;
            while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = m.trim(d), c.className !== g && (c.className = g)
          }
      return this
    },
    removeClass: function(a) {
      var b, c, d, e, f, g, h = 0,
        i = this.length,
        j = 0 === arguments.length || "string" == typeof a && a;
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).removeClass(a.call(this, b, this.className))
      });
      if (j)
        for (b = (a || "").match(E) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
            f = 0;
            while (e = b[f++])
              while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
            g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
          }
      return this
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
        m(this).toggleClass(a.call(this, c, this.className, b), b)
      } : function() {
        if ("string" === c) {
          var b, d = 0,
            e = m(this),
            f = a.match(E) || [];
          while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
        } else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
      })
    },
    hasClass: function(a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0) return !0;
      return !1
    }
  }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    m.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), m.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    },
    bind: function(a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function(a, b) {
      return this.off(a, null, b)
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }
  });
  var vc = m.now(),
    wc = /\?/,
    xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  m.parseJSON = function(b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
    var c, d = null,
      e = m.trim(b + "");
    return e && !m.trim(e.replace(xc, function(a, b, e, f) {
      return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
    })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
  }, m.parseXML = function(b) {
    var c, d;
    if (!b || "string" != typeof b) return null;
    try {
      a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
    } catch (e) {
      c = void 0
    }
    return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
  };
  var yc, zc, Ac = /#.*$/,
    Bc = /([?&])_=[^&]*/,
    Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ec = /^(?:GET|HEAD)$/,
    Fc = /^\/\//,
    Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Hc = {},
    Ic = {},
    Jc = "*/".concat("*");
  try {
    zc = location.href
  } catch (Kc) {
    zc = y.createElement("a"), zc.href = "", zc = zc.href
  }
  yc = Gc.exec(zc.toLowerCase()) || [];

  function Lc(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(E) || [];
      if (m.isFunction(c))
        while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function Mc(a, b, c, d) {
    var e = {},
      f = a === Ic;

    function g(h) {
      var i;
      return e[h] = !0, m.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
      }), i
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*")
  }

  function Nc(a, b) {
    var c, d, e = m.ajaxSettings.flatOptions || {};
    for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && m.extend(!0, a, c), a
  }

  function Oc(a, b, c) {
    var d, e, f, g, h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break
        }
    if (i[0] in c) f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + " " + i[0]]) {
          f = g;
          break
        }
        d || (d = g)
      }
      f = f || d
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }

  function Pc(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          }
      if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        } catch (l) {
          return {
            state: "parsererror",
            error: g ? l : "No conversion from " + i + " to " + f
          }
        }
    }
    return {
      state: "success",
      data: b
    }
  }
  m.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: zc,
      type: "GET",
      isLocal: Dc.test(yc[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Jc,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": m.parseJSON,
        "text xml": m.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a)
    },
    ajaxPrefilter: Lc(Hc),
    ajaxTransport: Lc(Ic),
    ajax: function(a, b) {
      "object" == typeof a && (b = a, a = void 0), b = b || {};
      var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
        l = k.context || k,
        n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
        o = m.Deferred(),
        p = m.Callbacks("once memory"),
        q = k.statusCode || {},
        r = {},
        s = {},
        t = 0,
        u = "canceled",
        v = {
          readyState: 0,
          getResponseHeader: function(a) {
            var b;
            if (2 === t) {
              if (!j) {
                j = {};
                while (b = Cc.exec(f)) j[b[1].toLowerCase()] = b[2]
              }
              b = j[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function() {
            return 2 === t ? f : null
          },
          setRequestHeader: function(a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a, r[a] = b), this
          },
          overrideMimeType: function(a) {
            return t || (k.mimeType = a), this
          },
          statusCode: function(a) {
            var b;
            if (a)
              if (2 > t)
                for (b in a) q[b] = [q[b], a[b]];
              else v.always(a[v.status]);
            return this
          },
          abort: function(a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this
          }
        };
      if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t) return v;
      h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]);
      for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
      u = "abort";
      for (d in {
          success: 1,
          error: 1,
          complete: 1
        }) v[d](k[d]);
      if (i = Mc(Ic, k, b, v)) {
        v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
          v.abort("timeout")
        }, k.timeout));
        try {
          t = 1, i.send(r, x)
        } catch (w) {
          if (!(2 > t)) throw w;
          x(-1, w)
        }
      } else x(-1, "No Transport");

      function x(a, b, c, d) {
        var j, r, s, u, w, x = b;
        2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
      }
      return v
    },
    getJSON: function(a, b, c) {
      return m.get(a, b, c, "json")
    },
    getScript: function(a, b) {
      return m.get(a, void 0, b, "script")
    }
  }), m.each(["get", "post"], function(a, b) {
    m[b] = function(a, c, d, e) {
      return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      })
    }
  }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    m.fn[b] = function(a) {
      return this.on(b, a)
    }
  }), m._evalUrl = function(a) {
    return m.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, m.fn.extend({
    wrapAll: function(a) {
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).wrapAll(a.call(this, b))
      });
      if (this[0]) {
        var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
          var a = this;
          while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
          return a
        }).append(this)
      }
      return this
    },
    wrapInner: function(a) {
      return this.each(m.isFunction(a) ? function(b) {
        m(this).wrapInner(a.call(this, b))
      } : function() {
        var b = m(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function(a) {
      var b = m.isFunction(a);
      return this.each(function(c) {
        m(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
      }).end()
    }
  }), m.expr.filters.hidden = function(a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
  }, m.expr.filters.visible = function(a) {
    return !m.expr.filters.hidden(a)
  };
  var Qc = /%20/g,
    Rc = /\[\]$/,
    Sc = /\r?\n/g,
    Tc = /^(?:submit|button|image|reset|file)$/i,
    Uc = /^(?:input|select|textarea|keygen)/i;

  function Vc(a, b, c, d) {
    var e;
    if (m.isArray(b)) m.each(b, function(b, e) {
      c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== m.type(b)) d(a, b);
    else
      for (e in b) Vc(a + "[" + e + "]", b[e], c, d)
  }
  m.param = function(a, b) {
    var c, d = [],
      e = function(a, b) {
        b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
      e(this.name, this.value)
    });
    else
      for (c in a) Vc(c, a[c], b, e);
    return d.join("&").replace(Qc, "+")
  }, m.fn.extend({
    serialize: function() {
      return m.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var a = m.prop(this, "elements");
        return a ? m.makeArray(a) : this
      }).filter(function() {
        var a = this.type;
        return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a))
      }).map(function(a, b) {
        var c = m(this).val();
        return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(Sc, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(Sc, "\r\n")
        }
      }).get()
    }
  }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c()
  } : Zc;
  var Wc = 0,
    Xc = {},
    Yc = m.ajaxSettings.xhr();
  a.ActiveXObject && m(a).on("unload", function() {
    for (var a in Xc) Xc[a](void 0, !0)
  }), k.cors = !!Yc && "withCredentials" in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function(a) {
    if (!a.crossDomain || k.cors) {
      var b;
      return {
        send: function(c, d) {
          var e, f = a.xhr(),
            g = ++Wc;
          if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
            for (e in a.xhrFields) f[e] = a.xhrFields[e];
          a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
          for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
          f.send(a.hasContent && a.data || null), b = function(c, e) {
            var h, i, j;
            if (b && (e || 4 === f.readyState))
              if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
              else {
                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                try {
                  i = f.statusText
                } catch (k) {
                  i = ""
                }
                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
              }
            j && d(h, i, j, f.getAllResponseHeaders())
          }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b()
        },
        abort: function() {
          b && b(void 0, !0)
        }
      }
    }
  });

  function Zc() {
    try {
      return new a.XMLHttpRequest
    } catch (b) {}
  }

  function $c() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    } catch (b) {}
  }
  m.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(a) {
        return m.globalEval(a), a
      }
    }
  }), m.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), m.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c = y.head || m("head")[0] || y.documentElement;
      return {
        send: function(d, e) {
          b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
          }, c.insertBefore(b, c.firstChild)
        },
        abort: function() {
          b && b.onload(void 0, !0)
        }
      }
    }
  });
  var _c = [],
    ad = /(=)\?(?=&|$)|\?\?/;
  m.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = _c.pop() || m.expando + "_" + vc++;
      return this[a] = !0, a
    }
  }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
      return g || m.error(e + " was not called"), g[0]
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
      g = arguments
    }, d.always(function() {
      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
    }), "script") : void 0
  }), m.parseHTML = function(a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || y;
    var d = u.exec(a),
      e = !c && [];
    return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
  };
  var bd = m.fn.load;
  m.fn.load = function(a, b, c) {
    if ("string" != typeof a && bd) return bd.apply(this, arguments);
    var d, e, f, g = this,
      h = a.indexOf(" ");
    return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
      url: a,
      type: f,
      dataType: "html",
      data: b
    }).done(function(a) {
      e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
    }).complete(c && function(a, b) {
      g.each(c, e || [a.responseText, b, a])
    }), this
  }, m.expr.filters.animated = function(a) {
    return m.grep(m.timers, function(b) {
      return a === b.elem
    }).length
  };
  var cd = a.document.documentElement;

  function dd(a) {
    return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
  }
  m.offset = {
    setOffset: function(a, b, c) {
      var d, e, f, g, h, i, j, k = m.css(a, "position"),
        l = m(a),
        n = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
    }
  }, m.fn.extend({
    offset: function(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function(b) {
        m.offset.setOffset(this, a, b)
      });
      var b, c, d = {
          top: 0,
          left: 0
        },
        e = this[0],
        f = e && e.ownerDocument;
      if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), {
        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      }) : d
    },
    position: function() {
      if (this[0]) {
        var a, b, c = {
            top: 0,
            left: 0
          },
          d = this[0];
        return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - c.top - m.css(d, "marginTop", !0),
          left: b.left - c.left - m.css(d, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var a = this.offsetParent || cd;
        while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
        return a || cd
      })
    }
  }), m.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(a, b) {
    var c = /Y/.test(b);
    m.fn[a] = function(d) {
      return V(this, function(a, d, e) {
        var f = dd(a);
        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
      }, a, d, arguments.length, null)
    }
  }), m.each(["top", "left"], function(a, b) {
    m.cssHooks[b] = Lb(k.pixelPosition, function(a, c) {
      return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0
    })
  }), m.each({
    Height: "height",
    Width: "width"
  }, function(a, b) {
    m.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function(c, d) {
      m.fn[d] = function(d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
          g = c || (d === !0 || e === !0 ? "margin" : "border");
        return V(this, function(b, c, d) {
          var e;
          return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
        }, b, f ? d : void 0, f, null)
      }
    })
  }), m.fn.size = function() {
    return this.length
  }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return m
  });
  var ed = a.jQuery,
    fd = a.$;
  return m.noConflict = function(b) {
    return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m
  }, typeof b === K && (a.jQuery = a.$ = m), m
});
jQuery.migrateMute === void 0 && (jQuery.migrateMute = !0),
  function(e, t, n) {
    function r(n) {
      var r = t.console;
      i[n] || (i[n] = !0, e.migrateWarnings.push(n), r && r.warn && !e.migrateMute && (r.warn("JQMIGRATE: " + n), e.migrateTrace && r.trace && r.trace()))
    }

    function a(t, a, i, o) {
      if (Object.defineProperty) try {
        return Object.defineProperty(t, a, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return r(o), i
          },
          set: function(e) {
            r(o), i = e
          }
        }), n
      } catch (s) {}
      e._definePropertyBroken = !0, t[a] = i
    }
    var i = {};
    e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log("JQMIGRATE: Logging is active"), e.migrateTrace === n && (e.migrateTrace = !0), e.migrateReset = function() {
      i = {}, e.migrateWarnings.length = 0
    }, "BackCompat" === document.compatMode && r("jQuery is not compatible with Quirks Mode");
    var o = e("<input/>", {
        size: 1
      }).attr("size") && e.attrFn,
      s = e.attr,
      u = e.attrHooks.value && e.attrHooks.value.get || function() {
        return null
      },
      c = e.attrHooks.value && e.attrHooks.value.set || function() {
        return n
      },
      l = /^(?:input|button)$/i,
      d = /^[238]$/,
      p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
      f = /^(?:checked|selected)$/i;
    a(e, "attrFn", o || {}, "jQuery.attrFn is deprecated"), e.attr = function(t, a, i, u) {
      var c = a.toLowerCase(),
        g = t && t.nodeType;
      return u && (4 > s.length && r("jQuery.fn.attr( props, pass ) is deprecated"), t && !d.test(g) && (o ? a in o : e.isFunction(e.fn[a]))) ? e(t)[a](i) : ("type" === a && i !== n && l.test(t.nodeName) && t.parentNode && r("Can't change the 'type' of an input or button in IE 6/7/8"), !e.attrHooks[c] && p.test(c) && (e.attrHooks[c] = {
        get: function(t, r) {
          var a, i = e.prop(t, r);
          return i === !0 || "boolean" != typeof i && (a = t.getAttributeNode(r)) && a.nodeValue !== !1 ? r.toLowerCase() : n
        },
        set: function(t, n, r) {
          var a;
          return n === !1 ? e.removeAttr(t, r) : (a = e.propFix[r] || r, a in t && (t[a] = !0), t.setAttribute(r, r.toLowerCase())), r
        }
      }, f.test(c) && r("jQuery.fn.attr('" + c + "') may use property instead of attribute")), s.call(e, t, a, i))
    }, e.attrHooks.value = {
      get: function(e, t) {
        var n = (e.nodeName || "").toLowerCase();
        return "button" === n ? u.apply(this, arguments) : ("input" !== n && "option" !== n && r("jQuery.fn.attr('value') no longer gets properties"), t in e ? e.value : null)
      },
      set: function(e, t) {
        var a = (e.nodeName || "").toLowerCase();
        return "button" === a ? c.apply(this, arguments) : ("input" !== a && "option" !== a && r("jQuery.fn.attr('value', val) no longer sets properties"), e.value = t, n)
      }
    };
    var g, h, v = e.fn.init,
      m = e.parseJSON,
      y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    e.fn.init = function(t, n, a) {
      var i;
      return t && "string" == typeof t && !e.isPlainObject(n) && (i = y.exec(e.trim(t))) && i[0] && ("<" !== t.charAt(0) && r("$(html) HTML strings must start with '<' character"), i[3] && r("$(html) HTML text after last tag is ignored"), "#" === i[0].charAt(0) && (r("HTML string cannot start with a '#' character"), e.error("JQMIGRATE: Invalid selector string (XSS)")), n && n.context && (n = n.context), e.parseHTML) ? v.call(this, e.parseHTML(i[2], n, !0), n, a) : v.apply(this, arguments)
    }, e.fn.init.prototype = e.fn, e.parseJSON = function(e) {
      return e || null === e ? m.apply(this, arguments) : (r("jQuery.parseJSON requires a valid JSON string"), null)
    }, e.uaMatch = function(e) {
      e = e.toLowerCase();
      var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
      return {
        browser: t[1] || "",
        version: t[2] || "0"
      }
    }, e.browser || (g = e.uaMatch(navigator.userAgent), h = {}, g.browser && (h[g.browser] = !0, h.version = g.version), h.chrome ? h.webkit = !0 : h.webkit && (h.safari = !0), e.browser = h), a(e, "browser", e.browser, "jQuery.browser is deprecated"), e.sub = function() {
      function t(e, n) {
        return new t.fn.init(e, n)
      }
      e.extend(!0, t, this), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function(r, a) {
        return a && a instanceof e && !(a instanceof t) && (a = t(a)), e.fn.init.call(this, r, a, n)
      }, t.fn.init.prototype = t.fn;
      var n = t(document);
      return r("jQuery.sub() is deprecated"), t
    }, e.ajaxSetup({
      converters: {
        "text json": e.parseJSON
      }
    });
    var b = e.fn.data;
    e.fn.data = function(t) {
      var a, i, o = this[0];
      return !o || "events" !== t || 1 !== arguments.length || (a = e.data(o, t), i = e._data(o, t), a !== n && a !== i || i === n) ? b.apply(this, arguments) : (r("Use of jQuery.fn.data('events') is deprecated"), i)
    };
    var j = /\/(java|ecma)script/i,
      w = e.fn.andSelf || e.fn.addBack;
    e.fn.andSelf = function() {
      return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), w.apply(this, arguments)
    }, e.clean || (e.clean = function(t, a, i, o) {
      a = a || document, a = !a.nodeType && a[0] || a, a = a.ownerDocument || a, r("jQuery.clean() is deprecated");
      var s, u, c, l, d = [];
      if (e.merge(d, e.buildFragment(t, a).childNodes), i)
        for (c = function(e) {
            return !e.type || j.test(e.type) ? o ? o.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e) : n
          }, s = 0; null != (u = d[s]); s++) e.nodeName(u, "script") && c(u) || (i.appendChild(u), u.getElementsByTagName !== n && (l = e.grep(e.merge([], u.getElementsByTagName("script")), c), d.splice.apply(d, [s + 1, 0].concat(l)), s += l.length));
      return d
    });
    var Q = e.event.add,
      x = e.event.remove,
      k = e.event.trigger,
      N = e.fn.toggle,
      T = e.fn.live,
      M = e.fn.die,
      S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
      C = RegExp("\\b(?:" + S + ")\\b"),
      H = /(?:^|\s)hover(\.\S+|)\b/,
      A = function(t) {
        return "string" != typeof t || e.event.special.hover ? t : (H.test(t) && r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), t && t.replace(H, "mouseenter$1 mouseleave$1"))
      };
    e.event.props && "attrChange" !== e.event.props[0] && e.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), e.event.dispatch && a(e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), e.event.add = function(e, t, n, a, i) {
      e !== document && C.test(t) && r("AJAX events should be attached to document: " + t), Q.call(this, e, A(t || ""), n, a, i)
    }, e.event.remove = function(e, t, n, r, a) {
      x.call(this, e, A(t) || "", n, r, a)
    }, e.fn.error = function() {
      var e = Array.prototype.slice.call(arguments, 0);
      return r("jQuery.fn.error() is deprecated"), e.splice(0, 0, "error"), arguments.length ? this.bind.apply(this, e) : (this.triggerHandler.apply(this, e), this)
    }, e.fn.toggle = function(t, n) {
      if (!e.isFunction(t) || !e.isFunction(n)) return N.apply(this, arguments);
      r("jQuery.fn.toggle(handler, handler...) is deprecated");
      var a = arguments,
        i = t.guid || e.guid++,
        o = 0,
        s = function(n) {
          var r = (e._data(this, "lastToggle" + t.guid) || 0) % o;
          return e._data(this, "lastToggle" + t.guid, r + 1), n.preventDefault(), a[r].apply(this, arguments) || !1
        };
      for (s.guid = i; a.length > o;) a[o++].guid = i;
      return this.click(s)
    }, e.fn.live = function(t, n, a) {
      return r("jQuery.fn.live() is deprecated"), T ? T.apply(this, arguments) : (e(this.context).on(t, this.selector, n, a), this)
    }, e.fn.die = function(t, n) {
      return r("jQuery.fn.die() is deprecated"), M ? M.apply(this, arguments) : (e(this.context).off(t, this.selector || "**", n), this)
    }, e.event.trigger = function(e, t, n, a) {
      return n || C.test(e) || r("Global events are undocumented and deprecated"), k.call(this, e, t, n || document, a)
    }, e.each(S.split("|"), function(t, n) {
      e.event.special[n] = {
        setup: function() {
          var t = this;
          return t !== document && (e.event.add(document, n + "." + e.guid, function() {
            e.event.trigger(n, null, t, !0)
          }), e._data(this, n, e.guid++)), !1
        },
        teardown: function() {
          return this !== document && e.event.remove(document, n + "." + e._data(this, n)), !1
        }
      }
    })
  }(jQuery, window);;
(function($) {
  $.fn.drag = function(str, arg, opts) {
    var type = typeof str == "string" ? str : "",
      fn = $.isFunction(str) ? str : $.isFunction(arg) ? arg : null;
    if (type.indexOf("drag") !== 0)
      type = "drag" + type;
    opts = (str == fn ? arg : opts) || {};
    return fn ? this.bind(type, opts, fn) : this.trigger(type);
  };
  var $event = $.event,
    $special = $event.special,
    drag = $special.drag = {
      defaults: {
        which: 1,
        distance: 0,
        not: ':input',
        handle: null,
        relative: false,
        drop: true,
        click: false
      },
      datakey: "dragdata",
      noBubble: true,
      add: function(obj) {
        var data = $.data(this, drag.datakey),
          opts = obj.data || {};
        data.related += 1;
        $.each(drag.defaults, function(key, def) {
          if (opts[key] !== undefined)
            data[key] = opts[key];
        });
      },
      remove: function() {
        $.data(this, drag.datakey).related -= 1;
      },
      setup: function() {
        if ($.data(this, drag.datakey))
          return;
        var data = $.extend({
          related: 0
        }, drag.defaults);
        $.data(this, drag.datakey, data);
        $event.add(this, "touchstart mousedown", drag.init, data);
        if (this.attachEvent)
          this.attachEvent("ondragstart", drag.dontstart);
      },
      teardown: function() {
        var data = $.data(this, drag.datakey) || {};
        if (data.related)
          return;
        $.removeData(this, drag.datakey);
        $event.remove(this, "touchstart mousedown", drag.init);
        drag.textselect(true);
        if (this.detachEvent)
          this.detachEvent("ondragstart", drag.dontstart);
      },
      init: function(event) {
        if (drag.touched)
          return;
        var dd = event.data,
          results;
        if (event.which != 0 && dd.which > 0 && event.which != dd.which)
          return;
        if ($(event.target).is(dd.not))
          return;
        if (dd.handle && !$(event.target).closest(dd.handle, event.currentTarget).length)
          return;
        drag.touched = event.type == 'touchstart' ? this : null;
        dd.propagates = 1;
        dd.mousedown = this;
        dd.interactions = [drag.interaction(this, dd)];
        dd.target = event.target;
        dd.pageX = event.pageX;
        dd.pageY = event.pageY;
        dd.dragging = null;
        results = drag.hijack(event, "draginit", dd);
        if (!dd.propagates)
          return;
        results = drag.flatten(results);
        if (results && results.length) {
          dd.interactions = [];
          $.each(results, function() {
            dd.interactions.push(drag.interaction(this, dd));
          });
        }
        dd.propagates = dd.interactions.length;
        if (dd.drop !== false && $special.drop)
          $special.drop.handler(event, dd);
        drag.textselect(false);
        if (drag.touched)
          $event.add(drag.touched, "touchmove touchend", drag.handler, dd);
        else
          $event.add(document, "mousemove mouseup", drag.handler, dd);
        if (!drag.touched || dd.live)
          return false;
      },
      interaction: function(elem, dd) {
        var offset = $(elem)[dd.relative ? "position" : "offset"]() || {
          top: 0,
          left: 0
        };
        return {
          drag: elem,
          callback: new drag.callback(),
          droppable: [],
          offset: offset
        };
      },
      handler: function(event) {
        var dd = event.data;
        switch (event.type) {
          case !dd.dragging && 'touchmove':
            event.preventDefault();
          case !dd.dragging && 'mousemove':
            if (Math.pow(event.pageX - dd.pageX, 2) + Math.pow(event.pageY - dd.pageY, 2) < Math.pow(dd.distance, 2))
              break;
            event.target = dd.target;
            drag.hijack(event, "dragstart", dd);
            if (dd.propagates)
              dd.dragging = true;
          case 'touchmove':
            event.preventDefault();
          case 'mousemove':
            if (dd.dragging) {
              drag.hijack(event, "drag", dd);
              if (dd.propagates) {
                if (dd.drop !== false && $special.drop)
                  $special.drop.handler(event, dd);
                break;
              }
              event.type = "mouseup";
            }
          case 'touchend':
          case 'mouseup':
          default:
            if (drag.touched)
              $event.remove(drag.touched, "touchmove touchend", drag.handler);
            else
              $event.remove(document, "mousemove mouseup", drag.handler);
            if (dd.dragging) {
              if (dd.drop !== false && $special.drop)
                $special.drop.handler(event, dd);
              drag.hijack(event, "dragend", dd);
            }
            drag.textselect(true);
            if (dd.click === false && dd.dragging)
              $.data(dd.mousedown, "suppress.click", new Date().getTime() + 5);
            dd.dragging = drag.touched = false;
            break;
        }
      },
      hijack: function(event, type, dd, x, elem) {
        if (!dd)
          return;
        var orig = {
            event: event.originalEvent,
            type: event.type
          },
          mode = type.indexOf("drop") ? "drag" : "drop",
          result, i = x || 0,
          ia, $elems, callback, len = !isNaN(x) ? x : dd.interactions.length;
        event.type = type;
        event.originalEvent = null;
        dd.results = [];
        do
          if (ia = dd.interactions[i]) {
            if (type !== "dragend" && ia.cancelled)
              continue;
            callback = drag.properties(event, dd, ia);
            ia.results = [];
            $(elem || ia[mode] || dd.droppable).each(function(p, subject) {
              callback.target = subject;
              event.isPropagationStopped = function() {
                return false;
              };
              result = subject ? $event.dispatch.call(subject, event, callback) : null;
              if (result === false) {
                if (mode == "drag") {
                  ia.cancelled = true;
                  dd.propagates -= 1;
                }
                if (type == "drop") {
                  ia[mode][p] = null;
                }
              } else if (type == "dropinit")
                ia.droppable.push(drag.element(result) || subject);
              if (type == "dragstart")
                ia.proxy = $(drag.element(result) || ia.drag)[0];
              ia.results.push(result);
              delete event.result;
              if (type !== "dropinit")
                return result;
            });
            dd.results[i] = drag.flatten(ia.results);
            if (type == "dropinit")
              ia.droppable = drag.flatten(ia.droppable);
            if (type == "dragstart" && !ia.cancelled)
              callback.update();
          }
        while (++i < len)
          event.type = orig.type;
        event.originalEvent = orig.event;
        return drag.flatten(dd.results);
      },
      properties: function(event, dd, ia) {
        var obj = ia.callback;
        obj.drag = ia.drag;
        obj.proxy = ia.proxy || ia.drag;
        obj.startX = dd.pageX;
        obj.startY = dd.pageY;
        obj.deltaX = event.pageX - dd.pageX;
        obj.deltaY = event.pageY - dd.pageY;
        obj.originalX = ia.offset.left;
        obj.originalY = ia.offset.top;
        obj.offsetX = obj.originalX + obj.deltaX;
        obj.offsetY = obj.originalY + obj.deltaY;
        obj.drop = drag.flatten((ia.drop || []).slice());
        obj.available = drag.flatten((ia.droppable || []).slice());
        return obj;
      },
      element: function(arg) {
        if (arg && (arg.jquery || arg.nodeType == 1))
          return arg;
      },
      flatten: function(arr) {
        return $.map(arr, function(member) {
          return member && member.jquery ? $.makeArray(member) : member && member.length ? drag.flatten(member) : member;
        });
      },
      textselect: function(bool) {
        $(document)[bool ? "unbind" : "bind"]("selectstart", drag.dontstart).css("MozUserSelect", bool ? "" : "none");
        document.unselectable = bool ? "off" : "on";
      },
      dontstart: function() {
        return false;
      },
      callback: function() {}
    };
  drag.callback.prototype = {
    update: function() {
      if ($special.drop && this.available.length)
        $.each(this.available, function(i) {
          $special.drop.locate(this, i);
        });
    }
  };
  var $dispatch = $event.dispatch;
  $event.dispatch = function(event) {
    if ($.data(this, "suppress." + event.type) - new Date().getTime() > 0) {
      $.removeData(this, "suppress." + event.type);
      return;
    }
    return $dispatch.apply(this, arguments);
  };
  var touchHooks = $event.fixHooks.touchstart = $event.fixHooks.touchmove = $event.fixHooks.touchend = $event.fixHooks.touchcancel = {
    props: "clientX clientY pageX pageY screenX screenY".split(" "),
    filter: function(event, orig) {
      if (orig) {
        var touched = (orig.touches && orig.touches[0]) || (orig.changedTouches && orig.changedTouches[0]) || null;
        if (touched)
          $.each(touchHooks.props, function(i, prop) {
            event[prop] = touched[prop];
          });
      }
      return event;
    }
  };
  $special.draginit = $special.dragstart = $special.dragend = drag;
})(jQuery);
(function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
})(function(t) {
  function i(t) {
    n(function() {
      var i, e;
      for (i = 0; t.length > i; i++) e = t[i], e.obj.css(e.css)
    })
  }

  function e(i) {
    return t.trim(i).toLowerCase()
  }
  var s, h, o;
  o = function(t, i) {
    return function() {
      return t.apply(i, arguments)
    }
  }, h = {
    align: "center",
    autoResize: !1,
    comparator: null,
    container: t("body"),
    direction: void 0,
    ignoreInactiveItems: !0,
    itemWidth: 0,
    fillEmptySpace: !1,
    flexibleWidth: 0,
    offset: 2,
    outerOffset: 0,
    onLayoutChanged: void 0,
    possibleFilters: [],
    resizeDelay: 50,
    verticalOffset: void 0
  };
  var n = window.requestAnimationFrame || function(t) {
      t()
    },
    r = t(window);
  s = function() {
    function s(i, e) {
      this.handler = i, this.columns = this.containerWidth = this.resizeTimer = null, this.activeItemCount = 0, this.itemHeightsDirty = !0, this.placeholders = [], t.extend(!0, this, h, e), this.verticalOffset = this.verticalOffset || this.offset, this.update = o(this.update, this), this.onResize = o(this.onResize, this), this.onRefresh = o(this.onRefresh, this), this.getItemWidth = o(this.getItemWidth, this), this.layout = o(this.layout, this), this.layoutFull = o(this.layoutFull, this), this.layoutColumns = o(this.layoutColumns, this), this.filter = o(this.filter, this), this.clear = o(this.clear, this), this.getActiveItems = o(this.getActiveItems, this), this.refreshPlaceholders = o(this.refreshPlaceholders, this), this.sortElements = o(this.sortElements, this), this.updateFilterClasses = o(this.updateFilterClasses, this), this.updateFilterClasses(), this.autoResize && r.bind("resize.wookmark", this.onResize), this.container.bind("refreshWookmark", this.onRefresh)
    }
    return s.prototype.updateFilterClasses = function() {
      for (var t, i, s, h, o = 0, n = 0, r = 0, a = {}, l = this.possibleFilters; this.handler.length > o; o++)
        if (i = this.handler.eq(o), t = i.data("filterClass"), "object" == typeof t && t.length > 0)
          for (n = 0; t.length > n; n++) s = e(t[n]), a[s] === void 0 && (a[s] = []), a[s].push(i[0]);
      for (; l.length > r; r++) h = e(l[r]), h in a || (a[h] = []);
      this.filterClasses = a
    }, s.prototype.update = function(i) {
      this.itemHeightsDirty = !0, t.extend(!0, this, i)
    }, s.prototype.onResize = function() {
      clearTimeout(this.resizeTimer), this.itemHeightsDirty = 0 !== this.flexibleWidth, this.resizeTimer = setTimeout(this.layout, this.resizeDelay)
    }, s.prototype.onRefresh = function() {
      this.itemHeightsDirty = !0, this.layout()
    }, s.prototype.filter = function(i, s, h) {
      var o, n, r, a, l, f = [],
        u = t();
      if (i = i || [], s = s || "or", h = h || !1, i.length) {
        for (n = 0; i.length > n; n++) l = e(i[n]), l in this.filterClasses && f.push(this.filterClasses[l]);
        if (o = f.length, "or" == s || 1 == o)
          for (n = 0; o > n; n++) u = u.add(f[n]);
        else if ("and" == s) {
          var c, d, m, p = f[0],
            g = !0;
          for (n = 1; o > n; n++) f[n].length < p.length && (p = f[n]);
          for (p = p || [], n = 0; p.length > n; n++) {
            for (d = p[n], g = !0, r = 0; f.length > r && g; r++)
              if (m = f[r], p != m) {
                for (a = 0, c = !1; m.length > a && !c; a++) c = m[a] == d;
                g &= c
              }
            g && u.push(p[n])
          }
        }
        h || this.handler.not(u).addClass("inactive")
      } else u = this.handler;
      return h || (u.removeClass("inactive"), this.columns = null, this.layout()), u
    }, s.prototype.refreshPlaceholders = function(i, e) {
      for (var s, h, o, n, r, a, l = this.placeholders.length, f = this.columns.length, u = this.container.innerHeight(); f > l; l++) s = t('<div class="wookmark-placeholder"/>').appendTo(this.container), this.placeholders.push(s);
      for (a = this.offset + 2 * parseInt(this.placeholders[0].css("borderLeftWidth"), 10), l = 0; this.placeholders.length > l; l++)
        if (s = this.placeholders[l], o = this.columns[l], l >= f || !o[o.length - 1]) s.css("display", "none");
        else {
          if (h = o[o.length - 1], !h) continue;
          r = h.data("wookmark-top") + h.data("wookmark-height") + this.verticalOffset, n = u - r - a, s.css({
            position: "absolute",
            display: n > 0 ? "block" : "none",
            left: l * i + e,
            top: r,
            width: i - a,
            height: n
          })
        }
    }, s.prototype.getActiveItems = function() {
      return this.ignoreInactiveItems ? this.handler.not(".inactive") : this.handler
    }, s.prototype.getItemWidth = function() {
      var t = this.itemWidth,
        i = this.container.width() - 2 * this.outerOffset,
        e = this.handler.eq(0),
        s = this.flexibleWidth;
      if (void 0 === this.itemWidth || 0 === this.itemWidth && !this.flexibleWidth ? t = e.outerWidth() : "string" == typeof this.itemWidth && this.itemWidth.indexOf("%") >= 0 && (t = parseFloat(this.itemWidth) / 100 * i), s) {
        "string" == typeof s && s.indexOf("%") >= 0 && (s = parseFloat(s) / 100 * i);
        var h = i + this.offset,
          o = ~~(.5 + h / (s + this.offset)),
          n = ~~(h / (t + this.offset)),
          r = Math.max(o, n),
          a = Math.min(s, ~~((i - (r - 1) * this.offset) / r));
        t = Math.max(t, a), this.handler.css("width", t)
      }
      return t
    }, s.prototype.layout = function(t) {
      if (this.container.is(":visible")) {
        var i, e = this.getItemWidth() + this.offset,
          s = this.container.width(),
          h = s - 2 * this.outerOffset,
          o = ~~((h + this.offset) / e),
          n = 0,
          r = 0,
          a = 0,
          l = this.getActiveItems(),
          f = l.length;
        if (this.itemHeightsDirty || !this.container.data("itemHeightsInitialized")) {
          for (; f > a; a++) i = l.eq(a), i.data("wookmark-height", i.outerHeight());
          this.itemHeightsDirty = !1, this.container.data("itemHeightsInitialized", !0)
        }
        o = Math.max(1, Math.min(o, f)), n = this.outerOffset, "center" == this.align && (n += ~~(.5 + (h - (o * e - this.offset)) >> 1)), this.direction = this.direction || ("right" == this.align ? "right" : "left"), r = t || null === this.columns || this.columns.length != o || this.activeItemCount != f ? this.layoutFull(e, o, n) : this.layoutColumns(e, n), this.activeItemCount = f, this.container.css("height", r), this.fillEmptySpace && this.refreshPlaceholders(e, n), void 0 !== this.onLayoutChanged && "function" == typeof this.onLayoutChanged && this.onLayoutChanged()
      }
    }, s.prototype.sortElements = function(t) {
      return "function" == typeof this.comparator ? t.sort(this.comparator) : t
    }, s.prototype.layoutFull = function(e, s, h) {
      var o, n, r = 0,
        a = 0,
        l = t.makeArray(this.getActiveItems()),
        f = l.length,
        u = null,
        c = null,
        d = [],
        m = [],
        p = "left" == this.align ? !0 : !1;
      for (this.columns = [], l = this.sortElements(l); s > d.length;) d.push(this.outerOffset), this.columns.push([]);
      for (; f > r; r++) {
        for (o = t(l[r]), u = d[0], c = 0, a = 0; s > a; a++) u > d[a] && (u = d[a], c = a);
        o.data("wookmark-top", u), n = h, (c > 0 || !p) && (n += c * e), (m[r] = {
          obj: o,
          css: {
            position: "absolute",
            top: u
          }
        }).css[this.direction] = n, d[c] += o.data("wookmark-height") + this.verticalOffset, this.columns[c].push(o)
      }
      return i(m), Math.max.apply(Math, d)
    }, s.prototype.layoutColumns = function(t, e) {
      for (var s, h, o, n, r = [], a = [], l = 0, f = 0, u = 0; this.columns.length > l; l++) {
        for (r.push(this.outerOffset), h = this.columns[l], n = l * t + e, s = r[l], f = 0; h.length > f; f++, u++) o = h[f].data("wookmark-top", s), (a[u] = {
          obj: o,
          css: {
            top: s
          }
        }).css[this.direction] = n, s += o.data("wookmark-height") + this.verticalOffset;
        r[l] = s
      }
      return i(a), Math.max.apply(Math, r)
    }, s.prototype.clear = function() {
      clearTimeout(this.resizeTimer), r.unbind("resize.wookmark", this.onResize), this.container.unbind("refreshWookmark", this.onRefresh), this.handler.wookmarkInstance = null
    }, s
  }(), t.fn.wookmark = function(t) {
    return this.wookmarkInstance ? this.wookmarkInstance.update(t || {}) : this.wookmarkInstance = new s(this, t || {}), this.wookmarkInstance.layout(!0), this.show()
  }
});
(function($) {
  "use strict";
  $.fn.fitVids = function(options) {
    var settings = {
      customSelector: null
    };
    if (!document.getElementById('fit-vids-style')) {
      var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
        cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';
      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;
      ref.parentNode.insertBefore(div, ref);
    }
    if (options) {
      $.extend(settings, options);
    }
    return this.each(function() {
      var selectors = ["iframe[src*='udn.com']", "iframe[src*='player.vimeo.com']", "iframe[src*='google.com/maps']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }
      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object");
      $allVideos.each(function() {
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
          return;
        }
        var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
          width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
          aspectRatio = height / width;
        if (!$this.attr('id')) {
          var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})(window.jQuery || window.Zepto);
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {
  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }
  var config = $.cookie = function(key, value, options) {
    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);
      if (typeof options.expires === 'number') {
        var days = options.expires,
          t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }
      var pathStr = '; path=' + options.path;
      if ($.browser.msie) {
        pathStr = '; path=' + window.location.pathname;
      }
      return (document.cookie = [config.raw ? key : encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? pathStr : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''));
    }
    var result = key ? undefined : {};
    var cookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');
      if (key && key === name) {
        result = read(cookie, value);
        break;
      }
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }
    return result;
  };
  config.defaults = {};
  $.removeCookie = function(key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }
    $.cookie(key, '', $.extend({}, options, {
      expires: -1
    }));
    return !$.cookie(key);
  };
}));
(function($) {
  function sc_setScroll(a, b, c) {
    return "transition" == c.transition && "swing" == b && (b = "ease"), {
      anims: [],
      duration: a,
      orgDuration: a,
      easing: b,
      startTime: getTime()
    }
  }

  function sc_startScroll(a, b) {
    for (var c = 0, d = a.anims.length; d > c; c++) {
      var e = a.anims[c];
      e && e[0][b.transition](e[1], a.duration, a.easing, e[2])
    }
  }

  function sc_stopScroll(a, b) {
    is_boolean(b) || (b = !0), is_object(a.pre) && sc_stopScroll(a.pre, b);
    for (var c = 0, d = a.anims.length; d > c; c++) {
      var e = a.anims[c];
      e[0].stop(!0), b && (e[0].css(e[1]), is_function(e[2]) && e[2]())
    }
    is_object(a.post) && sc_stopScroll(a.post, b)
  }

  function sc_afterScroll(a, b, c) {
    switch (b && b.remove(), c.fx) {
      case "fade":
      case "crossfade":
      case "cover-fade":
      case "uncover-fade":
        a.css("opacity", 1), a.css("filter", "")
    }
  }

  function sc_fireCallbacks(a, b, c, d, e) {
    if (b[c] && b[c].call(a, d), e[c].length)
      for (var f = 0, g = e[c].length; g > f; f++) e[c][f].call(a, d);
    return []
  }

  function sc_fireQueue(a, b, c) {
    return b.length && (a.trigger(cf_e(b[0][0], c), b[0][1]), b.shift()), b
  }

  function sc_hideHiddenItems(a) {
    a.each(function() {
      var a = $(this);
      a.data("_cfs_isHidden", a.is(":hidden")).hide()
    })
  }

  function sc_showHiddenItems(a) {
    a && a.each(function() {
      var a = $(this);
      a.data("_cfs_isHidden") || a.show()
    })
  }

  function sc_clearTimers(a) {
    return a.auto && clearTimeout(a.auto), a.progress && clearInterval(a.progress), a
  }

  function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
    return {
      width: g.width,
      height: g.height,
      items: {
        old: a,
        skipped: b,
        visible: c
      },
      scroll: {
        items: d,
        direction: e,
        duration: f
      }
    }
  }

  function sc_getDuration(a, b, c, d) {
    var e = a.duration;
    return "none" == a.fx ? 0 : ("auto" == e ? e = b.scroll.duration / b.scroll.items * c : 10 > e && (e = d / e), 1 > e ? 0 : ("fade" == a.fx && (e /= 2), Math.round(e)))
  }

  function nv_showNavi(a, b, c) {
    var d = is_number(a.items.minimum) ? a.items.minimum : a.items.visible + 1;
    if ("show" == b || "hide" == b) var e = b;
    else if (d > b) {
      debug(c, "Not enough items (" + b + " total, " + d + " needed): Hiding navigation.");
      var e = "hide"
    } else var e = "show";
    var f = "show" == e ? "removeClass" : "addClass",
      g = cf_c("hidden", c);
    a.auto.button && a.auto.button[e]()[f](g), a.prev.button && a.prev.button[e]()[f](g), a.next.button && a.next.button[e]()[f](g), a.pagination.container && a.pagination.container[e]()[f](g)
  }

  function nv_enableNavi(a, b, c) {
    if (!a.circular && !a.infinite) {
      var d = "removeClass" == b || "addClass" == b ? b : !1,
        e = cf_c("disabled", c);
      if (a.auto.button && d && a.auto.button[d](e), a.prev.button) {
        var f = d || 0 == b ? "addClass" : "removeClass";
        a.prev.button[f](e)
      }
      if (a.next.button) {
        var f = d || b == a.items.visible ? "addClass" : "removeClass";
        a.next.button[f](e)
      }
    }
  }

  function go_getObject(a, b) {
    return is_function(b) ? b = b.call(a) : is_undefined(b) && (b = {}), b
  }

  function go_getItemsObject(a, b) {
    return b = go_getObject(a, b), is_number(b) ? b = {
      visible: b
    } : "variable" == b ? b = {
      visible: b,
      width: b,
      height: b
    } : is_object(b) || (b = {}), b
  }

  function go_getScrollObject(a, b) {
    return b = go_getObject(a, b), is_number(b) ? b = 50 >= b ? {
      items: b
    } : {
      duration: b
    } : is_string(b) ? b = {
      easing: b
    } : is_object(b) || (b = {}), b
  }

  function go_getNaviObject(a, b) {
    if (b = go_getObject(a, b), is_string(b)) {
      var c = cf_getKeyCode(b);
      b = -1 == c ? $(b) : c
    }
    return b
  }

  function go_getAutoObject(a, b) {
    return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
      button: b
    } : is_boolean(b) ? b = {
      play: b
    } : is_number(b) && (b = {
      timeoutDuration: b
    }), b.progress && (is_string(b.progress) || is_jquery(b.progress)) && (b.progress = {
      bar: b.progress
    }), b
  }

  function go_complementAutoObject(a, b) {
    return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_boolean(b.play) || (b.play = !0), is_number(b.delay) || (b.delay = 0), is_undefined(b.pauseOnEvent) && (b.pauseOnEvent = !0), is_boolean(b.pauseOnResize) || (b.pauseOnResize = !0), is_number(b.timeoutDuration) || (b.timeoutDuration = 10 > b.duration ? 2500 : 5 * b.duration), b.progress && (is_function(b.progress.bar) && (b.progress.bar = b.progress.bar.call(a)), is_string(b.progress.bar) && (b.progress.bar = $(b.progress.bar)), b.progress.bar ? (is_function(b.progress.updater) || (b.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(b.progress.interval) || (b.progress.interval = 50)) : b.progress = !1), b
  }

  function go_getPrevNextObject(a, b) {
    return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
      button: b
    } : is_number(b) && (b = {
      key: b
    }), b
  }

  function go_complementPrevNextObject(a, b) {
    return is_function(b.button) && (b.button = b.button.call(a)), is_string(b.button) && (b.button = $(b.button)), is_string(b.key) && (b.key = cf_getKeyCode(b.key)), b
  }

  function go_getPaginationObject(a, b) {
    return b = go_getNaviObject(a, b), is_jquery(b) ? b = {
      container: b
    } : is_boolean(b) && (b = {
      keys: b
    }), b
  }

  function go_complementPaginationObject(a, b) {
    return is_function(b.container) && (b.container = b.container.call(a)), is_string(b.container) && (b.container = $(b.container)), is_number(b.items) || (b.items = !1), is_boolean(b.keys) || (b.keys = !1), is_function(b.anchorBuilder) || is_false(b.anchorBuilder) || (b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(b.deviation) || (b.deviation = 0), b
  }

  function go_getSwipeObject(a, b) {
    return is_function(b) && (b = b.call(a)), is_undefined(b) && (b = {
      onTouch: !1
    }), is_true(b) ? b = {
      onTouch: b
    } : is_number(b) && (b = {
      items: b
    }), b
  }

  function go_complementSwipeObject(a, b) {
    return is_boolean(b.onTouch) || (b.onTouch = !0), is_boolean(b.onMouse) || (b.onMouse = !1), is_object(b.options) || (b.options = {}), is_boolean(b.options.triggerOnTouchEnd) || (b.options.triggerOnTouchEnd = !1), b
  }

  function go_getMousewheelObject(a, b) {
    return is_function(b) && (b = b.call(a)), is_true(b) ? b = {} : is_number(b) ? b = {
      items: b
    } : is_undefined(b) && (b = !1), b
  }

  function go_complementMousewheelObject(a, b) {
    return b
  }

  function gn_getItemIndex(a, b, c, d, e) {
    if (is_string(a) && (a = $(a, e)), is_object(a) && (a = $(a, e)), is_jquery(a) ? (a = e.children().index(a), is_boolean(c) || (c = !1)) : is_boolean(c) || (c = !0), is_number(a) || (a = 0), is_number(b) || (b = 0), c && (a += d.first), a += b, d.total > 0) {
      for (; a >= d.total;) a -= d.total;
      for (; 0 > a;) a += d.total
    }
    return a
  }

  function gn_getVisibleItemsPrev(a, b, c) {
    for (var d = 0, e = 0, f = c; f >= 0; f--) {
      var g = a.eq(f);
      if (d += g.is(":visible") ? g[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
      0 == f && (f = a.length), e++
    }
  }

  function gn_getVisibleItemsPrevFilter(a, b, c) {
    return gn_getItemsPrevFilter(a, b.items.filter, b.items.visibleConf.org, c)
  }

  function gn_getScrollItemsPrevFilter(a, b, c, d) {
    return gn_getItemsPrevFilter(a, b.items.filter, d, c)
  }

  function gn_getItemsPrevFilter(a, b, c, d) {
    for (var e = 0, f = 0, g = d, h = a.length; g >= 0; g--) {
      if (f++, f == h) return f;
      var i = a.eq(g);
      if (i.is(b) && (e++, e == c)) return f;
      0 == g && (g = h)
    }
  }

  function gn_getVisibleOrg(a, b) {
    return b.items.visibleConf.org || a.children().slice(0, b.items.visible).filter(b.items.filter).length
  }

  function gn_getVisibleItemsNext(a, b, c) {
    for (var d = 0, e = 0, f = c, g = a.length - 1; g >= f; f++) {
      var h = a.eq(f);
      if (d += h.is(":visible") ? h[b.d.outerWidth](!0) : 0, d > b.maxDimension) return e;
      if (e++, e == g + 1) return e;
      f == g && (f = -1)
    }
  }

  function gn_getVisibleItemsNextTestCircular(a, b, c, d) {
    var e = gn_getVisibleItemsNext(a, b, c);
    return b.circular || c + e > d && (e = d - c), e
  }

  function gn_getVisibleItemsNextFilter(a, b, c) {
    return gn_getItemsNextFilter(a, b.items.filter, b.items.visibleConf.org, c, b.circular)
  }

  function gn_getScrollItemsNextFilter(a, b, c, d) {
    return gn_getItemsNextFilter(a, b.items.filter, d + 1, c, b.circular) - 1
  }

  function gn_getItemsNextFilter(a, b, c, d) {
    for (var f = 0, g = 0, h = d, i = a.length - 1; i >= h; h++) {
      if (g++, g >= i) return g;
      var j = a.eq(h);
      if (j.is(b) && (f++, f == c)) return g;
      h == i && (h = -1)
    }
  }

  function gi_getCurrentItems(a, b) {
    return a.slice(0, b.items.visible)
  }

  function gi_getOldItemsPrev(a, b, c) {
    return a.slice(c, b.items.visibleConf.old + c)
  }

  function gi_getNewItemsPrev(a, b) {
    return a.slice(0, b.items.visible)
  }

  function gi_getOldItemsNext(a, b) {
    return a.slice(0, b.items.visibleConf.old)
  }

  function gi_getNewItemsNext(a, b, c) {
    return a.slice(c, b.items.visible + c)
  }

  function sz_storeMargin(a, b, c) {
    b.usePadding && (is_string(c) || (c = "_cfs_origCssMargin"), a.each(function() {
      var a = $(this),
        d = parseInt(a.css(b.d.marginRight), 10);
      is_number(d) || (d = 0), a.data(c, d)
    }))
  }

  function sz_resetMargin(a, b, c) {
    if (b.usePadding) {
      var d = is_boolean(c) ? c : !1;
      is_number(c) || (c = 0), sz_storeMargin(a, b, "_cfs_tempCssMargin"), a.each(function() {
        var a = $(this);
        a.css(b.d.marginRight, d ? a.data("_cfs_tempCssMargin") : c + a.data("_cfs_origCssMargin"))
      })
    }
  }

  function sz_storeOrigCss(a) {
    a.each(function() {
      var a = $(this);
      a.data("_cfs_origCss", a.attr("style") || "")
    })
  }

  function sz_restoreOrigCss(a) {
    a.each(function() {
      var a = $(this);
      a.attr("style", a.data("_cfs_origCss") || "")
    })
  }

  function sz_setResponsiveSizes(a, b) {
    var d = (a.items.visible, a.items[a.d.width]),
      e = a[a.d.height],
      f = is_percentage(e);
    b.each(function() {
      var b = $(this),
        c = d - ms_getPaddingBorderMargin(b, a, "Width");
      b[a.d.width](c), f && b[a.d.height](ms_getPercentage(c, e))
    })
  }

  function sz_setSizes(a, b) {
    var c = a.parent(),
      d = a.children(),
      e = gi_getCurrentItems(d, b),
      f = cf_mapWrapperSizes(ms_getSizes(e, b, !0), b, !1);
    if (c.css(f), b.usePadding) {
      var g = b.padding,
        h = g[b.d[1]];
      b.align && 0 > h && (h = 0);
      var i = e.last();
      i.css(b.d.marginRight, i.data("_cfs_origCssMargin") + h), a.css(b.d.top, g[b.d[0]]), a.css(b.d.left, g[b.d[3]])
    }
    return a.css(b.d.width, f[b.d.width] + 2 * ms_getTotalSize(d, b, "width")), a.css(b.d.height, ms_getLargestSize(d, b, "height")), f
  }

  function ms_getSizes(a, b, c) {
    return [ms_getTotalSize(a, b, "width", c), ms_getLargestSize(a, b, "height", c)]
  }

  function ms_getLargestSize(a, b, c, d) {
    return is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d ? b[b.d[c]] : is_number(b.items[b.d[c]]) ? b.items[b.d[c]] : (c = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(a, b, c))
  }

  function ms_getTrueLargestSize(a, b, c) {
    for (var d = 0, e = 0, f = a.length; f > e; e++) {
      var g = a.eq(e),
        h = g.is(":visible") ? g[b.d[c]](!0) : 0;
      h > d && (d = h)
    }
    return d
  }

  function ms_getTotalSize(a, b, c, d) {
    if (is_boolean(d) || (d = !1), is_number(b[b.d[c]]) && d) return b[b.d[c]];
    if (is_number(b.items[b.d[c]])) return b.items[b.d[c]] * a.length;
    for (var e = c.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", f = 0, g = 0, h = a.length; h > g; g++) {
      var i = a.eq(g);
      f += i.is(":visible") ? i[b.d[e]](!0) : 0
    }
    return f
  }

  function ms_getParentSize(a, b, c) {
    var d = a.is(":visible");
    d && a.hide();
    var e = a.parent()[b.d[c]]();
    return d && a.show(), e
  }

  function ms_getMaxDimension(a, b) {
    return is_number(a[a.d.width]) ? a[a.d.width] : b
  }

  function ms_hasVariableSizes(a, b, c) {
    for (var d = !1, e = !1, f = 0, g = a.length; g > f; f++) {
      var h = a.eq(f),
        i = h.is(":visible") ? h[b.d[c]](!0) : 0;
      d === !1 ? d = i : d != i && (e = !0), 0 == d && (e = !0)
    }
    return e
  }

  function ms_getPaddingBorderMargin(a, b, c) {
    return a[b.d["outer" + c]](!0) - a[b.d[c.toLowerCase()]]()
  }

  function ms_getPercentage(a, b) {
    if (is_percentage(b)) {
      if (b = parseInt(b.slice(0, -1), 10), !is_number(b)) return a;
      a *= b / 100
    }
    return a
  }

  function cf_e(a, b, c, d, e) {
    return is_boolean(c) || (c = !0), is_boolean(d) || (d = !0), is_boolean(e) || (e = !1), c && (a = b.events.prefix + a), d && (a = a + "." + b.events.namespace), d && e && (a += b.serialNumber), a
  }

  function cf_c(a, b) {
    return is_string(b.classnames[a]) ? b.classnames[a] : a
  }

  function cf_mapWrapperSizes(a, b, c) {
    is_boolean(c) || (c = !0);
    var d = b.usePadding && c ? b.padding : [0, 0, 0, 0],
      e = {};
    return e[b.d.width] = a[0] + d[1] + d[3], e[b.d.height] = a[1] + d[0] + d[2], e
  }

  function cf_sortParams(a, b) {
    for (var c = [], d = 0, e = a.length; e > d; d++)
      for (var f = 0, g = b.length; g > f; f++)
        if (b[f].indexOf(typeof a[d]) > -1 && is_undefined(c[f])) {
          c[f] = a[d];
          break
        }
    return c
  }

  function cf_getPadding(a) {
    if (is_undefined(a)) return [0, 0, 0, 0];
    if (is_number(a)) return [a, a, a, a];
    if (is_string(a) && (a = a.split("px").join("").split("em").join("").split(" ")), !is_array(a)) return [0, 0, 0, 0];
    for (var b = 0; 4 > b; b++) a[b] = parseInt(a[b], 10);
    switch (a.length) {
      case 0:
        return [0, 0, 0, 0];
      case 1:
        return [a[0], a[0], a[0], a[0]];
      case 2:
        return [a[0], a[1], a[0], a[1]];
      case 3:
        return [a[0], a[1], a[2], a[1]];
      default:
        return [a[0], a[1], a[2], a[3]]
    }
  }

  function cf_getAlignPadding(a, b) {
    var c = is_number(b[b.d.width]) ? Math.ceil(b[b.d.width] - ms_getTotalSize(a, b, "width")) : 0;
    switch (b.align) {
      case "left":
        return [0, c];
      case "right":
        return [c, 0];
      case "center":
      default:
        return [Math.ceil(c / 2), Math.floor(c / 2)]
    }
  }

  function cf_getDimensions(a) {
    for (var b = [
        ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
        ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
      ], c = b[0].length, d = "right" == a.direction || "left" == a.direction ? 0 : 1, e = {}, f = 0; c > f; f++) e[b[0][f]] = b[d][f];
    return e
  }

  function cf_getAdjust(a, b, c, d) {
    var e = a;
    if (is_function(c)) e = c.call(d, e);
    else if (is_string(c)) {
      var f = c.split("+"),
        g = c.split("-");
      if (g.length > f.length) var h = !0,
        i = g[0],
        j = g[1];
      else var h = !1,
        i = f[0],
        j = f[1];
      switch (i) {
        case "even":
          e = 1 == a % 2 ? a - 1 : a;
          break;
        case "odd":
          e = 0 == a % 2 ? a - 1 : a;
          break;
        default:
          e = a
      }
      j = parseInt(j, 10), is_number(j) && (h && (j = -j), e += j)
    }
    return (!is_number(e) || 1 > e) && (e = 1), e
  }

  function cf_getItemsAdjust(a, b, c, d) {
    return cf_getItemAdjustMinMax(cf_getAdjust(a, b, c, d), b.items.visibleConf)
  }

  function cf_getItemAdjustMinMax(a, b) {
    return is_number(b.min) && b.min > a && (a = b.min), is_number(b.max) && a > b.max && (a = b.max), 1 > a && (a = 1), a
  }

  function cf_getSynchArr(a) {
    is_array(a) || (a = [
      [a]
    ]), is_array(a[0]) || (a = [a]);
    for (var b = 0, c = a.length; c > b; b++) is_string(a[b][0]) && (a[b][0] = $(a[b][0])), is_boolean(a[b][1]) || (a[b][1] = !0), is_boolean(a[b][2]) || (a[b][2] = !0), is_number(a[b][3]) || (a[b][3] = 0);
    return a
  }

  function cf_getKeyCode(a) {
    return "right" == a ? 39 : "left" == a ? 37 : "up" == a ? 38 : "down" == a ? 40 : -1
  }

  function cf_setCookie(a, b, c) {
    if (a) {
      var d = b.triggerHandler(cf_e("currentPosition", c));
      $.fn.carouFredSel.cookie.set(a, d)
    }
  }

  function cf_getCookie(a) {
    var b = $.fn.carouFredSel.cookie.get(a);
    return "" == b ? 0 : b
  }

  function in_mapCss(a, b) {
    for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = a.css(b[d]);
    return c
  }

  function in_complementItems(a, b, c, d) {
    return is_object(a.visibleConf) || (a.visibleConf = {}), is_object(a.sizesConf) || (a.sizesConf = {}), 0 == a.start && is_number(d) && (a.start = d), is_object(a.visible) ? (a.visibleConf.min = a.visible.min, a.visibleConf.max = a.visible.max, a.visible = !1) : is_string(a.visible) ? ("variable" == a.visible ? a.visibleConf.variable = !0 : a.visibleConf.adjust = a.visible, a.visible = !1) : is_function(a.visible) && (a.visibleConf.adjust = a.visible, a.visible = !1), is_string(a.filter) || (a.filter = c.filter(":hidden").length > 0 ? ":visible" : "*"), a[b.d.width] || (b.responsive ? (debug(!0, "Set a " + b.d.width + " for the items!"), a[b.d.width] = ms_getTrueLargestSize(c, b, "outerWidth")) : a[b.d.width] = ms_hasVariableSizes(c, b, "outerWidth") ? "variable" : c[b.d.outerWidth](!0)), a[b.d.height] || (a[b.d.height] = ms_hasVariableSizes(c, b, "outerHeight") ? "variable" : c[b.d.outerHeight](!0)), a.sizesConf.width = a.width, a.sizesConf.height = a.height, a
  }

  function in_complementVisibleItems(a, b) {
    return "variable" == a.items[a.d.width] && (a.items.visibleConf.variable = !0), a.items.visibleConf.variable || (is_number(a[a.d.width]) ? a.items.visible = Math.floor(a[a.d.width] / a.items[a.d.width]) : (a.items.visible = Math.floor(b / a.items[a.d.width]), a[a.d.width] = a.items.visible * a.items[a.d.width], a.items.visibleConf.adjust || (a.align = !1)), ("Infinity" == a.items.visible || 1 > a.items.visible) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), a.items.visibleConf.variable = !0)), a
  }

  function in_complementPrimarySize(a, b, c) {
    return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerWidth")), a
  }

  function in_complementSecondarySize(a, b, c) {
    return "auto" == a && (a = ms_getTrueLargestSize(c, b, "outerHeight")), a || (a = b.items[b.d.height]), a
  }

  function in_getAlignPadding(a, b) {
    var c = cf_getAlignPadding(gi_getCurrentItems(b, a), a);
    return a.padding[a.d[1]] = c[1], a.padding[a.d[3]] = c[0], a
  }

  function in_getResponsiveValues(a, b) {
    var d = cf_getItemAdjustMinMax(Math.ceil(a[a.d.width] / a.items[a.d.width]), a.items.visibleConf);
    d > b.length && (d = b.length);
    var e = Math.floor(a[a.d.width] / d);
    return a.items.visible = d, a.items[a.d.width] = e, a[a.d.width] = d * e, a
  }

  function bt_pauseOnHoverConfig(a) {
    if (is_string(a)) var b = a.indexOf("immediate") > -1 ? !0 : !1,
      c = a.indexOf("resume") > -1 ? !0 : !1;
    else var b = c = !1;
    return [b, c]
  }

  function bt_mousesheelNumber(a) {
    return is_number(a) ? a : null
  }

  function is_null(a) {
    return null === a
  }

  function is_undefined(a) {
    return is_null(a) || a === void 0 || "" === a || "undefined" === a
  }

  function is_array(a) {
    return a instanceof Array
  }

  function is_jquery(a) {
    return a instanceof jQuery
  }

  function is_object(a) {
    return (a instanceof Object || "object" == typeof a) && !is_null(a) && !is_jquery(a) && !is_array(a) && !is_function(a)
  }

  function is_number(a) {
    return (a instanceof Number || "number" == typeof a) && !isNaN(a)
  }

  function is_string(a) {
    return (a instanceof String || "string" == typeof a) && !is_undefined(a) && !is_true(a) && !is_false(a)
  }

  function is_function(a) {
    return a instanceof Function || "function" == typeof a
  }

  function is_boolean(a) {
    return a instanceof Boolean || "boolean" == typeof a || is_true(a) || is_false(a)
  }

  function is_true(a) {
    return a === !0 || "true" === a
  }

  function is_false(a) {
    return a === !1 || "false" === a
  }

  function is_percentage(a) {
    return is_string(a) && "%" == a.slice(-1)
  }

  function getTime() {
    return (new Date).getTime()
  }

  function deprecated(a, b) {
    debug(!0, a + " is DEPRECATED, support for it will be removed. Use " + b + " instead.")
  }

  function debug(a, b) {
    if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
      if (is_object(a)) {
        var c = " (" + a.selector + ")";
        a = a.debug
      } else var c = "";
      if (!a) return !1;
      b = is_string(b) ? "carouFredSel" + c + ": " + b : ["carouFredSel" + c + ":", b], window.console.log(b)
    }
    return !1
  }
  $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
    if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
    if (this.length > 1) return this.each(function() {
      $(this).carouFredSel(options, configs)
    });
    var $cfs = this,
      $tt0 = this[0],
      starting_position = !1;
    $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
    var FN = {};
    FN._init = function(a, b, c) {
      a = go_getObject($tt0, a), a.items = go_getItemsObject($tt0, a.items), a.scroll = go_getScrollObject($tt0, a.scroll), a.auto = go_getAutoObject($tt0, a.auto), a.prev = go_getPrevNextObject($tt0, a.prev), a.next = go_getPrevNextObject($tt0, a.next), a.pagination = go_getPaginationObject($tt0, a.pagination), a.swipe = go_getSwipeObject($tt0, a.swipe), a.mousewheel = go_getMousewheelObject($tt0, a.mousewheel), b && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, a)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, a), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
      var d = $cfs.children(),
        e = ms_getParentSize($wrp, opts, "width");
      if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, e), opts.items = in_complementItems(opts.items, opts, d, c), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, d), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, d), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(e, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, e)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = is_number(opts[opts.d.width]) ? "center" : !1), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(d, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(d, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible), opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, d, e);
      else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
        case "center":
        case "left":
        case "right":
          "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, d), opts.usePadding = !0);
          break;
        default:
          opts.align = !1, opts.usePadding = 0 == opts.padding[0] && 0 == opts.padding[1] && 0 == opts.padding[2] && 0 == opts.padding[3] ? !1 : !0
      }
      is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
    }, FN._build = function() {
      $cfs.data("_cfs_isCarousel", !0);
      var a = $cfs.children(),
        b = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
        c = "relative";
      switch (b.position) {
        case "absolute":
        case "fixed":
          c = b.position
      }
      "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(b), $wrp.css({
        overflow: "hidden",
        position: c
      }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", b.zIndex), $cfs.css({
        textAlign: "left",
        "float": "none",
        position: "absolute",
        top: 0,
        right: "auto",
        bottom: "auto",
        left: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0
      }), sz_storeMargin(a, opts), sz_storeOrigCss(a), opts.responsive && sz_setResponsiveSizes(opts, a)
    }, FN._bind_events = function() {
      FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(a, b) {
        return a.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), b)), !0
      }), $cfs.bind(cf_e("finish", conf), function(a) {
        return a.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
      }), $cfs.bind(cf_e("pause", conf), function(a, b, c) {
        if (a.stopPropagation(), tmrs = sc_clearTimers(tmrs), b && crsl.isScrolling) {
          scrl.isStopped = !0;
          var d = getTime() - scrl.startTime;
          scrl.duration -= d, scrl.pre && (scrl.pre.duration -= d), scrl.post && (scrl.post.duration -= d), sc_stopScroll(scrl, !1)
        }
        if (crsl.isPaused || crsl.isScrolling || c && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
          var e = opts.auto.timeoutDuration - tmrs.timePassed,
            f = 100 - Math.ceil(100 * e / opts.auto.timeoutDuration);
          opts.auto.onTimeoutPause.call($tt0, f, e)
        }
        return !0
      }), $cfs.bind(cf_e("play", conf), function(a, b, c, d) {
        a.stopPropagation(), tmrs = sc_clearTimers(tmrs);
        var e = [b, c, d],
          f = ["string", "number", "boolean"],
          g = cf_sortParams(e, f);
        if (b = g[0], c = g[1], d = g[2], "prev" != b && "next" != b && (b = crsl.direction), is_number(c) || (c = 0), is_boolean(d) || (d = !1), d && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
        crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
        var h = opts.auto.timeoutDuration + c;
        return dur2 = h - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / h), opts.auto.progress && (tmrs.progress = setInterval(function() {
          var a = getTime() - tmrs.startTime + tmrs.timePassed,
            b = Math.ceil(100 * a / h);
          opts.auto.progress.updater.call(opts.auto.progress.bar[0], b)
        }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
          opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), b) : $cfs.trigger(cf_e(b, conf), opts.auto)
        }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
      }), $cfs.bind(cf_e("resume", conf), function(a) {
        return a.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
      }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(a, b, c, d, e) {
        if (a.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return a.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
        var f = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
        if (f > itms.total) return a.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + f + " needed): Not scrolling.");
        var g = [b, c, d, e],
          h = ["object", "number/string", "function", "boolean"],
          i = cf_sortParams(g, h);
        b = i[0], c = i[1], d = i[2], e = i[3];
        var j = a.type.slice(conf.events.prefix.length);
        if (is_object(b) || (b = {}), is_function(d) && (b.onAfter = d), is_boolean(e) && (b.queue = e), b = $.extend(!0, {}, opts[j], b), b.conditions && !b.conditions.call($tt0, j)) return a.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
        if (!is_number(c)) {
          if ("*" != opts.items.filter) c = "visible";
          else
            for (var k = [c, b.items, opts[j].items], i = 0, l = k.length; l > i; i++)
              if (is_number(k[i]) || "page" == k[i] || "visible" == k[i]) {
                c = k[i];
                break
              } switch (c) {
            case "page":
              return a.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(j + "Page", conf), [b, d]);
            case "visible":
              opts.items.visibleConf.variable || "*" != opts.items.filter || (c = opts.items.visible)
          }
        }
        if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]]), a.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
        if (b.duration > 0 && crsl.isScrolling) return b.queue && ("last" == b.queue && (queu = []), ("first" != b.queue || 0 == queu.length) && $cfs.trigger(cf_e("queue", conf), [j, [b, c, d]])), a.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
        if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + j, conf), [b, c]), opts.synchronise)
          for (var m = opts.synchronise, n = [b, c], o = 0, l = m.length; l > o; o++) {
            var p = j;
            m[o][2] || (p = "prev" == p ? "next" : "prev"), m[o][1] || (n[0] = m[o][0].triggerHandler("_cfs_triggerEvent", ["configuration", p])), n[1] = c + m[o][3], m[o][0].trigger("_cfs_triggerEvent", ["slide_" + p, n])
          }
        return !0
      }), $cfs.bind(cf_e("slide_prev", conf), function(a, b, c) {
        a.stopPropagation();
        var d = $cfs.children();
        if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), a.stopImmediatePropagation();
        if (sz_resetMargin(d, opts), !is_number(c)) {
          if (opts.items.visibleConf.variable) c = gn_getVisibleItemsPrev(d, opts, itms.total - 1);
          else if ("*" != opts.items.filter) {
            var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
            c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, e)
          } else c = opts.items.visible;
          c = cf_getAdjust(c, opts, b.items, $tt0)
        }
        if (opts.circular || itms.total - c < itms.first && (c = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
          var f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0);
          f >= opts.items.visible + c && itms.total > c && (c++, f = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = f
        } else if ("*" != opts.items.filter) {
          var f = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
          opts.items.visible = cf_getItemsAdjust(f, opts, opts.items.visibleConf.adjust, $tt0)
        }
        if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
        for (debug(conf, "Scrolling " + c + " items backward."), itms.first += c; itms.first >= itms.total;) itms.first -= itms.total;
        opts.circular || (0 == itms.first && b.onEnd && b.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - c, itms.total).prependTo($cfs), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
        var d = $cfs.children(),
          g = gi_getOldItemsPrev(d, opts, c),
          h = gi_getNewItemsPrev(d, opts),
          i = d.eq(c - 1),
          j = g.last(),
          k = h.last();
        sz_resetMargin(d, opts);
        var l = 0,
          m = 0;
        if (opts.align) {
          var n = cf_getAlignPadding(h, opts);
          l = n[0], m = n[1]
        }
        var o = 0 > l ? opts.padding[opts.d[3]] : 0,
          p = !1,
          q = $();
        if (c > opts.items.visible && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
          var r = opts.items[opts.d.width];
          p = q, i = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
        }
        var s = !1,
          t = ms_getTotalSize(d.slice(0, c), opts, "width"),
          u = cf_mapWrapperSizes(ms_getSizes(h, opts, !0), opts, !opts.usePadding),
          v = 0,
          w = {},
          x = {},
          y = {},
          z = {},
          A = {},
          B = {},
          C = {},
          D = sc_getDuration(b, opts, c, t);
        switch (b.fx) {
          case "cover":
          case "cover-fade":
            v = ms_getTotalSize(d.slice(0, opts.items.visible), opts, "width")
        }
        p && (opts.items[opts.d.width] = r), sz_resetMargin(d, opts, !0), m >= 0 && sz_resetMargin(j, opts, opts.padding[opts.d[1]]), l >= 0 && sz_resetMargin(i, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = m, opts.padding[opts.d[3]] = l), B[opts.d.left] = -(t - o), C[opts.d.left] = -(v - o), x[opts.d.left] = u[opts.d.width];
        var E = function() {},
          F = function() {},
          G = function() {},
          H = function() {},
          I = function() {},
          J = function() {},
          K = function() {},
          L = function() {},
          M = function() {},
          N = function() {},
          O = function() {};
        switch (b.fx) {
          case "crossfade":
          case "cover":
          case "cover-fade":
          case "uncover":
          case "uncover-fade":
            s = $cfs.clone(!0).appendTo($wrp)
        }
        switch (b.fx) {
          case "crossfade":
          case "uncover":
          case "uncover-fade":
            s.children().slice(0, c).remove(), s.children().slice(opts.items.visibleConf.old).remove();
            break;
          case "cover":
          case "cover-fade":
            s.children().slice(opts.items.visible).remove(), s.css(C)
        }
        if ($cfs.css(B), scrl = sc_setScroll(D, b.easing, conf), w[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (E = function() {
            $wrp.css(u)
          }, F = function() {
            scrl.anims.push([$wrp, u])
          }), opts.usePadding) {
          switch (k.not(i).length && (y[opts.d.marginRight] = i.data("_cfs_origCssMargin"), 0 > l ? i.css(y) : (K = function() {
            i.css(y)
          }, L = function() {
            scrl.anims.push([i, y])
          })), b.fx) {
            case "cover":
            case "cover-fade":
              s.children().eq(c - 1).css(y)
          }
          k.not(j).length && (z[opts.d.marginRight] = j.data("_cfs_origCssMargin"), G = function() {
            j.css(z)
          }, H = function() {
            scrl.anims.push([j, z])
          }), m >= 0 && (A[opts.d.marginRight] = k.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], I = function() {
            k.css(A)
          }, J = function() {
            scrl.anims.push([k, A])
          })
        }
        O = function() {
          $cfs.css(w)
        };
        var P = opts.items.visible + c - itms.total;
        N = function() {
          if (P > 0 && ($cfs.children().slice(itms.total).remove(), g = $($cfs.children().slice(itms.total - (opts.items.visible - P)).get().concat($cfs.children().slice(0, P).get()))), sc_showHiddenItems(p), opts.usePadding) {
            var a = $cfs.children().eq(opts.items.visible + c - 1);
            a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
          }
        };
        var Q = sc_mapCallbackArguments(g, q, h, c, "prev", D, u);
        switch (M = function() {
          sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", Q, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
        }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", Q, clbk), b.fx) {
          case "none":
            $cfs.css(w), E(), G(), I(), K(), O(), N(), M();
            break;
          case "fade":
            scrl.anims.push([$cfs, {
              opacity: 0
            }, function() {
              E(), G(), I(), K(), O(), N(), scrl = sc_setScroll(D, b.easing, conf), scrl.anims.push([$cfs, {
                opacity: 1
              }, M]), sc_startScroll(scrl, conf)
            }]);
            break;
          case "crossfade":
            $cfs.css({
              opacity: 0
            }), scrl.anims.push([s, {
              opacity: 0
            }]), scrl.anims.push([$cfs, {
              opacity: 1
            }, M]), F(), G(), I(), K(), O(), N();
            break;
          case "cover":
            scrl.anims.push([s, w, function() {
              G(), I(), K(), O(), N(), M()
            }]), F();
            break;
          case "cover-fade":
            scrl.anims.push([$cfs, {
              opacity: 0
            }]), scrl.anims.push([s, w, function() {
              G(), I(), K(), O(), N(), M()
            }]), F();
            break;
          case "uncover":
            scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
            break;
          case "uncover-fade":
            $cfs.css({
              opacity: 0
            }), scrl.anims.push([$cfs, {
              opacity: 1
            }]), scrl.anims.push([s, x, M]), F(), G(), I(), K(), O(), N();
            break;
          default:
            scrl.anims.push([$cfs, w, function() {
              N(), M()
            }]), F(), H(), J(), L()
        }
        return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
      }), $cfs.bind(cf_e("slide_next", conf), function(a, b, c) {
        a.stopPropagation();
        var d = $cfs.children();
        if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), a.stopImmediatePropagation();
        if (sz_resetMargin(d, opts), !is_number(c)) {
          if ("*" != opts.items.filter) {
            var e = is_number(b.items) ? b.items : gn_getVisibleOrg($cfs, opts);
            c = gn_getScrollItemsNextFilter(d, opts, 0, e)
          } else c = opts.items.visible;
          c = cf_getAdjust(c, opts, b.items, $tt0)
        }
        var f = 0 == itms.first ? itms.total : itms.first;
        if (!opts.circular) {
          if (opts.items.visibleConf.variable) var g = gn_getVisibleItemsNext(d, opts, c),
            e = gn_getVisibleItemsPrev(d, opts, f - 1);
          else var g = opts.items.visible,
            e = opts.items.visible;
          c + g > f && (c = f - e)
        }
        if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
          for (var g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - c >= g && itms.total > c;) c++, g = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d, opts, c, f), opts, opts.items.visibleConf.adjust, $tt0);
          opts.items.visible = g
        } else if ("*" != opts.items.filter) {
          var g = gn_getVisibleItemsNextFilter(d, opts, c);
          opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, $tt0)
        }
        if (sz_resetMargin(d, opts, !0), 0 == c) return a.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
        for (debug(conf, "Scrolling " + c + " items forward."), itms.first -= c; 0 > itms.first;) itms.first += itms.total;
        opts.circular || (itms.first == opts.items.visible && b.onEnd && b.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + c && $cfs.children().slice(0, opts.items.visible + c - itms.total).clone(!0).appendTo($cfs);
        var d = $cfs.children(),
          h = gi_getOldItemsNext(d, opts),
          i = gi_getNewItemsNext(d, opts, c),
          j = d.eq(c - 1),
          k = h.last(),
          l = i.last();
        sz_resetMargin(d, opts);
        var m = 0,
          n = 0;
        if (opts.align) {
          var o = cf_getAlignPadding(i, opts);
          m = o[0], n = o[1]
        }
        var p = !1,
          q = $();
        if (c > opts.items.visibleConf.old && (q = d.slice(opts.items.visibleConf.old, c), "directscroll" == b.fx)) {
          var r = opts.items[opts.d.width];
          p = q, j = k, sc_hideHiddenItems(p), opts.items[opts.d.width] = "variable"
        }
        var s = !1,
          t = ms_getTotalSize(d.slice(0, c), opts, "width"),
          u = cf_mapWrapperSizes(ms_getSizes(i, opts, !0), opts, !opts.usePadding),
          v = 0,
          w = {},
          x = {},
          y = {},
          z = {},
          A = {},
          B = sc_getDuration(b, opts, c, t);
        switch (b.fx) {
          case "uncover":
          case "uncover-fade":
            v = ms_getTotalSize(d.slice(0, opts.items.visibleConf.old), opts, "width")
        }
        p && (opts.items[opts.d.width] = r), opts.align && 0 > opts.padding[opts.d[1]] && (opts.padding[opts.d[1]] = 0), sz_resetMargin(d, opts, !0), sz_resetMargin(k, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = n, opts.padding[opts.d[3]] = m), A[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
        var C = function() {},
          D = function() {},
          E = function() {},
          F = function() {},
          G = function() {},
          H = function() {},
          I = function() {},
          J = function() {},
          K = function() {};
        switch (b.fx) {
          case "crossfade":
          case "cover":
          case "cover-fade":
          case "uncover":
          case "uncover-fade":
            s = $cfs.clone(!0).appendTo($wrp), s.children().slice(opts.items.visibleConf.old).remove()
        }
        switch (b.fx) {
          case "crossfade":
          case "cover":
          case "cover-fade":
            $cfs.css("zIndex", 1), s.css("zIndex", 0)
        }
        if (scrl = sc_setScroll(B, b.easing, conf), w[opts.d.left] = -t, x[opts.d.left] = -v, 0 > m && (w[opts.d.left] += m), ("variable" == opts[opts.d.width] || "variable" == opts[opts.d.height]) && (C = function() {
            $wrp.css(u)
          }, D = function() {
            scrl.anims.push([$wrp, u])
          }), opts.usePadding) {
          var L = l.data("_cfs_origCssMargin");
          n >= 0 && (L += opts.padding[opts.d[1]]), l.css(opts.d.marginRight, L), j.not(k).length && (z[opts.d.marginRight] = k.data("_cfs_origCssMargin")), E = function() {
            k.css(z)
          }, F = function() {
            scrl.anims.push([k, z])
          };
          var M = j.data("_cfs_origCssMargin");
          m > 0 && (M += opts.padding[opts.d[3]]), y[opts.d.marginRight] = M, G = function() {
            j.css(y)
          }, H = function() {
            scrl.anims.push([j, y])
          }
        }
        K = function() {
          $cfs.css(A)
        };
        var N = opts.items.visible + c - itms.total;
        J = function() {
          N > 0 && $cfs.children().slice(itms.total).remove();
          var a = $cfs.children().slice(0, c).appendTo($cfs).last();
          if (N > 0 && (i = gi_getCurrentItems(d, opts)), sc_showHiddenItems(p), opts.usePadding) {
            if (itms.total < opts.items.visible + c) {
              var b = $cfs.children().eq(opts.items.visible - 1);
              b.css(opts.d.marginRight, b.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
            }
            a.css(opts.d.marginRight, a.data("_cfs_origCssMargin"))
          }
        };
        var O = sc_mapCallbackArguments(h, q, i, c, "next", B, u);
        switch (I = function() {
          $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, s, b), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, b, "onAfter", O, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
        }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, b, "onBefore", O, clbk), b.fx) {
          case "none":
            $cfs.css(w), C(), E(), G(), K(), J(), I();
            break;
          case "fade":
            scrl.anims.push([$cfs, {
              opacity: 0
            }, function() {
              C(), E(), G(), K(), J(), scrl = sc_setScroll(B, b.easing, conf), scrl.anims.push([$cfs, {
                opacity: 1
              }, I]), sc_startScroll(scrl, conf)
            }]);
            break;
          case "crossfade":
            $cfs.css({
              opacity: 0
            }), scrl.anims.push([s, {
              opacity: 0
            }]), scrl.anims.push([$cfs, {
              opacity: 1
            }, I]), D(), E(), G(), K(), J();
            break;
          case "cover":
            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
            break;
          case "cover-fade":
            $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([s, {
              opacity: 0
            }]), scrl.anims.push([$cfs, A, I]), D(), E(), G(), J();
            break;
          case "uncover":
            scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
            break;
          case "uncover-fade":
            $cfs.css({
              opacity: 0
            }), scrl.anims.push([$cfs, {
              opacity: 1
            }]), scrl.anims.push([s, x, I]), D(), E(), G(), K(), J();
            break;
          default:
            scrl.anims.push([$cfs, w, function() {
              K(), J(), I()
            }]), D(), F(), H()
        }
        return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, u]), !0
      }), $cfs.bind(cf_e("slideTo", conf), function(a, b, c, d, e, f, g) {
        a.stopPropagation();
        var h = [b, c, d, e, f, g],
          i = ["string/number/object", "number", "boolean", "object", "string", "function"],
          j = cf_sortParams(h, i);
        return e = j[3], f = j[4], g = j[5], b = gn_getItemIndex(j[0], j[1], j[2], itms, $cfs), 0 == b ? !1 : (is_object(e) || (e = !1), "prev" != f && "next" != f && (f = opts.circular ? itms.total / 2 >= b ? "next" : "prev" : 0 == itms.first || itms.first > b ? "next" : "prev"), "prev" == f && (b = itms.total - b), $cfs.trigger(cf_e(f, conf), [e, b, g]), !0)
      }), $cfs.bind(cf_e("prevPage", conf), function(a, b, c) {
        a.stopPropagation();
        var d = $cfs.triggerHandler(cf_e("currentPage", conf));
        return $cfs.triggerHandler(cf_e("slideToPage", conf), [d - 1, b, "prev", c])
      }), $cfs.bind(cf_e("nextPage", conf), function(a, b, c) {
        a.stopPropagation();
        var d = $cfs.triggerHandler(cf_e("currentPage", conf));
        return $cfs.triggerHandler(cf_e("slideToPage", conf), [d + 1, b, "next", c])
      }), $cfs.bind(cf_e("slideToPage", conf), function(a, b, c, d, e) {
        a.stopPropagation(), is_number(b) || (b = $cfs.triggerHandler(cf_e("currentPage", conf)));
        var f = opts.pagination.items || opts.items.visible,
          g = Math.ceil(itms.total / f) - 1;
        return 0 > b && (b = g), b > g && (b = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [b * f, 0, !0, c, d, e])
      }), $cfs.bind(cf_e("jumpToStart", conf), function(a, b) {
        if (a.stopPropagation(), b = b ? gn_getItemIndex(b, 0, !0, itms, $cfs) : 0, b += itms.first, 0 != b) {
          if (itms.total > 0)
            for (; b > itms.total;) b -= itms.total;
          $cfs.prepend($cfs.children().slice(b, itms.total))
        }
        return !0
      }), $cfs.bind(cf_e("synchronise", conf), function(a, b) {
        if (a.stopPropagation(), b) b = cf_getSynchArr(b);
        else {
          if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
          b = opts.synchronise
        }
        for (var c = $cfs.triggerHandler(cf_e("currentPosition", conf)), d = !0, e = 0, f = b.length; f > e; e++) b[e][0].triggerHandler(cf_e("slideTo", conf), [c, b[e][3], !0]) || (d = !1);
        return d
      }), $cfs.bind(cf_e("queue", conf), function(a, b, c) {
        return a.stopPropagation(), is_function(b) ? b.call($tt0, queu) : is_array(b) ? queu = b : is_undefined(b) || queu.push([b, c]), queu
      }), $cfs.bind(cf_e("insertItem", conf), function(a, b, c, d, e) {
        a.stopPropagation();
        var f = [b, c, d, e],
          g = ["string/object", "string/number/object", "boolean", "number"],
          h = cf_sortParams(f, g);
        if (b = h[0], c = h[1], d = h[2], e = h[3], is_object(b) && !is_jquery(b) ? b = $(b) : is_string(b) && (b = $(b)), !is_jquery(b) || 0 == b.length) return debug(conf, "Not a valid object.");
        is_undefined(c) && (c = "end"), sz_storeMargin(b, opts), sz_storeOrigCss(b);
        var i = c,
          j = "before";
        "end" == c ? d ? (0 == itms.first ? (c = itms.total - 1, j = "after") : (c = itms.first, itms.first += b.length), 0 > c && (c = 0)) : (c = itms.total - 1, j = "after") : c = gn_getItemIndex(c, e, d, itms, $cfs);
        var k = $cfs.children().eq(c);
        return k.length ? k[j](b) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(b)), "end" == i || d || itms.first > c && (itms.first += b.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
      }), $cfs.bind(cf_e("removeItem", conf), function(a, b, c, d) {
        a.stopPropagation();
        var e = [b, c, d],
          f = ["string/number/object", "boolean", "number"],
          g = cf_sortParams(e, f);
        if (b = g[0], c = g[1], d = g[2], b instanceof $ && b.length > 1) return i = $(), b.each(function() {
          var e = $cfs.trigger(cf_e("removeItem", conf), [$(this), c, d]);
          e && (i = i.add(e))
        }), i;
        if (is_undefined(b) || "end" == b) i = $cfs.children().last();
        else {
          b = gn_getItemIndex(b, d, c, itms, $cfs);
          var i = $cfs.children().eq(b);
          i.length && itms.first > b && (itms.first -= i.length)
        }
        return i && i.length && (i.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), i
      }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(a, b) {
        a.stopPropagation();
        var c = a.type.slice(conf.events.prefix.length);
        return is_array(b) && (clbk[c] = b), is_function(b) && clbk[c].push(b), clbk[c]
      }), $cfs.bind(cf_e("currentPosition", conf), function(a, b) {
        if (a.stopPropagation(), 0 == itms.first) var c = 0;
        else var c = itms.total - itms.first;
        return is_function(b) && b.call($tt0, c), c
      }), $cfs.bind(cf_e("currentPage", conf), function(a, b) {
        a.stopPropagation();
        var e, c = opts.pagination.items || opts.items.visible,
          d = Math.ceil(itms.total / c - 1);
        return e = 0 == itms.first ? 0 : itms.first < itms.total % c ? 0 : itms.first != c || opts.circular ? Math.round((itms.total - itms.first) / c) : d, 0 > e && (e = 0), e > d && (e = d), is_function(b) && b.call($tt0, e), e
      }), $cfs.bind(cf_e("currentVisible", conf), function(a, b) {
        a.stopPropagation();
        var c = gi_getCurrentItems($cfs.children(), opts);
        return is_function(b) && b.call($tt0, c), c
      }), $cfs.bind(cf_e("slice", conf), function(a, b, c, d) {
        if (a.stopPropagation(), 0 == itms.total) return !1;
        var e = [b, c, d],
          f = ["number", "number", "function"],
          g = cf_sortParams(e, f);
        if (b = is_number(g[0]) ? g[0] : 0, c = is_number(g[1]) ? g[1] : itms.total, d = g[2], b += itms.first, c += itms.first, items.total > 0) {
          for (; b > itms.total;) b -= itms.total;
          for (; c > itms.total;) c -= itms.total;
          for (; 0 > b;) b += itms.total;
          for (; 0 > c;) c += itms.total
        }
        var i, h = $cfs.children();
        return i = c > b ? h.slice(b, c) : $(h.slice(b, itms.total).get().concat(h.slice(0, c).get())), is_function(d) && d.call($tt0, i), i
      }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(a, b) {
        a.stopPropagation();
        var c = a.type.slice(conf.events.prefix.length),
          d = crsl[c];
        return is_function(b) && b.call($tt0, d), d
      }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
        e.stopPropagation();
        var reInit = !1;
        if (is_function(a)) a.call($tt0, opts);
        else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
        else if (!is_undefined(a))
          if (is_function(b)) {
            var val = eval("opts." + a);
            is_undefined(val) && (val = ""), b.call($tt0, val)
          } else {
            if (is_undefined(b)) return eval("opts." + a);
            "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
          }
        if (reInit) {
          sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
          var sz = sz_setSizes($cfs, opts);
          $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
        }
        return opts
      }), $cfs.bind(cf_e("linkAnchors", conf), function(a, b, c) {
        return a.stopPropagation(), is_undefined(b) ? b = $("body") : is_string(b) && (b = $(b)), is_jquery(b) && 0 != b.length ? (is_string(c) || (c = "a.caroufredsel"), b.find(c).each(function() {
          var a = this.hash || "";
          a.length > 0 && -1 != $cfs.children().index($(a)) && $(this).unbind("click").click(function(b) {
            b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), a)
          })
        }), !0) : debug(conf, "Not a valid object.")
      }), $cfs.bind(cf_e("updatePageStatus", conf), function(a, b) {
        if (a.stopPropagation(), opts.pagination.container) {
          var d = opts.pagination.items || opts.items.visible,
            e = Math.ceil(itms.total / d);
          b && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
            for (var a = 0; e > a; a++) {
              var b = $cfs.children().eq(gn_getItemIndex(a * d, 0, !0, itms, $cfs));
              $(this).append(opts.pagination.anchorBuilder.call(b[0], a + 1))
            }
          })), opts.pagination.container.each(function() {
            $(this).children().unbind(opts.pagination.event).each(function(a) {
              $(this).bind(opts.pagination.event, function(b) {
                b.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [a * d, -opts.pagination.deviation, !0, opts.pagination])
              })
            })
          }));
          var f = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
          return f >= e && (f = 0), 0 > f && (f = e - 1), opts.pagination.container.each(function() {
            $(this).children().removeClass(cf_c("selected", conf)).eq(f).addClass(cf_c("selected", conf))
          }), !0
        }
      }), $cfs.bind(cf_e("updateSizes", conf), function() {
        var b = opts.items.visible,
          c = $cfs.children(),
          d = ms_getParentSize($wrp, opts, "width");
        if (itms.total = c.length, crsl.primarySizePercentage ? (opts.maxDimension = d, opts[opts.d.width] = ms_getPercentage(d, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, d), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, c, d), b = opts.items.visible, sz_setResponsiveSizes(opts, c)) : opts.items.visibleConf.variable ? b = gn_getVisibleItemsNext(c, opts, 0) : "*" != opts.items.filter && (b = gn_getVisibleItemsNextFilter(c, opts, 0)), !opts.circular && 0 != itms.first && b > itms.first) {
          if (opts.items.visibleConf.variable) var e = gn_getVisibleItemsPrev(c, opts, itms.first) - itms.first;
          else if ("*" != opts.items.filter) var e = gn_getVisibleItemsPrevFilter(c, opts, itms.first) - itms.first;
          else var e = opts.items.visible - itms.first;
          debug(conf, "Preventing non-circular: sliding " + e + " items backward."), $cfs.trigger(cf_e("prev", conf), e)
        }
        opts.items.visible = cf_getItemsAdjust(b, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, c);
        var f = sz_setSizes($cfs, opts);
        return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, f]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), f
      }), $cfs.bind(cf_e("destroy", conf), function(a, b) {
        return a.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), b && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
      }), $cfs.bind(cf_e("debug", conf), function() {
        return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
      }), $cfs.bind("_cfs_triggerEvent", function(a, b, c) {
        return a.stopPropagation(), $cfs.triggerHandler(cf_e(b, conf), c)
      })
    }, FN._unbind_events = function() {
      $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
    }, FN._bind_buttons = function() {
      if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
        var a = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
        $wrp.bind(cf_e("mouseenter", conf, !1), function() {
          $cfs.trigger(cf_e("pause", conf), a)
        }).bind(cf_e("mouseleave", conf, !1), function() {
          $cfs.trigger(cf_e("resume", conf))
        })
      }
      if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(a) {
          a.preventDefault();
          var b = !1,
            c = null;
          crsl.isPaused ? b = "play" : opts.auto.pauseOnEvent && (b = "pause", c = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), b && $cfs.trigger(cf_e(b, conf), c)
        }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(a) {
          a.preventDefault(), $cfs.trigger(cf_e("prev", conf))
        }), opts.prev.pauseOnHover)) {
        var a = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
        opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
          $cfs.trigger(cf_e("pause", conf), a)
        }).bind(cf_e("mouseleave", conf, !1), function() {
          $cfs.trigger(cf_e("resume", conf))
        })
      }
      if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(a) {
          a.preventDefault(), $cfs.trigger(cf_e("next", conf))
        }), opts.next.pauseOnHover)) {
        var a = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
        opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
          $cfs.trigger(cf_e("pause", conf), a)
        }).bind(cf_e("mouseleave", conf, !1), function() {
          $cfs.trigger(cf_e("resume", conf))
        })
      }
      if (opts.pagination.container && opts.pagination.pauseOnHover) {
        var a = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
        opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
          $cfs.trigger(cf_e("pause", conf), a)
        }).bind(cf_e("mouseleave", conf, !1), function() {
          $cfs.trigger(cf_e("resume", conf))
        })
      }
      if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(a) {
          var b = a.keyCode;
          b == opts.next.key && (a.preventDefault(), $cfs.trigger(cf_e("next", conf))), b == opts.prev.key && (a.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
        }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(a) {
          var b = a.keyCode;
          b >= 49 && 58 > b && (b = (b - 49) * opts.items.visible, itms.total >= b && (a.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [b, 0, !0, opts.pagination])))
        }), $.fn.swipe) {
        var b = "ontouchstart" in window;
        if (b && opts.swipe.onTouch || !b && opts.swipe.onMouse) {
          var c = $.extend(!0, {}, opts.prev, opts.swipe),
            d = $.extend(!0, {}, opts.next, opts.swipe),
            e = function() {
              $cfs.trigger(cf_e("prev", conf), [c])
            },
            f = function() {
              $cfs.trigger(cf_e("next", conf), [d])
            };
          switch (opts.direction) {
            case "up":
            case "down":
              opts.swipe.options.swipeUp = f, opts.swipe.options.swipeDown = e;
              break;
            default:
              opts.swipe.options.swipeLeft = f, opts.swipe.options.swipeRight = e
          }
          crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
        }
      }
      if ($.fn.mousewheel && opts.mousewheel) {
        var g = $.extend(!0, {}, opts.prev, opts.mousewheel),
          h = $.extend(!0, {}, opts.next, opts.mousewheel);
        crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(a, b) {
          a.preventDefault(), b > 0 ? $cfs.trigger(cf_e("prev", conf), [g]) : $cfs.trigger(cf_e("next", conf), [h])
        }), crsl.mousewheel = !0
      }
      if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
        var i = function() {
            $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
          },
          j = $(window),
          k = null;
        if ($.debounce && "debounce" == conf.onWindowResize) k = $.debounce(200, i);
        else if ($.throttle && "throttle" == conf.onWindowResize) k = $.throttle(300, i);
        else {
          var l = 0,
            m = 0;
          k = function() {
            var a = j.width(),
              b = j.height();
            (a != l || b != m) && (i(), l = a, m = b)
          }
        }
        j.bind(cf_e("resize", conf, !1, !0, !0), k)
      }
    }, FN._unbind_buttons = function() {
      var b = (cf_e("", conf), cf_e("", conf, !1));
      ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(b), opts.auto.button && opts.auto.button.unbind(b), opts.prev.button && opts.prev.button.unbind(b), opts.next.button && opts.next.button.unbind(b), opts.pagination.container && (opts.pagination.container.unbind(b), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
    }, is_boolean(configs) && (configs = {
      debug: configs
    });
    var crsl = {
        direction: "next",
        isPaused: !0,
        isScrolling: !1,
        isStopped: !1,
        mousewheel: !1,
        swipe: !1
      },
      itms = {
        total: $cfs.children().length,
        first: 0
      },
      tmrs = {
        auto: null,
        progress: null,
        startTime: getTime(),
        timePassed: 0
      },
      scrl = {
        isStopped: !1,
        duration: 0,
        startTime: 0,
        easing: "",
        anims: []
      },
      clbk = {
        onBefore: [],
        onAfter: []
      },
      queu = [],
      conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
      opts = {},
      opts_orig = $.extend(!0, {}, options),
      $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
    if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
    else {
      var start_arr = [];
      0 != opts.items.start && start_arr.push(opts.items.start)
    }
    if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
      for (var a = 0, l = start_arr.length; l > a; a++) {
        var s = start_arr[a];
        if (0 != s) {
          if (s === !0) {
            if (s = window.location.hash, 1 > s.length) continue
          } else "random" === s && (s = Math.floor(Math.random() * itms.total));
          if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
              fx: "none"
            }])) break
        }
      }
    var siz = sz_setSizes($cfs, opts),
      itm = gi_getCurrentItems($cfs.children(), opts);
    return opts.onCreate && opts.onCreate.call($tt0, {
      width: siz.width,
      height: siz.height,
      items: itm
    }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
  }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
    synchronise: !1,
    infinite: !0,
    circular: !0,
    responsive: !1,
    direction: "left",
    items: {
      start: 0
    },
    scroll: {
      easing: "swing",
      duration: 500,
      pauseOnHover: !1,
      event: "click",
      queue: !1
    }
  }, $.fn.carouFredSel.configs = {
    debug: !1,
    transition: !1,
    onWindowResize: "throttle",
    events: {
      prefix: "",
      namespace: "cfs"
    },
    wrapper: {
      element: "div",
      classname: "caroufredsel_wrapper"
    },
    classnames: {}
  }, $.fn.carouFredSel.pageAnchorBuilder = function(a) {
    return '<a href="#"><span>' + a + "</span></a>"
  }, $.fn.carouFredSel.progressbarUpdater = function(a) {
    $(this).css("width", a + "%")
  }, $.fn.carouFredSel.cookie = {
    get: function(a) {
      a += "=";
      for (var b = document.cookie.split(";"), c = 0, d = b.length; d > c; c++) {
        for (var e = b[c];
          " " == e.charAt(0);) e = e.slice(1);
        if (0 == e.indexOf(a)) return e.slice(a.length)
      }
      return 0
    },
    set: function(a, b, c) {
      var d = "";
      if (c) {
        var e = new Date;
        e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), d = "; expires=" + e.toGMTString()
      }
      document.cookie = a + "=" + b + d + "; path=/"
    },
    remove: function(a) {
      $.fn.carouFredSel.cookie.set(a, "", -1)
    }
  }, $.extend($.easing, {
    quadratic: function(a) {
      var b = a * a;
      return a * (-b * a + 4 * b - 6 * a + 4)
    },
    cubic: function(a) {
      return a * (4 * a * a - 9 * a + 6)
    },
    elastic: function(a) {
      var b = a * a;
      return a * (33 * b * b - 106 * b * a + 126 * b - 67 * a + 15)
    }
  }))
})(jQuery);;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
    } else {
      factory(jQuery);
    }
  }
  (function($) {
    var d = [],
      doc = $(document),
      ua = navigator.userAgent.toLowerCase(),
      wndw = $(window),
      w = [];
    var browser = {
      ieQuirks: null,
      msie: /msie/.test(ua) && !/opera/.test(ua),
      opera: /opera/.test(ua)
    };
    browser.ie6 = browser.msie && /msie 6./.test(ua) && typeof window['XMLHttpRequest'] !== 'object';
    browser.ie7 = browser.msie && /msie 7.0/.test(ua);
    $.modal = function(data, options) {
      return $.modal.impl.init(data, options);
    };
    $.modal.close = function() {
      $.modal.impl.close();
    };
    $.modal.focus = function(pos) {
      $.modal.impl.focus(pos);
    };
    $.modal.setContainerDimensions = function() {
      $.modal.impl.setContainerDimensions();
    };
    $.modal.setPosition = function() {
      $.modal.impl.setPosition();
    };
    $.modal.update = function(height, width) {
      $.modal.impl.update(height, width);
    };
    $.fn.modal = function(options) {
      return $.modal.impl.init(this, options);
    };
    $.modal.defaults = {
      appendTo: 'body',
      focus: true,
      opacity: 50,
      overlayId: 'simplemodal-overlay',
      overlayCss: {},
      containerId: 'simplemodal-container',
      containerCss: {},
      dataId: 'simplemodal-data',
      dataCss: {},
      minHeight: null,
      minWidth: null,
      maxHeight: null,
      maxWidth: null,
      autoResize: false,
      autoPosition: true,
      zIndex: 1000,
      close: true,
      closeHTML: '<a class="modalCloseImg" title="Close"></a>',
      closeClass: 'simplemodal-close',
      escClose: true,
      overlayClose: false,
      fixed: true,
      position: null,
      persist: false,
      modal: true,
      onOpen: null,
      onShow: null,
      onClose: null
    };
    $.modal.impl = {
      d: {},
      init: function(data, options) {
        var s = this;
        if (s.d.data) {
          return false;
        }
        browser.ieQuirks = browser.msie && !$.support.boxModel;
        s.o = $.extend({}, $.modal.defaults, options);
        s.zIndex = s.o.zIndex;
        s.occb = false;
        if (typeof data === 'object') {
          data = data instanceof $ ? data : $(data);
          s.d.placeholder = false;
          if (data.parent().parent().size() > 0) {
            data.before($('<span></span>').attr('id', 'simplemodal-placeholder').css({
              display: 'none'
            }));
            s.d.placeholder = true;
            s.display = data.css('display');
            if (!s.o.persist) {
              s.d.orig = data.clone(true);
            }
          }
        } else if (typeof data === 'string' || typeof data === 'number') {
          data = $('<div></div>').html(data);
        } else {
          alert('SimpleModal Error: Unsupported data type: ' + typeof data);
          return s;
        }
        s.create(data);
        data = null;
        s.open();
        if ($.isFunction(s.o.onShow)) {
          s.o.onShow.apply(s, [s.d]);
        }
        return s;
      },
      create: function(data) {
        var s = this;
        s.getDimensions();
        if (s.o.modal && browser.ie6) {
          s.d.iframe = $('<iframe src="javascript:false;"></iframe>').css($.extend(s.o.iframeCss, {
            display: 'none',
            opacity: 0,
            position: 'fixed',
            height: w[0],
            width: w[1],
            zIndex: s.o.zIndex,
            top: 0,
            left: 0
          })).appendTo(s.o.appendTo);
        }
        s.d.overlay = $('<div></div>').attr('id', s.o.overlayId).addClass('simplemodal-overlay').css($.extend(s.o.overlayCss, {
          display: 'none',
          opacity: s.o.opacity / 100,
          height: s.o.modal ? d[0] : 0,
          width: s.o.modal ? d[1] : 0,
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: s.o.zIndex + 1
        })).appendTo(s.o.appendTo);
        s.d.container = $('<div></div>').attr('id', s.o.containerId).addClass('simplemodal-container').css($.extend({
          position: s.o.fixed ? 'fixed' : 'absolute'
        }, s.o.containerCss, {
          display: 'none',
          zIndex: s.o.zIndex + 2
        })).append(s.o.close && s.o.closeHTML ? $(s.o.closeHTML).addClass(s.o.closeClass) : '').appendTo(s.o.appendTo);
        s.d.wrap = $('<div></div>').attr('tabIndex', -1).addClass('simplemodal-wrap').css({
          height: '100%',
          outline: 0,
          width: '100%'
        }).appendTo(s.d.container);
        s.d.data = data.attr('id', data.attr('id') || s.o.dataId).addClass('simplemodal-data').css($.extend(s.o.dataCss, {
          display: 'none'
        })).appendTo('body');
        data = null;
        s.setContainerDimensions();
        s.d.data.appendTo(s.d.wrap);
        if (browser.ie6 || browser.ieQuirks) {
          s.fixIE();
        }
      },
      bindEvents: function() {
        var s = this;
        $('.' + s.o.closeClass).bind('click.simplemodal', function(e) {
          e.preventDefault();
          s.close();
        });
        if (s.o.modal && s.o.close && s.o.overlayClose) {
          s.d.overlay.bind('click.simplemodal', function(e) {
            e.preventDefault();
            s.close();
          });
        }
        doc.bind('keydown.simplemodal', function(e) {
          if (s.o.modal && e.keyCode === 9) {
            s.watchTab(e);
          } else if ((s.o.close && s.o.escClose) && e.keyCode === 27) {
            e.preventDefault();
            s.close();
          }
        });
        wndw.bind('resize.simplemodal orientationchange.simplemodal', function() {
          s.getDimensions();
          s.o.autoResize ? s.setContainerDimensions() : s.o.autoPosition && s.setPosition();
          if (browser.ie6 || browser.ieQuirks) {
            s.fixIE();
          } else if (s.o.modal) {
            s.d.iframe && s.d.iframe.css({
              height: w[0],
              width: w[1]
            });
            s.d.overlay.css({
              height: d[0],
              width: d[1]
            });
          }
        });
      },
      unbindEvents: function() {
        $('.' + this.o.closeClass).unbind('click.simplemodal');
        doc.unbind('keydown.simplemodal');
        wndw.unbind('.simplemodal');
        this.d.overlay.unbind('click.simplemodal');
      },
      fixIE: function() {
        var s = this,
          p = s.o.position;
        $.each([s.d.iframe || null, !s.o.modal ? null : s.d.overlay, s.d.container.css('position') === 'fixed' ? s.d.container : null], function(i, el) {
          if (el) {
            var bch = 'document.body.clientHeight',
              bcw = 'document.body.clientWidth',
              bsh = 'document.body.scrollHeight',
              bsl = 'document.body.scrollLeft',
              bst = 'document.body.scrollTop',
              bsw = 'document.body.scrollWidth',
              ch = 'document.documentElement.clientHeight',
              cw = 'document.documentElement.clientWidth',
              sl = 'document.documentElement.scrollLeft',
              st = 'document.documentElement.scrollTop',
              s = el[0].style;
            s.position = 'absolute';
            if (i < 2) {
              s.removeExpression('height');
              s.removeExpression('width');
              s.setExpression('height', '' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
              s.setExpression('width', '' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
            } else {
              var te, le;
              if (p && p.constructor === Array) {
                var top = p[0] ? typeof p[0] === 'number' ? p[0].toString() : p[0].replace(/px/, '') : el.css('top').replace(/px/, '');
                te = top.indexOf('%') === -1 ? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"' : parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
                if (p[1]) {
                  var left = typeof p[1] === 'number' ? p[1].toString() : p[1].replace(/px/, '');
                  le = left.indexOf('%') === -1 ? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"' : parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
                }
              } else {
                te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
                le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
              }
              s.removeExpression('top');
              s.removeExpression('left');
              s.setExpression('top', te);
              s.setExpression('left', le);
            }
          }
        });
      },
      focus: function(pos) {
        var s = this,
          p = pos && $.inArray(pos, ['first', 'last']) !== -1 ? pos : 'first';
        var input = $(':input:enabled:visible:' + p, s.d.wrap);
        setTimeout(function() {
          input.length > 0 ? input.focus() : s.d.wrap.focus();
        }, 10);
      },
      getDimensions: function() {
        var s = this,
          h = typeof window.innerHeight === 'undefined' ? wndw.height() : window.innerHeight;
        d = [doc.height(), doc.width()];
        w = [h, wndw.width()];
      },
      getVal: function(v, d) {
        return v ? (typeof v === 'number' ? v : v === 'auto' ? 0 : v.indexOf('%') > 0 ? ((parseInt(v.replace(/%/, '')) / 100) * (d === 'h' ? w[0] : w[1])) : parseInt(v.replace(/px/, ''))) : null;
      },
      update: function(height, width) {
        var s = this;
        if (!s.d.data) {
          return false;
        }
        s.d.origHeight = s.getVal(height, 'h');
        s.d.origWidth = s.getVal(width, 'w');
        s.d.data.hide();
        height && s.d.container.css('height', height);
        width && s.d.container.css('width', width);
        s.setContainerDimensions();
        s.d.data.show();
        s.o.focus && s.focus();
        s.unbindEvents();
        s.bindEvents();
      },
      setContainerDimensions: function() {
        var s = this,
          badIE = browser.ie6 || browser.ie7;
        var ch = s.d.origHeight ? s.d.origHeight : browser.opera ? s.d.container.height() : s.getVal(badIE ? s.d.container[0].currentStyle['height'] : s.d.container.css('height'), 'h'),
          cw = s.d.origWidth ? s.d.origWidth : browser.opera ? s.d.container.width() : s.getVal(badIE ? s.d.container[0].currentStyle['width'] : s.d.container.css('width'), 'w'),
          dh = s.d.data.outerHeight(true),
          dw = s.d.data.outerWidth(true);
        s.d.origHeight = s.d.origHeight || ch;
        s.d.origWidth = s.d.origWidth || cw;
        var mxoh = s.o.maxHeight ? s.getVal(s.o.maxHeight, 'h') : null,
          mxow = s.o.maxWidth ? s.getVal(s.o.maxWidth, 'w') : null,
          mh = mxoh && mxoh < w[0] ? mxoh : w[0],
          mw = mxow && mxow < w[1] ? mxow : w[1];
        var moh = s.o.minHeight ? s.getVal(s.o.minHeight, 'h') : 'auto';
        if (!ch) {
          if (!dh) {
            ch = moh;
          } else {
            if (dh > mh) {
              ch = mh;
            } else if (s.o.minHeight && moh !== 'auto' && dh < moh) {
              ch = moh;
            } else {
              ch = dh;
            }
          }
        } else {
          ch = s.o.autoResize && ch > mh ? mh : ch < moh ? moh : ch;
        }
        var mow = s.o.minWidth ? s.getVal(s.o.minWidth, 'w') : 'auto';
        if (!cw) {
          if (!dw) {
            cw = mow;
          } else {
            if (dw > mw) {
              cw = mw;
            } else if (s.o.minWidth && mow !== 'auto' && dw < mow) {
              cw = mow;
            } else {
              cw = dw;
            }
          }
        } else {
          cw = s.o.autoResize && cw > mw ? mw : cw < mow ? mow : cw;
        }
        s.d.container.css({
          height: ch,
          width: cw
        });
        s.d.wrap.css({
          overflow: (dh > ch || dw > cw) ? 'auto' : 'visible'
        });
        s.o.autoPosition && s.setPosition();
      },
      setPosition: function() {
        var s = this,
          top, left, hc = (w[0] / 2) - (s.d.container.outerHeight(true) / 2),
          vc = (w[1] / 2) - (s.d.container.outerWidth(true) / 2),
          st = s.d.container.css('position') !== 'fixed' ? wndw.scrollTop() : 0;
        if (s.o.position && Object.prototype.toString.call(s.o.position) === '[object Array]') {
          top = st + (s.o.position[0] || hc);
          left = s.o.position[1] || vc;
        } else {
          top = st + hc;
          left = vc;
        }
        s.d.container.css({
          left: left,
          top: top
        });
      },
      watchTab: function(e) {
        var s = this;
        if ($(e.target).parents('.simplemodal-container').length > 0) {
          s.inputs = $(':input:enabled:visible:first, :input:enabled:visible:last', s.d.data[0]);
          if ((!e.shiftKey && e.target === s.inputs[s.inputs.length - 1]) || (e.shiftKey && e.target === s.inputs[0]) || s.inputs.length === 0) {
            e.preventDefault();
            var pos = e.shiftKey ? 'last' : 'first';
            s.focus(pos);
          }
        } else {
          e.preventDefault();
          s.focus();
        }
      },
      open: function() {
        var s = this;
        s.d.iframe && s.d.iframe.show();
        if ($.isFunction(s.o.onOpen)) {
          s.o.onOpen.apply(s, [s.d]);
        } else {
          s.d.overlay.show();
          s.d.container.show();
          s.d.data.show();
        }
        s.o.focus && s.focus();
        s.bindEvents();
      },
      close: function() {
        var s = this;
        if (!s.d.data) {
          return false;
        }
        s.unbindEvents();
        if ($.isFunction(s.o.onClose) && !s.occb) {
          s.occb = true;
          s.o.onClose.apply(s, [s.d]);
        } else {
          if (s.d.placeholder) {
            var ph = $('#simplemodal-placeholder');
            if (s.o.persist) {
              ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display', s.display));
            } else {
              s.d.data.hide().remove();
              ph.replaceWith(s.d.orig);
            }
          } else {
            s.d.data.hide().remove();
          }
          s.d.container.hide().remove();
          s.d.overlay.hide();
          s.d.iframe && s.d.iframe.hide().remove();
          s.d.overlay.remove();
          s.d = {};
        }
      }
    };
  }));
var ref = document.referrer;
var today = new Date();
var today_hr = today.getHours();
var adA = new Array();
var n = '';
adStatus = function() {
  var gotStatus = '';
  var ind = 0;
  $.ajax({
    url: 'http://udn.com/static/rss/adstatus.xml',
    type: 'GET',
    dataType: 'xml',
    timeout: 1000,
    async: false,
    error: function(xml) {},
    success: function(xml) {
      $(xml).find("ITEM").each(function(i) {
        var STATUS = $(this).children("STATUS").text();
        var SITEPAGE = $(this).children("SITEPAGE").text();
        var POSITION = $(this).children("POSITION").text();
        if (POSITION == '320x480A' && STATUS == 'Y') {
          adA[ind] = POSITION;
          ind = parseInt(ind) + parseInt(1);
        }
        if (POSITION == '320x480B' && STATUS == 'Y') {
          adA[ind] = POSITION;
          ind = parseInt(ind) + parseInt(1);
        }
      });
    }
  });
}
getRand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(window).load(function() {
  var $width = $(document).width();
  if ($width <= 766) {
    adStatus();
    if (adA.length > 0) {
      var count = adA.length;
      var max = parseInt(count) - parseInt(1);
      if ((today_hr >= 0 && today_hr < 12)) {
        var amA = getCookie("am_320x480A");
        var amB = getCookie("am_320x480B");
        if (amA != 'Y' && amB != 'Y') {
          n = getRand(0, max);
          var showAd = adA[n];
          setTimeout(function() {
            showBox(showAd);
          }, 1000);
          setCookie("am_" + showAd, "Y", 43200, '', '/');
        } else if ((amA == 'Y' && amB != 'Y') || (amA != 'Y' && amB == 'Y')) {
          if ((ref == "" || ref.indexOf("udn.com") == -1) && count > 1) {
            if (amA == 'Y') var showAd = "320x480B";
            if (amB == 'Y') var showAd = "320x480A";
            setTimeout(function() {
              showBox(showAd);
            }, 1000);
            setCookie("am_" + showAd, "Y", 43200, '', '/');
          }
        } else {}
      }
      if ((today_hr >= 12 && today_hr < 24)) {
        var pmA = getCookie("pm_320x480A");
        var pmB = getCookie("pm_320x480B");
        if (pmA != 'Y' && pmB != 'Y') {
          n = getRand(0, max);
          var showAd = adA[n];
          setTimeout(function() {
            showBox(showAd);
          }, 1000);
          setCookie("pm_" + showAd, "Y", 43200, '', '/');
        } else if ((pmA == 'Y' && pmB != 'Y') || (pmA != 'Y' && pmB == 'Y')) {
          if ((ref == "" || ref.indexOf("udn.com") == -1) && count > 1) {
            if (pmA == 'Y') var showAd = "320x480B";
            if (pmB == 'Y') var showAd = "320x480A";
            setTimeout(function() {
              showBox(showAd);
            }, 1000);
            setCookie("pm_" + showAd, "Y", 43200, '', '/');
          }
        } else {}
      }
    }
  }
});
showBox = function(ad) {
  $.modal('<iframe src="/static/ad2015/ad_cover_' + ad + '.html" height="480" width="320" frameborder="0" marginwidth="0" marginheight="0"  scrolling="no">', {
    closeHTML: "<button type='button' id='cboxClose'>CLOSE</button>",
    containerCss: {
      backgroundColor: "#fff",
      borderColor: "#fff",
      zIndex: 999,
      minHeight: 480,
      maxHeight: 480,
      Width: 320,
      padding: 0
    },
    overlayClose: true,
    onShow: function(d) {
      var h = ($(window).height() - 480) / 2;
      if (h < 0) h = 0;
      d.container.css({
        position: 'absolute',
        top: h + 'px'
      });
    }
  });
}

function doWookmark(e) {
  var newWindowWidth = $(window).width();
  if (newWindowWidth <= 999 && newWindowWidth >= 750) {
    $('#sidebar').removeAttr('style');
    $('#sidebar_fix').removeAttr('style');
    $('#sidebar_fix > div').removeAttr('style');
    $('#sidebar_fix > div').wookmark({
      container: $('#sidebar_fix'),
      offset: 10,
      outerOffset: 16,
      itemWidth: 330
    });
  } else {
    if ($('#sidebar_fix > div').length > 0 && newWindowWidth > 999) {
      $('body.index #mainbar #ad_content , body.mag_index #mainbar #ad_content').removeAttr('style');
      $('#sidebar').css('margin', 'auto');
      $('#sidebar_fix').css('height', 'auto');
      $('#sidebar_fix > div').removeAttr('style');
    }
    if ($("#sidebar").height() < ($("#mainbar").height() - $("#nav").height()) && newWindowWidth > 999) {
      var $window = $(window);
      var $document = $(document);
      msgHeight = 0;
      $.fn.scrollBottom = function() {
        return scrollBottom_pox = $document.height() - this.scrollTop() - this.height() - $("#sitemap").height() - $("#footer").height() - 30;
      };
      $window.on("scroll", function(e) {
        if ($("#sidebar").height() < ($("#mainbar").height() - $("#nav").height()) && $(window).width() > 999) {
          var $el = $('#sidebar_fix');
          var top = $('#sidebar').offset().top;
          var height_gap = $window.height() - top;
          var side_foot = $el.height() - height_gap;
          var visibleFoot = -$window.scrollBottom();
          var scrollTop = $window.scrollTop();
          if (scrollTop > 0) {
            $el.addClass('sidebar_fix');
          } else {
            $el.removeAttr('style');
            $el.removeClass('sidebar_fix');
          }
          if (visibleFoot < 0 && (scrollTop + msgHeight) > side_foot) {
            $el.css({
              top: "auto",
              bottom: 0
            });
          } else if (visibleFoot > 0) {
            $el.css({
              top: "auto",
              bottom: visibleFoot + "px"
            });
          } else {
            $el.css({
              top: top - scrollTop - msgHeight,
              bottom: "auto"
            });
          }
        }
      }).scroll();
    }
  }
}
$(function() {
  if ($(document).width() > 749) {
    $('.only_mobile').remove();
  } else {
    $('.only_web').remove();
  }
  $(window).on("resize scroll", function(e) {
    var my_menu_mark = $("#menu_mark");
    my_menu_mark.css('width', $(document).width());
    my_menu_mark.css('height', $(document).height());
    var my_gotop = $("#gotop");
    var menu_offset_top = $('.menu').offset().top;
    var document_scrollTop = $(document).scrollTop();
    var my_header = $("#header");
    if ($(document).width() > 749) {
      if (document_scrollTop >= menu_offset_top && document_scrollTop > 86) {
        my_header.addClass('active');
      } else {
        my_header.removeClass('active');
      }
    }
    if ($(document).width() <= 749 && document_scrollTop > 100 && document_scrollTop > ($(document).height() - screen.height * 1.618)) {
      my_gotop.slideDown().fadeIn();
    } else if ($(document).width() > 749 && document_scrollTop > 100) {
      my_gotop.slideDown().fadeIn();
    } else {
      my_gotop.slideUp().fadeOut();
    }
  }).scroll();
  $(window).on('resize', function(e) {
    if ($(document).width() > 749) {
      var on_menu = 'N';
      var menu_sub = $('#menu_sub');
      var mhome_sub = $('#mhome_sub');
      var slidebar = $('#menu');
      var slidebar_width = slidebar.outerWidth(true);
      var slide_dl = slidebar.find('dl');
      var slide_dl_width = slide_dl.outerWidth(true);
      var slide_dl_prop_width = slide_dl.prop('scrollWidth');
      var gap = (slide_dl_width - slide_dl_prop_width);
      var arrow_left = slidebar.find('.arrow_left');
      var arrow_right = slidebar.find('.arrow_right');
      var posLeft = slide_dl.offset().left;
      var posLeft_gap = (posLeft + gap);
      $('.menu > dl > dt > #mhome').hover(function() {
        $('#show_box').stop(true, true).fadeOut();
        $('#menu_mark').stop(true, true).fadeIn('fast');
        $('.menu > dl > dt > a').removeClass('active');
        $(this).addClass('active');
        mhome_sub.stop(true, true).load($(this).attr('rel'));
        mhome_sub.css('left', slide_dl.offset().left).show();
      });
      $('.menu > dl > dt > a:not("#mhome")').hover(function() {
        var _this = $(this);
        if (on_menu == 'Y') {
          if (window.menuTimeout) clearTimeout(window.menuTimeout);
          window.menuTimeout = setTimeout(function() {
            if (_this.attr('rel')) {
              var posLeft = _this.position().left;
              $('#show_box').stop(true, true).fadeOut();
              $('#menu_mark').stop(true, true).fadeIn('fast');
              menu_sub.stop(true, true).load(_this.attr('rel') + '?' + (Math.random() * 99999).toString(), function() {
                $('.menu > dl > dt > a:not("#mhome")').removeClass('active');
                _this.addClass('active');
                $('.sub_head a').mouseenter(function() {
                  var _this_sub = $(this);
                  if (window.menuTimeout) clearTimeout(window.menuTimeout);
                  window.menuTimeout = setTimeout(function() {
                    $('.sub_head a').removeClass('sub_active');
                    _this_sub.addClass('sub_active');
                    $('#menu_sub div.sub_body').stop(true, true).load(_this_sub.attr('rel') + '?' + (Math.random() * 99999).toString());
                  }, 400);
                });
                $('.sub_head a').mouseleave(function() {
                  if (window.menuTimeout) clearTimeout(window.menuTimeout);
                });
                $('#menu_sub .close').click(function() {
                  _this.menu_close();
                });
              });
              if ($(window).scrollTop() < $('#header').outerHeight(true) - slidebar.outerHeight(true)) {
                mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
                menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
              } else {
                mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
                menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
              }
              if ((menu_sub.outerWidth(true) + posLeft) > $('#wrapper').outerWidth()) {
                menu_sub_new_left = ($('#wrapper').offset().left + $('#wrapper').outerWidth() - menu_sub.outerWidth(true));
                menu_sub.css('left', menu_sub_new_left).show();
              } else {
                menu_sub.css('left', posLeft + slide_dl.offset().left).show();
              }
            }
          }, 400);
        } else {
          if (window.menuTimeout) clearTimeout(window.menuTimeout);
          window.menuTimeout = setTimeout(function() {
            if (_this.attr('rel')) {
              var posLeft = _this.position().left;
              $('#show_box').stop(true, true).fadeOut();
              $('#menu_mark').stop(true, true).fadeIn('fast');
              menu_sub.stop(true, true).load(_this.attr('rel') + '?' + (Math.random() * 99999).toString(), function() {
                $('.menu > dl > dt > a:not("#mhome")').removeClass('active');
                _this.addClass('active');
                $('.sub_head a').mouseenter(function() {
                  var _this_sub = $(this);
                  if (window.menuTimeout) clearTimeout(window.menuTimeout);
                  window.menuTimeout = setTimeout(function() {
                    $('.sub_head a').removeClass('sub_active');
                    _this_sub.addClass('sub_active');
                    $('#menu_sub div.sub_body').stop(true, true).load(_this_sub.attr('rel') + '?' + (Math.random() * 99999).toString());
                  }, 400);
                });
                $('.sub_head a').mouseleave(function() {
                  if (window.menuTimeout) clearTimeout(window.menuTimeout);
                });
                $('#menu_sub .close').click(function() {
                  _this.menu_close();
                });
              });
              if ($(window).scrollTop() < $('#header').outerHeight(true) - slidebar.outerHeight(true)) {
                mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
                menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
              } else {
                mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
                menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
              }
              if ((menu_sub.outerWidth(true) + posLeft) > $('#wrapper').outerWidth()) {
                menu_sub_new_left = ($('#wrapper').offset().left + $('#wrapper').outerWidth() - menu_sub.outerWidth(true));
                menu_sub.css('left', menu_sub_new_left).show();
              } else {
                menu_sub.css('left', posLeft + slide_dl.offset().left).show();
              }
            }
            on_menu = 'Y';
          }, 700);
        }
      }, clearTimeout(window.menuTimeout));
      $(window).on("scroll", function(e) {
        if ($(window).scrollTop() < $('#header').offset().top + $('#header').outerHeight(true) - slidebar.outerHeight(true)) {
          mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
          menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true));
        } else {
          mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
          menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true));
        }
      });
      if (slide_dl_prop_width > slide_dl_width && slide_dl_width < 1200) {
        arrow_right.show();
        slide_dl.drag(function(ev, dd) {
          $(this).css({
            left: dd.offsetX
          });
          if (slide_dl.offset().left >= 0) {
            $(this).css('left', 0)
            arrow_left.hide('fast');
          } else {
            arrow_left.show('fast');
          }
          if (slide_dl.offset().left < gap) {
            $(this).css('left', gap)
            arrow_right.hide('fast');
          } else {
            arrow_right.show('fast');
          }
        });
        if (!slide_dl.is(':animated')) {
          arrow_left.click(function(event) {
            if (slide_dl.offset().left >= 0) {
              slide_dl.animate({
                left: '+=' + slide_dl_width
              });
            } else {
              arrow_left.hide('fast');
              slide_dl.animate({
                left: 0
              });
              arrow_right.show('fast');
            }
          });
          arrow_right.click(function(event) {
            if (slide_dl.offset().left < gap) {
              slide_dl.animate({
                left: '-=' + slide_dl_width
              });
            } else {
              arrow_right.hide('fast');
              slide_dl.animate({
                left: gap
              });
              arrow_left.show('fast');
            }
          });
        }
      } else {
        arrow_right.hide('fast');
        slide_dl.animate({
          left: 0
        });
        arrow_left.hide('fast');
      }
      $.fn.menu_close = function() {
        if (window.menuTimeout) clearTimeout(window.menuTimeout);
        on_menu = 'N';
        $('#menu_mark').stop(true, true).fadeOut();
        $('.menu > dl > dt > a').removeClass('active');
        menu_sub.hide();
        mhome_sub.stop(true, true).fadeOut();
      };
      $('body').mouseleave(function() {
        $(this).menu_close();
      });
      $('#mh , #header_body_wrapper , #header_head, #msg , #ad_1, #wrapper').mouseenter(function() {
        $(this).menu_close();
      });
      $('#menu_mark').hover(function() {
        $(this).menu_close();
      });
      $('#menu_mark').click(function() {
        $(this).menu_close();
      });
      $('body,#show_box').click(function() {
        $('#show_box').stop(true, true).fadeOut();
      });
      $("#menu > dl > dt > a").on('tap', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
    if (window.RT) clearTimeout(window.RT);
    window.RT = setTimeout(function() {
      doWookmark()
    }, 300);
  }).resize();
  doWookmark();
  browser = {
    versions: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') == -1
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  if (browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {} else {
    if ($(window).width() < 749) {
      $('.menu').css('overflow', 'hidden');
    }
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  var old_window_width = $(document).width();
  var window_width_hange = '';
  var myEfficientFn = debounce(function() {
    if (($(document).width() > 749 && old_window_width < 749) || ($(document).width() < 749 && old_window_width > 749)) {
      document.location.reload(true);
    }
    old_window_width = $(document).width();
  }, 250);
  window.addEventListener('resize', myEfficientFn);
  $(window).on("orientationchange", function(event) {
    location.reload();
  });
  var _showTab = 0;
  var $defaultLi = $('#tabs_box ul li').eq(_showTab).addClass('active');
  $($defaultLi.find('a').attr('href')).siblings().hide();
  $('#tabs_box ul li:not(.out)').mouseenter(function() {
    var $this = $(this),
      _clickTab = $this.find('a').attr('href');
    $this.addClass('active').siblings('.active').removeClass('active');
    $(_clickTab).stop(false, true).fadeIn().siblings().hide();
    return false;
  }).find('a').focus(function() {
    this.blur();
  });
  if ($('#wrapper').width() >= 1000 && $('#wrapper').width() < 1200) {
    $("#tabs li").removeClass('active');
    $("#tabs a").mouseenter(function() {
      $("#tabs").css("left", 291);
      $("#tabs_box ul").css("left", 305);
    });
    $("#tabs").mouseleave(function() {
      $("#tabs li").removeClass('active');
      $("#tabs").css("left", -1291);
      $("#tabs_box ul").css("left", 1887);
    });
  }
  $.fn.mobile_search_width = function() {
    var search_type_width = $('#mobile_search #sform1 .search_type a').outerWidth();
    var search_submit_width = $('#search_submit').outerWidth();
    var new_width = ($(document).width() - search_type_width - search_submit_width - 34);
    $('#mobile_search #sform1 #search_kw').css('width', new_width);
  };
  $('#header_search_btn').click(function() {
    $('#mobile_search').toggle();
    $(this).mobile_search_width();
  });
  if ($(document).width() <= 749) {
    $(this).mobile_search_width();
  }
  $('#search_kw').mouseenter(function() {
    $('#search_kw').focus();
  });
  $('.search_type a').click(function() {
    $('.search_type dl').toggleClass('search_open_close');
  });
  $('.search_type').mouseleave(function() {
    $('.search_type dl').removeClass('search_open_close');
  });
  timeoutHandle = null;
  if ($(window).width() > 749) {
    idleState = false;
    idleWait = 300000;
    $(document).bind('mousemove click keydown scroll', function() {
      clearTimeout(timeoutHandle);
      timeoutHandle = setTimeout(function() {
        $(this).show_box('/common/threemin/2');
      }, idleWait);
    });
    $("body").trigger("mousemove");
  }
  $.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - this.innerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
  }
  $.fn.show_box = function(url) {
    $("#menu_mark").stop(true, true).fadeIn();
    $('#show_box').stop(true, true).load(url, function() {
      $('#show_box .close').click(function() {
        $('#show_box').stop(true, true).fadeOut();
        $("#menu_mark").stop(true, true).fadeOut();
      });
    });
    $('#show_box').fadeIn();
  }
  $('#menu_mark').stop(true, true).fadeOut();
});
$(window).on("scroll", function(e) {
  $('#show_box').stop(true, true).fadeOut();
  $('#menu_mark').stop(true, true).fadeOut();
});
$(document).on("pagecreate tap scrollstart", function() {
  $('#show_box').stop(true, true).fadeOut();
  $('#menu_mark').stop(true, true).fadeOut();
});
var url = document.URL;
var urlA = url.split("/");
if (urlA[3] == 'news' && (urlA[4] == '' || typeof urlA[4] == "undefined")) window.location = '/news/index'
if (urlA[3] == 'mobile' && (urlA[4] == '' || typeof urlA[4] == "undefined")) window.location = '/mobile/index'
$(window).on("load resize scroll", function(e) {
  if ($(window).width() <= 749) {
    if (urlA[3] == 'news' && urlA[4] == 'index') {
      window.location = '/mobile/index';
    }
  }
  if ($(window).width() > 749) {
    if (urlA[3] == 'mobile' && urlA[4] == 'index') {
      window.location = '/news/index';
    }
  }
});

function IsMobile(ua) {
  if (!ua.match(/ipad/i) && (ua.match(/MOT/i) || ua.match(/SAMSUNG/i) || ua.match(/Android/i) || ua.match(/SonyEr/i) || ua.match(/Opera Mini/i) || ua.match(/Symbian/i) || ua.match(/MIDP/i) || ua.match(/TBD/i) || ua.match(/Palm/i) || ua.match(/Windows CE/i) || ua.match(/CLDC/i) || ua.match(/BlackBerry/i) || ua.match(/iPhone/i) || ua.match(/Dop/i) || ua.match(/HTC/i) || ua.match(/Nokia/i) || ua.match(/Wget/i))) {
    return true;
  } else {
    return false;
  }
}

function GetCkValue(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) begin = dc.indexOf(prefix);
  else begin += 2;
  if (begin == -1) return "";
  var end = document.cookie.indexOf(";", begin);
  if (end == -1) end = dc.length;
  return dc.substring(begin + prefix.length, end);
}
$(function() {
  if ($(window).width() >= 766 && $(window).width() <= 1016) {
    $("#menu > dl > dt").each(function(index) {
      $(this).find('a').removeAttr('href');
    });
  }
  var ogUrl = $('meta[property="og:url"]').attr('content');
  $(".fb-comments").attr('data-href', ogUrl);
  $(".fb_comments").find("a").attr("href", ogUrl + "#fb_comments");
  $(".discuss").find("a").attr("href", ogUrl + "#discuss");
});

// function resizeFacebookComments(f) {
//   var srcStr = $('.fb-comments iframe').attr('src') + "";
//   var src = srcStr.split('width=');
//   if ($(document).width() > 749) {
//     var width = parseInt($('.fb-comments').parent().parent().width()) - parseInt(65);
//   } else {
//     var width = parseInt($('.fb-comments').parent().parent().width()) - parseInt(25);
//   }
//   $('.fb-comments iframe').attr('src', src[0] + 'width=' + width);
//   $('.fb-comments iframe').css({
//     width: width
//   });
//   $('.fb-comments span').css({
//     width: width
//   });
//   $('div.fb-comments').css({
//     left: '0px'
//   });
// }
//
// function fbCommentsWorkaround() {
//   $(window).on('load resize', function() {
//     resizeFacebookComments('load & resize');
//   });
// }
window.fbAsyncInit = function() {
  FB.init({
    appId: "350231215126101",
    xfbml: true,
    version: 'v2.3'
  });
  // fbCommentsWorkaround();
};
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
$(function() {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  $(".fb-share-button").attr("data-href", ogUrl);
  $(".like > .fb-like").attr("data-href", ogUrl);
  var comments_count = 0;
  $.ajax({
    url: 'https://graph.facebook.com/?ids=' + ogUrl,
    dataType: 'jsonp',
    success: function(data) {
      if (typeof(data[ogUrl].comments) !== 'undefined') {
        comments_count = data[ogUrl].comments;
        $(".fb_comments .dialog_number").html('<b>' + comments_count + '</b>');
      }
    }
  });
});
addTwitter = function(type, img) {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  if (type == "img") {
    var desc = encodeURIComponent(getImgDesc(img));
    window.open("https://twitter.com/intent/tweet?text=" + desc + "&url=" + ogUrl, 'Twitter Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
  } else {
    window.open("https://twitter.com/intent/tweet?text=" + ogTitle + "&url=" + ogUrl);
  }
}
addPlurk = function(type, img) {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  if (type == "img") {
    var desc = encodeURIComponent(getImgDesc(img));
    window.open("http://www.plurk.com/?status=" + ogUrl + "&nbsp;(&nbsp;" + desc + "&nbsp;", 'Plurk Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
  } else {
    window.open("http://www.plurk.com/?status=" + ogUrl + "&nbsp;(&nbsp;" + ogTitle + "&nbsp;");
  }
}
addPinterest = function(type, img) {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  var desc = encodeURIComponent(getImgDesc(img));
  window.open("http://pinterest.com/pin/create/button/?url=" + ogUrl + "&media=" + img + "&description=" + desc, 'Pinterest Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
}
addGooglePlus = function() {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  window.open("https://plus.google.com/share?url=" + ogUrl, 'Google Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
}
addFacebook = function(type, img) {
  var clUrl = encodeURIComponent("http://udn.com/static/share_close.html");
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  if (type == "img") {
    var image = img;
    img = encodeURIComponent(image);
    var desc = encodeURIComponent(getImgDesc(image));
  } else {
    var image = $('meta[property="og:image"]').attr('content');
    img = encodeURIComponent(image);
    var desc = encodeURIComponent(getImgDesc(image));
  }
  window.open("https://www.facebook.com/dialog/feed?app_id=350231215126101&display=popup&link=" + ogUrl + "&picture=" + img + "&name=" + ogTitle + "&caption=" + ogUrl + "&description=" + desc + "&redirect_uri=" + clUrl, 'Facebook Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
}
getImgDesc = function(img) {
  var desc = '';
  $("div.photo_center > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc.indexOf(img) != -1) {
      desc = $(this).parent().parent().find("h4").html();
      console.log("desc: " + desc);
    }
  });
  $("div.photo_left > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc.indexOf(img) != -1) {
      desc = $(this).parent().parent().find("h4").html();
      console.log("desc: " + desc);
    }
  });
  $("div.photo_right > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc.indexOf(img) != -1) {
      desc = $(this).parent().parent().find("h4").html();
      console.log("desc: " + desc);
    }
  });
  return desc;
}
chgFontSize = function(type, fs) {
  console.log(fs);
  if (fs.length == 0) {
    var fs = $("#story_body_content").css("font-size");
    fs = fs.replace("px", "");
    if (type == '+') {
      if (fs < 23) {
        fs = parseInt(fs) + parseInt(2);
        $("#story_body_content").css("font-size", fs + "px");
      }
    }
    if (type == "-") {
      if (fs > 11) {
        fs = parseInt(fs) - parseInt(2);
        $("#story_body_content").css("font-size", fs + "px");
      }
    }
  } else {
    $("#story_body_content").css("font-size", fs + "px");
  }
  $.cookie('fontsize', fs, {
    path: '/'
  });
}
$(function() {
  if ($.cookie('fontsize') != '' && !isNaN($.cookie('fontsize'))) {
    var fs = $.cookie('fontsize');
    chgFontSize('', fs);
  }
});

function setCookie(key, value, expire, domain, path) {
  var ck = key + '=' + encodeURIComponent(value);
  if (expire) {
    var epr = new Date();
    epr.setTime(epr.getTime() + expire * 1000);
    ck += ';expires=' + epr.toUTCString();
  }
  if (domain)
    ck += ';domain=' + domain;
  if (path)
    ck += ';path=' + path;
  document.cookie = ck;
}

function getCookie(key) {
  if (document.cookie.length == 0) return false;
  var i = document.cookie.search(key + '=');
  if (i == -1) return false;
  i += key.length + 1;
  var j = document.cookie.indexOf(';', i);
  if (j == -1) j = document.cookie.length;
  return document.cookie.slice(i, j);
}! function(e) {
  function s(s, n, t) {
    if (t) {
      if ("object" != typeof s && (s = {}), "boolean" != typeof s.isMenu) {
        var i = t.children();
        s.isMenu = 1 == i.length && i.is(n.panelNodetype)
      }
      return s
    }
    s = e.extend(!0, {}, e[a].defaults, s), ("top" == s.position || "bottom" == s.position) && ("back" == s.zposition || "next" == s.zposition) && (e[a].deprecated('Using position "' + s.position + '" in combination with zposition "' + s.zposition + '"', 'zposition "front"'), s.zposition = "front");
    for (var o = ["position", "zposition", "modal", "moveBackground"], l = 0, d = o.length; d > l; l++) "undefined" != typeof s[o[l]] && (e[a].deprecated('The option "' + o[l] + '"', "offCanvas." + o[l]), s.offCanvas = s.offCanvas || {}, s.offCanvas[o[l]] = s[o[l]]);
    return s
  }

  function n(s) {
    s = e.extend(!0, {}, e[a].configuration, s);
    for (var n = ["panel", "list", "selected", "label", "spacer"], t = 0, i = n.length; i > t; t++) "undefined" != typeof s[n[t] + "Class"] && (e[a].deprecated('The configuration option "' + n[t] + 'Class"', "classNames." + n[t]), s.classNames[n[t]] = s[n[t] + "Class"]);
    if ("undefined" != typeof s.counterClass && (e[a].deprecated('The configuration option "counterClass"', "classNames.counters.counter"), s.classNames.counters = s.classNames.counters || {}, s.classNames.counters.counter = s.counterClass), "undefined" != typeof s.collapsedClass && (e[a].deprecated('The configuration option "collapsedClass"', "classNames.labels.collapsed"), s.classNames.labels = s.classNames.labels || {}, s.classNames.labels.collapsed = s.collapsedClass), "undefined" != typeof s.header)
      for (var n = ["panelHeader", "panelNext", "panelPrev"], t = 0, i = n.length; i > t; t++) "undefined" != typeof s.header[n[t] + "Class"] && (e[a].deprecated('The configuration option "header.' + n[t] + 'Class"', "classNames.header." + n[t]), s.classNames.header = s.classNames.header || {}, s.classNames.header[n[t]] = s.header[n[t] + "Class"]);
    for (var n = ["pageNodetype", "pageSelector", "menuWrapperSelector", "menuInjectMethod"], t = 0, i = n.length; i > t; t++) "undefined" != typeof s[n[t]] && (e[a].deprecated('The configuration option "' + n[t] + '"', "offCanvas." + n[t]), s.offCanvas = s.offCanvas || {}, s.offCanvas[n[t]] = s[n[t]]);
    return s
  }

  function t() {
    u = !0, c.$wndw = e(window), c.$html = e("html"), c.$body = e("body"), e.each([l, d, r], function(e, s) {
      s.add = function(e) {
        e = e.split(" ");
        for (var n in e) s[e[n]] = s.mm(e[n])
      }
    }), l.mm = function(e) {
      return "mm-" + e
    }, l.add("wrapper menu ismenu inline panel list subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"), l.umm = function(e) {
      return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
    }, d.mm = function(e) {
      return "mm-" + e
    }, d.add("parent"), r.mm = function(e) {
      return e + ".mm"
    }, r.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"), e[a]._c = l, e[a]._d = d, e[a]._e = r, e[a].glbl = c
  }

  function i(s, n) {
    if (s.hasClass(l.current)) return !1;
    var t = e("." + l.panel, n),
      i = t.filter("." + l.current);
    return t.removeClass(l.highest).removeClass(l.current).not(s).not(i).addClass(l.hidden), s.hasClass(l.opened) ? i.addClass(l.highest).removeClass(l.opened).removeClass(l.subopened) : (s.addClass(l.highest), i.addClass(l.subopened)), s.removeClass(l.hidden).addClass(l.current), setTimeout(function() {
      s.removeClass(l.subopened).addClass(l.opened)
    }, 25), "open"
  }
  var a = "mmenu",
    o = "4.3.4";
  if (!e[a]) {
    var l = {},
      d = {},
      r = {},
      u = !1,
      c = {
        $wndw: null,
        $html: null,
        $body: null
      };
    e[a] = function(e, s, n) {
        return this.$menu = e, this.opts = s, this.conf = n, this.vars = {}, this._init(), this
      }, e[a].uniqueId = 0, e[a].prototype = {
        _init: function() {
          if (this.opts = s(this.opts, this.conf, this.$menu), this._initMenu(), this._initPanels(), this._initLinks(), this._bindCustomEvents(), e[a].addons)
            for (var n = 0; n < e[a].addons.length; n++) "function" == typeof this["_addon_" + e[a].addons[n]] && this["_addon_" + e[a].addons[n]]()
        },
        _bindCustomEvents: function() {
          var s = this,
            n = this.$menu.find(this.opts.isMenu && !this.opts.slidingSubmenus ? "ul, ol" : "." + l.panel);
          n.off(r.toggle + " " + r.open + " " + r.close).on(r.toggle + " " + r.open + " " + r.close, function(e) {
            e.stopPropagation()
          }), this.opts.slidingSubmenus ? n.on(r.open, function() {
            return i(e(this), s.$menu)
          }) : n.on(r.toggle, function() {
            var s = e(this);
            return s.triggerHandler(s.parent().hasClass(l.opened) ? r.close : r.open)
          }).on(r.open, function() {
            return e(this).parent().addClass(l.opened), "open"
          }).on(r.close, function() {
            return e(this).parent().removeClass(l.opened), "close"
          })
        },
        _initMenu: function() {
          this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function() {
            e(this).attr("id", l.mm(e(this).attr("id")))
          })), this.$menu.contents().each(function() {
            3 == e(this)[0].nodeType && e(this).remove()
          }), this.$menu.parent().addClass(l.wrapper);
          var s = [l.menu];
          s.push(l.mm(this.opts.slidingSubmenus ? "horizontal" : "vertical")), this.opts.classes && s.push(this.opts.classes), this.opts.isMenu && s.push(l.ismenu), this.$menu.addClass(s.join(" "))
        },
        _initPanels: function() {
          var s = this;
          this.__refactorClass(e("." + this.conf.classNames.list, this.$menu), this.conf.classNames.list, "list"), this.opts.isMenu && e("ul, ol", this.$menu).not(".mm-nolist").addClass(l.list);
          var n = e("." + l.list + " > li", this.$menu);
          this.__refactorClass(n, this.conf.classNames.selected, "selected"), this.__refactorClass(n, this.conf.classNames.label, "label"), this.__refactorClass(n, this.conf.classNames.spacer, "spacer"), n.off(r.setSelected).on(r.setSelected, function(s, t) {
            s.stopPropagation(), n.removeClass(l.selected), "boolean" != typeof t && (t = !0), t && e(this).addClass(l.selected)
          }), this.__refactorClass(e("." + this.conf.classNames.panel, this.$menu), this.conf.classNames.panel, "panel"), this.$menu.children().filter(this.conf.panelNodetype).add(this.$menu.find("." + l.list).children().children().filter(this.conf.panelNodetype)).addClass(l.panel);
          var t = e("." + l.panel, this.$menu);
          t.each(function() {
            var n = e(this),
              t = n.attr("id") || s.__getUniqueId();
            n.attr("id", t)
          }), t.find("." + l.panel).each(function() {
            var n = e(this),
              t = n.is("ul, ol") ? n : n.find("ul ,ol").first(),
              i = n.parent(),
              a = i.find("> a, > span"),
              o = i.closest("." + l.panel);
            if (n.data(d.parent, i), i.parent().is("." + l.list)) {
              var r = e('<a class="' + l.subopen + '" href="#' + n.attr("id") + '" />').insertBefore(a);
              a.is("a") || r.addClass(l.fullsubopen), s.opts.slidingSubmenus && t.prepend('<li class="' + l.subtitle + '"><a class="' + l.subclose + '" href="#' + o.attr("id") + '">' + a.text() + "</a></li>")
            }
          });
          var i = this.opts.slidingSubmenus ? r.open : r.toggle;
          if (t.each(function() {
              var n = e(this),
                t = n.attr("id");
              e('a[href="#' + t + '"]', s.$menu).off(r.click).on(r.click, function(e) {
                e.preventDefault(), n.trigger(i)
              })
            }), this.opts.slidingSubmenus) {
            var a = e("." + l.list + " > li." + l.selected, this.$menu);
            a.parents("li").removeClass(l.selected).end().add(a.parents("li")).each(function() {
              var s = e(this),
                n = s.find("> ." + l.panel);
              n.length && (s.parents("." + l.panel).addClass(l.subopened), n.addClass(l.opened))
            }).closest("." + l.panel).addClass(l.opened).parents("." + l.panel).addClass(l.subopened)
          } else {
            var a = e("li." + l.selected, this.$menu);
            a.parents("li").removeClass(l.selected).end().add(a.parents("li")).addClass(l.opened)
          }
          var o = t.filter("." + l.opened);
          o.length || (o = t.first()), o.addClass(l.opened).last().addClass(l.current), this.opts.slidingSubmenus && t.not(o.last()).addClass(l.hidden).end().find("." + l.panel).appendTo(this.$menu)
        },
        _initLinks: function() {
          var s = this;
          e("." + l.list + " > li > a", this.$menu).not("." + l.subopen).not("." + l.subclose).not('[rel="external"]').not('[target="_blank"]').off(r.click).on(r.click, function(n) {
            var t = e(this),
              i = t.attr("href");
            s.__valueOrFn(s.opts.onClick.setSelected, t) && t.parent().trigger(r.setSelected);
            var a = s.__valueOrFn(s.opts.onClick.preventDefault, t, "#" == i.slice(0, 1));
            a && n.preventDefault(), s.__valueOrFn(s.opts.onClick.blockUI, t, !a) && c.$html.addClass(l.blocking), s.__valueOrFn(s.opts.onClick.close, t, a) && s.$menu.triggerHandler(r.close)
          })
        },
        _update: function(e) {
          if (this.updates || (this.updates = []), "function" == typeof e) this.updates.push(e);
          else
            for (var s = 0, n = this.updates.length; n > s; s++) this.updates[s].call(this, e)
        },
        __valueOrFn: function(e, s, n) {
          return "function" == typeof e ? e.call(s[0]) : "undefined" == typeof e && "undefined" != typeof n ? n : e
        },
        __refactorClass: function(e, s, n) {
          e.filter("." + s).removeClass(s).addClass(l[n])
        },
        __transitionend: function(e, s, n) {
          var t = !1,
            i = function() {
              t || s.call(e[0]), t = !0
            };
          e.one(r.transitionend, i), e.one(r.webkitTransitionEnd, i), setTimeout(i, 1.1 * n)
        },
        __getUniqueId: function() {
          return l.mm(e[a].uniqueId++)
        }
      }, e.fn[a] = function(i, o) {
        return u || t(), i = s(i, o), o = n(o), this.each(function() {
          var s = e(this);
          s.data(a) || s.data(a, new e[a](s, i, o))
        })
      }, e[a].version = o, e[a].defaults = {
        classes: "",
        slidingSubmenus: !0,
        onClick: {
          setSelected: !0
        }
      }, e[a].configuration = {
        panelNodetype: "ul, ol, div",
        transitionDuration: 400,
        classNames: {
          panel: "Panle",
          list: "List",
          selected: "Selected",
          label: "Label",
          spacer: "Spacer"
        }
      },
      function() {
        var s = window.document,
          n = window.navigator.userAgent,
          t = "ontouchstart" in s,
          i = "WebkitOverflowScrolling" in s.documentElement.style,
          o = function() {
            return n.indexOf("Android") >= 0 ? 2.4 > parseFloat(n.slice(n.indexOf("Android") + 8)) : !1
          }();
        e[a].support = {
          touch: t,
          oldAndroidBrowser: o,
          overflowscrolling: function() {
            return t ? i ? !0 : o ? !1 : !0 : !0
          }()
        }
      }(), e[a].debug = function() {}, e[a].deprecated = function(e, s) {
        "undefined" != typeof console && "undefined" != typeof console.warn && console.warn("MMENU: " + e + " is deprecated, use " + s + " instead.")
      }
  }
}(jQuery);
! function(e) {
  function o(e) {
    return e
  }

  function t(e) {
    return "string" != typeof e.pageSelector && (e.pageSelector = "> " + e.pageNodetype), e
  }

  function n() {
    d = !0, s = e[r]._c, i = e[r]._d, a = e[r]._e, s.add("offcanvas modal background opening blocker page"), i.add("style"), a.add("opening opened closing closed setPage"), p = e[r].glbl, p.$allMenus = (p.$allMenus || e()).add(this.$menu), p.$wndw.on(a.keydown, function(e) {
      return p.$html.hasClass(s.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
    });
    var o = 0;
    p.$wndw.on(a.resize, function(e, t) {
      if (t || p.$html.hasClass(s.opened)) {
        var n = p.$wndw.height();
        (t || n != o) && (o = n, p.$page.css("minHeight", n))
      }
    })
  }
  var s, i, a, p, r = "mmenu",
    l = "offCanvas",
    d = !1;
  e[r].prototype["_addon_" + l] = function() {
    if (!this.opts[l]) return this;
    d || n(), this.opts[l] = o(this.opts[l]), this.conf[l] = t(this.conf[l]), "boolean" != typeof this.vars.opened && (this.vars.opened = !1);
    var e = this.opts[l],
      i = this.conf[l],
      a = [s.offcanvas];
    "left" != e.position && a.push(s.mm(e.position)), "back" != e.zposition && a.push(s.mm(e.zposition)), this.$menu.addClass(a.join(" ")).parent().removeClass(s.wrapper), this[l + "_initPage"](p.$page), this[l + "_initBlocker"](), this[l + "_initOpenClose"](), this[l + "_bindCustomEvents"](), this.$menu[i.menuInjectMethod + "To"](i.menuWrapperSelector)
  }, e[r].addons = e[r].addons || [], e[r].addons.push(l), e[r].defaults[l] = {
    position: "left",
    zposition: "back",
    modal: !1,
    moveBackground: !0
  }, e[r].configuration[l] = {
    pageNodetype: "div",
    pageSelector: null,
    menuWrapperSelector: "body",
    menuInjectMethod: "prepend"
  }, e[r].prototype.open = function() {
    if (this.vars.opened) return !1;
    var e = this;
    return this._openSetup(), setTimeout(function() {
      e._openFinish()
    }, 25), "open"
  }, e[r].prototype._openSetup = function() {
    p.$allMenus.not(this.$menu).trigger(a.close), p.$page.data(i.style, p.$page.attr("style") || ""), p.$wndw.trigger(a.resize, [!0]);
    var e = [s.opened];
    this.opts[l].modal && e.push(s.modal), this.opts[l].moveBackground && e.push(s.background), "left" != this.opts[l].position && e.push(s.mm(this.opts[l].position)), "back" != this.opts[l].zposition && e.push(s.mm(this.opts[l].zposition)), this.opts.classes && e.push(this.opts.classes), p.$html.addClass(e.join(" ")), this.$menu.addClass(s.current + " " + s.opened)
  }, e[r].prototype._openFinish = function() {
    var e = this;
    this.__transitionend(p.$page, function() {
      e.$menu.trigger(a.opened)
    }, this.conf.transitionDuration), this.vars.opened = !0, p.$html.addClass(s.opening), this.$menu.trigger(a.opening)
  }, e[r].prototype.close = function() {
    if (!this.vars.opened) return !1;
    var e = this;
    return this.__transitionend(p.$page, function() {
      e.$menu.removeClass(s.current).removeClass(s.opened), p.$html.removeClass(s.opened).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(e.opts[l].position)).removeClass(s.mm(e.opts[l].zposition)), e.opts.classes && p.$html.removeClass(e.opts.classes), p.$page.attr("style", p.$page.data(i.style)), e.vars.opened = !1, e.$menu.trigger(a.closed)
    }, this.conf.transitionDuration), p.$html.removeClass(s.opening), this.$menu.trigger(a.closing), "close"
  }, e[r].prototype[l + "_initBlocker"] = function() {
    var o = this;
    p.$blck || (p.$blck = e('<div id="' + s.blocker + '" />').appendTo(p.$body)), p.$blck.off(a.touchstart).on(a.touchstart, function(e) {
      e.preventDefault(), e.stopPropagation(), p.$blck.trigger(a.mousedown)
    }).on(a.mousedown, function(e) {
      e.preventDefault(), p.$html.hasClass(s.modal) || o.close()
    })
  }, e[r].prototype[l + "_initPage"] = function(o) {
    o || (o = e(this.conf[l].pageSelector, p.$body), o.length > 1 && (e[r].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <" + this.conf[l].pageNodetype + ">."), o = o.wrapAll("<" + this.conf[l].pageNodetype + " />").parent())), o.addClass(s.page), p.$page = o
  }, e[r].prototype[l + "_initOpenClose"] = function() {
    var o = this,
      t = this.$menu.attr("id");
    t && t.length && (this.conf.clone && (t = s.umm(t)), e('a[href="#' + t + '"]').off(a.click).on(a.click, function(e) {
      e.preventDefault(), o.open()
    }));
    var t = p.$page.attr("id");
    t && t.length && e('a[href="#' + t + '"]').on(a.click, function(e) {
      e.preventDefault(), o.close()
    })
  }, e[r].prototype[l + "_bindCustomEvents"] = function() {
    var e = this,
      o = a.open + " " + a.opening + " " + a.opened + " " + a.close + " " + a.closing + " " + a.closed + " " + a.setPage;
    this.$menu.off(o).on(o, function(e) {
      e.stopPropagation()
    }), this.$menu.on(a.open, function() {
      e.open()
    }).on(a.close, function() {
      e.close()
    }).on(a.setPage, function(o, t) {
      e[l + "_initPage"](t), e[l + "_initOpenClose"]()
    })
  }
}(jQuery);
