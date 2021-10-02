/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.23.0(82e8ea39fc101d639262435542c7d43bc20d8aa2)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ ;(function() {
  var z = [
      'require',
      'exports',
      'vs/base/common/platform',
      'vs/editor/common/core/position',
      'vs/base/common/errors',
      'vs/base/common/strings',
      'vs/editor/common/core/range',
      'vs/base/common/lifecycle',
      'vs/base/common/stopwatch',
      'vs/base/common/event',
      'vs/base/common/diff/diff',
      'vs/base/common/types',
      'vs/base/common/uint',
      'vs/base/common/uri',
      'vs/base/common/arrays',
      'vs/base/common/diff/diffChange',
      'vs/base/common/iterator',
      'vs/base/common/keyCodes',
      'vs/base/common/linkedList',
      'vs/base/common/process',
      'vs/base/common/path',
      'vs/base/common/cancellation',
      'vs/base/common/hash',
      'vs/editor/common/core/characterClassifier',
      'vs/editor/common/core/selection',
      'vs/editor/common/core/token',
      'vs/editor/common/diff/diffComputer',
      'vs/editor/common/model/wordHelper',
      'vs/editor/common/modes/linkComputer',
      'vs/editor/common/modes/supports/inplaceReplaceSupport',
      'vs/editor/common/standalone/standaloneEnums',
      'vs/editor/common/standalone/standaloneBase',
      'vs/editor/common/viewModel/prefixSumComputer',
      'vs/editor/common/model/mirrorTextModel',
      'vs/base/common/worker/simpleWorker',
      'vs/editor/common/services/editorSimpleWorker'
    ],
    G = function(I) {
      for (var t = [], p = 0, P = I.length; p < P; p++) t[p] = z[I[p]]
      return t
    }
  ;('use strict')
  var ce = this,
    fe = typeof global == 'object' ? global : {},
    X
  ;(function(I) {
    I.global = ce
    var t = (function() {
      function p() {
        ;(this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1)
      }
      return (
        Object.defineProperty(p.prototype, 'isWindows', {
          get: function() {
            return this._detect(), this._isWindows
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(p.prototype, 'isNode', {
          get: function() {
            return this._detect(), this._isNode
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(p.prototype, 'isElectronRenderer', {
          get: function() {
            return this._detect(), this._isElectronRenderer
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(p.prototype, 'isWebWorker', {
          get: function() {
            return this._detect(), this._isWebWorker
          },
          enumerable: !1,
          configurable: !0
        }),
        (p.prototype._detect = function() {
          this._detected ||
            ((this._detected = !0),
            (this._isWindows = p._isWindows()),
            (this._isNode = typeof module != 'undefined' && !!module.exports),
            (this._isElectronRenderer =
              typeof process != 'undefined' &&
              typeof process.versions != 'undefined' &&
              typeof process.versions.electron != 'undefined' &&
              process.type === 'renderer'),
            (this._isWebWorker = typeof I.global.importScripts == 'function'))
        }),
        (p._isWindows = function() {
          return typeof navigator != 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('Windows') >= 0
            ? !0
            : typeof process != 'undefined'
            ? process.platform === 'win32'
            : !1
        }),
        p
      )
    })()
    I.Environment = t
  })(X || (X = {}))
  var X
  ;(function(I) {
    var t = (function() {
      function E(u, d, l) {
        ;(this.type = u), (this.detail = d), (this.timestamp = l)
      }
      return E
    })()
    I.LoaderEvent = t
    var p = (function() {
      function E(u) {
        this._events = [new t(1, '', u)]
      }
      return (
        (E.prototype.record = function(u, d) {
          this._events.push(
            new t(u, d, I.Utilities.getHighPerformanceTimestamp())
          )
        }),
        (E.prototype.getEvents = function() {
          return this._events
        }),
        E
      )
    })()
    I.LoaderEventRecorder = p
    var P = (function() {
      function E() {}
      return (
        (E.prototype.record = function(u, d) {}),
        (E.prototype.getEvents = function() {
          return []
        }),
        (E.INSTANCE = new E()),
        E
      )
    })()
    I.NullLoaderEventRecorder = P
  })(X || (X = {}))
  var X
  ;(function(I) {
    var t = (function() {
      function p() {}
      return (
        (p.fileUriToFilePath = function(P, E) {
          if (((E = decodeURI(E).replace(/%23/g, '#')), P)) {
            if (/^file:\/\/\//.test(E)) return E.substr(8)
            if (/^file:\/\//.test(E)) return E.substr(5)
          } else if (/^file:\/\//.test(E)) return E.substr(7)
          return E
        }),
        (p.startsWith = function(P, E) {
          return P.length >= E.length && P.substr(0, E.length) === E
        }),
        (p.endsWith = function(P, E) {
          return P.length >= E.length && P.substr(P.length - E.length) === E
        }),
        (p.containsQueryString = function(P) {
          return /^[^\#]*\?/gi.test(P)
        }),
        (p.isAbsolutePath = function(P) {
          return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(P)
        }),
        (p.forEachProperty = function(P, E) {
          if (P) {
            var u = void 0
            for (u in P) P.hasOwnProperty(u) && E(u, P[u])
          }
        }),
        (p.isEmpty = function(P) {
          var E = !0
          return (
            p.forEachProperty(P, function() {
              E = !1
            }),
            E
          )
        }),
        (p.recursiveClone = function(P) {
          if (
            !P ||
            typeof P != 'object' ||
            P instanceof RegExp ||
            (!Array.isArray(P) && Object.getPrototypeOf(P) !== Object.prototype)
          )
            return P
          var E = Array.isArray(P) ? [] : {}
          return (
            p.forEachProperty(P, function(u, d) {
              d && typeof d == 'object'
                ? (E[u] = p.recursiveClone(d))
                : (E[u] = d)
            }),
            E
          )
        }),
        (p.generateAnonymousModule = function() {
          return '===anonymous' + p.NEXT_ANONYMOUS_ID++ + '==='
        }),
        (p.isAnonymousModule = function(P) {
          return p.startsWith(P, '===anonymous')
        }),
        (p.getHighPerformanceTimestamp = function() {
          return (
            this.PERFORMANCE_NOW_PROBED ||
              ((this.PERFORMANCE_NOW_PROBED = !0),
              (this.HAS_PERFORMANCE_NOW =
                I.global.performance &&
                typeof I.global.performance.now == 'function')),
            this.HAS_PERFORMANCE_NOW ? I.global.performance.now() : Date.now()
          )
        }),
        (p.NEXT_ANONYMOUS_ID = 1),
        (p.PERFORMANCE_NOW_PROBED = !1),
        (p.HAS_PERFORMANCE_NOW = !1),
        p
      )
    })()
    I.Utilities = t
  })(X || (X = {}))
  var X
  ;(function(I) {
    function t(E) {
      if (E instanceof Error) return E
      var u = new Error(E.message || String(E) || 'Unknown Error')
      return E.stack && (u.stack = E.stack), u
    }
    I.ensureError = t
    var p = (function() {
      function E() {}
      return (
        (E.validateConfigurationOptions = function(u) {
          function d(s) {
            if (s.phase === 'loading') {
              console.error('Loading "' + s.moduleId + '" failed'),
                console.error(s),
                console.error('Here are the modules that depend on it:'),
                console.error(s.neededBy)
              return
            }
            if (s.phase === 'factory') {
              console.error(
                'The factory method of "' +
                  s.moduleId +
                  '" has thrown an exception'
              ),
                console.error(s)
              return
            }
          }
          if (
            ((u = u || {}),
            typeof u.baseUrl != 'string' && (u.baseUrl = ''),
            typeof u.isBuild != 'boolean' && (u.isBuild = !1),
            typeof u.paths != 'object' && (u.paths = {}),
            typeof u.config != 'object' && (u.config = {}),
            typeof u.catchError == 'undefined' && (u.catchError = !1),
            typeof u.recordStats == 'undefined' && (u.recordStats = !1),
            typeof u.urlArgs != 'string' && (u.urlArgs = ''),
            typeof u.onError != 'function' && (u.onError = d),
            Array.isArray(u.ignoreDuplicateModules) ||
              (u.ignoreDuplicateModules = []),
            u.baseUrl.length > 0 &&
              (I.Utilities.endsWith(u.baseUrl, '/') || (u.baseUrl += '/')),
            typeof u.cspNonce != 'string' && (u.cspNonce = ''),
            typeof u.preferScriptTags == 'undefined' &&
              (u.preferScriptTags = !1),
            Array.isArray(u.nodeModules) || (u.nodeModules = []),
            u.nodeCachedData &&
              typeof u.nodeCachedData == 'object' &&
              (typeof u.nodeCachedData.seed != 'string' &&
                (u.nodeCachedData.seed = 'seed'),
              (typeof u.nodeCachedData.writeDelay != 'number' ||
                u.nodeCachedData.writeDelay < 0) &&
                (u.nodeCachedData.writeDelay = 1e3 * 7),
              !u.nodeCachedData.path ||
                typeof u.nodeCachedData.path != 'string'))
          ) {
            var l = t(
              new Error("INVALID cached data configuration, 'path' MUST be set")
            )
            ;(l.phase = 'configuration'),
              u.onError(l),
              (u.nodeCachedData = void 0)
          }
          return u
        }),
        (E.mergeConfigurationOptions = function(u, d) {
          u === void 0 && (u = null), d === void 0 && (d = null)
          var l = I.Utilities.recursiveClone(d || {})
          return (
            I.Utilities.forEachProperty(u, function(s, h) {
              s === 'ignoreDuplicateModules' &&
              typeof l.ignoreDuplicateModules != 'undefined'
                ? (l.ignoreDuplicateModules = l.ignoreDuplicateModules.concat(
                    h
                  ))
                : s === 'paths' && typeof l.paths != 'undefined'
                ? I.Utilities.forEachProperty(h, function(w, a) {
                    return (l.paths[w] = a)
                  })
                : s === 'config' && typeof l.config != 'undefined'
                ? I.Utilities.forEachProperty(h, function(w, a) {
                    return (l.config[w] = a)
                  })
                : (l[s] = I.Utilities.recursiveClone(h))
            }),
            E.validateConfigurationOptions(l)
          )
        }),
        E
      )
    })()
    I.ConfigurationOptionsUtil = p
    var P = (function() {
      function E(u, d) {
        if (
          ((this._env = u),
          (this.options = p.mergeConfigurationOptions(d)),
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
            var l = this.options.nodeRequire.main.filename,
              s = Math.max(l.lastIndexOf('/'), l.lastIndexOf('\\'))
            this.options.baseUrl = l.substring(0, s + 1)
          }
          if (this.options.nodeMain && this._env.isNode) {
            var l = this.options.nodeMain,
              s = Math.max(l.lastIndexOf('/'), l.lastIndexOf('\\'))
            this.options.baseUrl = l.substring(0, s + 1)
          }
        }
      }
      return (
        (E.prototype._createIgnoreDuplicateModulesMap = function() {
          this.ignoreDuplicateModulesMap = {}
          for (var u = 0; u < this.options.ignoreDuplicateModules.length; u++)
            this.ignoreDuplicateModulesMap[
              this.options.ignoreDuplicateModules[u]
            ] = !0
        }),
        (E.prototype._createNodeModulesMap = function() {
          this.nodeModulesMap = Object.create(null)
          for (var u = 0, d = this.options.nodeModules; u < d.length; u++) {
            var l = d[u]
            this.nodeModulesMap[l] = !0
          }
        }),
        (E.prototype._createSortedPathsRules = function() {
          var u = this
          ;(this.sortedPathsRules = []),
            I.Utilities.forEachProperty(this.options.paths, function(d, l) {
              Array.isArray(l)
                ? u.sortedPathsRules.push({ from: d, to: l })
                : u.sortedPathsRules.push({ from: d, to: [l] })
            }),
            this.sortedPathsRules.sort(function(d, l) {
              return l.from.length - d.from.length
            })
        }),
        (E.prototype.cloneAndMerge = function(u) {
          return new E(this._env, p.mergeConfigurationOptions(u, this.options))
        }),
        (E.prototype.getOptionsLiteral = function() {
          return this.options
        }),
        (E.prototype._applyPaths = function(u) {
          for (var d, l = 0, s = this.sortedPathsRules.length; l < s; l++)
            if (
              ((d = this.sortedPathsRules[l]),
              I.Utilities.startsWith(u, d.from))
            ) {
              for (var h = [], w = 0, a = d.to.length; w < a; w++)
                h.push(d.to[w] + u.substr(d.from.length))
              return h
            }
          return [u]
        }),
        (E.prototype._addUrlArgsToUrl = function(u) {
          return I.Utilities.containsQueryString(u)
            ? u + '&' + this.options.urlArgs
            : u + '?' + this.options.urlArgs
        }),
        (E.prototype._addUrlArgsIfNecessaryToUrl = function(u) {
          return this.options.urlArgs ? this._addUrlArgsToUrl(u) : u
        }),
        (E.prototype._addUrlArgsIfNecessaryToUrls = function(u) {
          if (this.options.urlArgs)
            for (var d = 0, l = u.length; d < l; d++)
              u[d] = this._addUrlArgsToUrl(u[d])
          return u
        }),
        (E.prototype.moduleIdToPaths = function(u) {
          var d =
            this.nodeModulesMap[u] === !0 ||
            (this.options.amdModulesPattern instanceof RegExp &&
              !this.options.amdModulesPattern.test(u))
          if (d) return this.isBuild() ? ['empty:'] : ['node|' + u]
          var l = u,
            s
          if (
            !I.Utilities.endsWith(l, '.js') &&
            !I.Utilities.isAbsolutePath(l)
          ) {
            s = this._applyPaths(l)
            for (var h = 0, w = s.length; h < w; h++)
              (this.isBuild() && s[h] === 'empty:') ||
                (I.Utilities.isAbsolutePath(s[h]) ||
                  (s[h] = this.options.baseUrl + s[h]),
                !I.Utilities.endsWith(s[h], '.js') &&
                  !I.Utilities.containsQueryString(s[h]) &&
                  (s[h] = s[h] + '.js'))
          } else
            !I.Utilities.endsWith(l, '.js') &&
              !I.Utilities.containsQueryString(l) &&
              (l = l + '.js'),
              (s = [l])
          return this._addUrlArgsIfNecessaryToUrls(s)
        }),
        (E.prototype.requireToUrl = function(u) {
          var d = u
          return (
            I.Utilities.isAbsolutePath(d) ||
              ((d = this._applyPaths(d)[0]),
              I.Utilities.isAbsolutePath(d) || (d = this.options.baseUrl + d)),
            this._addUrlArgsIfNecessaryToUrl(d)
          )
        }),
        (E.prototype.isBuild = function() {
          return this.options.isBuild
        }),
        (E.prototype.isDuplicateMessageIgnoredFor = function(u) {
          return this.ignoreDuplicateModulesMap.hasOwnProperty(u)
        }),
        (E.prototype.getConfigForModule = function(u) {
          if (this.options.config) return this.options.config[u]
        }),
        (E.prototype.shouldCatchError = function() {
          return this.options.catchError
        }),
        (E.prototype.shouldRecordStats = function() {
          return this.options.recordStats
        }),
        (E.prototype.onError = function(u) {
          this.options.onError(u)
        }),
        E
      )
    })()
    I.Configuration = P
  })(X || (X = {}))
  var X
  ;(function(I) {
    var t = (function() {
        function l(s) {
          ;(this._env = s),
            (this._scriptLoader = null),
            (this._callbackMap = {})
        }
        return (
          (l.prototype.load = function(s, h, w, a) {
            var S = this
            if (!this._scriptLoader)
              if (this._env.isWebWorker) this._scriptLoader = new P()
              else if (this._env.isElectronRenderer) {
                var v = s.getConfig().getOptionsLiteral().preferScriptTags
                v
                  ? (this._scriptLoader = new p())
                  : (this._scriptLoader = new E(this._env))
              } else
                this._env.isNode
                  ? (this._scriptLoader = new E(this._env))
                  : (this._scriptLoader = new p())
            var C = { callback: w, errorback: a }
            if (this._callbackMap.hasOwnProperty(h)) {
              this._callbackMap[h].push(C)
              return
            }
            ;(this._callbackMap[h] = [C]),
              this._scriptLoader.load(
                s,
                h,
                function() {
                  return S.triggerCallback(h)
                },
                function(n) {
                  return S.triggerErrorback(h, n)
                }
              )
          }),
          (l.prototype.triggerCallback = function(s) {
            var h = this._callbackMap[s]
            delete this._callbackMap[s]
            for (var w = 0; w < h.length; w++) h[w].callback()
          }),
          (l.prototype.triggerErrorback = function(s, h) {
            var w = this._callbackMap[s]
            delete this._callbackMap[s]
            for (var a = 0; a < w.length; a++) w[a].errorback(h)
          }),
          l
        )
      })(),
      p = (function() {
        function l() {}
        return (
          (l.prototype.attachListeners = function(s, h, w) {
            var a = function() {
                s.removeEventListener('load', S),
                  s.removeEventListener('error', v)
              },
              S = function(C) {
                a(), h()
              },
              v = function(C) {
                a(), w(C)
              }
            s.addEventListener('load', S), s.addEventListener('error', v)
          }),
          (l.prototype.load = function(s, h, w, a) {
            if (/^node\|/.test(h)) {
              var S = s.getConfig().getOptionsLiteral(),
                v = u(s.getRecorder(), S.nodeRequire || I.global.nodeRequire),
                C = h.split('|'),
                n = null
              try {
                n = v(C[1])
              } catch (o) {
                a(o)
                return
              }
              s.enqueueDefineAnonymousModule([], function() {
                return n
              }),
                w()
            } else {
              var r = document.createElement('script')
              r.setAttribute('async', 'async'),
                r.setAttribute('type', 'text/javascript'),
                this.attachListeners(r, w, a)
              var m = s.getConfig().getOptionsLiteral().trustedTypesPolicy
              m && (h = m.createScriptURL(h)), r.setAttribute('src', h)
              var _ = s.getConfig().getOptionsLiteral().cspNonce
              _ && r.setAttribute('nonce', _),
                document.getElementsByTagName('head')[0].appendChild(r)
            }
          }),
          l
        )
      })(),
      P = (function() {
        function l() {}
        return (
          (l.prototype.load = function(s, h, w, a) {
            var S = s.getConfig().getOptionsLiteral().trustedTypesPolicy
            S && (h = S.createScriptURL(h))
            try {
              importScripts(h), w()
            } catch (v) {
              a(v)
            }
          }),
          l
        )
      })(),
      E = (function() {
        function l(s) {
          ;(this._env = s),
            (this._didInitialize = !1),
            (this._didPatchNodeRequire = !1)
        }
        return (
          (l.prototype._init = function(s) {
            this._didInitialize ||
              ((this._didInitialize = !0),
              (this._fs = s('fs')),
              (this._vm = s('vm')),
              (this._path = s('path')),
              (this._crypto = s('crypto')))
          }),
          (l.prototype._initNodeRequire = function(s, h) {
            var w = h.getConfig().getOptionsLiteral().nodeCachedData
            if (!!w && !this._didPatchNodeRequire) {
              this._didPatchNodeRequire = !0
              var a = this,
                S = s('module')
              function v(C) {
                var n = C.constructor,
                  r = function(_) {
                    try {
                      return C.require(_)
                    } finally {
                    }
                  }
                return (
                  (r.resolve = function(_, o) {
                    return n._resolveFilename(_, C, !1, o)
                  }),
                  (r.main = process.mainModule),
                  (r.extensions = n._extensions),
                  (r.cache = n._cache),
                  r
                )
              }
              S.prototype._compile = function(C, n) {
                var r = S.wrap(C.replace(/^#!.*/, '')),
                  m = h.getRecorder(),
                  _ = a._getCachedDataPath(w, n),
                  o = { filename: n },
                  i
                try {
                  var f = a._fs.readFileSync(_)
                  ;(i = f.slice(0, 16)),
                    (o.cachedData = f.slice(16)),
                    m.record(60, _)
                } catch (M) {
                  m.record(61, _)
                }
                var b = new a._vm.Script(r, o),
                  N = b.runInThisContext(o),
                  c = a._path.dirname(n),
                  g = v(this),
                  L = [this.exports, g, this, n, c, process, fe, Buffer],
                  A = N.apply(this.exports, L)
                return (
                  a._handleCachedData(b, r, _, !o.cachedData, h),
                  a._verifyCachedData(b, r, _, i, h),
                  A
                )
              }
            }
          }),
          (l.prototype.load = function(s, h, w, a) {
            var S = this,
              v = s.getConfig().getOptionsLiteral(),
              C = u(s.getRecorder(), v.nodeRequire || I.global.nodeRequire),
              n =
                v.nodeInstrumenter ||
                function(N) {
                  return N
                }
            this._init(C), this._initNodeRequire(C, s)
            var r = s.getRecorder()
            if (/^node\|/.test(h)) {
              var m = h.split('|'),
                _ = null
              try {
                _ = C(m[1])
              } catch (N) {
                a(N)
                return
              }
              s.enqueueDefineAnonymousModule([], function() {
                return _
              }),
                w()
            } else {
              h = I.Utilities.fileUriToFilePath(this._env.isWindows, h)
              var o = this._path.normalize(h),
                i = this._getElectronRendererScriptPathOrUri(o),
                f = Boolean(v.nodeCachedData),
                b = f ? this._getCachedDataPath(v.nodeCachedData, h) : void 0
              this._readSourceAndCachedData(o, b, r, function(N, c, g, L) {
                if (N) {
                  a(N)
                  return
                }
                var A
                c.charCodeAt(0) === l._BOM
                  ? (A = l._PREFIX + c.substring(1) + l._SUFFIX)
                  : (A = l._PREFIX + c + l._SUFFIX),
                  (A = n(A, o))
                var M = { filename: i, cachedData: g },
                  R = S._createAndEvalScript(s, A, M, w, a)
                S._handleCachedData(R, A, b, f && !g, s),
                  S._verifyCachedData(R, A, b, L, s)
              })
            }
          }),
          (l.prototype._createAndEvalScript = function(s, h, w, a, S) {
            var v = s.getRecorder()
            v.record(31, w.filename)
            var C = new this._vm.Script(h, w),
              n = C.runInThisContext(w),
              r = s.getGlobalAMDDefineFunc(),
              m = !1,
              _ = function() {
                return (m = !0), r.apply(null, arguments)
              }
            return (
              (_.amd = r.amd),
              n.call(
                I.global,
                s.getGlobalAMDRequireFunc(),
                _,
                w.filename,
                this._path.dirname(w.filename)
              ),
              v.record(32, w.filename),
              m
                ? a()
                : S(
                    new Error(
                      "Didn't receive define call in " + w.filename + '!'
                    )
                  ),
              C
            )
          }),
          (l.prototype._getElectronRendererScriptPathOrUri = function(s) {
            if (!this._env.isElectronRenderer) return s
            var h = s.match(/^([a-z])\:(.*)/i)
            return h
              ? 'file:///' +
                  (h[1].toUpperCase() + ':' + h[2]).replace(/\\/g, '/')
              : 'file://' + s
          }),
          (l.prototype._getCachedDataPath = function(s, h) {
            var w = this._crypto
                .createHash('md5')
                .update(h, 'utf8')
                .update(s.seed, 'utf8')
                .update(process.arch, '')
                .digest('hex'),
              a = this._path.basename(h).replace(/\.js$/, '')
            return this._path.join(s.path, a + '-' + w + '.code')
          }),
          (l.prototype._handleCachedData = function(s, h, w, a, S) {
            var v = this
            s.cachedDataRejected
              ? this._fs.unlink(w, function(C) {
                  S.getRecorder().record(62, w),
                    v._createAndWriteCachedData(s, h, w, S),
                    C && S.getConfig().onError(C)
                })
              : a && this._createAndWriteCachedData(s, h, w, S)
          }),
          (l.prototype._createAndWriteCachedData = function(s, h, w, a) {
            var S = this,
              v = Math.ceil(
                a.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
                  (1 + Math.random())
              ),
              C = -1,
              n = 0,
              r = void 0,
              m = function() {
                setTimeout(function() {
                  r ||
                    (r = S._crypto
                      .createHash('md5')
                      .update(h, 'utf8')
                      .digest())
                  var _ = s.createCachedData()
                  if (!(_.length === 0 || _.length === C || n >= 5)) {
                    if (_.length < C) {
                      m()
                      return
                    }
                    ;(C = _.length),
                      S._fs.writeFile(w, Buffer.concat([r, _]), function(o) {
                        o && a.getConfig().onError(o),
                          a.getRecorder().record(63, w),
                          m()
                      })
                  }
                }, v * Math.pow(4, n++))
              }
            m()
          }),
          (l.prototype._readSourceAndCachedData = function(s, h, w, a) {
            if (!h) this._fs.readFile(s, { encoding: 'utf8' }, a)
            else {
              var S = void 0,
                v = void 0,
                C = void 0,
                n = 2,
                r = function(m) {
                  m ? a(m) : --n == 0 && a(void 0, S, v, C)
                }
              this._fs.readFile(s, { encoding: 'utf8' }, function(m, _) {
                ;(S = _), r(m)
              }),
                this._fs.readFile(h, function(m, _) {
                  !m && _ && _.length > 0
                    ? ((C = _.slice(0, 16)), (v = _.slice(16)), w.record(60, h))
                    : w.record(61, h),
                    r()
                })
            }
          }),
          (l.prototype._verifyCachedData = function(s, h, w, a, S) {
            var v = this
            !a ||
              s.cachedDataRejected ||
              setTimeout(function() {
                var C = v._crypto
                  .createHash('md5')
                  .update(h, 'utf8')
                  .digest()
                a.equals(C) ||
                  (S.getConfig().onError(
                    new Error(
                      "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                        w +
                        "' now, but a RESTART IS REQUIRED"
                    )
                  ),
                  v._fs.unlink(w, function(n) {
                    n && S.getConfig().onError(n)
                  }))
              }, Math.ceil(5e3 * (1 + Math.random())))
          }),
          (l._BOM = 65279),
          (l._PREFIX = '(function (require, define, __filename, __dirname) { '),
          (l._SUFFIX = `
});`),
          l
        )
      })()
    function u(l, s) {
      if (s.__$__isRecorded) return s
      var h = function(a) {
        l.record(33, a)
        try {
          return s(a)
        } finally {
          l.record(34, a)
        }
      }
      return (h.__$__isRecorded = !0), h
    }
    I.ensureRecordedNodeRequire = u
    function d(l) {
      return new t(l)
    }
    I.createScriptLoader = d
  })(X || (X = {}))
  var X
  ;(function(I) {
    var t = (function() {
      function l(s) {
        var h = s.lastIndexOf('/')
        h !== -1
          ? (this.fromModulePath = s.substr(0, h + 1))
          : (this.fromModulePath = '')
      }
      return (
        (l._normalizeModuleId = function(s) {
          var h = s,
            w
          for (w = /\/\.\//; w.test(h); ) h = h.replace(w, '/')
          for (
            h = h.replace(/^\.\//g, ''),
              w = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
            w.test(h);

          )
            h = h.replace(w, '/')
          return (
            (h = h.replace(
              /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
              ''
            )),
            h
          )
        }),
        (l.prototype.resolveModule = function(s) {
          var h = s
          return (
            I.Utilities.isAbsolutePath(h) ||
              ((I.Utilities.startsWith(h, './') ||
                I.Utilities.startsWith(h, '../')) &&
                (h = l._normalizeModuleId(this.fromModulePath + h))),
            h
          )
        }),
        (l.ROOT = new l('')),
        l
      )
    })()
    I.ModuleIdResolver = t
    var p = (function() {
      function l(s, h, w, a, S, v) {
        ;(this.id = s),
          (this.strId = h),
          (this.dependencies = w),
          (this._callback = a),
          (this._errorback = S),
          (this.moduleIdResolver = v),
          (this.exports = {}),
          (this.error = null),
          (this.exportsPassedIn = !1),
          (this.unresolvedDependenciesCount = this.dependencies.length),
          (this._isComplete = !1)
      }
      return (
        (l._safeInvokeFunction = function(s, h) {
          try {
            return { returnedValue: s.apply(I.global, h), producedError: null }
          } catch (w) {
            return { returnedValue: null, producedError: w }
          }
        }),
        (l._invokeFactory = function(s, h, w, a) {
          return s.isBuild() && !I.Utilities.isAnonymousModule(h)
            ? { returnedValue: null, producedError: null }
            : s.shouldCatchError()
            ? this._safeInvokeFunction(w, a)
            : { returnedValue: w.apply(I.global, a), producedError: null }
        }),
        (l.prototype.complete = function(s, h, w) {
          this._isComplete = !0
          var a = null
          if (this._callback)
            if (typeof this._callback == 'function') {
              s.record(21, this.strId)
              var S = l._invokeFactory(h, this.strId, this._callback, w)
              ;(a = S.producedError),
                s.record(22, this.strId),
                !a &&
                  typeof S.returnedValue != 'undefined' &&
                  (!this.exportsPassedIn ||
                    I.Utilities.isEmpty(this.exports)) &&
                  (this.exports = S.returnedValue)
            } else this.exports = this._callback
          if (a) {
            var v = I.ensureError(a)
            ;(v.phase = 'factory'),
              (v.moduleId = this.strId),
              (this.error = v),
              h.onError(v)
          }
          ;(this.dependencies = null),
            (this._callback = null),
            (this._errorback = null),
            (this.moduleIdResolver = null)
        }),
        (l.prototype.onDependencyError = function(s) {
          return (
            (this._isComplete = !0),
            (this.error = s),
            this._errorback ? (this._errorback(s), !0) : !1
          )
        }),
        (l.prototype.isComplete = function() {
          return this._isComplete
        }),
        l
      )
    })()
    I.Module = p
    var P = (function() {
        function l() {
          ;(this._nextId = 0),
            (this._strModuleIdToIntModuleId = new Map()),
            (this._intModuleIdToStrModuleId = []),
            this.getModuleId('exports'),
            this.getModuleId('module'),
            this.getModuleId('require')
        }
        return (
          (l.prototype.getMaxModuleId = function() {
            return this._nextId
          }),
          (l.prototype.getModuleId = function(s) {
            var h = this._strModuleIdToIntModuleId.get(s)
            return (
              typeof h == 'undefined' &&
                ((h = this._nextId++),
                this._strModuleIdToIntModuleId.set(s, h),
                (this._intModuleIdToStrModuleId[h] = s)),
              h
            )
          }),
          (l.prototype.getStrModuleId = function(s) {
            return this._intModuleIdToStrModuleId[s]
          }),
          l
        )
      })(),
      E = (function() {
        function l(s) {
          this.id = s
        }
        return (
          (l.EXPORTS = new l(0)),
          (l.MODULE = new l(1)),
          (l.REQUIRE = new l(2)),
          l
        )
      })()
    I.RegularDependency = E
    var u = (function() {
      function l(s, h, w) {
        ;(this.id = s), (this.pluginId = h), (this.pluginParam = w)
      }
      return l
    })()
    I.PluginDependency = u
    var d = (function() {
      function l(s, h, w, a, S) {
        S === void 0 && (S = 0),
          (this._env = s),
          (this._scriptLoader = h),
          (this._loaderAvailableTimestamp = S),
          (this._defineFunc = w),
          (this._requireFunc = a),
          (this._moduleIdProvider = new P()),
          (this._config = new I.Configuration(this._env)),
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
        (l.prototype.reset = function() {
          return new l(
            this._env,
            this._scriptLoader,
            this._defineFunc,
            this._requireFunc,
            this._loaderAvailableTimestamp
          )
        }),
        (l.prototype.getGlobalAMDDefineFunc = function() {
          return this._defineFunc
        }),
        (l.prototype.getGlobalAMDRequireFunc = function() {
          return this._requireFunc
        }),
        (l._findRelevantLocationInStack = function(s, h) {
          for (
            var w = function(i) {
                return i.replace(/\\/g, '/')
              },
              a = w(s),
              S = h.split(/\n/),
              v = 0;
            v < S.length;
            v++
          ) {
            var C = S[v].match(/(.*):(\d+):(\d+)\)?$/)
            if (C) {
              var n = C[1],
                r = C[2],
                m = C[3],
                _ = Math.max(n.lastIndexOf(' ') + 1, n.lastIndexOf('(') + 1)
              if (((n = n.substr(_)), (n = w(n)), n === a)) {
                var o = { line: parseInt(r, 10), col: parseInt(m, 10) }
                return (
                  o.line === 1 &&
                    (o.col -= '(function (require, define, __filename, __dirname) { '.length),
                  o
                )
              }
            }
          }
          throw new Error(
            'Could not correlate define call site for needle ' + s
          )
        }),
        (l.prototype.getBuildInfo = function() {
          if (!this._config.isBuild()) return null
          for (
            var s = [], h = 0, w = 0, a = this._modules2.length;
            w < a;
            w++
          ) {
            var S = this._modules2[w]
            if (!!S) {
              var v = this._buildInfoPath[S.id] || null,
                C = this._buildInfoDefineStack[S.id] || null,
                n = this._buildInfoDependencies[S.id]
              s[h++] = {
                id: S.strId,
                path: v,
                defineLocation:
                  v && C ? l._findRelevantLocationInStack(v, C) : null,
                dependencies: n,
                shim: null,
                exports: S.exports
              }
            }
          }
          return s
        }),
        (l.prototype.getRecorder = function() {
          return (
            this._recorder ||
              (this._config.shouldRecordStats()
                ? (this._recorder = new I.LoaderEventRecorder(
                    this._loaderAvailableTimestamp
                  ))
                : (this._recorder = I.NullLoaderEventRecorder.INSTANCE)),
            this._recorder
          )
        }),
        (l.prototype.getLoaderEvents = function() {
          return this.getRecorder().getEvents()
        }),
        (l.prototype.enqueueDefineAnonymousModule = function(s, h) {
          if (this._currentAnnonymousDefineCall !== null)
            throw new Error(
              'Can only have one anonymous define call per script file'
            )
          var w = null
          this._config.isBuild() &&
            (w = new Error('StackLocation').stack || null),
            (this._currentAnnonymousDefineCall = {
              stack: w,
              dependencies: s,
              callback: h
            })
        }),
        (l.prototype.defineModule = function(s, h, w, a, S, v) {
          var C = this
          v === void 0 && (v = new t(s))
          var n = this._moduleIdProvider.getModuleId(s)
          if (this._modules2[n]) {
            this._config.isDuplicateMessageIgnoredFor(s) ||
              console.warn("Duplicate definition of module '" + s + "'")
            return
          }
          var r = new p(n, s, this._normalizeDependencies(h, v), w, a, v)
          ;(this._modules2[n] = r),
            this._config.isBuild() &&
              ((this._buildInfoDefineStack[n] = S),
              (this._buildInfoDependencies[n] = (r.dependencies || []).map(
                function(m) {
                  return C._moduleIdProvider.getStrModuleId(m.id)
                }
              ))),
            this._resolve(r)
        }),
        (l.prototype._normalizeDependency = function(s, h) {
          if (s === 'exports') return E.EXPORTS
          if (s === 'module') return E.MODULE
          if (s === 'require') return E.REQUIRE
          var w = s.indexOf('!')
          if (w >= 0) {
            var a = h.resolveModule(s.substr(0, w)),
              S = h.resolveModule(s.substr(w + 1)),
              v = this._moduleIdProvider.getModuleId(a + '!' + S),
              C = this._moduleIdProvider.getModuleId(a)
            return new u(v, C, S)
          }
          return new E(this._moduleIdProvider.getModuleId(h.resolveModule(s)))
        }),
        (l.prototype._normalizeDependencies = function(s, h) {
          for (var w = [], a = 0, S = 0, v = s.length; S < v; S++)
            w[a++] = this._normalizeDependency(s[S], h)
          return w
        }),
        (l.prototype._relativeRequire = function(s, h, w, a) {
          if (typeof h == 'string') return this.synchronousRequire(h, s)
          this.defineModule(
            I.Utilities.generateAnonymousModule(),
            h,
            w,
            a,
            null,
            s
          )
        }),
        (l.prototype.synchronousRequire = function(s, h) {
          h === void 0 && (h = new t(s))
          var w = this._normalizeDependency(s, h),
            a = this._modules2[w.id]
          if (!a)
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                s +
                "'. This is the first mention of this module!"
            )
          if (!a.isComplete())
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                s +
                "'. This module has not been resolved completely yet."
            )
          if (a.error) throw a.error
          return a.exports
        }),
        (l.prototype.configure = function(s, h) {
          var w = this._config.shouldRecordStats()
          h
            ? (this._config = new I.Configuration(this._env, s))
            : (this._config = this._config.cloneAndMerge(s)),
            this._config.shouldRecordStats() && !w && (this._recorder = null)
        }),
        (l.prototype.getConfig = function() {
          return this._config
        }),
        (l.prototype._onLoad = function(s) {
          if (this._currentAnnonymousDefineCall !== null) {
            var h = this._currentAnnonymousDefineCall
            ;(this._currentAnnonymousDefineCall = null),
              this.defineModule(
                this._moduleIdProvider.getStrModuleId(s),
                h.dependencies,
                h.callback,
                null,
                h.stack
              )
          }
        }),
        (l.prototype._createLoadError = function(s, h) {
          var w = this,
            a = this._moduleIdProvider.getStrModuleId(s),
            S = (this._inverseDependencies2[s] || []).map(function(C) {
              return w._moduleIdProvider.getStrModuleId(C)
            }),
            v = I.ensureError(h)
          return (v.phase = 'loading'), (v.moduleId = a), (v.neededBy = S), v
        }),
        (l.prototype._onLoadError = function(s, h) {
          var w = this._createLoadError(s, h)
          this._modules2[s] ||
            (this._modules2[s] = new p(
              s,
              this._moduleIdProvider.getStrModuleId(s),
              [],
              function() {},
              function() {},
              null
            ))
          for (
            var a = [], S = 0, v = this._moduleIdProvider.getMaxModuleId();
            S < v;
            S++
          )
            a[S] = !1
          var C = !1,
            n = []
          for (n.push(s), a[s] = !0; n.length > 0; ) {
            var r = n.shift(),
              m = this._modules2[r]
            m && (C = m.onDependencyError(w) || C)
            var _ = this._inverseDependencies2[r]
            if (_)
              for (var S = 0, v = _.length; S < v; S++) {
                var o = _[S]
                a[o] || (n.push(o), (a[o] = !0))
              }
          }
          C || this._config.onError(w)
        }),
        (l.prototype._hasDependencyPath = function(s, h) {
          var w = this._modules2[s]
          if (!w) return !1
          for (
            var a = [], S = 0, v = this._moduleIdProvider.getMaxModuleId();
            S < v;
            S++
          )
            a[S] = !1
          var C = []
          for (C.push(w), a[s] = !0; C.length > 0; ) {
            var n = C.shift(),
              r = n.dependencies
            if (r)
              for (var S = 0, v = r.length; S < v; S++) {
                var m = r[S]
                if (m.id === h) return !0
                var _ = this._modules2[m.id]
                _ && !a[m.id] && ((a[m.id] = !0), C.push(_))
              }
          }
          return !1
        }),
        (l.prototype._findCyclePath = function(s, h, w) {
          if (s === h || w === 50) return [s]
          var a = this._modules2[s]
          if (!a) return null
          var S = a.dependencies
          if (S)
            for (var v = 0, C = S.length; v < C; v++) {
              var n = this._findCyclePath(S[v].id, h, w + 1)
              if (n !== null) return n.push(s), n
            }
          return null
        }),
        (l.prototype._createRequire = function(s) {
          var h = this,
            w = function(a, S, v) {
              return h._relativeRequire(s, a, S, v)
            }
          return (
            (w.toUrl = function(a) {
              return h._config.requireToUrl(s.resolveModule(a))
            }),
            (w.getStats = function() {
              return h.getLoaderEvents()
            }),
            (w.hasDependencyCycle = function() {
              return h._hasDependencyCycle
            }),
            (w.config = function(a, S) {
              S === void 0 && (S = !1), h.configure(a, S)
            }),
            (w.__$__nodeRequire = I.global.nodeRequire),
            w
          )
        }),
        (l.prototype._loadModule = function(s) {
          var h = this
          if (!(this._modules2[s] || this._knownModules2[s])) {
            this._knownModules2[s] = !0
            var w = this._moduleIdProvider.getStrModuleId(s),
              a = this._config.moduleIdToPaths(w),
              S = /^@[^\/]+\/[^\/]+$/
            this._env.isNode &&
              (w.indexOf('/') === -1 || S.test(w)) &&
              a.push('node|' + w)
            var v = -1,
              C = function(n) {
                if ((v++, v >= a.length)) h._onLoadError(s, n)
                else {
                  var r = a[v],
                    m = h.getRecorder()
                  if (h._config.isBuild() && r === 'empty:') {
                    ;(h._buildInfoPath[s] = r),
                      h.defineModule(
                        h._moduleIdProvider.getStrModuleId(s),
                        [],
                        null,
                        null,
                        null
                      ),
                      h._onLoad(s)
                    return
                  }
                  m.record(10, r),
                    h._scriptLoader.load(
                      h,
                      r,
                      function() {
                        h._config.isBuild() && (h._buildInfoPath[s] = r),
                          m.record(11, r),
                          h._onLoad(s)
                      },
                      function(_) {
                        m.record(12, r), C(_)
                      }
                    )
                }
              }
            C(null)
          }
        }),
        (l.prototype._loadPluginDependency = function(s, h) {
          var w = this
          if (!(this._modules2[h.id] || this._knownModules2[h.id])) {
            this._knownModules2[h.id] = !0
            var a = function(S) {
              w.defineModule(
                w._moduleIdProvider.getStrModuleId(h.id),
                [],
                S,
                null,
                null
              )
            }
            ;(a.error = function(S) {
              w._config.onError(w._createLoadError(h.id, S))
            }),
              s.load(
                h.pluginParam,
                this._createRequire(t.ROOT),
                a,
                this._config.getOptionsLiteral()
              )
          }
        }),
        (l.prototype._resolve = function(s) {
          var h = this,
            w = s.dependencies
          if (w)
            for (var a = 0, S = w.length; a < S; a++) {
              var v = w[a]
              if (v === E.EXPORTS) {
                ;(s.exportsPassedIn = !0), s.unresolvedDependenciesCount--
                continue
              }
              if (v === E.MODULE) {
                s.unresolvedDependenciesCount--
                continue
              }
              if (v === E.REQUIRE) {
                s.unresolvedDependenciesCount--
                continue
              }
              var C = this._modules2[v.id]
              if (C && C.isComplete()) {
                if (C.error) {
                  s.onDependencyError(C.error)
                  return
                }
                s.unresolvedDependenciesCount--
                continue
              }
              if (this._hasDependencyPath(v.id, s.id)) {
                ;(this._hasDependencyCycle = !0),
                  console.warn(
                    "There is a dependency cycle between '" +
                      this._moduleIdProvider.getStrModuleId(v.id) +
                      "' and '" +
                      this._moduleIdProvider.getStrModuleId(s.id) +
                      "'. The cyclic path follows:"
                  )
                var n = this._findCyclePath(v.id, s.id, 0) || []
                n.reverse(),
                  n.push(v.id),
                  console.warn(
                    n.map(function(_) {
                      return h._moduleIdProvider.getStrModuleId(_)
                    }).join(` => 
`)
                  ),
                  s.unresolvedDependenciesCount--
                continue
              }
              if (
                ((this._inverseDependencies2[v.id] =
                  this._inverseDependencies2[v.id] || []),
                this._inverseDependencies2[v.id].push(s.id),
                v instanceof u)
              ) {
                var r = this._modules2[v.pluginId]
                if (r && r.isComplete()) {
                  this._loadPluginDependency(r.exports, v)
                  continue
                }
                var m = this._inversePluginDependencies2.get(v.pluginId)
                m ||
                  ((m = []),
                  this._inversePluginDependencies2.set(v.pluginId, m)),
                  m.push(v),
                  this._loadModule(v.pluginId)
                continue
              }
              this._loadModule(v.id)
            }
          s.unresolvedDependenciesCount === 0 && this._onModuleComplete(s)
        }),
        (l.prototype._onModuleComplete = function(s) {
          var h = this,
            w = this.getRecorder()
          if (!s.isComplete()) {
            var a = s.dependencies,
              S = []
            if (a)
              for (var v = 0, C = a.length; v < C; v++) {
                var n = a[v]
                if (n === E.EXPORTS) {
                  S[v] = s.exports
                  continue
                }
                if (n === E.MODULE) {
                  S[v] = {
                    id: s.strId,
                    config: function() {
                      return h._config.getConfigForModule(s.strId)
                    }
                  }
                  continue
                }
                if (n === E.REQUIRE) {
                  S[v] = this._createRequire(s.moduleIdResolver)
                  continue
                }
                var r = this._modules2[n.id]
                if (r) {
                  S[v] = r.exports
                  continue
                }
                S[v] = null
              }
            s.complete(w, this._config, S)
            var m = this._inverseDependencies2[s.id]
            if (((this._inverseDependencies2[s.id] = null), m))
              for (var v = 0, C = m.length; v < C; v++) {
                var _ = m[v],
                  o = this._modules2[_]
                o.unresolvedDependenciesCount--,
                  o.unresolvedDependenciesCount === 0 &&
                    this._onModuleComplete(o)
              }
            var i = this._inversePluginDependencies2.get(s.id)
            if (i) {
              this._inversePluginDependencies2.delete(s.id)
              for (var v = 0, C = i.length; v < C; v++)
                this._loadPluginDependency(s.exports, i[v])
            }
          }
        }),
        l
      )
    })()
    I.ModuleManager = d
  })(X || (X = {}))
  var V, X
  ;(function(I) {
    var t = new I.Environment(),
      p = null,
      P = function(l, s, h) {
        typeof l != 'string' && ((h = s), (s = l), (l = null)),
          (typeof s != 'object' || !Array.isArray(s)) && ((h = s), (s = null)),
          s || (s = ['require', 'exports', 'module']),
          l
            ? p.defineModule(l, s, h, null, null)
            : p.enqueueDefineAnonymousModule(s, h)
      }
    P.amd = { jQuery: !0 }
    var E = function(l, s) {
        s === void 0 && (s = !1), p.configure(l, s)
      },
      u = function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
            E(arguments[0])
            return
          }
          if (typeof arguments[0] == 'string')
            return p.synchronousRequire(arguments[0])
        }
        if (
          (arguments.length === 2 || arguments.length === 3) &&
          Array.isArray(arguments[0])
        ) {
          p.defineModule(
            I.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null
          )
          return
        }
        throw new Error('Unrecognized require call')
      }
    ;(u.config = E),
      (u.getConfig = function() {
        return p.getConfig().getOptionsLiteral()
      }),
      (u.reset = function() {
        p = p.reset()
      }),
      (u.getBuildInfo = function() {
        return p.getBuildInfo()
      }),
      (u.getStats = function() {
        return p.getLoaderEvents()
      }),
      (u.define = function() {
        return P.apply(null, arguments)
      })
    function d() {
      if (
        typeof I.global.require != 'undefined' ||
        typeof require != 'undefined'
      ) {
        var l = I.global.require || require
        if (typeof l == 'function' && typeof l.resolve == 'function') {
          var s = I.ensureRecordedNodeRequire(p.getRecorder(), l)
          ;(I.global.nodeRequire = s),
            (u.nodeRequire = s),
            (u.__$__nodeRequire = s)
        }
      }
      t.isNode && !t.isElectronRenderer
        ? ((module.exports = u), (require = u))
        : (t.isElectronRenderer || (I.global.define = P),
          (I.global.require = u))
    }
    ;(I.init = d),
      (typeof I.global.define != 'function' || !I.global.define.amd) &&
        ((p = new I.ModuleManager(
          t,
          I.createScriptLoader(t),
          P,
          u,
          I.Utilities.getHighPerformanceTimestamp()
        )),
        typeof I.global.require != 'undefined' &&
          typeof I.global.require != 'function' &&
          u.config(I.global.require),
        (V = function() {
          return P.apply(null, arguments)
        }),
        (V.amd = P.amd),
        typeof doNotInitLoader == 'undefined' && d())
  })(X || (X = {})),
    V(z[14], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.asArray = t.pushToEnd = t.pushToStart = t.arrayInsert = t.range = t.flatten = t.firstOrDefault = t.distinctES6 = t.distinct = t.isNonEmptyArray = t.isFalsyOrEmpty = t.coalesce = t.groupBy = t.mergeSort = t.quickSelect = t.findFirstInSorted = t.binarySearch = t.equals = t.tail2 = t.tail = void 0)
      function p(c, g = 0) {
        return c[c.length - (1 + g)]
      }
      t.tail = p
      function P(c) {
        if (c.length === 0) throw new Error('Invalid tail call')
        return [c.slice(0, c.length - 1), c[c.length - 1]]
      }
      t.tail2 = P
      function E(c, g, L = (A, M) => A === M) {
        if (c === g) return !0
        if (!c || !g || c.length !== g.length) return !1
        for (let A = 0, M = c.length; A < M; A++) if (!L(c[A], g[A])) return !1
        return !0
      }
      t.equals = E
      function u(c, g, L) {
        let A = 0,
          M = c.length - 1
        for (; A <= M; ) {
          const R = ((A + M) / 2) | 0,
            D = L(c[R], g)
          if (D < 0) A = R + 1
          else if (D > 0) M = R - 1
          else return R
        }
        return -(A + 1)
      }
      t.binarySearch = u
      function d(c, g) {
        let L = 0,
          A = c.length
        if (A === 0) return 0
        for (; L < A; ) {
          const M = Math.floor((L + A) / 2)
          g(c[M]) ? (A = M) : (L = M + 1)
        }
        return L
      }
      t.findFirstInSorted = d
      function l(c, g, L) {
        if (((c = c | 0), c >= g.length)) throw new TypeError('invalid index')
        let A = g[Math.floor(g.length * Math.random())],
          M = [],
          R = [],
          D = []
        for (let T of g) {
          const $ = L(T, A)
          $ < 0 ? M.push(T) : $ > 0 ? R.push(T) : D.push(T)
        }
        return c < M.length
          ? l(c, M, L)
          : c < M.length + D.length
          ? D[0]
          : l(c - (M.length + D.length), R, L)
      }
      t.quickSelect = l
      function s(c, g) {
        return w(c, g, 0, c.length - 1, []), c
      }
      t.mergeSort = s
      function h(c, g, L, A, M, R) {
        let D = L,
          T = A + 1
        for (let $ = L; $ <= M; $++) R[$] = c[$]
        for (let $ = L; $ <= M; $++)
          D > A
            ? (c[$] = R[T++])
            : T > M
            ? (c[$] = R[D++])
            : g(R[T], R[D]) < 0
            ? (c[$] = R[T++])
            : (c[$] = R[D++])
      }
      function w(c, g, L, A, M) {
        if (!(A <= L)) {
          const R = (L + (A - L) / 2) | 0
          w(c, g, L, R, M),
            w(c, g, R + 1, A, M),
            !(g(c[R], c[R + 1]) <= 0) && h(c, g, L, R, A, M)
        }
      }
      function a(c, g) {
        const L = []
        let A
        for (const M of s(c.slice(0), g))
          !A || g(A[0], M) !== 0 ? ((A = [M]), L.push(A)) : A.push(M)
        return L
      }
      t.groupBy = a
      function S(c) {
        return c.filter(g => !!g)
      }
      t.coalesce = S
      function v(c) {
        return !Array.isArray(c) || c.length === 0
      }
      t.isFalsyOrEmpty = v
      function C(c) {
        return Array.isArray(c) && c.length > 0
      }
      t.isNonEmptyArray = C
      function n(c, g) {
        if (!g) return c.filter((A, M) => c.indexOf(A) === M)
        const L = Object.create(null)
        return c.filter(A => {
          const M = g(A)
          return L[M] ? !1 : ((L[M] = !0), !0)
        })
      }
      t.distinct = n
      function r(c) {
        const g = new Set()
        return c.filter(L => (g.has(L) ? !1 : (g.add(L), !0)))
      }
      t.distinctES6 = r
      function m(c, g) {
        return c.length > 0 ? c[0] : g
      }
      t.firstOrDefault = m
      function _(c) {
        return [].concat(...c)
      }
      t.flatten = _
      function o(c, g) {
        let L = typeof g == 'number' ? c : 0
        typeof g == 'number' ? (L = c) : ((L = 0), (g = c))
        const A = []
        if (L <= g) for (let M = L; M < g; M++) A.push(M)
        else for (let M = L; M > g; M--) A.push(M)
        return A
      }
      t.range = o
      function i(c, g, L) {
        const A = c.slice(0, g),
          M = c.slice(g)
        return A.concat(L, M)
      }
      t.arrayInsert = i
      function f(c, g) {
        const L = c.indexOf(g)
        L > -1 && (c.splice(L, 1), c.unshift(g))
      }
      t.pushToStart = f
      function b(c, g) {
        const L = c.indexOf(g)
        L > -1 && (c.splice(L, 1), c.push(g))
      }
      t.pushToEnd = b
      function N(c) {
        return Array.isArray(c) ? c : [c]
      }
      t.asArray = N
    }),
    V(z[15], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DiffChange = void 0)
      class p {
        constructor(E, u, d, l) {
          ;(this.originalStart = E),
            (this.originalLength = u),
            (this.modifiedStart = d),
            (this.modifiedLength = l)
        }
        getOriginalEnd() {
          return this.originalStart + this.originalLength
        }
        getModifiedEnd() {
          return this.modifiedStart + this.modifiedLength
        }
      }
      t.DiffChange = p
    }),
    V(z[4], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.illegalState = t.illegalArgument = t.canceled = t.isPromiseCanceledError = t.transformErrorForSerialization = t.onUnexpectedExternalError = t.onUnexpectedError = t.errorHandler = t.ErrorHandler = void 0)
      class p {
        constructor() {
          ;(this.listeners = []),
            (this.unexpectedErrorHandler = function(S) {
              setTimeout(() => {
                throw S.stack
                  ? new Error(
                      S.message +
                        `

` +
                        S.stack
                    )
                  : S
              }, 0)
            })
        }
        emit(S) {
          this.listeners.forEach(v => {
            v(S)
          })
        }
        onUnexpectedError(S) {
          this.unexpectedErrorHandler(S), this.emit(S)
        }
        onUnexpectedExternalError(S) {
          this.unexpectedErrorHandler(S)
        }
      }
      ;(t.ErrorHandler = p), (t.errorHandler = new p())
      function P(a) {
        l(a) || t.errorHandler.onUnexpectedError(a)
      }
      t.onUnexpectedError = P
      function E(a) {
        l(a) || t.errorHandler.onUnexpectedExternalError(a)
      }
      t.onUnexpectedExternalError = E
      function u(a) {
        if (a instanceof Error) {
          let { name: S, message: v } = a
          const C = a.stacktrace || a.stack
          return { $isError: !0, name: S, message: v, stack: C }
        }
        return a
      }
      t.transformErrorForSerialization = u
      const d = 'Canceled'
      function l(a) {
        return a instanceof Error && a.name === d && a.message === d
      }
      t.isPromiseCanceledError = l
      function s() {
        const a = new Error(d)
        return (a.name = a.message), a
      }
      t.canceled = s
      function h(a) {
        return a
          ? new Error(`Illegal argument: ${a}`)
          : new Error('Illegal argument')
      }
      t.illegalArgument = h
      function w(a) {
        return a ? new Error(`Illegal state: ${a}`) : new Error('Illegal state')
      }
      t.illegalState = w
    }),
    V(z[16], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Iterable = void 0)
      var p
      ;(function(P) {
        function E(f) {
          return (
            f && typeof f == 'object' && typeof f[Symbol.iterator] == 'function'
          )
        }
        P.is = E
        const u = Object.freeze([])
        function d() {
          return u
        }
        P.empty = d
        function* l(f) {
          yield f
        }
        P.single = l
        function s(f) {
          return f || u
        }
        P.from = s
        function h(f) {
          return !f || f[Symbol.iterator]().next().done === !0
        }
        P.isEmpty = h
        function w(f) {
          return f[Symbol.iterator]().next().value
        }
        P.first = w
        function a(f, b) {
          for (const N of f) if (b(N)) return !0
          return !1
        }
        P.some = a
        function S(f, b) {
          for (const N of f) if (b(N)) return N
        }
        P.find = S
        function* v(f, b) {
          for (const N of f) b(N) && (yield N)
        }
        P.filter = v
        function* C(f, b) {
          for (const N of f) yield b(N)
        }
        P.map = C
        function* n(...f) {
          for (const b of f) for (const N of b) yield N
        }
        P.concat = n
        function* r(f) {
          for (const b of f) for (const N of b) yield N
        }
        P.concatNested = r
        function m(f, b, N) {
          let c = N
          for (const g of f) c = b(c, g)
          return c
        }
        P.reduce = m
        function* _(f, b, N = f.length) {
          for (
            b < 0 && (b += f.length),
              N < 0 ? (N += f.length) : N > f.length && (N = f.length);
            b < N;
            b++
          )
            yield f[b]
        }
        P.slice = _
        function o(f, b = Number.POSITIVE_INFINITY) {
          const N = []
          if (b === 0) return [N, f]
          const c = f[Symbol.iterator]()
          for (let g = 0; g < b; g++) {
            const L = c.next()
            if (L.done) return [N, P.empty()]
            N.push(L.value)
          }
          return [
            N,
            {
              [Symbol.iterator]() {
                return c
              }
            }
          ]
        }
        P.consume = o
        function i(f, b, N = (c, g) => c === g) {
          const c = f[Symbol.iterator](),
            g = b[Symbol.iterator]()
          for (;;) {
            const L = c.next(),
              A = g.next()
            if (L.done !== A.done) return !1
            if (L.done) return !0
            if (!N(L.value, A.value)) return !1
          }
        }
        P.equals = i
      })((p = t.Iterable || (t.Iterable = {})))
    }),
    V(z[17], G([0, 1, 4]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ResolvedKeybinding = t.ResolvedKeybindingPart = t.ChordKeybinding = t.SimpleKeybinding = t.createSimpleKeybinding = t.createKeybinding = t.KeyChord = t.KeyCodeUtils = void 0)
      class P {
        constructor() {
          ;(this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null))
        }
        define(r, m) {
          ;(this._keyCodeToStr[r] = m),
            (this._strToKeyCode[m.toLowerCase()] = r)
        }
        keyCodeToStr(r) {
          return this._keyCodeToStr[r]
        }
        strToKeyCode(r) {
          return this._strToKeyCode[r.toLowerCase()] || 0
        }
      }
      const E = new P(),
        u = new P(),
        d = new P()
      ;(function() {
        function n(r, m, _ = m, o = _) {
          E.define(r, m), u.define(r, _), d.define(r, o)
        }
        n(0, 'unknown'),
          n(1, 'Backspace'),
          n(2, 'Tab'),
          n(3, 'Enter'),
          n(4, 'Shift'),
          n(5, 'Ctrl'),
          n(6, 'Alt'),
          n(7, 'PauseBreak'),
          n(8, 'CapsLock'),
          n(9, 'Escape'),
          n(10, 'Space'),
          n(11, 'PageUp'),
          n(12, 'PageDown'),
          n(13, 'End'),
          n(14, 'Home'),
          n(15, 'LeftArrow', 'Left'),
          n(16, 'UpArrow', 'Up'),
          n(17, 'RightArrow', 'Right'),
          n(18, 'DownArrow', 'Down'),
          n(19, 'Insert'),
          n(20, 'Delete'),
          n(21, '0'),
          n(22, '1'),
          n(23, '2'),
          n(24, '3'),
          n(25, '4'),
          n(26, '5'),
          n(27, '6'),
          n(28, '7'),
          n(29, '8'),
          n(30, '9'),
          n(31, 'A'),
          n(32, 'B'),
          n(33, 'C'),
          n(34, 'D'),
          n(35, 'E'),
          n(36, 'F'),
          n(37, 'G'),
          n(38, 'H'),
          n(39, 'I'),
          n(40, 'J'),
          n(41, 'K'),
          n(42, 'L'),
          n(43, 'M'),
          n(44, 'N'),
          n(45, 'O'),
          n(46, 'P'),
          n(47, 'Q'),
          n(48, 'R'),
          n(49, 'S'),
          n(50, 'T'),
          n(51, 'U'),
          n(52, 'V'),
          n(53, 'W'),
          n(54, 'X'),
          n(55, 'Y'),
          n(56, 'Z'),
          n(57, 'Meta'),
          n(58, 'ContextMenu'),
          n(59, 'F1'),
          n(60, 'F2'),
          n(61, 'F3'),
          n(62, 'F4'),
          n(63, 'F5'),
          n(64, 'F6'),
          n(65, 'F7'),
          n(66, 'F8'),
          n(67, 'F9'),
          n(68, 'F10'),
          n(69, 'F11'),
          n(70, 'F12'),
          n(71, 'F13'),
          n(72, 'F14'),
          n(73, 'F15'),
          n(74, 'F16'),
          n(75, 'F17'),
          n(76, 'F18'),
          n(77, 'F19'),
          n(78, 'NumLock'),
          n(79, 'ScrollLock'),
          n(80, ';', ';', 'OEM_1'),
          n(81, '=', '=', 'OEM_PLUS'),
          n(82, ',', ',', 'OEM_COMMA'),
          n(83, '-', '-', 'OEM_MINUS'),
          n(84, '.', '.', 'OEM_PERIOD'),
          n(85, '/', '/', 'OEM_2'),
          n(86, '`', '`', 'OEM_3'),
          n(110, 'ABNT_C1'),
          n(111, 'ABNT_C2'),
          n(87, '[', '[', 'OEM_4'),
          n(88, '\\', '\\', 'OEM_5'),
          n(89, ']', ']', 'OEM_6'),
          n(90, "'", "'", 'OEM_7'),
          n(91, 'OEM_8'),
          n(92, 'OEM_102'),
          n(93, 'NumPad0'),
          n(94, 'NumPad1'),
          n(95, 'NumPad2'),
          n(96, 'NumPad3'),
          n(97, 'NumPad4'),
          n(98, 'NumPad5'),
          n(99, 'NumPad6'),
          n(100, 'NumPad7'),
          n(101, 'NumPad8'),
          n(102, 'NumPad9'),
          n(103, 'NumPad_Multiply'),
          n(104, 'NumPad_Add'),
          n(105, 'NumPad_Separator'),
          n(106, 'NumPad_Subtract'),
          n(107, 'NumPad_Decimal'),
          n(108, 'NumPad_Divide')
      })()
      var l
      ;(function(n) {
        function r(f) {
          return E.keyCodeToStr(f)
        }
        n.toString = r
        function m(f) {
          return E.strToKeyCode(f)
        }
        n.fromString = m
        function _(f) {
          return u.keyCodeToStr(f)
        }
        n.toUserSettingsUS = _
        function o(f) {
          return d.keyCodeToStr(f)
        }
        n.toUserSettingsGeneral = o
        function i(f) {
          return u.strToKeyCode(f) || d.strToKeyCode(f)
        }
        n.fromUserSettings = i
      })((l = t.KeyCodeUtils || (t.KeyCodeUtils = {})))
      function s(n, r) {
        const m = ((r & 65535) << 16) >>> 0
        return (n | m) >>> 0
      }
      t.KeyChord = s
      function h(n, r) {
        if (n === 0) return null
        const m = (n & 65535) >>> 0,
          _ = (n & 4294901760) >>> 16
        return _ !== 0 ? new S([w(m, r), w(_, r)]) : new S([w(m, r)])
      }
      t.createKeybinding = h
      function w(n, r) {
        const m = !!(n & 2048),
          _ = !!(n & 256),
          o = r === 2 ? _ : m,
          i = !!(n & 1024),
          f = !!(n & 512),
          b = r === 2 ? m : _,
          N = n & 255
        return new a(o, i, f, b, N)
      }
      t.createSimpleKeybinding = w
      class a {
        constructor(r, m, _, o, i) {
          ;(this.ctrlKey = r),
            (this.shiftKey = m),
            (this.altKey = _),
            (this.metaKey = o),
            (this.keyCode = i)
        }
        equals(r) {
          return (
            this.ctrlKey === r.ctrlKey &&
            this.shiftKey === r.shiftKey &&
            this.altKey === r.altKey &&
            this.metaKey === r.metaKey &&
            this.keyCode === r.keyCode
          )
        }
        isModifierKey() {
          return (
            this.keyCode === 0 ||
            this.keyCode === 5 ||
            this.keyCode === 57 ||
            this.keyCode === 6 ||
            this.keyCode === 4
          )
        }
        toChord() {
          return new S([this])
        }
        isDuplicateModifierCase() {
          return (
            (this.ctrlKey && this.keyCode === 5) ||
            (this.shiftKey && this.keyCode === 4) ||
            (this.altKey && this.keyCode === 6) ||
            (this.metaKey && this.keyCode === 57)
          )
        }
      }
      t.SimpleKeybinding = a
      class S {
        constructor(r) {
          if (r.length === 0) throw p.illegalArgument('parts')
          this.parts = r
        }
      }
      t.ChordKeybinding = S
      class v {
        constructor(r, m, _, o, i, f) {
          ;(this.ctrlKey = r),
            (this.shiftKey = m),
            (this.altKey = _),
            (this.metaKey = o),
            (this.keyLabel = i),
            (this.keyAriaLabel = f)
        }
      }
      t.ResolvedKeybindingPart = v
      class C {}
      t.ResolvedKeybinding = C
    }),
    V(z[7], G([0, 1, 16]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ImmortalReference = t.MutableDisposable = t.Disposable = t.DisposableStore = t.toDisposable = t.combinedDisposable = t.dispose = t.isDisposable = t.MultiDisposeError = t.trackDisposable = void 0)
      const P = !1
      let E = null
      if (P) {
        const r = '__is_disposable_tracked__'
        E = new (class {
          trackDisposable(m) {
            const _ = new Error('Potentially leaked disposable').stack
            setTimeout(() => {
              m[r] || console.log(_)
            }, 3e3)
          }
          markTracked(m) {
            if (m && m !== v.None)
              try {
                m[r] = !0
              } catch (_) {}
          }
        })()
      }
      function u(r) {
        !E || E.markTracked(r)
      }
      function d(r) {
        return E && E.trackDisposable(r), r
      }
      t.trackDisposable = d
      class l extends Error {
        constructor(m) {
          super(
            `Encountered errors while disposing of store. Errors: [${m.join(
              ', '
            )}]`
          )
          this.errors = m
        }
      }
      t.MultiDisposeError = l
      function s(r) {
        return typeof r.dispose == 'function' && r.dispose.length === 0
      }
      t.isDisposable = s
      function h(r) {
        if (p.Iterable.is(r)) {
          let m = []
          for (const _ of r)
            if (_) {
              u(_)
              try {
                _.dispose()
              } catch (o) {
                m.push(o)
              }
            }
          if (m.length === 1) throw m[0]
          if (m.length > 1) throw new l(m)
          return Array.isArray(r) ? [] : r
        } else if (r) return u(r), r.dispose(), r
      }
      t.dispose = h
      function w(...r) {
        return r.forEach(u), a(() => h(r))
      }
      t.combinedDisposable = w
      function a(r) {
        const m = d({
          dispose: () => {
            u(m), r()
          }
        })
        return m
      }
      t.toDisposable = a
      class S {
        constructor() {
          ;(this._toDispose = new Set()), (this._isDisposed = !1)
        }
        dispose() {
          this._isDisposed || (u(this), (this._isDisposed = !0), this.clear())
        }
        clear() {
          try {
            h(this._toDispose.values())
          } finally {
            this._toDispose.clear()
          }
        }
        add(m) {
          if (!m) return m
          if (m === this)
            throw new Error('Cannot register a disposable on itself!')
          return (
            u(m),
            this._isDisposed
              ? S.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!'
                  ).stack
                )
              : this._toDispose.add(m),
            m
          )
        }
      }
      ;(t.DisposableStore = S), (S.DISABLE_DISPOSED_WARNING = !1)
      class v {
        constructor() {
          ;(this._store = new S()), d(this)
        }
        dispose() {
          u(this), this._store.dispose()
        }
        _register(m) {
          if (m === this)
            throw new Error('Cannot register a disposable on itself!')
          return this._store.add(m)
        }
      }
      ;(t.Disposable = v), (v.None = Object.freeze({ dispose() {} }))
      class C {
        constructor() {
          ;(this._isDisposed = !1), d(this)
        }
        get value() {
          return this._isDisposed ? void 0 : this._value
        }
        set value(m) {
          var _
          this._isDisposed ||
            m === this._value ||
            ((_ = this._value) === null || _ === void 0 || _.dispose(),
            m && u(m),
            (this._value = m))
        }
        clear() {
          this.value = void 0
        }
        dispose() {
          var m
          ;(this._isDisposed = !0),
            u(this),
            (m = this._value) === null || m === void 0 || m.dispose(),
            (this._value = void 0)
        }
      }
      t.MutableDisposable = C
      class n {
        constructor(m) {
          this.object = m
        }
        dispose() {}
      }
      t.ImmortalReference = n
    }),
    V(z[18], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.LinkedList = void 0)
      class p {
        constructor(u) {
          ;(this.element = u),
            (this.next = p.Undefined),
            (this.prev = p.Undefined)
        }
      }
      p.Undefined = new p(void 0)
      class P {
        constructor() {
          ;(this._first = p.Undefined),
            (this._last = p.Undefined),
            (this._size = 0)
        }
        get size() {
          return this._size
        }
        isEmpty() {
          return this._first === p.Undefined
        }
        clear() {
          ;(this._first = p.Undefined),
            (this._last = p.Undefined),
            (this._size = 0)
        }
        unshift(u) {
          return this._insert(u, !1)
        }
        push(u) {
          return this._insert(u, !0)
        }
        _insert(u, d) {
          const l = new p(u)
          if (this._first === p.Undefined) (this._first = l), (this._last = l)
          else if (d) {
            const h = this._last
            ;(this._last = l), (l.prev = h), (h.next = l)
          } else {
            const h = this._first
            ;(this._first = l), (l.next = h), (h.prev = l)
          }
          this._size += 1
          let s = !1
          return () => {
            s || ((s = !0), this._remove(l))
          }
        }
        shift() {
          if (this._first !== p.Undefined) {
            const u = this._first.element
            return this._remove(this._first), u
          }
        }
        pop() {
          if (this._last !== p.Undefined) {
            const u = this._last.element
            return this._remove(this._last), u
          }
        }
        _remove(u) {
          if (u.prev !== p.Undefined && u.next !== p.Undefined) {
            const d = u.prev
            ;(d.next = u.next), (u.next.prev = d)
          } else u.prev === p.Undefined && u.next === p.Undefined ? ((this._first = p.Undefined), (this._last = p.Undefined)) : u.next === p.Undefined ? ((this._last = this._last.prev), (this._last.next = p.Undefined)) : u.prev === p.Undefined && ((this._first = this._first.next), (this._first.prev = p.Undefined))
          this._size -= 1
        }
        *[Symbol.iterator]() {
          let u = this._first
          for (; u !== p.Undefined; ) yield u.element, (u = u.next)
        }
      }
      t.LinkedList = P
    }),
    V(z[2], G([0, 1]), function(I, t) {
      'use strict'
      var p
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isLittleEndian = t.OS = t.setImmediate = t.globals = t.userAgent = t.isIOS = t.isWeb = t.isNative = t.isLinux = t.isMacintosh = t.isWindows = t.isPreferringBrowserCodeLoad = t.browserCodeLoadingCacheStrategy = t.isElectronSandboxed = void 0)
      const P = 'en'
      let E = !1,
        u = !1,
        d = !1,
        l = !1,
        s = !1,
        h = !1,
        w = !1,
        a,
        S = P,
        v,
        C
      const n =
        typeof self == 'object' ? self : typeof global == 'object' ? global : {}
      let r
      typeof process != 'undefined'
        ? (r = process)
        : typeof n.vscode != 'undefined' && (r = n.vscode.process)
      const m =
        typeof ((p = r == null ? void 0 : r.versions) === null || p === void 0
          ? void 0
          : p.electron) == 'string' && r.type === 'renderer'
      if (
        ((t.isElectronSandboxed = m && (r == null ? void 0 : r.sandboxed)),
        (t.browserCodeLoadingCacheStrategy = (() => {
          if (t.isElectronSandboxed) return 'bypassHeatCheck'
          const b =
            r == null ? void 0 : r.env.ENABLE_VSCODE_BROWSER_CODE_LOADING
          if (typeof b == 'string')
            return b === 'none' ||
              b === 'code' ||
              b === 'bypassHeatCheck' ||
              b === 'bypassHeatCheckAndEagerCompile'
              ? b
              : 'bypassHeatCheck'
        })()),
        (t.isPreferringBrowserCodeLoad =
          typeof t.browserCodeLoadingCacheStrategy == 'string'),
        typeof navigator == 'object' && !m)
      )
        (C = navigator.userAgent),
          (E = C.indexOf('Windows') >= 0),
          (u = C.indexOf('Macintosh') >= 0),
          (w =
            (C.indexOf('Macintosh') >= 0 ||
              C.indexOf('iPad') >= 0 ||
              C.indexOf('iPhone') >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0),
          (d = C.indexOf('Linux') >= 0),
          (h = !0),
          (a = navigator.language),
          (S = a)
      else if (typeof r == 'object') {
        ;(E = r.platform === 'win32'),
          (u = r.platform === 'darwin'),
          (d = r.platform === 'linux'),
          (l = d && !!r.env.SNAP && !!r.env.SNAP_REVISION),
          (a = P),
          (S = P)
        const b = r.env.VSCODE_NLS_CONFIG
        if (b)
          try {
            const N = JSON.parse(b),
              c = N.availableLanguages['*']
            ;(a = N.locale), (S = c || P), (v = N._translationsConfigFile)
          } catch (N) {}
        s = !0
      } else console.error('Unable to resolve platform.')
      let _ = 0
      u ? (_ = 1) : E ? (_ = 3) : d && (_ = 2),
        (t.isWindows = E),
        (t.isMacintosh = u),
        (t.isLinux = d),
        (t.isNative = s),
        (t.isWeb = h),
        (t.isIOS = w),
        (t.userAgent = C),
        (t.globals = n),
        (t.setImmediate = (function() {
          if (t.globals.setImmediate)
            return t.globals.setImmediate.bind(t.globals)
          if (
            typeof t.globals.postMessage == 'function' &&
            !t.globals.importScripts
          ) {
            let c = []
            t.globals.addEventListener('message', L => {
              if (L.data && L.data.vscodeSetImmediateId)
                for (let A = 0, M = c.length; A < M; A++) {
                  const R = c[A]
                  if (R.id === L.data.vscodeSetImmediateId) {
                    c.splice(A, 1), R.callback()
                    return
                  }
                }
            })
            let g = 0
            return L => {
              const A = ++g
              c.push({ id: A, callback: L }),
                t.globals.postMessage({ vscodeSetImmediateId: A }, '*')
            }
          }
          if (r && typeof r.nextTick == 'function') return r.nextTick.bind(r)
          const N = Promise.resolve()
          return c => N.then(c)
        })()),
        (t.OS = u || w ? 2 : E ? 1 : 3)
      let o = !0,
        i = !1
      function f() {
        if (!i) {
          i = !0
          const b = new Uint8Array(2)
          ;(b[0] = 1),
            (b[1] = 2),
            (o = new Uint16Array(b.buffer)[0] === (2 << 8) + 1)
        }
        return o
      }
      t.isLittleEndian = f
    }),
    V(z[19], G([0, 1, 2]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.platform = t.env = t.cwd = void 0)
      let P
      typeof process != 'undefined'
        ? (P = process)
        : typeof p.globals.vscode != 'undefined'
        ? (P = {
            get platform() {
              return p.globals.vscode.process.platform
            },
            get env() {
              return p.globals.vscode.process.env
            },
            nextTick(E) {
              return p.setImmediate(E)
            },
            cwd() {
              return (
                p.globals.vscode.process.env.VSCODE_CWD ||
                p.globals.vscode.process.execPath.substr(
                  0,
                  p.globals.vscode.process.execPath.lastIndexOf(
                    p.globals.vscode.process.platform === 'win32' ? '\\' : '/'
                  )
                )
              )
            }
          })
        : (P = {
            get platform() {
              return p.isWindows ? 'win32' : p.isMacintosh ? 'darwin' : 'linux'
            },
            nextTick(E) {
              return p.setImmediate(E)
            },
            get env() {
              return Object.create(null)
            },
            cwd() {
              return '/'
            }
          }),
        (t.cwd = P.cwd),
        (t.env = P.env),
        (t.platform = P.platform)
    }),
    V(z[20], G([0, 1, 19]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.sep = t.extname = t.basename = t.dirname = t.relative = t.resolve = t.normalize = t.posix = t.win32 = void 0)
      const P = 65,
        E = 97,
        u = 90,
        d = 122,
        l = 46,
        s = 47,
        h = 92,
        w = 58,
        a = 63
      class S extends Error {
        constructor(i, f, b) {
          let N
          typeof f == 'string' && f.indexOf('not ') === 0
            ? ((N = 'must not be'), (f = f.replace(/^not /, '')))
            : (N = 'must be')
          const c = i.indexOf('.') !== -1 ? 'property' : 'argument'
          let g = `The "${i}" ${c} ${N} of type ${f}`
          ;(g += `. Received type ${typeof b}`),
            super(g),
            (this.code = 'ERR_INVALID_ARG_TYPE')
        }
      }
      function v(o, i) {
        if (typeof o != 'string') throw new S(i, 'string', o)
      }
      function C(o) {
        return o === s || o === h
      }
      function n(o) {
        return o === s
      }
      function r(o) {
        return (o >= P && o <= u) || (o >= E && o <= d)
      }
      function m(o, i, f, b) {
        let N = '',
          c = 0,
          g = -1,
          L = 0,
          A = 0
        for (let M = 0; M <= o.length; ++M) {
          if (M < o.length) A = o.charCodeAt(M)
          else {
            if (b(A)) break
            A = s
          }
          if (b(A)) {
            if (!(g === M - 1 || L === 1))
              if (L === 2) {
                if (
                  N.length < 2 ||
                  c !== 2 ||
                  N.charCodeAt(N.length - 1) !== l ||
                  N.charCodeAt(N.length - 2) !== l
                ) {
                  if (N.length > 2) {
                    const R = N.lastIndexOf(f)
                    R === -1
                      ? ((N = ''), (c = 0))
                      : ((N = N.slice(0, R)),
                        (c = N.length - 1 - N.lastIndexOf(f))),
                      (g = M),
                      (L = 0)
                    continue
                  } else if (N.length !== 0) {
                    ;(N = ''), (c = 0), (g = M), (L = 0)
                    continue
                  }
                }
                i && ((N += N.length > 0 ? `${f}..` : '..'), (c = 2))
              } else
                N.length > 0
                  ? (N += `${f}${o.slice(g + 1, M)}`)
                  : (N = o.slice(g + 1, M)),
                  (c = M - g - 1)
            ;(g = M), (L = 0)
          } else A === l && L !== -1 ? ++L : (L = -1)
        }
        return N
      }
      function _(o, i) {
        if (i === null || typeof i != 'object')
          throw new S('pathObject', 'Object', i)
        const f = i.dir || i.root,
          b = i.base || `${i.name || ''}${i.ext || ''}`
        return f ? (f === i.root ? `${f}${b}` : `${f}${o}${b}`) : b
      }
      ;(t.win32 = {
        resolve(...o) {
          let i = '',
            f = '',
            b = !1
          for (let N = o.length - 1; N >= -1; N--) {
            let c
            if (N >= 0) {
              if (((c = o[N]), v(c, 'path'), c.length === 0)) continue
            } else
              i.length === 0
                ? (c = p.cwd())
                : ((c = p.env[`=${i}`] || p.cwd()),
                  (c === void 0 ||
                    (c.slice(0, 2).toLowerCase() !== i.toLowerCase() &&
                      c.charCodeAt(2) === h)) &&
                    (c = `${i}\\`))
            const g = c.length
            let L = 0,
              A = '',
              M = !1
            const R = c.charCodeAt(0)
            if (g === 1) C(R) && ((L = 1), (M = !0))
            else if (C(R))
              if (((M = !0), C(c.charCodeAt(1)))) {
                let D = 2,
                  T = D
                for (; D < g && !C(c.charCodeAt(D)); ) D++
                if (D < g && D !== T) {
                  const $ = c.slice(T, D)
                  for (T = D; D < g && C(c.charCodeAt(D)); ) D++
                  if (D < g && D !== T) {
                    for (T = D; D < g && !C(c.charCodeAt(D)); ) D++
                    ;(D === g || D !== T) &&
                      ((A = `\\\\${$}\\${c.slice(T, D)}`), (L = D))
                  }
                }
              } else L = 1
            else
              r(R) &&
                c.charCodeAt(1) === w &&
                ((A = c.slice(0, 2)),
                (L = 2),
                g > 2 && C(c.charCodeAt(2)) && ((M = !0), (L = 3)))
            if (A.length > 0)
              if (i.length > 0) {
                if (A.toLowerCase() !== i.toLowerCase()) continue
              } else i = A
            if (b) {
              if (i.length > 0) break
            } else if (
              ((f = `${c.slice(L)}\\${f}`), (b = M), M && i.length > 0)
            )
              break
          }
          return (f = m(f, !b, '\\', C)), b ? `${i}\\${f}` : `${i}${f}` || '.'
        },
        normalize(o) {
          v(o, 'path')
          const i = o.length
          if (i === 0) return '.'
          let f = 0,
            b,
            N = !1
          const c = o.charCodeAt(0)
          if (i === 1) return n(c) ? '\\' : o
          if (C(c))
            if (((N = !0), C(o.charCodeAt(1)))) {
              let L = 2,
                A = L
              for (; L < i && !C(o.charCodeAt(L)); ) L++
              if (L < i && L !== A) {
                const M = o.slice(A, L)
                for (A = L; L < i && C(o.charCodeAt(L)); ) L++
                if (L < i && L !== A) {
                  for (A = L; L < i && !C(o.charCodeAt(L)); ) L++
                  if (L === i) return `\\\\${M}\\${o.slice(A)}\\`
                  L !== A && ((b = `\\\\${M}\\${o.slice(A, L)}`), (f = L))
                }
              }
            } else f = 1
          else
            r(c) &&
              o.charCodeAt(1) === w &&
              ((b = o.slice(0, 2)),
              (f = 2),
              i > 2 && C(o.charCodeAt(2)) && ((N = !0), (f = 3)))
          let g = f < i ? m(o.slice(f), !N, '\\', C) : ''
          return (
            g.length === 0 && !N && (g = '.'),
            g.length > 0 && C(o.charCodeAt(i - 1)) && (g += '\\'),
            b === void 0 ? (N ? `\\${g}` : g) : N ? `${b}\\${g}` : `${b}${g}`
          )
        },
        isAbsolute(o) {
          v(o, 'path')
          const i = o.length
          if (i === 0) return !1
          const f = o.charCodeAt(0)
          return (
            C(f) ||
            (i > 2 && r(f) && o.charCodeAt(1) === w && C(o.charCodeAt(2)))
          )
        },
        join(...o) {
          if (o.length === 0) return '.'
          let i, f
          for (let c = 0; c < o.length; ++c) {
            const g = o[c]
            v(g, 'path'),
              g.length > 0 && (i === void 0 ? (i = f = g) : (i += `\\${g}`))
          }
          if (i === void 0) return '.'
          let b = !0,
            N = 0
          if (typeof f == 'string' && C(f.charCodeAt(0))) {
            ++N
            const c = f.length
            c > 1 &&
              C(f.charCodeAt(1)) &&
              (++N, c > 2 && (C(f.charCodeAt(2)) ? ++N : (b = !1)))
          }
          if (b) {
            for (; N < i.length && C(i.charCodeAt(N)); ) N++
            N >= 2 && (i = `\\${i.slice(N)}`)
          }
          return t.win32.normalize(i)
        },
        relative(o, i) {
          if ((v(o, 'from'), v(i, 'to'), o === i)) return ''
          const f = t.win32.resolve(o),
            b = t.win32.resolve(i)
          if (
            f === b ||
            ((o = f.toLowerCase()), (i = b.toLowerCase()), o === i)
          )
            return ''
          let N = 0
          for (; N < o.length && o.charCodeAt(N) === h; ) N++
          let c = o.length
          for (; c - 1 > N && o.charCodeAt(c - 1) === h; ) c--
          const g = c - N
          let L = 0
          for (; L < i.length && i.charCodeAt(L) === h; ) L++
          let A = i.length
          for (; A - 1 > L && i.charCodeAt(A - 1) === h; ) A--
          const M = A - L,
            R = g < M ? g : M
          let D = -1,
            T = 0
          for (; T < R; T++) {
            const k = o.charCodeAt(N + T)
            if (k !== i.charCodeAt(L + T)) break
            k === h && (D = T)
          }
          if (T !== R) {
            if (D === -1) return b
          } else {
            if (M > R) {
              if (i.charCodeAt(L + T) === h) return b.slice(L + T + 1)
              if (T === 2) return b.slice(L + T)
            }
            g > R && (o.charCodeAt(N + T) === h ? (D = T) : T === 2 && (D = 3)),
              D === -1 && (D = 0)
          }
          let $ = ''
          for (T = N + D + 1; T <= c; ++T)
            (T === c || o.charCodeAt(T) === h) &&
              ($ += $.length === 0 ? '..' : '\\..')
          return (
            (L += D),
            $.length > 0
              ? `${$}${b.slice(L, A)}`
              : (b.charCodeAt(L) === h && ++L, b.slice(L, A))
          )
        },
        toNamespacedPath(o) {
          if (typeof o != 'string') return o
          if (o.length === 0) return ''
          const i = t.win32.resolve(o)
          if (i.length <= 2) return o
          if (i.charCodeAt(0) === h) {
            if (i.charCodeAt(1) === h) {
              const f = i.charCodeAt(2)
              if (f !== a && f !== l) return `\\\\?\\UNC\\${i.slice(2)}`
            }
          } else if (
            r(i.charCodeAt(0)) &&
            i.charCodeAt(1) === w &&
            i.charCodeAt(2) === h
          )
            return `\\\\?\\${i}`
          return o
        },
        dirname(o) {
          v(o, 'path')
          const i = o.length
          if (i === 0) return '.'
          let f = -1,
            b = 0
          const N = o.charCodeAt(0)
          if (i === 1) return C(N) ? o : '.'
          if (C(N)) {
            if (((f = b = 1), C(o.charCodeAt(1)))) {
              let L = 2,
                A = L
              for (; L < i && !C(o.charCodeAt(L)); ) L++
              if (L < i && L !== A) {
                for (A = L; L < i && C(o.charCodeAt(L)); ) L++
                if (L < i && L !== A) {
                  for (A = L; L < i && !C(o.charCodeAt(L)); ) L++
                  if (L === i) return o
                  L !== A && (f = b = L + 1)
                }
              }
            }
          } else
            r(N) &&
              o.charCodeAt(1) === w &&
              ((f = i > 2 && C(o.charCodeAt(2)) ? 3 : 2), (b = f))
          let c = -1,
            g = !0
          for (let L = i - 1; L >= b; --L)
            if (C(o.charCodeAt(L))) {
              if (!g) {
                c = L
                break
              }
            } else g = !1
          if (c === -1) {
            if (f === -1) return '.'
            c = f
          }
          return o.slice(0, c)
        },
        basename(o, i) {
          i !== void 0 && v(i, 'ext'), v(o, 'path')
          let f = 0,
            b = -1,
            N = !0,
            c
          if (
            (o.length >= 2 &&
              r(o.charCodeAt(0)) &&
              o.charCodeAt(1) === w &&
              (f = 2),
            i !== void 0 && i.length > 0 && i.length <= o.length)
          ) {
            if (i === o) return ''
            let g = i.length - 1,
              L = -1
            for (c = o.length - 1; c >= f; --c) {
              const A = o.charCodeAt(c)
              if (C(A)) {
                if (!N) {
                  f = c + 1
                  break
                }
              } else
                L === -1 && ((N = !1), (L = c + 1)),
                  g >= 0 &&
                    (A === i.charCodeAt(g)
                      ? --g == -1 && (b = c)
                      : ((g = -1), (b = L)))
            }
            return f === b ? (b = L) : b === -1 && (b = o.length), o.slice(f, b)
          }
          for (c = o.length - 1; c >= f; --c)
            if (C(o.charCodeAt(c))) {
              if (!N) {
                f = c + 1
                break
              }
            } else b === -1 && ((N = !1), (b = c + 1))
          return b === -1 ? '' : o.slice(f, b)
        },
        extname(o) {
          v(o, 'path')
          let i = 0,
            f = -1,
            b = 0,
            N = -1,
            c = !0,
            g = 0
          o.length >= 2 &&
            o.charCodeAt(1) === w &&
            r(o.charCodeAt(0)) &&
            (i = b = 2)
          for (let L = o.length - 1; L >= i; --L) {
            const A = o.charCodeAt(L)
            if (C(A)) {
              if (!c) {
                b = L + 1
                break
              }
              continue
            }
            N === -1 && ((c = !1), (N = L + 1)),
              A === l
                ? f === -1
                  ? (f = L)
                  : g !== 1 && (g = 1)
                : f !== -1 && (g = -1)
          }
          return f === -1 ||
            N === -1 ||
            g === 0 ||
            (g === 1 && f === N - 1 && f === b + 1)
            ? ''
            : o.slice(f, N)
        },
        format: _.bind(null, '\\'),
        parse(o) {
          v(o, 'path')
          const i = { root: '', dir: '', base: '', ext: '', name: '' }
          if (o.length === 0) return i
          const f = o.length
          let b = 0,
            N = o.charCodeAt(0)
          if (f === 1)
            return C(N) ? ((i.root = i.dir = o), i) : ((i.base = i.name = o), i)
          if (C(N)) {
            if (((b = 1), C(o.charCodeAt(1)))) {
              let D = 2,
                T = D
              for (; D < f && !C(o.charCodeAt(D)); ) D++
              if (D < f && D !== T) {
                for (T = D; D < f && C(o.charCodeAt(D)); ) D++
                if (D < f && D !== T) {
                  for (T = D; D < f && !C(o.charCodeAt(D)); ) D++
                  D === f ? (b = D) : D !== T && (b = D + 1)
                }
              }
            }
          } else if (r(N) && o.charCodeAt(1) === w) {
            if (f <= 2) return (i.root = i.dir = o), i
            if (((b = 2), C(o.charCodeAt(2)))) {
              if (f === 3) return (i.root = i.dir = o), i
              b = 3
            }
          }
          b > 0 && (i.root = o.slice(0, b))
          let c = -1,
            g = b,
            L = -1,
            A = !0,
            M = o.length - 1,
            R = 0
          for (; M >= b; --M) {
            if (((N = o.charCodeAt(M)), C(N))) {
              if (!A) {
                g = M + 1
                break
              }
              continue
            }
            L === -1 && ((A = !1), (L = M + 1)),
              N === l
                ? c === -1
                  ? (c = M)
                  : R !== 1 && (R = 1)
                : c !== -1 && (R = -1)
          }
          return (
            L !== -1 &&
              (c === -1 || R === 0 || (R === 1 && c === L - 1 && c === g + 1)
                ? (i.base = i.name = o.slice(g, L))
                : ((i.name = o.slice(g, c)),
                  (i.base = o.slice(g, L)),
                  (i.ext = o.slice(c, L)))),
            g > 0 && g !== b ? (i.dir = o.slice(0, g - 1)) : (i.dir = i.root),
            i
          )
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null
      }),
        (t.posix = {
          resolve(...o) {
            let i = '',
              f = !1
            for (let b = o.length - 1; b >= -1 && !f; b--) {
              const N = b >= 0 ? o[b] : p.cwd()
              v(N, 'path'),
                N.length !== 0 &&
                  ((i = `${N}/${i}`), (f = N.charCodeAt(0) === s))
            }
            return (i = m(i, !f, '/', n)), f ? `/${i}` : i.length > 0 ? i : '.'
          },
          normalize(o) {
            if ((v(o, 'path'), o.length === 0)) return '.'
            const i = o.charCodeAt(0) === s,
              f = o.charCodeAt(o.length - 1) === s
            return (
              (o = m(o, !i, '/', n)),
              o.length === 0
                ? i
                  ? '/'
                  : f
                  ? './'
                  : '.'
                : (f && (o += '/'), i ? `/${o}` : o)
            )
          },
          isAbsolute(o) {
            return v(o, 'path'), o.length > 0 && o.charCodeAt(0) === s
          },
          join(...o) {
            if (o.length === 0) return '.'
            let i
            for (let f = 0; f < o.length; ++f) {
              const b = o[f]
              v(b, 'path'),
                b.length > 0 && (i === void 0 ? (i = b) : (i += `/${b}`))
            }
            return i === void 0 ? '.' : t.posix.normalize(i)
          },
          relative(o, i) {
            if (
              (v(o, 'from'),
              v(i, 'to'),
              o === i ||
                ((o = t.posix.resolve(o)), (i = t.posix.resolve(i)), o === i))
            )
              return ''
            const f = 1,
              b = o.length,
              N = b - f,
              c = 1,
              g = i.length - c,
              L = N < g ? N : g
            let A = -1,
              M = 0
            for (; M < L; M++) {
              const D = o.charCodeAt(f + M)
              if (D !== i.charCodeAt(c + M)) break
              D === s && (A = M)
            }
            if (M === L)
              if (g > L) {
                if (i.charCodeAt(c + M) === s) return i.slice(c + M + 1)
                if (M === 0) return i.slice(c + M)
              } else
                N > L &&
                  (o.charCodeAt(f + M) === s ? (A = M) : M === 0 && (A = 0))
            let R = ''
            for (M = f + A + 1; M <= b; ++M)
              (M === b || o.charCodeAt(M) === s) &&
                (R += R.length === 0 ? '..' : '/..')
            return `${R}${i.slice(c + A)}`
          },
          toNamespacedPath(o) {
            return o
          },
          dirname(o) {
            if ((v(o, 'path'), o.length === 0)) return '.'
            const i = o.charCodeAt(0) === s
            let f = -1,
              b = !0
            for (let N = o.length - 1; N >= 1; --N)
              if (o.charCodeAt(N) === s) {
                if (!b) {
                  f = N
                  break
                }
              } else b = !1
            return f === -1
              ? i
                ? '/'
                : '.'
              : i && f === 1
              ? '//'
              : o.slice(0, f)
          },
          basename(o, i) {
            i !== void 0 && v(i, 'ext'), v(o, 'path')
            let f = 0,
              b = -1,
              N = !0,
              c
            if (i !== void 0 && i.length > 0 && i.length <= o.length) {
              if (i === o) return ''
              let g = i.length - 1,
                L = -1
              for (c = o.length - 1; c >= 0; --c) {
                const A = o.charCodeAt(c)
                if (A === s) {
                  if (!N) {
                    f = c + 1
                    break
                  }
                } else
                  L === -1 && ((N = !1), (L = c + 1)),
                    g >= 0 &&
                      (A === i.charCodeAt(g)
                        ? --g == -1 && (b = c)
                        : ((g = -1), (b = L)))
              }
              return (
                f === b ? (b = L) : b === -1 && (b = o.length), o.slice(f, b)
              )
            }
            for (c = o.length - 1; c >= 0; --c)
              if (o.charCodeAt(c) === s) {
                if (!N) {
                  f = c + 1
                  break
                }
              } else b === -1 && ((N = !1), (b = c + 1))
            return b === -1 ? '' : o.slice(f, b)
          },
          extname(o) {
            v(o, 'path')
            let i = -1,
              f = 0,
              b = -1,
              N = !0,
              c = 0
            for (let g = o.length - 1; g >= 0; --g) {
              const L = o.charCodeAt(g)
              if (L === s) {
                if (!N) {
                  f = g + 1
                  break
                }
                continue
              }
              b === -1 && ((N = !1), (b = g + 1)),
                L === l
                  ? i === -1
                    ? (i = g)
                    : c !== 1 && (c = 1)
                  : i !== -1 && (c = -1)
            }
            return i === -1 ||
              b === -1 ||
              c === 0 ||
              (c === 1 && i === b - 1 && i === f + 1)
              ? ''
              : o.slice(i, b)
          },
          format: _.bind(null, '/'),
          parse(o) {
            v(o, 'path')
            const i = { root: '', dir: '', base: '', ext: '', name: '' }
            if (o.length === 0) return i
            const f = o.charCodeAt(0) === s
            let b
            f ? ((i.root = '/'), (b = 1)) : (b = 0)
            let N = -1,
              c = 0,
              g = -1,
              L = !0,
              A = o.length - 1,
              M = 0
            for (; A >= b; --A) {
              const R = o.charCodeAt(A)
              if (R === s) {
                if (!L) {
                  c = A + 1
                  break
                }
                continue
              }
              g === -1 && ((L = !1), (g = A + 1)),
                R === l
                  ? N === -1
                    ? (N = A)
                    : M !== 1 && (M = 1)
                  : N !== -1 && (M = -1)
            }
            if (g !== -1) {
              const R = c === 0 && f ? 1 : c
              N === -1 || M === 0 || (M === 1 && N === g - 1 && N === c + 1)
                ? (i.base = i.name = o.slice(R, g))
                : ((i.name = o.slice(R, N)),
                  (i.base = o.slice(R, g)),
                  (i.ext = o.slice(N, g)))
            }
            return c > 0 ? (i.dir = o.slice(0, c - 1)) : f && (i.dir = '/'), i
          },
          sep: '/',
          delimiter: ':',
          win32: null,
          posix: null
        }),
        (t.posix.win32 = t.win32.win32 = t.win32),
        (t.posix.posix = t.win32.posix = t.posix),
        (t.normalize =
          p.platform === 'win32' ? t.win32.normalize : t.posix.normalize),
        (t.resolve =
          p.platform === 'win32' ? t.win32.resolve : t.posix.resolve),
        (t.relative =
          p.platform === 'win32' ? t.win32.relative : t.posix.relative),
        (t.dirname =
          p.platform === 'win32' ? t.win32.dirname : t.posix.dirname),
        (t.basename =
          p.platform === 'win32' ? t.win32.basename : t.posix.basename),
        (t.extname =
          p.platform === 'win32' ? t.win32.extname : t.posix.extname),
        (t.sep = p.platform === 'win32' ? t.win32.sep : t.posix.sep)
    }),
    V(z[8], G([0, 1, 2]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.StopWatch = void 0)
      const P =
        p.globals.performance && typeof p.globals.performance.now == 'function'
      class E {
        constructor(d) {
          ;(this._highResolution = P && d),
            (this._startTime = this._now()),
            (this._stopTime = -1)
        }
        static create(d = !0) {
          return new E(d)
        }
        stop() {
          this._stopTime = this._now()
        }
        elapsed() {
          return this._stopTime !== -1
            ? this._stopTime - this._startTime
            : this._now() - this._startTime
        }
        _now() {
          return this._highResolution ? p.globals.performance.now() : Date.now()
        }
      }
      t.StopWatch = E
    }),
    V(z[9], G([0, 1, 4, 7, 18, 8]), function(I, t, p, P, E, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Relay = t.EventBufferer = t.PauseableEmitter = t.Emitter = t.Event = void 0)
      var d
      ;(function(C) {
        C.None = () => P.Disposable.None
        function n(k) {
          return (F, O = null, e) => {
            let H = !1,
              B
            return (
              (B = k(
                Q => {
                  if (!H) return B ? B.dispose() : (H = !0), F.call(O, Q)
                },
                null,
                e
              )),
              H && B.dispose(),
              B
            )
          }
        }
        C.once = n
        function r(k, F) {
          return b((O, e = null, H) => k(B => O.call(e, F(B)), null, H))
        }
        C.map = r
        function m(k, F) {
          return b((O, e = null, H) =>
            k(
              B => {
                F(B), O.call(e, B)
              },
              null,
              H
            )
          )
        }
        C.forEach = m
        function _(k, F) {
          return b((O, e = null, H) => k(B => F(B) && O.call(e, B), null, H))
        }
        C.filter = _
        function o(k) {
          return k
        }
        C.signal = o
        function i(...k) {
          return (F, O = null, e) =>
            P.combinedDisposable(...k.map(H => H(B => F.call(O, B), null, e)))
        }
        C.any = i
        function f(k, F, O) {
          let e = O
          return r(k, H => ((e = F(e, H)), e))
        }
        C.reduce = f
        function b(k) {
          let F
          const O = new w({
            onFirstListenerAdd() {
              F = k(O.fire, O)
            },
            onLastListenerRemove() {
              F.dispose()
            }
          })
          return O.event
        }
        C.snapshot = b
        function N(k, F, O = 100, e = !1, H) {
          let B,
            Q,
            Z,
            ie = 0
          const re = new w({
            leakWarningThreshold: H,
            onFirstListenerAdd() {
              B = k(se => {
                ie++,
                  (Q = F(Q, se)),
                  e && !Z && (re.fire(Q), (Q = void 0)),
                  clearTimeout(Z),
                  (Z = setTimeout(() => {
                    const le = Q
                    ;(Q = void 0),
                      (Z = void 0),
                      (!e || ie > 1) && re.fire(le),
                      (ie = 0)
                  }, O))
              })
            },
            onLastListenerRemove() {
              B.dispose()
            }
          })
          return re.event
        }
        C.debounce = N
        function c(k) {
          const F = new Date().getTime()
          return r(n(k), O => new Date().getTime() - F)
        }
        C.stopwatch = c
        function g(k) {
          let F = !0,
            O
          return _(k, e => {
            const H = F || e !== O
            return (F = !1), (O = e), H
          })
        }
        C.latch = g
        function L(k, F = !1, O = []) {
          let e = O.slice(),
            H = k(Z => {
              e ? e.push(Z) : Q.fire(Z)
            })
          const B = () => {
              e && e.forEach(Z => Q.fire(Z)), (e = null)
            },
            Q = new w({
              onFirstListenerAdd() {
                H || (H = k(Z => Q.fire(Z)))
              },
              onFirstListenerDidAdd() {
                e && (F ? setTimeout(B) : B())
              },
              onLastListenerRemove() {
                H && H.dispose(), (H = null)
              }
            })
          return Q.event
        }
        C.buffer = L
        class A {
          constructor(F) {
            this.event = F
          }
          map(F) {
            return new A(r(this.event, F))
          }
          forEach(F) {
            return new A(m(this.event, F))
          }
          filter(F) {
            return new A(_(this.event, F))
          }
          reduce(F, O) {
            return new A(f(this.event, F, O))
          }
          latch() {
            return new A(g(this.event))
          }
          debounce(F, O = 100, e = !1, H) {
            return new A(N(this.event, F, O, e, H))
          }
          on(F, O, e) {
            return this.event(F, O, e)
          }
          once(F, O, e) {
            return n(this.event)(F, O, e)
          }
        }
        function M(k) {
          return new A(k)
        }
        C.chain = M
        function R(k, F, O = e => e) {
          const e = (...Z) => Q.fire(O(...Z)),
            H = () => k.on(F, e),
            B = () => k.removeListener(F, e),
            Q = new w({ onFirstListenerAdd: H, onLastListenerRemove: B })
          return Q.event
        }
        C.fromNodeEventEmitter = R
        function D(k, F, O = e => e) {
          const e = (...Z) => Q.fire(O(...Z)),
            H = () => k.addEventListener(F, e),
            B = () => k.removeEventListener(F, e),
            Q = new w({ onFirstListenerAdd: H, onLastListenerRemove: B })
          return Q.event
        }
        C.fromDOMEventEmitter = D
        function T(k) {
          const F = new w()
          let O = !1
          return (
            k
              .then(void 0, () => null)
              .then(() => {
                O ? F.fire(void 0) : setTimeout(() => F.fire(void 0), 0)
              }),
            (O = !0),
            F.event
          )
        }
        C.fromPromise = T
        function $(k) {
          return new Promise(F => n(k)(F))
        }
        C.toPromise = $
      })((d = t.Event || (t.Event = {})))
      class l {
        constructor(n) {
          ;(this._listenerCount = 0),
            (this._invocationCount = 0),
            (this._elapsedOverall = 0),
            (this._name = `${n}_${l._idPool++}`)
        }
        start(n) {
          ;(this._stopWatch = new u.StopWatch(!0)), (this._listenerCount = n)
        }
        stop() {
          if (this._stopWatch) {
            const n = this._stopWatch.elapsed()
            ;(this._elapsedOverall += n),
              (this._invocationCount += 1),
              console.info(
                `did FIRE ${this._name}: elapsed_ms: ${n.toFixed(
                  5
                )}, listener: ${
                  this._listenerCount
                } (elapsed_overall: ${this._elapsedOverall.toFixed(
                  2
                )}, invocations: ${this._invocationCount})`
              ),
              (this._stopWatch = void 0)
          }
        }
      }
      l._idPool = 0
      let s = -1
      class h {
        constructor(
          n,
          r = Math.random()
            .toString(18)
            .slice(2, 5)
        ) {
          ;(this.customThreshold = n),
            (this.name = r),
            (this._warnCountdown = 0)
        }
        dispose() {
          this._stacks && this._stacks.clear()
        }
        check(n) {
          let r = s
          if (
            (typeof this.customThreshold == 'number' &&
              (r = this.customThreshold),
            !(r <= 0 || n < r))
          ) {
            this._stacks || (this._stacks = new Map())
            const m = new Error().stack
                .split(
                  `
`
                )
                .slice(3).join(`
`),
              _ = this._stacks.get(m) || 0
            if (
              (this._stacks.set(m, _ + 1),
              (this._warnCountdown -= 1),
              this._warnCountdown <= 0)
            ) {
              this._warnCountdown = r * 0.5
              let o,
                i = 0
              for (const [f, b] of this._stacks)
                (!o || i < b) && ((o = f), (i = b))
              console.warn(
                `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${i}):`
              ),
                console.warn(o)
            }
            return () => {
              const o = this._stacks.get(m) || 0
              this._stacks.set(m, o - 1)
            }
          }
        }
      }
      class w {
        constructor(n) {
          var r
          ;(this._disposed = !1),
            (this._options = n),
            (this._leakageMon =
              s > 0
                ? new h(this._options && this._options.leakWarningThreshold)
                : void 0),
            (this._perfMon = ((r = this._options) === null || r === void 0
            ? void 0
            : r._profName)
              ? new l(this._options._profName)
              : void 0)
        }
        get event() {
          return (
            this._event ||
              (this._event = (n, r, m) => {
                var _
                this._listeners || (this._listeners = new E.LinkedList())
                const o = this._listeners.isEmpty()
                o &&
                  this._options &&
                  this._options.onFirstListenerAdd &&
                  this._options.onFirstListenerAdd(this)
                const i = this._listeners.push(r ? [n, r] : n)
                o &&
                  this._options &&
                  this._options.onFirstListenerDidAdd &&
                  this._options.onFirstListenerDidAdd(this),
                  this._options &&
                    this._options.onListenerDidAdd &&
                    this._options.onListenerDidAdd(this, n, r)
                const f =
                  (_ = this._leakageMon) === null || _ === void 0
                    ? void 0
                    : _.check(this._listeners.size)
                let b
                return (
                  (b = {
                    dispose: () => {
                      f && f(),
                        (b.dispose = w._noop),
                        this._disposed ||
                          (i(),
                          this._options &&
                            this._options.onLastListenerRemove &&
                            ((this._listeners && !this._listeners.isEmpty()) ||
                              this._options.onLastListenerRemove(this)))
                    }
                  }),
                  m instanceof P.DisposableStore
                    ? m.add(b)
                    : Array.isArray(m) && m.push(b),
                  b
                )
              }),
            this._event
          )
        }
        fire(n) {
          var r, m
          if (this._listeners) {
            this._deliveryQueue || (this._deliveryQueue = new E.LinkedList())
            for (let _ of this._listeners) this._deliveryQueue.push([_, n])
            for (
              (r = this._perfMon) === null ||
              r === void 0 ||
              r.start(this._deliveryQueue.size);
              this._deliveryQueue.size > 0;

            ) {
              const [_, o] = this._deliveryQueue.shift()
              try {
                typeof _ == 'function' ? _.call(void 0, o) : _[0].call(_[1], o)
              } catch (i) {
                p.onUnexpectedError(i)
              }
            }
            ;(m = this._perfMon) === null || m === void 0 || m.stop()
          }
        }
        dispose() {
          var n, r, m
          ;(n = this._listeners) === null || n === void 0 || n.clear(),
            (r = this._deliveryQueue) === null || r === void 0 || r.clear(),
            (m = this._leakageMon) === null || m === void 0 || m.dispose(),
            (this._disposed = !0)
        }
      }
      ;(t.Emitter = w), (w._noop = function() {})
      class a extends w {
        constructor(n) {
          super(n)
          ;(this._isPaused = 0),
            (this._eventQueue = new E.LinkedList()),
            (this._mergeFn = n == null ? void 0 : n.merge)
        }
        pause() {
          this._isPaused++
        }
        resume() {
          if (this._isPaused !== 0 && --this._isPaused == 0)
            if (this._mergeFn) {
              const n = Array.from(this._eventQueue)
              this._eventQueue.clear(), super.fire(this._mergeFn(n))
            } else
              for (; !this._isPaused && this._eventQueue.size !== 0; )
                super.fire(this._eventQueue.shift())
        }
        fire(n) {
          this._listeners &&
            (this._isPaused !== 0 ? this._eventQueue.push(n) : super.fire(n))
        }
      }
      t.PauseableEmitter = a
      class S {
        constructor() {
          this.buffers = []
        }
        wrapEvent(n) {
          return (r, m, _) =>
            n(
              o => {
                const i = this.buffers[this.buffers.length - 1]
                i ? i.push(() => r.call(m, o)) : r.call(m, o)
              },
              void 0,
              _
            )
        }
        bufferEvents(n) {
          const r = []
          this.buffers.push(r)
          const m = n()
          return this.buffers.pop(), r.forEach(_ => _()), m
        }
      }
      t.EventBufferer = S
      class v {
        constructor() {
          ;(this.listening = !1),
            (this.inputEvent = d.None),
            (this.inputEventListener = P.Disposable.None),
            (this.emitter = new w({
              onFirstListenerDidAdd: () => {
                ;(this.listening = !0),
                  (this.inputEventListener = this.inputEvent(
                    this.emitter.fire,
                    this.emitter
                  ))
              },
              onLastListenerRemove: () => {
                ;(this.listening = !1), this.inputEventListener.dispose()
              }
            })),
            (this.event = this.emitter.event)
        }
        set input(n) {
          ;(this.inputEvent = n),
            this.listening &&
              (this.inputEventListener.dispose(),
              (this.inputEventListener = n(this.emitter.fire, this.emitter)))
        }
        dispose() {
          this.inputEventListener.dispose(), this.emitter.dispose()
        }
      }
      t.Relay = v
    }),
    V(z[21], G([0, 1, 9]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.CancellationTokenSource = t.CancellationToken = void 0)
      const P = Object.freeze(function(l, s) {
        const h = setTimeout(l.bind(s), 0)
        return {
          dispose() {
            clearTimeout(h)
          }
        }
      })
      var E
      ;(function(l) {
        function s(h) {
          return h === l.None || h === l.Cancelled || h instanceof u
            ? !0
            : !h || typeof h != 'object'
            ? !1
            : typeof h.isCancellationRequested == 'boolean' &&
              typeof h.onCancellationRequested == 'function'
        }
        ;(l.isCancellationToken = s),
          (l.None = Object.freeze({
            isCancellationRequested: !1,
            onCancellationRequested: p.Event.None
          })),
          (l.Cancelled = Object.freeze({
            isCancellationRequested: !0,
            onCancellationRequested: P
          }))
      })((E = t.CancellationToken || (t.CancellationToken = {})))
      class u {
        constructor() {
          ;(this._isCancelled = !1), (this._emitter = null)
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()))
        }
        get isCancellationRequested() {
          return this._isCancelled
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? P
            : (this._emitter || (this._emitter = new p.Emitter()),
              this._emitter.event)
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null))
        }
      }
      class d {
        constructor(s) {
          ;(this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener =
              s && s.onCancellationRequested(this.cancel, this))
        }
        get token() {
          return this._token || (this._token = new u()), this._token
        }
        cancel() {
          this._token
            ? this._token instanceof u && this._token.cancel()
            : (this._token = E.Cancelled)
        }
        dispose(s = !1) {
          s && this.cancel(),
            this._parentListener && this._parentListener.dispose(),
            this._token
              ? this._token instanceof u && this._token.dispose()
              : (this._token = E.None)
        }
      }
      t.CancellationTokenSource = d
    }),
    V(z[5], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.breakBetweenGraphemeBreakType = t.getGraphemeBreakType = t.singleLetterHash = t.containsUppercaseCharacter = t.startsWithUTF8BOM = t.UTF8_BOM_CHARACTER = t.isEmojiImprecise = t.isFullWidthCharacter = t.containsFullWidthCharacter = t.containsUnusualLineTerminators = t.UNUSUAL_LINE_TERMINATORS = t.isBasicASCII = t.containsEmoji = t.containsRTL = t.decodeUTF8 = t.prevCharLength = t.nextCharLength = t.getNextCodePoint = t.computeCodePoint = t.isLowSurrogate = t.isHighSurrogate = t.commonSuffixLength = t.commonPrefixLength = t.startsWithIgnoreCase = t.equalsIgnoreCase = t.isUpperAsciiLetter = t.isLowerAsciiLetter = t.compareSubstringIgnoreCase = t.compareIgnoreCase = t.compareSubstring = t.compare = t.lastNonWhitespaceIndex = t.getLeadingWhitespace = t.firstNonWhitespaceIndex = t.splitLines = t.regExpFlags = t.regExpLeadsToEndlessLoop = t.createRegExp = t.stripWildcards = t.convertSimple2RegExpPattern = t.rtrim = t.ltrim = t.trim = t.escapeRegExpCharacters = t.escape = t.format = t.isFalsyOrWhitespace = void 0)
      function p(y) {
        return !y || typeof y != 'string' ? !0 : y.trim().length === 0
      }
      t.isFalsyOrWhitespace = p
      const P = /{(\d+)}/g
      function E(y, ...U) {
        return U.length === 0
          ? y
          : y.replace(P, function(W, q) {
              const j = parseInt(q, 10)
              return isNaN(j) || j < 0 || j >= U.length ? W : U[j]
            })
      }
      t.format = E
      function u(y) {
        return y.replace(/[<>&]/g, function(U) {
          switch (U) {
            case '<':
              return '&lt;'
            case '>':
              return '&gt;'
            case '&':
              return '&amp;'
            default:
              return U
          }
        })
      }
      t.escape = u
      function d(y) {
        return y.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&')
      }
      t.escapeRegExpCharacters = d
      function l(y, U = ' ') {
        const W = s(y, U)
        return h(W, U)
      }
      t.trim = l
      function s(y, U) {
        if (!y || !U) return y
        const W = U.length
        if (W === 0 || y.length === 0) return y
        let q = 0
        for (; y.indexOf(U, q) === q; ) q = q + W
        return y.substring(q)
      }
      t.ltrim = s
      function h(y, U) {
        if (!y || !U) return y
        const W = U.length,
          q = y.length
        if (W === 0 || q === 0) return y
        let j = q,
          Y = -1
        for (; (Y = y.lastIndexOf(U, j - 1)), !(Y === -1 || Y + W !== j); ) {
          if (Y === 0) return ''
          j = Y
        }
        return y.substring(0, j)
      }
      t.rtrim = h
      function w(y) {
        return y
          .replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&')
          .replace(/[\*]/g, '.*')
      }
      t.convertSimple2RegExpPattern = w
      function a(y) {
        return y.replace(/\*/g, '')
      }
      t.stripWildcards = a
      function S(y, U, W = {}) {
        if (!y) throw new Error('Cannot create regex from empty string')
        U || (y = d(y)),
          W.wholeWord &&
            (/\B/.test(y.charAt(0)) || (y = '\\b' + y),
            /\B/.test(y.charAt(y.length - 1)) || (y = y + '\\b'))
        let q = ''
        return (
          W.global && (q += 'g'),
          W.matchCase || (q += 'i'),
          W.multiline && (q += 'm'),
          W.unicode && (q += 'u'),
          new RegExp(y, q)
        )
      }
      t.createRegExp = S
      function v(y) {
        return y.source === '^' ||
          y.source === '^$' ||
          y.source === '$' ||
          y.source === '^\\s*$'
          ? !1
          : !!(y.exec('') && y.lastIndex === 0)
      }
      t.regExpLeadsToEndlessLoop = v
      function C(y) {
        return (
          (y.global ? 'g' : '') +
          (y.ignoreCase ? 'i' : '') +
          (y.multiline ? 'm' : '') +
          (y.unicode ? 'u' : '')
        )
      }
      t.regExpFlags = C
      function n(y) {
        return y.split(/\r\n|\r|\n/)
      }
      t.splitLines = n
      function r(y) {
        for (let U = 0, W = y.length; U < W; U++) {
          const q = y.charCodeAt(U)
          if (q !== 32 && q !== 9) return U
        }
        return -1
      }
      t.firstNonWhitespaceIndex = r
      function m(y, U = 0, W = y.length) {
        for (let q = U; q < W; q++) {
          const j = y.charCodeAt(q)
          if (j !== 32 && j !== 9) return y.substring(U, q)
        }
        return y.substring(U, W)
      }
      t.getLeadingWhitespace = m
      function _(y, U = y.length - 1) {
        for (let W = U; W >= 0; W--) {
          const q = y.charCodeAt(W)
          if (q !== 32 && q !== 9) return W
        }
        return -1
      }
      t.lastNonWhitespaceIndex = _
      function o(y, U) {
        return y < U ? -1 : y > U ? 1 : 0
      }
      t.compare = o
      function i(y, U, W = 0, q = y.length, j = 0, Y = U.length) {
        for (; W < q && j < Y; W++, j++) {
          let K = y.charCodeAt(W),
            te = U.charCodeAt(j)
          if (K < te) return -1
          if (K > te) return 1
        }
        const J = q - W,
          x = Y - j
        return J < x ? -1 : J > x ? 1 : 0
      }
      t.compareSubstring = i
      function f(y, U) {
        return b(y, U, 0, y.length, 0, U.length)
      }
      t.compareIgnoreCase = f
      function b(y, U, W = 0, q = y.length, j = 0, Y = U.length) {
        for (; W < q && j < Y; W++, j++) {
          let K = y.charCodeAt(W),
            te = U.charCodeAt(j)
          if (K !== te) {
            const oe = K - te
            if (!(oe === 32 && c(te)) && !(oe === -32 && c(K)))
              return N(K) && N(te)
                ? oe
                : i(y.toLowerCase(), U.toLowerCase(), W, q, j, Y)
          }
        }
        const J = q - W,
          x = Y - j
        return J < x ? -1 : J > x ? 1 : 0
      }
      t.compareSubstringIgnoreCase = b
      function N(y) {
        return y >= 97 && y <= 122
      }
      t.isLowerAsciiLetter = N
      function c(y) {
        return y >= 65 && y <= 90
      }
      t.isUpperAsciiLetter = c
      function g(y) {
        return N(y) || c(y)
      }
      function L(y, U) {
        return y.length === U.length && A(y, U)
      }
      t.equalsIgnoreCase = L
      function A(y, U, W = y.length) {
        for (let q = 0; q < W; q++) {
          const j = y.charCodeAt(q),
            Y = U.charCodeAt(q)
          if (j !== Y) {
            if (g(j) && g(Y)) {
              const J = Math.abs(j - Y)
              if (J !== 0 && J !== 32) return !1
            } else if (
              String.fromCharCode(j).toLowerCase() !==
              String.fromCharCode(Y).toLowerCase()
            )
              return !1
          }
        }
        return !0
      }
      function M(y, U) {
        const W = U.length
        return U.length > y.length ? !1 : A(y, U, W)
      }
      t.startsWithIgnoreCase = M
      function R(y, U) {
        let W,
          q = Math.min(y.length, U.length)
        for (W = 0; W < q; W++)
          if (y.charCodeAt(W) !== U.charCodeAt(W)) return W
        return q
      }
      t.commonPrefixLength = R
      function D(y, U) {
        let W,
          q = Math.min(y.length, U.length)
        const j = y.length - 1,
          Y = U.length - 1
        for (W = 0; W < q; W++)
          if (y.charCodeAt(j - W) !== U.charCodeAt(Y - W)) return W
        return q
      }
      t.commonSuffixLength = D
      function T(y) {
        return 55296 <= y && y <= 56319
      }
      t.isHighSurrogate = T
      function $(y) {
        return 56320 <= y && y <= 57343
      }
      t.isLowSurrogate = $
      function k(y, U) {
        return ((y - 55296) << 10) + (U - 56320) + 65536
      }
      t.computeCodePoint = k
      function F(y, U, W) {
        const q = y.charCodeAt(W)
        if (T(q) && W + 1 < U) {
          const j = y.charCodeAt(W + 1)
          if ($(j)) return k(q, j)
        }
        return q
      }
      t.getNextCodePoint = F
      function O(y, U) {
        const W = y.charCodeAt(U - 1)
        if ($(W) && U > 1) {
          const q = y.charCodeAt(U - 2)
          if (T(q)) return k(q, W)
        }
        return W
      }
      function e(y, U) {
        const W = ee.getInstance(),
          q = U,
          j = y.length,
          Y = F(y, j, U)
        U += Y >= 65536 ? 2 : 1
        let J = W.getGraphemeBreakType(Y)
        for (; U < j; ) {
          const x = F(y, j, U),
            K = W.getGraphemeBreakType(x)
          if (ue(J, K)) break
          ;(U += x >= 65536 ? 2 : 1), (J = K)
        }
        return U - q
      }
      t.nextCharLength = e
      function H(y, U) {
        const W = ee.getInstance(),
          q = U,
          j = O(y, U)
        U -= j >= 65536 ? 2 : 1
        let Y = W.getGraphemeBreakType(j)
        for (; U > 0; ) {
          const J = O(y, U),
            x = W.getGraphemeBreakType(J)
          if (ue(x, Y)) break
          ;(U -= J >= 65536 ? 2 : 1), (Y = x)
        }
        return q - U
      }
      t.prevCharLength = H
      function B(y) {
        const U = y.byteLength,
          W = []
        let q = 0
        for (; q < U; ) {
          const j = y[q]
          let Y
          if (
            (j >= 240 && q + 3 < U
              ? (Y =
                  (((y[q++] & 7) << 18) >>> 0) |
                  (((y[q++] & 63) << 12) >>> 0) |
                  (((y[q++] & 63) << 6) >>> 0) |
                  (((y[q++] & 63) << 0) >>> 0))
              : j >= 224 && q + 2 < U
              ? (Y =
                  (((y[q++] & 15) << 12) >>> 0) |
                  (((y[q++] & 63) << 6) >>> 0) |
                  (((y[q++] & 63) << 0) >>> 0))
              : j >= 192 && q + 1 < U
              ? (Y =
                  (((y[q++] & 31) << 6) >>> 0) | (((y[q++] & 63) << 0) >>> 0))
              : (Y = y[q++]),
            (Y >= 0 && Y <= 55295) || (Y >= 57344 && Y <= 65535))
          )
            W.push(String.fromCharCode(Y))
          else if (Y >= 65536 && Y <= 1114111) {
            const J = Y - 65536,
              x = 55296 + ((J & 1047552) >>> 10),
              K = 56320 + ((J & 1023) >>> 0)
            W.push(String.fromCharCode(x)), W.push(String.fromCharCode(K))
          } else W.push(String.fromCharCode(65533))
        }
        return W.join('')
      }
      t.decodeUTF8 = B
      const Q = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/
      function Z(y) {
        return Q.test(y)
      }
      t.containsRTL = Z
      const ie = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDED6])/
      function re(y) {
        return ie.test(y)
      }
      t.containsEmoji = re
      const se = /^[\t\n\r\x20-\x7E]*$/
      function le(y) {
        return se.test(y)
      }
      ;(t.isBasicASCII = le), (t.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/)
      function he(y) {
        return t.UNUSUAL_LINE_TERMINATORS.test(y)
      }
      t.containsUnusualLineTerminators = he
      function de(y) {
        for (let U = 0, W = y.length; U < W; U++)
          if (ae(y.charCodeAt(U))) return !0
        return !1
      }
      t.containsFullWidthCharacter = de
      function ae(y) {
        return (
          (y = +y),
          (y >= 11904 && y <= 55215) ||
            (y >= 63744 && y <= 64255) ||
            (y >= 65281 && y <= 65374)
        )
      }
      t.isFullWidthCharacter = ae
      function me(y) {
        return (
          (y >= 127462 && y <= 127487) ||
          y === 8986 ||
          y === 8987 ||
          y === 9200 ||
          y === 9203 ||
          (y >= 9728 && y <= 10175) ||
          y === 11088 ||
          y === 11093 ||
          (y >= 127744 && y <= 128591) ||
          (y >= 128640 && y <= 128764) ||
          (y >= 128992 && y <= 129003) ||
          (y >= 129280 && y <= 129535) ||
          (y >= 129648 && y <= 129750)
        )
      }
      ;(t.isEmojiImprecise = me),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279))
      function ge(y) {
        return !!(y && y.length > 0 && y.charCodeAt(0) === 65279)
      }
      t.startsWithUTF8BOM = ge
      function _e(y, U = !1) {
        return y
          ? (U && (y = y.replace(/\\./g, '')), y.toLowerCase() !== y)
          : !1
      }
      t.containsUppercaseCharacter = _e
      function ve(y) {
        const U = 90 - 65 + 1
        return (
          (y = y % (2 * U)),
          y < U ? String.fromCharCode(97 + y) : String.fromCharCode(65 + y - U)
        )
      }
      t.singleLetterHash = ve
      function Ce(y) {
        return ee.getInstance().getGraphemeBreakType(y)
      }
      t.getGraphemeBreakType = Ce
      function ue(y, U) {
        return y === 0
          ? U !== 5 && U !== 7
          : y === 2 && U === 3
          ? !1
          : y === 4 || y === 2 || y === 3 || U === 4 || U === 2 || U === 3
          ? !0
          : !(
              (y === 8 && (U === 8 || U === 9 || U === 11 || U === 12)) ||
              ((y === 11 || y === 9) && (U === 9 || U === 10)) ||
              ((y === 12 || y === 10) && U === 10) ||
              U === 5 ||
              U === 13 ||
              U === 7 ||
              y === 1 ||
              (y === 13 && U === 14) ||
              (y === 6 && U === 6)
            )
      }
      t.breakBetweenGraphemeBreakType = ue
      class ee {
        constructor() {
          this._data = be()
        }
        static getInstance() {
          return ee._INSTANCE || (ee._INSTANCE = new ee()), ee._INSTANCE
        }
        getGraphemeBreakType(U) {
          if (U < 32) return U === 10 ? 3 : U === 13 ? 2 : 4
          if (U < 127) return 0
          const W = this._data,
            q = W.length / 3
          let j = 1
          for (; j <= q; )
            if (U < W[3 * j]) j = 2 * j
            else if (U > W[3 * j + 1]) j = 2 * j + 1
            else return W[3 * j + 2]
          return 0
        }
      }
      ee._INSTANCE = null
      function be() {
        return JSON.parse(
          '[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]'
        )
      }
    }),
    V(z[22], G([0, 1, 5]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.StringSHA1 = t.toHexString = t.stringHash = t.doHash = t.hash = void 0)
      function P(n) {
        return E(n, 0)
      }
      t.hash = P
      function E(n, r) {
        switch (typeof n) {
          case 'object':
            return n === null ? u(349, r) : Array.isArray(n) ? s(n, r) : h(n, r)
          case 'string':
            return l(n, r)
          case 'boolean':
            return d(n, r)
          case 'number':
            return u(n, r)
          case 'undefined':
            return u(937, r)
          default:
            return u(617, r)
        }
      }
      t.doHash = E
      function u(n, r) {
        return ((r << 5) - r + n) | 0
      }
      function d(n, r) {
        return u(n ? 433 : 863, r)
      }
      function l(n, r) {
        r = u(149417, r)
        for (let m = 0, _ = n.length; m < _; m++) r = u(n.charCodeAt(m), r)
        return r
      }
      t.stringHash = l
      function s(n, r) {
        return (r = u(104579, r)), n.reduce((m, _) => E(_, m), r)
      }
      function h(n, r) {
        return (
          (r = u(181387, r)),
          Object.keys(n)
            .sort()
            .reduce((m, _) => ((m = l(_, m)), E(n[_], m)), r)
        )
      }
      function w(n, r, m = 32) {
        const _ = m - r,
          o = ~((1 << _) - 1)
        return ((n << r) | ((o & n) >>> _)) >>> 0
      }
      function a(n, r = 0, m = n.byteLength, _ = 0) {
        for (let o = 0; o < m; o++) n[r + o] = _
      }
      function S(n, r, m = '0') {
        for (; n.length < r; ) n = m + n
        return n
      }
      function v(n, r = 32) {
        return n instanceof ArrayBuffer
          ? Array.from(new Uint8Array(n))
              .map(m => m.toString(16).padStart(2, '0'))
              .join('')
          : S((n >>> 0).toString(16), r / 4)
      }
      t.toHexString = v
      class C {
        constructor() {
          ;(this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(64 + 3)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1)
        }
        update(r) {
          const m = r.length
          if (m !== 0) {
            const _ = this._buff
            let o = this._buffLen,
              i = this._leftoverHighSurrogate,
              f,
              b
            for (
              i !== 0
                ? ((f = i), (b = -1), (i = 0))
                : ((f = r.charCodeAt(0)), (b = 0));
              ;

            ) {
              let N = f
              if (p.isHighSurrogate(f))
                if (b + 1 < m) {
                  const c = r.charCodeAt(b + 1)
                  p.isLowSurrogate(c)
                    ? (b++, (N = p.computeCodePoint(f, c)))
                    : (N = 65533)
                } else {
                  i = f
                  break
                }
              else p.isLowSurrogate(f) && (N = 65533)
              if (((o = this._push(_, o, N)), b++, b < m)) f = r.charCodeAt(b)
              else break
            }
            ;(this._buffLen = o), (this._leftoverHighSurrogate = i)
          }
        }
        _push(r, m, _) {
          return (
            _ < 128
              ? (r[m++] = _)
              : _ < 2048
              ? ((r[m++] = 192 | ((_ & 1984) >>> 6)),
                (r[m++] = 128 | ((_ & 63) >>> 0)))
              : _ < 65536
              ? ((r[m++] = 224 | ((_ & 61440) >>> 12)),
                (r[m++] = 128 | ((_ & 4032) >>> 6)),
                (r[m++] = 128 | ((_ & 63) >>> 0)))
              : ((r[m++] = 240 | ((_ & 1835008) >>> 18)),
                (r[m++] = 128 | ((_ & 258048) >>> 12)),
                (r[m++] = 128 | ((_ & 4032) >>> 6)),
                (r[m++] = 128 | ((_ & 63) >>> 0))),
            m >= 64 &&
              (this._step(),
              (m -= 64),
              (this._totalLen += 64),
              (r[0] = r[64 + 0]),
              (r[1] = r[64 + 1]),
              (r[2] = r[64 + 2])),
            m
          )
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            v(this._h0) + v(this._h1) + v(this._h2) + v(this._h3) + v(this._h4)
          )
        }
        _wrapUp() {
          ;(this._buff[this._buffLen++] = 128),
            a(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), a(this._buff))
          const r = 8 * this._totalLen
          this._buffDV.setUint32(56, Math.floor(r / 4294967296), !1),
            this._buffDV.setUint32(60, r % 4294967296, !1),
            this._step()
        }
        _step() {
          const r = C._bigBlock32,
            m = this._buffDV
          for (let L = 0; L < 64; L += 4) r.setUint32(L, m.getUint32(L, !1), !1)
          for (let L = 64; L < 320; L += 4)
            r.setUint32(
              L,
              w(
                r.getUint32(L - 12, !1) ^
                  r.getUint32(L - 32, !1) ^
                  r.getUint32(L - 56, !1) ^
                  r.getUint32(L - 64, !1),
                1
              ),
              !1
            )
          let _ = this._h0,
            o = this._h1,
            i = this._h2,
            f = this._h3,
            b = this._h4,
            N,
            c,
            g
          for (let L = 0; L < 80; L++)
            L < 20
              ? ((N = (o & i) | (~o & f)), (c = 1518500249))
              : L < 40
              ? ((N = o ^ i ^ f), (c = 1859775393))
              : L < 60
              ? ((N = (o & i) | (o & f) | (i & f)), (c = 2400959708))
              : ((N = o ^ i ^ f), (c = 3395469782)),
              (g = (w(_, 5) + N + b + c + r.getUint32(L * 4, !1)) & 4294967295),
              (b = f),
              (f = i),
              (i = w(o, 30)),
              (o = _),
              (_ = g)
          ;(this._h0 = (this._h0 + _) & 4294967295),
            (this._h1 = (this._h1 + o) & 4294967295),
            (this._h2 = (this._h2 + i) & 4294967295),
            (this._h3 = (this._h3 + f) & 4294967295),
            (this._h4 = (this._h4 + b) & 4294967295)
        }
      }
      ;(t.StringSHA1 = C), (C._bigBlock32 = new DataView(new ArrayBuffer(320)))
    }),
    V(z[10], G([0, 1, 15, 22]), function(I, t, p, P) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.LcsDiff = t.MyArray = t.Debug = t.stringDiff = t.StringDiffSequence = void 0)
      class E {
        constructor(a) {
          this.source = a
        }
        getElements() {
          const a = this.source,
            S = new Int32Array(a.length)
          for (let v = 0, C = a.length; v < C; v++) S[v] = a.charCodeAt(v)
          return S
        }
      }
      t.StringDiffSequence = E
      function u(w, a, S) {
        return new h(new E(w), new E(a)).ComputeDiff(S).changes
      }
      t.stringDiff = u
      class d {
        static Assert(a, S) {
          if (!a) throw new Error(S)
        }
      }
      t.Debug = d
      class l {
        static Copy(a, S, v, C, n) {
          for (let r = 0; r < n; r++) v[C + r] = a[S + r]
        }
        static Copy2(a, S, v, C, n) {
          for (let r = 0; r < n; r++) v[C + r] = a[S + r]
        }
      }
      t.MyArray = l
      class s {
        constructor() {
          ;(this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0)
        }
        MarkNextChange() {
          ;(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new p.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount
              )
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824)
        }
        AddOriginalElement(a, S) {
          ;(this.m_originalStart = Math.min(this.m_originalStart, a)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, S)),
            this.m_originalCount++
        }
        AddModifiedElement(a, S) {
          ;(this.m_originalStart = Math.min(this.m_originalStart, a)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, S)),
            this.m_modifiedCount++
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes
          )
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          )
        }
      }
      class h {
        constructor(a, S, v = null) {
          this.ContinueProcessingPredicate = v
          const [C, n, r] = h._getElements(a),
            [m, _, o] = h._getElements(S)
          ;(this._hasStrings = r && o),
            (this._originalStringElements = C),
            (this._originalElementsOrHash = n),
            (this._modifiedStringElements = m),
            (this._modifiedElementsOrHash = _),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = [])
        }
        static _isStringArray(a) {
          return a.length > 0 && typeof a[0] == 'string'
        }
        static _getElements(a) {
          const S = a.getElements()
          if (h._isStringArray(S)) {
            const v = new Int32Array(S.length)
            for (let C = 0, n = S.length; C < n; C++)
              v[C] = P.stringHash(S[C], 0)
            return [S, v, !0]
          }
          return S instanceof Int32Array
            ? [[], S, !1]
            : [[], new Int32Array(S), !1]
        }
        ElementsAreEqual(a, S) {
          return this._originalElementsOrHash[a] !==
            this._modifiedElementsOrHash[S]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[a] ===
              this._modifiedStringElements[S]
            : !0
        }
        OriginalElementsAreEqual(a, S) {
          return this._originalElementsOrHash[a] !==
            this._originalElementsOrHash[S]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[a] ===
              this._originalStringElements[S]
            : !0
        }
        ModifiedElementsAreEqual(a, S) {
          return this._modifiedElementsOrHash[a] !==
            this._modifiedElementsOrHash[S]
            ? !1
            : this._hasStrings
            ? this._modifiedStringElements[a] ===
              this._modifiedStringElements[S]
            : !0
        }
        ComputeDiff(a) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            a
          )
        }
        _ComputeDiff(a, S, v, C, n) {
          const r = [!1]
          let m = this.ComputeDiffRecursive(a, S, v, C, r)
          return (
            n && (m = this.PrettifyChanges(m)), { quitEarly: r[0], changes: m }
          )
        }
        ComputeDiffRecursive(a, S, v, C, n) {
          for (n[0] = !1; a <= S && v <= C && this.ElementsAreEqual(a, v); )
            a++, v++
          for (; S >= a && C >= v && this.ElementsAreEqual(S, C); ) S--, C--
          if (a > S || v > C) {
            let f
            return (
              v <= C
                ? (d.Assert(
                    a === S + 1,
                    'originalStart should only be one more than originalEnd'
                  ),
                  (f = [new p.DiffChange(a, 0, v, C - v + 1)]))
                : a <= S
                ? (d.Assert(
                    v === C + 1,
                    'modifiedStart should only be one more than modifiedEnd'
                  ),
                  (f = [new p.DiffChange(a, S - a + 1, v, 0)]))
                : (d.Assert(
                    a === S + 1,
                    'originalStart should only be one more than originalEnd'
                  ),
                  d.Assert(
                    v === C + 1,
                    'modifiedStart should only be one more than modifiedEnd'
                  ),
                  (f = [])),
              f
            )
          }
          const r = [0],
            m = [0],
            _ = this.ComputeRecursionPoint(a, S, v, C, r, m, n),
            o = r[0],
            i = m[0]
          if (_ !== null) return _
          if (!n[0]) {
            const f = this.ComputeDiffRecursive(a, o, v, i, n)
            let b = []
            return (
              n[0]
                ? (b = [
                    new p.DiffChange(
                      o + 1,
                      S - (o + 1) + 1,
                      i + 1,
                      C - (i + 1) + 1
                    )
                  ])
                : (b = this.ComputeDiffRecursive(o + 1, S, i + 1, C, n)),
              this.ConcatenateChanges(f, b)
            )
          }
          return [new p.DiffChange(a, S - a + 1, v, C - v + 1)]
        }
        WALKTRACE(a, S, v, C, n, r, m, _, o, i, f, b, N, c, g, L, A, M) {
          let R = null,
            D = null,
            T = new s(),
            $ = S,
            k = v,
            F = N[0] - L[0] - C,
            O = -1073741824,
            e = this.m_forwardHistory.length - 1
          do {
            const H = F + a
            H === $ || (H < k && o[H - 1] < o[H + 1])
              ? ((f = o[H + 1]),
                (c = f - F - C),
                f < O && T.MarkNextChange(),
                (O = f),
                T.AddModifiedElement(f + 1, c),
                (F = H + 1 - a))
              : ((f = o[H - 1] + 1),
                (c = f - F - C),
                f < O && T.MarkNextChange(),
                (O = f - 1),
                T.AddOriginalElement(f, c + 1),
                (F = H - 1 - a)),
              e >= 0 &&
                ((o = this.m_forwardHistory[e]),
                (a = o[0]),
                ($ = 1),
                (k = o.length - 1))
          } while (--e >= -1)
          if (((R = T.getReverseChanges()), M[0])) {
            let H = N[0] + 1,
              B = L[0] + 1
            if (R !== null && R.length > 0) {
              const Q = R[R.length - 1]
              ;(H = Math.max(H, Q.getOriginalEnd())),
                (B = Math.max(B, Q.getModifiedEnd()))
            }
            D = [new p.DiffChange(H, b - H + 1, B, g - B + 1)]
          } else {
            ;(T = new s()),
              ($ = r),
              (k = m),
              (F = N[0] - L[0] - _),
              (O = 1073741824),
              (e = A
                ? this.m_reverseHistory.length - 1
                : this.m_reverseHistory.length - 2)
            do {
              const H = F + n
              H === $ || (H < k && i[H - 1] >= i[H + 1])
                ? ((f = i[H + 1] - 1),
                  (c = f - F - _),
                  f > O && T.MarkNextChange(),
                  (O = f + 1),
                  T.AddOriginalElement(f + 1, c + 1),
                  (F = H + 1 - n))
                : ((f = i[H - 1]),
                  (c = f - F - _),
                  f > O && T.MarkNextChange(),
                  (O = f),
                  T.AddModifiedElement(f + 1, c + 1),
                  (F = H - 1 - n)),
                e >= 0 &&
                  ((i = this.m_reverseHistory[e]),
                  (n = i[0]),
                  ($ = 1),
                  (k = i.length - 1))
            } while (--e >= -1)
            D = T.getChanges()
          }
          return this.ConcatenateChanges(R, D)
        }
        ComputeRecursionPoint(a, S, v, C, n, r, m) {
          let _ = 0,
            o = 0,
            i = 0,
            f = 0,
            b = 0,
            N = 0
          a--,
            v--,
            (n[0] = 0),
            (r[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = [])
          const c = S - a + (C - v),
            g = c + 1,
            L = new Int32Array(g),
            A = new Int32Array(g),
            M = C - v,
            R = S - a,
            D = a - v,
            T = S - C,
            k = (R - M) % 2 == 0
          ;(L[M] = a), (A[R] = S), (m[0] = !1)
          for (let F = 1; F <= c / 2 + 1; F++) {
            let O = 0,
              e = 0
            ;(i = this.ClipDiagonalBound(M - F, F, M, g)),
              (f = this.ClipDiagonalBound(M + F, F, M, g))
            for (let B = i; B <= f; B += 2) {
              B === i || (B < f && L[B - 1] < L[B + 1])
                ? (_ = L[B + 1])
                : (_ = L[B - 1] + 1),
                (o = _ - (B - M) - D)
              const Q = _
              for (; _ < S && o < C && this.ElementsAreEqual(_ + 1, o + 1); )
                _++, o++
              if (
                ((L[B] = _),
                _ + o > O + e && ((O = _), (e = o)),
                !k && Math.abs(B - R) <= F - 1 && _ >= A[B])
              )
                return (
                  (n[0] = _),
                  (r[0] = o),
                  Q <= A[B] && 1447 > 0 && F <= 1447 + 1
                    ? this.WALKTRACE(
                        M,
                        i,
                        f,
                        D,
                        R,
                        b,
                        N,
                        T,
                        L,
                        A,
                        _,
                        S,
                        n,
                        o,
                        C,
                        r,
                        k,
                        m
                      )
                    : null
                )
            }
            const H = (O - a + (e - v) - F) / 2
            if (
              this.ContinueProcessingPredicate !== null &&
              !this.ContinueProcessingPredicate(O, H)
            )
              return (
                (m[0] = !0),
                (n[0] = O),
                (r[0] = e),
                H > 0 && 1447 > 0 && F <= 1447 + 1
                  ? this.WALKTRACE(
                      M,
                      i,
                      f,
                      D,
                      R,
                      b,
                      N,
                      T,
                      L,
                      A,
                      _,
                      S,
                      n,
                      o,
                      C,
                      r,
                      k,
                      m
                    )
                  : (a++, v++, [new p.DiffChange(a, S - a + 1, v, C - v + 1)])
              )
            ;(b = this.ClipDiagonalBound(R - F, F, R, g)),
              (N = this.ClipDiagonalBound(R + F, F, R, g))
            for (let B = b; B <= N; B += 2) {
              B === b || (B < N && A[B - 1] >= A[B + 1])
                ? (_ = A[B + 1] - 1)
                : (_ = A[B - 1]),
                (o = _ - (B - R) - T)
              const Q = _
              for (; _ > a && o > v && this.ElementsAreEqual(_, o); ) _--, o--
              if (((A[B] = _), k && Math.abs(B - M) <= F && _ <= L[B]))
                return (
                  (n[0] = _),
                  (r[0] = o),
                  Q >= L[B] && 1447 > 0 && F <= 1447 + 1
                    ? this.WALKTRACE(
                        M,
                        i,
                        f,
                        D,
                        R,
                        b,
                        N,
                        T,
                        L,
                        A,
                        _,
                        S,
                        n,
                        o,
                        C,
                        r,
                        k,
                        m
                      )
                    : null
                )
            }
            if (F <= 1447) {
              let B = new Int32Array(f - i + 2)
              ;(B[0] = M - i + 1),
                l.Copy2(L, i, B, 1, f - i + 1),
                this.m_forwardHistory.push(B),
                (B = new Int32Array(N - b + 2)),
                (B[0] = R - b + 1),
                l.Copy2(A, b, B, 1, N - b + 1),
                this.m_reverseHistory.push(B)
            }
          }
          return this.WALKTRACE(
            M,
            i,
            f,
            D,
            R,
            b,
            N,
            T,
            L,
            A,
            _,
            S,
            n,
            o,
            C,
            r,
            k,
            m
          )
        }
        PrettifyChanges(a) {
          for (let S = 0; S < a.length; S++) {
            const v = a[S],
              C =
                S < a.length - 1
                  ? a[S + 1].originalStart
                  : this._originalElementsOrHash.length,
              n =
                S < a.length - 1
                  ? a[S + 1].modifiedStart
                  : this._modifiedElementsOrHash.length,
              r = v.originalLength > 0,
              m = v.modifiedLength > 0
            for (
              ;
              v.originalStart + v.originalLength < C &&
              v.modifiedStart + v.modifiedLength < n &&
              (!r ||
                this.OriginalElementsAreEqual(
                  v.originalStart,
                  v.originalStart + v.originalLength
                )) &&
              (!m ||
                this.ModifiedElementsAreEqual(
                  v.modifiedStart,
                  v.modifiedStart + v.modifiedLength
                ));

            )
              v.originalStart++, v.modifiedStart++
            let _ = [null]
            if (S < a.length - 1 && this.ChangesOverlap(a[S], a[S + 1], _)) {
              ;(a[S] = _[0]), a.splice(S + 1, 1), S--
              continue
            }
          }
          for (let S = a.length - 1; S >= 0; S--) {
            const v = a[S]
            let C = 0,
              n = 0
            if (S > 0) {
              const i = a[S - 1]
              i.originalLength > 0 && (C = i.originalStart + i.originalLength),
                i.modifiedLength > 0 && (n = i.modifiedStart + i.modifiedLength)
            }
            const r = v.originalLength > 0,
              m = v.modifiedLength > 0
            let _ = 0,
              o = this._boundaryScore(
                v.originalStart,
                v.originalLength,
                v.modifiedStart,
                v.modifiedLength
              )
            for (let i = 1; ; i++) {
              const f = v.originalStart - i,
                b = v.modifiedStart - i
              if (
                f < C ||
                b < n ||
                (r &&
                  !this.OriginalElementsAreEqual(f, f + v.originalLength)) ||
                (m && !this.ModifiedElementsAreEqual(b, b + v.modifiedLength))
              )
                break
              const N = this._boundaryScore(
                f,
                v.originalLength,
                b,
                v.modifiedLength
              )
              N > o && ((o = N), (_ = i))
            }
            ;(v.originalStart -= _), (v.modifiedStart -= _)
          }
          if (this._hasStrings)
            for (let S = 1, v = a.length; S < v; S++) {
              const C = a[S - 1],
                n = a[S],
                r = n.originalStart - C.originalStart - C.originalLength,
                m = C.originalStart,
                _ = n.originalStart + n.originalLength,
                o = _ - m,
                i = C.modifiedStart,
                f = n.modifiedStart + n.modifiedLength,
                b = f - i
              if (r < 5 && o < 20 && b < 20) {
                const N = this._findBetterContiguousSequence(m, o, i, b, r)
                if (N) {
                  const [c, g] = N
                  ;(c !== C.originalStart + C.originalLength ||
                    g !== C.modifiedStart + C.modifiedLength) &&
                    ((C.originalLength = c - C.originalStart),
                    (C.modifiedLength = g - C.modifiedStart),
                    (n.originalStart = c + r),
                    (n.modifiedStart = g + r),
                    (n.originalLength = _ - n.originalStart),
                    (n.modifiedLength = f - n.modifiedStart))
                }
              }
            }
          return a
        }
        _findBetterContiguousSequence(a, S, v, C, n) {
          if (S < n || C < n) return null
          const r = a + S - n + 1,
            m = v + C - n + 1
          let _ = 0,
            o = 0,
            i = 0
          for (let f = a; f < r; f++)
            for (let b = v; b < m; b++) {
              const N = this._contiguousSequenceScore(f, b, n)
              N > 0 && N > _ && ((_ = N), (o = f), (i = b))
            }
          return _ > 0 ? [o, i] : null
        }
        _contiguousSequenceScore(a, S, v) {
          let C = 0
          for (let n = 0; n < v; n++) {
            if (!this.ElementsAreEqual(a + n, S + n)) return 0
            C += this._originalStringElements[a + n].length
          }
          return C
        }
        _OriginalIsBoundary(a) {
          return a <= 0 || a >= this._originalElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._originalStringElements[a])
        }
        _OriginalRegionIsBoundary(a, S) {
          if (this._OriginalIsBoundary(a) || this._OriginalIsBoundary(a - 1))
            return !0
          if (S > 0) {
            const v = a + S
            if (this._OriginalIsBoundary(v - 1) || this._OriginalIsBoundary(v))
              return !0
          }
          return !1
        }
        _ModifiedIsBoundary(a) {
          return a <= 0 || a >= this._modifiedElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[a])
        }
        _ModifiedRegionIsBoundary(a, S) {
          if (this._ModifiedIsBoundary(a) || this._ModifiedIsBoundary(a - 1))
            return !0
          if (S > 0) {
            const v = a + S
            if (this._ModifiedIsBoundary(v - 1) || this._ModifiedIsBoundary(v))
              return !0
          }
          return !1
        }
        _boundaryScore(a, S, v, C) {
          const n = this._OriginalRegionIsBoundary(a, S) ? 1 : 0,
            r = this._ModifiedRegionIsBoundary(v, C) ? 1 : 0
          return n + r
        }
        ConcatenateChanges(a, S) {
          let v = []
          if (a.length === 0 || S.length === 0) return S.length > 0 ? S : a
          if (this.ChangesOverlap(a[a.length - 1], S[0], v)) {
            const C = new Array(a.length + S.length - 1)
            return (
              l.Copy(a, 0, C, 0, a.length - 1),
              (C[a.length - 1] = v[0]),
              l.Copy(S, 1, C, a.length, S.length - 1),
              C
            )
          } else {
            const C = new Array(a.length + S.length)
            return (
              l.Copy(a, 0, C, 0, a.length),
              l.Copy(S, 0, C, a.length, S.length),
              C
            )
          }
        }
        ChangesOverlap(a, S, v) {
          if (
            (d.Assert(
              a.originalStart <= S.originalStart,
              'Left change is not less than or equal to right change'
            ),
            d.Assert(
              a.modifiedStart <= S.modifiedStart,
              'Left change is not less than or equal to right change'
            ),
            a.originalStart + a.originalLength >= S.originalStart ||
              a.modifiedStart + a.modifiedLength >= S.modifiedStart)
          ) {
            const C = a.originalStart
            let n = a.originalLength
            const r = a.modifiedStart
            let m = a.modifiedLength
            return (
              a.originalStart + a.originalLength >= S.originalStart &&
                (n = S.originalStart + S.originalLength - a.originalStart),
              a.modifiedStart + a.modifiedLength >= S.modifiedStart &&
                (m = S.modifiedStart + S.modifiedLength - a.modifiedStart),
              (v[0] = new p.DiffChange(C, n, r, m)),
              !0
            )
          } else return (v[0] = null), !1
        }
        ClipDiagonalBound(a, S, v, C) {
          if (a >= 0 && a < C) return a
          const n = v,
            r = C - v - 1,
            m = S % 2 == 0
          if (a < 0) {
            const _ = n % 2 == 0
            return m === _ ? 0 : 1
          } else {
            const _ = r % 2 == 0
            return m === _ ? C - 1 : C - 2
          }
        }
      }
      t.LcsDiff = h
    }),
    V(z[11], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.withNullAsUndefined = t.createProxyObject = t.getAllMethodNames = t.getAllPropertyNames = t.validateConstraint = t.validateConstraints = t.isFunction = t.assertIsDefined = t.assertType = t.isUndefinedOrNull = t.isUndefined = t.isBoolean = t.isNumber = t.isObject = t.isString = t.isArray = void 0)
      function p(_) {
        return Array.isArray(_)
      }
      t.isArray = p
      function P(_) {
        return typeof _ == 'string'
      }
      t.isString = P
      function E(_) {
        return (
          typeof _ == 'object' &&
          _ !== null &&
          !Array.isArray(_) &&
          !(_ instanceof RegExp) &&
          !(_ instanceof Date)
        )
      }
      t.isObject = E
      function u(_) {
        return typeof _ == 'number' && !isNaN(_)
      }
      t.isNumber = u
      function d(_) {
        return _ === !0 || _ === !1
      }
      t.isBoolean = d
      function l(_) {
        return typeof _ == 'undefined'
      }
      t.isUndefined = l
      function s(_) {
        return l(_) || _ === null
      }
      t.isUndefinedOrNull = s
      function h(_, o) {
        if (!_)
          throw new Error(
            o ? `Unexpected type, expected '${o}'` : 'Unexpected type'
          )
      }
      t.assertType = h
      function w(_) {
        if (s(_))
          throw new Error('Assertion Failed: argument is undefined or null')
        return _
      }
      t.assertIsDefined = w
      function a(_) {
        return typeof _ == 'function'
      }
      t.isFunction = a
      function S(_, o) {
        const i = Math.min(_.length, o.length)
        for (let f = 0; f < i; f++) v(_[f], o[f])
      }
      t.validateConstraints = S
      function v(_, o) {
        if (P(o)) {
          if (typeof _ !== o)
            throw new Error(`argument does not match constraint: typeof ${o}`)
        } else if (a(o)) {
          try {
            if (_ instanceof o) return
          } catch (i) {}
          if (
            (!s(_) && _.constructor === o) ||
            (o.length === 1 && o.call(void 0, _) === !0)
          )
            return
          throw new Error(
            'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true'
          )
        }
      }
      t.validateConstraint = v
      function C(_) {
        let o = [],
          i = Object.getPrototypeOf(_)
        for (; Object.prototype !== i; )
          (o = o.concat(Object.getOwnPropertyNames(i))),
            (i = Object.getPrototypeOf(i))
        return o
      }
      t.getAllPropertyNames = C
      function n(_) {
        const o = []
        for (const i of C(_)) typeof _[i] == 'function' && o.push(i)
        return o
      }
      t.getAllMethodNames = n
      function r(_, o) {
        const i = b =>
          function() {
            const N = Array.prototype.slice.call(arguments, 0)
            return o(b, N)
          }
        let f = {}
        for (const b of _) f[b] = i(b)
        return f
      }
      t.createProxyObject = r
      function m(_) {
        return _ === null ? void 0 : _
      }
      t.withNullAsUndefined = m
    }),
    V(z[12], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.toUint32 = t.toUint8 = void 0)
      function p(E) {
        return E < 0 ? 0 : E > 255 ? 255 : E | 0
      }
      t.toUint8 = p
      function P(E) {
        return E < 0 ? 0 : E > 4294967295 ? 4294967295 : E | 0
      }
      t.toUint32 = P
    }),
    V(z[13], G([0, 1, 2, 20]), function(I, t, p, P) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.uriToFsPath = t.URI = void 0)
      const E = /^\w[\w\d+.-]*$/,
        u = /^\//,
        d = /^\/\//
      function l(c, g) {
        if (!c.scheme && g)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${c.authority}", path: "${c.path}", query: "${c.query}", fragment: "${c.fragment}"}`
          )
        if (c.scheme && !E.test(c.scheme))
          throw new Error('[UriError]: Scheme contains illegal characters.')
        if (c.path) {
          if (c.authority) {
            if (!u.test(c.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
              )
          } else if (d.test(c.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
            )
        }
      }
      function s(c, g) {
        return !c && !g ? 'file' : c
      }
      function h(c, g) {
        switch (c) {
          case 'https':
          case 'http':
          case 'file':
            g ? g[0] !== a && (g = a + g) : (g = a)
            break
        }
        return g
      }
      const w = '',
        a = '/',
        S = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
      class v {
        constructor(g, L, A, M, R, D = !1) {
          typeof g == 'object'
            ? ((this.scheme = g.scheme || w),
              (this.authority = g.authority || w),
              (this.path = g.path || w),
              (this.query = g.query || w),
              (this.fragment = g.fragment || w))
            : ((this.scheme = s(g, D)),
              (this.authority = L || w),
              (this.path = h(this.scheme, A || w)),
              (this.query = M || w),
              (this.fragment = R || w),
              l(this, D))
        }
        static isUri(g) {
          return g instanceof v
            ? !0
            : g
            ? typeof g.authority == 'string' &&
              typeof g.fragment == 'string' &&
              typeof g.path == 'string' &&
              typeof g.query == 'string' &&
              typeof g.scheme == 'string' &&
              typeof g.fsPath == 'string' &&
              typeof g.with == 'function' &&
              typeof g.toString == 'function'
            : !1
        }
        get fsPath() {
          return o(this, !1)
        }
        with(g) {
          if (!g) return this
          let { scheme: L, authority: A, path: M, query: R, fragment: D } = g
          return (
            L === void 0 ? (L = this.scheme) : L === null && (L = w),
            A === void 0 ? (A = this.authority) : A === null && (A = w),
            M === void 0 ? (M = this.path) : M === null && (M = w),
            R === void 0 ? (R = this.query) : R === null && (R = w),
            D === void 0 ? (D = this.fragment) : D === null && (D = w),
            L === this.scheme &&
            A === this.authority &&
            M === this.path &&
            R === this.query &&
            D === this.fragment
              ? this
              : new n(L, A, M, R, D)
          )
        }
        static parse(g, L = !1) {
          const A = S.exec(g)
          return A
            ? new n(
                A[2] || w,
                N(A[4] || w),
                N(A[5] || w),
                N(A[7] || w),
                N(A[9] || w),
                L
              )
            : new n(w, w, w, w, w)
        }
        static file(g) {
          let L = w
          if (
            (p.isWindows && (g = g.replace(/\\/g, a)), g[0] === a && g[1] === a)
          ) {
            const A = g.indexOf(a, 2)
            A === -1
              ? ((L = g.substring(2)), (g = a))
              : ((L = g.substring(2, A)), (g = g.substring(A) || a))
          }
          return new n('file', L, g, w, w)
        }
        static from(g) {
          return new n(g.scheme, g.authority, g.path, g.query, g.fragment)
        }
        static joinPath(g, ...L) {
          if (!g.path)
            throw new Error(
              '[UriError]: cannot call joinPath on URI without path'
            )
          let A
          return (
            p.isWindows && g.scheme === 'file'
              ? (A = v.file(P.win32.join(o(g, !0), ...L)).path)
              : (A = P.posix.join(g.path, ...L)),
            g.with({ path: A })
          )
        }
        toString(g = !1) {
          return i(this, g)
        }
        toJSON() {
          return this
        }
        static revive(g) {
          if (g) {
            if (g instanceof v) return g
            {
              const L = new n(g)
              return (
                (L._formatted = g.external),
                (L._fsPath = g._sep === C ? g.fsPath : null),
                L
              )
            }
          } else return g
        }
      }
      t.URI = v
      const C = p.isWindows ? 1 : void 0
      class n extends v {
        constructor() {
          super(...arguments)
          ;(this._formatted = null), (this._fsPath = null)
        }
        get fsPath() {
          return this._fsPath || (this._fsPath = o(this, !1)), this._fsPath
        }
        toString(g = !1) {
          return g
            ? i(this, !0)
            : (this._formatted || (this._formatted = i(this, !1)),
              this._formatted)
        }
        toJSON() {
          const g = { $mid: 1 }
          return (
            this._fsPath && ((g.fsPath = this._fsPath), (g._sep = C)),
            this._formatted && (g.external = this._formatted),
            this.path && (g.path = this.path),
            this.scheme && (g.scheme = this.scheme),
            this.authority && (g.authority = this.authority),
            this.query && (g.query = this.query),
            this.fragment && (g.fragment = this.fragment),
            g
          )
        }
      }
      const r = {
        [58]: '%3A',
        [47]: '%2F',
        [63]: '%3F',
        [35]: '%23',
        [91]: '%5B',
        [93]: '%5D',
        [64]: '%40',
        [33]: '%21',
        [36]: '%24',
        [38]: '%26',
        [39]: '%27',
        [40]: '%28',
        [41]: '%29',
        [42]: '%2A',
        [43]: '%2B',
        [44]: '%2C',
        [59]: '%3B',
        [61]: '%3D',
        [32]: '%20'
      }
      function m(c, g) {
        let L,
          A = -1
        for (let M = 0; M < c.length; M++) {
          const R = c.charCodeAt(M)
          if (
            (R >= 97 && R <= 122) ||
            (R >= 65 && R <= 90) ||
            (R >= 48 && R <= 57) ||
            R === 45 ||
            R === 46 ||
            R === 95 ||
            R === 126 ||
            (g && R === 47)
          )
            A !== -1 &&
              ((L += encodeURIComponent(c.substring(A, M))), (A = -1)),
              L !== void 0 && (L += c.charAt(M))
          else {
            L === void 0 && (L = c.substr(0, M))
            const D = r[R]
            D !== void 0
              ? (A !== -1 &&
                  ((L += encodeURIComponent(c.substring(A, M))), (A = -1)),
                (L += D))
              : A === -1 && (A = M)
          }
        }
        return (
          A !== -1 && (L += encodeURIComponent(c.substring(A))),
          L !== void 0 ? L : c
        )
      }
      function _(c) {
        let g
        for (let L = 0; L < c.length; L++) {
          const A = c.charCodeAt(L)
          A === 35 || A === 63
            ? (g === void 0 && (g = c.substr(0, L)), (g += r[A]))
            : g !== void 0 && (g += c[L])
        }
        return g !== void 0 ? g : c
      }
      function o(c, g) {
        let L
        return (
          c.authority && c.path.length > 1 && c.scheme === 'file'
            ? (L = `//${c.authority}${c.path}`)
            : c.path.charCodeAt(0) === 47 &&
              ((c.path.charCodeAt(1) >= 65 && c.path.charCodeAt(1) <= 90) ||
                (c.path.charCodeAt(1) >= 97 && c.path.charCodeAt(1) <= 122)) &&
              c.path.charCodeAt(2) === 58
            ? g
              ? (L = c.path.substr(1))
              : (L = c.path[1].toLowerCase() + c.path.substr(2))
            : (L = c.path),
          p.isWindows && (L = L.replace(/\//g, '\\')),
          L
        )
      }
      t.uriToFsPath = o
      function i(c, g) {
        const L = g ? _ : m
        let A = '',
          { scheme: M, authority: R, path: D, query: T, fragment: $ } = c
        if (
          (M && ((A += M), (A += ':')),
          (R || M === 'file') && ((A += a), (A += a)),
          R)
        ) {
          let k = R.indexOf('@')
          if (k !== -1) {
            const F = R.substr(0, k)
            ;(R = R.substr(k + 1)),
              (k = F.indexOf(':')),
              k === -1
                ? (A += L(F, !1))
                : ((A += L(F.substr(0, k), !1)),
                  (A += ':'),
                  (A += L(F.substr(k + 1), !1))),
              (A += '@')
          }
          ;(R = R.toLowerCase()),
            (k = R.indexOf(':')),
            k === -1
              ? (A += L(R, !1))
              : ((A += L(R.substr(0, k), !1)), (A += R.substr(k)))
        }
        if (D) {
          if (
            D.length >= 3 &&
            D.charCodeAt(0) === 47 &&
            D.charCodeAt(2) === 58
          ) {
            const k = D.charCodeAt(1)
            k >= 65 &&
              k <= 90 &&
              (D = `/${String.fromCharCode(k + 32)}:${D.substr(3)}`)
          } else if (D.length >= 2 && D.charCodeAt(1) === 58) {
            const k = D.charCodeAt(0)
            k >= 65 &&
              k <= 90 &&
              (D = `${String.fromCharCode(k + 32)}:${D.substr(2)}`)
          }
          A += L(D, !0)
        }
        return (
          T && ((A += '?'), (A += L(T, !1))),
          $ && ((A += '#'), (A += g ? $ : m($, !1))),
          A
        )
      }
      function f(c) {
        try {
          return decodeURIComponent(c)
        } catch (g) {
          return c.length > 3 ? c.substr(0, 3) + f(c.substr(3)) : c
        }
      }
      const b = /(%[0-9A-Za-z][0-9A-Za-z])+/g
      function N(c) {
        return c.match(b) ? c.replace(b, g => f(g)) : c
      }
    }),
    V(z[34], G([0, 1, 4, 7, 2, 11]), function(I, t, p, P, E, u) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.create = t.SimpleWorkerServer = t.SimpleWorkerClient = t.logOnceWebWorkerWarning = void 0)
      const d = '$initialize'
      let l = !1
      function s(v) {
        !E.isWeb ||
          (l ||
            ((l = !0),
            console.warn(
              'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq'
            )),
          console.warn(v.message))
      }
      t.logOnceWebWorkerWarning = s
      class h {
        constructor(C) {
          ;(this._workerId = -1),
            (this._handler = C),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null))
        }
        setWorkerId(C) {
          this._workerId = C
        }
        sendMessage(C, n) {
          let r = String(++this._lastSentReq)
          return new Promise((m, _) => {
            ;(this._pendingReplies[r] = { resolve: m, reject: _ }),
              this._send({
                vsWorker: this._workerId,
                req: r,
                method: C,
                args: n
              })
          })
        }
        handleMessage(C) {
          !C ||
            !C.vsWorker ||
            (this._workerId !== -1 && C.vsWorker !== this._workerId) ||
            this._handleMessage(C)
        }
        _handleMessage(C) {
          if (C.seq) {
            let _ = C
            if (!this._pendingReplies[_.seq]) {
              console.warn('Got reply to unknown seq')
              return
            }
            let o = this._pendingReplies[_.seq]
            if ((delete this._pendingReplies[_.seq], _.err)) {
              let i = _.err
              _.err.$isError &&
                ((i = new Error()),
                (i.name = _.err.name),
                (i.message = _.err.message),
                (i.stack = _.err.stack)),
                o.reject(i)
              return
            }
            o.resolve(_.res)
            return
          }
          let n = C,
            r = n.req
          this._handler.handleMessage(n.method, n.args).then(
            _ => {
              this._send({
                vsWorker: this._workerId,
                seq: r,
                res: _,
                err: void 0
              })
            },
            _ => {
              _.detail instanceof Error &&
                (_.detail = p.transformErrorForSerialization(_.detail)),
                this._send({
                  vsWorker: this._workerId,
                  seq: r,
                  res: void 0,
                  err: p.transformErrorForSerialization(_)
                })
            }
          )
        }
        _send(C) {
          let n = []
          if (C.req) {
            const r = C
            for (let m = 0; m < r.args.length; m++)
              r.args[m] instanceof ArrayBuffer && n.push(r.args[m])
          } else {
            const r = C
            r.res instanceof ArrayBuffer && n.push(r.res)
          }
          this._handler.sendMessage(C, n)
        }
      }
      class w extends P.Disposable {
        constructor(C, n, r) {
          super()
          let m = null
          ;(this._worker = this._register(
            C.create(
              'vs/base/common/worker/simpleWorker',
              f => {
                this._protocol.handleMessage(f)
              },
              f => {
                m && m(f)
              }
            )
          )),
            (this._protocol = new h({
              sendMessage: (f, b) => {
                this._worker.postMessage(f, b)
              },
              handleMessage: (f, b) => {
                if (typeof r[f] != 'function')
                  return Promise.reject(
                    new Error('Missing method ' + f + ' on main thread host.')
                  )
                try {
                  return Promise.resolve(r[f].apply(r, b))
                } catch (N) {
                  return Promise.reject(N)
                }
              }
            })),
            this._protocol.setWorkerId(this._worker.getId())
          let _ = null
          typeof self.require != 'undefined' &&
          typeof self.require.getConfig == 'function'
            ? (_ = self.require.getConfig())
            : typeof self.requirejs != 'undefined' &&
              (_ = self.requirejs.s.contexts._.config)
          const o = u.getAllMethodNames(r)
          this._onModuleLoaded = this._protocol.sendMessage(d, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(_)),
            n,
            o
          ])
          const i = (f, b) => this._request(f, b)
          this._lazyProxy = new Promise((f, b) => {
            ;(m = b),
              this._onModuleLoaded.then(
                N => {
                  f(u.createProxyObject(N, i))
                },
                N => {
                  b(N), this._onError('Worker failed to load ' + n, N)
                }
              )
          })
        }
        getProxyObject() {
          return this._lazyProxy
        }
        _request(C, n) {
          return new Promise((r, m) => {
            this._onModuleLoaded.then(() => {
              this._protocol.sendMessage(C, n).then(r, m)
            }, m)
          })
        }
        _onError(C, n) {
          console.error(C), console.info(n)
        }
      }
      t.SimpleWorkerClient = w
      class a {
        constructor(C, n) {
          ;(this._requestHandlerFactory = n),
            (this._requestHandler = null),
            (this._protocol = new h({
              sendMessage: (r, m) => {
                C(r, m)
              },
              handleMessage: (r, m) => this._handleMessage(r, m)
            }))
        }
        onmessage(C) {
          this._protocol.handleMessage(C)
        }
        _handleMessage(C, n) {
          if (C === d) return this.initialize(n[0], n[1], n[2], n[3])
          if (
            !this._requestHandler ||
            typeof this._requestHandler[C] != 'function'
          )
            return Promise.reject(
              new Error('Missing requestHandler or method: ' + C)
            )
          try {
            return Promise.resolve(
              this._requestHandler[C].apply(this._requestHandler, n)
            )
          } catch (r) {
            return Promise.reject(r)
          }
        }
        initialize(C, n, r, m) {
          this._protocol.setWorkerId(C)
          const _ = (i, f) => this._protocol.sendMessage(i, f),
            o = u.createProxyObject(m, _)
          return this._requestHandlerFactory
            ? ((this._requestHandler = this._requestHandlerFactory(o)),
              Promise.resolve(u.getAllMethodNames(this._requestHandler)))
            : (n &&
                (typeof n.baseUrl != 'undefined' && delete n.baseUrl,
                typeof n.paths != 'undefined' &&
                  typeof n.paths.vs != 'undefined' &&
                  delete n.paths.vs,
                typeof n.trustedTypesPolicy !== void 0 &&
                  delete n.trustedTypesPolicy,
                (n.catchError = !0),
                self.require.config(n)),
              new Promise((i, f) => {
                self.require(
                  [r],
                  b => {
                    if (
                      ((this._requestHandler = b.create(o)),
                      !this._requestHandler)
                    ) {
                      f(new Error('No RequestHandler!'))
                      return
                    }
                    i(u.getAllMethodNames(this._requestHandler))
                  },
                  f
                )
              }))
        }
      }
      t.SimpleWorkerServer = a
      function S(v) {
        return new a(v, null)
      }
      t.create = S
    }),
    V(z[23], G([0, 1, 12]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.CharacterSet = t.CharacterClassifier = void 0)
      class P {
        constructor(d) {
          let l = p.toUint8(d)
          ;(this._defaultValue = l),
            (this._asciiMap = P._createAsciiMap(l)),
            (this._map = new Map())
        }
        static _createAsciiMap(d) {
          let l = new Uint8Array(256)
          for (let s = 0; s < 256; s++) l[s] = d
          return l
        }
        set(d, l) {
          let s = p.toUint8(l)
          d >= 0 && d < 256 ? (this._asciiMap[d] = s) : this._map.set(d, s)
        }
        get(d) {
          return d >= 0 && d < 256
            ? this._asciiMap[d]
            : this._map.get(d) || this._defaultValue
        }
      }
      t.CharacterClassifier = P
      class E {
        constructor() {
          this._actual = new P(0)
        }
        add(d) {
          this._actual.set(d, 1)
        }
        has(d) {
          return this._actual.get(d) === 1
        }
      }
      t.CharacterSet = E
    }),
    V(z[3], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Position = void 0)
      class p {
        constructor(E, u) {
          ;(this.lineNumber = E), (this.column = u)
        }
        with(E = this.lineNumber, u = this.column) {
          return E === this.lineNumber && u === this.column ? this : new p(E, u)
        }
        delta(E = 0, u = 0) {
          return this.with(this.lineNumber + E, this.column + u)
        }
        equals(E) {
          return p.equals(this, E)
        }
        static equals(E, u) {
          return !E && !u
            ? !0
            : !!E &&
                !!u &&
                E.lineNumber === u.lineNumber &&
                E.column === u.column
        }
        isBefore(E) {
          return p.isBefore(this, E)
        }
        static isBefore(E, u) {
          return E.lineNumber < u.lineNumber
            ? !0
            : u.lineNumber < E.lineNumber
            ? !1
            : E.column < u.column
        }
        isBeforeOrEqual(E) {
          return p.isBeforeOrEqual(this, E)
        }
        static isBeforeOrEqual(E, u) {
          return E.lineNumber < u.lineNumber
            ? !0
            : u.lineNumber < E.lineNumber
            ? !1
            : E.column <= u.column
        }
        static compare(E, u) {
          let d = E.lineNumber | 0,
            l = u.lineNumber | 0
          if (d === l) {
            let s = E.column | 0,
              h = u.column | 0
            return s - h
          }
          return d - l
        }
        clone() {
          return new p(this.lineNumber, this.column)
        }
        toString() {
          return '(' + this.lineNumber + ',' + this.column + ')'
        }
        static lift(E) {
          return new p(E.lineNumber, E.column)
        }
        static isIPosition(E) {
          return (
            E && typeof E.lineNumber == 'number' && typeof E.column == 'number'
          )
        }
      }
      t.Position = p
    }),
    V(z[6], G([0, 1, 3]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.Range = void 0)
      class P {
        constructor(u, d, l, s) {
          u > l || (u === l && d > s)
            ? ((this.startLineNumber = l),
              (this.startColumn = s),
              (this.endLineNumber = u),
              (this.endColumn = d))
            : ((this.startLineNumber = u),
              (this.startColumn = d),
              (this.endLineNumber = l),
              (this.endColumn = s))
        }
        isEmpty() {
          return P.isEmpty(this)
        }
        static isEmpty(u) {
          return (
            u.startLineNumber === u.endLineNumber &&
            u.startColumn === u.endColumn
          )
        }
        containsPosition(u) {
          return P.containsPosition(this, u)
        }
        static containsPosition(u, d) {
          return !(
            d.lineNumber < u.startLineNumber ||
            d.lineNumber > u.endLineNumber ||
            (d.lineNumber === u.startLineNumber && d.column < u.startColumn) ||
            (d.lineNumber === u.endLineNumber && d.column > u.endColumn)
          )
        }
        containsRange(u) {
          return P.containsRange(this, u)
        }
        static containsRange(u, d) {
          return !(
            d.startLineNumber < u.startLineNumber ||
            d.endLineNumber < u.startLineNumber ||
            d.startLineNumber > u.endLineNumber ||
            d.endLineNumber > u.endLineNumber ||
            (d.startLineNumber === u.startLineNumber &&
              d.startColumn < u.startColumn) ||
            (d.endLineNumber === u.endLineNumber && d.endColumn > u.endColumn)
          )
        }
        strictContainsRange(u) {
          return P.strictContainsRange(this, u)
        }
        static strictContainsRange(u, d) {
          return !(
            d.startLineNumber < u.startLineNumber ||
            d.endLineNumber < u.startLineNumber ||
            d.startLineNumber > u.endLineNumber ||
            d.endLineNumber > u.endLineNumber ||
            (d.startLineNumber === u.startLineNumber &&
              d.startColumn <= u.startColumn) ||
            (d.endLineNumber === u.endLineNumber && d.endColumn >= u.endColumn)
          )
        }
        plusRange(u) {
          return P.plusRange(this, u)
        }
        static plusRange(u, d) {
          let l, s, h, w
          return (
            d.startLineNumber < u.startLineNumber
              ? ((l = d.startLineNumber), (s = d.startColumn))
              : d.startLineNumber === u.startLineNumber
              ? ((l = d.startLineNumber),
                (s = Math.min(d.startColumn, u.startColumn)))
              : ((l = u.startLineNumber), (s = u.startColumn)),
            d.endLineNumber > u.endLineNumber
              ? ((h = d.endLineNumber), (w = d.endColumn))
              : d.endLineNumber === u.endLineNumber
              ? ((h = d.endLineNumber),
                (w = Math.max(d.endColumn, u.endColumn)))
              : ((h = u.endLineNumber), (w = u.endColumn)),
            new P(l, s, h, w)
          )
        }
        intersectRanges(u) {
          return P.intersectRanges(this, u)
        }
        static intersectRanges(u, d) {
          let l = u.startLineNumber,
            s = u.startColumn,
            h = u.endLineNumber,
            w = u.endColumn,
            a = d.startLineNumber,
            S = d.startColumn,
            v = d.endLineNumber,
            C = d.endColumn
          return (
            l < a ? ((l = a), (s = S)) : l === a && (s = Math.max(s, S)),
            h > v ? ((h = v), (w = C)) : h === v && (w = Math.min(w, C)),
            l > h || (l === h && s > w) ? null : new P(l, s, h, w)
          )
        }
        equalsRange(u) {
          return P.equalsRange(this, u)
        }
        static equalsRange(u, d) {
          return (
            !!u &&
            !!d &&
            u.startLineNumber === d.startLineNumber &&
            u.startColumn === d.startColumn &&
            u.endLineNumber === d.endLineNumber &&
            u.endColumn === d.endColumn
          )
        }
        getEndPosition() {
          return P.getEndPosition(this)
        }
        static getEndPosition(u) {
          return new p.Position(u.endLineNumber, u.endColumn)
        }
        getStartPosition() {
          return P.getStartPosition(this)
        }
        static getStartPosition(u) {
          return new p.Position(u.startLineNumber, u.startColumn)
        }
        toString() {
          return (
            '[' +
            this.startLineNumber +
            ',' +
            this.startColumn +
            ' -> ' +
            this.endLineNumber +
            ',' +
            this.endColumn +
            ']'
          )
        }
        setEndPosition(u, d) {
          return new P(this.startLineNumber, this.startColumn, u, d)
        }
        setStartPosition(u, d) {
          return new P(u, d, this.endLineNumber, this.endColumn)
        }
        collapseToStart() {
          return P.collapseToStart(this)
        }
        static collapseToStart(u) {
          return new P(
            u.startLineNumber,
            u.startColumn,
            u.startLineNumber,
            u.startColumn
          )
        }
        static fromPositions(u, d = u) {
          return new P(u.lineNumber, u.column, d.lineNumber, d.column)
        }
        static lift(u) {
          return u
            ? new P(
                u.startLineNumber,
                u.startColumn,
                u.endLineNumber,
                u.endColumn
              )
            : null
        }
        static isIRange(u) {
          return (
            u &&
            typeof u.startLineNumber == 'number' &&
            typeof u.startColumn == 'number' &&
            typeof u.endLineNumber == 'number' &&
            typeof u.endColumn == 'number'
          )
        }
        static areIntersectingOrTouching(u, d) {
          return !(
            u.endLineNumber < d.startLineNumber ||
            (u.endLineNumber === d.startLineNumber &&
              u.endColumn < d.startColumn) ||
            d.endLineNumber < u.startLineNumber ||
            (d.endLineNumber === u.startLineNumber &&
              d.endColumn < u.startColumn)
          )
        }
        static areIntersecting(u, d) {
          return !(
            u.endLineNumber < d.startLineNumber ||
            (u.endLineNumber === d.startLineNumber &&
              u.endColumn <= d.startColumn) ||
            d.endLineNumber < u.startLineNumber ||
            (d.endLineNumber === u.startLineNumber &&
              d.endColumn <= u.startColumn)
          )
        }
        static compareRangesUsingStarts(u, d) {
          if (u && d) {
            const h = u.startLineNumber | 0,
              w = d.startLineNumber | 0
            if (h === w) {
              const a = u.startColumn | 0,
                S = d.startColumn | 0
              if (a === S) {
                const v = u.endLineNumber | 0,
                  C = d.endLineNumber | 0
                if (v === C) {
                  const n = u.endColumn | 0,
                    r = d.endColumn | 0
                  return n - r
                }
                return v - C
              }
              return a - S
            }
            return h - w
          }
          return (u ? 1 : 0) - (d ? 1 : 0)
        }
        static compareRangesUsingEnds(u, d) {
          return u.endLineNumber === d.endLineNumber
            ? u.endColumn === d.endColumn
              ? u.startLineNumber === d.startLineNumber
                ? u.startColumn - d.startColumn
                : u.startLineNumber - d.startLineNumber
              : u.endColumn - d.endColumn
            : u.endLineNumber - d.endLineNumber
        }
        static spansMultipleLines(u) {
          return u.endLineNumber > u.startLineNumber
        }
      }
      t.Range = P
    }),
    V(z[24], G([0, 1, 3, 6]), function(I, t, p, P) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Selection = void 0)
      class E extends P.Range {
        constructor(d, l, s, h) {
          super(d, l, s, h)
          ;(this.selectionStartLineNumber = d),
            (this.selectionStartColumn = l),
            (this.positionLineNumber = s),
            (this.positionColumn = h)
        }
        toString() {
          return (
            '[' +
            this.selectionStartLineNumber +
            ',' +
            this.selectionStartColumn +
            ' -> ' +
            this.positionLineNumber +
            ',' +
            this.positionColumn +
            ']'
          )
        }
        equalsSelection(d) {
          return E.selectionsEqual(this, d)
        }
        static selectionsEqual(d, l) {
          return (
            d.selectionStartLineNumber === l.selectionStartLineNumber &&
            d.selectionStartColumn === l.selectionStartColumn &&
            d.positionLineNumber === l.positionLineNumber &&
            d.positionColumn === l.positionColumn
          )
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1
        }
        setEndPosition(d, l) {
          return this.getDirection() === 0
            ? new E(this.startLineNumber, this.startColumn, d, l)
            : new E(d, l, this.startLineNumber, this.startColumn)
        }
        getPosition() {
          return new p.Position(this.positionLineNumber, this.positionColumn)
        }
        setStartPosition(d, l) {
          return this.getDirection() === 0
            ? new E(d, l, this.endLineNumber, this.endColumn)
            : new E(this.endLineNumber, this.endColumn, d, l)
        }
        static fromPositions(d, l = d) {
          return new E(d.lineNumber, d.column, l.lineNumber, l.column)
        }
        static liftSelection(d) {
          return new E(
            d.selectionStartLineNumber,
            d.selectionStartColumn,
            d.positionLineNumber,
            d.positionColumn
          )
        }
        static selectionsArrEqual(d, l) {
          if ((d && !l) || (!d && l)) return !1
          if (!d && !l) return !0
          if (d.length !== l.length) return !1
          for (let s = 0, h = d.length; s < h; s++)
            if (!this.selectionsEqual(d[s], l[s])) return !1
          return !0
        }
        static isISelection(d) {
          return (
            d &&
            typeof d.selectionStartLineNumber == 'number' &&
            typeof d.selectionStartColumn == 'number' &&
            typeof d.positionLineNumber == 'number' &&
            typeof d.positionColumn == 'number'
          )
        }
        static createWithDirection(d, l, s, h, w) {
          return w === 0 ? new E(d, l, s, h) : new E(s, h, d, l)
        }
      }
      t.Selection = E
    }),
    V(z[25], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.TokenizationResult2 = t.TokenizationResult = t.Token = void 0)
      class p {
        constructor(d, l, s) {
          ;(this.offset = d | 0), (this.type = l), (this.language = s)
        }
        toString() {
          return '(' + this.offset + ', ' + this.type + ')'
        }
      }
      t.Token = p
      class P {
        constructor(d, l) {
          ;(this.tokens = d), (this.endState = l)
        }
      }
      t.TokenizationResult = P
      class E {
        constructor(d, l) {
          ;(this.tokens = d), (this.endState = l)
        }
      }
      t.TokenizationResult2 = E
    }),
    V(z[26], G([0, 1, 10, 5]), function(I, t, p, P) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DiffComputer = void 0)
      const E = 3
      function u(n, r, m, _) {
        return new p.LcsDiff(n, r, m).ComputeDiff(_)
      }
      class d {
        constructor(r) {
          const m = [],
            _ = []
          for (let o = 0, i = r.length; o < i; o++)
            (m[o] = S(r[o], 1)), (_[o] = v(r[o], 1))
          ;(this.lines = r), (this._startColumns = m), (this._endColumns = _)
        }
        getElements() {
          const r = []
          for (let m = 0, _ = this.lines.length; m < _; m++)
            r[m] = this.lines[m].substring(
              this._startColumns[m] - 1,
              this._endColumns[m] - 1
            )
          return r
        }
        getStartLineNumber(r) {
          return r + 1
        }
        getEndLineNumber(r) {
          return r + 1
        }
        createCharSequence(r, m, _) {
          const o = [],
            i = [],
            f = []
          let b = 0
          for (let N = m; N <= _; N++) {
            const c = this.lines[N],
              g = r ? this._startColumns[N] : 1,
              L = r ? this._endColumns[N] : c.length + 1
            for (let A = g; A < L; A++)
              (o[b] = c.charCodeAt(A - 1)), (i[b] = N + 1), (f[b] = A), b++
          }
          return new l(o, i, f)
        }
      }
      class l {
        constructor(r, m, _) {
          ;(this._charCodes = r), (this._lineNumbers = m), (this._columns = _)
        }
        getElements() {
          return this._charCodes
        }
        getStartLineNumber(r) {
          return this._lineNumbers[r]
        }
        getStartColumn(r) {
          return this._columns[r]
        }
        getEndLineNumber(r) {
          return this._lineNumbers[r]
        }
        getEndColumn(r) {
          return this._columns[r] + 1
        }
      }
      class s {
        constructor(r, m, _, o, i, f, b, N) {
          ;(this.originalStartLineNumber = r),
            (this.originalStartColumn = m),
            (this.originalEndLineNumber = _),
            (this.originalEndColumn = o),
            (this.modifiedStartLineNumber = i),
            (this.modifiedStartColumn = f),
            (this.modifiedEndLineNumber = b),
            (this.modifiedEndColumn = N)
        }
        static createFromDiffChange(r, m, _) {
          let o, i, f, b, N, c, g, L
          return (
            r.originalLength === 0
              ? ((o = 0), (i = 0), (f = 0), (b = 0))
              : ((o = m.getStartLineNumber(r.originalStart)),
                (i = m.getStartColumn(r.originalStart)),
                (f = m.getEndLineNumber(
                  r.originalStart + r.originalLength - 1
                )),
                (b = m.getEndColumn(r.originalStart + r.originalLength - 1))),
            r.modifiedLength === 0
              ? ((N = 0), (c = 0), (g = 0), (L = 0))
              : ((N = _.getStartLineNumber(r.modifiedStart)),
                (c = _.getStartColumn(r.modifiedStart)),
                (g = _.getEndLineNumber(
                  r.modifiedStart + r.modifiedLength - 1
                )),
                (L = _.getEndColumn(r.modifiedStart + r.modifiedLength - 1))),
            new s(o, i, f, b, N, c, g, L)
          )
        }
      }
      function h(n) {
        if (n.length <= 1) return n
        const r = [n[0]]
        let m = r[0]
        for (let _ = 1, o = n.length; _ < o; _++) {
          const i = n[_],
            f = i.originalStart - (m.originalStart + m.originalLength),
            b = i.modifiedStart - (m.modifiedStart + m.modifiedLength)
          Math.min(f, b) < E
            ? ((m.originalLength =
                i.originalStart + i.originalLength - m.originalStart),
              (m.modifiedLength =
                i.modifiedStart + i.modifiedLength - m.modifiedStart))
            : (r.push(i), (m = i))
        }
        return r
      }
      class w {
        constructor(r, m, _, o, i) {
          ;(this.originalStartLineNumber = r),
            (this.originalEndLineNumber = m),
            (this.modifiedStartLineNumber = _),
            (this.modifiedEndLineNumber = o),
            (this.charChanges = i)
        }
        static createFromDiffResult(r, m, _, o, i, f, b) {
          let N, c, g, L, A
          if (
            (m.originalLength === 0
              ? ((N = _.getStartLineNumber(m.originalStart) - 1), (c = 0))
              : ((N = _.getStartLineNumber(m.originalStart)),
                (c = _.getEndLineNumber(
                  m.originalStart + m.originalLength - 1
                ))),
            m.modifiedLength === 0
              ? ((g = o.getStartLineNumber(m.modifiedStart) - 1), (L = 0))
              : ((g = o.getStartLineNumber(m.modifiedStart)),
                (L = o.getEndLineNumber(
                  m.modifiedStart + m.modifiedLength - 1
                ))),
            f &&
              m.originalLength > 0 &&
              m.originalLength < 20 &&
              m.modifiedLength > 0 &&
              m.modifiedLength < 20 &&
              i())
          ) {
            const M = _.createCharSequence(
                r,
                m.originalStart,
                m.originalStart + m.originalLength - 1
              ),
              R = o.createCharSequence(
                r,
                m.modifiedStart,
                m.modifiedStart + m.modifiedLength - 1
              )
            let D = u(M, R, i, !0).changes
            b && (D = h(D)), (A = [])
            for (let T = 0, $ = D.length; T < $; T++)
              A.push(s.createFromDiffChange(D[T], M, R))
          }
          return new w(N, c, g, L, A)
        }
      }
      class a {
        constructor(r, m, _) {
          ;(this.shouldComputeCharChanges = _.shouldComputeCharChanges),
            (this.shouldPostProcessCharChanges =
              _.shouldPostProcessCharChanges),
            (this.shouldIgnoreTrimWhitespace = _.shouldIgnoreTrimWhitespace),
            (this.shouldMakePrettyDiff = _.shouldMakePrettyDiff),
            (this.originalLines = r),
            (this.modifiedLines = m),
            (this.original = new d(r)),
            (this.modified = new d(m)),
            (this.continueLineDiff = C(_.maxComputationTime)),
            (this.continueCharDiff = C(
              _.maxComputationTime === 0
                ? 0
                : Math.min(_.maxComputationTime, 5e3)
            ))
        }
        computeDiff() {
          if (
            this.original.lines.length === 1 &&
            this.original.lines[0].length === 0
          )
            return this.modified.lines.length === 1 &&
              this.modified.lines[0].length === 0
              ? { quitEarly: !1, changes: [] }
              : {
                  quitEarly: !1,
                  changes: [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.lines.length,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0
                        }
                      ]
                    }
                  ]
                }
          if (
            this.modified.lines.length === 1 &&
            this.modified.lines[0].length === 0
          )
            return {
              quitEarly: !1,
              changes: [
                {
                  originalStartLineNumber: 1,
                  originalEndLineNumber: this.original.lines.length,
                  modifiedStartLineNumber: 1,
                  modifiedEndLineNumber: 1,
                  charChanges: [
                    {
                      modifiedEndColumn: 0,
                      modifiedEndLineNumber: 0,
                      modifiedStartColumn: 0,
                      modifiedStartLineNumber: 0,
                      originalEndColumn: 0,
                      originalEndLineNumber: 0,
                      originalStartColumn: 0,
                      originalStartLineNumber: 0
                    }
                  ]
                }
              ]
            }
          const r = u(
              this.original,
              this.modified,
              this.continueLineDiff,
              this.shouldMakePrettyDiff
            ),
            m = r.changes,
            _ = r.quitEarly
          if (this.shouldIgnoreTrimWhitespace) {
            const b = []
            for (let N = 0, c = m.length; N < c; N++)
              b.push(
                w.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  m[N],
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              )
            return { quitEarly: _, changes: b }
          }
          const o = []
          let i = 0,
            f = 0
          for (let b = -1, N = m.length; b < N; b++) {
            const c = b + 1 < N ? m[b + 1] : null,
              g = c ? c.originalStart : this.originalLines.length,
              L = c ? c.modifiedStart : this.modifiedLines.length
            for (; i < g && f < L; ) {
              const A = this.originalLines[i],
                M = this.modifiedLines[f]
              if (A !== M) {
                {
                  let R = S(A, 1),
                    D = S(M, 1)
                  for (; R > 1 && D > 1; ) {
                    const T = A.charCodeAt(R - 2),
                      $ = M.charCodeAt(D - 2)
                    if (T !== $) break
                    R--, D--
                  }
                  ;(R > 1 || D > 1) &&
                    this._pushTrimWhitespaceCharChange(
                      o,
                      i + 1,
                      1,
                      R,
                      f + 1,
                      1,
                      D
                    )
                }
                {
                  let R = v(A, 1),
                    D = v(M, 1)
                  const T = A.length + 1,
                    $ = M.length + 1
                  for (; R < T && D < $; ) {
                    const k = A.charCodeAt(R - 1),
                      F = A.charCodeAt(D - 1)
                    if (k !== F) break
                    R++, D++
                  }
                  ;(R < T || D < $) &&
                    this._pushTrimWhitespaceCharChange(
                      o,
                      i + 1,
                      R,
                      T,
                      f + 1,
                      D,
                      $
                    )
                }
              }
              i++, f++
            }
            c &&
              (o.push(
                w.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  c,
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              ),
              (i += c.originalLength),
              (f += c.modifiedLength))
          }
          return { quitEarly: _, changes: o }
        }
        _pushTrimWhitespaceCharChange(r, m, _, o, i, f, b) {
          if (!this._mergeTrimWhitespaceCharChange(r, m, _, o, i, f, b)) {
            let N
            this.shouldComputeCharChanges &&
              (N = [new s(m, _, m, o, i, f, i, b)]),
              r.push(new w(m, m, i, i, N))
          }
        }
        _mergeTrimWhitespaceCharChange(r, m, _, o, i, f, b) {
          const N = r.length
          if (N === 0) return !1
          const c = r[N - 1]
          return c.originalEndLineNumber === 0 || c.modifiedEndLineNumber === 0
            ? !1
            : c.originalEndLineNumber + 1 === m &&
              c.modifiedEndLineNumber + 1 === i
            ? ((c.originalEndLineNumber = m),
              (c.modifiedEndLineNumber = i),
              this.shouldComputeCharChanges &&
                c.charChanges &&
                c.charChanges.push(new s(m, _, m, o, i, f, i, b)),
              !0)
            : !1
        }
      }
      t.DiffComputer = a
      function S(n, r) {
        const m = P.firstNonWhitespaceIndex(n)
        return m === -1 ? r : m + 1
      }
      function v(n, r) {
        const m = P.lastNonWhitespaceIndex(n)
        return m === -1 ? r : m + 2
      }
      function C(n) {
        if (n === 0) return () => !0
        const r = Date.now()
        return () => Date.now() - r < n
      }
    }),
    V(z[27], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getWordAtText = t.ensureValidWordDefinition = t.DEFAULT_WORD_REGEXP = t.USUAL_WORD_SEPARATORS = void 0),
        (t.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?')
      function p(l = '') {
        let s = '(-?\\d*\\.\\d\\w*)|([^'
        for (const h of t.USUAL_WORD_SEPARATORS)
          l.indexOf(h) >= 0 || (s += '\\' + h)
        return (s += '\\s]+)'), new RegExp(s, 'g')
      }
      t.DEFAULT_WORD_REGEXP = p()
      function P(l) {
        let s = t.DEFAULT_WORD_REGEXP
        if (l && l instanceof RegExp)
          if (l.global) s = l
          else {
            let h = 'g'
            l.ignoreCase && (h += 'i'),
              l.multiline && (h += 'm'),
              l.unicode && (h += 'u'),
              (s = new RegExp(l.source, h))
          }
        return (s.lastIndex = 0), s
      }
      t.ensureValidWordDefinition = P
      const E = { maxLen: 1e3, windowSize: 15, timeBudget: 150 }
      function u(l, s, h, w, a = E) {
        if (h.length > a.maxLen) {
          let r = l - a.maxLen / 2
          return (
            r < 0 ? (r = 0) : (w += r),
            (h = h.substring(r, l + a.maxLen / 2)),
            u(l, s, h, w, a)
          )
        }
        const S = Date.now(),
          v = l - 1 - w
        let C = -1,
          n = null
        for (let r = 1; !(Date.now() - S >= a.timeBudget); r++) {
          const m = v - a.windowSize * r
          s.lastIndex = Math.max(0, m)
          const _ = d(s, h, v, C)
          if ((!_ && n) || ((n = _), m <= 0)) break
          C = m
        }
        if (n) {
          let r = {
            word: n[0],
            startColumn: w + 1 + n.index,
            endColumn: w + 1 + n.index + n[0].length
          }
          return (s.lastIndex = 0), r
        }
        return null
      }
      t.getWordAtText = u
      function d(l, s, h, w) {
        let a
        for (; (a = l.exec(s)); ) {
          const S = a.index || 0
          if (S <= h && l.lastIndex >= h) return a
          if (w > 0 && S > w) return null
        }
        return null
      }
    }),
    V(z[28], G([0, 1, 23]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.computeLinks = t.LinkComputer = t.StateMachine = t.Uint8Matrix = void 0)
      class P {
        constructor(S, v, C) {
          const n = new Uint8Array(S * v)
          for (let r = 0, m = S * v; r < m; r++) n[r] = C
          ;(this._data = n), (this.rows = S), (this.cols = v)
        }
        get(S, v) {
          return this._data[S * this.cols + v]
        }
        set(S, v, C) {
          this._data[S * this.cols + v] = C
        }
      }
      t.Uint8Matrix = P
      class E {
        constructor(S) {
          let v = 0,
            C = 0
          for (let r = 0, m = S.length; r < m; r++) {
            let [_, o, i] = S[r]
            o > v && (v = o), _ > C && (C = _), i > C && (C = i)
          }
          v++, C++
          let n = new P(C, v, 0)
          for (let r = 0, m = S.length; r < m; r++) {
            let [_, o, i] = S[r]
            n.set(_, o, i)
          }
          ;(this._states = n), (this._maxCharCode = v)
        }
        nextState(S, v) {
          return v < 0 || v >= this._maxCharCode ? 0 : this._states.get(S, v)
        }
      }
      t.StateMachine = E
      let u = null
      function d() {
        return (
          u === null &&
            (u = new E([
              [1, 104, 2],
              [1, 72, 2],
              [1, 102, 6],
              [1, 70, 6],
              [2, 116, 3],
              [2, 84, 3],
              [3, 116, 4],
              [3, 84, 4],
              [4, 112, 5],
              [4, 80, 5],
              [5, 115, 9],
              [5, 83, 9],
              [5, 58, 10],
              [6, 105, 7],
              [6, 73, 7],
              [7, 108, 8],
              [7, 76, 8],
              [8, 101, 9],
              [8, 69, 9],
              [9, 58, 10],
              [10, 47, 11],
              [11, 47, 12]
            ])),
          u
        )
      }
      let l = null
      function s() {
        if (l === null) {
          l = new p.CharacterClassifier(0)
          const a = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u201C\u3008\u300A\u300C\u300E\u3010\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u3011\u300F\u300D\u300B\u3009\u201D\u2019\uFF40\uFF5E\u2026`
          for (let v = 0; v < a.length; v++) l.set(a.charCodeAt(v), 1)
          const S = '.,;'
          for (let v = 0; v < S.length; v++) l.set(S.charCodeAt(v), 2)
        }
        return l
      }
      class h {
        static _createLink(S, v, C, n, r) {
          let m = r - 1
          do {
            const _ = v.charCodeAt(m)
            if (S.get(_) !== 2) break
            m--
          } while (m > n)
          if (n > 0) {
            const _ = v.charCodeAt(n - 1),
              o = v.charCodeAt(m)
            ;((_ === 40 && o === 41) ||
              (_ === 91 && o === 93) ||
              (_ === 123 && o === 125)) &&
              m--
          }
          return {
            range: {
              startLineNumber: C,
              startColumn: n + 1,
              endLineNumber: C,
              endColumn: m + 2
            },
            url: v.substring(n, m + 1)
          }
        }
        static computeLinks(S, v = d()) {
          const C = s()
          let n = []
          for (let r = 1, m = S.getLineCount(); r <= m; r++) {
            const _ = S.getLineContent(r),
              o = _.length
            let i = 0,
              f = 0,
              b = 0,
              N = 1,
              c = !1,
              g = !1,
              L = !1,
              A = !1
            for (; i < o; ) {
              let M = !1
              const R = _.charCodeAt(i)
              if (N === 13) {
                let D
                switch (R) {
                  case 40:
                    ;(c = !0), (D = 0)
                    break
                  case 41:
                    D = c ? 0 : 1
                    break
                  case 91:
                    ;(L = !0), (g = !0), (D = 0)
                    break
                  case 93:
                    ;(L = !1), (D = g ? 0 : 1)
                    break
                  case 123:
                    ;(A = !0), (D = 0)
                    break
                  case 125:
                    D = A ? 0 : 1
                    break
                  case 39:
                    D = b === 34 || b === 96 ? 0 : 1
                    break
                  case 34:
                    D = b === 39 || b === 96 ? 0 : 1
                    break
                  case 96:
                    D = b === 39 || b === 34 ? 0 : 1
                    break
                  case 42:
                    D = b === 42 ? 1 : 0
                    break
                  case 124:
                    D = b === 124 ? 1 : 0
                    break
                  case 32:
                    D = L ? 0 : 1
                    break
                  default:
                    D = C.get(R)
                }
                D === 1 && (n.push(h._createLink(C, _, r, f, i)), (M = !0))
              } else if (N === 12) {
                let D
                R === 91 ? ((g = !0), (D = 0)) : (D = C.get(R)),
                  D === 1 ? (M = !0) : (N = 13)
              } else (N = v.nextState(N, R)), N === 0 && (M = !0)
              M &&
                ((N = 1), (c = !1), (g = !1), (A = !1), (f = i + 1), (b = R)),
                i++
            }
            N === 13 && n.push(h._createLink(C, _, r, f, o))
          }
          return n
        }
      }
      t.LinkComputer = h
      function w(a) {
        return !a ||
          typeof a.getLineCount != 'function' ||
          typeof a.getLineContent != 'function'
          ? []
          : h.computeLinks(a)
      }
      t.computeLinks = w
    }),
    V(z[29], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.BasicInplaceReplace = void 0)
      class p {
        constructor() {
          this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            [
              'Private',
              'Public',
              'Friend',
              'ReadOnly',
              'Partial',
              'Protected',
              'WriteOnly'
            ],
            ['public', 'protected', 'private']
          ]
        }
        navigateValueSet(E, u, d, l, s) {
          if (E && u) {
            let h = this.doNavigateValueSet(u, s)
            if (h) return { range: E, value: h }
          }
          if (d && l) {
            let h = this.doNavigateValueSet(l, s)
            if (h) return { range: d, value: h }
          }
          return null
        }
        doNavigateValueSet(E, u) {
          let d = this.numberReplace(E, u)
          return d !== null ? d : this.textReplace(E, u)
        }
        numberReplace(E, u) {
          let d = Math.pow(10, E.length - (E.lastIndexOf('.') + 1)),
            l = Number(E),
            s = parseFloat(E)
          return !isNaN(l) && !isNaN(s) && l === s
            ? l === 0 && !u
              ? null
              : ((l = Math.floor(l * d)), (l += u ? d : -d), String(l / d))
            : null
        }
        textReplace(E, u) {
          return this.valueSetsReplace(this._defaultValueSet, E, u)
        }
        valueSetsReplace(E, u, d) {
          let l = null
          for (let s = 0, h = E.length; l === null && s < h; s++)
            l = this.valueSetReplace(E[s], u, d)
          return l
        }
        valueSetReplace(E, u, d) {
          let l = E.indexOf(u)
          return l >= 0
            ? ((l += d ? 1 : -1),
              l < 0 ? (l = E.length - 1) : (l %= E.length),
              E[l])
            : null
        }
      }
      ;(t.BasicInplaceReplace = p), (p.INSTANCE = new p())
    }),
    V(z[30], G([0, 1]), function(I, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.WrappingIndent = t.TrackedRangeStickiness = t.TextEditorCursorStyle = t.TextEditorCursorBlinkingStyle = t.SymbolTag = t.SymbolKind = t.SignatureHelpTriggerKind = t.SelectionDirection = t.ScrollbarVisibility = t.ScrollType = t.RenderMinimap = t.RenderLineNumbersType = t.OverviewRulerLane = t.OverlayWidgetPositionPreference = t.MouseTargetType = t.MinimapPosition = t.MarkerTag = t.MarkerSeverity = t.KeyCode = t.InlineHintKind = t.IndentAction = t.EndOfLineSequence = t.EndOfLinePreference = t.EditorOption = t.EditorAutoIndentStrategy = t.DocumentHighlightKind = t.DefaultEndOfLine = t.CursorChangeReason = t.ContentWidgetPositionPreference = t.CompletionTriggerKind = t.CompletionItemTag = t.CompletionItemKind = t.CompletionItemInsertTextRule = t.AccessibilitySupport = void 0)
      var p
      ;(function(e) {
        ;(e[(e.Unknown = 0)] = 'Unknown'),
          (e[(e.Disabled = 1)] = 'Disabled'),
          (e[(e.Enabled = 2)] = 'Enabled')
      })((p = t.AccessibilitySupport || (t.AccessibilitySupport = {})))
      var P
      ;(function(e) {
        ;(e[(e.KeepWhitespace = 1)] = 'KeepWhitespace'),
          (e[(e.InsertAsSnippet = 4)] = 'InsertAsSnippet')
      })(
        (P =
          t.CompletionItemInsertTextRule ||
          (t.CompletionItemInsertTextRule = {}))
      )
      var E
      ;(function(e) {
        ;(e[(e.Method = 0)] = 'Method'),
          (e[(e.Function = 1)] = 'Function'),
          (e[(e.Constructor = 2)] = 'Constructor'),
          (e[(e.Field = 3)] = 'Field'),
          (e[(e.Variable = 4)] = 'Variable'),
          (e[(e.Class = 5)] = 'Class'),
          (e[(e.Struct = 6)] = 'Struct'),
          (e[(e.Interface = 7)] = 'Interface'),
          (e[(e.Module = 8)] = 'Module'),
          (e[(e.Property = 9)] = 'Property'),
          (e[(e.Event = 10)] = 'Event'),
          (e[(e.Operator = 11)] = 'Operator'),
          (e[(e.Unit = 12)] = 'Unit'),
          (e[(e.Value = 13)] = 'Value'),
          (e[(e.Constant = 14)] = 'Constant'),
          (e[(e.Enum = 15)] = 'Enum'),
          (e[(e.EnumMember = 16)] = 'EnumMember'),
          (e[(e.Keyword = 17)] = 'Keyword'),
          (e[(e.Text = 18)] = 'Text'),
          (e[(e.Color = 19)] = 'Color'),
          (e[(e.File = 20)] = 'File'),
          (e[(e.Reference = 21)] = 'Reference'),
          (e[(e.Customcolor = 22)] = 'Customcolor'),
          (e[(e.Folder = 23)] = 'Folder'),
          (e[(e.TypeParameter = 24)] = 'TypeParameter'),
          (e[(e.User = 25)] = 'User'),
          (e[(e.Issue = 26)] = 'Issue'),
          (e[(e.Snippet = 27)] = 'Snippet')
      })((E = t.CompletionItemKind || (t.CompletionItemKind = {})))
      var u
      ;(function(e) {
        e[(e.Deprecated = 1)] = 'Deprecated'
      })((u = t.CompletionItemTag || (t.CompletionItemTag = {})))
      var d
      ;(function(e) {
        ;(e[(e.Invoke = 0)] = 'Invoke'),
          (e[(e.TriggerCharacter = 1)] = 'TriggerCharacter'),
          (e[(e.TriggerForIncompleteCompletions = 2)] =
            'TriggerForIncompleteCompletions')
      })((d = t.CompletionTriggerKind || (t.CompletionTriggerKind = {})))
      var l
      ;(function(e) {
        ;(e[(e.EXACT = 0)] = 'EXACT'),
          (e[(e.ABOVE = 1)] = 'ABOVE'),
          (e[(e.BELOW = 2)] = 'BELOW')
      })(
        (l =
          t.ContentWidgetPositionPreference ||
          (t.ContentWidgetPositionPreference = {}))
      )
      var s
      ;(function(e) {
        ;(e[(e.NotSet = 0)] = 'NotSet'),
          (e[(e.ContentFlush = 1)] = 'ContentFlush'),
          (e[(e.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
          (e[(e.Explicit = 3)] = 'Explicit'),
          (e[(e.Paste = 4)] = 'Paste'),
          (e[(e.Undo = 5)] = 'Undo'),
          (e[(e.Redo = 6)] = 'Redo')
      })((s = t.CursorChangeReason || (t.CursorChangeReason = {})))
      var h
      ;(function(e) {
        ;(e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
      })((h = t.DefaultEndOfLine || (t.DefaultEndOfLine = {})))
      var w
      ;(function(e) {
        ;(e[(e.Text = 0)] = 'Text'),
          (e[(e.Read = 1)] = 'Read'),
          (e[(e.Write = 2)] = 'Write')
      })((w = t.DocumentHighlightKind || (t.DocumentHighlightKind = {})))
      var a
      ;(function(e) {
        ;(e[(e.None = 0)] = 'None'),
          (e[(e.Keep = 1)] = 'Keep'),
          (e[(e.Brackets = 2)] = 'Brackets'),
          (e[(e.Advanced = 3)] = 'Advanced'),
          (e[(e.Full = 4)] = 'Full')
      })((a = t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})))
      var S
      ;(function(e) {
        ;(e[(e.acceptSuggestionOnCommitCharacter = 0)] =
          'acceptSuggestionOnCommitCharacter'),
          (e[(e.acceptSuggestionOnEnter = 1)] = 'acceptSuggestionOnEnter'),
          (e[(e.accessibilitySupport = 2)] = 'accessibilitySupport'),
          (e[(e.accessibilityPageSize = 3)] = 'accessibilityPageSize'),
          (e[(e.ariaLabel = 4)] = 'ariaLabel'),
          (e[(e.autoClosingBrackets = 5)] = 'autoClosingBrackets'),
          (e[(e.autoClosingOvertype = 6)] = 'autoClosingOvertype'),
          (e[(e.autoClosingQuotes = 7)] = 'autoClosingQuotes'),
          (e[(e.autoIndent = 8)] = 'autoIndent'),
          (e[(e.automaticLayout = 9)] = 'automaticLayout'),
          (e[(e.autoSurround = 10)] = 'autoSurround'),
          (e[(e.codeLens = 11)] = 'codeLens'),
          (e[(e.codeLensFontFamily = 12)] = 'codeLensFontFamily'),
          (e[(e.codeLensFontSize = 13)] = 'codeLensFontSize'),
          (e[(e.colorDecorators = 14)] = 'colorDecorators'),
          (e[(e.columnSelection = 15)] = 'columnSelection'),
          (e[(e.comments = 16)] = 'comments'),
          (e[(e.contextmenu = 17)] = 'contextmenu'),
          (e[(e.copyWithSyntaxHighlighting = 18)] =
            'copyWithSyntaxHighlighting'),
          (e[(e.cursorBlinking = 19)] = 'cursorBlinking'),
          (e[(e.cursorSmoothCaretAnimation = 20)] =
            'cursorSmoothCaretAnimation'),
          (e[(e.cursorStyle = 21)] = 'cursorStyle'),
          (e[(e.cursorSurroundingLines = 22)] = 'cursorSurroundingLines'),
          (e[(e.cursorSurroundingLinesStyle = 23)] =
            'cursorSurroundingLinesStyle'),
          (e[(e.cursorWidth = 24)] = 'cursorWidth'),
          (e[(e.disableLayerHinting = 25)] = 'disableLayerHinting'),
          (e[(e.disableMonospaceOptimizations = 26)] =
            'disableMonospaceOptimizations'),
          (e[(e.dragAndDrop = 27)] = 'dragAndDrop'),
          (e[(e.emptySelectionClipboard = 28)] = 'emptySelectionClipboard'),
          (e[(e.extraEditorClassName = 29)] = 'extraEditorClassName'),
          (e[(e.fastScrollSensitivity = 30)] = 'fastScrollSensitivity'),
          (e[(e.find = 31)] = 'find'),
          (e[(e.fixedOverflowWidgets = 32)] = 'fixedOverflowWidgets'),
          (e[(e.folding = 33)] = 'folding'),
          (e[(e.foldingStrategy = 34)] = 'foldingStrategy'),
          (e[(e.foldingHighlight = 35)] = 'foldingHighlight'),
          (e[(e.unfoldOnClickAfterEndOfLine = 36)] =
            'unfoldOnClickAfterEndOfLine'),
          (e[(e.fontFamily = 37)] = 'fontFamily'),
          (e[(e.fontInfo = 38)] = 'fontInfo'),
          (e[(e.fontLigatures = 39)] = 'fontLigatures'),
          (e[(e.fontSize = 40)] = 'fontSize'),
          (e[(e.fontWeight = 41)] = 'fontWeight'),
          (e[(e.formatOnPaste = 42)] = 'formatOnPaste'),
          (e[(e.formatOnType = 43)] = 'formatOnType'),
          (e[(e.glyphMargin = 44)] = 'glyphMargin'),
          (e[(e.gotoLocation = 45)] = 'gotoLocation'),
          (e[(e.hideCursorInOverviewRuler = 46)] = 'hideCursorInOverviewRuler'),
          (e[(e.highlightActiveIndentGuide = 47)] =
            'highlightActiveIndentGuide'),
          (e[(e.hover = 48)] = 'hover'),
          (e[(e.inDiffEditor = 49)] = 'inDiffEditor'),
          (e[(e.letterSpacing = 50)] = 'letterSpacing'),
          (e[(e.lightbulb = 51)] = 'lightbulb'),
          (e[(e.lineDecorationsWidth = 52)] = 'lineDecorationsWidth'),
          (e[(e.lineHeight = 53)] = 'lineHeight'),
          (e[(e.lineNumbers = 54)] = 'lineNumbers'),
          (e[(e.lineNumbersMinChars = 55)] = 'lineNumbersMinChars'),
          (e[(e.linkedEditing = 56)] = 'linkedEditing'),
          (e[(e.links = 57)] = 'links'),
          (e[(e.matchBrackets = 58)] = 'matchBrackets'),
          (e[(e.minimap = 59)] = 'minimap'),
          (e[(e.mouseStyle = 60)] = 'mouseStyle'),
          (e[(e.mouseWheelScrollSensitivity = 61)] =
            'mouseWheelScrollSensitivity'),
          (e[(e.mouseWheelZoom = 62)] = 'mouseWheelZoom'),
          (e[(e.multiCursorMergeOverlapping = 63)] =
            'multiCursorMergeOverlapping'),
          (e[(e.multiCursorModifier = 64)] = 'multiCursorModifier'),
          (e[(e.multiCursorPaste = 65)] = 'multiCursorPaste'),
          (e[(e.occurrencesHighlight = 66)] = 'occurrencesHighlight'),
          (e[(e.overviewRulerBorder = 67)] = 'overviewRulerBorder'),
          (e[(e.overviewRulerLanes = 68)] = 'overviewRulerLanes'),
          (e[(e.padding = 69)] = 'padding'),
          (e[(e.parameterHints = 70)] = 'parameterHints'),
          (e[(e.peekWidgetDefaultFocus = 71)] = 'peekWidgetDefaultFocus'),
          (e[(e.definitionLinkOpensInPeek = 72)] = 'definitionLinkOpensInPeek'),
          (e[(e.quickSuggestions = 73)] = 'quickSuggestions'),
          (e[(e.quickSuggestionsDelay = 74)] = 'quickSuggestionsDelay'),
          (e[(e.readOnly = 75)] = 'readOnly'),
          (e[(e.renameOnType = 76)] = 'renameOnType'),
          (e[(e.renderControlCharacters = 77)] = 'renderControlCharacters'),
          (e[(e.renderIndentGuides = 78)] = 'renderIndentGuides'),
          (e[(e.renderFinalNewline = 79)] = 'renderFinalNewline'),
          (e[(e.renderLineHighlight = 80)] = 'renderLineHighlight'),
          (e[(e.renderLineHighlightOnlyWhenFocus = 81)] =
            'renderLineHighlightOnlyWhenFocus'),
          (e[(e.renderValidationDecorations = 82)] =
            'renderValidationDecorations'),
          (e[(e.renderWhitespace = 83)] = 'renderWhitespace'),
          (e[(e.revealHorizontalRightPadding = 84)] =
            'revealHorizontalRightPadding'),
          (e[(e.roundedSelection = 85)] = 'roundedSelection'),
          (e[(e.rulers = 86)] = 'rulers'),
          (e[(e.scrollbar = 87)] = 'scrollbar'),
          (e[(e.scrollBeyondLastColumn = 88)] = 'scrollBeyondLastColumn'),
          (e[(e.scrollBeyondLastLine = 89)] = 'scrollBeyondLastLine'),
          (e[(e.scrollPredominantAxis = 90)] = 'scrollPredominantAxis'),
          (e[(e.selectionClipboard = 91)] = 'selectionClipboard'),
          (e[(e.selectionHighlight = 92)] = 'selectionHighlight'),
          (e[(e.selectOnLineNumbers = 93)] = 'selectOnLineNumbers'),
          (e[(e.showFoldingControls = 94)] = 'showFoldingControls'),
          (e[(e.showUnused = 95)] = 'showUnused'),
          (e[(e.snippetSuggestions = 96)] = 'snippetSuggestions'),
          (e[(e.smartSelect = 97)] = 'smartSelect'),
          (e[(e.smoothScrolling = 98)] = 'smoothScrolling'),
          (e[(e.stickyTabStops = 99)] = 'stickyTabStops'),
          (e[(e.stopRenderingLineAfter = 100)] = 'stopRenderingLineAfter'),
          (e[(e.suggest = 101)] = 'suggest'),
          (e[(e.suggestFontSize = 102)] = 'suggestFontSize'),
          (e[(e.suggestLineHeight = 103)] = 'suggestLineHeight'),
          (e[(e.suggestOnTriggerCharacters = 104)] =
            'suggestOnTriggerCharacters'),
          (e[(e.suggestSelection = 105)] = 'suggestSelection'),
          (e[(e.tabCompletion = 106)] = 'tabCompletion'),
          (e[(e.tabIndex = 107)] = 'tabIndex'),
          (e[(e.unusualLineTerminators = 108)] = 'unusualLineTerminators'),
          (e[(e.useTabStops = 109)] = 'useTabStops'),
          (e[(e.wordSeparators = 110)] = 'wordSeparators'),
          (e[(e.wordWrap = 111)] = 'wordWrap'),
          (e[(e.wordWrapBreakAfterCharacters = 112)] =
            'wordWrapBreakAfterCharacters'),
          (e[(e.wordWrapBreakBeforeCharacters = 113)] =
            'wordWrapBreakBeforeCharacters'),
          (e[(e.wordWrapColumn = 114)] = 'wordWrapColumn'),
          (e[(e.wordWrapOverride1 = 115)] = 'wordWrapOverride1'),
          (e[(e.wordWrapOverride2 = 116)] = 'wordWrapOverride2'),
          (e[(e.wrappingIndent = 117)] = 'wrappingIndent'),
          (e[(e.wrappingStrategy = 118)] = 'wrappingStrategy'),
          (e[(e.showDeprecated = 119)] = 'showDeprecated'),
          (e[(e.inlineHints = 120)] = 'inlineHints'),
          (e[(e.editorClassName = 121)] = 'editorClassName'),
          (e[(e.pixelRatio = 122)] = 'pixelRatio'),
          (e[(e.tabFocusMode = 123)] = 'tabFocusMode'),
          (e[(e.layoutInfo = 124)] = 'layoutInfo'),
          (e[(e.wrappingInfo = 125)] = 'wrappingInfo')
      })((S = t.EditorOption || (t.EditorOption = {})))
      var v
      ;(function(e) {
        ;(e[(e.TextDefined = 0)] = 'TextDefined'),
          (e[(e.LF = 1)] = 'LF'),
          (e[(e.CRLF = 2)] = 'CRLF')
      })((v = t.EndOfLinePreference || (t.EndOfLinePreference = {})))
      var C
      ;(function(e) {
        ;(e[(e.LF = 0)] = 'LF'), (e[(e.CRLF = 1)] = 'CRLF')
      })((C = t.EndOfLineSequence || (t.EndOfLineSequence = {})))
      var n
      ;(function(e) {
        ;(e[(e.None = 0)] = 'None'),
          (e[(e.Indent = 1)] = 'Indent'),
          (e[(e.IndentOutdent = 2)] = 'IndentOutdent'),
          (e[(e.Outdent = 3)] = 'Outdent')
      })((n = t.IndentAction || (t.IndentAction = {})))
      var r
      ;(function(e) {
        ;(e[(e.Other = 0)] = 'Other'),
          (e[(e.Type = 1)] = 'Type'),
          (e[(e.Parameter = 2)] = 'Parameter')
      })((r = t.InlineHintKind || (t.InlineHintKind = {})))
      var m
      ;(function(e) {
        ;(e[(e.Unknown = 0)] = 'Unknown'),
          (e[(e.Backspace = 1)] = 'Backspace'),
          (e[(e.Tab = 2)] = 'Tab'),
          (e[(e.Enter = 3)] = 'Enter'),
          (e[(e.Shift = 4)] = 'Shift'),
          (e[(e.Ctrl = 5)] = 'Ctrl'),
          (e[(e.Alt = 6)] = 'Alt'),
          (e[(e.PauseBreak = 7)] = 'PauseBreak'),
          (e[(e.CapsLock = 8)] = 'CapsLock'),
          (e[(e.Escape = 9)] = 'Escape'),
          (e[(e.Space = 10)] = 'Space'),
          (e[(e.PageUp = 11)] = 'PageUp'),
          (e[(e.PageDown = 12)] = 'PageDown'),
          (e[(e.End = 13)] = 'End'),
          (e[(e.Home = 14)] = 'Home'),
          (e[(e.LeftArrow = 15)] = 'LeftArrow'),
          (e[(e.UpArrow = 16)] = 'UpArrow'),
          (e[(e.RightArrow = 17)] = 'RightArrow'),
          (e[(e.DownArrow = 18)] = 'DownArrow'),
          (e[(e.Insert = 19)] = 'Insert'),
          (e[(e.Delete = 20)] = 'Delete'),
          (e[(e.KEY_0 = 21)] = 'KEY_0'),
          (e[(e.KEY_1 = 22)] = 'KEY_1'),
          (e[(e.KEY_2 = 23)] = 'KEY_2'),
          (e[(e.KEY_3 = 24)] = 'KEY_3'),
          (e[(e.KEY_4 = 25)] = 'KEY_4'),
          (e[(e.KEY_5 = 26)] = 'KEY_5'),
          (e[(e.KEY_6 = 27)] = 'KEY_6'),
          (e[(e.KEY_7 = 28)] = 'KEY_7'),
          (e[(e.KEY_8 = 29)] = 'KEY_8'),
          (e[(e.KEY_9 = 30)] = 'KEY_9'),
          (e[(e.KEY_A = 31)] = 'KEY_A'),
          (e[(e.KEY_B = 32)] = 'KEY_B'),
          (e[(e.KEY_C = 33)] = 'KEY_C'),
          (e[(e.KEY_D = 34)] = 'KEY_D'),
          (e[(e.KEY_E = 35)] = 'KEY_E'),
          (e[(e.KEY_F = 36)] = 'KEY_F'),
          (e[(e.KEY_G = 37)] = 'KEY_G'),
          (e[(e.KEY_H = 38)] = 'KEY_H'),
          (e[(e.KEY_I = 39)] = 'KEY_I'),
          (e[(e.KEY_J = 40)] = 'KEY_J'),
          (e[(e.KEY_K = 41)] = 'KEY_K'),
          (e[(e.KEY_L = 42)] = 'KEY_L'),
          (e[(e.KEY_M = 43)] = 'KEY_M'),
          (e[(e.KEY_N = 44)] = 'KEY_N'),
          (e[(e.KEY_O = 45)] = 'KEY_O'),
          (e[(e.KEY_P = 46)] = 'KEY_P'),
          (e[(e.KEY_Q = 47)] = 'KEY_Q'),
          (e[(e.KEY_R = 48)] = 'KEY_R'),
          (e[(e.KEY_S = 49)] = 'KEY_S'),
          (e[(e.KEY_T = 50)] = 'KEY_T'),
          (e[(e.KEY_U = 51)] = 'KEY_U'),
          (e[(e.KEY_V = 52)] = 'KEY_V'),
          (e[(e.KEY_W = 53)] = 'KEY_W'),
          (e[(e.KEY_X = 54)] = 'KEY_X'),
          (e[(e.KEY_Y = 55)] = 'KEY_Y'),
          (e[(e.KEY_Z = 56)] = 'KEY_Z'),
          (e[(e.Meta = 57)] = 'Meta'),
          (e[(e.ContextMenu = 58)] = 'ContextMenu'),
          (e[(e.F1 = 59)] = 'F1'),
          (e[(e.F2 = 60)] = 'F2'),
          (e[(e.F3 = 61)] = 'F3'),
          (e[(e.F4 = 62)] = 'F4'),
          (e[(e.F5 = 63)] = 'F5'),
          (e[(e.F6 = 64)] = 'F6'),
          (e[(e.F7 = 65)] = 'F7'),
          (e[(e.F8 = 66)] = 'F8'),
          (e[(e.F9 = 67)] = 'F9'),
          (e[(e.F10 = 68)] = 'F10'),
          (e[(e.F11 = 69)] = 'F11'),
          (e[(e.F12 = 70)] = 'F12'),
          (e[(e.F13 = 71)] = 'F13'),
          (e[(e.F14 = 72)] = 'F14'),
          (e[(e.F15 = 73)] = 'F15'),
          (e[(e.F16 = 74)] = 'F16'),
          (e[(e.F17 = 75)] = 'F17'),
          (e[(e.F18 = 76)] = 'F18'),
          (e[(e.F19 = 77)] = 'F19'),
          (e[(e.NumLock = 78)] = 'NumLock'),
          (e[(e.ScrollLock = 79)] = 'ScrollLock'),
          (e[(e.US_SEMICOLON = 80)] = 'US_SEMICOLON'),
          (e[(e.US_EQUAL = 81)] = 'US_EQUAL'),
          (e[(e.US_COMMA = 82)] = 'US_COMMA'),
          (e[(e.US_MINUS = 83)] = 'US_MINUS'),
          (e[(e.US_DOT = 84)] = 'US_DOT'),
          (e[(e.US_SLASH = 85)] = 'US_SLASH'),
          (e[(e.US_BACKTICK = 86)] = 'US_BACKTICK'),
          (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = 'US_OPEN_SQUARE_BRACKET'),
          (e[(e.US_BACKSLASH = 88)] = 'US_BACKSLASH'),
          (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = 'US_CLOSE_SQUARE_BRACKET'),
          (e[(e.US_QUOTE = 90)] = 'US_QUOTE'),
          (e[(e.OEM_8 = 91)] = 'OEM_8'),
          (e[(e.OEM_102 = 92)] = 'OEM_102'),
          (e[(e.NUMPAD_0 = 93)] = 'NUMPAD_0'),
          (e[(e.NUMPAD_1 = 94)] = 'NUMPAD_1'),
          (e[(e.NUMPAD_2 = 95)] = 'NUMPAD_2'),
          (e[(e.NUMPAD_3 = 96)] = 'NUMPAD_3'),
          (e[(e.NUMPAD_4 = 97)] = 'NUMPAD_4'),
          (e[(e.NUMPAD_5 = 98)] = 'NUMPAD_5'),
          (e[(e.NUMPAD_6 = 99)] = 'NUMPAD_6'),
          (e[(e.NUMPAD_7 = 100)] = 'NUMPAD_7'),
          (e[(e.NUMPAD_8 = 101)] = 'NUMPAD_8'),
          (e[(e.NUMPAD_9 = 102)] = 'NUMPAD_9'),
          (e[(e.NUMPAD_MULTIPLY = 103)] = 'NUMPAD_MULTIPLY'),
          (e[(e.NUMPAD_ADD = 104)] = 'NUMPAD_ADD'),
          (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
          (e[(e.NUMPAD_SUBTRACT = 106)] = 'NUMPAD_SUBTRACT'),
          (e[(e.NUMPAD_DECIMAL = 107)] = 'NUMPAD_DECIMAL'),
          (e[(e.NUMPAD_DIVIDE = 108)] = 'NUMPAD_DIVIDE'),
          (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
          (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
          (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
          (e[(e.MAX_VALUE = 112)] = 'MAX_VALUE')
      })((m = t.KeyCode || (t.KeyCode = {})))
      var _
      ;(function(e) {
        ;(e[(e.Hint = 1)] = 'Hint'),
          (e[(e.Info = 2)] = 'Info'),
          (e[(e.Warning = 4)] = 'Warning'),
          (e[(e.Error = 8)] = 'Error')
      })((_ = t.MarkerSeverity || (t.MarkerSeverity = {})))
      var o
      ;(function(e) {
        ;(e[(e.Unnecessary = 1)] = 'Unnecessary'),
          (e[(e.Deprecated = 2)] = 'Deprecated')
      })((o = t.MarkerTag || (t.MarkerTag = {})))
      var i
      ;(function(e) {
        ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
      })((i = t.MinimapPosition || (t.MinimapPosition = {})))
      var f
      ;(function(e) {
        ;(e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
          (e[(e.TEXTAREA = 1)] = 'TEXTAREA'),
          (e[(e.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
          (e[(e.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
          (e[(e.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
          (e[(e.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
          (e[(e.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
          (e[(e.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
          (e[(e.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
          (e[(e.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
          (e[(e.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
          (e[(e.SCROLLBAR = 11)] = 'SCROLLBAR'),
          (e[(e.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
          (e[(e.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR')
      })((f = t.MouseTargetType || (t.MouseTargetType = {})))
      var b
      ;(function(e) {
        ;(e[(e.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
          (e[(e.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
          (e[(e.TOP_CENTER = 2)] = 'TOP_CENTER')
      })(
        (b =
          t.OverlayWidgetPositionPreference ||
          (t.OverlayWidgetPositionPreference = {}))
      )
      var N
      ;(function(e) {
        ;(e[(e.Left = 1)] = 'Left'),
          (e[(e.Center = 2)] = 'Center'),
          (e[(e.Right = 4)] = 'Right'),
          (e[(e.Full = 7)] = 'Full')
      })((N = t.OverviewRulerLane || (t.OverviewRulerLane = {})))
      var c
      ;(function(e) {
        ;(e[(e.Off = 0)] = 'Off'),
          (e[(e.On = 1)] = 'On'),
          (e[(e.Relative = 2)] = 'Relative'),
          (e[(e.Interval = 3)] = 'Interval'),
          (e[(e.Custom = 4)] = 'Custom')
      })((c = t.RenderLineNumbersType || (t.RenderLineNumbersType = {})))
      var g
      ;(function(e) {
        ;(e[(e.None = 0)] = 'None'),
          (e[(e.Text = 1)] = 'Text'),
          (e[(e.Blocks = 2)] = 'Blocks')
      })((g = t.RenderMinimap || (t.RenderMinimap = {})))
      var L
      ;(function(e) {
        ;(e[(e.Smooth = 0)] = 'Smooth'), (e[(e.Immediate = 1)] = 'Immediate')
      })((L = t.ScrollType || (t.ScrollType = {})))
      var A
      ;(function(e) {
        ;(e[(e.Auto = 1)] = 'Auto'),
          (e[(e.Hidden = 2)] = 'Hidden'),
          (e[(e.Visible = 3)] = 'Visible')
      })((A = t.ScrollbarVisibility || (t.ScrollbarVisibility = {})))
      var M
      ;(function(e) {
        ;(e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL')
      })((M = t.SelectionDirection || (t.SelectionDirection = {})))
      var R
      ;(function(e) {
        ;(e[(e.Invoke = 1)] = 'Invoke'),
          (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
          (e[(e.ContentChange = 3)] = 'ContentChange')
      })((R = t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})))
      var D
      ;(function(e) {
        ;(e[(e.File = 0)] = 'File'),
          (e[(e.Module = 1)] = 'Module'),
          (e[(e.Namespace = 2)] = 'Namespace'),
          (e[(e.Package = 3)] = 'Package'),
          (e[(e.Class = 4)] = 'Class'),
          (e[(e.Method = 5)] = 'Method'),
          (e[(e.Property = 6)] = 'Property'),
          (e[(e.Field = 7)] = 'Field'),
          (e[(e.Constructor = 8)] = 'Constructor'),
          (e[(e.Enum = 9)] = 'Enum'),
          (e[(e.Interface = 10)] = 'Interface'),
          (e[(e.Function = 11)] = 'Function'),
          (e[(e.Variable = 12)] = 'Variable'),
          (e[(e.Constant = 13)] = 'Constant'),
          (e[(e.String = 14)] = 'String'),
          (e[(e.Number = 15)] = 'Number'),
          (e[(e.Boolean = 16)] = 'Boolean'),
          (e[(e.Array = 17)] = 'Array'),
          (e[(e.Object = 18)] = 'Object'),
          (e[(e.Key = 19)] = 'Key'),
          (e[(e.Null = 20)] = 'Null'),
          (e[(e.EnumMember = 21)] = 'EnumMember'),
          (e[(e.Struct = 22)] = 'Struct'),
          (e[(e.Event = 23)] = 'Event'),
          (e[(e.Operator = 24)] = 'Operator'),
          (e[(e.TypeParameter = 25)] = 'TypeParameter')
      })((D = t.SymbolKind || (t.SymbolKind = {})))
      var T
      ;(function(e) {
        e[(e.Deprecated = 1)] = 'Deprecated'
      })((T = t.SymbolTag || (t.SymbolTag = {})))
      var $
      ;(function(e) {
        ;(e[(e.Hidden = 0)] = 'Hidden'),
          (e[(e.Blink = 1)] = 'Blink'),
          (e[(e.Smooth = 2)] = 'Smooth'),
          (e[(e.Phase = 3)] = 'Phase'),
          (e[(e.Expand = 4)] = 'Expand'),
          (e[(e.Solid = 5)] = 'Solid')
      })(
        ($ =
          t.TextEditorCursorBlinkingStyle ||
          (t.TextEditorCursorBlinkingStyle = {}))
      )
      var k
      ;(function(e) {
        ;(e[(e.Line = 1)] = 'Line'),
          (e[(e.Block = 2)] = 'Block'),
          (e[(e.Underline = 3)] = 'Underline'),
          (e[(e.LineThin = 4)] = 'LineThin'),
          (e[(e.BlockOutline = 5)] = 'BlockOutline'),
          (e[(e.UnderlineThin = 6)] = 'UnderlineThin')
      })((k = t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})))
      var F
      ;(function(e) {
        ;(e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] =
          'AlwaysGrowsWhenTypingAtEdges'),
          (e[(e.NeverGrowsWhenTypingAtEdges = 1)] =
            'NeverGrowsWhenTypingAtEdges'),
          (e[(e.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
          (e[(e.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter')
      })((F = t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})))
      var O
      ;(function(e) {
        ;(e[(e.None = 0)] = 'None'),
          (e[(e.Same = 1)] = 'Same'),
          (e[(e.Indent = 2)] = 'Indent'),
          (e[(e.DeepIndent = 3)] = 'DeepIndent')
      })((O = t.WrappingIndent || (t.WrappingIndent = {})))
    }),
    V(z[31], G([0, 1, 21, 9, 17, 13, 3, 6, 24, 25, 30]), function(
      I,
      t,
      p,
      P,
      E,
      u,
      d,
      l,
      s,
      h,
      w
    ) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.createMonacoBaseAPI = t.KeyMod = void 0)
      class a {
        static chord(C, n) {
          return E.KeyChord(C, n)
        }
      }
      ;(t.KeyMod = a),
        (a.CtrlCmd = 2048),
        (a.Shift = 1024),
        (a.Alt = 512),
        (a.WinCtrl = 256)
      function S() {
        return {
          editor: void 0,
          languages: void 0,
          CancellationTokenSource: p.CancellationTokenSource,
          Emitter: P.Emitter,
          KeyCode: w.KeyCode,
          KeyMod: a,
          Position: d.Position,
          Range: l.Range,
          Selection: s.Selection,
          SelectionDirection: w.SelectionDirection,
          MarkerSeverity: w.MarkerSeverity,
          MarkerTag: w.MarkerTag,
          Uri: u.URI,
          Token: h.Token
        }
      }
      t.createMonacoBaseAPI = S
    }),
    V(z[32], G([0, 1, 12]), function(I, t, p) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.PrefixSumComputer = t.PrefixSumIndexOfResult = void 0)
      class P {
        constructor(d, l) {
          ;(this.index = d), (this.remainder = l)
        }
      }
      t.PrefixSumIndexOfResult = P
      class E {
        constructor(d) {
          ;(this.values = d),
            (this.prefixSum = new Uint32Array(d.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1)
        }
        insertValues(d, l) {
          d = p.toUint32(d)
          const s = this.values,
            h = this.prefixSum,
            w = l.length
          return w === 0
            ? !1
            : ((this.values = new Uint32Array(s.length + w)),
              this.values.set(s.subarray(0, d), 0),
              this.values.set(s.subarray(d), d + w),
              this.values.set(l, d),
              d - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = d - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(
                  h.subarray(0, this.prefixSumValidIndex[0] + 1)
                ),
              !0)
        }
        changeValue(d, l) {
          return (
            (d = p.toUint32(d)),
            (l = p.toUint32(l)),
            this.values[d] === l
              ? !1
              : ((this.values[d] = l),
                d - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = d - 1),
                !0)
          )
        }
        removeValues(d, l) {
          ;(d = p.toUint32(d)), (l = p.toUint32(l))
          const s = this.values,
            h = this.prefixSum
          if (d >= s.length) return !1
          let w = s.length - d
          return (
            l >= w && (l = w),
            l === 0
              ? !1
              : ((this.values = new Uint32Array(s.length - l)),
                this.values.set(s.subarray(0, d), 0),
                this.values.set(s.subarray(d + l), d),
                (this.prefixSum = new Uint32Array(this.values.length)),
                d - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = d - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(
                    h.subarray(0, this.prefixSumValidIndex[0] + 1)
                  ),
                !0)
          )
        }
        getTotalValue() {
          return this.values.length === 0
            ? 0
            : this._getAccumulatedValue(this.values.length - 1)
        }
        getAccumulatedValue(d) {
          return d < 0 ? 0 : ((d = p.toUint32(d)), this._getAccumulatedValue(d))
        }
        _getAccumulatedValue(d) {
          if (d <= this.prefixSumValidIndex[0]) return this.prefixSum[d]
          let l = this.prefixSumValidIndex[0] + 1
          l === 0 && ((this.prefixSum[0] = this.values[0]), l++),
            d >= this.values.length && (d = this.values.length - 1)
          for (let s = l; s <= d; s++)
            this.prefixSum[s] = this.prefixSum[s - 1] + this.values[s]
          return (
            (this.prefixSumValidIndex[0] = Math.max(
              this.prefixSumValidIndex[0],
              d
            )),
            this.prefixSum[d]
          )
        }
        getIndexOf(d) {
          ;(d = Math.floor(d)), this.getTotalValue()
          let l = 0,
            s = this.values.length - 1,
            h = 0,
            w = 0,
            a = 0
          for (; l <= s; )
            if (
              ((h = (l + (s - l) / 2) | 0),
              (w = this.prefixSum[h]),
              (a = w - this.values[h]),
              d < a)
            )
              s = h - 1
            else if (d >= w) l = h + 1
            else break
          return new P(h, d - a)
        }
      }
      t.PrefixSumComputer = E
    }),
    V(z[33], G([0, 1, 5, 3, 32]), function(I, t, p, P, E) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.MirrorTextModel = void 0)
      class u {
        constructor(l, s, h, w) {
          ;(this._uri = l),
            (this._lines = s),
            (this._eol = h),
            (this._versionId = w),
            (this._lineStarts = null),
            (this._cachedTextValue = null)
        }
        dispose() {
          this._lines.length = 0
        }
        getText() {
          return (
            this._cachedTextValue === null &&
              (this._cachedTextValue = this._lines.join(this._eol)),
            this._cachedTextValue
          )
        }
        onEvents(l) {
          l.eol &&
            l.eol !== this._eol &&
            ((this._eol = l.eol), (this._lineStarts = null))
          const s = l.changes
          for (const h of s)
            this._acceptDeleteRange(h.range),
              this._acceptInsertText(
                new P.Position(h.range.startLineNumber, h.range.startColumn),
                h.text
              )
          ;(this._versionId = l.versionId), (this._cachedTextValue = null)
        }
        _ensureLineStarts() {
          if (!this._lineStarts) {
            const l = this._eol.length,
              s = this._lines.length,
              h = new Uint32Array(s)
            for (let w = 0; w < s; w++) h[w] = this._lines[w].length + l
            this._lineStarts = new E.PrefixSumComputer(h)
          }
        }
        _setLineText(l, s) {
          ;(this._lines[l] = s),
            this._lineStarts &&
              this._lineStarts.changeValue(
                l,
                this._lines[l].length + this._eol.length
              )
        }
        _acceptDeleteRange(l) {
          if (l.startLineNumber === l.endLineNumber) {
            if (l.startColumn === l.endColumn) return
            this._setLineText(
              l.startLineNumber - 1,
              this._lines[l.startLineNumber - 1].substring(
                0,
                l.startColumn - 1
              ) + this._lines[l.startLineNumber - 1].substring(l.endColumn - 1)
            )
            return
          }
          this._setLineText(
            l.startLineNumber - 1,
            this._lines[l.startLineNumber - 1].substring(0, l.startColumn - 1) +
              this._lines[l.endLineNumber - 1].substring(l.endColumn - 1)
          ),
            this._lines.splice(
              l.startLineNumber,
              l.endLineNumber - l.startLineNumber
            ),
            this._lineStarts &&
              this._lineStarts.removeValues(
                l.startLineNumber,
                l.endLineNumber - l.startLineNumber
              )
        }
        _acceptInsertText(l, s) {
          if (s.length !== 0) {
            let h = p.splitLines(s)
            if (h.length === 1) {
              this._setLineText(
                l.lineNumber - 1,
                this._lines[l.lineNumber - 1].substring(0, l.column - 1) +
                  h[0] +
                  this._lines[l.lineNumber - 1].substring(l.column - 1)
              )
              return
            }
            ;(h[h.length - 1] += this._lines[l.lineNumber - 1].substring(
              l.column - 1
            )),
              this._setLineText(
                l.lineNumber - 1,
                this._lines[l.lineNumber - 1].substring(0, l.column - 1) + h[0]
              )
            let w = new Uint32Array(h.length - 1)
            for (let a = 1; a < h.length; a++)
              this._lines.splice(l.lineNumber + a - 1, 0, h[a]),
                (w[a - 1] = h[a].length + this._eol.length)
            this._lineStarts && this._lineStarts.insertValues(l.lineNumber, w)
          }
        }
      }
      t.MirrorTextModel = u
    })
  var ne =
    (this && this.__awaiter) ||
    function(I, t, p, P) {
      function E(u) {
        return u instanceof p
          ? u
          : new p(function(d) {
              d(u)
            })
      }
      return new (p || (p = Promise))(function(u, d) {
        function l(w) {
          try {
            h(P.next(w))
          } catch (a) {
            d(a)
          }
        }
        function s(w) {
          try {
            h(P.throw(w))
          } catch (a) {
            d(a)
          }
        }
        function h(w) {
          w.done ? u(w.value) : E(w.value).then(l, s)
        }
        h((P = P.apply(I, t || [])).next())
      })
    }
  V(
    z[35],
    G([0, 1, 14, 10, 2, 13, 3, 6, 26, 33, 27, 28, 29, 31, 11, 8]),
    function(I, t, p, P, E, u, d, l, s, h, w, a, S, v, C, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.create = t.EditorSimpleWorker = void 0)
      class r extends h.MirrorTextModel {
        get uri() {
          return this._uri
        }
        get version() {
          return this._versionId
        }
        get eol() {
          return this._eol
        }
        getValue() {
          return this.getText()
        }
        getLinesContent() {
          return this._lines.slice(0)
        }
        getLineCount() {
          return this._lines.length
        }
        getLineContent(i) {
          return this._lines[i - 1]
        }
        getWordAtPosition(i, f) {
          let b = w.getWordAtText(
            i.column,
            w.ensureValidWordDefinition(f),
            this._lines[i.lineNumber - 1],
            0
          )
          return b
            ? new l.Range(
                i.lineNumber,
                b.startColumn,
                i.lineNumber,
                b.endColumn
              )
            : null
        }
        words(i) {
          const f = this._lines,
            b = this._wordenize.bind(this)
          let N = 0,
            c = '',
            g = 0,
            L = []
          return {
            *[Symbol.iterator]() {
              for (;;)
                if (g < L.length) {
                  const A = c.substring(L[g].start, L[g].end)
                  ;(g += 1), yield A
                } else if (N < f.length)
                  (c = f[N]), (L = b(c, i)), (g = 0), (N += 1)
                else break
            }
          }
        }
        getLineWords(i, f) {
          let b = this._lines[i - 1],
            N = this._wordenize(b, f),
            c = []
          for (const g of N)
            c.push({
              word: b.substring(g.start, g.end),
              startColumn: g.start + 1,
              endColumn: g.end + 1
            })
          return c
        }
        _wordenize(i, f) {
          const b = []
          let N
          for (f.lastIndex = 0; (N = f.exec(i)) && N[0].length !== 0; )
            b.push({ start: N.index, end: N.index + N[0].length })
          return b
        }
        getValueInRange(i) {
          if (
            ((i = this._validateRange(i)),
            i.startLineNumber === i.endLineNumber)
          )
            return this._lines[i.startLineNumber - 1].substring(
              i.startColumn - 1,
              i.endColumn - 1
            )
          let f = this._eol,
            b = i.startLineNumber - 1,
            N = i.endLineNumber - 1,
            c = []
          c.push(this._lines[b].substring(i.startColumn - 1))
          for (let g = b + 1; g < N; g++) c.push(this._lines[g])
          return c.push(this._lines[N].substring(0, i.endColumn - 1)), c.join(f)
        }
        offsetAt(i) {
          return (
            (i = this._validatePosition(i)),
            this._ensureLineStarts(),
            this._lineStarts.getAccumulatedValue(i.lineNumber - 2) +
              (i.column - 1)
          )
        }
        positionAt(i) {
          ;(i = Math.floor(i)), (i = Math.max(0, i)), this._ensureLineStarts()
          let f = this._lineStarts.getIndexOf(i),
            b = this._lines[f.index].length
          return {
            lineNumber: 1 + f.index,
            column: 1 + Math.min(f.remainder, b)
          }
        }
        _validateRange(i) {
          const f = this._validatePosition({
              lineNumber: i.startLineNumber,
              column: i.startColumn
            }),
            b = this._validatePosition({
              lineNumber: i.endLineNumber,
              column: i.endColumn
            })
          return f.lineNumber !== i.startLineNumber ||
            f.column !== i.startColumn ||
            b.lineNumber !== i.endLineNumber ||
            b.column !== i.endColumn
            ? {
                startLineNumber: f.lineNumber,
                startColumn: f.column,
                endLineNumber: b.lineNumber,
                endColumn: b.column
              }
            : i
        }
        _validatePosition(i) {
          if (!d.Position.isIPosition(i)) throw new Error('bad position')
          let { lineNumber: f, column: b } = i,
            N = !1
          if (f < 1) (f = 1), (b = 1), (N = !0)
          else if (f > this._lines.length)
            (f = this._lines.length),
              (b = this._lines[f - 1].length + 1),
              (N = !0)
          else {
            let c = this._lines[f - 1].length + 1
            b < 1 ? ((b = 1), (N = !0)) : b > c && ((b = c), (N = !0))
          }
          return N ? { lineNumber: f, column: b } : i
        }
      }
      class m {
        constructor(i, f) {
          ;(this._host = i),
            (this._models = Object.create(null)),
            (this._foreignModuleFactory = f),
            (this._foreignModule = null)
        }
        dispose() {
          this._models = Object.create(null)
        }
        _getModel(i) {
          return this._models[i]
        }
        _getModels() {
          let i = []
          return (
            Object.keys(this._models).forEach(f => i.push(this._models[f])), i
          )
        }
        acceptNewModel(i) {
          this._models[i.url] = new r(
            u.URI.parse(i.url),
            i.lines,
            i.EOL,
            i.versionId
          )
        }
        acceptModelChanged(i, f) {
          !this._models[i] || this._models[i].onEvents(f)
        }
        acceptRemovedModel(i) {
          !this._models[i] || delete this._models[i]
        }
        computeDiff(i, f, b, N) {
          return ne(this, void 0, void 0, function*() {
            const c = this._getModel(i),
              g = this._getModel(f)
            if (!c || !g) return null
            const L = c.getLinesContent(),
              A = g.getLinesContent(),
              R = new s.DiffComputer(L, A, {
                shouldComputeCharChanges: !0,
                shouldPostProcessCharChanges: !0,
                shouldIgnoreTrimWhitespace: b,
                shouldMakePrettyDiff: !0,
                maxComputationTime: N
              }).computeDiff(),
              D = R.changes.length > 0 ? !1 : this._modelsAreIdentical(c, g)
            return { quitEarly: R.quitEarly, identical: D, changes: R.changes }
          })
        }
        _modelsAreIdentical(i, f) {
          const b = i.getLineCount(),
            N = f.getLineCount()
          if (b !== N) return !1
          for (let c = 1; c <= b; c++) {
            const g = i.getLineContent(c),
              L = f.getLineContent(c)
            if (g !== L) return !1
          }
          return !0
        }
        computeMoreMinimalEdits(i, f) {
          return ne(this, void 0, void 0, function*() {
            const b = this._getModel(i)
            if (!b) return f
            const N = []
            let c
            f = p.mergeSort(f, (g, L) => {
              if (g.range && L.range)
                return l.Range.compareRangesUsingStarts(g.range, L.range)
              let A = g.range ? 0 : 1,
                M = L.range ? 0 : 1
              return A - M
            })
            for (let { range: g, text: L, eol: A } of f)
              if (
                (typeof A == 'number' && (c = A), !(l.Range.isEmpty(g) && !L))
              ) {
                const M = b.getValueInRange(g)
                if (((L = L.replace(/\r\n|\n|\r/g, b.eol)), M !== L)) {
                  if (Math.max(L.length, M.length) > m._diffLimit) {
                    N.push({ range: g, text: L })
                    continue
                  }
                  const R = P.stringDiff(M, L, !1),
                    D = b.offsetAt(l.Range.lift(g).getStartPosition())
                  for (const T of R) {
                    const $ = b.positionAt(D + T.originalStart),
                      k = b.positionAt(D + T.originalStart + T.originalLength),
                      F = {
                        text: L.substr(T.modifiedStart, T.modifiedLength),
                        range: {
                          startLineNumber: $.lineNumber,
                          startColumn: $.column,
                          endLineNumber: k.lineNumber,
                          endColumn: k.column
                        }
                      }
                    b.getValueInRange(F.range) !== F.text && N.push(F)
                  }
                }
              }
            return (
              typeof c == 'number' &&
                N.push({
                  eol: c,
                  text: '',
                  range: {
                    startLineNumber: 0,
                    startColumn: 0,
                    endLineNumber: 0,
                    endColumn: 0
                  }
                }),
              N
            )
          })
        }
        computeLinks(i) {
          return ne(this, void 0, void 0, function*() {
            let f = this._getModel(i)
            return f ? a.computeLinks(f) : null
          })
        }
        textualSuggest(i, f, b, N) {
          return ne(this, void 0, void 0, function*() {
            const c = new n.StopWatch(!0),
              g = new RegExp(b, N),
              L = new Set()
            e: for (let A of i) {
              const M = this._getModel(A)
              if (!!M) {
                for (let R of M.words(g))
                  if (
                    !(R === f || !isNaN(Number(R))) &&
                    (L.add(R), L.size > m._suggestionsLimit)
                  )
                    break e
              }
            }
            return { words: Array.from(L), duration: c.elapsed() }
          })
        }
        computeWordRanges(i, f, b, N) {
          return ne(this, void 0, void 0, function*() {
            let c = this._getModel(i)
            if (!c) return Object.create(null)
            const g = new RegExp(b, N),
              L = Object.create(null)
            for (let A = f.startLineNumber; A < f.endLineNumber; A++) {
              let M = c.getLineWords(A, g)
              for (const R of M)
                if (!!isNaN(Number(R.word))) {
                  let D = L[R.word]
                  D || ((D = []), (L[R.word] = D)),
                    D.push({
                      startLineNumber: A,
                      startColumn: R.startColumn,
                      endLineNumber: A,
                      endColumn: R.endColumn
                    })
                }
            }
            return L
          })
        }
        navigateValueSet(i, f, b, N, c) {
          return ne(this, void 0, void 0, function*() {
            let g = this._getModel(i)
            if (!g) return null
            let L = new RegExp(N, c)
            f.startColumn === f.endColumn &&
              (f = {
                startLineNumber: f.startLineNumber,
                startColumn: f.startColumn,
                endLineNumber: f.endLineNumber,
                endColumn: f.endColumn + 1
              })
            let A = g.getValueInRange(f),
              M = g.getWordAtPosition(
                { lineNumber: f.startLineNumber, column: f.startColumn },
                L
              )
            if (!M) return null
            let R = g.getValueInRange(M)
            return S.BasicInplaceReplace.INSTANCE.navigateValueSet(
              f,
              A,
              M,
              R,
              b
            )
          })
        }
        loadForeignModule(i, f, b) {
          const N = (L, A) => this._host.fhr(L, A)
          let g = {
            host: C.createProxyObject(b, N),
            getMirrorModels: () => this._getModels()
          }
          return this._foreignModuleFactory
            ? ((this._foreignModule = this._foreignModuleFactory(g, f)),
              Promise.resolve(C.getAllMethodNames(this._foreignModule)))
            : new Promise((L, A) => {
                I(
                  [i],
                  M => {
                    ;(this._foreignModule = M.create(g, f)),
                      L(C.getAllMethodNames(this._foreignModule))
                  },
                  A
                )
              })
        }
        fmr(i, f) {
          if (
            !this._foreignModule ||
            typeof this._foreignModule[i] != 'function'
          )
            return Promise.reject(
              new Error('Missing requestHandler or method: ' + i)
            )
          try {
            return Promise.resolve(
              this._foreignModule[i].apply(this._foreignModule, f)
            )
          } catch (b) {
            return Promise.reject(b)
          }
        }
      }
      ;(t.EditorSimpleWorker = m),
        (m._diffLimit = 1e5),
        (m._suggestionsLimit = 1e4)
      function _(o) {
        return new m(o, null)
      }
      ;(t.create = _),
        typeof importScripts == 'function' &&
          (E.globals.monaco = v.createMonacoBaseAPI())
    }
  )
  ;('use strict')
  ;(function() {
    var I, t
    const p = self.MonacoEnvironment,
      P = p && p.baseUrl ? p.baseUrl : '../../../',
      E =
        typeof ((I = self.trustedTypes) === null || I === void 0
          ? void 0
          : I.createPolicy) == 'function'
          ? (t = self.trustedTypes) === null || t === void 0
            ? void 0
            : t.createPolicy('amdLoader', { createScriptURL: s => s })
          : void 0
    if (typeof self.define != 'function' || !self.define.amd) {
      let s = P + 'vs/loader.js'
      E && (s = E.createScriptURL(s)), importScripts(s)
    }
    require.config({ baseUrl: P, catchError: !0, trustedTypesPolicy: E })
    let u = function(s) {
        require([s], function(h) {
          setTimeout(function() {
            let w = h.create((a, S) => {
              self.postMessage(a, S)
            }, null)
            for (self.onmessage = a => w.onmessage(a.data); l.length > 0; )
              self.onmessage(l.shift())
          }, 0)
        })
      },
      d = !0,
      l = []
    self.onmessage = s => {
      if (!d) {
        l.push(s)
        return
      }
      ;(d = !1), u(s.data)
    }
  })()
}.call(this))
