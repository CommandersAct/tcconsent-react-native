#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TcconsentReactNative, NSObject)

RCT_EXTERN_METHOD(setSiteIDPrivacyID: (double) siteID privacyID: (double) privacyID)
RCT_EXTERN_METHOD(acceptAllConsent)
RCT_EXTERN_METHOD(refuseAllConsent)
RCT_EXTERN_METHOD(showPrivacyCenter)
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

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
