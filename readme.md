
# Dedee App React Native.

Welcome to our cutting-edge React Native application! Designed to seamlessly integrate with our previously developed APIs, this app takes full advantage of the power and versatility of OAuth 2.0 authentication, ensuring secure access to our users' accounts. 

In addition, this application leverages the capabilities of Amazon S3 to provide a captivating and engaging experience with auto-play videos in the feed. You'll also have the opportunity to explore various features, including a dynamic search functionality, the ability to post videos, real-time chat, and a user-friendly sign-up and login process via email or mobile phone using OTP verification. 

Get ready to dive into this immersive and feature-rich application that combines the best of React Native, OAuth 2.0, Amazon S3, and more, delivering a seamless user experience like never before. Let's get started!

## Deploy on local Expo by yarn
```bash

# Clone this repository
$ git  clone  https://gitlab.com/demodecent_project/front-end/dedee-app.git

# Go into the repository
$ cd  dedee-app

# Install dependencies
$ yarn  install

# Run the app (Web, Android, iOS)
$ yarn  start

# if yarn add <package-name> not found on node_modules try this...
$ yarn add -D @types/<package-name>-react-native
# Example
$ yarn add -D @types/styled-components-react-native


```

## Build Android APK For Google Play

```bash
Creating your first build : https://docs.expo.dev/build/setup/

# Install the latest EAS CLI
$ npm install -g eas-cli
# Log in to your Expo account
$ eas login
# Configure the project
$ eas build:configure
# Run a build
$ eas build --platform android
# Wait for the build to complete
$ eas build:list
# Deploy the build
# Go to Google Play Console
```
