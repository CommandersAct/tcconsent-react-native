# TCConsent React Native Bridge — Engineering Audit

A function-by-function comparison of the `tcconsent-react-native` bridge against the native iOS and Android TCConsent SDKs, checked against both platforms' Consent Implementation Guides, native changelogs, and the vanilla / non-IAB packaging pipeline.

- **Repository:** tcconsent-react-native
- **Branch:** develop
- **Bridge version:** 1.4.2
- **Native pins:** iOS TCConsent 5.3.8 · Android Consent 5.3.10
- **Date:** 2026-07-30

**Summary:** 4 confirmed bugs · 5 missing functionality gaps · 2 packaging issues · 4 documentation gaps

---

## Confirmed bugs in bridged functions

Functions that are already exposed to JS but behave incorrectly or silently do nothing on at least one platform.

### BUG-01 — `do_not_track()` ignores its argument on iOS

**Platform:** iOS

The Swift bridge hardcodes the native property to `true` no matter what value JS passes in. Calling `TCConsent.do_not_track(false)` from React Native silently sets it to `true` instead.

```swift
func do_not_track(value: Bool) { TCMobileConsent.sharedInstance().do_not_track = true }
```

Reference: `ios/TcconsentReactNative.swift:221–225`

### BUG-02 — `do_not_track()` is not implemented at all on Android

**Platform:** Android

The method is entirely commented out in the native module, annotated "function not available for this version, needs native Android SDK changes." That excuse is stale: `TCConsent.java` already exposes a public `do_not_track` field, it's documented in the Android guide (`TCConsent.getInstance().do_not_track = value;`), and the native 5.4.0 changelog states it was *"improved and available on the TCConsent instance, with corrected and stabilized behavior."* Since the JS layer exposes `do_not_track()` unconditionally for both platforms, calling it on Android throws a native-method-not-found error today.

Reference: `android/.../TcconsentReactNativeModule.java:427–435`

### BUG-03 — `showPrivacyCenter()`'s `customAndroidTitle` parameter is a no-op

**Platform:** Android

JS passes `customAndroidTitle` through to the native module, which receives it as `customTitle` — and never uses it. The intent is built and the activity started without ever attaching a title extra. The parameter presents a capability that doesn't exist.

Separately: the Android SDK's own documentation references a `kTCIntentExtraCustomTitle` constant for this exact purpose, but that constant doesn't exist anywhere in the Consent module source — the native-side feature this parameter was meant to wrap may itself be stale or broken.

Reference: `android/.../TcconsentReactNativeModule.java:75–82`

### BUG-04 — `switchDefaultState` is fully missing, despite being a supported native property

**Platform:** iOS + Android

Both platforms document a working `switchDefaultState` property (`TCConsent.getInstance().switchDefaultState = false` / `TCMobileConsent.sharedInstance().switchDefaultState = false`). The JS function is commented out entirely; the iOS native module never implements it; the Android native module has it commented out with the same stale "needs native SDK changes" note — already fixed upstream as of native Consent 5.4.0.

Reference: `src/TCConsent.tsx:233–241`

---

## Missing public functionality

Native API that's documented as public and supported, but has no JS surface at all.

### MISS-01 — `showBanner()` — the entire Consent Banner feature is absent

**Platform:** iOS + Android

This is the largest gap found. Native Consent 5.4.0 (iOS 2026-06-15, Android 2026-06-17) shipped a fully documented, non-IAB first-layer banner UI — `TCBannerType`, `TCBannerOptions`, button ordering, an `onDetails` callback, and on Android a `TCBannerTheme` override. None of it exists in the bridge.

Blocking prerequisite: the bridge's own native dependency pins predate this release — `tcconsent-react-native.podspec` pins `TCConsent '5.3.8'`, and `android/build.gradle` pins `Consent:5.3.10`. Both need bumping to 5.4.0+ before this can even be wired up.

References: `tcconsent-react-native.podspec:16`, `android/build.gradle:79`

### MISS-02 — `getNumberOfIABVendors()` is documented but not bridged

**Platform:** iOS + Android

An IAB-only helper listed in both platforms' Consent Implementation Guides with no equivalent JS export.

### MISS-03 — `firebaseConsentChanged` callback is never forwarded to JS

**Platform:** iOS

Android ships a self-contained `TCFirebaseDestination` native library that auto-registers and pushes consent to Firebase with zero app code. iOS has no equivalent — the official iOS guide requires the app to implement `firebaseConsentChanged` on a `TCPrivacyCallbacks` conformer by hand. Since `TcconsentReactNative.swift` is the sole registered callback and never implements or emits this event, **RN apps on iOS currently have no way to drive Google Consent Mode / Firebase consent at all.**

