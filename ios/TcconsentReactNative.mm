#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TcconsentReactNative, NSObject)

RCT_EXTERN_METHOD(setSiteIDPrivacyID: (double) siteID privacyID: (double) privacyID)
RCT_EXTERN_METHOD(acceptAllConsent)
RCT_EXTERN_METHOD(refuseAllConsent)
RCT_EXTERN_METHOD(showPrivacyCenter: (NSString *) startScreen)
RCT_EXTERN_METHOD(useACString: (BOOL) value)
RCT_EXTERN_METHOD(customPCMSetSiteID: (double) siteID privacyID: (double) privacyID)
RCT_EXTERN_METHOD(setConsentDuration: (double) months)
RCT_EXTERN_METHOD(useCustomPublisherRestrictions)
RCT_EXTERN_METHOD(saveConsentFromPopUp: (NSDictionary *) consent)
RCT_EXTERN_METHOD(saveConsent: (NSDictionary *) consent)
RCT_EXTERN_METHOD(saveConsentFromConsentSourceWithPrivacyAction: (NSDictionary *) consent source: (NSString *) source action: (NSString *) action)
RCT_EXTERN_METHOD(statEnterPCToVendorScreen)
RCT_EXTERN_METHOD(statShowVendorScreen)
RCT_EXTERN_METHOD(statViewPrivacyPoliciesFromPrivacyCenter)
RCT_EXTERN_METHOD(statViewPrivacyCenter)
RCT_EXTERN_METHOD(statViewBanner)
RCT_EXTERN_METHOD(consentAsJson:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(resetSavedConsent)
RCT_EXTERN_METHOD(setLanguage: (NSString *) languageCode)
RCT_EXTERN_METHOD(statViewPrivacyPoliciesFromBanner)

RCT_EXTERN_METHOD(isConsentAlreadyGiven: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isCategoryAccepted: (double) ID withResolver: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isVendorAccepted: (double) ID withResolver: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isIABPurposeAccepted: (double) ID withResolver: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isIABVendorAccepted: (double) ID withResolver: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(isIABSpecialFeatureAccepted: (double) ID withResolver: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getAcceptedCategories: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getAcceptedVendors: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getAcceptedGoogleVendors: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getAllAcceptedConsent: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(shouldDisplayPrivacyCenter: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(switchDefaultState: (BOOL) value)
RCT_EXTERN_METHOD(do_not_track: (BOOL) value)
RCT_EXTERN_METHOD(setConsentVersion: (NSString *) value)
RCT_EXTERN_METHOD(getConsentVersion: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)
RCT_EXTERN_METHOD(getLastTimeConsentWasSaved: (RCTPromiseResolveBlock) resolve withRejecter: (RCTPromiseRejectBlock) reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
