import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import CustomSafeArea from '../components/CustomSafeArea';
import socketService from '../services/socketService';
import { v4 as uuidv4 } from 'uuid';

const DriverRequestsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [driverRequests, setDriverRequests] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [rideId, setRideId] = useState(uuidv4()); // Generate a unique ride ID
  
  // Get parameters from route
  const pickup = route.params?.pickup;
  const destination = route.params?.destination;
  const fare = route.params?.fare; // Numeric fare value
  const fareDisplay = route.params?.fareRange || `$${fare?.toFixed(2)}`; // Use fareRange if available
  
  // Setup socket connection and listeners
  useEffect(() => {
    const userId = '123456'; // In a real app, this would come from user authentication
    
    // Initialize socket if not already connected
    if (!socketService.connected) {
      socketService.initialize(userId);
    }
    
    // Setup listeners for driver requests
    socketService.on('onDriverRequest', (driverId, driverData, reqRideId) => {
      if (reqRideId === rideId) {
        console.log('Driver request received:', driverData);
        
        // Add driver request to the list
        setDriverRequests(prev => {
          // Check if this driver already sent a request
          const existingIndex = prev.findIndex(d => d.id === driverId);
          
          if (existingIndex >= 0) {
            // Update existing driver
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              ...driverData
            };
            return updated;
          } else {
            // Add new driver
            return [...prev, {
              id: driverId,
              name: driverData.name,
              rating: driverData.rating,
              car: driverData.car,
              plate: driverData.plate,
              eta: driverData.eta + ' min',
              distance: calculateDistance(driverData.latitude, driverData.longitude) + ' mi away',
              price: fare,
              priceDisplay: fareDisplay
            }];
          }
        });
        
        // If this is our first driver, stop the loading state
        setLoading(false);
      }
    });
    
    // Handle ride acceptance confirmation
    socketService.on('onRideAccepted', (driverId, driverData, reqRideId) => {
      if (reqRideId === rideId) {
        // Navigate to driver arriving screen
        navigation.navigate('DriverArrivingScreen', {
          pickup,
          destination,
          fare,
          fareRange: fareDisplay,
          driver: {
            name: driverData.name,
            rating: driverData.rating,
            car: driverData.car,
            plate: driverData.plate,
            eta: driverData.eta + ' min'
          }
        });
      }
    });
    
    // Request a ride through the socket
    requestRide();
    
    // Set a timeout to show a message if no drivers are found
    const noDriversTimeout = setTimeout(() => {
      if (loading && driverRequests.length === 0) {
        setLoading(false);
        Alert.alert(
          'No Drivers Found',
          'No drivers are currently available in your area. Please try again later.',
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]
        );
      }
    }, 20000); // 20 seconds timeout
    
    // Cleanup
    return () => {
      clearTimeout(noDriversTimeout);
      socketService.on('onDriverRequest', null);
      socketService.on('onRideAccepted', null);
    };
  }, []);
  
  // Calculate rough distance in miles (for display only)
  const calculateDistance = (driverLat, driverLon) => {
    if (!pickup?.coordinates || !driverLat || !driverLon) return '?';
    
    const R = 3958.8; // Earth's radius in miles
    const lat1 = pickup.coordinates.latitude * Math.PI / 180;
    const lat2 = driverLat * Math.PI / 180;
    const lon1 = pickup.coordinates.longitude * Math.PI / 180;
    const lon2 = driverLon * Math.PI / 180;
    
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.sin(dlat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance.toFixed(1);
  };
  
  // Function to request a ride via socket
  const requestRide = () => {
    if (socketService.connected) {
      console.log('Requesting ride with ID:', rideId);
      console.log('Pickup:', pickup);
      console.log('Destination:', destination);
      
      if (!pickup || !pickup.coordinates) {
        console.error('Pickup coordinates missing or invalid!');
        setLoading(false);
        Alert.alert(
          'Error',
          'Pickup location is missing or invalid. Please try again.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        return;
      }
      
      // Ensure coordinates are numbers
      const validatedPickup = {
        ...pickup,
        coordinates: {
          latitude: Number(pickup.coordinates.latitude),
          longitude: Number(pickup.coordinates.longitude)
        }
      };
      
      const validatedDestination = {
        ...destination,
        coordinates: {
          latitude: Number(destination.coordinates.latitude),
          longitude: Number(destination.coordinates.longitude)
        }
      };
      
      // Log the validated data
      console.log('Sending ride request with validated data:');
      console.log('Validated pickup:', validatedPickup);
      console.log('Validated destination:', validatedDestination);
      
      socketService.requestRide(rideId, validatedPickup, validatedDestination);
      console.log('Ride request sent with ID:', rideId);
    } else {
      // If socket is not connected, try to connect again
      const userId = '123456'; // In a real app, this would come from authentication
      socketService.initialize(userId);
      
      // Try again after a short delay
      setTimeout(() => {
        if (socketService.connected) {
          // Ensure coordinates are numbers
          const validatedPickup = {
            ...pickup,
            coordinates: {
              latitude: Number(pickup.coordinates.latitude),
              longitude: Number(pickup.coordinates.longitude)
            }
          };
          
          const validatedDestination = {
            ...destination,
            coordinates: {
              latitude: Number(destination.coordinates.latitude),
              longitude: Number(destination.coordinates.longitude)
            }
          };
          
          socketService.requestRide(rideId, validatedPickup, validatedDestination);
          console.log('Ride request sent with ID:', rideId);
        } else {
          setLoading(false);
          Alert.alert(
            'Connection Error',
            'Unable to connect to ride service. Please check your internet connection and try again.',
            [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]
          );
        }
      }, 1000);
    }
  };
  
  // Handle driver selection
  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver.id);
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedDriver) return;
    
    // Accept the selected driver through socket
    socketService.acceptDriverRequest(rideId, selectedDriver);
    
    // The navigation will be handled by the onRideAccepted event listener
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Cancel the ride request
    if (socketService.connected) {
      socketService.cancelRide(rideId);
    }
    
    navigation.goBack();
  };
  
  // Render each driver request
  const renderDriverItem = ({ item }) => {
    const isSelected = selectedDriver === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.driverCard, isSelected && styles.selectedDriverCard]}
        onPress={() => handleSelectDriver(item)}
      >
        <View style={styles.driverImageContainer}>
          <Ionicons name="person-circle" size={50} color="#ccc" />
        </View>
        
        <View style={styles.driverInfo}>
          <View style={styles.driverHeader}>
            <Text style={styles.driverName}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.carInfo}>{item.car} • {item.plate}</Text>
          
          <View style={styles.etaContainer}>
            <Text style={styles.etaText}>{item.distance} • {item.eta}</Text>
            <Text style={styles.fareText}>{item.priceDisplay}</Text>
          </View>
        </View>
        
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}
      </TouchableOpacity>
    );
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
          
          {/* Destination Marker */}
          {destination?.coordinates && (
            <Marker
              coordinate={destination.coordinates}
              title="Destination"
            >
              <View style={styles.destinationMarker}>
                <Ionicons name="flag" size={24} color="#FF3B30" />
              </View>
            </Marker>
          )}
          
          {/* Route line */}
          {pickup?.coordinates && destination?.coordinates && (
            <Polyline
              coordinates={[pickup.coordinates, destination.coordinates]}
              strokeWidth={3}
              strokeColor="#FFB800"
              lineDashPattern={[1]}
            />
          )}
        </MapView>
        
        {/* Content Container */}
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Driver Requests</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFB800" />
              <Text style={styles.loadingText}>Finding drivers near you...</Text>
            </View>
          ) : (
            <>
              {driverRequests.length > 0 ? (
                <>
                  <Text style={styles.driversTitle}>
                    {driverRequests.length} Drivers Available
                  </Text>
                  
                  <FlatList
                    data={driverRequests}
                    renderItem={renderDriverItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                  />
                  
                  <TouchableOpacity 
                    style={[
                      styles.confirmButton, 
                      !selectedDriver && styles.disabledButton
                    ]}
                    onPress={handleConfirmBooking}
                    disabled={!selectedDriver}
                  >
                    <Text style={styles.confirmButtonText}>
                      Confirm Driver
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.noDriversContainer}>
                  <Ionicons name="car" size={50} color="#ccc" />
                  <Text style={styles.noDriversText}>No drivers available</Text>
                  <Text style={styles.noDriversSubText}>
                    There are currently no drivers available in your area.
                    Please try again later.
                  </Text>
                  <TouchableOpacity 
                    style={styles.tryAgainButton}
                    onPress={() => {
                      setLoading(true);
                      requestRide();
                    }}
                  >
                    <Text style={styles.tryAgainButtonText}>Try Again</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
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
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
    maxHeight: '60%',
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  driversTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 10,
  },
  driverCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDriverCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#f0f7f0',
  },
  driverImageContainer: {
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  carInfo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  etaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 14,
    color: '#666',
  },
  fareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pickupMarker: {
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noDriversContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  noDriversText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  noDriversSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  tryAgainButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  tryAgainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default DriverRequestsScreen; 