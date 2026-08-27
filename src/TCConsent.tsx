import { NativeModules, Platform, NativeEventEmitter, type EmitterSubscription } from 'react-native';
import { TCUserInstance } from '@commandersact/tccore-react-native'; 

const LINKING_ERROR =
  `The package 'tcconsent-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const TCConsentBridge = NativeModules.TcconsentReactNative
  ? NativeModules.TcconsentReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const eventEmitter = new NativeEventEmitter(TCConsentBridge);
eventEmitter.addListener('consentUpdated', _ => {});
eventEmitter.addListener('consentOutdated', _ => {});
eventEmitter.addListener('consentCategoryChanged', _ => {});
eventEmitter.addListener('significantChangesInPrivacy', _ => {});
eventEmitter.addListener('refreshTCUser', refreshTCUser);
eventEmitter.addListener('bannerDetailsClicked', () => { currentBannerOnDetails?.(); });

let currentBannerOnDetails: (() => void) | null = null;

/**
 * Called when consent is updated, given inside the Privacy Center, or manually passed
 * to the SDK via saveConsent*. The map contains PRIVACY_CAT_n / PRIVACY_VEN_n keys with "0" or "1"
 * values. May be empty if nothing has been consented to yet.
 *
 * Register your listener before calling setSiteIDPrivacyID / customPCMSetSiteID — the module
 * checks consent at init and fires callbacks immediately.
 */
export function addConsentUpdatedListener(callback: (consent: { [key: string]: string }) => void): EmitterSubscription
{
    return eventEmitter.addListener('consentUpdated', callback);
}

/**
 * Called after the consent validity duration has elapsed without any change in user consent
 * (default: 6 months, see setConsentDuration). Use it to force re-displaying the consent screen.
 */
export function addConsentOutdatedListener(callback: () => void): EmitterSubscription
{
    return eventEmitter.addListener('consentOutdated', callback);
}

/**
 * Called when a category is added, removed, or its ID changes in privacy.json. Re-display the
 * Privacy Center when this fires.
 */
export function addConsentCategoryChangedListener(callback: () => void): EmitterSubscription
{
    return eventEmitter.addListener('consentCategoryChanged', callback);
}

/**
 * Fires only when "significantChanges" is set in privacy.json — not automatic.
 */
export function addSignificantChangesInPrivacyListener(callback: () => void): EmitterSubscription
{
    return eventEmitter.addListener('significantChangesInPrivacy', callback);
}

/**
 * Initialise your TCConsent module with your own siteID/privacyID values
 * 
 * @param siteId 
 * @param privacyID 
 */
export async function setSiteIDPrivacyID(siteId: number, privacyID: number)
{
    await TCConsentBridge.setSiteIDPrivacyID(siteId, privacyID);
}

export function acceptAllConsent()
{
    TCConsentBridge.acceptAllConsent();
}

export function refuseAllConsent()
{
    TCConsentBridge.refuseAllConsent();
}

/**
 * Show the Privacy Center with the specified options.
 *
 * @param {EPrivacyCenterStartScreen} startScreen - The starting screen for the Privacy Center, could be kTCStartWithVendorScreen or kTCStartWithPurposeScreen.
 * @returns {void}
 */
export function showPrivacyCenter(startScreen: EPrivacyCenterStartScreen = EPrivacyCenterStartScreen.kTCStartWithDefault)
{
    TCConsentBridge.showPrivacyCenter(startScreen);
}

/**
 * Layout and behaviour options for the Consent Banner.
 * All fields are optional — native defaults are applied for anything you don't specify.
 */
export interface TCBannerOptions
{
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
export interface TCBannerColors
{
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
export interface TCBannerColorScheme
{
    light: TCBannerColors;
    dark: TCBannerColors;
}



/**
 * Enable google ACString usage [IAB Users only]
 * 
 * @param useACString boolean value.
 */
export function useACString(useACString: boolean)
{
    TCConsentBridge.useACString(useACString);
}



export function setConsentDuration(months: number)
{
    TCConsentBridge.setConsentDuration(months);
}

export function useCustomPublisherRestrictions()
{
    TCConsentBridge.useCustomPublisherRestrictions();
}







export function statEnterPCToVendorScreen()
{
    TCConsentBridge.statEnterPCToVendorScreen();
}

export function statShowVendorScreen()
{
    TCConsentBridge.statShowVendorScreen();
}

export function statViewPrivacyPoliciesFromPrivacyCenter()
{
    TCConsentBridge.statViewPrivacyPoliciesFromPrivacyCenter();
}

export function statViewPrivacyCenter()
{
    TCConsentBridge.statViewPrivacyCenter();
}

export function statViewBanner()
{
    TCConsentBridge.statViewBanner();
}

export async function getConsentAsJson(): Promise<string>
{
    return TCConsentBridge.consentAsJson();
}

export async function resetSavedConsent() 
{
    TCConsentBridge.resetSavedConsent();
}

export async function setLanguage(languageCode: string) 
{
    return TCConsentBridge.setLanguage(languageCode);
}

export async function statViewPrivacyPoliciesFromBanner() 
{
    return TCConsentBridge.statViewPrivacyPoliciesFromBanner();
}

/**
 * fetches TCConsent.consentVersion on the device. 
 * 
 * @returns a Promise for the consentVersion native value. 
 */
export async function getConsentVersion(): Promise<string>
{
    return TCConsentBridge.getConsentVersion();
}

/**
 * set consentVersion manually for your privacy hits. 
 * 
 * @param consentVersion string value. 
 */
export async function setConsentVersion(consentVersion: string)
{
    TCConsentBridge.setConsentVersion(consentVersion);
}

/**
 * set TCConsent.do_not_track value for your privacy hits. 
 * 
 * @param value boolean value.
 */
export async function do_not_track(value: boolean) 
{
    TCConsentBridge.do_not_track(value);
}

/**
 * Android OS only ! disable the back button on your privacy center.
 * 
 * @param value boolean value, true for enabled button, false for disabled.
 */
export async function deactivateBackButton(value: boolean)
{
    if (Platform.OS === 'android')
    {
        TCConsentBridge.deactivateBackButton(value)
    }
}

/**
 * Sets the consent switches state first time privacy center is shown.
 *
 * @param value boolean value, true for enabled switch per default, false for disabled.
 */
export async function switchDefaultState(value: boolean)
{
    TCConsentBridge.switchDefaultState(value)
}

/**
 * Android OS only! By default, a freshly-fetched privacy.json from our CDN is parsed and applied
 * immediately. If your configuration is large enough to block the main thread, call this with
 * `false` to defer parsing until the next app launch instead.
 *
 * @param value boolean value, true (default) to apply updates immediately, false to defer them.
 */
export async function shouldForceJsonUpdate(value: boolean)
{
    if (Platform.OS === 'android')
    {
        TCConsentBridge.shouldForceJsonUpdate(value);
    }
}

function refreshTCUser(userScheme: any)
{
    if (Platform.OS === 'ios')
    {
        TCUserInstance.initValues(userScheme)
    }
    else if (Platform.OS === 'android')
    {
        TCUserInstance.initValues(JSON.parse(userScheme as string))
    }
}

export enum ETCConsentSource
{
    POP_UP = 'POP_UP',
    PRIVACY_CENTER = 'PRIVACY_CENTER'
}

export enum ETCConsentAction
{
  ACCEPT_ALL = 'ACCEPT_ALL',
  REFUSE_ALL = 'REFUSE_ALL',
  SAVE = 'SAVE'
}

export enum EPrivacyCenterStartScreen
{
    kTCStartWithVendorScreen = 'startWithVendorScreen',
    kTCStartWithPurposeScreen = 'startWithPurposeScreen',
    kTCStartWithDefault = 'kTCStartWithDefault'
}

export enum ETCBannerType
{
    BOTTOM = 'bottom',
    FULL_SCREEN = 'fullScreen'
}

export enum ETCButtonsAlignment
{
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ETCBannerButton
{
    ACCEPT = 'accept',
    REFUSE = 'refuse',
    DETAILS = 'details'
}