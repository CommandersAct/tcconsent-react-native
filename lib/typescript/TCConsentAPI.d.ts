export declare class TCConsentAPI {
    /**
     * Checks if kTCPrivacyConsent is empty.
     *
     * @return true if the consent was already given, false otherwise.
     */
    static isConsentAlreadyGiven(): Promise<boolean>;
    /**
     * Return the epochformatted timestamp of the last time the consent was saved.
     *
     * @return epochformatted timestamp or 0.
     */
    static getLastTimeConsentWasSaved(): Promise<number>;
    /**
     * Check if a Category has been accepted.
     *
     * @param ID         the category ID.
     * @return true or false.
     */
    static isCategoryAccepted(ID: number): Promise<boolean>;
    /**
     * Check if a vendor has been accepted.
     *
     * @param ID         the vendor ID.
     * @return true or false.
     */
    static isVendorAccepted(ID: number): Promise<boolean>;
    /**
     * Check if a purpose has been accepted.
     *
     * @param ID         the purpose ID.
     * @return true or false.
     */
    static isIABPurposeAccepted(ID: number): Promise<boolean>;
    /**
     * Check if a vendor has been accepted.
     *
     * @param ID         the vendor ID.
     * @return true or false.
     */
    static isIABVendorAccepted(ID: number): Promise<boolean>;
    /**
     * Check if a special feature has been accepted.
     *
     * @param ID         the vendor ID.
     * @param appContext the application context.
     * @return true or false.
     */
    static isIABSpecialFeatureAccepted(ID: number): Promise<boolean>;
    /**
     * Get the list of all accepted categories.
     *
     * @return a List of PRIVACY_CAT_IDs.
     */
    static getAcceptedCategories(): Promise<Array<String>>;
    /**
     * Get the list of all accepted vendors.
     *
     * @return a List of PRIVACY_VEN_IDs.
     */
    static getAcceptedVendors(): Promise<Array<String>>;
    /**
     * Get the list of all accepted vendors.
     *
     * @return a List of acm_IDs.
     */
    static getAcceptedGoogleVendors(): Promise<Array<String>>;
    /**
     * Get the list of everything that was accepted.
     *
     * @param appContext the application context.
     * @return a List of PRIVACY_VEN_IDs and PRIVACY_CAT_IDs.
     */
    static getAllAcceptedConsent(): Promise<Array<String>>;
    /**
     * Checks if we should display privacy center for any reason.
     * @param context the application context.
     * @return True or False.
     */
    static shouldDisplayPrivacyCenter(): Promise<boolean>;
}
//# sourceMappingURL=TCConsentAPI.d.ts.map