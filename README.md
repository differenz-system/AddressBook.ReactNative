# AddressBook.ReactNative

## Overview
This repository contains **Address Book** application for react-native that shows design & coding practices followed by **[Differenz System](http://www.differenzsystem.com/)**.

The app does the following:
1. **Login:** 
    - User can login via facebook or email/password. 
2. **Home:** 
    - It will list all the saved contacts. 
    - It has the option to add a new contact on the top right.
    - User can edit contact by tapping on contact.
3. **Create new contact:** 
    - User can add a new contact to his address book by filling details here.
4. **Dark/Light Mode:** 
    - App supports Light & Dark mode, user can change mode by going into device dark mode settings.

## Pre-requisites
- Android device or emulator running API 21 (5.0 - Lollipop) or above
- [Android SDK 29](https://developer.android.com/about/versions/11/get)
- [Android Studio 4.1.1+](https://developer.android.com/studio/index.html)
- [Node js](https://nodejs.org/en/)
- [XCode](https://developer.apple.com/xcode/)
- [Visual Studio code](https://code.visualstudio.com/)
- [React-native-cli](https://www.npmjs.com/package/react-native-cli)

## Getting Started
1. [Install Android Studio](https://developer.android.com/studio/index.html)
2. [Install XCode](https://developer.apple.com/xcode/)
2. Clone this sample repository
3. Open Terminal, go to location of the repo
4. Enter command "react-native run-android" or "react-native run-ios"

## Key Tools & Technologies
- **Database:** react-native Async storage
- **Authentication:** Facebook login
- **API/Service calls:** fetch API
- **IDE:** Android studio, XCode, VSCode
- **Framework:** React native

## Troubleshooting
### (Mac OS)While running command (react-native run-ios), you are expected to have given error: "launchPackager.command" can't be opened.
To resolve this you can attempt given steps:

Go to System Preferences->Security & Privacy->Choose tab General->Allow launcherPackager.command and re-run command

wait while node js loads all the bundles and then refresh in simulator.

## Screenshots
### Android
<img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/Android/login.png" width="280"> <img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/Android/list.png" width="280"> <img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/Android/detail.png" width="280">

### iOS
<img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/iOS/login.png" width="280"> <img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/iOS/list.png" width="280"> <img src="https://github.com/differenz-system/AddressBook.ReactNative/blob/master/Screenshots/iOS/detail.png" width="280">

## Support
If you've found an error in this sample, please [report an issue](https://github.com/differenz-system/AddressBook.Android/issues/new). You can also send your feedback and suggestions at info@differenzsystem.com

Happy coding!
