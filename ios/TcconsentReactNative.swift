import React
import TCConsent_IAB
import TCCore

@objc(TcconsentReactNative)
class TcconsentReactNative: RCTEventEmitter, TCPrivacyCallbacks
{
    @objc(setSiteIDPrivacyID:privacyID:)
    func setSiteIDPrivacyID(siteID: Double, privacyID: Double) -> Void
    {
        TCDebug.setDebugLevel(TCLogLevel_Info)
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
    
    @objc(showPrivacyCenter)
    func showPrivacyCenter() -> Void
    {
        DispatchQueue.main.async
        {
            let PCM = TCPrivacyCenterViewController()
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
}
