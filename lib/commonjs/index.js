"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TCConsentAPI: true
};
Object.defineProperty(exports, "TCConsentAPI", {
  enumerable: true,
  get: function () {
    return _TCConsentAPI.TCConsentAPI;
  }
});
var _TCConsentAPI = require("./TCConsentAPI");
var _TCConsent = require("./TCConsent");
Object.keys(_TCConsent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _TCConsent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TCConsent[key];
    }
  });
});
//# sourceMappingURL=index.js.map