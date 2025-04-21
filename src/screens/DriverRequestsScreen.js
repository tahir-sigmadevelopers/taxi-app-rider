import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import CustomSafeArea from '../components/CustomSafeArea';

const DriverRequestsScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [driverRequests, setDriverRequests] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  
  // Get parameters from route
  const pickup = route.params?.pickup;
  const destination = route.params?.destination;
  const fare = route.params?.fare; // Numeric fare value
  const fareDisplay = route.params?.fareRange || `$${fare?.toFixed(2)}`; // Use fareRange if available
  
  // Mock driver data (in a real app, this would come from backend API)
  const mockDrivers = [
    {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      car: 'Toyota Camry',
      plate: 'ABC 123',
      eta: '3 min',
      distance: '0.8 mi away',
      price: fare,
      priceDisplay: fareDisplay,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rating: 4.9,
      car: 'Honda Civic',
      plate: 'XYZ 456',
      eta: '5 min',
      distance: '1.2 mi away',
      price: fare * 0.95, // Slightly cheaper
      priceDisplay: `$${(fare * 0.95).toFixed(2)}`,
    },
    {
      id: '3',
      name: 'Michael Davis',
      rating: 4.7,
      car: 'Nissan Altima',
      plate: 'DEF 789',
      eta: '6 min',
      distance: '1.5 mi away',
      price: fare * 0.9, // Even cheaper
      priceDisplay: `$${(fare * 0.9).toFixed(2)}`,
    },
  ];
  
  // Simulate receiving driver requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverRequests(mockDrivers);
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle driver selection
  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver.id);
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedDriver) return;
    
    const driver = driverRequests.find(d => d.id === selectedDriver);
    
    // Navigate to driver arriving screen with selected driver
    navigation.navigate('DriverArrivingScreen', {
      pickup,
      destination,
      fare: driver.price,
      fareRange: driver.priceDisplay,
      driver: {
        name: driver.name,
        rating: driver.rating,
        car: driver.car,
        plate: driver.plate,
        eta: driver.eta
      }
    });
  };
  
  // Handle cancel
  const handleCancel = () => {
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
});

export default DriverRequestsScreen; 