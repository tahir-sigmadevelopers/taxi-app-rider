# RideWave User App

## Google Maps Setup

To make Google Maps work in the built APK, follow these steps:

### 1. Get Google Maps API Keys

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Maps Android API and Google Maps iOS API
4. Create API keys for both platforms
5. For the Android API key, make sure to restrict it to your app's package name: `com.ridewave.user`

### 2. Update app.json

Update the app.json file with your actual API keys:

```json
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_ACTUAL_IOS_API_KEY"
  }
},
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_ACTUAL_ANDROID_API_KEY"
    }
  }
}
```

### 3. Set Up Firebase for Android

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add an Android app to your project with the package name `com.ridewave.user`
4. Download the google-services.json file
5. Place it in the root of your user app directory

### 4. Rebuild the APK

After making these changes, rebuild your APK:

```bash
cd i_am_working_on_it/user
./build-apk.sh  # or build-apk.bat on Windows
```

## Troubleshooting

If maps still don't show up:

1. Make sure your API keys are valid and have the correct restrictions
2. Ensure the Google Maps Android API is enabled in your Google Cloud Console
3. Check that your device has Google Play Services installed
4. Verify that your app has location permissions enabled on the device 