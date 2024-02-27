import React
import TCConsent
import TCCore

@objc(TcconsentReactNative)
class TcconsentReactNative: RCTEventEmitter, TCPrivacyCallbacks
{
    @objc(setSiteIDPrivacyID:privacyID:)
    func setSiteIDPrivacyID(siteID: Double, privacyID: Double) -> Void
    {
        TCDebug.setDebugLevel(TCLogLevel_Assert)
        TCMobileConsent.sharedInstance().registerCallback(self)
        TCMobileConsent.sharedInstance().setSiteID(Int32(siteID), andPrivacyID: Int32(privacyID))
        refreshTCUser()
    }

    @objc(acceptAllConsent)
    func acceptAllConsent() -> Void
    {
        TCMobileConsent.sharedInstance().acceptAllConsent()
    }
    
    @objc(refuseAllConsent)
    func refuseAllConsent() -> Void
    {
        TCMobileConsent.sharedInstance().refuseAllConsent()
    }
    
    @objc(showPrivacyCenter:)
    func showPrivacyCenter(startScreen: String?) -> Void
    {
        DispatchQueue.main.async
        {
            let PCM = TCPrivacyCenterViewController()
            self.setPCMStartScreen(PCM: PCM, startScreen: startScreen)
            let viewController = UIApplication.shared.delegate?.window??.rootViewController
            viewController?.present(PCM, animated: true, completion: nil)
        }
    }
    
    @objc(useACString:)
    func useACString(value: Bool) -> Void
    {
        TCMobileConsent.sharedInstance().useAcString(value)
    }
    
    @objc(customPCMSetSiteID:privacyID:)
    func customPCMSetSiteID(siteID: Double, privacyID: Double) -> Void
    {
        TCMobileConsent.sharedInstance().customPCMSetSiteID(Int32(siteID), andPrivacyID: Int32(privacyID))
    }
    
    @objc(setConsentDuration:)
    func setConsentDuration(months: Double) -> Void
    {
        TCMobileConsent.sharedInstance().consentDuration = Float(months)
    }
    
    @objc(useCustomPublisherRestrictions)
    func useCustomPublisherRestrictions() -> Void
    {
        TCMobileConsent.sharedInstance().useCustomPublisherRestrictions()
    }
    
    @objc(saveConsentFromPopUp:)
    func saveConsentFromPopUp(consent: Dictionary<String, String>) -> Void
    {
        TCMobileConsent.sharedInstance().save(fromPopUp: consent)
    }
    
    @objc(saveConsent:)
    func saveConsent(consent: Dictionary<String, String>)
    {
        TCMobileConsent.sharedInstance().save(consent)
    }

    @objc(saveConsentFromConsentSourceWithPrivacyAction:source:action:)
    func saveConsentFromConsentSourceWithPrivacyAction(consent: Dictionary<String, String>, source: String, action: String)
    {
        TCMobileConsent.sharedInstance().save(consent, from: evaluateConsentSource(stringSource: source), withPrivacyAction: evaluateConsentAction(stringAction: action))
    }

    @objc(statEnterPCToVendorScreen)
    func statEnterPCToVendorScreen()
    {
        TCMobileConsent.sharedInstance().statEnterPCToVendorScreen()
    }

    @objc(statShowVendorScreen)
    func statShowVendorScreen()
    {
        TCMobileConsent.sharedInstance().statShowVendorScreen()
    }

    @objc(statViewPrivacyPoliciesFromPrivacyCenter)
    func statViewPrivacyPoliciesFromPrivacyCenter()
    {
        TCMobileConsent.sharedInstance().statViewPrivacyPoliciesFromPrivacyCenter()
    }
    
    @objc(statViewPrivacyCenter)
    func statViewPrivacyCenter()
    {
        TCMobileConsent.sharedInstance().statViewPrivacyCenter()
    }
    
    @objc(statViewBanner)
    func statViewBanner()
    {
        TCMobileConsent.sharedInstance().statViewBanner()
    }

    @objc(consentAsJson:withRejecter:)
    func consentAsJson(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock)
    {
        let rawJson = TCMobileConsent.sharedInstance().getAsJson()
        let consentAsJson: String? = rawJson != nil ? rawJson : ""
        resolve(consentAsJson)
    }

    @objc(resetSavedConsent)
    func resetSavedConsent()
    {
        TCMobileConsent.sharedInstance().resetSavedConsent()
    }
    
    @objc(setLanguage:)
    func setLanguage(languageCode: String)
    {
        TCMobileConsent.sharedInstance().setLanguage(languageCode)
    }
    
    @objc(statViewPrivacyPoliciesFromBanner)
    func statViewPrivacyPoliciesFromBanner()
    {
        TCMobileConsent.sharedInstance().statViewPrivacyPoliciesFromBanner()
    }
    
