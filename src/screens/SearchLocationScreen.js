import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CustomSafeArea from '../components/CustomSafeArea';

const SearchLocationScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentLocations, setRecentLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  // Get the location type from route params (pickup or destination)
  const locationType = route.params?.locationType || 'pickup';
  
  // Set screen title based on locationType
  const screenTitle = locationType === 'destination' ? 'Enter Destination' : 'Enter Pickup';

  // Mock data for recent locations - in a real app, this would come from local storage or a backend
  useEffect(() => {
    setRecentLocations([
      { id: 1, name: 'Home', address: '123 Main St, Anytown', isFavorite: true },
      { id: 2, name: 'Office', address: '456 Work Ave, Business City', isFavorite: true },
      { id: 3, name: 'Coffee Shop', address: '789 Latte Lane, Beanville', isFavorite: false },
    ]);
  }, []);

  // Get user's current location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        setLoading(true);
        const location = await Location.getCurrentPositionAsync({});
        
        // Here you would typically reverse geocode the coordinates to get the address
        // Using a placeholder for now
        setCurrentLocation({
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          address: 'Current Location',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error getting location:', error);
        setLoading(false);
      }
    })();
  }, []);

  // Mock search function - in a real app, this would call a geocoding API
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.length > 2) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Mock results
        const results = [
          { id: 101, name: 'Starbucks', address: text + ' Starbucks, Coffee Street', coordinates: { latitude: 37.78825, longitude: -122.4324 } },
          { id: 102, name: 'Central Park', address: text + ' Central Park, Park Avenue', coordinates: { latitude: 37.78925, longitude: -122.4334 } },
          { id: 103, name: 'Shopping Mall', address: text + ' Mall Road, Downtown', coordinates: { latitude: 37.79025, longitude: -122.4344 } },
        ];
        
        setSearchResults(results);
        setLoading(false);
      }, 1000);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (location) => {
    // Here you would typically save this location to the user's recent locations
    // and pass it back to the main screen with the location type
    navigation.navigate('Home', { 
      selectedLocation: location,
      locationType: locationType
    });
  };

  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      handleSelectLocation(currentLocation);
    }
  };

  // Render item for the FlatList
  const renderLocationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.locationItem} 
      onPress={() => handleSelectLocation(item)}
    >
      <View style={styles.locationIconContainer}>
        {item.isFavorite ? (
          <Ionicons name="star" size={22} color="#FFB800" />
        ) : (
          <Ionicons name="location-outline" size={22} color="#666" />
        )}
      </View>
      <View style={styles.locationDetails}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationAddress}>{item.address}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons 
          name={item.isFavorite ? "bookmark" : "bookmark-outline"} 
          size={24} 
          color="#FFB800" 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <CustomSafeArea forceInset={true}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{screenTitle}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search for ${locationType === 'destination' ? 'destination' : 'pickup'}`}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFB800" />
        </View>
      ) : (
        <FlatList
          data={searchQuery.length > 0 ? searchResults : recentLocations}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          ListHeaderComponent={
            <>
              {searchQuery.length === 0 && (
                <>
                  <TouchableOpacity 
                    style={styles.currentLocationItem}
                    onPress={handleUseCurrentLocation}
                  >
                    <View style={styles.currentLocationIconContainer}>
                      <Ionicons name="locate" size={22} color="#fff" />
                    </View>
                    <Text style={styles.currentLocationText}>Use Current Location</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Locations</Text>
                  </View>
                </>
              )}
            </>
          }
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <View style={styles.emptyResultsContainer}>
                <Text style={styles.emptyResultsText}>No locations found</Text>
              </View>
            ) : null
          }
        />
      )}
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  currentLocationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#FFF9E6',
  },
  currentLocationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  emptyResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyResultsText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SearchLocationScreen; 