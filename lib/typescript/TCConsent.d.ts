import { type EmitterSubscription } from 'react-native';
export declare const TCConsentBridge: any;
/**
 * Called when consent is updated, given inside the Privacy Center, or manually passed
 * to the SDK via saveConsent*. The map contains PRIVACY_CAT_n / PRIVACY_VEN_n keys with "0" or "1"
 * values. May be empty if nothing has been consented to yet.
 *
 * Register your listener before calling setSiteIDPrivacyID / customPCMSetSiteID — the module
 * checks consent at init and fires callbacks immediately.
 */
export declare function addConsentUpdatedListener(callback: (consent: {
    [key: string]: string;
}) => void): EmitterSubscription;
/**
 * Called after the consent validity duration has elapsed without any change in user consent
 * (default: 6 months, see setConsentDuration). Use it to force re-displaying the consent screen.
 */
export declare function addConsentOutdatedListener(callback: () => void): EmitterSubscription;
/**
 * Called when a category is added, removed, or its ID changes in privacy.json. Re-display the
 * Privacy Center when this fires.
 */
export declare function addConsentCategoryChangedListener(callback: () => void): EmitterSubscription;
/**
 * Fires only when "significantChanges" is set in privacy.json — not automatic.
 */
export declare function addSignificantChangesInPrivacyListener(callback: () => void): EmitterSubscription;
/**
 * Initialise your TCConsent module with your own siteID/privacyID values
 *
 * @param siteId
 * @param privacyID
 */
export declare function setSiteIDPrivacyID(siteId: number, privacyID: number): Promise<void>;
export declare function acceptAllConsent(): void;
export declare function refuseAllConsent(): void;
/**
 * Show the Privacy Center with the specified options.
 *
 * @param {EPrivacyCenterStartScreen} startScreen - The starting screen for the Privacy Center, could be kTCStartWithVendorScreen or kTCStartWithPurposeScreen.
 * @returns {void}
 */
export declare function showPrivacyCenter(startScreen?: EPrivacyCenterStartScreen): void;
/**
 * Layout and behaviour options for the Consent Banner.
 * All fields are optional — native defaults are applied for anything you don't specify.
 */
export interface TCBannerOptions {
    /** Background dim level behind the banner (0 = transparent, 1 = fully black). Default: 0.4 */
    dimAmount?: number;
    /** Allow dismissal by tapping outside the banner. No consent is collected when dismissed this way. Default: false */
    isDismissible?: boolean;
    /** Name of the image asset (iOS) / drawable resource (Android) to display before the title. Default: none */
    iconName?: string;
    /** Size of the icon displayed before the title. Default: 50 */
    iconSize?: number;
    /** Button layout direction. Default: ETCButtonsAlignment.VERTICAL */
    buttonsAlignment?: ETCButtonsAlignment;
    /** Display order of the buttons. Default: [REFUSE, DETAILS, ACCEPT] */
    buttonsOrder?: ETCBannerButton[];
    /** Use the compact button layout. Default: false */
    compactLayout?: boolean;
}
/**
 * A single light/dark colour pair for the banner: its background, and the text/icons/borders
 * drawn on top of it. Accepts hex strings with or without a leading '#' (e.g. '#FFFFFF' or 'FFFFFF').
 */
export interface TCBannerColors {
    /** Background colour of the banner. */
    background: string;
    /** Foreground colour — title, text, borders (also used as the accept button's background, inverted). */
    textColor: string;
}
/**
 * Colour override for the Consent Banner, passed as `colorScheme` to showBanner().
 *
 * On iOS, named asset-catalogue colours (`TCBannerBackground` / `TCBannerTextColor`) still take
 * priority over this if defined — see the iOS Consent Implementation Guide, "Design and colours".
 * On Android, this overrides the app's inherited Material 3 theme colours (`colorSurface` / `colorOnSurface`).
 * Omit it entirely to just use those platform defaults.
 */
