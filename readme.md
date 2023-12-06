The "frontend-tiktok-clone-react-native" project:

```markdown
# App React Native

Welcome to our cutting-edge React Native application! This app integrates seamlessly with our previously developed APIs and utilizes OAuth 2.0 authentication to ensure secure user account access. It also leverages Amazon S3 for an engaging experience with auto-play videos, dynamic search functionality, video posting, real-time chat, and a user-friendly sign-up and login process using OTP verification.

## Features
- React Native Framework
- OAuth 2.0 Authentication
- Amazon S3 Integration
- Auto-play videos in feed
- Dynamic search, video posting, and real-time chat
- OTP-based sign-up and login

## Local Deployment with Expo and Yarn
```
# Clone this repository
$ git clone https://gitlab.com/demodecent_project/front-end/dedee-app.git

# Navigate to the repository
$ cd dedee-app

# Install dependencies
$ yarn install

# Run the app (Web, Android, iOS)
$ yarn start

# Add missing packages (if required)
$ yarn add -D @types/<package-name>-react-native
```

## Building Android APK for Google Play
```
# Install the latest EAS CLI
$ npm install -g eas-cli

# Log in to your Expo account
$ eas login

# Configure the project
$ eas build:configure

# Run a build for Android
$ eas build --platform android

# Wait for the build to complete and check the list
$ eas build:list

# Deploy the build to Google Play Console
