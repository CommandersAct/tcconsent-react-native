import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
import { TCUser } from 'tccore-react-native'; 



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

export function showPrivacyCenter()
{
    TCConsentBridge.showPrivacyCenter();
}

export function useACString(useACString: boolean)
{
    TCConsentBridge.useACString(useACString);
}

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

function refreshTCUser(userScheme: any)
{
    if (Platform.OS === 'ios')
    {
        TCUser.getInstance().initValues(userScheme)
    }
    else if (Platform.OS === 'android')
    {
        TCUser.getInstance().initValues(JSON.parse(userScheme as string))
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