export interface TCBannerColorScheme {
    light: TCBannerColors;
    dark: TCBannerColors;
}
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
export declare function showBanner(type?: ETCBannerType, options?: TCBannerOptions, onDetails?: () => void, colorScheme?: TCBannerColorScheme): void;
/**
 * Enable google ACString usage [IAB Users only]
 *
 * @param useACString boolean value.
 */
export declare function useACString(useACString: boolean): void;
/**
 * Initialise your TCConsent module without CommandersAct's Privacy Center, If you're using your own.
 *
 * @param siteId
 * @param privacyID
 */
export declare function customPCMSetSiteID(siteId: number, privacyID: number): void;
export declare function setConsentDuration(months: number): void;
export declare function useCustomPublisherRestrictions(): void;
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
export declare function saveConsentFromPopUp(consent: {
    [key: string]: string;
}): void;
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
export declare function saveConsent(consent: {
    [key: string]: string;
}): void;
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
export declare function saveConsentFromConsentSourceWithPrivacyAction(consent: {
    [key: string]: string;
}, source: ETCConsentSource, action: ETCConsentAction): void;
export declare function statEnterPCToVendorScreen(): void;
export declare function statShowVendorScreen(): void;
export declare function statViewPrivacyPoliciesFromPrivacyCenter(): void;
export declare function statViewPrivacyCenter(): void;
export declare function statViewBanner(): void;
export declare function getConsentAsJson(): Promise<string>;
export declare function resetSavedConsent(): Promise<void>;
export declare function setLanguage(languageCode: string): Promise<any>;
export declare function statViewPrivacyPoliciesFromBanner(): Promise<any>;
/**
 * fetches TCConsent.consentVersion on the device.
 *
 * @returns a Promise for the consentVersion native value.
 */
export declare function getConsentVersion(): Promise<string>;
/**
 * set consentVersion manually for your privacy hits.
 *
 * @param consentVersion string value.
 */
export declare function setConsentVersion(consentVersion: string): Promise<void>;
/**
 * set TCConsent.do_not_track value for your privacy hits.
 *
 * @param value boolean value.
 */
export declare function do_not_track(value: boolean): Promise<void>;
/**
 * Android OS only ! disable the back button on your privacy center.
 *
 * @param value boolean value, true for enabled button, false for disabled.
 */
export declare function deactivateBackButton(value: boolean): Promise<void>;
/**
 * Sets the consent switches state first time privacy center is shown.
 *
 * @param value boolean value, true for enabled switch per default, false for disabled.
 */
export declare function switchDefaultState(value: boolean): Promise<void>;
/**
 * Android OS only! By default, a freshly-fetched privacy.json from our CDN is parsed and applied
 * immediately. If your configuration is large enough to block the main thread, call this with
 * `false` to defer parsing until the next app launch instead.
 *
 * @param value boolean value, true (default) to apply updates immediately, false to defer them.
 */
export declare function shouldForceJsonUpdate(value: boolean): Promise<void>;
export declare enum ETCConsentSource {
    POP_UP = "POP_UP",
    PRIVACY_CENTER = "PRIVACY_CENTER"
}
export declare enum ETCConsentAction {
    ACCEPT_ALL = "ACCEPT_ALL",
    REFUSE_ALL = "REFUSE_ALL",
    SAVE = "SAVE"
}
export declare enum EPrivacyCenterStartScreen {
    kTCStartWithVendorScreen = "startWithVendorScreen",
    kTCStartWithPurposeScreen = "startWithPurposeScreen",
    kTCStartWithDefault = "kTCStartWithDefault"
}
export declare enum ETCBannerType {
    BOTTOM = "bottom",
    FULL_SCREEN = "fullScreen"
}
export declare enum ETCButtonsAlignment {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical"
}
export declare enum ETCBannerButton {
    ACCEPT = "accept",
    REFUSE = "refuse",
    DETAILS = "details"
}
//# sourceMappingURL=TCConsent.d.ts.map