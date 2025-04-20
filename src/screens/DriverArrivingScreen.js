import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const DriverArrivingScreen = ({ navigation, route }) => {
  const [remainingTime, setRemainingTime] = useState(3);
  
  // Get parameters from route
  const pickup = route.params?.pickup;
  const destination = route.params?.destination;
  const driver = route.params?.driver;
  const fare = route.params?.fare; // Numeric fare value
  const fareDisplay = route.params?.fareRange || `$${fare?.toFixed(2)}`; // Use fareRange if available, otherwise format the numeric fare
  
  useEffect(() => {
    // Countdown timer simulation
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate route between driver and pickup
  const routeCoordinates = pickup?.coordinates ? [
    {
      latitude: pickup.coordinates.latitude - 0.008,
      longitude: pickup.coordinates.longitude - 0.005,
    },
    pickup.coordinates
  ] : [];
  
  const handleCallDriver = () => {
    Linking.openURL('tel:+1234567890');
  };
  
  const handleCancelRide = () => {
    navigation.navigate('Home');
  };
  
  if (!pickup?.coordinates) {
    return (
      <CustomSafeArea forceInset={true}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ride information is missing</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </CustomSafeArea>
    );
  }
  
  return (
    <CustomSafeArea forceInset={true}>
      <View style={styles.container}>
        {/* Map View */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pickup.coordinates.latitude,
            longitude: pickup.coordinates.longitude,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
          {/* Pickup Marker */}
          <Marker
            coordinate={pickup.coordinates}
            title="Pickup Location"
          >
            <View style={styles.pickupMarker}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
          </Marker>
          
          {/* Driver Marker */}
          {routeCoordinates.length > 0 && (
            <Marker
              coordinate={routeCoordinates[0]}
              title="Driver Location"
            >
              <View style={styles.driverMarker}>
                <Ionicons name="car" size={24} color="#555" />
              </View>
            </Marker>
          )}
          
          {/* Route line */}
          {routeCoordinates.length > 1 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={3}
              strokeColor="#FFB800"
            />
          )}
        </MapView>
        
        {/* Trip Info Card */}
        <View style={styles.tripInfoCard}>
          <View style={styles.driverInfo}>
            <View style={styles.driverImageContainer}>
              <Ionicons name="person-circle" size={60} color="#ccc" />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driver?.name || 'Driver Name'}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingText}>{driver?.rating || '4.8'}</Text>
              </View>
              <Text style={styles.carInfo}>{driver?.car || 'Toyota Camry'} • {driver?.plate || 'ABC 123'}</Text>
            </View>
            <TouchableOpacity style={styles.callButton} onPress={handleCallDriver}>
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.tripDetails}>
            <View style={styles.arrivalInfo}>
              <Text style={styles.arrivalTitle}>Driver is arriving in</Text>
              <Text style={styles.arrivalTime}>{remainingTime} min</Text>
            </View>
            
            <View style={styles.fareInfo}>
              <Text style={styles.fareTitle}>Estimated fare</Text>
              <Text style={styles.fareAmount}>{fareDisplay}</Text>
            </View>
          </View>
          
          <View style={styles.locationInfo}>
            <View style={styles.locationRow}>
              <View style={[styles.locationDot, styles.pickupDot]} />
              <Text style={styles.locationText} numberOfLines={1}>{pickup.name || pickup.address || 'Pickup location'}</Text>
            </View>
            
            <View style={styles.locationConnector} />
            
            <View style={styles.locationRow}>
              <View style={[styles.locationDot, styles.destinationDot]} />
              <Text style={styles.locationText} numberOfLines={1}>{destination?.name || destination?.address || 'Destination'}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRide}>
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
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
    flex: 1,
  },
  pickupMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  driverMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#555',
  },
  tripInfoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  driverImageContainer: {
    marginRight: 15,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  carInfo: {
    fontSize: 14,
    color: '#777',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 15,
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  arrivalInfo: {},
  arrivalTitle: {
    fontSize: 14,
    color: '#777',
  },
  arrivalTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  fareInfo: {
    alignItems: 'flex-end',
  },
  fareTitle: {
    fontSize: 14,
    color: '#777',
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  locationInfo: {
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  pickupDot: {
    backgroundColor: '#FFB800',
  },
  destinationDot: {
    backgroundColor: '#FF3B30',
  },
  locationConnector: {
    width: 2,
    height: 20,
    backgroundColor: '#ddd',
    marginLeft: 5,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DriverArrivingScreen; 