# tcconsent-react-native

CommandersAct's TCConsent react native bridge

# 1. Installation

### 1.1 Package.json 

add the following dependencies into your package.json, and then install them using `npm install`

```sh
    "tcconsent-react-native": "git+https://github.com/commandersact/tcconsent-react-native#*.*.*", #check latest available version
    "tccore-react-native": "git+https://github.com/commandersact/tccore-react-native#*.*.*", #check latest available version
```

### 1.2 Podfile - iOS Specific

Once the JS packages installed, you'll need to manually add the required pods to your Podfile:

```
pod "tccore-react-native-swift", :path => '../node_modules/@commandersact/tccore-react-native/tccore-react-native-swift.podspec'
pod "tcconsent-react-native-swift", :path => '../node_modules/@commandersact/tcconsent-react-native/tcconsent-react-native-swift.podspec'
```

check the demo app podfile here : https://github.com/CommandersAct/TCDemoReactNative/blob/master/ios/Podfile

After updating the Podfile, navigate to your ios/ directory and run:

```
  pod install
```

This ensures that the native modules are correctly integrated into your Xcode project.


### 1.3 Jsons files

Depending on your use case, you may need one or multiple of these offline jsons in both of your android/iOS native app code. 

- privacy.json [if you are planning on using our consent interface/ Privacy center]
- vendor-list.json if your are using IAB. 
- purposes-xx.json if you are using IAB with a translation.
- google-atp-list.json if you wanna use ACString. 


#### For Android : 

Your should have all of your necessary json files inside the assets folder of your main app module. 

#### For iOS : 

Make sure all your necessary json files are bundled with your app main bundle.
  Xcode target -> Build phases -> copy bundle ressources. 


## 2. Usage

Usage will highly depend on your usecase. It is highly recommanded to have a look on the native SDK documentation for more insights and details. [Android](https://github.com/CommandersAct/androidV5/tree/master/TCConsent) and [iOS](https://github.com/CommandersAct/iOSV5/tree/master/TCConsent). 

The follwing is a code sample for some main methodes of the library : 

```js
// imports ... 
import * as TCConsent from 'tcconsent-react-native';
// Initialisation ..
  TCConsent.setSiteIDPrivacyID(3311, 2929)
// Show privacy center 
  TCConsent.showPrivacyCenter()
// Accept consent directly without displaying the privacy center 
  TCConsent.acceptAllConsent()

```

### 3. Demo App 

Check the following repo for a full working react-native app that integrates this library. 

https://github.com/CommandersAct/TCDemoReactNative


# Support & Contact : 

Support : support@commandersact.com

http://www.commandersact.com

Commanders Act | 7b rue taylor - 75010 PARIS - France

![Commanders Act logo](res/ca_logo.png)
