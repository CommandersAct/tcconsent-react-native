import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import { TCUserInstance } from 'tccore-react-native'; 

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
 * @param {string | null} customAndroidTitle - Optional title value for your privacy center activity on android.
 * @returns {void}
 */
export function showPrivacyCenter(startScreen: EPrivacyCenterStartScreen = EPrivacyCenterStartScreen.kTCStartWithDefault, customAndroidTitle:string | null = null)
{
    if (Platform.OS === 'ios')
    {
        TCConsentBridge.showPrivacyCenter(startScreen);
    }
    else if (Platform.OS === 'android')
    {
        TCConsentBridge.showPrivacyCenter(startScreen, customAndroidTitle);
    }
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

/**
 * Initialise your TCConsent module without CommandersAct's Privacy Center, If you're using your own.
 * 
 * @param siteId 
 * @param privacyID 
 */
export function customPCMSetSiteID(siteId: number, privacyID: number)
{
    TCConsentBridge.customPCMSetSiteID(siteId, privacyID);
}

export function setConsentDuration(months: number)
{
    TCConsentBridge.setConsentDuration(months);
}

export function useCustomPublisherRestrictions()
{
    TCConsentBridge.useCustomPublisherRestrictions();
}

export function saveConsentFromPopUp(consent: Map<String, String>)
{
    TCConsentBridge.saveConsentFromPopUp(consent);
}

export function saveConsent(consent: Map<String, String>)
{
    TCConsentBridge.saveConsent(consent);
}

export function saveConsentFromConsentSourceWithPrivacyAction(consent: Map<String, String>, source: ETCConsentSource, action: ETCConsentAction)
{
    TCConsentBridge.saveConsentFromConsentSourceWithPrivacyAction(consent, source, action);
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