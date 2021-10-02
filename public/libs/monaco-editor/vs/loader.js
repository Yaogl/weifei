/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.23.0(82e8ea39fc101d639262435542c7d43bc20d8aa2)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ 'use strict'
var _amdLoaderGlobal = this,
  _commonjsGlobal = typeof global == 'object' ? global : {},
  AMDLoader
;(function(l) {
  l.global = _amdLoaderGlobal
  var E = (function() {
    function h() {
      ;(this._detected = !1),
        (this._isWindows = !1),
        (this._isNode = !1),
        (this._isElectronRenderer = !1),
        (this._isWebWorker = !1)
    }
    return (
      Object.defineProperty(h.prototype, 'isWindows', {
        get: function() {
          return this._detect(), this._isWindows
        },
        enumerable: !1,
        configurable: !0
      }),
      Object.defineProperty(h.prototype, 'isNode', {
        get: function() {
          return this._detect(), this._isNode
        },
        enumerable: !1,
        configurable: !0
      }),
      Object.defineProperty(h.prototype, 'isElectronRenderer', {
        get: function() {
          return this._detect(), this._isElectronRenderer
        },
        enumerable: !1,
        configurable: !0
      }),
      Object.defineProperty(h.prototype, 'isWebWorker', {
        get: function() {
          return this._detect(), this._isWebWorker
        },
        enumerable: !1,
        configurable: !0
      }),
      (h.prototype._detect = function() {
        this._detected ||
          ((this._detected = !0),
          (this._isWindows = h._isWindows()),
          (this._isNode = typeof module != 'undefined' && !!module.exports),
          (this._isElectronRenderer =
            typeof process != 'undefined' &&
            typeof process.versions != 'undefined' &&
            typeof process.versions.electron != 'undefined' &&
            process.type === 'renderer'),
          (this._isWebWorker = typeof l.global.importScripts == 'function'))
      }),
      (h._isWindows = function() {
        return typeof navigator != 'undefined' &&
          navigator.userAgent &&
          navigator.userAgent.indexOf('Windows') >= 0
          ? !0
          : typeof process != 'undefined'
          ? process.platform === 'win32'
          : !1
      }),
      h
    )
  })()
  l.Environment = E
})(AMDLoader || (AMDLoader = {}))
var AMDLoader
;(function(l) {
  var E = (function() {
    function a(n, p, r) {
      ;(this.type = n), (this.detail = p), (this.timestamp = r)
    }
    return a
  })()
  l.LoaderEvent = E
  var h = (function() {
    function a(n) {
      this._events = [new E(1, '', n)]
    }
    return (
      (a.prototype.record = function(n, p) {
        this._events.push(
          new E(n, p, l.Utilities.getHighPerformanceTimestamp())
        )
      }),
      (a.prototype.getEvents = function() {
        return this._events
      }),
      a
    )
  })()
  l.LoaderEventRecorder = h
  var _ = (function() {
    function a() {}
    return (
      (a.prototype.record = function(n, p) {}),
      (a.prototype.getEvents = function() {
        return []
      }),
      (a.INSTANCE = new a()),
      a
    )
  })()
  l.NullLoaderEventRecorder = _
})(AMDLoader || (AMDLoader = {}))
var AMDLoader
;(function(l) {
  var E = (function() {
    function h() {}
    return (
      (h.fileUriToFilePath = function(_, a) {
        if (((a = decodeURI(a).replace(/%23/g, '#')), _)) {
          if (/^file:\/\/\//.test(a)) return a.substr(8)
          if (/^file:\/\//.test(a)) return a.substr(5)
        } else if (/^file:\/\//.test(a)) return a.substr(7)
        return a
      }),
      (h.startsWith = function(_, a) {
        return _.length >= a.length && _.substr(0, a.length) === a
      }),
      (h.endsWith = function(_, a) {
        return _.length >= a.length && _.substr(_.length - a.length) === a
      }),
      (h.containsQueryString = function(_) {
        return /^[^\#]*\?/gi.test(_)
      }),
      (h.isAbsolutePath = function(_) {
        return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(_)
      }),
      (h.forEachProperty = function(_, a) {
        if (_) {
          var n = void 0
          for (n in _) _.hasOwnProperty(n) && a(n, _[n])
        }
      }),
      (h.isEmpty = function(_) {
        var a = !0
        return (
          h.forEachProperty(_, function() {
            a = !1
          }),
          a
        )
      }),
      (h.recursiveClone = function(_) {
        if (
          !_ ||
          typeof _ != 'object' ||
          _ instanceof RegExp ||
          (!Array.isArray(_) && Object.getPrototypeOf(_) !== Object.prototype)
        )
          return _
        var a = Array.isArray(_) ? [] : {}
        return (
          h.forEachProperty(_, function(n, p) {
            p && typeof p == 'object'
              ? (a[n] = h.recursiveClone(p))
              : (a[n] = p)
          }),
          a
        )
      }),
      (h.generateAnonymousModule = function() {
        return '===anonymous' + h.NEXT_ANONYMOUS_ID++ + '==='
      }),
      (h.isAnonymousModule = function(_) {
        return h.startsWith(_, '===anonymous')
      }),
      (h.getHighPerformanceTimestamp = function() {
        return (
          this.PERFORMANCE_NOW_PROBED ||
            ((this.PERFORMANCE_NOW_PROBED = !0),
            (this.HAS_PERFORMANCE_NOW =
              l.global.performance &&
              typeof l.global.performance.now == 'function')),
          this.HAS_PERFORMANCE_NOW ? l.global.performance.now() : Date.now()
        )
      }),
      (h.NEXT_ANONYMOUS_ID = 1),
      (h.PERFORMANCE_NOW_PROBED = !1),
      (h.HAS_PERFORMANCE_NOW = !1),
      h
    )
  })()
  l.Utilities = E
})(AMDLoader || (AMDLoader = {}))
var AMDLoader
;(function(l) {
  function E(a) {
    if (a instanceof Error) return a
    var n = new Error(a.message || String(a) || 'Unknown Error')
    return a.stack && (n.stack = a.stack), n
  }
  l.ensureError = E
  var h = (function() {
    function a() {}
    return (
      (a.validateConfigurationOptions = function(n) {
        function p(e) {
          if (e.phase === 'loading') {
            console.error('Loading "' + e.moduleId + '" failed'),
              console.error(e),
              console.error('Here are the modules that depend on it:'),
              console.error(e.neededBy)
            return
          }
          if (e.phase === 'factory') {
            console.error(
              'The factory method of "' +
                e.moduleId +
                '" has thrown an exception'
            ),
              console.error(e)
            return
          }
        }
        if (
          ((n = n || {}),
          typeof n.baseUrl != 'string' && (n.baseUrl = ''),
          typeof n.isBuild != 'boolean' && (n.isBuild = !1),
          typeof n.paths != 'object' && (n.paths = {}),
          typeof n.config != 'object' && (n.config = {}),
          typeof n.catchError == 'undefined' && (n.catchError = !1),
          typeof n.recordStats == 'undefined' && (n.recordStats = !1),
          typeof n.urlArgs != 'string' && (n.urlArgs = ''),
          typeof n.onError != 'function' && (n.onError = p),
          Array.isArray(n.ignoreDuplicateModules) ||
            (n.ignoreDuplicateModules = []),
          n.baseUrl.length > 0 &&
            (l.Utilities.endsWith(n.baseUrl, '/') || (n.baseUrl += '/')),
          typeof n.cspNonce != 'string' && (n.cspNonce = ''),
          typeof n.preferScriptTags == 'undefined' && (n.preferScriptTags = !1),
          Array.isArray(n.nodeModules) || (n.nodeModules = []),
          n.nodeCachedData &&
            typeof n.nodeCachedData == 'object' &&
            (typeof n.nodeCachedData.seed != 'string' &&
              (n.nodeCachedData.seed = 'seed'),
            (typeof n.nodeCachedData.writeDelay != 'number' ||
              n.nodeCachedData.writeDelay < 0) &&
              (n.nodeCachedData.writeDelay = 1e3 * 7),
            !n.nodeCachedData.path || typeof n.nodeCachedData.path != 'string'))
        ) {
          var r = E(
            new Error("INVALID cached data configuration, 'path' MUST be set")
          )
          ;(r.phase = 'configuration'),
            n.onError(r),
            (n.nodeCachedData = void 0)
        }
        return n
      }),
      (a.mergeConfigurationOptions = function(n, p) {
        n === void 0 && (n = null), p === void 0 && (p = null)
        var r = l.Utilities.recursiveClone(p || {})
        return (
          l.Utilities.forEachProperty(n, function(e, t) {
            e === 'ignoreDuplicateModules' &&
            typeof r.ignoreDuplicateModules != 'undefined'
              ? (r.ignoreDuplicateModules = r.ignoreDuplicateModules.concat(t))
              : e === 'paths' && typeof r.paths != 'undefined'
              ? l.Utilities.forEachProperty(t, function(i, o) {
                  return (r.paths[i] = o)
                })
              : e === 'config' && typeof r.config != 'undefined'
              ? l.Utilities.forEachProperty(t, function(i, o) {
                  return (r.config[i] = o)
                })
              : (r[e] = l.Utilities.recursiveClone(t))
          }),
          a.validateConfigurationOptions(r)
        )
      }),
      a
    )
  })()
  l.ConfigurationOptionsUtil = h
  var _ = (function() {
    function a(n, p) {
      if (
        ((this._env = n),
        (this.options = h.mergeConfigurationOptions(p)),
        this._createIgnoreDuplicateModulesMap(),
        this._createNodeModulesMap(),
        this._createSortedPathsRules(),
        this.options.baseUrl === '')
      ) {
        if (
          this.options.nodeRequire &&
          this.options.nodeRequire.main &&
          this.options.nodeRequire.main.filename &&
          this._env.isNode
        ) {
          var r = this.options.nodeRequire.main.filename,
            e = Math.max(r.lastIndexOf('/'), r.lastIndexOf('\\'))
          this.options.baseUrl = r.substring(0, e + 1)
        }
        if (this.options.nodeMain && this._env.isNode) {
          var r = this.options.nodeMain,
            e = Math.max(r.lastIndexOf('/'), r.lastIndexOf('\\'))
          this.options.baseUrl = r.substring(0, e + 1)
        }
      }
    }
    return (
      (a.prototype._createIgnoreDuplicateModulesMap = function() {
        this.ignoreDuplicateModulesMap = {}
        for (var n = 0; n < this.options.ignoreDuplicateModules.length; n++)
          this.ignoreDuplicateModulesMap[
            this.options.ignoreDuplicateModules[n]
          ] = !0
      }),
      (a.prototype._createNodeModulesMap = function() {
        this.nodeModulesMap = Object.create(null)
        for (var n = 0, p = this.options.nodeModules; n < p.length; n++) {
          var r = p[n]
          this.nodeModulesMap[r] = !0
        }
      }),
      (a.prototype._createSortedPathsRules = function() {
        var n = this
        ;(this.sortedPathsRules = []),
          l.Utilities.forEachProperty(this.options.paths, function(p, r) {
            Array.isArray(r)
              ? n.sortedPathsRules.push({ from: p, to: r })
              : n.sortedPathsRules.push({ from: p, to: [r] })
          }),
          this.sortedPathsRules.sort(function(p, r) {
            return r.from.length - p.from.length
          })
      }),
      (a.prototype.cloneAndMerge = function(n) {
        return new a(this._env, h.mergeConfigurationOptions(n, this.options))
      }),
      (a.prototype.getOptionsLiteral = function() {
        return this.options
      }),
      (a.prototype._applyPaths = function(n) {
        for (var p, r = 0, e = this.sortedPathsRules.length; r < e; r++)
          if (
            ((p = this.sortedPathsRules[r]), l.Utilities.startsWith(n, p.from))
          ) {
            for (var t = [], i = 0, o = p.to.length; i < o; i++)
              t.push(p.to[i] + n.substr(p.from.length))
            return t
          }
        return [n]
      }),
      (a.prototype._addUrlArgsToUrl = function(n) {
        return l.Utilities.containsQueryString(n)
          ? n + '&' + this.options.urlArgs
          : n + '?' + this.options.urlArgs
      }),
      (a.prototype._addUrlArgsIfNecessaryToUrl = function(n) {
        return this.options.urlArgs ? this._addUrlArgsToUrl(n) : n
      }),
      (a.prototype._addUrlArgsIfNecessaryToUrls = function(n) {
        if (this.options.urlArgs)
          for (var p = 0, r = n.length; p < r; p++)
            n[p] = this._addUrlArgsToUrl(n[p])
        return n
      }),
      (a.prototype.moduleIdToPaths = function(n) {
        var p =
          this.nodeModulesMap[n] === !0 ||
          (this.options.amdModulesPattern instanceof RegExp &&
            !this.options.amdModulesPattern.test(n))
        if (p) return this.isBuild() ? ['empty:'] : ['node|' + n]
        var r = n,
          e
        if (!l.Utilities.endsWith(r, '.js') && !l.Utilities.isAbsolutePath(r)) {
          e = this._applyPaths(r)
          for (var t = 0, i = e.length; t < i; t++)
            (this.isBuild() && e[t] === 'empty:') ||
              (l.Utilities.isAbsolutePath(e[t]) ||
                (e[t] = this.options.baseUrl + e[t]),
              !l.Utilities.endsWith(e[t], '.js') &&
                !l.Utilities.containsQueryString(e[t]) &&
                (e[t] = e[t] + '.js'))
        } else
          !l.Utilities.endsWith(r, '.js') &&
            !l.Utilities.containsQueryString(r) &&
            (r = r + '.js'),
            (e = [r])
        return this._addUrlArgsIfNecessaryToUrls(e)
      }),
      (a.prototype.requireToUrl = function(n) {
        var p = n
        return (
          l.Utilities.isAbsolutePath(p) ||
            ((p = this._applyPaths(p)[0]),
            l.Utilities.isAbsolutePath(p) || (p = this.options.baseUrl + p)),
          this._addUrlArgsIfNecessaryToUrl(p)
        )
      }),
      (a.prototype.isBuild = function() {
        return this.options.isBuild
      }),
      (a.prototype.isDuplicateMessageIgnoredFor = function(n) {
        return this.ignoreDuplicateModulesMap.hasOwnProperty(n)
      }),
      (a.prototype.getConfigForModule = function(n) {
        if (this.options.config) return this.options.config[n]
      }),
      (a.prototype.shouldCatchError = function() {
        return this.options.catchError
      }),
      (a.prototype.shouldRecordStats = function() {
        return this.options.recordStats
      }),
      (a.prototype.onError = function(n) {
        this.options.onError(n)
      }),
      a
    )
  })()
  l.Configuration = _
})(AMDLoader || (AMDLoader = {}))
var AMDLoader
;(function(l) {
  var E = (function() {
      function r(e) {
        ;(this._env = e), (this._scriptLoader = null), (this._callbackMap = {})
      }
      return (
        (r.prototype.load = function(e, t, i, o) {
          var u = this
          if (!this._scriptLoader)
            if (this._env.isWebWorker) this._scriptLoader = new _()
            else if (this._env.isElectronRenderer) {
              var s = e.getConfig().getOptionsLiteral().preferScriptTags
              s
                ? (this._scriptLoader = new h())
                : (this._scriptLoader = new a(this._env))
            } else
              this._env.isNode
                ? (this._scriptLoader = new a(this._env))
                : (this._scriptLoader = new h())
          var f = { callback: i, errorback: o }
          if (this._callbackMap.hasOwnProperty(t)) {
            this._callbackMap[t].push(f)
            return
          }
          ;(this._callbackMap[t] = [f]),
            this._scriptLoader.load(
              e,
              t,
              function() {
                return u.triggerCallback(t)
              },
              function(c) {
                return u.triggerErrorback(t, c)
              }
            )
        }),
        (r.prototype.triggerCallback = function(e) {
          var t = this._callbackMap[e]
          delete this._callbackMap[e]
          for (var i = 0; i < t.length; i++) t[i].callback()
        }),
        (r.prototype.triggerErrorback = function(e, t) {
          var i = this._callbackMap[e]
          delete this._callbackMap[e]
          for (var o = 0; o < i.length; o++) i[o].errorback(t)
        }),
        r
      )
    })(),
    h = (function() {
      function r() {}
      return (
        (r.prototype.attachListeners = function(e, t, i) {
          var o = function() {
              e.removeEventListener('load', u),
                e.removeEventListener('error', s)
            },
            u = function(f) {
              o(), t()
            },
            s = function(f) {
              o(), i(f)
            }
          e.addEventListener('load', u), e.addEventListener('error', s)
        }),
        (r.prototype.load = function(e, t, i, o) {
          if (/^node\|/.test(t)) {
            var u = e.getConfig().getOptionsLiteral(),
              s = n(e.getRecorder(), u.nodeRequire || l.global.nodeRequire),
              f = t.split('|'),
              c = null
            try {
              c = s(f[1])
            } catch (y) {
              o(y)
              return
            }
            e.enqueueDefineAnonymousModule([], function() {
              return c
            }),
              i()
          } else {
            var d = document.createElement('script')
            d.setAttribute('async', 'async'),
              d.setAttribute('type', 'text/javascript'),
              this.attachListeners(d, i, o)
            var v = e.getConfig().getOptionsLiteral().trustedTypesPolicy
            v && (t = v.createScriptURL(t)), d.setAttribute('src', t)
            var g = e.getConfig().getOptionsLiteral().cspNonce
            g && d.setAttribute('nonce', g),
              document.getElementsByTagName('head')[0].appendChild(d)
          }
        }),
        r
      )
    })(),
    _ = (function() {
      function r() {}
      return (
        (r.prototype.load = function(e, t, i, o) {
          var u = e.getConfig().getOptionsLiteral().trustedTypesPolicy
          u && (t = u.createScriptURL(t))
          try {
            importScripts(t), i()
          } catch (s) {
            o(s)
          }
        }),
        r
      )
    })(),
    a = (function() {
      function r(e) {
        ;(this._env = e),
          (this._didInitialize = !1),
          (this._didPatchNodeRequire = !1)
      }
      return (
        (r.prototype._init = function(e) {
          this._didInitialize ||
            ((this._didInitialize = !0),
            (this._fs = e('fs')),
            (this._vm = e('vm')),
            (this._path = e('path')),
            (this._crypto = e('crypto')))
        }),
        (r.prototype._initNodeRequire = function(e, t) {
          var i = t.getConfig().getOptionsLiteral().nodeCachedData
          if (!!i && !this._didPatchNodeRequire) {
            this._didPatchNodeRequire = !0
            var o = this,
              u = e('module')
            function s(f) {
              var c = f.constructor,
                d = function(g) {
                  try {
                    return f.require(g)
                  } finally {
                  }
                }
              return (
                (d.resolve = function(g, y) {
                  return c._resolveFilename(g, f, !1, y)
                }),
                (d.main = process.mainModule),
                (d.extensions = c._extensions),
                (d.cache = c._cache),
                d
              )
            }
            u.prototype._compile = function(f, c) {
              var d = u.wrap(f.replace(/^#!.*/, '')),
                v = t.getRecorder(),
                g = o._getCachedDataPath(i, c),
                y = { filename: c },
                m
              try {
                var I = o._fs.readFileSync(g)
                ;(m = I.slice(0, 16)),
                  (y.cachedData = I.slice(16)),
                  v.record(60, g)
              } catch (O) {
                v.record(61, g)
              }
              var b = new o._vm.Script(d, y),
                C = b.runInThisContext(y),
                P = o._path.dirname(c),
                U = s(this),
                w = [
                  this.exports,
                  U,
                  this,
                  c,
                  P,
                  process,
                  _commonjsGlobal,
                  Buffer
                ],
                R = C.apply(this.exports, w)
              return (
                o._handleCachedData(b, d, g, !y.cachedData, t),
                o._verifyCachedData(b, d, g, m, t),
                R
              )
            }
          }
        }),
        (r.prototype.load = function(e, t, i, o) {
          var u = this,
            s = e.getConfig().getOptionsLiteral(),
            f = n(e.getRecorder(), s.nodeRequire || l.global.nodeRequire),
            c =
              s.nodeInstrumenter ||
              function(C) {
                return C
              }
          this._init(f), this._initNodeRequire(f, e)
          var d = e.getRecorder()
          if (/^node\|/.test(t)) {
            var v = t.split('|'),
              g = null
            try {
              g = f(v[1])
            } catch (C) {
              o(C)
              return
            }
            e.enqueueDefineAnonymousModule([], function() {
              return g
            }),
              i()
          } else {
            t = l.Utilities.fileUriToFilePath(this._env.isWindows, t)
            var y = this._path.normalize(t),
              m = this._getElectronRendererScriptPathOrUri(y),
              I = Boolean(s.nodeCachedData),
              b = I ? this._getCachedDataPath(s.nodeCachedData, t) : void 0
            this._readSourceAndCachedData(y, b, d, function(C, P, U, w) {
              if (C) {
                o(C)
                return
              }
              var R
              P.charCodeAt(0) === r._BOM
                ? (R = r._PREFIX + P.substring(1) + r._SUFFIX)
                : (R = r._PREFIX + P + r._SUFFIX),
                (R = c(R, y))
              var O = { filename: m, cachedData: U },
                M = u._createAndEvalScript(e, R, O, i, o)
              u._handleCachedData(M, R, b, I && !U, e),
                u._verifyCachedData(M, R, b, w, e)
            })
          }
        }),
        (r.prototype._createAndEvalScript = function(e, t, i, o, u) {
          var s = e.getRecorder()
          s.record(31, i.filename)
          var f = new this._vm.Script(t, i),
            c = f.runInThisContext(i),
            d = e.getGlobalAMDDefineFunc(),
            v = !1,
            g = function() {
              return (v = !0), d.apply(null, arguments)
            }
          return (
            (g.amd = d.amd),
            c.call(
              l.global,
              e.getGlobalAMDRequireFunc(),
              g,
              i.filename,
              this._path.dirname(i.filename)
            ),
            s.record(32, i.filename),
            v
              ? o()
              : u(
                  new Error("Didn't receive define call in " + i.filename + '!')
                ),
            f
          )
        }),
        (r.prototype._getElectronRendererScriptPathOrUri = function(e) {
          if (!this._env.isElectronRenderer) return e
          var t = e.match(/^([a-z])\:(.*)/i)
          return t
            ? 'file:///' + (t[1].toUpperCase() + ':' + t[2]).replace(/\\/g, '/')
            : 'file://' + e
        }),
        (r.prototype._getCachedDataPath = function(e, t) {
          var i = this._crypto
              .createHash('md5')
              .update(t, 'utf8')
              .update(e.seed, 'utf8')
              .update(process.arch, '')
              .digest('hex'),
            o = this._path.basename(t).replace(/\.js$/, '')
          return this._path.join(e.path, o + '-' + i + '.code')
        }),
        (r.prototype._handleCachedData = function(e, t, i, o, u) {
          var s = this
          e.cachedDataRejected
            ? this._fs.unlink(i, function(f) {
                u.getRecorder().record(62, i),
                  s._createAndWriteCachedData(e, t, i, u),
                  f && u.getConfig().onError(f)
              })
            : o && this._createAndWriteCachedData(e, t, i, u)
        }),
        (r.prototype._createAndWriteCachedData = function(e, t, i, o) {
          var u = this,
            s = Math.ceil(
              o.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
                (1 + Math.random())
            ),
            f = -1,
            c = 0,
            d = void 0,
            v = function() {
              setTimeout(function() {
                d ||
                  (d = u._crypto
                    .createHash('md5')
                    .update(t, 'utf8')
                    .digest())
                var g = e.createCachedData()
                if (!(g.length === 0 || g.length === f || c >= 5)) {
                  if (g.length < f) {
                    v()
                    return
                  }
                  ;(f = g.length),
                    u._fs.writeFile(i, Buffer.concat([d, g]), function(y) {
                      y && o.getConfig().onError(y),
                        o.getRecorder().record(63, i),
                        v()
                    })
                }
              }, s * Math.pow(4, c++))
            }
          v()
        }),
        (r.prototype._readSourceAndCachedData = function(e, t, i, o) {
          if (!t) this._fs.readFile(e, { encoding: 'utf8' }, o)
          else {
            var u = void 0,
              s = void 0,
              f = void 0,
              c = 2,
              d = function(v) {
                v ? o(v) : --c == 0 && o(void 0, u, s, f)
              }
            this._fs.readFile(e, { encoding: 'utf8' }, function(v, g) {
              ;(u = g), d(v)
            }),
              this._fs.readFile(t, function(v, g) {
                !v && g && g.length > 0
                  ? ((f = g.slice(0, 16)), (s = g.slice(16)), i.record(60, t))
                  : i.record(61, t),
                  d()
              })
          }
        }),
        (r.prototype._verifyCachedData = function(e, t, i, o, u) {
          var s = this
          !o ||
            e.cachedDataRejected ||
            setTimeout(function() {
              var f = s._crypto
                .createHash('md5')
                .update(t, 'utf8')
                .digest()
              o.equals(f) ||
                (u
                  .getConfig()
                  .onError(
                    new Error(
                      "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                        i +
                        "' now, but a RESTART IS REQUIRED"
                    )
                  ),
                s._fs.unlink(i, function(c) {
                  c && u.getConfig().onError(c)
                }))
            }, Math.ceil(5e3 * (1 + Math.random())))
        }),
        (r._BOM = 65279),
        (r._PREFIX = '(function (require, define, __filename, __dirname) { '),
        (r._SUFFIX = `
});`),
        r
      )
    })()
  function n(r, e) {
    if (e.__$__isRecorded) return e
    var t = function(o) {
      r.record(33, o)
      try {
        return e(o)
      } finally {
        r.record(34, o)
      }
    }
    return (t.__$__isRecorded = !0), t
  }
  l.ensureRecordedNodeRequire = n
  function p(r) {
    return new E(r)
  }
  l.createScriptLoader = p
})(AMDLoader || (AMDLoader = {}))
var AMDLoader
;(function(l) {
  var E = (function() {
    function r(e) {
      var t = e.lastIndexOf('/')
      t !== -1
        ? (this.fromModulePath = e.substr(0, t + 1))
        : (this.fromModulePath = '')
    }
    return (
      (r._normalizeModuleId = function(e) {
        var t = e,
          i
        for (i = /\/\.\//; i.test(t); ) t = t.replace(i, '/')
        for (
          t = t.replace(/^\.\//g, ''),
            i = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
          i.test(t);

        )
          t = t.replace(i, '/')
        return (
          (t = t.replace(
            /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
            ''
          )),
          t
        )
      }),
      (r.prototype.resolveModule = function(e) {
        var t = e
        return (
          l.Utilities.isAbsolutePath(t) ||
            ((l.Utilities.startsWith(t, './') ||
              l.Utilities.startsWith(t, '../')) &&
              (t = r._normalizeModuleId(this.fromModulePath + t))),
          t
        )
      }),
      (r.ROOT = new r('')),
      r
    )
  })()
  l.ModuleIdResolver = E
  var h = (function() {
    function r(e, t, i, o, u, s) {
      ;(this.id = e),
        (this.strId = t),
        (this.dependencies = i),
        (this._callback = o),
        (this._errorback = u),
        (this.moduleIdResolver = s),
        (this.exports = {}),
        (this.error = null),
        (this.exportsPassedIn = !1),
        (this.unresolvedDependenciesCount = this.dependencies.length),
        (this._isComplete = !1)
    }
    return (
      (r._safeInvokeFunction = function(e, t) {
        try {
          return { returnedValue: e.apply(l.global, t), producedError: null }
        } catch (i) {
          return { returnedValue: null, producedError: i }
        }
      }),
      (r._invokeFactory = function(e, t, i, o) {
        return e.isBuild() && !l.Utilities.isAnonymousModule(t)
          ? { returnedValue: null, producedError: null }
          : e.shouldCatchError()
          ? this._safeInvokeFunction(i, o)
          : { returnedValue: i.apply(l.global, o), producedError: null }
      }),
      (r.prototype.complete = function(e, t, i) {
        this._isComplete = !0
        var o = null
        if (this._callback)
          if (typeof this._callback == 'function') {
            e.record(21, this.strId)
            var u = r._invokeFactory(t, this.strId, this._callback, i)
            ;(o = u.producedError),
              e.record(22, this.strId),
              !o &&
                typeof u.returnedValue != 'undefined' &&
                (!this.exportsPassedIn || l.Utilities.isEmpty(this.exports)) &&
                (this.exports = u.returnedValue)
          } else this.exports = this._callback
        if (o) {
          var s = l.ensureError(o)
          ;(s.phase = 'factory'),
            (s.moduleId = this.strId),
            (this.error = s),
            t.onError(s)
        }
        ;(this.dependencies = null),
          (this._callback = null),
          (this._errorback = null),
          (this.moduleIdResolver = null)
      }),
      (r.prototype.onDependencyError = function(e) {
        return (
          (this._isComplete = !0),
          (this.error = e),
          this._errorback ? (this._errorback(e), !0) : !1
        )
      }),
      (r.prototype.isComplete = function() {
        return this._isComplete
      }),
      r
    )
  })()
  l.Module = h
  var _ = (function() {
      function r() {
        ;(this._nextId = 0),
          (this._strModuleIdToIntModuleId = new Map()),
          (this._intModuleIdToStrModuleId = []),
          this.getModuleId('exports'),
          this.getModuleId('module'),
          this.getModuleId('require')
      }
      return (
        (r.prototype.getMaxModuleId = function() {
          return this._nextId
        }),
        (r.prototype.getModuleId = function(e) {
          var t = this._strModuleIdToIntModuleId.get(e)
          return (
            typeof t == 'undefined' &&
              ((t = this._nextId++),
              this._strModuleIdToIntModuleId.set(e, t),
              (this._intModuleIdToStrModuleId[t] = e)),
            t
          )
        }),
        (r.prototype.getStrModuleId = function(e) {
          return this._intModuleIdToStrModuleId[e]
        }),
        r
      )
    })(),
    a = (function() {
      function r(e) {
        this.id = e
      }
      return (
        (r.EXPORTS = new r(0)), (r.MODULE = new r(1)), (r.REQUIRE = new r(2)), r
      )
    })()
  l.RegularDependency = a
  var n = (function() {
    function r(e, t, i) {
      ;(this.id = e), (this.pluginId = t), (this.pluginParam = i)
    }
    return r
  })()
  l.PluginDependency = n
  var p = (function() {
    function r(e, t, i, o, u) {
      u === void 0 && (u = 0),
        (this._env = e),
        (this._scriptLoader = t),
        (this._loaderAvailableTimestamp = u),
        (this._defineFunc = i),
        (this._requireFunc = o),
        (this._moduleIdProvider = new _()),
        (this._config = new l.Configuration(this._env)),
        (this._hasDependencyCycle = !1),
        (this._modules2 = []),
        (this._knownModules2 = []),
        (this._inverseDependencies2 = []),
        (this._inversePluginDependencies2 = new Map()),
        (this._currentAnnonymousDefineCall = null),
        (this._recorder = null),
        (this._buildInfoPath = []),
        (this._buildInfoDefineStack = []),
        (this._buildInfoDependencies = [])
    }
    return (
      (r.prototype.reset = function() {
        return new r(
          this._env,
          this._scriptLoader,
          this._defineFunc,
          this._requireFunc,
          this._loaderAvailableTimestamp
        )
      }),
      (r.prototype.getGlobalAMDDefineFunc = function() {
        return this._defineFunc
      }),
      (r.prototype.getGlobalAMDRequireFunc = function() {
        return this._requireFunc
      }),
      (r._findRelevantLocationInStack = function(e, t) {
        for (
          var i = function(m) {
              return m.replace(/\\/g, '/')
            },
            o = i(e),
            u = t.split(/\n/),
            s = 0;
          s < u.length;
          s++
        ) {
          var f = u[s].match(/(.*):(\d+):(\d+)\)?$/)
          if (f) {
            var c = f[1],
              d = f[2],
              v = f[3],
              g = Math.max(c.lastIndexOf(' ') + 1, c.lastIndexOf('(') + 1)
            if (((c = c.substr(g)), (c = i(c)), c === o)) {
              var y = { line: parseInt(d, 10), col: parseInt(v, 10) }
              return (
                y.line === 1 &&
                  (y.col -= '(function (require, define, __filename, __dirname) { '.length),
                y
              )
            }
          }
        }
        throw new Error('Could not correlate define call site for needle ' + e)
      }),
      (r.prototype.getBuildInfo = function() {
        if (!this._config.isBuild()) return null
        for (var e = [], t = 0, i = 0, o = this._modules2.length; i < o; i++) {
          var u = this._modules2[i]
          if (!!u) {
            var s = this._buildInfoPath[u.id] || null,
              f = this._buildInfoDefineStack[u.id] || null,
              c = this._buildInfoDependencies[u.id]
            e[t++] = {
              id: u.strId,
              path: s,
              defineLocation:
                s && f ? r._findRelevantLocationInStack(s, f) : null,
              dependencies: c,
              shim: null,
              exports: u.exports
            }
          }
        }
        return e
      }),
      (r.prototype.getRecorder = function() {
        return (
          this._recorder ||
            (this._config.shouldRecordStats()
              ? (this._recorder = new l.LoaderEventRecorder(
                  this._loaderAvailableTimestamp
                ))
              : (this._recorder = l.NullLoaderEventRecorder.INSTANCE)),
          this._recorder
        )
      }),
      (r.prototype.getLoaderEvents = function() {
        return this.getRecorder().getEvents()
      }),
      (r.prototype.enqueueDefineAnonymousModule = function(e, t) {
        if (this._currentAnnonymousDefineCall !== null)
          throw new Error(
            'Can only have one anonymous define call per script file'
          )
        var i = null
        this._config.isBuild() &&
          (i = new Error('StackLocation').stack || null),
          (this._currentAnnonymousDefineCall = {
            stack: i,
            dependencies: e,
            callback: t
          })
      }),
      (r.prototype.defineModule = function(e, t, i, o, u, s) {
        var f = this
        s === void 0 && (s = new E(e))
        var c = this._moduleIdProvider.getModuleId(e)
        if (this._modules2[c]) {
          this._config.isDuplicateMessageIgnoredFor(e) ||
            console.warn("Duplicate definition of module '" + e + "'")
          return
        }
        var d = new h(c, e, this._normalizeDependencies(t, s), i, o, s)
        ;(this._modules2[c] = d),
          this._config.isBuild() &&
            ((this._buildInfoDefineStack[c] = u),
            (this._buildInfoDependencies[c] = (d.dependencies || []).map(
              function(v) {
                return f._moduleIdProvider.getStrModuleId(v.id)
              }
            ))),
          this._resolve(d)
      }),
      (r.prototype._normalizeDependency = function(e, t) {
        if (e === 'exports') return a.EXPORTS
        if (e === 'module') return a.MODULE
        if (e === 'require') return a.REQUIRE
        var i = e.indexOf('!')
        if (i >= 0) {
          var o = t.resolveModule(e.substr(0, i)),
            u = t.resolveModule(e.substr(i + 1)),
            s = this._moduleIdProvider.getModuleId(o + '!' + u),
            f = this._moduleIdProvider.getModuleId(o)
          return new n(s, f, u)
        }
        return new a(this._moduleIdProvider.getModuleId(t.resolveModule(e)))
      }),
      (r.prototype._normalizeDependencies = function(e, t) {
        for (var i = [], o = 0, u = 0, s = e.length; u < s; u++)
          i[o++] = this._normalizeDependency(e[u], t)
        return i
      }),
      (r.prototype._relativeRequire = function(e, t, i, o) {
        if (typeof t == 'string') return this.synchronousRequire(t, e)
        this.defineModule(
          l.Utilities.generateAnonymousModule(),
          t,
          i,
          o,
          null,
          e
        )
      }),
      (r.prototype.synchronousRequire = function(e, t) {
        t === void 0 && (t = new E(e))
        var i = this._normalizeDependency(e, t),
          o = this._modules2[i.id]
        if (!o)
          throw new Error(
            "Check dependency list! Synchronous require cannot resolve module '" +
              e +
              "'. This is the first mention of this module!"
          )
        if (!o.isComplete())
          throw new Error(
            "Check dependency list! Synchronous require cannot resolve module '" +
              e +
              "'. This module has not been resolved completely yet."
          )
        if (o.error) throw o.error
        return o.exports
      }),
      (r.prototype.configure = function(e, t) {
        var i = this._config.shouldRecordStats()
        t
          ? (this._config = new l.Configuration(this._env, e))
          : (this._config = this._config.cloneAndMerge(e)),
          this._config.shouldRecordStats() && !i && (this._recorder = null)
      }),
      (r.prototype.getConfig = function() {
        return this._config
      }),
      (r.prototype._onLoad = function(e) {
        if (this._currentAnnonymousDefineCall !== null) {
          var t = this._currentAnnonymousDefineCall
          ;(this._currentAnnonymousDefineCall = null),
            this.defineModule(
              this._moduleIdProvider.getStrModuleId(e),
              t.dependencies,
              t.callback,
              null,
              t.stack
            )
        }
      }),
      (r.prototype._createLoadError = function(e, t) {
        var i = this,
          o = this._moduleIdProvider.getStrModuleId(e),
          u = (this._inverseDependencies2[e] || []).map(function(f) {
            return i._moduleIdProvider.getStrModuleId(f)
          }),
          s = l.ensureError(t)
        return (s.phase = 'loading'), (s.moduleId = o), (s.neededBy = u), s
      }),
      (r.prototype._onLoadError = function(e, t) {
        var i = this._createLoadError(e, t)
        this._modules2[e] ||
          (this._modules2[e] = new h(
            e,
            this._moduleIdProvider.getStrModuleId(e),
            [],
            function() {},
            function() {},
            null
          ))
        for (
          var o = [], u = 0, s = this._moduleIdProvider.getMaxModuleId();
          u < s;
          u++
        )
          o[u] = !1
        var f = !1,
          c = []
        for (c.push(e), o[e] = !0; c.length > 0; ) {
          var d = c.shift(),
            v = this._modules2[d]
          v && (f = v.onDependencyError(i) || f)
          var g = this._inverseDependencies2[d]
          if (g)
            for (var u = 0, s = g.length; u < s; u++) {
              var y = g[u]
              o[y] || (c.push(y), (o[y] = !0))
            }
        }
        f || this._config.onError(i)
      }),
      (r.prototype._hasDependencyPath = function(e, t) {
        var i = this._modules2[e]
        if (!i) return !1
        for (
          var o = [], u = 0, s = this._moduleIdProvider.getMaxModuleId();
          u < s;
          u++
        )
          o[u] = !1
        var f = []
        for (f.push(i), o[e] = !0; f.length > 0; ) {
          var c = f.shift(),
            d = c.dependencies
          if (d)
            for (var u = 0, s = d.length; u < s; u++) {
              var v = d[u]
              if (v.id === t) return !0
              var g = this._modules2[v.id]
              g && !o[v.id] && ((o[v.id] = !0), f.push(g))
            }
        }
        return !1
      }),
      (r.prototype._findCyclePath = function(e, t, i) {
        if (e === t || i === 50) return [e]
        var o = this._modules2[e]
        if (!o) return null
        var u = o.dependencies
        if (u)
          for (var s = 0, f = u.length; s < f; s++) {
            var c = this._findCyclePath(u[s].id, t, i + 1)
            if (c !== null) return c.push(e), c
          }
        return null
      }),
      (r.prototype._createRequire = function(e) {
        var t = this,
          i = function(o, u, s) {
            return t._relativeRequire(e, o, u, s)
          }
        return (
          (i.toUrl = function(o) {
            return t._config.requireToUrl(e.resolveModule(o))
          }),
          (i.getStats = function() {
            return t.getLoaderEvents()
          }),
          (i.hasDependencyCycle = function() {
            return t._hasDependencyCycle
          }),
          (i.config = function(o, u) {
            u === void 0 && (u = !1), t.configure(o, u)
          }),
          (i.__$__nodeRequire = l.global.nodeRequire),
          i
        )
      }),
      (r.prototype._loadModule = function(e) {
        var t = this
        if (!(this._modules2[e] || this._knownModules2[e])) {
          this._knownModules2[e] = !0
          var i = this._moduleIdProvider.getStrModuleId(e),
            o = this._config.moduleIdToPaths(i),
            u = /^@[^\/]+\/[^\/]+$/
          this._env.isNode &&
            (i.indexOf('/') === -1 || u.test(i)) &&
            o.push('node|' + i)
          var s = -1,
            f = function(c) {
              if ((s++, s >= o.length)) t._onLoadError(e, c)
              else {
                var d = o[s],
                  v = t.getRecorder()
                if (t._config.isBuild() && d === 'empty:') {
                  ;(t._buildInfoPath[e] = d),
                    t.defineModule(
                      t._moduleIdProvider.getStrModuleId(e),
                      [],
                      null,
                      null,
                      null
                    ),
                    t._onLoad(e)
                  return
                }
                v.record(10, d),
                  t._scriptLoader.load(
                    t,
                    d,
                    function() {
                      t._config.isBuild() && (t._buildInfoPath[e] = d),
                        v.record(11, d),
                        t._onLoad(e)
                    },
                    function(g) {
                      v.record(12, d), f(g)
                    }
                  )
              }
            }
          f(null)
        }
      }),
      (r.prototype._loadPluginDependency = function(e, t) {
        var i = this
        if (!(this._modules2[t.id] || this._knownModules2[t.id])) {
          this._knownModules2[t.id] = !0
          var o = function(u) {
            i.defineModule(
              i._moduleIdProvider.getStrModuleId(t.id),
              [],
              u,
              null,
              null
            )
          }
          ;(o.error = function(u) {
            i._config.onError(i._createLoadError(t.id, u))
          }),
            e.load(
              t.pluginParam,
              this._createRequire(E.ROOT),
              o,
              this._config.getOptionsLiteral()
            )
        }
      }),
      (r.prototype._resolve = function(e) {
        var t = this,
          i = e.dependencies
        if (i)
          for (var o = 0, u = i.length; o < u; o++) {
            var s = i[o]
            if (s === a.EXPORTS) {
              ;(e.exportsPassedIn = !0), e.unresolvedDependenciesCount--
              continue
            }
            if (s === a.MODULE) {
              e.unresolvedDependenciesCount--
              continue
            }
            if (s === a.REQUIRE) {
              e.unresolvedDependenciesCount--
              continue
            }
            var f = this._modules2[s.id]
            if (f && f.isComplete()) {
              if (f.error) {
                e.onDependencyError(f.error)
                return
              }
              e.unresolvedDependenciesCount--
              continue
            }
            if (this._hasDependencyPath(s.id, e.id)) {
              ;(this._hasDependencyCycle = !0),
                console.warn(
                  "There is a dependency cycle between '" +
                    this._moduleIdProvider.getStrModuleId(s.id) +
                    "' and '" +
                    this._moduleIdProvider.getStrModuleId(e.id) +
                    "'. The cyclic path follows:"
                )
              var c = this._findCyclePath(s.id, e.id, 0) || []
              c.reverse(),
                c.push(s.id),
                console.warn(
                  c.map(function(g) {
                    return t._moduleIdProvider.getStrModuleId(g)
                  }).join(` => 
`)
                ),
                e.unresolvedDependenciesCount--
              continue
            }
            if (
              ((this._inverseDependencies2[s.id] =
                this._inverseDependencies2[s.id] || []),
              this._inverseDependencies2[s.id].push(e.id),
              s instanceof n)
            ) {
              var d = this._modules2[s.pluginId]
              if (d && d.isComplete()) {
                this._loadPluginDependency(d.exports, s)
                continue
              }
              var v = this._inversePluginDependencies2.get(s.pluginId)
              v ||
                ((v = []), this._inversePluginDependencies2.set(s.pluginId, v)),
                v.push(s),
                this._loadModule(s.pluginId)
              continue
            }
            this._loadModule(s.id)
          }
        e.unresolvedDependenciesCount === 0 && this._onModuleComplete(e)
      }),
      (r.prototype._onModuleComplete = function(e) {
        var t = this,
          i = this.getRecorder()
        if (!e.isComplete()) {
          var o = e.dependencies,
            u = []
          if (o)
            for (var s = 0, f = o.length; s < f; s++) {
              var c = o[s]
              if (c === a.EXPORTS) {
                u[s] = e.exports
                continue
              }
              if (c === a.MODULE) {
                u[s] = {
                  id: e.strId,
                  config: function() {
                    return t._config.getConfigForModule(e.strId)
                  }
                }
                continue
              }
              if (c === a.REQUIRE) {
                u[s] = this._createRequire(e.moduleIdResolver)
                continue
              }
              var d = this._modules2[c.id]
              if (d) {
                u[s] = d.exports
                continue
              }
              u[s] = null
            }
          e.complete(i, this._config, u)
          var v = this._inverseDependencies2[e.id]
          if (((this._inverseDependencies2[e.id] = null), v))
            for (var s = 0, f = v.length; s < f; s++) {
              var g = v[s],
                y = this._modules2[g]
              y.unresolvedDependenciesCount--,
                y.unresolvedDependenciesCount === 0 && this._onModuleComplete(y)
            }
          var m = this._inversePluginDependencies2.get(e.id)
          if (m) {
            this._inversePluginDependencies2.delete(e.id)
            for (var s = 0, f = m.length; s < f; s++)
              this._loadPluginDependency(e.exports, m[s])
          }
        }
      }),
      r
    )
  })()
  l.ModuleManager = p
})(AMDLoader || (AMDLoader = {}))
var define, AMDLoader
;(function(l) {
  var E = new l.Environment(),
    h = null,
    _ = function(r, e, t) {
      typeof r != 'string' && ((t = e), (e = r), (r = null)),
        (typeof e != 'object' || !Array.isArray(e)) && ((t = e), (e = null)),
        e || (e = ['require', 'exports', 'module']),
        r
          ? h.defineModule(r, e, t, null, null)
          : h.enqueueDefineAnonymousModule(e, t)
    }
  _.amd = { jQuery: !0 }
  var a = function(r, e) {
      e === void 0 && (e = !1), h.configure(r, e)
    },
    n = function() {
      if (arguments.length === 1) {
        if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
          a(arguments[0])
          return
        }
        if (typeof arguments[0] == 'string')
          return h.synchronousRequire(arguments[0])
      }
      if (
        (arguments.length === 2 || arguments.length === 3) &&
        Array.isArray(arguments[0])
      ) {
        h.defineModule(
          l.Utilities.generateAnonymousModule(),
          arguments[0],
          arguments[1],
          arguments[2],
          null
        )
        return
      }
      throw new Error('Unrecognized require call')
    }
  ;(n.config = a),
    (n.getConfig = function() {
      return h.getConfig().getOptionsLiteral()
    }),
    (n.reset = function() {
      h = h.reset()
    }),
    (n.getBuildInfo = function() {
      return h.getBuildInfo()
    }),
    (n.getStats = function() {
      return h.getLoaderEvents()
    }),
    (n.define = function() {
      return _.apply(null, arguments)
    })
  function p() {
    if (
      typeof l.global.require != 'undefined' ||
      typeof require != 'undefined'
    ) {
      var r = l.global.require || require
      if (typeof r == 'function' && typeof r.resolve == 'function') {
        var e = l.ensureRecordedNodeRequire(h.getRecorder(), r)
        ;(l.global.nodeRequire = e),
          (n.nodeRequire = e),
          (n.__$__nodeRequire = e)
      }
    }
    E.isNode && !E.isElectronRenderer
      ? ((module.exports = n), (require = n))
      : (E.isElectronRenderer || (l.global.define = _), (l.global.require = n))
  }
  ;(l.init = p),
    (typeof l.global.define != 'function' || !l.global.define.amd) &&
      ((h = new l.ModuleManager(
        E,
        l.createScriptLoader(E),
        _,
        n,
        l.Utilities.getHighPerformanceTimestamp()
      )),
      typeof l.global.require != 'undefined' &&
        typeof l.global.require != 'function' &&
        n.config(l.global.require),
      (define = function() {
        return _.apply(null, arguments)
      }),
      (define.amd = _.amd),
      typeof doNotInitLoader == 'undefined' && p())
})(AMDLoader || (AMDLoader = {}))
