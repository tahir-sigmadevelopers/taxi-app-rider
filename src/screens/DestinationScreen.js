import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DestinationScreen = ({ navigation, route }) => {
  // Safely access route params with default values
  const pickupLocation = route?.params?.pickupLocation || {
    latitude: 0,
    longitude: 0,
    address: 'No pickup location selected'
  };

  // Check if a destination was pre-selected (from SavedPlacesScreen)
  const preSelectedDestination = route?.params?.selectedDestination || null;
  
  const [selectedDestination, setSelectedDestination] = useState(preSelectedDestination);

  // Update selected destination if route params change
  useEffect(() => {
    if (route?.params?.selectedDestination) {
      setSelectedDestination(route.params.selectedDestination);
    }
  }, [route?.params?.selectedDestination]);

  // Sample recent locations
  const recentLocations = [
    {
      id: '1',
      name: 'Home',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    {
      id: '2',
      name: 'Office',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
    },
    {
      id: '3',
      name: 'Gym',
      address: '3891 Ranchview Dr. Richardson, California 62639',
    },
  ];

  const handleConfirmLocation = () => {
    if (!selectedDestination) {
      return; // Don't proceed if no destination is selected
    }
    
    navigation.navigate('BookRide', {
      pickupLocation,
      destinationLocation: selectedDestination
    });
  };

  const navigateToSavedPlaces = () => {
    navigation.navigate('SavedPlaces', { pickupLocation });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Destination</Text>
      </View>

      {/* Pickup Location Card */}
      <View style={styles.locationCard}>
        <View style={styles.locationInfo}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={24} color="#FFB800" />
          </View>
          <Text style={styles.locationText} numberOfLines={1}>
            {pickupLocation.address}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Recent Locations */}
        <Text style={styles.sectionTitle}>Recent Locations</Text>
        {recentLocations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.locationItem,
              selectedDestination?.id === location.id && styles.selectedLocation,
            ]}
            onPress={() => setSelectedDestination(location)}
          >
            <View style={styles.locationItemIcon}>
              <Ionicons name="time" size={24} color="#FFB800" />
            </View>
            <View style={styles.locationItemContent}>
              <Text style={styles.locationItemName}>{location.name}</Text>
              <Text style={styles.locationItemAddress} numberOfLines={1}>
                {location.address}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Saved Places Button */}
        <TouchableOpacity
          style={styles.savedPlacesButton}
          onPress={navigateToSavedPlaces}
        >
          <View style={styles.savedPlacesIcon}>
            <Ionicons name="bookmark" size={24} color="#FFB800" />
          </View>
          <Text style={styles.savedPlacesText}>Saved Places</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          !selectedDestination && styles.confirmButtonDisabled,
        ]}
        onPress={handleConfirmLocation}
        disabled={!selectedDestination}
      >
        <Text style={styles.confirmButtonText}>Confirm Destination</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  locationCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  selectedLocation: {
    backgroundColor: '#FFF9E6',
  },
  locationItemIcon: {
    marginRight: 12,
  },
  locationItemContent: {
    flex: 1,
  },
  locationItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationItemAddress: {
    fontSize: 14,
    color: '#666',
  },
  savedPlacesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  savedPlacesIcon: {
    marginRight: 12,
  },
  savedPlacesText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    margin: 16,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#FFE5B4',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DestinationScreen; 