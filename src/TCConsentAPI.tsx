import { TCConsentBridge } from "./TCConsent";

export class TCConsentAPI
{
    /**
     * Checks if kTCPrivacyConsent is empty.
     *
     * @return true if the consent was already given, false otherwise.
     */
    public static isConsentAlreadyGiven(): Promise<boolean>
    {
        return TCConsentBridge.isConsentAlreadyGiven();
    }

    /**
     * Return the epochformatted timestamp of the last time the consent was saved.
     *
     * @return epochformatted timestamp or 0.
     */
    public static getLastTimeConsentWasSaved(): Promise<number>
    {
        return TCConsentBridge.getLastTimeConsentWasSaved();
    }

    /**
     * Check if a Category has been accepted.
     *
     * @param ID         the category ID.
     * @return true or false.
     */
    public static isCategoryAccepted(ID: number): Promise<boolean>
    {
        return TCConsentBridge.isCategoryAccepted(ID);
    }

    /**
     * Check if a vendor has been accepted.
     *
     * @param ID         the vendor ID.
     * @return true or false.
     */
    public static isVendorAccepted(ID: number): Promise<boolean>
    {
        return TCConsentBridge.isVendorAccepted(ID);
    }

    /**
     * Check if a purpose has been accepted.
     *
     * @param ID         the purpose ID.
     * @return true or false.
     */
    public static isIABPurposeAccepted(ID: number): Promise<boolean>
    {
        return TCConsentBridge.isIABPurposeAccepted(ID);
    }

    /**
     * Check if a vendor has been accepted.
     *
     * @param ID         the vendor ID.
     * @return true or false.
     */
    public static isIABVendorAccepted(ID: number): Promise<boolean>
    {
        return TCConsentBridge.isIABVendorAccepted(ID);
    }

    /**
     * Check if a special feature has been accepted.
     *
     * @param ID         the vendor ID.
     * @param appContext the application context.
     * @return true or false.
     */
    public static isIABSpecialFeatureAccepted(ID: number): Promise<boolean>
    {
        return TCConsentBridge.isIABSpecialFeatureAccepted(ID);
    }

    /**
     * Get the list of all accepted categories.
     *
     * @return a List of PRIVACY_CAT_IDs.
     */
    public static getAcceptedCategories(): Promise<Array<String>>
    {
        return TCConsentBridge.getAcceptedCategories();
    }

    /**
     * Get the list of all accepted vendors.
     *
     * @return a List of PRIVACY_VEN_IDs.
     */
    public static getAcceptedVendors(): Promise<Array<String>>
    {
        return TCConsentBridge.getAcceptedVendors();
    }


    /**
     * Get the list of all accepted vendors.
     *
     * @return a List of acm_IDs.
     */
    public static getAcceptedGoogleVendors(): Promise<Array<String>>
    {
        return TCConsentBridge.getAcceptedGoogleVendors();
    }

    /**
     * Get the list of everything that was accepted.
     *
     * @param appContext the application context.
     * @return a List of PRIVACY_VEN_IDs and PRIVACY_CAT_IDs.
     */
    public static getAllAcceptedConsent(): Promise<Array<String>>
    {
        return TCConsentBridge.getAllAcceptedConsent();
    }

    /**
     * Checks if we should display privacy center for any reason.
     * @param context the application context.
     * @return True or False.
     */
    public static shouldDisplayPrivacyCenter(): Promise<boolean>
    {
       return TCConsentBridge.shouldDisplayPrivacyCenter();
    }
}
