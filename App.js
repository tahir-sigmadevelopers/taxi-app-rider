import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookingScreen from './src/screens/BookingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RideHistoryScreen from './src/screens/RideHistoryScreen';
// Additional screens
import CompleteProfileScreen from './src/screens/CompleteProfileScreen';
import BookRideScreen from './src/screens/BookRideScreen';
import ChatScreen from './src/screens/ChatScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import EnableLocationAccessScreen from './src/screens/EnableLocationAccessScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import PickupLocationScreen from './src/screens/PickupLocationScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import WalletScreen from './src/screens/WalletScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ManageAddressScreen from './src/screens/ManageAddressScreen';
import PaymentMethodsScreen from './src/screens/PaymentMethodsScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import PreBookedRidesScreen from './src/screens/PreBookedRidesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InviteFriendsScreen from './src/screens/InviteFriendsScreen';
import HelpCenterScreen from './src/screens/HelpCenterScreen';
import PasswordManagerScreen from './src/screens/PasswordManagerScreen';
import DestinationScreen from './src/screens/DestinationScreen';
import SavedPlacesScreen from './src/screens/SavedPlacesScreen';
import ScheduleRideScreen from './src/screens/ScheduleRideScreen';
import RideSharingScreen from './src/screens/RideSharingScreen';
import PromoCodeScreen from './src/screens/PromoCodeScreen';
import PayCashScreen from './src/screens/PayCashScreen';
import RideCompleteScreen from './src/screens/RideCompleteScreen';
import DriverArrivingScreen from './src/screens/DriverArrivingScreen';
import ArrivedAtDestinationScreen from './src/screens/ArrivedAtDestinationScreen';
import SearchLocationScreen from './src/screens/SearchLocationScreen';
import ConfirmLocationScreen from './src/screens/ConfirmLocationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Booking') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFB800',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="History" component={RideHistoryScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // For simplicity, we'll just show the onboarding screen by default
  // In a real app, you would use AsyncStorage to check if the user has seen it

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
        <Stack.Screen name="EnableLocationAccess" component={EnableLocationAccessScreen} />
        <Stack.Screen name="BookRide" component={BookRideScreen} />
        <Stack.Screen name="PickupLocation" component={PickupLocationScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="ManageAddress" component={ManageAddressScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="PreBookedRides" component={PreBookedRidesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="PasswordManager" component={PasswordManagerScreen} />
        <Stack.Screen name="SearchLocation" component={SearchLocationScreen} />
        <Stack.Screen name="ScheduleRide" component={ScheduleRideScreen} />
        <Stack.Screen name="RideSharing" component={RideSharingScreen} />
        <Stack.Screen name="PromoCode" component={PromoCodeScreen} />
        <Stack.Screen name="ConfirmLocation" component={ConfirmLocationScreen} />
        <Stack.Screen name="DriverArrivingScreen" component={DriverArrivingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ArrivedAtDestinationScreen" component={ArrivedAtDestinationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PayCash" component={PayCashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RideComplete" component={RideCompleteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