Reference: `ios/TcconsentReactNative.swift — supportedEvents()`

### MISS-04 — `shouldForceJsonUpdate(boolean)` is not bridged

**Platform:** Android

Documented Android-only setter that defers applying a freshly-fetched `privacy.json` until the next app launch — useful when the configuration is large enough to block the main thread. No iOS equivalent is documented either.

### MISS-05 — Lower-priority native members absent from either developer guide

**Platform:** iOS + Android

Not confirmed as bugs since neither platform's guide documents them as public developer API — worth a quick confirmation with the SDK team rather than treating as gaps: `isACStringEnabled()` getter (only the `useACString` setter is bridged), `viewConsent()`, `tcfPolicyVersion`, `generatePublisherTC`, `maxVendorID`, `consentLanguage`, iOS `setConsentUser:`, iOS static `getSavedCategoriesAndVendors`.

---

## Vanilla / non-IAB packaging

Issues specific to the CI pipeline that produces the two published variants.

### PKG-01 — The IAB package strips `customPCMSetSiteID`, contradicting the documented use-case matrix

`ci-scripts/remove_nonIAB_specific_functions.py` removes `customPCMSetSiteID` from the IAB variant alongside the three `saveConsent*` functions. But both guides' "Quick Reference" tables classify `customPCMSetSiteID` / `initWithCustomPCM` as **Custom UI — Both** (valid for IAB and non-IAB) — only the `saveConsent*` trio is actually "Non-IAB only." As written, IAB + Custom-UI integrators lose their init function in the packaged IAB build. Git history shows this exact function already flip-flopping once ("fix customPCM function on nonIAB", "...sccript rename") — it isn't settled.

Reference: `ci-scripts/remove_nonIAB_specific_functions.py:9–15`

### PKG-02 — `ci-scripts/package-npm.yml` is a tracked, empty file

Zero bytes, sitting alongside `package-script.yml`, `cleanup-npm.yml`, and `publish-npm.yml` which all contain real pipeline logic. Either dead weight to remove, or a step that was meant to be filled in and got left blank silently — worth confirming which before the next release.

Reference: `ci-scripts/package-npm.yml`

---

## Documentation

### DOC-01 — README covers roughly 4 of ~30 exported functions

The usage sample only shows `setSiteIDPrivacyID`, `showPrivacyCenter`, `acceptAllConsent`, and `refuseAllConsent`. It never mentions `TCConsentAPI` — eleven getters including `isConsentAlreadyGiven`, `getAcceptedCategories`, and `shouldDisplayPrivacyCenter` — nor the five events (`consentUpdated`, `consentOutdated`, `consentCategoryChanged`, `significantChangesInPrivacy`, `refreshTCUser`), nor the enums, nor — most practically — which npm package name to install for vanilla vs. `-noiab`, despite that being a genuine fork-in-the-road decision for every integrator.

Reference: `README.md:60–72`

### DOC-02 — Inline TSDoc coverage is inconsistent

Roughly half the exported functions in `TCConsent.tsx` carry no doc comment at all — `acceptAllConsent`, `refuseAllConsent`, `setConsentDuration`, `useCustomPublisherRestrictions`, and every `stat*` tracking call among them.

Reference: `src/TCConsent.tsx`

### DOC-03 — No real test coverage

The entire test suite is a single placeholder: `it.todo('write a test')`. None of the bridged functions have any coverage.

Reference: `src/__tests__/index.test.tsx:1`

### DOC-04 — Event subscription pattern is undocumented

The JS module wires up `NativeEventEmitter` listeners internally but never re-exports a subscribe helper, and nothing in the README or guide shows how a consuming app should listen for `consentUpdated` and the other four events. Developers have to independently discover that they need to construct their own `NativeEventEmitter(NativeModules.TcconsentReactNative)`.

---

## Scope & sources

- Bridge: `src/TCConsent.tsx`, `src/TCConsentAPI.tsx`, `ios/TcconsentReactNative.swift`, `android/.../TcconsentReactNativeModule.java`
- Native iOS: `TCMobileConsent.h`, `TCConsentAPI.h`, `TCPrivacyCallbacks.h`, `TCConsentManager.swift`, `TCMobileConsent+ConsentManager.swift`
- Native Android: `TCConsent.java`, `TCConsentAPI.java`, `TCPrivacyCallbacks.java`, `TCConsentExtensions.kt`
- Both platforms' *Consent Implementation Guide-Template.md* and native Consent / TCIAB changelogs
- CI packaging: `ci-scripts/*.yml`, `ci-scripts/remove_nonIAB_specific_functions.py`, both podspecs, `android/build.gradle`