    @objc(isConsentAlreadyGiven:withRejecter:)
    func isConsentAlreadyGiven(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isConsentAlreadyGiven())
    }
    
    @objc(getLastTimeConsentWasSaved:withRejecter:)
    func getLastTimeConsentWasSaved(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(String(TCConsentAPI.getLastTimeConsentWasSaved()))
    }
    
    @objc(isCategoryAccepted:withResolver:withRejecter:)
    func isCategoryAccepted(id: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isCategoryAccepted(Int32(id)))
    }
    
    @objc(isVendorAccepted:withResolver:withRejecter:)
    func isVendorAccepted(id: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isVendorAccepted(Int32(id)))
    }

    @objc(isIABPurposeAccepted:withResolver:withRejecter:)
    func isIABPurposeAccepted(id: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isIABPurposeAccepted(Int32(id)))
    }
    
    @objc(isIABVendorAccepted:withResolver:withRejecter:)
    func isIABVendorAccepted(id: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isIABVendorAccepted(Int32(id)))
    }
    
    @objc(isIABSpecialFeatureAccepted:withResolver:withRejecter:)
    func isIABSpecialFeatureAccepted(id: Double, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.isIABSpecialFeatureAccepted(Int32(id)))
    }
    
    @objc(getAcceptedCategories:withRejecter:)
    func getAcceptedCategories(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.getAcceptedCategories())
    }
    
    @objc(getAcceptedVendors:withRejecter:)
    func getAcceptedVendors(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.getAcceptedVendors())
    }
    
    @objc(getAcceptedGoogleVendors:withRejecter:)
    func getAcceptedGoogleVendors(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.getAcceptedGoogleVendors())
    }
    
    @objc(getAllAcceptedConsent:withRejecter:)
    func getAllAcceptedConsent(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.getAllAcceptedConsent())
    }
    
    @objc(shouldDisplayPrivacyCenter:withRejecter:)
    func shouldDisplayPrivacyCenter(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.shouldDisplayPrivacyCenter())
    }
    
    @objc(switchDefaultState:withRejecter:)
    func switchDefaultState(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCConsentAPI.shouldDisplayPrivacyCenter())
    }
    
    @objc(do_not_track:)
    func do_not_track(value: Bool)
    {
        TCMobileConsent.sharedInstance().do_not_track = true
    }
    
    @objc(setConsentVersion:)
    func setConsentVersion(consentVersion: String)
    {
        TCMobileConsent.sharedInstance().consentVersion = consentVersion
    }
    
    @objc(getConsentVersion:withRejecter:)
    func getConsentVersion(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
    {
        resolve(TCMobileConsent.sharedInstance().consentVersion)
    }
    
    func evaluateConsentSource(stringSource: String) -> ETCConsentSource
    {
        if (stringSource == "POP_UP")
        {
            return ETCConsentSource.Popup;
        }
        else
        {
            return ETCConsentSource.PrivacyCenter;
        }
    }
    
    func evaluateConsentAction(stringAction: String) -> ETCConsentAction
    {
        if (stringAction == "ACCEPT_ALL")
        {
            return ETCConsentAction.AcceptAll;
        }
        else if (stringAction == "REFUSE_ALL")
        {
            return ETCConsentAction.RefuseAll;
        }
        else
        {
            return ETCConsentAction.Save;
        }
    }
    
    override func supportedEvents() -> [String]
    {
      return ["consentOutdated", "consentUpdated", "consentCategoryChanged", "significantChangesInPrivacy", "refreshTCUser"]
    }
    
    func consentOutdated()
    {
        if self.bridge != nil
        {
            self.sendEvent(withName: "consentOutdated", body: [String:String]())
        }
    }
    
    func consentUpdated(_ consent: [AnyHashable : Any]!)
    {
        refreshTCUser()
        
        if self.bridge != nil
        {
            self.sendEvent(withName: "consentUpdated", body: consent)
        }
    }
    
    func consentCategoryChanged()
    {
        if self.bridge != nil
        {
            self.sendEvent(withName: "consentCategoryChanged", body: [String:String]())
        }
    }
    
    func significantChangesInPrivacy()
    {
        if self.bridge != nil
        {
            self.sendEvent(withName: "significantChangesInPrivacy", body: [String:String]())
        }
    }
    
    func refreshTCUser()
    {
        var TCUserJson = TCUser.sharedInstance().getJsonObject()
        TCUserJson?["consentID"] = TCUser.sharedInstance().consentID
        TCUserJson?["consent_categories"] = TCUser.sharedInstance().consent_categories
        TCUserJson?["consent_vendors"] = TCUser.sharedInstance().consent_vendors
        TCUserJson?["external_consent"] = TCUser.sharedInstance().external_consent
        
        if self.bridge != nil
        {
            self.sendEvent(withName: "refreshTCUser", body: TCUserJson)
        }
    }
    
    func setPCMStartScreen(PCM: TCPrivacyCenterViewController, startScreen: String?)
    {
        if (startScreen != nil && startScreen == "startWithVendorScreen")
        {
            PCM.startWithVendorScreen()
        }
        else if (startScreen != nil && startScreen == "startWithPurposeScreen")
        {
            PCM.startWithPurposeScreen()
        }
    }
}
