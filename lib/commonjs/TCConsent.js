"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TCConsentBridge = exports.ETCConsentSource = exports.ETCConsentAction = exports.ETCButtonsAlignment = exports.ETCBannerType = exports.ETCBannerButton = exports.EPrivacyCenterStartScreen = void 0;
exports.acceptAllConsent = acceptAllConsent;
exports.addConsentCategoryChangedListener = addConsentCategoryChangedListener;
exports.addConsentOutdatedListener = addConsentOutdatedListener;
exports.addConsentUpdatedListener = addConsentUpdatedListener;
exports.addSignificantChangesInPrivacyListener = addSignificantChangesInPrivacyListener;
exports.customPCMSetSiteID = customPCMSetSiteID;
exports.deactivateBackButton = deactivateBackButton;
exports.do_not_track = do_not_track;
exports.getConsentAsJson = getConsentAsJson;
exports.getConsentVersion = getConsentVersion;
exports.refuseAllConsent = refuseAllConsent;
exports.resetSavedConsent = resetSavedConsent;
exports.saveConsent = saveConsent;
exports.saveConsentFromConsentSourceWithPrivacyAction = saveConsentFromConsentSourceWithPrivacyAction;
exports.saveConsentFromPopUp = saveConsentFromPopUp;
exports.setConsentDuration = setConsentDuration;
exports.setConsentVersion = setConsentVersion;
exports.setLanguage = setLanguage;
exports.setSiteIDPrivacyID = setSiteIDPrivacyID;
exports.shouldForceJsonUpdate = shouldForceJsonUpdate;
exports.showBanner = showBanner;
exports.showPrivacyCenter = showPrivacyCenter;
exports.statEnterPCToVendorScreen = statEnterPCToVendorScreen;
exports.statShowVendorScreen = statShowVendorScreen;
exports.statViewBanner = statViewBanner;
exports.statViewPrivacyCenter = statViewPrivacyCenter;
exports.statViewPrivacyPoliciesFromBanner = statViewPrivacyPoliciesFromBanner;
exports.statViewPrivacyPoliciesFromPrivacyCenter = statViewPrivacyPoliciesFromPrivacyCenter;
exports.switchDefaultState = switchDefaultState;
exports.useACString = useACString;
exports.useCustomPublisherRestrictions = useCustomPublisherRestrictions;
var _reactNative = require("react-native");
var _tccoreReactNative = require("@commandersact/tccore-react-native");
const LINKING_ERROR = `The package 'tcconsent-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const TCConsentBridge = exports.TCConsentBridge = _reactNative.NativeModules.TcconsentReactNative ? _reactNative.NativeModules.TcconsentReactNative : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const eventEmitter = new _reactNative.NativeEventEmitter(TCConsentBridge);
eventEmitter.addListener('consentUpdated', _ => {});
eventEmitter.addListener('consentOutdated', _ => {});
eventEmitter.addListener('consentCategoryChanged', _ => {});
eventEmitter.addListener('significantChangesInPrivacy', _ => {});
eventEmitter.addListener('refreshTCUser', refreshTCUser);
eventEmitter.addListener('bannerDetailsClicked', () => {
  var _currentBannerOnDetai;
  (_currentBannerOnDetai = currentBannerOnDetails) === null || _currentBannerOnDetai === void 0 || _currentBannerOnDetai();
});
let currentBannerOnDetails = null;

/**
 * Called when consent is updated, given inside the Privacy Center, or manually passed
 * to the SDK via saveConsent*. The map contains PRIVACY_CAT_n / PRIVACY_VEN_n keys with "0" or "1"
 * values. May be empty if nothing has been consented to yet.
 *
 * Register your listener before calling setSiteIDPrivacyID / customPCMSetSiteID — the module
 * checks consent at init and fires callbacks immediately.
 */
function addConsentUpdatedListener(callback) {
  return eventEmitter.addListener('consentUpdated', callback);
}

/**
 * Called after the consent validity duration has elapsed without any change in user consent
 * (default: 6 months, see setConsentDuration). Use it to force re-displaying the consent screen.
 */
function addConsentOutdatedListener(callback) {
  return eventEmitter.addListener('consentOutdated', callback);
}

/**
 * Called when a category is added, removed, or its ID changes in privacy.json. Re-display the
 * Privacy Center when this fires.
 */
function addConsentCategoryChangedListener(callback) {
  return eventEmitter.addListener('consentCategoryChanged', callback);
}

/**
 * Fires only when "significantChanges" is set in privacy.json — not automatic.
 */
function addSignificantChangesInPrivacyListener(callback) {
  return eventEmitter.addListener('significantChangesInPrivacy', callback);
}

/**
 * Initialise your TCConsent module with your own siteID/privacyID values
 * 
 * @param siteId 
 * @param privacyID 
 */
async function setSiteIDPrivacyID(siteId, privacyID) {
  await TCConsentBridge.setSiteIDPrivacyID(siteId, privacyID);
}
function acceptAllConsent() {
  TCConsentBridge.acceptAllConsent();
}
function refuseAllConsent() {
  TCConsentBridge.refuseAllConsent();
}

/**
 * Show the Privacy Center with the specified options.
 *
 * @param {EPrivacyCenterStartScreen} startScreen - The starting screen for the Privacy Center, could be kTCStartWithVendorScreen or kTCStartWithPurposeScreen.
 * @returns {void}
 */
function showPrivacyCenter(startScreen = EPrivacyCenterStartScreen.kTCStartWithDefault) {
  TCConsentBridge.showPrivacyCenter(startScreen);
}

/**
 * Layout and behaviour options for the Consent Banner.
 * All fields are optional — native defaults are applied for anything you don't specify.
 */

/**
 * A single light/dark colour pair for the banner: its background, and the text/icons/borders
 * drawn on top of it. Accepts hex strings with or without a leading '#' (e.g. '#FFFFFF' or 'FFFFFF').
 */

/**
 * Colour override for the Consent Banner, passed as `colorScheme` to showBanner().
 *
 * On iOS, named asset-catalogue colours (`TCBannerBackground` / `TCBannerTextColor`) still take
 * priority over this if defined — see the iOS Consent Implementation Guide, "Design and colours".
 * On Android, this overrides the app's inherited Material 3 theme colours (`colorSurface` / `colorOnSurface`).
 * Omit it entirely to just use those platform defaults.
 */

/**
 * Show the non-IAB Consent Banner — a lightweight first-layer UI to quickly collect consent
 * before optionally opening the full Privacy Center. Not supported for IAB setups; use
 * showPrivacyCenter() instead in that case.
 *
 * @param type ETCBannerType.BOTTOM for a bottom sheet, or ETCBannerType.FULL_SCREEN for a modal card. Default: BOTTOM.
 * @param options layout and behaviour options, see TCBannerOptions. Defaults are applied for anything omitted.
 * @param onDetails called when the user taps the Details button — open your Privacy Center or a custom screen here.
 * @param colorScheme optional colour override, see TCBannerColorScheme. Falls back to platform defaults when omitted.
 */
function showBanner(type = ETCBannerType.BOTTOM, options = {}, onDetails, colorScheme) {
  currentBannerOnDetails = onDetails ?? null;
  TCConsentBridge.showBanner(type, options, colorScheme ?? null);
}

/**
 * Enable google ACString usage [IAB Users only]
 * 
 * @param useACString boolean value.
 */
function useACString(useACString) {
  TCConsentBridge.useACString(useACString);
}

/**
 * Initialise your TCConsent module without CommandersAct's Privacy Center, If you're using your own.
 * 
 * @param siteId 
 * @param privacyID 
 */
function customPCMSetSiteID(siteId, privacyID) {
  TCConsentBridge.customPCMSetSiteID(siteId, privacyID);
}
function setConsentDuration(months) {
  TCConsentBridge.setConsentDuration(months);
}
function useCustomPublisherRestrictions() {
  TCConsentBridge.useCustomPublisherRestrictions();
}

/**
 * Only when consent is from PopUp.
 * 
 * The entry point to call when you user answered about the consent.
 * This will also send a hit to save the consent in our databases
 * <p>
 * If the consent map is null, we take this as a full refusal.
 *
 * @param consent the consent categories opted-in/out
 */
function saveConsentFromPopUp(consent) {
  TCConsentBridge.saveConsentFromPopUp(consent);
}

/**
 *  * Only when consent is from Privacy Center.
 * 
 * The entry point to call when you user answered about the consent.
 * This will also send a hit to save the consent in our databases
 * <p>
 * If the consent map is null, we take this as a full refusal.
 *
 * @param consent the consent categories opted-in/out
 */
function saveConsent(consent) {
  TCConsentBridge.saveConsent(consent);
}

/**
 * Universal entry point to call when you user answered about the consent.
 * This will also send a hit to save the consent in our databases
 * <p>
 * If the consent map is null, we take this as a full refusal.
 * 
 * @param consent the consent categories opted-in/out.
 * @param source whether its from your privacy center or from popUp (banner).
 * @param action which can be a refuse ALl, accept All, or a save depending on the user choice.
 */
function saveConsentFromConsentSourceWithPrivacyAction(consent, source, action) {
  TCConsentBridge.saveConsentFromConsentSourceWithPrivacyAction(consent, source, action);
}
function statEnterPCToVendorScreen() {
  TCConsentBridge.statEnterPCToVendorScreen();
}
function statShowVendorScreen() {
  TCConsentBridge.statShowVendorScreen();
}
function statViewPrivacyPoliciesFromPrivacyCenter() {
  TCConsentBridge.statViewPrivacyPoliciesFromPrivacyCenter();
}
function statViewPrivacyCenter() {
  TCConsentBridge.statViewPrivacyCenter();
}
function statViewBanner() {
  TCConsentBridge.statViewBanner();
}
async function getConsentAsJson() {
  return TCConsentBridge.consentAsJson();
}
async function resetSavedConsent() {
  TCConsentBridge.resetSavedConsent();
}
async function setLanguage(languageCode) {
  return TCConsentBridge.setLanguage(languageCode);
}
async function statViewPrivacyPoliciesFromBanner() {
  return TCConsentBridge.statViewPrivacyPoliciesFromBanner();
}

/**
 * fetches TCConsent.consentVersion on the device. 
 * 
 * @returns a Promise for the consentVersion native value. 
 */
async function getConsentVersion() {
  return TCConsentBridge.getConsentVersion();
}

/**
 * set consentVersion manually for your privacy hits. 
 * 
 * @param consentVersion string value. 
 */
async function setConsentVersion(consentVersion) {
  TCConsentBridge.setConsentVersion(consentVersion);
}

/**
 * set TCConsent.do_not_track value for your privacy hits. 
 * 
 * @param value boolean value.
 */
async function do_not_track(value) {
  TCConsentBridge.do_not_track(value);
}

/**
 * Android OS only ! disable the back button on your privacy center.
 * 
 * @param value boolean value, true for enabled button, false for disabled.
 */
async function deactivateBackButton(value) {
  if (_reactNative.Platform.OS === 'android') {
    TCConsentBridge.deactivateBackButton(value);
  }
}

/**
 * Sets the consent switches state first time privacy center is shown.
 *
 * @param value boolean value, true for enabled switch per default, false for disabled.
 */
async function switchDefaultState(value) {
  TCConsentBridge.switchDefaultState(value);
}

/**
 * Android OS only! By default, a freshly-fetched privacy.json from our CDN is parsed and applied
 * immediately. If your configuration is large enough to block the main thread, call this with
 * `false` to defer parsing until the next app launch instead.
 *
 * @param value boolean value, true (default) to apply updates immediately, false to defer them.
 */
async function shouldForceJsonUpdate(value) {
  if (_reactNative.Platform.OS === 'android') {
    TCConsentBridge.shouldForceJsonUpdate(value);
  }
}
function refreshTCUser(userScheme) {
  if (_reactNative.Platform.OS === 'ios') {
    _tccoreReactNative.TCUserInstance.initValues(userScheme);
  } else if (_reactNative.Platform.OS === 'android') {
    _tccoreReactNative.TCUserInstance.initValues(JSON.parse(userScheme));
  }
}
let ETCConsentSource = exports.ETCConsentSource = /*#__PURE__*/function (ETCConsentSource) {
  ETCConsentSource["POP_UP"] = "POP_UP";
  ETCConsentSource["PRIVACY_CENTER"] = "PRIVACY_CENTER";
  return ETCConsentSource;
}({});
let ETCConsentAction = exports.ETCConsentAction = /*#__PURE__*/function (ETCConsentAction) {
  ETCConsentAction["ACCEPT_ALL"] = "ACCEPT_ALL";
  ETCConsentAction["REFUSE_ALL"] = "REFUSE_ALL";
  ETCConsentAction["SAVE"] = "SAVE";
  return ETCConsentAction;
}({});
let EPrivacyCenterStartScreen = exports.EPrivacyCenterStartScreen = /*#__PURE__*/function (EPrivacyCenterStartScreen) {
  EPrivacyCenterStartScreen["kTCStartWithVendorScreen"] = "startWithVendorScreen";
  EPrivacyCenterStartScreen["kTCStartWithPurposeScreen"] = "startWithPurposeScreen";
  EPrivacyCenterStartScreen["kTCStartWithDefault"] = "kTCStartWithDefault";
  return EPrivacyCenterStartScreen;
}({});
let ETCBannerType = exports.ETCBannerType = /*#__PURE__*/function (ETCBannerType) {
  ETCBannerType["BOTTOM"] = "bottom";
  ETCBannerType["FULL_SCREEN"] = "fullScreen";
  return ETCBannerType;
}({});
let ETCButtonsAlignment = exports.ETCButtonsAlignment = /*#__PURE__*/function (ETCButtonsAlignment) {
  ETCButtonsAlignment["HORIZONTAL"] = "horizontal";
  ETCButtonsAlignment["VERTICAL"] = "vertical";
  return ETCButtonsAlignment;
}({});
let ETCBannerButton = exports.ETCBannerButton = /*#__PURE__*/function (ETCBannerButton) {
  ETCBannerButton["ACCEPT"] = "accept";
  ETCBannerButton["REFUSE"] = "refuse";
  ETCBannerButton["DETAILS"] = "details";
  return ETCBannerButton;
}({});
//# sourceMappingURL=TCConsent.js.map