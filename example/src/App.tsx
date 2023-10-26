import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import { TCUser } from 'tccore-react-native';
import * as TCConsent from 'tcconsent-react-native';

async function initialiseTCConsent()
{
  await TCConsent.setSiteIDPrivacyID(3311, 2929)
}

let mockConsent = new Map([
  ['PRIVACY_CAT_1', '1'],
  ['PRIVACY_CAT_2', '1'],
  ['PRIVACY_CAT_3', '0'],
  ['PRIVACY_VEN_1', '0'],
  ['PRIVACY_CAT_2', '1'],
]);


const ButtonRow = () => {
  return(
    <ScrollView>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={initialiseTCConsent}>
          <Text style={styles.buttonText}>Re-init TCConsent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={printTCUser}>
          <Text style={styles.buttonText}>Print TCUser</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.acceptAllConsent}>
          <Text style={styles.buttonText}>acceptAllConsent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.refuseAllConsent}>
          <Text style={styles.buttonText}>refuseAllConsent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.showPrivacyCenter}>
          <Text style={styles.buttonText}>showPrivacyCenter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.useACString(true)}>
          <Text style={styles.buttonText}>useACString</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.customPCMSetSiteID(121,121)}>
          <Text style={styles.buttonText}>Init with custom PC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.setConsentDuration(9)}>
          <Text style={styles.buttonText}>setConsentDuration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.useCustomPublisherRestrictions}>
          <Text style={styles.buttonText}>useCustomPublisherRestrictions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.saveConsentFromPopUp(mockConsent)}>
          <Text style={styles.buttonText}>saveConsentFromPopUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.saveConsent(mockConsent)}>
          <Text style={styles.buttonText}>saveConsent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.saveConsentFromConsentSourceWithPrivacyAction(mockConsent, TCConsent.ETCConsentSource.POP_UP, TCConsent.ETCConsentAction.SAVE)}>
          <Text style={styles.buttonText}>saveConsentFromConsentSourceWithPrivacyAction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.statEnterPCToVendorScreen}>
          <Text style={styles.buttonText}>statEnterPCToVendorScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.statShowVendorScreen}>
          <Text style={styles.buttonText}>statShowVendorScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.statViewPrivacyPoliciesFromPrivacyCenter}>
          <Text style={styles.buttonText}>statViewPrivacyPoliciesFromPrivacyCenter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.statViewPrivacyCenter}>
          <Text style={styles.buttonText}>statViewPrivacyCenter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.statViewBanner}>
          <Text style={styles.buttonText}>statViewBanner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={TCConsent.resetSavedConsent}>
          <Text style={styles.buttonText}>resetSavedConsent</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.consentButton}
          onPress={() => TCConsent.setLanguage("fr")}>
          <Text style={styles.buttonText}>setLanguage to "fr"</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

  );
};

async function printConsent()
{
    let consent = await TCConsent.getConsentAsJson()
    console.log(consent)
}
export default function App() {
  initialiseTCConsent()
  return (
    <View style={styles.appContainer}>
      <ButtonRow />
    </View>
  );
}

function printTCUser()
{
  console.log(TCUser.getInstance())
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  consentButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});