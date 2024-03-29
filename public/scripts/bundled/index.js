// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"g61Xf":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "b8e5beffa3b6ddc5";
module.bundle.HMR_BUNDLE_ID = "9b4808fe83d38e32";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"3r7Gr":[function(require,module,exports) {
var _loginJs = require("./login.js");
var _checkoutJs = require("./checkout.js");
var _summaryJs = require("./summary.js");
var _userPageJs = require("./userPage.js");
var _resourceConsoleJs = require("./resourceConsole.js");
"use strict";
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");
const hamburgerBtn = document.getElementById("hamburger-btn");
const menu = document.getElementById("menu");
const ticketBtns = document.querySelectorAll(".ticket-btn");
const confirmTicketsBtn = document.querySelector(".confirm-tickets-btn");
const seatSelectionDiv = document.querySelector(".seats-selection");
const proceedBtn = document.querySelector(".confirm-seats-btn");
const proceedPaymentBtn = document.querySelector(".proceed-payment-btn");
const deleteAccountLink = document.querySelector(".delete-account");
const resourceSearchBar = document.getElementById("resource-search-bar");
const resourceNewBtn = document.getElementById("resource-new-btn");
const resourceEditBtn = document.getElementById("resource-edit-btn");
const resourceDeleteBtn = document.getElementById("resource-delete-btn");
const resourceItemRadios = document.querySelectorAll(".resource-list-item input");
const resourceFormCancelBtn = document.getElementById("resource-form-cancel-btn");
const resourceForm = document.getElementById("resource-form");
const roomWidthInput = document.getElementById("rooms-dimensions-width");
const roomLengthInput = document.getElementById("rooms-dimensions-length");
const dateSelectionTilesDiv = document.querySelector(".date-selection-tiles");
if (dateSelectionTilesDiv) {
    const firstDateSelectionTile = document.querySelector(".date-selection-tile");
    firstDateSelectionTile.classList.add("date-selection-tile-active");
    const selectedScreeningTimes = document.querySelectorAll(`.screening-time[data-date="${firstDateSelectionTile.dataset.dateSelection}"]`);
    selectedScreeningTimes.forEach((el)=>{
        el.classList.add("screening-time-shown");
    });
    const allDateSelectionTiles = document.querySelectorAll(".date-selection-tile");
    allDateSelectionTiles.forEach((tile)=>{
        tile.addEventListener("click", (e)=>{
            const prevSelectedTile = document.querySelector(".date-selection-tile-active");
            prevSelectedTile.classList.remove("date-selection-tile-active");
            e.target.classList.add("date-selection-tile-active");
            const prevRevealedTimes = document.querySelectorAll(".screening-time-shown");
            prevRevealedTimes.forEach((el)=>{
                el.classList.remove("screening-time-shown");
            });
            const selectedScreeningTimes = document.querySelectorAll(`.screening-time[data-date="${e.target.dataset.dateSelection}"]`);
            selectedScreeningTimes.forEach((el)=>{
                el.classList.add("screening-time-shown");
            });
        });
    });
}
if (hamburgerBtn) hamburgerBtn.addEventListener("click", function() {
    hamburgerBtn.classList.toggle("is-active");
    menu.classList.toggle("is-active");
});
if (loginForm) loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, _loginJs.login)(email, password);
});
if (signupForm) signupForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("emailSU").value;
    const password = document.getElementById("passwordSU").value;
    const passwordConfirm = document.getElementById("passwordConfirmSU").value;
    const firstName = document.getElementById("firstNameSU").value;
    const lastName = document.getElementById("lastNameSU").value;
    const phoneNumber = document.getElementById("phoneNumberSU").value;
    (0, _loginJs.signup)(email, password, passwordConfirm, firstName, lastName, phoneNumber !== "" ? phoneNumber : undefined);
});
if (logoutBtn) logoutBtn.addEventListener("click", (0, _loginJs.logout));
if (ticketBtns) {
    const ticketNumbers = Array.from(document.querySelectorAll(".ticket-number"));
    ticketBtns.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            (0, _checkoutJs.handleTicketButton)(btn.dataset.btnType, ticketNumbers.find((el)=>el.dataset.ticketType === btn.dataset.ticketType));
        });
    });
}
if (confirmTicketsBtn) confirmTicketsBtn.addEventListener("click", (e)=>{
    (0, _checkoutJs.confirmEditTickets)(e.target);
});
if (seatSelectionDiv) {
    if (seatSelectionDiv.dataset.roomId) (0, _checkoutJs.populateRoomLayout)(seatSelectionDiv.dataset.roomId, seatSelectionDiv);
    else (0, _resourceConsoleJs.populateRoomLayoutAdmin)(undefined, seatSelectionDiv);
}
if (proceedBtn) proceedBtn.addEventListener("click", (e)=>{
    (0, _checkoutJs.finalizeBooking)();
});
if (proceedPaymentBtn) proceedPaymentBtn.addEventListener("click", (e)=>{
    (0, _summaryJs.goToCheckout)(e.target);
});
if (deleteAccountLink) deleteAccountLink.addEventListener("click", (e)=>(0, _userPageJs.deleteAccount)());
if (resourceSearchBar) resourceSearchBar.addEventListener("input", (e)=>(0, _resourceConsoleJs.filterResourceList)(e.target));
if (resourceNewBtn) resourceNewBtn.addEventListener("click", (e)=>(0, _resourceConsoleJs.openNewResourceModal)());
if (resourceFormCancelBtn) resourceFormCancelBtn.addEventListener("click", (e)=>{
    document.getElementById("create-edit-dialog").close();
});
if (resourceItemRadios) resourceItemRadios.forEach((radio)=>{
    radio.addEventListener("change", (e)=>{
        if (resourceDeleteBtn) resourceDeleteBtn.disabled = false;
        if (resourceEditBtn) resourceEditBtn.disabled = false;
    });
});
if (resourceEditBtn) resourceEditBtn.addEventListener("click", (e)=>{
    const itemId = document.querySelector(".resource-list-item input:checked").value;
    (0, _resourceConsoleJs.openEditResourceModal)(itemId, e.target.dataset.resource);
});
if (resourceDeleteBtn) resourceDeleteBtn.addEventListener("click", (e)=>{
    const itemId = document.querySelector(".resource-list-item input:checked").value;
    (0, _resourceConsoleJs.handleDeleteResource)(itemId, e.target.dataset.resource);
});
if (resourceForm) resourceForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    (0, _resourceConsoleJs.handleResourceFormSubmission)(e.target.dataset.operation, e.target.dataset.resource);
});
if (roomLengthInput && roomWidthInput) {
    roomLengthInput.addEventListener("change", (e)=>(0, _resourceConsoleJs.populateRoomLayoutAdmin)(undefined, seatSelectionDiv));
    roomWidthInput.addEventListener("change", (e)=>(0, _resourceConsoleJs.populateRoomLayoutAdmin)(undefined, seatSelectionDiv));
}

},{"./login.js":"eHNGO","./checkout.js":"9b6wq","./summary.js":"62RuN","./userPage.js":"bLBCY","./resourceConsole.js":"ibxqy"}],"eHNGO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
parcelHelpers.export(exports, "signup", ()=>signup);
var _backEndConnectionsJs = require("./backEndConnections.js");
var _alertsJs = require("./alerts.js");
"use strict";
const login = async (email, password)=>{
    try {
        const result = await (0, _backEndConnectionsJs.loadJSON)("http://localhost:3000/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (result.status === "success") {
            (0, _alertsJs.showAlert)("success", "Logged in successfully!");
            if (location.pathname === "/login") window.setTimeout(()=>{
                location.assign("/home");
            }, 1500);
            else if (location.pathname.startsWith("/checkoutLogin")) {
                console.log(location.pathname.split("/").at(-1));
                window.setTimeout(()=>{
                    location.assign(`/checkout/screenings/${location.pathname.split("/")[-1]}`);
                }, 1500);
            }
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
    }
};
const logout = async ()=>{
    try {
        const result = await (0, _backEndConnectionsJs.loadJSON)("http://localhost:3000/api/v1/users/logout", {
            method: "GET"
        });
        if (result.status === "success") location.reload(true);
    } catch (error) {
        (0, _alertsJs.showAlert)("error", "Error logging out! Try again.");
    }
};
const signup = async (email, password, passwordConfirm, firstName, lastName, phoneNumber)=>{
    try {
        const result = await (0, _backEndConnectionsJs.loadJSON)("http://localhost:3000/api/v1/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                passwordConfirm,
                firstName,
                lastName,
                phoneNumber: phoneNumber
            })
        });
        if (result.status === "success") {
            (0, _alertsJs.showAlert)("success", "Signed up successfully!");
            if (location.pathname === "/signup") window.setTimeout(()=>{
                location.assign("/home");
            }, 1500);
            else if (location.pathname.startsWith("/checkoutLogin")) window.setTimeout(()=>{
                location.assign(`/checkout/screenings/${res.locals.screeningID}`);
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
    }
};

},{"./backEndConnections.js":"erlY1","./alerts.js":"TpGze","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"erlY1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadJSON", ()=>loadJSON);
parcelHelpers.export(exports, "getRoom", ()=>getRoom);
parcelHelpers.export(exports, "getScreening", ()=>getScreening);
parcelHelpers.export(exports, "postReservation", ()=>postReservation);
parcelHelpers.export(exports, "createCheckout", ()=>createCheckout);
parcelHelpers.export(exports, "deleteMe", ()=>deleteMe);
parcelHelpers.export(exports, "getResource", ()=>getResource);
parcelHelpers.export(exports, "submitResource", ()=>submitResource);
parcelHelpers.export(exports, "deleteResource", ()=>deleteResource);
"use strict";
async function loadJSON(url, options) {
    try {
        const response = await fetch(url, options);
        const jsonBody = await response.json();
        if (!response.ok) {
            const error = Error(jsonBody.message);
            error.status = response.status;
            throw error;
        }
        return jsonBody;
    } catch (error) {
        console.log(error);
    }
}
async function getRoom(id) {
    try {
        const result = await loadJSON(`${location.origin}/api/v1/rooms/${id}`);
        return result.data.room;
    } catch (error) {
        console.log(error);
    }
}
async function getScreening(id) {
    try {
        const result = await loadJSON(`${location.origin}/api/v1/screenings/${id}`);
        return result.data.screening;
    } catch (error) {
        console.log(error);
    }
}
async function postReservation(screeningID, tickets) {
    try {
        const result = await loadJSON(`${location.origin}/api/v1/bookings/reservation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                screeningID,
                tickets
            })
        });
        return result.data.newReservation;
    } catch (error) {
        return error;
    }
}
async function createCheckout(id) {
    try {
        const session = await loadJSON(`${location.origin}/api/v1/bookings/checkout/bookings/${id}`, {
            method: "POST"
        });
        return session.session;
    } catch (error) {
        console.log(error);
        return error;
    }
}
async function deleteMe() {
    try {
        const result = await loadJSON(`${location.origin}/api/v1/users/deleteMe`, {
            method: "DELETE"
        });
        return result;
    } catch (error) {
        return error;
    }
}
async function getResource(id, resource) {
    const result = await loadJSON(`${location.origin}/api/v1/${resource}/${id}`);
    return result.data[resource.substring(0, resource.length - 1)];
}
async function submitResource(data, resource) {
    if (data.id) {
        const id = data.id;
        delete data.id;
        return await loadJSON(`${location.origin}/api/v1/${resource}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
    return await loadJSON(`${location.origin}/api/v1/${resource}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
async function deleteResource(id, resource) {
    return await loadJSON(`${location.origin}/api/v1/${resource}/${id}`, {
        method: "DELETE"
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"5Birt":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"TpGze":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
const hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class="alert alert-${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"9b6wq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleTicketButton", ()=>handleTicketButton);
parcelHelpers.export(exports, "confirmEditTickets", ()=>confirmEditTickets);
parcelHelpers.export(exports, "populateRoomLayout", ()=>populateRoomLayout);
parcelHelpers.export(exports, "finalizeBooking", ()=>finalizeBooking);
var _alertsJs = require("./alerts.js");
var _backEndConnectionsJs = require("./backEndConnections.js");
"use strict";
const seatSelectionDiv = document.querySelector(".seats-selection");
const proceedBtn = document.querySelector(".confirm-seats-btn");
const rowChars = [
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
    "Z"
];
const checkoutData = {};
const handleTicketButton = (action, target)=>{
    if (action === "plus") target.innerText = target.innerText * 1 + 1;
    if (action === "minus") target.innerText = target.innerText * 1 > 0 ? target.innerText * 1 - 1 : 0;
};
const updateSeatSelection = async ()=>{
    const screening = await (0, _backEndConnectionsJs.getScreening)(seatSelectionDiv.dataset.screeningId);
    const bookedSeatsArray = screening.bookedSeats;
    document.querySelectorAll(".seat").forEach((el)=>{
        el.classList.remove("seat-taken");
    });
    bookedSeatsArray.forEach((booking)=>{
        booking.tickets.forEach((ticket)=>{
            const seatEl = document.querySelector(`[data-row="${ticket.seatRow}"][data-col="${ticket.seatCol}"]`);
            seatEl.classList.add("seat-taken");
            if (seatEl.classList.contains("seat-selected")) {
                seatEl.classList.remove("seat-selected");
                checkoutData["selectedPositions"] = checkoutData["selectedPositions"].filter((el)=>el.toString() !== [
                        seatEl.dataset.row,
                        seatEl.dataset.col
                    ].toString());
                checkoutData["numOfSelected"] = checkoutData["numOfSelected"] - 1;
            }
        });
    });
};
const confirmEditTickets = (btn)=>{
    const ticketsElements = Array.from(document.querySelectorAll(".ticket-number"));
    const ticketsTotal = ticketsElements.reduce((accum, el)=>accum + el.innerText * 1, 0);
    if (ticketsTotal === 0) {
        (0, _alertsJs.showAlert)("error", "Select a valid number of tickets.");
        return;
    }
    document.querySelectorAll(".ticket-btn").forEach((btn)=>btn.disabled = !btn.disabled);
    if (btn.innerText === "EDIT") {
        btn.innerText = "Confirm";
        seatSelectionDiv.classList.toggle("seats-not-clickable");
        proceedBtn.disabled = true;
    } else {
        seatSelectionDiv.classList.toggle("seats-not-clickable");
        btn.innerText = "Edit";
        ticketsElements.forEach((el)=>{
            checkoutData[el.dataset.ticketType] = el.innerText;
        });
        checkoutData["numOfTickets"] = ticketsTotal;
        proceedBtn.disabled = false;
        if (checkoutData["numOfSelected"] && checkoutData["numOfSelected"] > checkoutData["numOfTickets"]) {
            const diff = checkoutData["numOfSelected"] - checkoutData["numOfTickets"];
            for(let i = 0; i < diff; i++){
                const extraSeat = checkoutData["selectedPositions"].pop();
                document.querySelector(`[data-row="${extraSeat.at(0)}"][data-col="${extraSeat.at(1)}"]`).classList.remove("seat-selected");
            }
            checkoutData["numOfSelected"] = checkoutData["numOfTickets"];
        }
        updateSeatSelection();
    }
};
const selectSeat = (target)=>{
    if (!target.classList.contains("seat-taken") && (!checkoutData.numOfSelected || checkoutData.numOfTickets > checkoutData.numOfSelected) && !target.classList.contains("seat-selected")) {
        target.classList.add("seat-selected");
        const selectedPositions = checkoutData.selectedPositions || [];
        selectedPositions.push([
            target.dataset.row,
            target.dataset.col
        ]);
        checkoutData["selectedPositions"] = selectedPositions;
        checkoutData["numOfSelected"] = checkoutData["numOfSelected"] + 1 || 1;
    } else if (!target.classList.contains("seat-taken") && target.classList.contains("seat-selected")) {
        target.classList.remove("seat-selected");
        const unselectedCoords = [
            target.dataset.row,
            target.dataset.col
        ];
        checkoutData["selectedPositions"] = checkoutData["selectedPositions"].filter((el)=>el.toString() !== unselectedCoords.toString());
        checkoutData["numOfSelected"] = checkoutData["numOfSelected"] - 1;
    }
};
const populateRoomLayout = async (roomId, seatSelectionDiv)=>{
    const room = await (0, _backEndConnectionsJs.getRoom)(roomId);
    const rowNameColumn = document.createElement("div");
    rowNameColumn.classList.add("row-char-column");
    for(let r = 0; r < room.dimensions.length; r++){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("seats-row");
        const rowName = document.createElement("div");
        rowName.innerText = rowChars.at(r);
        rowNameColumn.appendChild(rowName);
        for(let c = 0; c < room.dimensions.width; c++){
            const seatPos = document.createElement("div");
            seatPos.classList.add("seat-position");
            seatPos.dataset.col = c;
            seatPos.dataset.row = r;
            rowDiv.appendChild(seatPos);
        }
        seatSelectionDiv.appendChild(rowDiv);
    }
    seatSelectionDiv.insertAdjacentElement("beforebegin", rowNameColumn);
    room.seatPositions.forEach((pos)=>{
        const seatEl = document.querySelector(`[data-row="${pos.row}"][data-col="${pos.col}"]`);
        seatEl.classList.add("seat");
        seatEl.innerText = seatEl.previousElementSibling ? seatEl.previousElementSibling.innerText * 1 + 1 : 1;
        seatEl.addEventListener("click", (e)=>{
            selectSeat(e.target);
        });
    });
    updateSeatSelection();
};
const finalizeBooking = async ()=>{
    try {
        if (checkoutData["numOfSelected"] !== checkoutData["numOfTickets"]) {
            (0, _alertsJs.showAlert)("error", "Incorrect number of seats selected.");
            return;
        }
        checkoutData.seatNames = [];
        checkoutData["selectedPositions"].forEach((pos)=>{
            const seatEl = document.querySelector(`[data-row="${pos.at(0)}"][data-col="${pos.at(1)}"]`);
            checkoutData.seatNames.push(`${rowChars.at(pos.at(0))}-${seatEl.innerText}`);
        });
        checkoutData.screeningID = seatSelectionDiv.dataset.screeningId;
        const priceArray = [];
        for(let i = 0; i < checkoutData.standard; i++)priceArray.push(8.0);
        for(let i = 0; i < checkoutData.student; i++)priceArray.push(6.0);
        const tickets = [];
        for (const i of checkoutData.selectedPositions.keys())tickets.push({
            seatRow: checkoutData.selectedPositions.at(i).at(0) * 1,
            seatCol: checkoutData.selectedPositions.at(i).at(1) * 1,
            seatName: checkoutData.seatNames.at(i),
            price: priceArray.at(i)
        });
        const reservation = await (0, _backEndConnectionsJs.postReservation)(checkoutData.screeningID, tickets);
        location.assign(`/summary/${reservation._id}`);
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
        if (error.message === "Selected seats are no longer available.") updateSeatSelection();
    }
};

},{"./alerts.js":"TpGze","./backEndConnections.js":"erlY1","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"62RuN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "goToCheckout", ()=>goToCheckout);
var _backEndConnectionsJs = require("./backEndConnections.js");
var _alertsJs = require("./alerts.js");
"use strict";
const goToCheckout = async (target)=>{
    try {
        target.innerText = "Processing...";
        const session = await (0, _backEndConnectionsJs.createCheckout)(target.dataset.bookingId);
        location.assign(session.url);
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error);
        target.innerText = "Proceed to payment";
    }
};

},{"./backEndConnections.js":"erlY1","./alerts.js":"TpGze","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"bLBCY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "deleteAccount", ()=>deleteAccount);
var _alertsJs = require("./alerts.js");
var _backEndConnectionsJs = require("./backEndConnections.js");
"use strict";
const deleteAccount = async ()=>{
    try {
        if (window.confirm("Are you sure you want to delete your account?")) {
            await (0, _backEndConnectionsJs.deleteMe)();
            (0, _alertsJs.showAlert)("success", "Successfully deleted account.");
            const result = await (0, _backEndConnectionsJs.loadJSON)("http://localhost:3000/api/v1/users/logout", {
                method: "GET"
            });
            window.setTimeout(()=>{
                location.assign(`/home`);
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
    }
};

},{"./alerts.js":"TpGze","./backEndConnections.js":"erlY1","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"ibxqy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "filterResourceList", ()=>filterResourceList);
parcelHelpers.export(exports, "openNewResourceModal", ()=>openNewResourceModal);
parcelHelpers.export(exports, "openEditResourceModal", ()=>openEditResourceModal);
parcelHelpers.export(exports, "handleDeleteResource", ()=>handleDeleteResource);
parcelHelpers.export(exports, "populateRoomLayoutAdmin", ()=>populateRoomLayoutAdmin);
parcelHelpers.export(exports, "handleResourceFormSubmission", ()=>handleResourceFormSubmission);
var _alertsJs = require("./alerts.js");
var _backEndConnectionsJs = require("./backEndConnections.js");
var _compileDataJs = require("./compileData.js");
const resourceListItems = document.querySelectorAll(".resource-list-item");
const rowChars = [
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
    "Z"
];
const filterResourceList = (target)=>{
    const searchTerm = target.value.trim().toLowerCase();
    for (const item of resourceListItems)if (item.lastChild.firstChild.firstChild.innerText.trim().toLowerCase().includes(searchTerm)) item.classList.remove("resource-not-matched");
    else item.classList.add("resource-not-matched");
};
const clearResourceForm = ()=>{
    const allInputs = document.querySelectorAll(".form-input");
    allInputs.forEach((inputEl)=>{
        if (inputEl.tagName === "SELECT") document.querySelector('option[value=""]').selected = true;
        else if (inputEl.type === "number" && inputEl.min) inputEl.value = inputEl.min;
        else inputEl.value = "";
    });
    if (document.getElementById("rooms-seatPositions")) populateRoomLayoutAdmin(undefined, document.getElementById("rooms-seatPositions"));
};
const openNewResourceModal = ()=>{
    clearResourceForm();
    const createDialog = document.getElementById("create-edit-dialog");
    const resourceForm = document.getElementById("resource-form");
    resourceForm.dataset.operation = "create";
    createDialog.showModal();
};
const openEditResourceModal = async (itemId, resource)=>{
    try {
        clearResourceForm();
        const resourceData = await (0, _backEndConnectionsJs.getResource)(itemId, resource);
        delete resourceData._id;
        delete resourceData.__v;
        delete resourceData.bookedSeats;
        delete resourceData.id;
        delete resourceData.slug;
        const editDialog = document.getElementById("create-edit-dialog");
        const resourceFormItemID = document.querySelector(".resource-form-id");
        const resourceForm = document.getElementById("resource-form");
        resourceForm.dataset.operation = "edit";
        resourceFormItemID.innerText = `ID: ${itemId}`;
        if (resourceData.dimensions) {
            for(const prop in resourceData.dimensions){
                const formInput = document.getElementById(`${resource}-dimensions-${prop}`);
                formInput.value = resourceData.dimensions[prop];
            }
            delete resourceData.dimensions;
        }
        for(const prop in resourceData){
            const formInput = document.getElementById(`${resource}-${prop}`);
            if (prop === "seatPositions") populateRoomLayoutAdmin(itemId, formInput);
            else if (formInput.tagName === "SELECT") document.querySelector(`option[value="${resourceData[prop]}"]`).selected = true;
            else if (formInput.type === "date") {
                const dateObj = new Date(resourceData["releaseDate"]);
                formInput.value = resourceData[prop].substring(0, dateObj.toISOString().indexOf("T"));
            } else if (formInput.type === "datetime-local") {
                const dateObj = new Date(resourceData["date"]);
                const tzoffset = new Date().getTimezoneOffset() * 60000 //offset in milliseconds
                ;
                const localISOTime = new Date(dateObj - tzoffset).toISOString().slice(0, -1);
                formInput.value = localISOTime;
            } else formInput.value = !Array.isArray(resourceData[prop]) ? resourceData[prop] : resourceData[prop].join(", ");
        }
        editDialog.showModal();
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
    }
};
const handleDeleteResource = async (itemId, resource)=>{
    try {
        if (window.confirm(`Are you sure you want to delete this ${resource.substring(0, resource.length - 1)}?`)) {
            await (0, _backEndConnectionsJs.deleteResource)(itemId, resource);
            (0, _alertsJs.showAlert)("success", "Successfully deleted resource.");
            window.setTimeout(()=>{
                location.reload();
            }, 1500);
        }
    } catch (error) {
        (0, _alertsJs.showAlert)("error", error.message);
    }
};
const selectSeatAdmin = (target)=>{
    target.classList.toggle("seat");
};
const populateRoomLayoutAdmin = async (roomId, seatSelectionDiv)=>{
    let room;
    if (roomId) room = await (0, _backEndConnectionsJs.getRoom)(roomId);
    else room = {
        dimensions: {
            length: document.getElementById("rooms-dimensions-length").value * 1,
            width: document.getElementById("rooms-dimensions-width").value * 1
        }
    };
    if (document.querySelector(".row-char-column")) document.querySelector(".row-char-column").remove();
    while(seatSelectionDiv.firstChild)seatSelectionDiv.removeChild(seatSelectionDiv.firstChild);
    const rowNameColumn = document.createElement("div");
    rowNameColumn.classList.add("row-char-column");
    for(let r = 0; r < room.dimensions.length; r++){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("seats-row");
        const rowName = document.createElement("div");
        rowName.innerText = rowChars.at(r);
        rowNameColumn.appendChild(rowName);
        for(let c = 0; c < room.dimensions.width; c++){
            const seatPos = document.createElement("div");
            seatPos.classList.add("seat-position", "seat-outline");
            seatPos.addEventListener("click", (e)=>{
                selectSeatAdmin(e.target);
            });
            seatPos.dataset.col = c;
            seatPos.dataset.row = r;
            rowDiv.appendChild(seatPos);
        }
        seatSelectionDiv.appendChild(rowDiv);
    }
    seatSelectionDiv.insertAdjacentElement("beforebegin", rowNameColumn);
    if (roomId) room.seatPositions.forEach((pos)=>{
        const seatEl = document.querySelector(`[data-row="${pos.row}"][data-col="${pos.col}"]`);
        seatEl.classList.add("seat");
    });
    else {
        const allSeatPos = document.querySelectorAll(".seat-position");
        allSeatPos.forEach((pos)=>{
            pos.classList.add("seat");
        });
    }
};
const handleResourceFormSubmission = async (operation, resource)=>{
    try {
        let data;
        switch(resource){
            case "movies":
                data = (0, _compileDataJs.compileMovieData)();
                break;
            case "cinemas":
                data = (0, _compileDataJs.compileCinemaData)();
                break;
            case "rooms":
                data = (0, _compileDataJs.compileRoomData)();
                break;
            case "screenings":
                data = (0, _compileDataJs.compileScreeningData)();
                break;
            case "users":
                data = (0, _compileDataJs.compileUserData)();
                break;
        }
        data["id"] = operation === "edit" ? document.querySelector(".resource-list-item input:checked").value : undefined;
        await (0, _backEndConnectionsJs.submitResource)(data, resource);
        document.getElementById("create-edit-dialog").close();
        (0, _alertsJs.showAlert)("success", `${operation} successful on ${resource}`);
    } catch (error) {
        console.log(error);
        document.getElementById("create-edit-dialog").close();
        (0, _alertsJs.showAlert)("error", error.message);
    }
};

},{"./alerts.js":"TpGze","./backEndConnections.js":"erlY1","./compileData.js":"gJRPZ","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"gJRPZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "compileCinemaData", ()=>compileCinemaData);
parcelHelpers.export(exports, "compileMovieData", ()=>compileMovieData);
parcelHelpers.export(exports, "compileScreeningData", ()=>compileScreeningData);
parcelHelpers.export(exports, "compileUserData", ()=>compileUserData);
parcelHelpers.export(exports, "compileRoomData", ()=>compileRoomData);
const compileMovieData = ()=>{
    const dataObj = {};
    dataObj.title = document.getElementById("movies-title").value.trim();
    dataObj.synopsis = document.getElementById("movies-synopsis").value.trim() ? document.getElementById("movies-synopsis").value.trim() : undefined;
    dataObj.runtime = document.getElementById("movies-runtime").value * 1;
    dataObj.releaseDate = document.getElementById("movies-releaseDate").value.trim();
    dataObj.director = document.getElementById("movies-director").value.trim() ? document.getElementById("movies-director").value.trim() : undefined;
    dataObj.classification = document.getElementById("movies-classification").value;
    dataObj.cast = document.getElementById("movies-cast").value.split(",").map((el)=>el.trim());
    dataObj.language = document.getElementById("movies-language").value.trim();
    dataObj.thumbnail = document.getElementById("movies-thumbnail").value.trim();
    return dataObj;
};
const compileCinemaData = ()=>{
    const dataObj = {};
    dataObj.locationName = document.getElementById("cinemas-locationName").value.trim();
    dataObj.postcode = document.getElementById("cinemas-postcode").value.trim();
    dataObj.address = document.getElementById("cinemas-address").value.trim();
    dataObj.location = document.getElementById("cinemas-location").value.trim() ? document.getElementById("cinemas-location").value.trim().value.split(",").map((el)=>parseFloat(el.trim())) : undefined;
    return dataObj;
};
const compileUserData = ()=>{
    const dataObj = {};
    dataObj.email = document.getElementById("users-email").value.trim();
    dataObj.role = document.getElementById("users-role").value;
    dataObj.firstName = document.getElementById("users-firstName").value.trim();
    dataObj.lastName = document.getElementById("users-lastName").value.trim();
    dataObj.phoneNumber = document.getElementById("users-phoneNumber").value.trim() ? document.getElementById("users-phoneNumber").value.trim() : undefined;
    return dataObj;
};
const compileScreeningData = ()=>{
    const dataObj = {};
    dataObj.cinemaID = document.getElementById("screenings-cinemaID").value.trim();
    dataObj.movieID = document.getElementById("screenings-movieID").value.trim();
    dataObj.screeningRoomID = document.getElementById("screenings-screeningRoomID").value.trim();
    dataObj.date = document.getElementById("screenings-date").value.trim();
    dataObj.screeningType = document.getElementById("screenings-screeningType").value.trim();
    dataObj.audioType = document.getElementById("screenings-audioType").value;
    dataObj.audioLanguage = document.getElementById("screenings-audioLanguage").value ? document.getElementById("screenings-audioLanguage").value : undefined;
    return dataObj;
};
const compileRoomData = ()=>{
    const dataObj = {};
    dataObj.cinemaID = document.getElementById("rooms-cinemaID").value.trim();
    dataObj.roomNumber = document.getElementById("rooms-roomNumber").value * 1;
    dataObj.isActive = document.getElementById("rooms-isActive").checked;
    dataObj.dimensions = {
        length: document.getElementById("rooms-dimensions-length").value * 1,
        width: document.getElementById("rooms-dimensions-width").value * 1
    };
    const selectedSeats = document.querySelectorAll(".seat");
    dataObj.seatPositions = [];
    selectedSeats.forEach((seat)=>{
        dataObj.seatPositions.push({
            row: seat.dataset.row * 1,
            col: seat.dataset.col * 1
        });
    });
    return dataObj;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}]},["g61Xf","3r7Gr"], "3r7Gr", "parcelRequire0a35")

//# sourceMappingURL=index.js.map
