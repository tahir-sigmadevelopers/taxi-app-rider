import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const BookingScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [pickupFocused, setPickupFocused] = useState(false);
  const [destinationFocused, setDestinationFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Sample saved locations
  const savedLocations = [
    { id: '1', name: 'Home', address: '123 Home Street, Hometown', isSaved: true },
    { id: '2', name: 'Work', address: '456 Office Building, Business District', isSaved: true },
    { id: '3', name: 'Gym', address: '321 Fitness Road, Wellness Area', isSaved: true },
    { id: '4', name: 'Coffee Shop', address: '789 Main Street, Downtown', isSaved: true },
  ];

  // Sample recent locations
  const recentLocations = [
    { id: '5', name: 'Shopping Mall', address: '789 Shopping Center, Downtown', isRecent: true },
    { id: '6', name: 'Airport', address: 'International Airport, Terminal 3', isRecent: true },
  ];

  // Sample search results - in a real app, these would come from a location API
  const mockSearchResults = [
    { id: '10', name: 'Central Park', address: 'Central Park, New York, NY', distance: '5.2 mi' },
    { id: '11', name: 'Empire State Building', address: '350 5th Ave, New York, NY 10118', distance: '3.8 mi' },
    { id: '12', name: 'Times Square', address: 'Manhattan, NY 10036', distance: '4.1 mi' },
    { id: '13', name: 'Brooklyn Bridge', address: 'Brooklyn Bridge, New York, NY 10038', distance: '6.3 mi' },
    { id: '14', name: 'Grand Central Terminal', address: '89 E 42nd St, New York, NY 10017', distance: '2.9 mi' },
    { id: '15', name: 'Madison Square Garden', address: '4 Pennsylvania Plaza, New York, NY', distance: '3.5 mi' },
    { id: '16', name: 'Statue of Liberty', address: 'Liberty Island, New York, NY', distance: '7.8 mi' },
  ];

  // Search for locations based on text input
  const searchLocations = (text, isPickup) => {
    const currentValue = isPickup ? text : destinationLocation;
    
    if (isPickup) {
      setPickupLocation(text);
    } else {
      setDestinationLocation(text);
    }

    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      const results = mockSearchResults.filter(location =>
        location.name.toLowerCase().includes(text.toLowerCase()) ||
        location.address.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Handle selection of a location
  const handleLocationSelect = (location, isPickup) => {
    if (isPickup) {
      setPickupLocation(location.address);
      setPickupFocused(false);
    } else {
      setDestinationLocation(location.address);
      setDestinationFocused(false);
    }
    setSearchResults([]);
  };

  // Set focus on input field
  const handleFocus = (isPickup) => {
    if (isPickup) {
      setPickupFocused(true);
      setDestinationFocused(false);
    } else {
      setDestinationFocused(true);
      setPickupFocused(false);
    }
  };

  const handleSetLocations = () => {
    if (!pickupLocation || !destinationLocation) {
      return;
    }

    // Convert to the format expected by the next screens with proper error handling
    try {
      // Create pickup data object with coordinates
      const pickupData = {
        coordinates: { 
          latitude: 37.78825, // In a real app, these would come from geocoding API
          longitude: -122.4324 
        },
        address: pickupLocation,
        name: pickupLocation.split(',')[0] || 'Pickup'
      };

      // Create destination data object with coordinates
      const destinationData = {
        coordinates: { 
          latitude: 37.77825, // In a real app, these would come from geocoding API
          longitude: -122.4224 
        },
        address: destinationLocation,
        name: destinationLocation.split(',')[0] || 'Destination'
      };

      console.log('Navigating to ConfirmLocation with:', {
        pickup: pickupData,
        destination: destinationData
      });

      // Navigate to confirm location screen with the correct screen name
      // The registered name in App.js is "ConfirmLocation" not "ConfirmLocationScreen"
      navigation.navigate('ConfirmLocation', {
        pickup: pickupData,
        destination: destinationData
      });
    } catch (error) {
      console.error('Error preparing location data:', error);
      // In a real app, you would show an error message to the user
    }
  };

  // Render location item
  const renderLocationItem = (location, iconName, iconColor) => (
    <TouchableOpacity
      key={location.id}
      style={styles.locationItem}
      onPress={() => handleLocationSelect(location, pickupFocused)}
    >
      <View style={[styles.locationIconContainer, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      <View style={styles.locationDetails}>
        <Text style={styles.locationName}>{location.name}</Text>
        <Text style={styles.locationAddress} numberOfLines={1}>{location.address}</Text>
      </View>
      {location.distance && (
        <Text style={styles.locationDistance}>{location.distance}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <CustomSafeArea forceInset={true}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book a Ride</Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationInputWrapper}>
          <View style={styles.inputRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location" size={22} color="#FFB800" />
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChangeText={(text) => searchLocations(text, true)}
              onFocus={() => handleFocus(true)}
              placeholderTextColor="#aaa"
            />
            {pickupLocation.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setPickupLocation('')}
              >
                <Ionicons name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.inputRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="flag" size={22} color="#FF3B30" />
            </View>
            <TextInput
              style={styles.locationInput}
              placeholder="Enter destination"
              value={destinationLocation}
              onChangeText={(text) => searchLocations(text, false)}
              onFocus={() => handleFocus(false)}
              placeholderTextColor="#aaa"
            />
            {destinationLocation.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setDestinationLocation('')}
              >
                <Ionicons name="close-circle" size={18} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Location suggestions dropdown */}
        {(pickupFocused || destinationFocused) && (
          <View style={styles.suggestionsContainer}>
            <ScrollView>
              {/* Loader */}
              {isSearching && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="small" color="#FFB800" />
                  <Text style={styles.loaderText}>Searching locations...</Text>
                </View>
              )}
              
              {/* Search results */}
              {searchResults.length > 0 && (
                <View>
                  <Text style={styles.sectionHeader}>Search Results</Text>
                  {searchResults.map(location => 
                    renderLocationItem(location, 'navigate', '#4285F4')
                  )}
                </View>
              )}
              
              {/* Saved locations */}
              {(pickupFocused || destinationFocused) && !isSearching && 
                ((pickupFocused && !pickupLocation) || (destinationFocused && !destinationLocation)) && (
                <View>
                  <Text style={styles.sectionHeader}>Saved Places</Text>
                  {savedLocations.map(location => 
                    renderLocationItem(location, 'star', '#FFB800')
                  )}
                  
                  {recentLocations.length > 0 && (
                    <>
                      <Text style={styles.sectionHeader}>Recent Places</Text>
                      {recentLocations.map(location => 
                        renderLocationItem(location, 'time', '#888')
                      )}
                    </>
                  )}
                </View>
              )}
              
              {/* No results */}
              {!isSearching && searchResults.length === 0 && 
                ((pickupFocused && pickupLocation) || (destinationFocused && destinationLocation)) && (
                <View style={styles.noResultsContainer}>
                  <Ionicons name="search" size={40} color="#ddd" />
                  <Text style={styles.noResultsText}>No locations found</Text>
                  <Text style={styles.noResultsSubtext}>Try a different search term</Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Bottom content */}
      {!pickupFocused && !destinationFocused && (
        <View style={styles.content}>
          {!pickupLocation || !destinationLocation ? (
            <>
              <Ionicons name="car" size={64} color="#FFB800" />
              <Text style={styles.title}>Ready to book a ride?</Text>
              <Text style={styles.subtitle}>
                Choose your pickup and destination locations to get started.
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
              <Text style={styles.title}>All set!</Text>
              <Text style={styles.subtitle}>
                Your pickup and destination are ready. Press the button below to continue.
              </Text>
            </>
          )}
          
          <TouchableOpacity 
            style={[styles.button, (!pickupLocation || !destinationLocation) && styles.buttonDisabled]}
            onPress={handleSetLocations}
            disabled={!pickupLocation || !destinationLocation}
          >
            <Text style={styles.buttonText}>
              {!pickupLocation || !destinationLocation ? 'Set Locations' : 'Continue to Booking'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  locationContainer: {
    position: 'relative',
    zIndex: 2,
  },
  locationInputWrapper: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  clearButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
    marginLeft: 32,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 16,
    maxHeight: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 12,
    marginBottom: 8,
    paddingLeft: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  locationAddress: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  locationDistance: {
    fontSize: 13,
    color: '#999',
    marginLeft: 8,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loaderText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFB800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#FFB800',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen; 