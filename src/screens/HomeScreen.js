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

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearbyDrivers, setNearbyDrivers] = useState([
    { id: 1, coordinate: { latitude: 37.78925, longitude: -122.4324 } },
    { id: 2, coordinate: { latitude: 37.78825, longitude: -122.4334 } },
    { id: 3, coordinate: { latitude: 37.78725, longitude: -122.4344 } },
  ]);

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
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
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
          onPress={() => navigation.navigate('PickupLocation')}
        >
          <Ionicons name="location" size={24} color="#FFB800" />
          <TextInput
            style={styles.searchInput}
            placeholder="Current Location"
            placeholderTextColor="#666"
            editable={false}
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
            onPress={() => navigation.navigate('PickupLocation')}
          >
            <View style={styles.destinationIcon}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
            <View style={styles.destinationContent}>
              <Text style={styles.destinationTitle}>Destination</Text>
              <Text style={styles.destinationSubtitle}>Enter Destination</Text>
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
  activeNavText: {
    fontSize: 12,
    color: '#FFB800',
    marginTop: 4,
  },
});

export default HomeScreen; 