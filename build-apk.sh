#!/bin/bash

# Make sure EAS CLI is installed
if ! command -v eas &> /dev/null
then
    echo "EAS CLI is not installed. Installing now..."
    npm install -g eas-cli
fi

# Check if API keys have been set
if grep -q "REPLACE_WITH_YOUR_ACTUAL_ANDROID_API_KEY" app.json; then
    echo "ERROR: You need to replace the placeholder API keys in app.json with your actual Google Maps API keys."
    echo "Please follow the instructions in the README.md file."
    exit 1
fi

# Check if google-services.json exists
if [ ! -f "google-services.json" ]; then
    echo "WARNING: google-services.json file not found."
    echo "This file is required for Google Maps to work properly on Android."
    echo "Please follow the instructions in the README.md file."
    echo ""
    read -p "Do you want to continue anyway? (y/n): " continue
    if [[ ! "$continue" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Login to Expo (if not already logged in)
echo "Please make sure you're logged into your Expo account."
eas whoami || eas login

# Initialize the project with EAS
echo "Initializing project with EAS..."
eas build:configure

# Register the project with EAS
echo "Registering project with EAS..."
eas project:init

# Build the APK
echo "Building APK..."
eas build -p android --profile preview

echo "Build process initiated. You can monitor the build status on the Expo website."
echo "Once complete, you'll be able to download the APK from the Expo dashboard." 