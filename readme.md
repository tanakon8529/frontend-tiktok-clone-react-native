
# Frontend TikTok Clone - React Native

## Introduction

Dive into our React Native application, designed to connect seamlessly with our backend APIs, ensuring a secure and dynamic user experience. With features like OAuth 2.0 for authentication, Amazon S3 for storage, auto-play videos, and real-time chat, this app delivers a comprehensive and engaging platform for users. Enjoy advanced functionalities including dynamic search, video posting, and OTP-based authentication for a smooth sign-up and login process.

## Key Features

- **React Native Framework:** For a responsive and native user experience.
- **OAuth 2.0 Authentication:** Ensures secure access to user accounts.
- **Amazon S3 Integration:** For storage, enabling auto-play video feeds.
- **Comprehensive User Interaction:** Including dynamic search, video posting, and real-time chat.
- **OTP Authentication:** For a user-friendly sign-up and login experience.

## Getting Started

### Prerequisites

- Git
- Node.js and npm/yarn
- Expo CLI (for local development)

### Local Development

#### Setting Up

Clone the repository and install dependencies to get started:

```shell
git clone https://gitlab.com/demodecent_project/front-end/dedee-app.git
cd dedee-app
yarn install
```

#### Running the App

To launch the app on your local machine (supports Web, Android, iOS):

```shell
yarn start
```

If you encounter missing packages:

```shell
yarn add -D @types/<package-name>-react-native
```

## Building for Android

Prepare your app for deployment to Google Play:

```shell
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo
eas login

# Configure your project for build
eas build:configure

# Build your app for Android
eas build --platform android

# Monitor build status and retrieve APK
eas build:list
```

Deploy the build APK to the Google Play Console as per the platform's guidelines.
