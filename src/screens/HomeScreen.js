import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CustomSafeArea from '../components/CustomSafeArea';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [nearbyDrivers, setNearbyDrivers] = useState([
    { id: 1, coordinate: { latitude: 37.78925, longitude: -122.4324 } },
    { id: 2, coordinate: { latitude: 37.78825, longitude: -122.4334 } },
    { id: 3, coordinate: { latitude: 37.78725, longitude: -122.4344 } },
  ]);

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Handle location coming back from SearchLocationScreen
  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.selectedLocation) {
        console.log('Selected location received:', route.params.selectedLocation);
        
        // Check if this is a pickup or destination location
        if (route.params.locationType === 'destination') {
          setDestinationLocation(route.params.selectedLocation);
        } else {
          // Default to pickup location
          setSelectedLocation(route.params.selectedLocation);
        }
        
        // Clear the parameter to avoid re-setting on other focus events
        navigation.setParams({ 
          selectedLocation: undefined,
          locationType: undefined 
        });
      }
    }, [route.params?.selectedLocation, route.params?.locationType])
  );

  // Get the text to display in the pickup search bar
  const getLocationDisplayText = () => {
    if (selectedLocation) {
      return selectedLocation.name || selectedLocation.address || 'Selected Location';
    } 
    return 'Enter your location';
  };
  
  // Get the text to display in the destination search bar
  const getDestinationDisplayText = () => {
    if (destinationLocation) {
      return destinationLocation.name || destinationLocation.address || 'Selected Destination';
    } 
    return 'Enter Destination';
  };
  
  // Navigate to search screen for pickup location
  const navigateToPickupSearch = () => {
    navigation.navigate('SearchLocation', { locationType: 'pickup' });
  };
  
  // Navigate to search screen for destination
  const navigateToDestinationSearch = () => {
    navigation.navigate('SearchLocation', { locationType: 'destination' });
  };
  
  // Navigate to confirm ride screen
  const navigateToConfirmRide = () => {
    if (selectedLocation && destinationLocation) {
      navigation.navigate('ConfirmLocation', {
        pickup: selectedLocation,
        destination: destinationLocation
      });
    }
  };

  return (
    <CustomSafeArea forceInset={true}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={selectedLocation && selectedLocation.coordinates ? {
          latitude: selectedLocation.coordinates.latitude,
          longitude: selectedLocation.coordinates.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        } : undefined}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Display selected pickup location marker if available */}
        {selectedLocation && selectedLocation.coordinates && (
          <Marker
            coordinate={selectedLocation.coordinates}
            title={selectedLocation.name || "Pickup Location"}
            description={selectedLocation.address}
          >
            <View style={styles.selectedLocationMarker}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
          </Marker>
        )}
        
        {/* Display selected destination marker if available */}
        {destinationLocation && destinationLocation.coordinates && (
          <Marker
            coordinate={destinationLocation.coordinates}
            title={destinationLocation.name || "Destination"}
            description={destinationLocation.address}
          >
            <View style={styles.destinationMarker}>
              <Ionicons name="flag" size={24} color="#FF3B30" />
            </View>
          </Marker>
        )}
        
        {/* Display nearby drivers */}
        {nearbyDrivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={driver.coordinate}
          >
            <View style={styles.markerContainer}>
              <Ionicons name="car" size={24} color="#FFB800" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBar}
          activeOpacity={1}
          onPress={navigateToPickupSearch}
        >
          <Ionicons name="location" size={24} color="#FFB800" />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter your location"
            placeholderTextColor="#666"
            editable={false}
            value={selectedLocation ? getLocationDisplayText() : ''}
          />
          <TouchableOpacity style={styles.bookmarkButton}>
            <Ionicons name="bookmark-outline" size={24} color="#FFB800" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.bottomSheetTitle}>Where to?</Text>
        <View style={styles.destinationsContainer}>
          <TouchableOpacity 
            style={styles.destinationOption}
            onPress={navigateToDestinationSearch}
          >
            <View style={styles.destinationIcon}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
            <View style={styles.destinationContent}>
              <Text style={styles.destinationTitle}>Destination</Text>
              <Text style={styles.destinationSubtitle}>
                {destinationLocation ? getDestinationDisplayText() : 'Enter Destination'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.destinationOption}>
            <View style={styles.destinationIcon}>
              <Ionicons name="business" size={24} color="#FFB800" />
            </View>
            <View style={styles.destinationContent}>
              <Text style={styles.destinationTitle}>Office</Text>
              <Text style={styles.destinationSubtitle}>35 Km Away</Text>
            </View>
          </TouchableOpacity>
          
          {/* Confirm Button - Show only when both pickup and destination are selected */}
          {selectedLocation && destinationLocation && (
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={navigateToConfirmRide}
            >
              <Text style={styles.confirmButtonText}>Confirm Ride</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  selectedLocationMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  destinationMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  bookmarkButton: {
    padding: 5,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  destinationsContainer: {
    gap: 15,
  },
  destinationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  destinationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  destinationContent: {
    flex: 1,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  destinationSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    borderRadius: 20,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default HomeScreen; 