package com.tcconsentreactnative;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tagcommander.lib.consent.ETCConsentAction;
import com.tagcommander.lib.consent.ETCConsentSource;
import com.tagcommander.lib.consent.TCConsent;
import com.tagcommander.lib.consent.TCPrivacyCallbacks;
import com.tagcommander.lib.consent.TCPrivacyCenter;
import com.tagcommander.lib.core.TCDebug;
import com.tagcommander.lib.core.TCLogger;
import com.tagcommander.lib.core.TCUser;

import org.json.JSONException;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = TcconsentReactNativeModule.NAME)
public class TcconsentReactNativeModule extends ReactContextBaseJavaModule implements TCPrivacyCallbacks
{
  public static final String NAME = "TcconsentReactNative";

  public TcconsentReactNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void setSiteIDPrivacyID(double siteID, double privacyID)
  {
    TCDebug.setDebugLevel(Log.VERBOSE);
    TCConsent.getInstance().registerCallback(this);
    TCConsent.getInstance().setSiteIDPrivacyIDAppContext((int) siteID, (int) privacyID, getReactApplicationContext());
    refreshTCUser();
  }

  @ReactMethod
  public void acceptAllConsent()
  {
    TCConsent.getInstance().acceptAllConsent();
  }

  @ReactMethod
  public void refuseAllConsent()
  {
    TCConsent.getInstance().refuseAllConsent();
  }

  @ReactMethod
  public void showPrivacyCenter()
  {
    Intent PCM = new Intent(getReactApplicationContext(), TCPrivacyCenter.class);
    PCM.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    getReactApplicationContext().startActivity(PCM);
  }

  @ReactMethod
  public void useACString(boolean value)
  {
    TCConsent.getInstance().useAcString(value);
  }

  @ReactMethod
  public void customPCMSetSiteID(double siteID, double privacyID)
  {
    TCConsent.getInstance().initWithCustomPCM((int) siteID, (int) privacyID, getReactApplicationContext());
  }

  @ReactMethod
  public void setConsentDuration(double months)
  {
    TCConsent.getInstance().setConsentDuration((float) months);
  }

  @ReactMethod
  public void useCustomPublisherRestrictions()
  {
    TCConsent.getInstance().useCustomPublisherRestrictions();
  }

  @ReactMethod
  public void saveConsentFromPopUp(ReadableMap consent)
  {
    TCConsent.getInstance().saveConsentFromPopUp(convertReadableMapToHashMap(consent));
  }

  @ReactMethod
  public void saveConsent(ReadableMap consent)
  {
    TCConsent.getInstance().saveConsent(convertReadableMapToHashMap(consent));
  }

  @ReactMethod
  public void saveConsentFromConsentSourceWithPrivacyAction(ReadableMap consent, String source, String action)
  {
    TCConsent.getInstance().saveConsentFromConsentSourceWithPrivacyAction(convertReadableMapToHashMap(consent),
                                                                           evaluateConsentSource(source),
                                                                           evaluateConsentAction(action));
  }

  @ReactMethod
  public void statEnterPCToVendorScreen()
  {
    TCConsent.getInstance().statEnterPCToVendorScreen();
  }

  @ReactMethod
  public void statShowVendorScreen()
  {
    TCConsent.getInstance().statShowVendorScreen();
  }

  @ReactMethod
  public void statViewPrivacyPoliciesFromPrivacyCenter()
  {
    TCConsent.getInstance().statViewPrivacyPoliciesFromPrivacyCenter();
  }

  @ReactMethod
  public void statViewPrivacyCenter()
  {
    TCConsent.getInstance().statViewPrivacyCenter();
  }

  @ReactMethod
  public void statViewBanner()
  {
    TCConsent.getInstance().statViewBanner();
  }

  @ReactMethod
  public void statViewPrivacyPoliciesFromBanner()
  {
    TCConsent.getInstance().statViewPrivacyPoliciesFromBanner();
  }

  @ReactMethod
  public void consentAsJson(Promise promise)
  {
    String rawJson = TCConsent.getInstance().getConsentAsJson();
    String consentAsJson = (rawJson != null) ? rawJson : "";
    promise.resolve(consentAsJson);
  }

  @ReactMethod
  public void resetSavedConsent()
  {
    TCConsent.getInstance().resetSavedConsent();
  }

  @ReactMethod
  public void setLanguage(String languageCode)
  {
    TCConsent.getInstance().setLanguage(languageCode);
  }

  @Override
  public void consentOutdated()
  {
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("consentOutdated", null);
  }

  @Override
  public void consentUpdated(Map<String, String> consent)
  {
    refreshTCUser();
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("consentUpdated", mapToReadableMap(consent));
  }

  @Override
  public void consentCategoryChanged()
  {
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("consentCategoryChanged", null);
  }

  @Override
  public void significantChangesInPrivacy()
  {
    getReactApplicationContext()
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit("significantChangesInPrivacy", null);
  }

  private void refreshTCUser()
  {
    String userJson = "";
    try
    {
      userJson = TCUser.getInstance().getJsonObject()
        .put("consentID", TCUser.getInstance().consentID)
        .put("consent_categories", TCUser.getInstance().getConsentCategories())
        .put("consent_vendors", TCUser.getInstance().getConsentVendors())
        .put("external_consent", TCUser.getInstance().getExternalConsent())
        .toString();
    }
    catch (JSONException e)
    {
      e.printStackTrace();
    }

    getReactApplicationContext()
    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
    .emit("refreshTCUser", userJson);
  }

  private HashMap<String, String> convertReadableMapToHashMap(ReadableMap readableMap)
  {
    HashMap<String, String> hashMap = new HashMap<>();

    if (readableMap == null)
    {
      return hashMap;
    }

    for (String key : readableMap.toHashMap().keySet())
    {
      if (readableMap.hasKey(key) && !readableMap.isNull(key))
      {
        hashMap.put(key, readableMap.getString(key));
      }
    }

    return hashMap;
  }

  private ETCConsentSource evaluateConsentSource(String stringSource)
  {
      if (stringSource.equals("POP_UP"))
      {
        return ETCConsentSource.Popup;
      }
      else
      {
        return ETCConsentSource.PrivacyCenter;
      }
  }

  private ETCConsentAction evaluateConsentAction(String stringAction)
  {
    if (stringAction.equals("ACCEPT_ALL"))
    {
      return ETCConsentAction.AcceptAll;
    }
    else if (stringAction.equals("REFUSE_ALL"))
    {
      return ETCConsentAction.AcceptAll;
    }
    else
    {
      return ETCConsentAction.Save;
    }
  }

  private String getTCUserJson()
  {
    try
    {
      return TCUser.getInstance().getJsonObject().put("consentID", TCUser.getInstance().consentID).toString();
    }
    catch (JSONException e)
    {
      e.printStackTrace();
    }
    return "";
  }

  private WritableMap mapToReadableMap(Map<String, String> inputMap)
  {
    WritableMap writableMap = new WritableNativeMap();

    try
    {
      for (Map.Entry<String, String> entry : inputMap.entrySet())
      {
        writableMap.putString(entry.getKey(), entry.getValue());
      }
    }
    catch (Exception e)
    {
      TCLogger.getInstance().logMessage("CONVERSION_ERROR : Error converting Map to ReadableMap", Log.ERROR);
    }

    return writableMap;
  }

  @ReactMethod
  public void addListener(String eventName) {}

  @ReactMethod
  public void removeListeners(Integer count) {}
}
