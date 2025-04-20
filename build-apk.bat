@echo off
echo Building APK for RideWave User App...

REM Check if EAS CLI is installed
where eas >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo EAS CLI is not installed. Installing now...
    npm install -g eas-cli
)

REM Check if API keys have been set
findstr /C:"REPLACE_WITH_YOUR_ACTUAL_ANDROID_API_KEY" app.json >nul
if %ERRORLEVEL% EQU 0 (
    echo ERROR: You need to replace the placeholder API keys in app.json with your actual Google Maps API keys.
    echo Please follow the instructions in the README.md file.
    pause
    exit /b 1
)

REM Check if google-services.json exists
if not exist google-services.json (
    echo WARNING: google-services.json file not found.
    echo This file is required for Google Maps to work properly on Android.
    echo Please follow the instructions in the README.md file.
    echo.
    set /p continue=Do you want to continue anyway? (y/n): 
    if /i not "%continue%"=="y" exit /b 1
)

REM Login to Expo (if not already logged in)
echo Please make sure you're logged into your Expo account.
eas whoami || eas login

REM Initialize the project with EAS
echo Initializing project with EAS...
eas build:configure

REM Register the project with EAS
echo Registering project with EAS...
eas project:init

REM Build the APK
echo Building APK...
eas build -p android --profile preview

echo Build process initiated. You can monitor the build status on the Expo website.
echo Once complete, you'll be able to download the APK from the Expo dashboard.
pause 