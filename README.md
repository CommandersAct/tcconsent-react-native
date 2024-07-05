# tcconsent-react-native

CommandersAct's TCConsent react native bridge

## Installation

add the following dependencies into your package.json 

```sh
    "tcconsent-react-native": "git+https://github.com/commandersact/tcconsent-react-native#*.*.*", #check latest available version
    "tccore-react-native": "git+https://github.com/commandersact/tccore-react-native#*.*.*", #check latest available version
```

Depending on your use case, you may need one or multiple of these offline jsons in both of your android/iOS native app code. 

- privacy.json [if you are planning on using our consent interface/ Privacy center]
- vendor-list.json if your are using IAB. 
- purposes-xx.json if you are using IAB with a translation.
- google-atp-list.json if you wanna use ACString. 


For Android, it should be inside the assets folder of your main app module. 
For iOS, make sure it is bundled with your app main bundle, Xcode target -> Build phases -> copy bundle ressources. 


## Usage

This bridge ports the TCConsent SDK available on [Android](https://github.com/CommandersAct/androidV5/tree/master/TCConsent) and [iOS](https://github.com/CommandersAct/iOSV5/tree/master/TCConsent)

It is highly recommanded to take a look on the native SDK documentation for more insights and details. 

### Please check our [TDemoReactNative](https://github.com/CommandersAct/TCDemoReactNative) for a full demo app

basic usage example : 

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
