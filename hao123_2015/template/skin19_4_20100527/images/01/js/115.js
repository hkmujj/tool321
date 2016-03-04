/*! QWrap-QiWu 1.1.5(2013-02-28) */
(function() {
    var e = {
        VERSION: "1.1.5",
        RELEASE: "2013-02-28",
        PATH: function() {
            var e = document.getElementsByTagName("script");
            return e[e.length - 1].src.replace(/(^|\/)[^\/]+\/[^\/]+$/, "$1")
        } (),
        namespace: function(t, n) {
            var r = t.split("."),
            i = 0,
            s;
            t.indexOf(".") == 0 && (i = 1, n = n || e),
            n = n || window;
            for (; s = r[i++];) n[s] || (n[s] = {}),
            n = n[s];
            return n
        },
        noConflict: function() {
            var t = window.QW;
            return function() {
                return window.QW = t,
                e
            }
        } (),
        loadJs: function(e, t, n) {
            n = n || {};
            var r = document.getElementsByTagName("head")[0] || document.documentElement,
            i = document.createElement("script"),
            s = !1;
            i.src = e,
            n.charset && (i.charset = n.charset),
            "async" in n && (i.async = n.async || ""),
            i.onerror = i.onload = i.onreadystatechange = function() { ! s && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (s = !0, t && t(), i.onerror = i.onload = i.onreadystatechange = null, r.removeChild(i))
            },
            r.insertBefore(i, r.firstChild)
        },
        loadJsonp: function() {
            var t = new Date * 1;
            return function(n, r, i) {
                i = i || {};
                var s = "QWJsonp" + t++,
                o = i.callbackReplacer || /%callbackfun%/ig;
                window[s] = function(e) {
                    r && r(e),
                    window[s] = null
                },
                o.test(n) ? n = n.replace(o, s) : n += (/\?/.test(n) ? "&": "?") + "callback=" + s,
                e.loadJs(n, i.oncomplete, i)
            }
        } (),
        loadCss: function(e) {
            var t = document.getElementsByTagName("head")[0] || document.documentElement,
            n = document.createElement("link");
            n.rel = "stylesheet",
            n.type = "text/css",
            n.href = e,
            t.insertBefore(n, t.firstChild)
        },
        error: function(e, t) {
            throw t = t || Error,
            new t(e)
        }
    };
    window.QW = e
})(),
function() {
    function e(e, t, n) {
        for (var r in t) if (n || !(r in e)) e[r] = t[r];
        return e
    }
    function t(e) {
        return !! e && e.constructor == Object
    }
    function n() {
        for (var e = 0; e < u.length; e++) {
            var t = u[e].callback,
            n = u[e].moduleNames.split(/\s*,\s*/g),
            r = !0;
            for (var s = 0; s < n.length; s++) {
                var o = i[n[s]];
                if (o.loadStatus != 2 && (o.loadedChecker ? !o.loadedChecker() : !QW[n[s]])) {
                    r = !1;
                    break
                }
            }
            r && (t(), u.splice(e, 1), e--)
        }
    }
    function r() {
        function e() {
            t.loadStatus = 2,
            n(),
            isLoading = !1,
            r()
        }
        var t = o[0];
        if (!isLoading && t) {
            isLoading = !0,
            o.splice(0, 1);
            var i = t.loadedChecker;
            i && i() ? e() : s(t.url.replace(/^\/\//, QW.PATH), e)
        }
    }
    var i = {},
    s = QW.loadJs,
    o = [],
    u = [];
    isLoading = !1;
    var a = {
        provideDomains: [QW],
        provide: function(e, n) {
            if (typeof e == "string") {
                var r = a.provideDomains;
                for (var i = 0; i < r.length; i++) r[i][e] || (r[i][e] = n)
            } else if (t(e)) for (i in e) a.provide(i, e[i])
        },
        addConfig: function(n, r) {
            if (typeof n == "string") {
                var s = e({},
                r);
                s.moduleName = n,
                i[n] = s
            } else if (t(n)) for (var o in n) a.addConfig(o, n[o])
        },
        use: function(e, t) {
            var n = {},
            s = [],
            a = e.split(/\s*,\s*/g),
            f,
            l,
            c,
            h,
            p;
            while (a.length) {
                var d = {};
                for (f = 0; f < a.length; f++) {
                    var v = a[f];
                    if (!v || QW[v]) continue;
                    if (!n[v]) {
                        if (!i[v]) throw "Unknown module: " + v;
                        if (i[v].loadStatus != 2) {
                            var m = i[v].loadedChecker;
                            if (m && m()) continue;
                            n[v] = i[v]
                        }
                        var g = ["requires", "use"];
                        for (l = 0; l < g.length; l++) {
                            var y = i[v][g[l]];
                            if (y) {
                                var b = y.split(",");
                                for (c = 0; c < b.length; c++) d[b[c]] = 0
                            }
                        }
                    }
                }
                a = [];
                for (f in d) a.push(f)
            }
            for (f in n) s.push(n[f]);
            for (f = 0, h = s.length; f < h; f++) {
                if (!s[f].requires) continue;
                for (l = f + 1; l < h; l++) if ((new RegExp("(^|,)" + s[l].moduleName + "(,|$)")).test(s[f].requires)) {
                    var w = s[l];
                    s.splice(l, 1),
                    s.splice(f, 0, w),
                    f--;
                    break
                }
            }
            var E = -1,
            S = -1;
            for (f = 0; f < s.length; f++) p = s[f],
            !p.loadStatus && (new RegExp("(^|,)" + p.moduleName + "(,|$)")).test(e) && (E = f),
            p.loadStatus == 1 && (new RegExp("(^|,)" + p.moduleName + "(,|$)")).test(e) && (S = f);
            if (E == -1 && S == -1) {
                t();
                return
            }
            u.push({
                callback: t,
                moduleNames: e
            });
            for (f = 0; f < s.length; f++) p = s[f],
            p.loadStatus || (p.loadStatus = 1, o.push(p));
            r()
        }
    };
    QW.ModuleH = a,
    QW.use = a.use,
    QW.provide = a.provide
} (),
QW.Browser = function() {
    var e = window.navigator,
    t = e.userAgent.toLowerCase(),
    n = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
    r = {
        platform: e.platform
    };
    t.replace(n,
    function(e, t, n) {
        var i = t.toLowerCase();
        r[i] || (r[i] = n)
    }),
    r.opera && t.replace(/opera.*version\/([\d.]+)/,
    function(e, t) {
        r.opera = t
    });
    if (r.msie) {
        r.ie = r.msie;
        var i = parseInt(r.msie, 10);
        r["ie" + i] = !0
    }
    return r
} ();
if (QW.Browser.ie) try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch(e) {} (function() {
    var e = {
        trim: function(e) {
            return e.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "")
        },
        mulReplace: function(e, t) {
            for (var n = 0; n < t.length; n++) e = e.replace(t[n][0], t[n][1]);
            return e
        },
        format: function(e, t) {
            var n = arguments;
            return e.replace(/\{(\d+)\}/ig,
            function(e, t) {
                var r = n[(t | 0) + 1];
                return r == null ? "": r
            })
        },
        tmpl: function() {
            var e = "sArrCMX",
            t = e + '.push("',
            n = {
                js: {
                    tagG: "js",
                    isBgn: 1,
                    isEnd: 1,
                    sBgn: '");',
                    sEnd: ";" + t
                },
                "if": {
                    tagG: "if",
                    isBgn: 1,
                    rlt: 1,
                    sBgn: '");if',
                    sEnd: "{" + t
                },
                elseif: {
                    tagG: "if",
                    cond: 1,
                    rlt: 1,
                    sBgn: '");} else if',
                    sEnd: "{" + t
                },
                "else": {
                    tagG: "if",
                    cond: 1,
                    rlt: 2,
                    sEnd: '");}else{' + t
                },
                "/if": {
                    tagG: "if",
                    isEnd: 1,
                    sEnd: '");}' + t
                },
                "for": {
                    tagG: "for",
                    isBgn: 1,
                    rlt: 1,
                    sBgn: '");for',
                    sEnd: "{" + t
                },
                "/for": {
                    tagG: "for",
                    isEnd: 1,
                    sEnd: '");}' + t
                },
                "while": {
                    tagG: "while",
                    isBgn: 1,
                    rlt: 1,
                    sBgn: '");while',
                    sEnd: "{" + t
                },
                "/while": {
                    tagG: "while",
                    isEnd: 1,
                    sEnd: '");}' + t
                }
            };
            return function(r, i) {
                var s = -1,
                o = [],
                u = [[/\{strip\}([\s\S]*?)\{\/strip\}/g,
                function(e, t) {
                    return t.replace(/[\r\n]\s*\}/g, " }").replace(/[\r\n]\s*/g, "")
                }], [/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\{[\s\S]*?\S\}/g,
                function(e) {
                    e = e.substr(1, e.length - 2);
                    for (var t = 0; t < a.length; t++) e = e.replace(a[t][0], a[t][1]);
                    var r = e;
                    /^(.\w+)\W/.test(r) && (r = RegExp.$1);
                    var i = n[r];
                    if (i) {
                        if (i.isBgn) var u = o[++s] = {
                            tagG: i.tagG,
                            rlt: i.rlt
                        };
                        if (i.isEnd) {
                            if (s < 0) throw new Error("Unexpected Tag: " + e);
                            u = o[s--];
                            if (u.tagG != i.tagG) throw new Error("Unmatch Tags: " + u.tagG + "--" + r)
                        } else if (!i.isBgn) {
                            if (s < 0) throw new Error("Unexpected Tag:" + e);
                            u = o[s];
                            if (u.tagG != i.tagG) throw new Error("Unmatch Tags: " + u.tagG + "--" + r);
                            if (i.cond && !(i.cond & u.rlt)) throw new Error("Unexpected Tag: " + r);
                            u.rlt = i.rlt
                        }
                        return (i.sBgn || "") + e.substr(r.length) + (i.sEnd || "")
                    }
                    return '",(' + e + '),"'
                }]],
                a = [[/\\n/g, "\n"], [/\\r/g, "\r"], [/\\"/g, '"'], [/\\\\/g, "\\"], [/\$(\w+)/g, 'opts["$1"]'], [/print\(/g, e + ".push("]];
                for (var f = 0; f < u.length; f++) r = r.replace(u[f][0], u[f][1]);
                if (s >= 0) throw new Error("Lose end Tag: " + o[s].tagG);
                r = r.replace(/##7b/g, "{").replace(/##7d/g, "}").replace(/##23/g, "#"),
                r = "var " + e + "=[];" + t + r + '");return ' + e + '.join("");';
                var l = new Function("opts", r);
                return arguments.length > 1 ? l(i) : l
            }
        } (),
        contains: function(e, t) {
            return e.indexOf(t) > -1
        },
        dbc2sbc: function(t) {
            return e.mulReplace(t, [[/[\uff01-\uff5e]/g,
            function(e) {
                return String.fromCharCode(e.charCodeAt(0) - 65248)
            }], [/\u3000/g, " "], [/\u3002/g, "."]])
        },
        byteLen: function(e) {
            return e.replace(/[^\x00-\xff]/g, "--").length
        },
        subByte: function(t, n, r) {
            return e.byteLen(t) <= n ? t: (r = r || "", n -= e.byteLen(r), t.substr(0, n).replace(/([^\x00-\xff])/g, "$1 ").substr(0, n).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + r)
        },
        capitalize: function(e) {
            return e.slice(0, 1).toUpperCase() + e.slice(1)
        },
        camelize: function(e) {
            return e.replace(/\-(\w)/ig,
            function(e, t) {
                return t.toUpperCase()
            })
        },
        decamelize: function(e) {
            return e.replace(/[A-Z]/g,
            function(e) {
                return "-" + e.toLowerCase()
            })
        },
        encode4Js: function(t) {
            return e.mulReplace(t, [[/\\/g, "\\u005C"], [/"/g, "\\u0022"], [/'/g, "\\u0027"], [/\//g, "\\u002F"], [/\r/g, "\\u000A"], [/\n/g, "\\u000D"], [/\t/g, "\\u0009"]])
        },
        escapeChars: function(t) {
            return e.mulReplace(t, [[/\\/g, "\\\\"], [/"/g, '\\"'], [/\r/g, "\\r"], [/\n/g, "\\n"], [/\t/g, "\\t"]])
        },
        encode4Http: function(e) {
            return e.replace(/[\u0000-\u0020\u0080-\u00ff\s"'#\/\|\\%<>\[\]\{\}\^~;\?\:@=&]/g,
            function(e) {
                return encodeURIComponent(e)
            })
        },
        encode4Html: function(e) {
            var t = document.createElement("pre"),
            n = document.createTextNode(e);
            return t.appendChild(n),
            t.innerHTML
        },
        encode4HtmlValue: function(t) {
            return e.encode4Html(t).replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        },
        decode4Html: function(t) {
            var n = document.createElement("div");
            return n.innerHTML = e.stripTags(t),
            n.childNodes[0] ? n.childNodes[0].nodeValue || "": ""
        },
        stripTags: function(e) {
            return e.replace(/<[^>]*>/gi, "")
        },
        evalJs: function(e, t) {
            return (new Function("opts", e))(t)
        },
        evalExp: function(e, t) {
            return (new Function("opts", "return (" + e + ");"))(t)
        },
        queryUrl: function(e, t) {
            e = e.replace(/^[^?=]*\?/ig, "").split("#")[0];
            var n = {};
            return e.replace(/(^|&)([^&=]+)=([^&]*)/g,
            function(e, t, r, i) {
                try {
                    r = decodeURIComponent(r)
                } catch(s) {}
                try {
                    i = decodeURIComponent(i)
                } catch(s) {}
                r in n ? n[r] instanceof Array ? n[r].push(i) : n[r] = [n[r], i] : n[r] = /\[\]$/.test(r) ? [i] : i
            }),
            t ? n[t] : n
        },
        decodeURIJson: function(t) {
            return e.queryUrl(t)
        }
    };
    QW.StringH = e
})(),

				
function() {
    function e(e) {
        return e != null && e.constructor != null ? Object.prototype.toString.call(e).slice(8, -1) : ""
    }
    var t = QW.StringH.escapeChars,
    n = {
        isString: function(t) {
            return e(t) == "String"
        },
        isFunction: function(t) {
            return e(t) == "Function"
        },
        isArray: function(t) {
            return e(t) == "Array"
        },
        isArrayLike: function(e) {
            return !! e && typeof e == "object" && e.nodeType != 1 && typeof e.length == "number"
        },
        isObject: function(e) {
            return e !== null && typeof e == "object"
        },
        isPlainObject: function(t) {
            return e(t) == "Object"
        },
        isWrap: function(e, t) {
            return !! e && !!e[t || "core"]
        },
        isElement: function(e) {
            return !! e && e.nodeType == 1
        },
        set: function(e, t, r) {
            if (n.isArray(t)) for (var i = 0; i < t.length; i++) n.set(e, t[i], r[i]);
            else if (n.isPlainObject(t)) for (i in t) n.set(e, i, t[i]);
            else if (n.isFunction(t)) {
                var s = [].slice.call(arguments, 1);
                s[0] = e,
                t.apply(null, s)
            } else {
                var o = t.split(".");
                i = 0;
                for (var u = e,
                a = o.length - 1; i < a; i++) u = u[o[i]];
                u[o[i]] = r
            }
            return e
        },
        get: function(e, t, r) {
            if (n.isArray(t)) {
                var i = [],
                s;
                for (s = 0; s < t.length; s++) i[s] = n.get(e, t[s], r)
            } else {
                if (n.isFunction(t)) {
                    var o = [].slice.call(arguments, 1);
                    return o[0] = e,
                    t.apply(null, o)
                }
                var u = t.split(".");
                i = e;
                for (s = 0; s < u.length; s++) {
                    if (!r && i == null) return;
                    i = i[u[s]]
                }
            }
            return i
        },
        mix: function(e, t, r) {
            if (n.isArray(t)) {
                for (var i = 0,
                s = t.length; i < s; i++) n.mix(e, t[i], r);
                return e
            }
            if (typeof r == "function") for (i in t) e[i] = r(e[i], t[i], i);
            else for (i in t) if (r || !(e[i] || i in e)) e[i] = t[i];
            return e
        },
        dump: function(e, t) {
            var n = {};
            for (var r = 0,
            i = t.length; r < i; r++) if (r in t) {
                var s = t[r];
                s in e && (n[s] = e[s])
            }
            return n
        },
        map: function(e, t, n) {
            var r = {};
            for (var i in e) r[i] = t.call(n, e[i], i, e);
            return r
        },
        keys: function(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(n);
            return t
        },
        values: function(e) {
            var t = [];
            for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
            return t
        },
        create: function(e, t) {
            var r = function(e) {
                e && n.mix(this, e, !0)
            };
            return r.prototype = e,
            new r(t)
        },
        stringify: function(r) {
            if (r == null) return "null";
            if (typeof r != "string" && r.toJSON) return r.toJSON();
            var i = e(r).toLowerCase();
            switch (i) {
            case "string":
                return '"' + t(r) + '"';
            case "number":
                var s = r.toString();
                return /N/.test(s) ? "null": s;
            case "boolean":
                return r.toString();
            case "date":
                return "new Date(" + r.getTime() + ")";
            case "array":
                var o = [];
                for (var u = 0; u < r.length; u++) o[u] = n.stringify(r[u]);
                return "[" + o.join(",") + "]";
            case "object":
                if (n.isPlainObject(r)) {
                    o = [];
                    for (u in r) o.push('"' + t(u) + '":' + n.stringify(r[u]));
                    return "{" + o.join(",") + "}"
                }
            }
            return "null"
        },
        encodeURIJson: function(e) {
            var t = [];
            for (var n in e) {
                if (e[n] == null) continue;
                if (e[n] instanceof Array) for (var r = 0; r < e[n].length; r++) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n][r]));
                else t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
            }
            return t.join("&")
        }
    };
    QW.ObjectH = n
} (),
function() {
    var e = QW.ObjectH.isArray,
    t = {
        map: function(e, t, n) {
            var r = e.length,
            i = new Array(r);
            for (var s = 0; s < r; s++) s in e && (i[s] = t.call(n, e[s], s, e));
            return i
        },
        forEach: function(e, t, n) {
            for (var r = 0,
            i = e.length; r < i; r++) r in e && t.call(n, e[r], r, e)
        },
        filter: function(e, t, n) {
            var r = [];
            for (var i = 0,
            s = e.length; i < s; i++) i in e && t.call(n, e[i], i, e) && r.push(e[i]);
            return r
        },
        some: function(e, t, n) {
            for (var r = 0,
            i = e.length; r < i; r++) if (r in e && t.call(n, e[r], r, e)) return ! 0;
            return ! 1
        },
        every: function(e, t, n) {
            for (var r = 0,
            i = e.length; r < i; r++) if (r in e && !t.call(n, e[r], r, e)) return ! 1;
            return ! 0
        },
        indexOf: function(e, t, n) {
            var r = e.length;
            n |= 0,
            n < 0 && (n += r),
            n < 0 && (n = 0);
            for (; n < r; n++) if (n in e && e[n] === t) return n;
            return - 1
        },
        lastIndexOf: function(e, t, n) {
            var r = e.length;
            n |= 0;
            if (!n || n >= r) n = r - 1;
            n < 0 && (n += r);
            for (; n > -1; n--) if (n in e && e[n] === t) return n;
            return - 1
        },
        contains: function(e, n) {
            return t.indexOf(e, n) >= 0
        },
        clear: function(e) {
            e.length = 0
        },
        remove: function(e, t) {
            var n = -1;
            for (var r = 1; r < arguments.length; r++) {
                var i = arguments[r];
                for (var s = 0; s < e.length; s++) i === e[s] && (n < 0 && (n = s), e.splice(s--, 1))
            }
            return n
        },
        unique: function(e) {
            var n = [],
            r = null,
            i = Array.indexOf || t.indexOf;
            for (var s = 0,
            o = e.length; s < o; s++) i(n, r = e[s]) < 0 && n.push(r);
            return n
        },
        reduce: function(e, t, n) {
            var r = e.length,
            i = 0;
            if (arguments.length < 3) {
                var s = 0;
                for (; i < r; i++) if (i in e) {
                    n = e[i++],
                    s = 1;
                    break
                }
                if (!s) throw new Error("No component to reduce")
            }
            for (; i < r; i++) i in e && (n = t(n, e[i], i, e));
            return n
        },
        reduceRight: function(e, t, n) {
            var r = e.length,
            i = r - 1;
            if (arguments.length < 3) {
                var s = 0;
                for (; i > -1; i--) if (i in e) {
                    n = e[i--],
                    s = 1;
                    break
                }
                if (!s) throw new Error("No component to reduceRight")
            }
            for (; i > -1; i--) i in e && (n = t(n, e[i], i, e));
            return n
        },
        expand: function(n, r) {
            var i = [],
            s = 0,
            o = n.length;
            for (; s < o; s++) e(n[s]) ? i = i.concat(r ? n[s] : t.expand(n[s])) : i.push(n[s]);
            return i
        },
        toArray: function(e) {
            var t = [];
            for (var n = 0; n < e.length; n++) t[n] = e[n];
            return t
        },
        wrap: function(e, t) {
            return new t(e)
        }
    };
    QW.ArrayH = t
} (),
function() {
    var e = QW.ArrayH.contains,
    t = {
        union: function(t, n) {
            var r = [];
            for (var i = 0,
            s = n.length; i < s; i++) e(t, n[i]) || r.push(n[i]);
            return t.concat(r)
        },
        intersect: function(t, n) {
            var r = [];
            for (var i = 0,
            s = n.length; i < s; i++) e(t, n[i]) && r.push(n[i]);
            return r
        },
        minus: function(t, n) {
            var r = [];
            for (var i = 0,
            s = t.length; i < s; i++) e(t, n[i]) || r.push(t[i]);
            return r
        },
        complement: function(e, n) {
            return t.minus(e, n).concat(t.minus(n, e))
        }
    };
    QW.HashsetH = t
} (),
function() {
    var e = {
        format: function(e, t) {
            t = t || "yyyy-MM-dd";
            var n = e.getFullYear().toString(),
            r = {
                M: e.getMonth() + 1,
                d: e.getDate(),
                h: e.getHours(),
                m: e.getMinutes(),
                s: e.getSeconds()
            };
            t = t.replace(/(y+)/ig,
            function(e, t) {
                return n.substr(4 - Math.min(4, t.length))
            });
            for (var i in r) t = t.replace(new RegExp("(" + i + "+)", "g"),
            function(e, t) {
                return r[i] < 10 && t.length > 1 ? "0" + r[i] : r[i]
            });
            return t
        }
    };
    QW.DateH = e
} (),
function() {
    var e = {
        methodize: function(e, t) {
            return t ?
            function() {
                return e.apply(null, [this[t]].concat([].slice.call(arguments)))
            }: function() {
                return e.apply(null, [this].concat([].slice.call(arguments)))
            }
        },
        mul: function(e, t) {
            var n = t == 1,
            r = t == 2,
            i = t == 3;
            return n ?
            function() {
                var t = arguments[0];
                if (! (t instanceof Array)) return e.apply(this, arguments);
                if (t.length) {
                    var n = [].slice.call(arguments);
                    return n[0] = t[0],
                    e.apply(this, n)
                }
            }: function() {
                var t = arguments[0];
                if (t instanceof Array) {
                    var n = [].slice.call(arguments),
                    s = [],
                    o = 0,
                    u = t.length,
                    a;
                    for (; o < u; o++) {
                        n[0] = t[o],
                        a = e.apply(this, n);
                        if (r) a != null && (s = s.concat(a));
                        else if (i) {
                            if (a !== undefined) return a
                        } else s.push(a)
                    }
                    return i ? undefined: s
                }
                return e.apply(this, arguments)
            }
        },
        rwrap: function(e, t, n, r) {
            return n == null && (n = 0),
            function() {
                var i = e.apply(this, arguments);
                if (r && i !== undefined) return i;
                if (n >= 0) i = arguments[n];
                else if (n == "this" || n == "context") i = this;
                return t ? new t(i) : i
            }
        },
        hook: function(e, t, n) {
            if (t == "before") return function() {
                var r = [].slice.call(arguments);
                if (!1 !== n.call(this, r, e, t)) return e.apply(this, r)
            };
            if (t == "after") return function() {
                var r = [].slice.call(arguments),
                i = e.apply(this, r);
                return n.call(this, i, e, t)
            };
            throw new Error("unknow hooker:" + t)
        },
        bind: function(e, t) {
            var n = [].slice,
            r = n.call(arguments, 2),
            i = function() {},
            s = function() {
                return e.apply(this instanceof i ? this: t || {},
                r.concat(n.call(arguments)))
            };
            return i.prototype = e.prototype,
            s.prototype = new i,
            s
        },
        lazyApply: function(e, t, n, r, i) {
            i = i ||
            function() {
                return ! 0
            };
            var s = function() {
                var r = i();
                r == 1 && e.apply(t, n || []),
                (r == 1 || r == -1) && clearInterval(o)
            },
            o = setInterval(s, r);
            return o
        }
    };
    QW.FunctionH = e
} (),
function() {
    var e = QW.ObjectH.mix,
    t = QW.ObjectH.create,
    n = {
        createInstance: function(e) {
            var n = t(e.prototype);
            return e.apply(n, [].slice.call(arguments, 1)),
            n
        },
        extend: function(t, n) {
            function r(t) {
                var n = function() {};
                n.prototype = t[0].prototype;
                for (var r = 1; r < t.length; r++) {
                    var i = t[r];
                    e(n.prototype, i.prototype)
                }
                return new n
            }
            var i = t.prototype;
            return t.prototype = r([].slice.call(arguments, 1)),
            t.$super = n,
            e(t.prototype, i, !0),
            t
        }
    };
    QW.ClassH = n
} (),
function() {
    var e = QW.FunctionH,
    t = QW.ObjectH.create,
    n = QW.ObjectH.isPlainObject,
    r = function() {},
    i = {
        rwrap: function(n, i, s) {
            var o = t(n);
            s = s || "operator";
            for (var u in n) {
                var a = s,
                f = n[u];
                f instanceof Function && (typeof a != "string" && (a = s[u] || ""), "queryer" == a ? o[u] = e.rwrap(f, i, "returnValue") : "operator" == a ? n instanceof r ? o[u] = e.rwrap(f, i, "this") : o[u] = e.rwrap(f, i, 0) : "gsetter" == a && (n instanceof r ? o[u] = e.rwrap(f, i, "this", !0) : o[u] = e.rwrap(f, i, 0, !0)))
            }
            return o
        },
        gsetter: function(e, i) {
            var s = t(e);
            i = i || {};
            for (var o in i) s[o] = function(e, t) {
                return function() {
                    var r = arguments.length;
                    return r -= t,
                    n(arguments[t]) && r++,
                    s[e[Math.min(r, e.length - 1)]].apply(this, arguments)
                }
            } (i[o], e instanceof r ? 0 : 1);
            return s
        },
        mul: function(n, r) {
            var i = t(n);
            r = r || {};
            var s = 0,
            o = 1,
            u = 2,
            a = 3;
            for (var f in n) {
                var l = n[f];
                if (l instanceof Function) {
                    var c = r;
                    typeof c != "string" && (c = r[f] || ""),
                    "getter" == c || "getter_first" == c || "getter_first_all" == c ? i[f] = e.mul(l, o) : "getter_all" == c ? i[f] = e.mul(l, s) : "gsetter" == c ? i[f] = e.mul(l, a) : i[f] = e.mul(l, u);
                    if ("getter" == c || "getter_first_all" == c) i[f + "All"] = e.mul(l, s)
                }
            }
            return i

        },
        methodize: function(t, n, i) {
            var s = new r;
            for (var o in t) {
                var u = t[o];
                u instanceof Function ? s[o] = e.methodize(u, n) : i && (s[o] = u)
            }
            return s
        }
    };
    QW.HelperH = i
} (),
function() {
    QW.JSON = {
        parse: function(e) {
            if (/^[[\],:{}\s0]*$/.test(e.replace(/\\\\|\\"|\\'|\w+\s*\:|null|true|false|[+\-eE.]|new Date(\d*)/g, "0").replace(/"[^"]*"|'[^']*'|\d+/g, "0"))) return (new Function("return (" + e + ");"))();
            throw "Invalid JSON format in executing JSON.parse"
        },
        stringify: function(e) {
            return QW.ObjectH.stringify(e)
        }
    }
} (),
function() {
    var e = QW.ObjectH.mix,
    t = QW.ArrayH.indexOf,
    n = function(t, n, r) {
        this.target = t,

        this.type = n,
        e(this, r || {})
    };
    e(n.prototype, {
        target: null,
        currentTarget: null,
        type: null,
        returnValue: undefined,
        preventDefault: function() {
            this.returnValue = !1
        }
    });
    var r = {
        on: function(e, n, i) {
            var s = e.__custListeners && e.__custListeners[n];
            return s || (r.createEvents(e, n), s = e.__custListeners && e.__custListeners[n]),
            t(s, i) > -1 ? !1 : (s.push(i), !0)
        },
        un: function(e, n, r) {
            var i = e.__custListeners && e.__custListeners[n];
            if (!i) return ! 1;
            if (r) {
                var s = t(i, r);
                if (s < 0) return ! 1;
                i.splice(s, 1)
            } else i.length = 0;
            return ! 0
        },
        fire: function(t, i, s) {
            if (i instanceof n) {
                var o = e(i, s);
                i = i.type
            } else o = new n(t, i, s);
            var u = t.__custListeners && t.__custListeners[i];
            u || (r.createEvents(t, i), u = t.__custListeners && t.__custListeners[i]),
            i != "*" && (u = u.concat(t.__custListeners["*"] || [])),
            o.returnValue = undefined,
            o.currentTarget = t;
            var a = o.currentTarget;
            if (a && a["on" + o.type]) var f = a["on" + o.type].call(a, o);
            for (var l = 0; l < u.length; l++) u[l].call(a, o);
            return o.returnValue !== !1 && (f !== !1 || o.returnValue !== undefined)
        },
        createEvents: function(e, t) {
            t = t || [],
            typeof t == "string" && (t = t.split(","));
            var n = e.__custListeners;
            n || (n = e.__custListeners = {});
            for (var r = 0; r < t.length; r++) n[t[r]] = n[t[r]] || [];
            return n["*"] = n["*"] || [],
            e
        }
    },
    i = function() {
        this.__custListeners = {}
    },
    s = QW.HelperH.methodize(r);
    e(i.prototype, s),
    n.createEvents = function(t, n) {
        return r.createEvents(t, n),
        e(t, s)
    },
    QW.CustEvent = n,
    QW.CustEventTargetH = r,
    QW.CustEventTarget = i
} (),

				
function() {
    function e() {
        return ! 0
    }
    function t(t, n) {
        var r = [],
        i = t.length,
        s = 0,
        o;
        if (n == e) {
            if (t instanceof Array) return t.slice(0);
            for (; s < i; s++) r[s] = t[s]
        } else for (; s < i;) o = t[s++],
        n(o) && r.push(o);
        return r
    }
    function n(e) {
        var t = e.children || e.childNodes,
        n = t.length,
        r = [],
        i = 0;
        for (; i < n; i++) t[i].nodeType == 1 && r.push(t[i]);
        return r
    }
    function r(e) {
        var t = document.getElementById(e),
        n;
        if (t && t.id != e) {
            n = document.getElementsByName(e);
            for (var r = 0; r < n.length; r++) if (n[r].id == e) return n[r];
            return null
        }
        return t
    }
    function i(e, t, n) {
        if (t == "n") return ! 0;
        if (typeof e == "number") var r = e;
        else {
            var i = e.parentNode;
            if (i.__queryStamp != m) {
                var s = {
                    nextSibling: i.firstChild
                },
                o = 1;
                while (s = s.nextSibling) s.nodeType == 1 && (s.__siblingIdx = o++);
                i.__queryStamp = m,
                i.__childrenNum = o - 1
            }
            n ? r = i.__childrenNum - e.__siblingIdx + 1 : r = e.__siblingIdx
        }
        switch (t) {
        case "even":
        case "2n":
            return r % 2 == 0;
        case "odd":
        case "2n+1":
            return r % 2 == 1;
        default:
            if (!/n/.test(t)) return r == t;
            var u = t.replace(/(^|\D+)n/g, "$11n").split("n"),
            a = u[0] | 0,
            f = r - u[1] | 0;
            return a * f >= 0 && f % a == 0
        }
    }
    function s(n, r) {
        if (!r && v[n]) return v[n];
        var i = [],
        s = l(n),
        o = /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/g,
        u = [];
        s = s.replace(/\:([\w\-]+)(\(([^)]+)\))?/g,
        function(e, t, n, r, s) {
            return i.push([t, r]),
            ""
        }).replace(/^\*/g,
        function(e) {
            return u.push("el.nodeType==1"),
            ""
        }).replace(/^([\w\-]+)/g,
        function(e) {
            return u.push('(el.tagName||"").toUpperCase()=="' + e.toUpperCase() + '"'),
            ""
        }).replace(/([\[(].*)|#([\w\-]+)|\.([\w\-]+)/g,
        function(e, t, n, r) {
            return t || n && '[id="' + n + '"]' || r && '[className~="' + r + '"]'
        }).replace(o,
        function(e, t, n, r, i) {
            var s = h._attrGetters[t] || 'el.getAttribute("' + t + '")';
            return u.push(h._operators[n || ""].replace(/aa/g, s).replace(/vv/g, i || "")),
            ""
        });
        if (!/^\s*$/.test(s)) throw "Unsupported Selector:\n" + n + "\n-" + s;
        for (var a = 0,
        f; f = i[a]; a++) {
            if (!h._pseudos[f[0]]) throw "Unsupported Selector:\n" + f[0] + "\n" + s;
            u.push('__SltPsds["' + f[0] + '"](el,"' + (f[1] != null ? c(f[1]) : "") + '",i,els)')
        }
        return u.length ? r ? new Function("els", "var els2=[];for(var i=0,el;el=els[i];i++){if(" + u.join("&&") + ") els2.push(el);} return els2;") : v[n] = new Function("el, i, els", "return " + u.join("&&") + ";") : r ?
        function(n) {
            return t(n, e)
        }: v[n] = e
    }
    function o(e, t) {
        if (d && /^((^|,)\s*[.\w-][.\w\s\->+~]*)+$/.test(t)) {
            var n = e.id,
            r, i = [],
            s;
            if (!n && e.parentNode) {
                r = e.id = "__QW_slt_" + g++;
                try {
                    s = e.querySelectorAll("#" + r + " " + t)
                } finally {
                    e.removeAttribute("id")
                }
            } else s = e.querySelectorAll(t);
            for (var o = 0,
            u = s.length; o < u; o++) i.push(s[o]);
            return i
        }
        return null
    }
    function u(e, t) {
        y++;
        var i = o(e, t);
        if (i) return i;
        var l = a(t),
        c = [e],
        h,
        v,
        m,
        g,
        b;
        while (g = l[0]) {
            if (!c.length) return [];
            var w = g[0];
            i = [];
            if (w == "+") {
                b = s(g[1]);
                for (h = 0; v = c[h++];) while (v = v.nextSibling) if (v.tagName) {
                    b(v) && i.push(v);
                    break
                }
                c = i,
                l.splice(0, 1)
            } else {
                if (w != "~") break;
                b = s(g[1]);
                for (h = 0; v = c[h++];) {
                    if (h > 1 && v.parentNode == c[h - 2].parentNode) continue;
                    while (v = v.nextSibling) v.tagName && b(v) && i.push(v)
                }
                c = i,
                l.splice(0, 1)
            }
        }
        var E = l.length;
        if (!E || !c.length) return c;
        for (var S = 0,
        x, T; T = l[S]; S++) if (/^[.\w-]*#([\w-]+)/i.test(T[1])) {
            x = RegExp.$1,
            T[1] = T[1].replace("#" + x, "");
            break
        }
        if (S < E) {
            var N = r(x);
            if (!N) return [];
            for (h = 0, m; m = c[h++];) if (!m.parentNode || p(m, N)) return i = f(m, [N], l.slice(0, S + 1)),
            !i.length || S == E - 1 ? i: u(N, l.slice(S + 1).join(",").replace(/,/g, " "));
            return []
        }
        var C = function(e) {
            return e.getElementsByTagName(k)
        },
        k = "*",
        L = "";
        t = l[E - 1][1],
        t = t.replace(/^[\w\-]+/,
        function(e) {
            return k = e,
            ""
        }),
        d && (t = t.replace(/^[\w\*]*\.([\w\-]+)/,
        function(e, t) {
            return L = t,
            ""
        })),
        L && (C = function(e) {
            return e.querySelectorAll(k + "." + L)
        });
        if (E == 1) {
            l[0][0] == ">" ? (C = n, b = s(l[0][1], !0)) : b = s(t, !0),
            i = [];
            for (h = 0; m = c[h++];) i = i.concat(b(C(m)));
            return i
        }
        l[l.length - 1][1] = t,
        i = [];
        for (h = 0; m = c[h++];) i = i.concat(f(m, C(m), l));
        return i
    }
    function a(e) {
        var t = [],
        n = /(^|\s*[>+~ ]\s*)(([\w\-\:.#*]+|\([^\)]*\)|\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\6|)\s*\])+)(?=($|\s*[>+~ ]\s*))/g,
        r = l(e).replace(n,
        function(e, n, r, i) {
            return t.push([l(n), r]),
            ""
        });
        if (!/^\s*$/.test(r)) throw "Unsupported Selector:\n" + e + "\n--" + r;
        return t
    }
    function f(e, n, r) {
        var i = r[0],
        o = r.length,
        u = !i[0],
        a = [],
        f = [],
        l = [],
        c = "";
        for (var p = 0; p < o; p++) {
            i = r[p],
            a[p] = s(i[1], p == o - 1),
            f[p] = h._relations[i[0]];
            if (i[0] == "" || i[0] == "~") l[p] = !0;
            c += i[0] || " "
        }
        n = a[o - 1](n);
        if (c == " ") return n;
        if (/[+>~] |[+]~/.test(c)) return t(n,
        function(t) {
            var n = [],
            r = o - 1,
            i = n[r] = t;
            for (; r > -1; r--) {
                if (r > 0) i = f[r](i, a[r - 1], e);
                else {
                    if (u || i.parentNode == e) return ! 0;
                    i = null
                }
                while (!i) {
                    if (++r == o) return ! 1;
                    l[r] && (i = n[r - 1], r++)
                }
                n[r - 1] = i
            }
        });
        var d = [],
        v = n.length;
        for (var p = 0,
        m, g; p < v;) {
            m = g = n[p++];
            for (var y = o - 1; y > 0; y--) if (! (m = f[y](m, a[y - 1], e))) break;
            m && (u || m.parentNode == e) && d.push(g)
        }
        return d
    }
    var l = QW.StringH.trim,
    c = QW.StringH.encode4Js,
    h = {
        queryStamp: 0,
        _operators: {
            "": "aa",
            "=": 'aa=="vv"',
            "!=": 'aa!="vv"',
            "~=": 'aa&&(" "+aa+" ").indexOf(" vv ")>-1',
            "|=": 'aa&&(aa+"-").indexOf("vv-")==0',
            "^=": 'aa&&aa.indexOf("vv")==0',
            "$=": 'aa&&aa.lastIndexOf("vv")==aa.length-"vv".length',
            "*=": 'aa&&aa.indexOf("vv")>-1'
        },
        _pseudos: {
            "first-child": function(e) {
                return ! (e = e.previousSibling) || !e.tagName && !e.previousSibling
            },
            "last-child": function(e) {
                return ! (e = e.nextSibling) || !e.tagName && !e.nextSibling
            },
            "only-child": function(e) {
                var t;
                return ! ((t = e.previousSibling) && (t.tagName || t.previousSibling) || (t = e.nextSibling) && (t.tagName || t.nextSibling))
            },
            "nth-child": function(e, t) {
                return i(e, t)
            },
            "nth-last-child": function(e, t) {
                return i(e, t, !0)
            },
            "first-of-type": function(e) {
                var t = e.tagName,
                n = e;
                while (n = n.previousSlibling) if (n.tagName == t) return ! 1;
                return ! 0
            },
            "last-of-type": function(e) {
                var t = e.tagName,
                n = e;
                while (n = n.nextSibling) if (n.tagName == t) return ! 1;
                return ! 0
            },
            "only-of-type": function(e) {
                var t = e.parentNode.childNodes;
                for (var n = t.length - 1; n > -1; n--) if (t[n].tagName == e.tagName && t[n] != e) return ! 1;
                return ! 0
            },
            "nth-of-type": function(e, t) {
                var n = 1,
                r = e;
                while (r = r.previousSibling) r.tagName == e.tagName && n++;
                return i(n, t)
            },
            "nth-last-of-type": function(e, t) {
                var n = 1,
                r = e;
                while (r = r.nextSibling) r.tagName == e.tagName && n++;
                return i(n, t)
            },
            empty: function(e) {
                return ! e.firstChild
            },
            parent: function(e) {
                return !! e.firstChild
            },
            not: function(e, t) {
                return ! s(t)(e)
            },
            enabled: function(e) {
                return ! e.disabled
            },
            disabled: function(e) {
                return e.disabled
            },
            checked: function(e) {
                return e.checked
            },
            focus: function(e) {
                return e == e.ownerDocument.activeElement
            },
            indeterminate: function(e) {
                return e.indeterminate
            },
            input: function(e) {
                return /input|select|textarea|button/i.test(e.nodeName)
            },
            contains: function(e, t) {
                return (e.textContent || e.innerText || "").indexOf(t) >= 0
            }
        },
        _attrGetters: function() {
            var e = {
                "class": "el.className",
                "for": "el.htmlFor",
                href: 'el.getAttribute("href",2)'
            },
            t = "name,id,className,value,selected,checked,disabled,type,tagName,readOnly,offsetWidth,offsetHeight,innerHTML".split(",");
            for (var n = 0,
            r; r = t[n]; n++) e[r] = "el." + r;
            return e
        } (),
        _relations: {
            "": function(e, t, n) {
                while ((e = e.parentNode) && e != n) if (t(e)) return e;
                return null
            },
            ">": function(e, t, n) {
                return e = e.parentNode,
                e != n && t(e) ? e: null
            },
            "+": function(e, t, n) {
                while (e = e.previousSibling) if (e.tagName) return t(e) && e;
                return null
            },
            "~": function(e, t, n) {
                while (e = e.previousSibling) if (e.tagName && t(e)) return e;
                return null
            }
        },
        selector2Filter: function(e) {
            return s(e)
        },
        test: function(e, t) {
            return s(t)(e)
        },
        filter: function(e, t, n) {
            var n = n || document,
            r = l(t).split(",");
            if (r.length < 2) return f(n || document, e, a(t));
            var i = f(n || document, e, a(r[0]));
            if (i.length == e.length) return i;
            for (var s = 0,
            o = e.length; s < o; s++) e[s].__QWSltFlted = 0;
            for (s = 0, o = i.length; s < o; s++) i[s].__QWSltFlted = 1;
            var u = e,
            c;
            for (var h = 1; h < r.length; h++) {
                c = [];
                for (s = 0, o = u.length; s < o; s++) u[s].__QWSltFlted || c.push(u[s]);
                u = c,
                i = f(n || document, u, a(r[h]));
                for (s = 0, o = i.length; s < o; s++) i[s].__QWSltFlted = 1
            }
            var p = [];
            for (s = 0, o = e.length; s < o; s++) e[s].__QWSltFlted && p.push(e[s]);
            return p
        },
        query: function(e, t) {
            h.queryStamp = m++,
            e = e || document;
            var n = o(e, t);
            if (n) return n;
            var r = l(t).split(",");
            n = u(e, r[0]);
            for (var i = 1,
            s; s = r[i]; i++) {
                var a = u(e, s);
                n = n.concat(a)
            }
            return n
        },
        one: function(e, t) {
            var n = h.query(e, t);
            return n[0]
        }
    };
    window.__SltPsds = h._pseudos;
    var p, d; (function() {
        var e = document.createElement("div");
        e.innerHTML = '<div class="aaa"></div>',
        d = e.querySelectorAll && e.querySelectorAll(".aaa").length == 1,
        p = e.contains ?
        function(e, t) {
            return e != t && e.contains(t)
        }: function(e, t) {
            return e.compareDocumentPosition(t) & 16
        }
    })();
    var v = {},
    m = 0,
    g = 0,
    y = 0;
    QW.Selector = h
} (),

				
function() {
    var e = QW.Selector,
    t = QW.Browser,
    n = {
        query: function(t, n) {
            return e.query(n || document.documentElement, t)
        },
        getDocRect: function(e) {
            e = e || document;
            var n = e.defaultView || e.parentWindow,
            r = e.compatMode,
            i = e.documentElement,
            s = n.innerHeight || 0,
            o = n.innerWidth || 0,
            u = n.pageXOffset || 0,
            a = n.pageYOffset || 0,
            f = i.scrollWidth,
            l = i.scrollHeight;
            return r != "CSS1Compat" && (i = e.body, f = i.scrollWidth, l = i.scrollHeight),
            r && !t.opera && (o = i.clientWidth, s = i.clientHeight),
            f = Math.max(f, o),
            l = Math.max(l, s),
            u = Math.max(u, e.documentElement.scrollLeft, e.body.scrollLeft),
            a = Math.max(a, e.documentElement.scrollTop, e.body.scrollTop),
            {
                width: o,
                height: s,
                scrollWidth: f,
                scrollHeight: l,
                scrollX: u,
                scrollY: a
            }
        },
        create: function() {
            var e = document.createElement("div"),
            t = {
                option: [1, '<select multiple="multiple">', "</select>"],
                optgroup: [1, '<select multiple="multiple">', "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tbody: [1, "<table>", "</table>"],
                tfoot: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                th: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                _default: [0, "", ""]
            },
            n = /<(\w+)/i;
            return function(r, i, s) {
                var o = s && s.createElement("div") || e,
                u = o,
                a = (n.exec(r) || ["", ""])[1],
                f = t[a] || t._default,
                l = f[0];
                o.innerHTML = f[1] + r + f[2];
                while (l--) o = o.firstChild;
                var c = o.firstChild;
                if (!c || !i) {
                    while (u.firstChild) u.removeChild(u.firstChild);
                    return c
                }
                s = s || document;
                var h = s.createDocumentFragment();
                while (c = o.firstChild) h.appendChild(c);
                return h
            }
        } (),
        pluckWhiteNode: function(e) {
            var t = [],
            r = 0,
            i = e.length;
            for (; r < i; r++) n.isElement(e[r]) && t.push(e[r]);
            return t
        },
        isElement: function(e) {
            return !! e && e.nodeType == 1
        },
        ready: function(e, n) {
            function r() {
                clearTimeout(n.__QWDomReadyTimer);
                if (i.length) {

                    var e = i.shift();
                    i.length && (n.__QWDomReadyTimer = setTimeout(r, 0)),
                    e()
                }
            }
            n = n || document;
            var i = n.__QWDomReadyCbs = n.__QWDomReadyCbs || [];
            i.push(e),
            setTimeout(function() {
                if (/complete/.test(n.readyState)) r();
                else if (n.addEventListener) ! t.ie && "interactive" == n.readyState ? r() : n.addEventListener("DOMContentLoaded", r, !1);
                else {
                    var e = function() {
                        e = new Function,
                        r()
                    }; (function() {
                        try {
                            n.body.doScroll("left")
                        } catch(t) {
                            return setTimeout(arguments.callee, 1)
                        }
                        e()
                    })(),
                    n.attachEvent("onreadystatechange",
                    function() {
                        "complete" == n.readyState && e()
                    })
                }
            },
            0)
        },
        rectContains: function(e, t) {
            return e.left <= t.left && e.right >= t.right && e.top <= t.top && e.bottom >= t.bottom
        },
        rectIntersect: function(e, t) {
            var n = Math.max(e.top, t.top),
            r = Math.min(e.right, t.right),
            i = Math.min(e.bottom, t.bottom),
            s = Math.max(e.left, t.left);
            return i >= n && r >= s ? {
                top: n,
                right: r,
                bottom: i,
                left: s
            }: null
        },
        createElement: function(e, t, n) {
            n = n || document;
            var r = n.createElement(e);
            return t && QW.NodeH.setAttr(r, t),
            r
        },
        insertCssText: function(e) {
            var t = document.createElement("style");
            return t.type = "text/css",
            t.styleSheet ? t.styleSheet.cssText = e: t.appendChild(document.createTextNode(e)),
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
        }
    };
    QW.DomU = n
} (),
function() {
    function e(e, t) {
        if ("string" == typeof e) {
            if (e.indexOf("<") == 0) return s.create(e, !1, t);
            var n = (t || document).getElementById(e),
            i;
            if (n && n.id != e) {
                i = (t || document).getElementsByName(e);
                for (var o = 0; o < i.length; o++) if (i[o].id == e) return i[o];
                return null
            }
            return n
        }
        return r.isWrap(e) ? arguments.callee(e[0]) : e
    }
    function t(e) {
        return String(e).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
    }
    function n(e, t) {
        if (/px$/.test(t) || !t) return parseInt(t, 10) || 0;
        var n = e.style.right,
        r = e.runtimeStyle.right,
        i;
        return e.runtimeStyle.right = e.currentStyle.right,
        e.style.right = t,
        i = e.style.pixelRight || 0,
        e.style.right = n,
        e.runtimeStyle.right = r,
        i
    }
    var r = QW.ObjectH,
    i = QW.StringH,
    s = QW.DomU,
    o = QW.Browser,
    u = QW.Selector,
    a = u.selector2Filter,
    f = {
        fillOpacity: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        orphans: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    },
    l = {
        outerHTML: function() {
            var t = document.createElement("div");
            return function(n, r) {
                n = e(n);
                if ("outerHTML" in n) return n.outerHTML;
                t.innerHTML = "";
                var i = r && r.createElement("div") || t;
                return i.appendChild(n.cloneNode(!0)),
                i.innerHTML
            }
        } (),
        hasClass: function(t, n) {
            return t = e(t),
            (" " + t.className + " ").indexOf(" " + n + " ") > -1
        },
        addClass: function(t, n) {
            t = e(t),
            l.hasClass(t, n) || (t.className = t.className ? t.className + " " + n: n)
        },
        removeClass: function(n, r) {
            n = e(n),
            l.hasClass(n, r) && (n.className = n.className.replace(new RegExp("(?:^|\\s)" + t(r) + "(?=\\s|$)", "ig"), ""))
        },
        replaceClass: function(n, r, i) {
            n = e(n),
            l.hasClass(n, r) ? n.className = n.className.replace(new RegExp("(^|\\s)" + t(r) + "(?=\\s|$)", "ig"), "$1" + i) : l.addClass(n, i)
        },
        toggleClass: function(e, t, n) {
            n = n || "",
            l.hasClass(e, t) ? l.replaceClass(e, t, n) : l.replaceClass(e, n, t)
        },
        show: function() {
            function t(e) {
                if (!n[e]) {
                    var t = document.createElement(e),
                    r = document.body;
                    l.insertSiblingBefore(r.firstChild, t),
                    display = l.getCurrentStyle(t, "display"),
                    l.removeChild(r, t),
                    r = t = null;
                    if (display === "none" || display === "") display = "block";
                    n[e] = display
                }
                return n[e]
            }
            var n = {};
            return function(n, r) {
                n = e(n);
                if (!r) {
                    var i = n.style.display;
                    i === "none" && (i = n.style.display = ""),
                    i === "" && l.getCurrentStyle(n, "display") === "none" && (i = t(n.nodeName))
                }
                n.style.display = r || i
            }
        } (),
        hide: function(t) {
            t = e(t),
            t.style.display = "none"
        },
        wrap: function(t, n) {
            t = e(t),
            n = e(n, t.ownerDocument),
            t.parentNode && t.parentNode.insertBefore(n, t),
            n.appendChild(t)
        },
        unwrap: function(t) {
            t = e(t);
            var n = t.parentNode;
            if (n && n.tagName != "BODY") {
                var r = n.parentNode;
                while (n.firstChild) r.insertBefore(n.firstChild, n);
                r.removeChild(n)
            }
        },
        empty: function(t) {
            t = e(t);
            while (t.firstChild) t.removeChild(t.firstChild)
        },
        toggle: function(e, t) {
            l.isVisible(e) ? l.hide(e) : l.show(e, t)
        },
        isVisible: function(t) {
            return t = e(t),
            !!(t.offsetHeight + t.offsetWidth && l.getStyle(t, "display") != "none")
        },
        getXY: function() {
            var e = function(e, t) {
                var n = parseInt(l.getCurrentStyle(e, "borderTopWidth"), 10) || 0,
                r = parseInt(l.getCurrentStyle(e, "borderLeftWidth"), 10) || 0;
                return o.gecko && /^t(?:able|d|h)$/i.test(e.tagName) && (n = r = 0),
                t[0] += r,
                t[1] += n,
                t
            };
            return ! o.ie6 && !o.ie7 && document.documentElement.getBoundingClientRect ?
            function(e) {
                var t = e.ownerDocument,
                n = s.getDocRect(t),
                r = n.scrollX,
                i = n.scrollY,
                u = e.getBoundingClientRect(),
                a = [u.left, u.top],
                f,
                l,
                c;
                o.ie && (l = t.documentElement.clientLeft, c = t.documentElement.clientTop, f = t.compatMode, f == "BackCompat" && (l = t.body.clientLeft, c = t.body.clientTop), a[0] -= l, a[1] -= c);
                if (i || r) a[0] += r,
                a[1] += i;
                return a
            }: function(t) {
                var n = [t.offsetLeft, t.offsetTop],
                r = t,
                i = t.ownerDocument,
                u = s.getDocRect(i),
                a = !!(o.gecko || parseFloat(o.webkit) > 519),
                f = 0,
                c = 0;
                while (r = r.offsetParent) n[0] += r.offsetLeft,
                n[1] += r.offsetTop,
                a && (n = e(r, n));
                if (l.getCurrentStyle(t, "position") != "fixed") {
                    r = t;
                    while (r = r.parentNode) {
                        f = r.scrollTop,
                        c = r.scrollLeft,
                        o.gecko && l.getCurrentStyle(r, "overflow") !== "visible" && (n = e(r, n));
                        if (f || c) n[0] -= c,
                        n[1] -= f
                    }
                }
                return n[0] += u.scrollX,
                n[1] += u.scrollY,
                n
            }
        } (),
        setXY: function(t, n, r) {
            t = e(t),
            n = parseInt(n, 10),
            r = parseInt(r, 10),
            isNaN(n) || l.setStyle(t, "left", n),
            isNaN(r) || l.setStyle(t, "top", r)
        },
        setSize: function(t, n, r) {
            t = e(t),
            n = parseFloat(n, 10),
            r = parseFloat(r, 10);
            if (isNaN(n) && isNaN(r)) return;
            var i = l.borderWidth(t),
            s = l.paddingWidth(t);
            isNaN(n) || l.setStyle(t, "width", Math.max( + n - i[1] - i[3] - s[1] - s[3], 0)),
            isNaN(r) || l.setStyle(t, "height", Math.max( + r - i[0] - i[2] - s[0] - s[2], 0))
        },
        setInnerSize: function(t, n, r) {
            t = e(t),
            n = parseFloat(n, 10),
            r = parseFloat(r, 10),
            isNaN(n) || l.setStyle(t, "width", n),
            isNaN(r) || l.setStyle(t, "height", r)
        },
        setRect: function(e, t, n, r, i) {
            l.setXY(e, t, n),
            l.setSize(e, r, i)
        },
        setInnerRect: function(e, t, n, r, i) {
            l.setXY(e, t, n),
            l.setInnerSize(e, r, i)
        },
        getSize: function(t) {
            return t = e(t),
            {
                width: t.offsetWidth,
                height: t.offsetHeight
            }
        },
        getRect: function(t) {
            t = e(t);
            var n = l.getXY(t),
            r = n[0],
            i = n[1],
            s = t.offsetWidth,
            o = t.offsetHeight;
            return {
                width: s,
                height: o,
                left: r,
                top: i,
                bottom: i + o,
                right: r + s
            }
        },
        nextSibling: function(t, n) {
            var r = a(n || "");
            t = e(t);
            do t = t.nextSibling;
            while (t && !r(t));
            return t
        },
        previousSibling: function(t, n) {
            var r = a(n || "");
            t = e(t);
            do t = t.previousSibling;
            while (t && !r(t));
            return t
        },
        previousSiblings: function(t, n) {
            var r = a(n || ""),
            i = [];
            t = e(t);
            while (t = t.previousSibling) r(t) && i.push(t);
            return i.reverse()
        },
        nextSiblings: function(t, n) {
            var r = a(n || ""),
            i = [];
            t = e(t);
            while (t = t.nextSibling) r(t) && i.push(t);
            return i
        },
        siblings: function(e, t) {
            var n = a(t || ""),
            r = e.parentNode.firstChild,
            i = [];
            while (r) e != r && n(r) && i.push(r),
            r = r.nextSibling;
            return i
        },
        ancestorNode: function(t, n) {
            var r = a(n || "");
            t = e(t);
            do t = t.parentNode;
            while (t && !r(t));
            return t
        },
        parentNode: function(e, t) {
            return l.ancestorNode(e, t)
        },
        ancestorNodes: function(t, n) {
            var r = a(n || ""),
            i = [];
            t = e(t);
            while (t = t.parentNode) r(t) && i.push(t);
            return i.reverse()
        },
        firstChild: function(t, n) {
            var r = a(n || "");
            t = e(t).firstChild;
            while (t && !r(t)) t = t.nextSibling;
            return t
        },
        lastChild: function(t, n) {
            var r = a(n || "");
            t = e(t).lastChild;
            while (t && !r(t)) t = t.previousSibling;
            return t
        },
        contains: function(t, n) {
            return t = e(t),
            n = e(n),
            t.contains ? t != n && t.contains(n) : !!(t.compareDocumentPosition(n) & 16)
        },
        insertAdjacentHTML: function(t, n, r) {
            t = e(t);
            if (t.insertAdjacentHTML) t.insertAdjacentHTML(n, r);
            else {
                var i = t.ownerDocument.createRange(),
                s;
                i.setStartBefore(t),
                s = i.createContextualFragment(r),
                l.insertAdjacentElement(t, n, s)
            }
        },
        insertAdjacentElement: function(t, n, r) {
            t = e(t),
            r = e(r);
            if (t.insertAdjacentElement) t.insertAdjacentElement(n, r);
            else switch (String(n).toLowerCase()) {
            case "beforebegin":
                t.parentNode.insertBefore(r, t);
                break;
            case "afterbegin":
                t.insertBefore(r, t.firstChild);
                break;
            case "beforeend":
                t.appendChild(r);
                break;
            case "afterend":
                t.parentNode.insertBefore(r, t.nextSibling || null)
            }
            return r
        },
        insert: function(e, t, n) {
            l.insertAdjacentElement(e, t, n)
        },
        insertTo: function(e, t, n) {
            l.insertAdjacentElement(n, t, e)
        },
        appendChild: function(t, n) {
            return e(t).appendChild(e(n))
        },
        appendTo: function(t, n) {
            return e(n).appendChild(e(t))
        },
        prepend: function(t, n) {
            return t = e(t),
            t.insertBefore(e(n), t.firstChild)
        },
        prependTo: function(e, t) {
            return l.prepend(t, e)
        },
        insertSiblingBefore: function(t, n) {
            return t = e(t),
            t.parentNode.insertBefore(e(n), t)
        },
        insertSiblingAfter: function(t, n) {
            t = e(t),
            t.parentNode.insertBefore(e(n), t.nextSibling || null)
        },
        insertBefore: function(t, n, r) {
            return e(t).insertBefore(e(n), r && e(r) || null)
        },
        insertAfter: function(t, n, r) {
            return e(t).insertBefore(e(n), r && e(r).nextSibling || null)
        },
        insertParent: function(e, t) {
            return l.insertSiblingBefore(e, t),
            l.appendChild(t, e)
        },
        replaceNode: function(t, n) {
            return t = e(t),
            t.parentNode.replaceChild(e(n), t)
        },
        replaceChild: function(t, n, r) {
            return e(t).replaceChild(e(n), e(r))
        },
        removeNode: function(t) {
            return t = e(t),
            t.parentNode && t.parentNode.removeChild(t)
        },
        removeChild: function(t, n) {
            var n = e(n);
            return n && e(t).removeChild(e(n))
        },
        get: function(t, n) {
            return t = e(t),
            r.get.apply(null, arguments)
        },
        set: function(t, n, i) {
            t = e(t),
            r.set.apply(null, arguments)
        },
        getAttr: function(t, n, r) {
            return t = e(t),
            n = l.attrMap[n] || n,
            n in t && "href" != n ? t[n] : t.getAttribute(n, r || t.nodeName == "A" && n.toLowerCase() == "href" && 2 || null)
        },
        setAttr: function(t, n, r, i) {
            t = e(t);
            if ("object" != typeof n) n = l.attrMap[n] || n,
            n in t ? t[n] = r: t.setAttribute(n, r, i || null);
            else for (var s in n) l.setAttr(t, s, n[s])
        },
        removeAttr: function(t, n, r) {
            return t = e(t),
            t.removeAttribute(n, r || 0)
        },
        query: function(t, n) {
            return t = e(t),
            u.query(t, n || "")
        },
        one: function(t, n) {
            return t = e(t),
            u.one(t, n || "")
        },
        getElementsByClass: function(t, n) {
            return t = e(t),
            u.query(t, "." + n)
        },
        getValue: function(t) {
            return t = e(t),
            t.value
        },
        setValue: function(t, n) {
            e(t).value = n
        },
        getHtml: function(t) {
            return t = e(t),
            t.innerHTML
        },
        setHtml: function() {
            var t = /<(?:object|embed|option|style)/i,
            n = function(e, t) {
                l.empty(e),
                l.appendChild(e, s.create(t, !0))
            };
            return function(r, i) {
                r = e(r);
                if (!t.test(i)) try {
                    r.innerHTML = i
                } catch(s) {
                    n(r, i)
                } else n(r, i)
            }
        } (),
        encodeURIForm: function(t, n) {
            t = e(t),
            n = n ||
            function(e) {
                return ! 1
            };
            var r = [],
            i = t.elements,
            s = i.length,
            o = 0,
            u = function(e, t) {
                r.push(encodeURIComponent(e) + "=" + encodeURIComponent(t))
            };
            for (; o < s; ++o) {
                t = i[o];
                var a = t.name;
                if (t.disabled || !a || n(t)) continue;
                switch (t.type) {
                case "text":
                case "hidden":
                case "password":
                case "textarea":
                    u(a, t.value);
                    break;
                case "radio":
                case "checkbox":
                    t.checked && u(a, t.value);
                    break;
                case "select-one":
                    t.selectedIndex > -1 && u(a, t.value);
                    break;
                case "select-multiple":
                    var f = t.options;
                    for (var l = 0; l < f.length; ++l) f[l].selected && u(a, f[l].value)
                }
            }
            return r.join("&")
        },
        isFormChanged: function(t, n) {
            t = e(t),
            n = n ||
            function(e) {
                return ! 1
            };
            var r = t.elements,
            i = r.length,
            s = 0,
            o = 0,
            u;
            for (; s < i; ++s, o = 0) {
                t = r[s];
                if (n(t)) continue;
                switch (t.type) {
                case "text":
                case "hidden":
                case "password":
                case "textarea":
                    if (t.defaultValue != t.value) return ! 0;
                    break;
                case "radio":
                case "checkbox":
                    if (t.defaultChecked != t.checked) return ! 0;
                    break;
                case "select-one":
                    o = 1;
                case "select-multiple":
                    u = t.options;
                    for (; o < u.length; ++o) if (u[o].defaultSelected != u[o].selected) return ! 0
                }
            }
            return ! 1
        },
        cloneNode: function(t, n) {
            return e(t).cloneNode(n || !1)
        },
        removeStyle: function(t, n) {
            t = e(t);
            var r = i.camelize(n),
            s = l.cssHooks[r];
            s && s.remove ? s.remove(t) : t.style.removeProperty ? t.style.removeProperty(i.decamelize(n)) : t.style.removeAttribute(r)
        },
        getStyle: function(t, n) {
            t = e(t),
            n = i.camelize(n);
            var r = l.cssHooks[n],
            s;
            return r && r.get ? s = r.get(t) : s = t.style[n],
            !s || s == "auto" ? null: s
        },
        getCurrentStyle: function(t, n, r) {
            t = e(t);
            var s = i.camelize(n),
            u = l.cssHooks[s],
            a;
            if (u && u.get) a = u.get(t, !0, r);
            else if (o.ie) a = t.currentStyle[s];
            else {
                var f = t.ownerDocument.defaultView.getComputedStyle(t, r || null);
                a = f ? f.getPropertyValue(i.decamelize(n)) : null
            }
            return ! a || a == "auto" ? null: a
        },
        setStyle: function(t, n, r) {
            t = e(t);
            if ("object" != typeof n) {
                var s = i.camelize(n),
                o = l.cssHooks[s];
                o && o.set ? o.set(t, r) : (typeof r == "number" && !f[s] && (r += "px"), t.style[s] = r)
            } else for (var u in n) l.setStyle(t, u, n[u])
        },
        borderWidth: function() {
            var t = {
                thin: 2,
                medium: 4,
                thick: 6
            },
            n = function(e, n) {
                var r = l.getCurrentStyle(e, n);
                return r = t[r] || parseFloat(r),
                r || 0
            };
            return function(t) {
                return t = e(t),
                [n(t, "borderTopWidth"), n(t, "borderRightWidth"), n(t, "borderBottomWidth"), n(t, "borderLeftWidth")]
            }
        } (),
        paddingWidth: function(t) {
            return t = e(t),
            [n(t, l.getCurrentStyle(t, "paddingTop")), n(t, l.getCurrentStyle(t, "paddingRight")), n(t, l.getCurrentStyle(t, "paddingBottom")), n(t, l.getCurrentStyle(t, "paddingLeft"))]
        },
        marginWidth: function(t) {
            return t = e(t),
            [n(t, l.getCurrentStyle(t, "marginTop")), n(t, l.getCurrentStyle(t, "marginRight")), n(t, l.getCurrentStyle(t, "marginBottom")), n(t, l.getCurrentStyle(t, "marginLeft"))]
        },
        tmpl: function(t, n) {
            return t = e(t),
            i.tmpl(t.innerHTML, n)
        },
        attrMap: {
            "class": "className",
            "for": "htmlFor",
            tabindex: "tabIndex",
            readonly: "readOnly",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        cssHooks: function() {
            var e = {
                "float": {
                    get: function(e, t, n) {
                        if (t) {
                            var r = e.ownerDocument.defaultView.getComputedStyle(e, n || null);
                            return r ? r.getPropertyValue("float") : null
                        }
                        return e.style.cssFloat
                    },
                    set: function(e, t) {
                        e.style.cssFloat = t
                    },
                    remove: function(e) {
                        e.style.removeProperty("float")
                    }
                },
                width: {
                    get: function(e) {
                        return l.getSize(e).width + "px"
                    }
                },
                height: {
                    get: function(e) {
                        return l.getSize(e).height + "px"
                    }
                }
            };
            if (o.ie) {
                e["float"] = {
                    get: function(e, t) {
                        return e[t ? "currentStyle": "style"].styleFloat
                    },
                    set: function(e, t) {
                        e.style.styleFloat = t
                    },
                    remove: function(e) {
                        e.style.removeAttribute("styleFloat")
                    }
                };
                var t = document.createElement("div"),
                n;
                t.innerHTML = "<a href='#' style='opacity:.55;'>a</a>",
                n = t.getElementsByTagName("a")[0];
                if (n && !/^0.55$/.test(n.style.opacity)) {
                    var r = /alpha\([^)]*\)/i,
                    i = /opacity=([^)]*)/;
                    e.opacity = {
                        get: function(e, t) {
                            return i.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "": t ? "1": ""
                        },
                        set: function(e, t) {
                            var n = e.style,
                            i = e.currentStyle;
                            n.zoom = 1;
                            var s = "alpha(opacity=" + t * 100 + ")",
                            o = i && i.filter || n.filter || "";
                            n.filter = r.test(o) ? o.replace(r, s) : o + " " + s
                        },
                        remove: function(e) {
                            var t = e.style,
                            n = e.currentStyle,
                            i = n && n.filter || t.filter || "";
                            r.test(i) && (t.filter = i.replace(r, "")),
                            t.removeAttribute("opacity")
                        }
                    }
                }
            }
            return e
        } ()
    };
    l.g = e,
    QW.NodeH = l
} (),
function() {
    var e = QW.ObjectH,
    t = e.mix,
    n = e.isString,
    r = e.isArray,
    i = Array.prototype.push,
    s = QW.NodeH,
    o = s.g,
    u = s.query,
    a = s.one,
    f = QW.DomU.create,
    l = function(e) {
        if (!e) return this instanceof l ? new l([]) : null;
        if (e instanceof l) return e;
        var t = arguments[1];
        if (n(e)) {
            if (/^</.test(e)) {
                var s = f(e, !0, t).childNodes,
                a = [];
                for (var c = 0,
                h; h = s[c]; c++) a[c] = h;
                return new l(a)
            }
            return new l(u(t, e))
        }
        e = o(e, t);
        if (! (this instanceof l)) return new l(e);
        this.core = e,
        r(e) ? (this.length = 0, i.apply(this, e)) : (this.length = 1, this[0] = e)
    };
    l.one = function(e) {
        if (!e) return null;
        var t = arguments[1];
        return n(e) ? /^</.test(e) ? new l(f(e, !1, t)) : new l(a(t, e)) : (e = o(e, t), r(e) ? new l(e[0]) : new l(e))
    },
    l.pluginHelper = function(e, n, r, i) {
        var s = QW.HelperH;
        e = s.mul(e, n);
        var o = s.rwrap(e, l, n);
        r && (o = s.gsetter(o, r)),
        t(l, o, i);
        var u = s.methodize(e, "core");
        u = s.rwrap(u, l, n),
        r && (u = s.gsetter(u, r)),
        t(l.prototype, u, i)
    },
    t(l.prototype, {
        first: function() {
            return l(this[0])
        },
        last: function() {
            return l(this[this.length - 1])
        },
        item: function(e) {
            return l(this[e])
        },
        filter: function(e, t) {
            return e === !0 ? l(this.core) : e === !1 ? l([]) : (typeof e == "string" && (e = QW.Selector.selector2Filter(e)), l(ArrayH.filter(this, e, t)))
        }
    }),
    QW.NodeW = l
} (),
function() {
    function e(e) {
        var n = t.getTarget(e),
        r = document;
        return n && (r = n.ownerDocument || n.document || (n.defaultView || n.window) && n || document),
        r
    }
    var t = {
        getPageX: function(n) {
            n = n || t.getEvent.apply(t, arguments);
            var r = e(n);
            return "pageX" in n ? n.pageX: n.clientX + (r.documentElement.scrollLeft || r.body.scrollLeft) - 2
        },
        getPageY: function(n) {
            n = n || t.getEvent.apply(t, arguments);
            var r = e(n);
            return "pageY" in n ? n.pageY: n.clientY + (r.documentElement.scrollTop || r.body.scrollTop) - 2
        },
        getDetail: function(e) {
            return e = e || t.getEvent.apply(t, arguments),
            e.detail || -(e.wheelDelta || 0)
        },
        getKeyCode: function(e) {
            return e = e || t.getEvent.apply(t, arguments),
            "keyCode" in e ? e.keyCode: e.charCode || e.which || 0
        },
        stopPropagation: function(e) {
            e = e || t.getEvent.apply(t, arguments),
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
        },
        preventDefault: function(e) {
            e = e || t.getEvent.apply(t, arguments),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        getCtrlKey: function(e) {
            return e = e || t.getEvent.apply(t, arguments),
            e.ctrlKey
        },
        getShiftKey: function(e) {
            return e = e || t.getEvent.apply(t, arguments),
            e.shiftKey
        },
        getAltKey: function(e) {
            return e = e || t.getEvent.apply(t, arguments),
            e.altKey
        },
        getTarget: function(e) {
            e = e || t.getEvent.apply(t, arguments);
            var n = e.srcElement || e.target;
            return n && n.nodeType == 3 && (n = n.parentNode),
            n
        },
        getRelatedTarget: function(e) {
            e = e || t.getEvent.apply(t, arguments);
            if ("relatedTarget" in e) return e.relatedTarget;
            if (e.type == "mouseover") return e.fromElement;
            if (e.type == "mouseout") return e.toElement
        },
        getEvent: function(e, t) {
            if (e) return e;
            if (t) {
                if (t.document) return t.document.parentWindow.event;
                if (t.parentWindow) return t.parentWindow.event
            }
            if (window.event) return window.event;
            var n = arguments.callee;
            do
            if (/Event/.test(n.arguments[0])) return n.arguments[0];
            while (n = n.caller)
        },
        _EventPro: {
            stopPropagation: function() {
                this.cancelBubble = !0
            },
            preventDefault: function() {
                this.returnValue = !1
            }
        },
        standardize: function(e) {
            e = e || t.getEvent.apply(t, arguments),
            "target" in e || (e.target = t.getTarget(e)),
            "relatedTarget" in e || (e.relatedTarget = t.getRelatedTarget(e)),
            "pageX" in e || (e.pageX = t.getPageX(e), e.pageY = t.getPageY(e)),
            "detail" in e || (e.detail = t.getDetail(e)),
            "keyCode" in e || (e.keyCode = t.getKeyCode(e));
            for (var n in t._EventPro) e[n] == null && (e[n] = t._EventPro[n]);
            return e
        }
    };
    QW.EventH = t
} (),
function() {
    function e(e, t, r, i) {
        return o.get(e, t + (i ? "." + i: ""), r) ||
        function(s) {
            if (!i || i && u._EventHooks[i][t](e, s, r)) return n(e, s, r, t)
        }
    }
    function t(e, t, r, i, s) {
        return o.get(e, r + (s ? "." + s: ""), i, t) ||
        function(o) {
            var a = [],
            f = o.srcElement || o.target;
            if (!f) return;
            f.nodeType == 3 && (f = f.parentNode);
            while (f && f != e) a.push(f),
            f = f.parentNode;
            a = QW.Selector.filter(a, t, e);
            for (var l = 0,
            c = a.length; l < c; ++l) { (!s || s && u._DelegateHooks[s][r](a[l], o || window.event, i)) && n(a[l], o, i, r);
                if (a[l].parentNode && a[l].parentNode.nodeType == 11) {
                    o.stopPropagation ? o.stopPropagation() : o.cancelBubble = !0;
                    break
                }
            }
        }
    }
    function n(e, t, n, r) {
        return u.fireHandler.apply(null, arguments)
    }
    var r = QW.NodeH.g,
    i = QW.ObjectH.mix,
    s = QW.EventH.standardize,
    o = function() {
        var e = 1,
        t = "__QWETH_id";
        return {
            get: function(e, n, r, i) {
                var s = e[t] && this[e[t]];
                if (s && r[t]) return s[n + r[t] + (i || "")]
            },
            add: function(n, r, i, s, o) {
                r[t] || (r[t] = e++),
                s[t] || (s[t] = e++);
                var u = this[r[t]] || (this[r[t]] = {});
                u[i + s[t] + (o || "")] = n
            },
            remove: function(e, n, r, i) {
                var s = e[t] && this[e[t]];
                s && r[t] && delete s[n + r[t] + (i || "")]
            },
            removeEvents: function(e, n) {
                var r = e[t] && this[e[t]];
                if (r) {
                    var i = new RegExp("^[a-zA-Z.]*" + (n || "") + "\\d+$");
                    for (var s in r) i.test(s) && (u.removeEventListener(e, s.split(/[^a-zA-Z]/)[0], r[s]), delete r[s])
                }
            },
            removeDelegates: function(e, n, r) {
                var i = e[t] && this[e[t]];
                if (i) {
                    var s = new RegExp("^([a-zA-Z]+\\.)?" + (n || "\\w+") + "\\d+.+");
                    for (var o in i) if (s.test(o) && (!r || o.substr(o.length - r.length) == r)) {
                        var a = o.split(/\d+/)[0].split("."),
                        f = u._DelegateCpatureEvents.indexOf(a[1] || a[0]) > -1;
                        u.removeEventListener(e, o.split(/[^a-zA-Z]/)[0], i[o], f),
                        delete i[o]
                    }
                }
            }
        }
    } (),
    u = {
        _EventHooks: {},
        _DelegateHooks: {},
        _DelegateCpatureEvents: "change,focus,blur",
        fireHandler: function(e, t, n, r) {
            return t = s(t),
            t.userType = r,
            n.call(e, t)
        },
        addEventListener: function() {
            return document.addEventListener ?
            function(e, t, n, r) {
                e.addEventListener(t, n, r || !1)
            }: function(e, t, n) {
                e.attachEvent("on" + t, n)
            }
        } (),
        removeEventListener: function() {
            return document.removeEventListener ?
            function(e, t, n, r) {
                e.removeEventListener(t, n, r || !1)
            }: function(e, t, n) {
                e.detachEvent("on" + t, n)
            }
        } (),
        on: function(t, n, i) {
            if (n && n.indexOf(",") > -1) {
                var s = n.split(/\s*,\s*/);
                for (var a = 0; a < s.length; a++) u.on(t, s[a], i);
                return
            }
            t = r(t);
            var f = u._EventHooks[n];
            if (f) for (var a in f) {
                var l = e(t, a, i, n);
                o.add(l, t, a + "." + n, i),
                a == n ? u.addEventListener(t, a, l) : u.on(t, a, l)
            } else l = e(t, n, i),
            u.addEventListener(t, n, l),
            o.add(l, t, n, i)
        },
        un: function(t, n, i) {
            if (n && n.indexOf(",") > -1) {
                var s = n.split(/\s*,\s*/);
                for (var a = 0; a < s.length; a++) u.un(t, s[a], i);
                return
            }
            t = r(t);
            if (!i) return o.removeEvents(t, n);
            var f = u._EventHooks[n];
            if (f) for (var a in f) {
                var l = e(t, a, i, n);
                a == n ? u.removeEventListener(t, a, l) : u.un(t, a, l),
                o.remove(t, a + "." + n, i)
            } else l = e(t, n, i),
            u.removeEventListener(t, n, l),
            o.remove(t, n, i)
        },
        once: function(e, t, n) {
            e = r(e);
            var i = function() {
                n.apply(this, arguments),
                u.un(e, t, i)
            };
            u.on(e, t, i)
        },
        delegate: function(e, n, i, s) {
            if (i && i.indexOf(",") > -1) {
                var a = i.split(/\s*,\s*/);
                for (var f = 0; f < a.length; f++) u.delegate(e, n, a[f], s);
                return
            }
            e = r(e);
            var l = u._DelegateHooks[i],
            c = u._DelegateCpatureEvents.indexOf(i) > -1;
            if (l) for (var f in l) {
                var h = t(e, n, f, s, i);
                o.add(h, e, f + "." + i, s, n),
                f == i ? u.addEventListener(e, f, h, c) : u.delegate(e, n, f, h)
            } else h = t(e, n, i, s),
            u.addEventListener(e, i, h, c),
            o.add(h, e, i, s, n)
        },
        undelegate: function(e, n, i, s) {
            if (i && i.indexOf(",") > -1) {
                var a = i.split(/\s*,\s*/);
                for (var f = 0; f < a.length; f++) u.undelegate(e, n, a[f], s);
                return
            }
            e = r(e);
            if (!s) return o.removeDelegates(e, i, n);
            var l = u._DelegateHooks[i],
            c = u._DelegateCpatureEvents.indexOf(i) > -1;
            if (l) for (var f in l) {
                var h = t(e, n, f, s, i);
                f == i ? u.removeEventListener(e, f, h, c) : u.undelegate(e, n, f, h),
                o.remove(e, f + "." + i, s, n)
            } else h = t(e, n, i, s),
            u.removeEventListener(e, i, h, c),
            o.remove(e, i, s, n)
        },
        fire: function() {
            return document.dispatchEvent ?
            function(e, t) {
                var n = null,
                r = e.ownerDocument || e;
                return /mouse|click/i.test(t) ? (n = r.createEvent("MouseEvents"), n.initMouseEvent(t, !0, !0, r.defaultView, 1, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : (n = r.createEvent("Events"), n.initEvent(t, !0, !0, r.defaultView)),
                e.dispatchEvent(n)
            }: function(e, t) {
                return e.fireEvent("on" + t)
            }
        } ()
    };
    u._defaultExtend = function() {
        var e = function(e) {
            function t(e) {
                u[e] = function(t, n) {
                    if (n) u.on(t, e, n);
                    else if (t[e]) try {
                        t[e]()
                    } catch(r) {} else u.fire(t, e)
                }
            }
            for (var n = 0,
            r = e.length; n < r; ++n) t(e[n])
        };
        e("submit,reset,click,focus,blur,change,select".split(",")),
        u.hover = function(e, t, n) {
            e = r(e),
            u.on(e, "mouseenter", t),
            u.on(e, "mouseleave", n || t)
        };
        var t = navigator.userAgent;
        /firefox/i.test(t) && (u._EventHooks.mousewheel = u._DelegateHooks.mousewheel = {
            DOMMouseScroll: function(e, t) {
                return ! 0
            }
        }),
        i(u._EventHooks, {
            mouseenter: {
                mouseover: function(e, t) {
                    var n = t.relatedTarget || t.fromElement;
                    if (!n || !(e.contains ? e.contains(n) : e == n || e.compareDocumentPosition(n) & 16)) return ! 0
                }
            },
            mouseleave: {
                mouseout: function(e, t) {
                    var n = t.relatedTarget || t.toElement;
                    if (!n || !(e.contains ? e.contains(n) : e == n || e.compareDocumentPosition(n) & 16)) return ! 0
                }
            }
        }),
        i(u._DelegateHooks, u._EventHooks);
        if (!document.addEventListener) {
            function n(e) {
                switch (e.type) {
                case "checkbox":
                case "radio":
                    return e.checked;
                case "select-multiple":
                    var t = [],
                    n = e.options;
                    for (var r = 0; r < n.length; ++r) n[r].selected && t.push(n[r].value);
                    return t.join(",");
                default:
                    return e.value
                }
            }
            function s(e, t) {
                var r = t.target || t.srcElement;
                if (n(r) != r.__QWETH_pre_val) return o(e, t),
                !0
            }
            function o(e, t) {
                var r = t.target || t.srcElement;
                r.__QWETH_pre_val = n(r)
            }
            i(u._DelegateHooks, {
                change: {
                    beforeactivete: o,
                    deactivate: s,
                    focusout: s,
                    click: s,
                    keyup: function(e, t) {
                        if (t.srcElement && t.srcElement.tagName == "SELECT") return s(e, t)
                    }
                },
                focus: {
                    focusin: function(e, t) {
                        return ! 0
                    }
                },
                blur: {
                    focusout: function(e, t) {
                        return ! 0
                    }
                }
            })
        }
    },
    u._defaultExtend(),
    QW.EventTargetH = u
} (),
function() {
    function e(e, t) {
        var r = e.__jssData;
        if (!r) {
            var i = e.getAttribute("data-jss");
            i ? (/^\s*{/.test(i) || (i = "{" + i + "}"), r = e.__jssData = n(i)) : t && (r = e.__jssData = {})
        }
        return r
    }
    var t = QW.ObjectH.mix,
    n = QW.JSON.parse,
    r = {};
    t(r, {
        rules: {},
        addRule: function(e, n) {
            var i = r.rules[e] || (r.rules[e] = {});
            t(i, n, !0)
        },
        addRules: function(e) {
            for (var t in e) r.addRule(t, e[t])
        },
        removeRule: function(e) {
            var t = r.rules[e];
            return t ? (delete r.rules[e], !0) : !1
        },
        getRuleData: function(e) {
            return r.rules[e]
        },
        setRuleAttribute: function(e, t, n) {
            var i = {};
            i[t] = n,
            r.addRule(e, i)
        },
        removeRuleAttribute: function(e, t) {
            var n = r.rules[e];
            return n && attributeName in n ? (delete n[attributeName], !0) : !1
        },
        getRuleAttribute: function(e, t) {
            var n = r.rules[e] || {};
            return n[t]
        }
    });
    var i = {
        getOwnJss: function(t, n) {
            var r = e(t);
            return r && n in r ? r[n] : undefined
        },
        getJss: function(t, n) {
            var i = e(t);
            if (i && n in i) return i[n];
            var s = r.getRuleData,
            o = t.id;
            if (o && (i = s("#" + o)) && n in i) return i[n];
            var u = t.name;
            if (u && (i = s("@" + u)) && n in i) return i[n];
            var a = t.className;
            if (a) {
                var f = a.split(" ");
                for (var l = 0; l < f.length; l++) if ((i = s("." + f[l])) && n in i) return i[n]
            }
            var c = t.tagName;
            return c && (i = s(c)) && n in i ? i[n] : undefined
        },
        setJss: function(t, n, r) {
            var i = e(t, !0);
            i[n] = r
        },
        removeJss: function(t, n) {
            var r = e(t);
            return r && n in r ? (delete r[n], !0) : !1
        }
    };
    QW.Jss = r,
    QW.JssTargetH = i
} (),
function() {
    var e = "queryer",
    t = "operator",
    n = "getter_all",
    r = "getter_first",
    i = "getter_first_all";
    QW.NodeC = {
        getterType: r,
        arrayMethods: "map,forEach,toArray".split(","),
        wrapMethods: {
            g: e,
            one: e,
            query: e,
            getElementsByClass: e,
            outerHTML: r,
            hasClass: r,
            addClass: t,
            removeClass: t,
            replaceClass: t,
            toggleClass: t,
            show: t,
            hide: t,
            toggle: t,
            isVisible: r,
            getXY: i,
            setXY: t,
            setSize: t,
            setInnerSize: t,
            setRect: t,
            setInnerRect: t,
            getSize: i,
            getRect: i,
            nextSibling: e,
            previousSibling: e,
            nextSiblings: e,
            previousSiblings: e,
            siblings: e,
            ancestorNode: e,
            ancestorNodes: e,
            parentNode: e,
            firstChild: e,
            lastChild: e,
            contains: r,
            insertAdjacentHTML: t,
            insertAdjacentElement: t,
            insert: t,
            insertTo: t,

            appendChild: t,
            appendTo: t,
            insertSiblingBefore: t,
            insertSiblingAfter: t,
            insertBefore: t,
            insertAfter: t,
            replaceNode: t,
            replaceChild: t,
            removeNode: t,
            empty: t,
            removeChild: t,
            get: i,
            set: t,
            getAttr: i,
            setAttr: t,
            removeAttr: t,
            getValue: i,
            setValue: t,
            getHtml: i,
            setHtml: t,
            encodeURIForm: r,
            isFormChanged: r,
            cloneNode: e,
            getStyle: i,
            getCurrentStyle: i,
            setStyle: t,
            removeStyle: t,
            borderWidth: r,
            paddingWidth: r,
            marginWidth: r,
            tmpl: i,
            wrap: t,
            unwrap: t,
            prepend: t,
            prependTo: t,
            getOwnJss: i,
            getJss: i,
            setJss: t,
            removeJss: t,
            forEach: t
        },
        gsetterMethods: {
            val: ["getValue", "setValue"],
            html: ["getHtml", "setHtml"],
            attr: ["", "getAttr", "setAttr"],
            css: ["", "getCurrentStyle", "setStyle"],
            size: ["getSize", "setInnerSize"],
            xy: ["getXY", "setXY"]
        }
    }
} (),
function() {
    var e = QW.HelperH.methodize,
    t = QW.ObjectH.mix;
    t(Object, QW.ObjectH),
    t(QW.ArrayH, QW.HashsetH),
    t(Array, QW.ArrayH),
    t(Array.prototype, e(QW.ArrayH)),
    t(QW.FunctionH, QW.ClassH),
    t(Function, QW.FunctionH),
    t(Date, QW.DateH),
    t(Date.prototype, e(QW.DateH)),
    t(String, QW.StringH),
    t(String.prototype, e(QW.StringH))
} (),
function() {
    var e = QW.ObjectH.mix,
    t = QW.HelperH.methodize,
    n = QW.HelperH.rwrap,
    r = QW.NodeC,
    i = QW.NodeH,
    s = QW.EventTargetH,
    o = QW.JssTargetH,
    u = QW.DomU,
    a = QW.NodeW;
    a.pluginHelper(i, r.wrapMethods, r.gsetterMethods),
    a.pluginHelper(s, "operator"),
    a.pluginHelper(o, r.wrapMethods, {
        jss: ["", "getJss", "setJss"]
    });
    var f = QW.ObjectH.dump(QW.ArrayH, r.arrayMethods);
    f = t(f),
    f = n(f, a, r.wrapMethods),
    e(a.prototype, f);
    var l = QW.Dom = {};
    e(l, [u, i, s, o])
} (),
function() {
    var e = function(e, t) {
        var n = (e.getAttribute && e.getAttribute("data--ban")) | 0;
        if (n) {
            if (!e.__BAN_preTime || new Date - e.__BAN_preTime > n) return e.__BAN_preTime = new Date * 1,
            !0;
            return
        }
        return ! 0
    };
    QW.EventTargetH._DelegateHooks.click = QW.EventTargetH._EventHooks.click = {
        click: e
    },
    QW.EventTargetH._EventHooks.submit = {
        submit: e
    }
} (),
window.g = QW.g = QW.NodeH.g,
window.W = QW.W = QW.NodeW,
QW.ObjectH.mix(window, QW),
QW.ModuleH.provideDomains.push(window),
function() {
    function e(e, t) {
        e = e || window,
        t = t || "_default";
        var n = e.__QWASYNCH_sequences || (e.__QWASYNCH_sequences = {});
        return n[t] = n[t] || [],
        n[t]
    }
    var t = QW.ObjectH.isString,
    n = {
        wait: function(n, r, i) {
            t(r) || (i = r, r = "_default"),
            i = i ||
            function() {};
            var s = e(n, r);
            s.push(i),
            s.length <= 1 && (/^_/.test(r) || (i = function() {},
            s.unshift(i)), i.call(n))
        },
        signal: function(t, r, i) {
            r = r || "_default";
            var s = e(t, r),
            o = s.shift();
            return s[0] && (function(e) {
                e.call(t)
            } (s[0]), i && n.signal(t, r, i)),
            !!o
        },
        clearSignals: function(t, n) {
            var r = e(t, n),
            i = r.length;
            return r.length = 0,
            !!i
        }
    };
    QW.provide("AsyncH", n)
} (),

					
function() {
    var e = QW.NodeW,
    t = QW.AsyncH,
    n = QW.HelperH.methodize;
    e.pluginHelper(t, "operator");
    var r = n(t);
    QW.provide("Async", r)
} (),
function() {
    function e(e) {
        this.options = e,
        this._initialize()
    }
    var t = QW.ObjectH.mix,
    n = QW.ObjectH.encodeURIJson,
    r = QW.NodeH.encodeURIForm,
    i = QW.CustEvent;
    t(e, {
        STATE_INIT: 0,
        STATE_REQUEST: 1,
        STATE_SUCCESS: 2,
        STATE_ERROR: 3,
        STATE_TIMEOUT: 4,
        STATE_CANCEL: 5,
        defaultHeaders: {
            "Content-type": "application/x-www-form-urlencoded UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        EVENTS: ["succeed", "error", "cancel", "timeout", "complete"],
        XHRVersions: ["Microsoft.XMLHTTP"],
        getXHR: function() {
            var t = e.XHRVersions;
            if (window.ActiveXObject) while (t.length > 0) try {
                return new ActiveXObject(t[0])
            } catch(n) {
                t.shift()
            }
            return window.XMLHttpRequest ? new XMLHttpRequest: null
        },
        request: function(t, n, r, i) {
            if (t.constructor == Object) var s = new e(t);
            else typeof n == "function" && (i = r, r = n, t && t.tagName == "FORM" ? (i = i || t.method, n = t, t = t.action) : n = ""),
            s = new e({
                url: t,
                method: i,
                data: n,
                onsucceed: function() {
                    r.call(this, this.requester.responseText)
                }
            });
            return s.send(),
            s
        },
        get: function(t, n, r) {
            var i = [].slice.call(arguments, 0);
            return i.push("get"),
            e.request.apply(null, i)
        },
        post: function(t, n, r) {
            var i = [].slice.call(arguments, 0);
            return i.push("post"),
            e.request.apply(null, i)
        }
    }),
    t(e.prototype, {
        url: "",
        method: "get",
        async: !0,
        user: "",
        pwd: "",
        requestHeaders: null,
        data: "",
        useLock: 0,
        timeout: 3e4,
        isLocked: 0,
        state: e.STATE_INIT,
        send: function(t, i, s) {
            var o = this;
            if (o.isLocked) throw new Error("Locked.");
            o.isProcessing() && o.cancel();
            var u = o.requester;
            if (!u) {
                u = o.requester = e.getXHR();
                if (!u) throw new Error("Fail to get HTTPRequester.")
            }
            t = t || o.url,
            t = t.split("#")[0],
            i = (i || o.method || "").toLowerCase(),
            i != "post" && (i = "get"),
            s = s || o.data,
            typeof s == "object" && (s.tagName == "FORM" ? s = r(s) : s = n(s)),
            s && i != "post" && (t += (t.indexOf("?") != -1 ? "&": "?") + s),
            o.user ? u.open(i, t, o.async, o.user, o.pwd) : u.open(i, t, o.async);
            for (var a in o.requestHeaders) u.setRequestHeader(a, o.requestHeaders[a]);
            o.isLocked = 0,
            o.state = e.STATE_INIT,
            o.async && (o._sendTime = new Date, o.useLock && (o.isLocked = 1), this.requester.onreadystatechange = function() {
                var e = o.requester.readyState;
                e == 4 && o._execComplete()
            },
            o._checkTimeout()),
            i == "post" ? (s || (s = " "), u.send(s)) : u.send(null);
            if (!o.async) return o._execComplete(),
            o.requester.responseText
        },
        isSuccess: function() {
            var e = this.requester.status;
            return ! e || e >= 200 && e < 300 || e == 304
        },
        isProcessing: function() {
            var e = this.requester ? this.requester.readyState: 0;
            return e > 0 && e < 4
        },
        get: function(e, t) {
            this.send(e, "get", t)
        },
        post: function(e, t) {
            this.send(e, "post", t)
        },
        cancel: function() {
            var t = this;
            return t.requester && t.isProcessing() ? (t.state = e.STATE_CANCEL, t.requester.abort(), t._execComplete(), t.fire("cancel"), !0) : !1
        },
        _initialize: function() {
            var n = this;
            i.createEvents(n, e.EVENTS),
            t(n, n.options, 1),
            n.requestHeaders = t(n.requestHeaders || {},
            e.defaultHeaders)
        },
        _checkTimeout: function() {
            var t = this;
            t.async && (clearTimeout(t._timer), this._timer = setTimeout(function() {
                t.requester && t.isProcessing() && (t.state = e.STATE_TIMEOUT, t.requester.abort(), t._execComplete("timeout"))
            },
            t.timeout))
        },
        _execComplete: function(t) {
            var n = this,
            r = n.requester;
            r.onreadystatechange = new Function,
            n.isLocked = 0,
            clearTimeout(this._timer);
            var i = null;
            try {
                i = n.requester.responseText
            } catch(s) {}
            t == "timeout" && n.fire("timeout"),
            n.state != e.STATE_CANCEL && n.state != e.STATE_TIMEOUT && (n.isSuccess() ? (n.state = e.STATE_SUCCESS, n.fire("succeed", {
                responseText: i
            })) : (n.state = e.STATE_ERROR, n.fire("error", {
                responseText: i
            }))),
            n.fire("complete", {
                responseText: i
            })
        }
    }),
    QW.provide("Ajax", e)
} (),
function() {
    var e = QW.Ajax,
    t = QW.NodeW;
    e.Delay = 1e3,
    e.prototype.opResults = function(e) {
        var t = this;
        if (!t.isSuccess()) return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"),
        {
            isop: !0,
            err: "inter"
        };
        var n = t.requester.responseText;
        try {
            var r = (new Function("return (" + n + ");"))()
        } catch(i) {
            return alert("\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002"),
            {
                isop: !0,
                err: "inter"
            }
        }
        r.isop = !0;
        switch (r.err) {
        default:
            r.isop = !1
        }
        return r
    },
    e.prototype.execJs = function() {
        QW.StringH.execJs(this.requester.responseText)
    };
    var n = {
        ajaxForm: function(t, n) {
            var r = {
                data: t,
                url: t.action,
                method: t.method
            };
            typeof n == "function" ? r.onsucceed = function() {
                n.call(this, this.requester.responseText)
            }: (r.onsucceed = e.opResults, QW.ObjectH.mix(r, n || {},
            !0)),
            (new e(r)).send()
        }
    };
    t.pluginHelper(n, "operator")
} (),
function() {
    function e(e) {
        e.step(),
        e.isPlaying() && (e._interval = window.setInterval(function() {
            e.step()
        },
        e.frameTime))
    }
    function t(e) {
        window.clearInterval(e._interval)
    }
    function n(e, t) {
        e.per = t,
        e._startDate = new Date * 1 - t * e.dur,
        e.byStep && (e._totalStep = e.dur / e.frameTime, e._currentStep = t * e._totalStep)
    }
    var r = QW.CustEvent,
    i = QW.ObjectH.mix,
    s = function(e, t, o) {
        i(this, o),
        i(this, {
            animFun: e,
            dur: t,
            byStep: !1,
            per: 0,
            frameTime: 28,
            _status: 0
        }),
        n(this, this.per),
        r.createEvents(this, s.EVENTS)
    };
    s.EVENTS = "beforeplay,play,step,pause,resume,end,reset".split(","),
    i(s.prototype, {
        isPlaying: function() {
            return this._status == 1
        },
        play: function() {
            var t = this;
            return t.isPlaying() && t.pause(),
            n(t, 0),
            t.fire("beforeplay") ? (t._status = 1, t.fire("play"), e(t), !0) : !1
        },
        step: function(e) {
            var t = this;
            e != null ? n(t, e) : (t.byStep ? e = t._currentStep++/t._totalStep:e=(new Date-t._startDate)/t.dur, this.per = e),
            this.per > 1 && (this.per = 1),
            t.animFun(this.per),
            t.fire("step");
            if (this.per >= 1) {
                this.end();
                return
            }
        },
        end: function() {
            n(this, 1),
            this.animFun(1),
            this._status = 2,
            t(this),
            this.fire("end")
        },
        pause: function() {
            this._status = 4,
            t(this),
            this.fire("pause")
        },
        resume: function() {
            n(this, this.per),
            this._status = 1,
            this.fire("resume"),
            e(this)
        },
        reset: function() {
            n(this, 0),
            this.animFun(0),
            this.fire("reset")
        }
    }),
    QW.provide("Anim", s)
} (),
function() {
    function e(e, t) {
        for (var n in e) {
            var r = new RegExp(n, "i");
            if (r.test(t)) return e[n]
        }
        return null
    }
    var t = QW.NodeH,
    n = QW.ObjectH.mix,
    r = QW.ObjectH.isObject,
    i = n,
    s = t.g,
    o = t.getCurrentStyle,
    u = t.setStyle,
    a = QW.DomU.isElement,
    f = QW.ArrayH.forEach,
    l = QW.ArrayH.map,
    c = QW.Anim,
    h = t.show,
    p = t.hide,
    d = t.isVisible,
    v = function(e, t, i) {
        this.el = e,
        this.attr = i,
        r(t) || (t = {
            to: t
        }),
        n(this, t)
    };
    n(v.prototype, {
        getValue: function() {
            return o(this.el, this.attr)
        },
        setValue: function(e, t) {
            u(this.el, this.attr, e + t)
        },
        getUnit: function() {
            if (this.unit) return this.unit;
            var e = this.getValue();
            if (e) {
                var t = e.toString().replace(/^[+-]?[\d\.]+/g, "");
                if (t && t != e) return t
            }
            return ""
        },
        init: function() {
            var e, t, n;
            null != this.from ? e = parseFloat(this.from) : e = parseFloat(this.getValue()) || 0,
            t = parseFloat(this.to),
            n = this.by != null ? parseFloat(this.by) : t - e,
            this.from = e,
            this.by = n,
            this.unit = this.getUnit()
        },
        action: function(e) {
            var t = this.unit,
            n;
            typeof this.end != "undefined" && e >= 1 ? n = this.end: (n = this.from + this.by * this.easing(e), n = n.toFixed(6)),
            this.setValue(n, t)
        }
    });
    var m = function(e, t, n) {
        var r = new v(e, t, n);
        i(this, r)
    };
    m.MENTOR_CLASS = v,
    n(m.prototype, {
        getValue: function() {
            return this.el[this.attr] | 0
        },
        setValue: function(e) {
            this.el[this.attr] = Math.round(e)
        }
    },
    !0);
    var g = function(e, t, n) {
        var r = new v(e, t, n);
        i(this, r)
    };
    g.MENTOR_CLASS = v,
    n(g.prototype, {
        parseColor: function(e) {
            var t = {
                rgb: /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
                hex: /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
                hex3: /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i
            };
            if (e.length == 3) return e;
            var n = t.hex.exec(e);
            return n && n.length == 4 ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = t.rgb.exec(e), n && n.length == 4 ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = t.hex3.exec(e), n && n.length == 4 ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : [0, 0, 0]))
        },
        init: function() {
            var e, t, n, r = this.parseColor;
            null != this.from ? e = this.from: e = this.getValue(),
            e = r(e),
            t = this.to || [0, 0, 0],
            t = r(t),
            n = this.by ? r(this.by) : l(t,
            function(t, n) {
                return t - e[n]
            }),
            this.from = e,
            this.to = t,
            this.by = n,
            this.unit = ""
        },
        getValue: function() {
            var e = o(this.el, this.attr);
            return this.parseColor(e)
        },
        setValue: function(e) {
            typeof e == "string" ? u(this.el, this.attr, e) : u(this.el, this.attr, "rgb(" + e.join(",") + ")")
        },
        action: function(e) {
            var t = this,
            n;
            typeof this.end != "undefined" && e >= 1 ? n = this.end: n = this.from.map(function(n, r) {
                return Math.max(Math.floor(n + t.by[r] * t.easing(e)), 0)
            }),
            this.setValue(n)
        }
    },
    !0);
    var y = {
        color$: g,
        "^scroll": m,
        ".*": v
    },
    b = function(t, n, r, o) {
        t = s(t);
        if (!a(t)) throw new Error(["Animation", "Initialize Error", "Element Not Found!"]);
        r = r || b.DefaultEasing,
        o = typeof o == "function" ? o: b.DefaultEasing;
        var u = [],
        l = [];
        for (var h in n) {
            if (typeof n[h] == "string" && b.agentHooks[n[h]]) {
                var p = b.agentHooks[n[h]](h, t);
                p.callback && (l.push(p.callback), delete p.callback),
                n[h] = p
            }
            var d = e(y, h),
            v = new d(t, n[h], h);
            if (!v) continue;
            v.init(),
            v.easing = v.easing || o,
            u.push(v)
        }
        var m = new c(function(e) {
            f(u,
            function(t) {
                t.action(e)
            })
        },
        r);
        f(l,
        function(e) {
            m.on("end", e)
        }),
        i(this, m)
    };
    b.MENTOR_CLASS = c,
    b.DefaultEasing = function(e) {
        return e
    },
    b.DefaultDur = 500,
    b.Sequence = !1,
    b.agentHooks = function() {
        return {
            show: function(e, t) {
                var n = 0,
                r = t["__anim" + e];
                return d(t) ? (n = o(t, e), r = typeof r == "undefined" ? o(t, e) : r) : (h(t), r = typeof r == "undefined" ? o(t, e) : r, u(t, e, 0)),
                {
                    from: n,
                    to: r
                }
            },
            hide: function(e, t) {
                var n = o(t, e),
                r = "__anim" + e,
                i = t[r];
                typeof i == "undefined" && (d(t) ? i = n: (h(t), i = o(t, e), p(t)), t[r] = i);
                var s = function() {
                    p(t),
                    u(t, e, t[r])
                };
                return {
                    from: n,
                    to: 0,
                    callback: s
                }
            },
            toggle: function(e, t) {
                return d(t) ? b.agentHooks.hide.apply(this, arguments) : b.agentHooks.show.apply(this, arguments)
            }
        }
    } (),
    QW.provide({
        ElAnim: b,
        ScrollAnim: b,
        ColorAnim: b
    })
} (),
function() {
    var e = {
        easeNone: function(e) {
            return e
        },
        easeIn: function(e) {
            return e * e
        },
        easeOut: function(e) {
            return e * (2 - e)
        },
        easeBoth: function(e) {
            return (e /= .5) < 1 ? .5 * e * e: -0.5 * (--e * (e - 2) - 1)
        },
        easeInStrong: function(e) {
            return e * e * e * e
        },
        easeOutStrong: function(e) {
            return - ((e -= 1) * e * e * e - 1)
        },
        easeBothStrong: function(e) {
            return (e /= .5) < 1 ? .5 * e * e * e * e: -0.5 * ((e -= 2) * e * e * e - 2)
        },
        elasticIn: function(e) {
            if (e == 0) return 0;
            if (e == 1) return 1;
            var t = .3,
            n = t / 4;
            return - (Math.pow(2, 10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t))
        },
        elasticOut: function(e) {
            if (e == 0) return 0;
            if (e == 1) return 1;
            var t = .3,
            n = t / 4;
            return Math.pow(2, -10 * e) * Math.sin((e - n) * 2 * Math.PI / t) + 1
        },
        elasticBoth: function(e) {
            if (e == 0) return 0;
            if ((e /= .5) == 2) return 1;
            var t = .3 * 1.5,
            n = t / 4;
            return e < 1 ? -0.5 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t) : Math.pow(2, -10 * (e -= 1)) * Math.sin((e - n) * 2 * Math.PI / t) * .5 + 1
        },
        backIn: function(e) {
            var t = 1.70158;
            return e * e * ((t + 1) * e - t)
        },
        backOut: function(e) {
            var t = 1.70158;
            return (e -= 1) * e * ((t + 1) * e + t) + 1
        },
        backBoth: function(e) {
            var t = 1.70158;
            return (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
        },
        bounceIn: function(t) {
            return 1 - e.bounceOut(1 - t)
        },
        bounceOut: function(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e: e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        },
        bounceBoth: function(t) {
            return t < .5 ? e.bounceIn(t * 2) * .5 : e.bounceOut(t * 2 - 1) * .5 + .5
        }
    };
    QW.provide("Easing", e)
} (),
function() {
    function e(e, t, r, i, s) {
        e = n(e),
        o.stop(e, !1, !1);
        var u = new QW.ElAnim(e, t, i || 400, s);
        return r && u.on("end",
        function() {
            r.call(e, null)
        }),
        u.play(),
        e.__preAnim = u,
        u
    }
    var t = QW.NodeH,
    n = t.g,
    r = t.isVisible,
    i = QW.ObjectH.mix,
    s = "_animation",
    o = {
        animate: function(t, n, r, i, o, u) {
            for (var a = arguments.length - 1; a > 0; a--) if (arguments[a] === !!arguments[a]) {
                var f = arguments[a];
                arguments[a] = null,
                u = f;
                break
            }
            if (!QW.Async || !u && !QW.ElAnim.Sequence) return e(t, n, i, r, o);
            W(t).wait(s,
            function() {
                var u = e(t, n, i, r, o);
                return u.on("end",
                function() {
                    W(t).signal(s)
                }),
                u
            })
        },
        fadeIn: function(e, t, n, r, i) {
            var s = {
                opacity: "show"
            };
            return o.animate(e, s, t, n, r, i)
        },
        fadeOut: function(e, t, n, r, i) {
            var s = {
                opacity: "hide"
            };
            return o.animate(e, s, t, n, r, i)
        },
        fadeToggle: function(e, t, n, i, s) {
            return o[r(e) ? "fadeOut": "fadeIn"](e, t, n, i, s)
        },
        slideUp: function(e, t, n, r, i) {
            var s = {
                height: "hide"
            };
            return o.animate(e, s, t, n, r, i)
        },
        slideDown: function(e, t, n, r, i) {
            var s = {
                height: "show"
            };
            return o.animate(e, s, t, n, r, i)
        },
        slideToggle: function(e, t, n, i, s) {
            return o[r(e) ? "slideUp": "slideDown"](e, t, n, i, s)
        },
        shine4Error: function(e, t, n, r, i) {
            var s = {
                backgroundColor: {
                    from: "#f33",
                    to: "#fff",
                    end: ""
                }
            };
            return o.animate(e, s, t, n, r, i)
        },
        stop: function(e, t, n) {
            var r = e.__preAnim;
            if (!r) return;
            t && QW.Async && QW.AsyncH.clearSignals(e, s),
            n ? r.end() : r.pause()
        }
    };
    QW.Async && i(o, {
        sleep: function(e, t, n) {
            return o.animate(e, {},
            t, n, null, !0)
        }
    }),
    QW.NodeW.pluginHelper(o, "operator"),
    QW.Dom && i(QW.Dom, o)
} ();					