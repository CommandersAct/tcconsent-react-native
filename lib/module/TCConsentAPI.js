import { TCConsentBridge } from "./TCConsent";
export class TCConsentAPI {
  /**
   * Checks if kTCPrivacyConsent is empty.
   *
   * @return true if the consent was already given, false otherwise.
   */
  static isConsentAlreadyGiven() {
    return TCConsentBridge.isConsentAlreadyGiven();
  }

  /**
   * Return the epochformatted timestamp of the last time the consent was saved.
   *
   * @return epochformatted timestamp or 0.
   */
  static getLastTimeConsentWasSaved() {
    return TCConsentBridge.getLastTimeConsentWasSaved();
  }

  /**
   * Check if a Category has been accepted.
   *
   * @param ID         the category ID.
   * @return true or false.
   */
  static isCategoryAccepted(ID) {
    return TCConsentBridge.isCategoryAccepted(ID);
  }

  /**
   * Check if a vendor has been accepted.
   *
   * @param ID         the vendor ID.
   * @return true or false.
   */
  static isVendorAccepted(ID) {
    return TCConsentBridge.isVendorAccepted(ID);
  }

  /**
   * Check if a purpose has been accepted.
   *
   * @param ID         the purpose ID.
   * @return true or false.
   */
  static isIABPurposeAccepted(ID) {
    return TCConsentBridge.isIABPurposeAccepted(ID);
  }

  /**
   * Check if a vendor has been accepted.
   *
   * @param ID         the vendor ID.
   * @return true or false.
   */
  static isIABVendorAccepted(ID) {
    return TCConsentBridge.isIABVendorAccepted(ID);
  }

  /**
   * Check if a special feature has been accepted.
   *
   * @param ID         the vendor ID.
   * @param appContext the application context.
   * @return true or false.
   */
  static isIABSpecialFeatureAccepted(ID) {
    return TCConsentBridge.isIABSpecialFeatureAccepted(ID);
  }

  /**
   * Get the list of all accepted categories.
   *
   * @return a List of PRIVACY_CAT_IDs.
   */
  static getAcceptedCategories() {
    return TCConsentBridge.getAcceptedCategories();
  }

  /**
   * Get the list of all accepted vendors.
   *
   * @return a List of PRIVACY_VEN_IDs.
   */
  static getAcceptedVendors() {
    return TCConsentBridge.getAcceptedVendors();
  }

  /**
   * Get the list of all accepted vendors.
   *
   * @return a List of acm_IDs.
   */
  static getAcceptedGoogleVendors() {
    return TCConsentBridge.getAcceptedGoogleVendors();
  }

  /**
   * Get the list of everything that was accepted.
   *
   * @param appContext the application context.
   * @return a List of PRIVACY_VEN_IDs and PRIVACY_CAT_IDs.
   */
  static getAllAcceptedConsent() {
    return TCConsentBridge.getAllAcceptedConsent();
  }

  /**
   * Checks if we should display privacy center for any reason.
   * @param context the application context.
   * @return True or False.
   */
  static shouldDisplayPrivacyCenter() {
    return TCConsentBridge.shouldDisplayPrivacyCenter();
  }
}
//# sourceMappingURL=TCConsentAPI.js.map