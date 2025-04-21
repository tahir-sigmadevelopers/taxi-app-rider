import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const ConfirmLocationScreen = ({ navigation, route }) => {
  const [estimatedTime, setEstimatedTime] = useState('15 min');
  const [estimatedDistance, setEstimatedDistance] = useState('5.2 km');
  const [estimatedFare, setEstimatedFare] = useState(15);
  const [fareRange, setFareRange] = useState('$12-15');
  const [loading, setLoading] = useState(false);
  const [rideOptions, setRideOptions] = useState([
    { id: 1, name: 'Economy', price: '$12', time: '15 min', iconName: 'car-sport-outline', selected: true, baseFare: 12 },
    { id: 2, name: 'Comfort', price: '$18', time: '15 min', iconName: 'car-outline', selected: false, baseFare: 18 },
    { id: 3, name: 'Premium', price: '$25', time: '15 min', iconName: 'car', selected: false, baseFare: 25 },
  ]);
  
  // Get pickup and destination from route params
  const pickup = route.params?.pickup;
  const destination = route.params?.destination;
  
  // Calculate a fake route between pickup and destination
  const routeCoordinates = [
    pickup?.coordinates,
    { 
      latitude: (pickup?.coordinates?.latitude + destination?.coordinates?.latitude) / 2,
      longitude: (pickup?.coordinates?.longitude + destination?.coordinates?.longitude) / 2 + 0.01 
    },
    destination?.coordinates
  ].filter(coord => coord); // Filter out any undefined coordinates
  
  // Handle ride option selection
  const handleSelectRideOption = (id) => {
    const updatedOptions = rideOptions.map(option => ({
      ...option,
      selected: option.id === id
    }));
    setRideOptions(updatedOptions);
    
    // Update estimated fare based on selection
    const selectedOption = rideOptions.find(option => option.id === id);
    if (selectedOption) {
      // Update both the numerical fare and the display string
      setEstimatedFare(selectedOption.baseFare);
      
      if (id === 1) setFareRange('$12-15');
      else if (id === 2) setFareRange('$18-22');
      else if (id === 3) setFareRange('$25-30');
    }
  };
  
  // Handle confirm booking
  const handleConfirmBooking = () => {
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setLoading(false);
      
      // Navigate to driver requests screen instead of driver arriving screen
      navigation.navigate('DriverRequestsScreen', {
        pickup,
        destination,
        fare: estimatedFare,
        fareRange: fareRange
      });
    }, 1500);
  };

  // Check if we have valid pickup and destination
  if (!pickup?.coordinates || !destination?.coordinates) {
    return (
      <CustomSafeArea forceInset={true}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#FFB800" />
          <Text style={styles.errorText}>Both pickup and destination locations are required</Text>
          <TouchableOpacity 
            style={styles.errorButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.errorButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </CustomSafeArea>
    );
  }

  return (
    <CustomSafeArea forceInset={true}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Ride</Text>
      </View>

      {/* Map with route */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pickup.coordinates.latitude,
            longitude: pickup.coordinates.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0221,
          }}
          showsUserLocation={true}
        >
          {/* Pickup Marker */}
          <Marker
            coordinate={pickup.coordinates}
            title={pickup.name || "Pickup"}
            description={pickup.address}
          >
            <View style={styles.pickupMarker}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
          </Marker>
          
          {/* Destination Marker */}
          <Marker
            coordinate={destination.coordinates}
            title={destination.name || "Destination"}
            description={destination.address}
          >
            <View style={styles.destinationMarker}>
              <Ionicons name="flag" size={24} color="#FF3B30" />
            </View>
          </Marker>
          
          {/* Route line */}
          {routeCoordinates.length > 1 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={3}
              strokeColor="#FFB800"
            />
          )}
        </MapView>
      </View>
      
      {/* Ride info and options */}
      <View style={styles.rideInfoContainer}>
        <View style={styles.locationDetails}>
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <Ionicons name="location" size={20} color="#FFB800" />
            </View>
            <Text style={styles.locationText} numberOfLines={1}>
              {pickup.name || pickup.address || 'Pickup location'}
            </Text>
          </View>
          
          <View style={styles.locationSeparator}>
            <View style={styles.dotLine} />
          </View>
          
          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <Ionicons name="flag" size={20} color="#FF3B30" />
            </View>
            <Text style={styles.locationText} numberOfLines={1}>
              {destination.name || destination.address || 'Destination'}
            </Text>
          </View>
        </View>
        
        <View style={styles.rideStatsContainer}>
          <View style={styles.rideStat}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.rideStatText}>{estimatedTime}</Text>
          </View>
          <View style={styles.rideStat}>
            <Ionicons name="navigate-outline" size={20} color="#666" />
            <Text style={styles.rideStatText}>{estimatedDistance}</Text>
          </View>
          <View style={styles.rideStat}>
            <Ionicons name="cash-outline" size={20} color="#666" />
            <Text style={styles.rideStatText}>{fareRange}</Text>
          </View>
        </View>
        
        {/* Ride options */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.rideOptionsScroll}
          contentContainerStyle={styles.rideOptionsContent}
        >
          {rideOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.rideOptionCard,
                option.selected && styles.rideOptionCardSelected
              ]}
              onPress={() => handleSelectRideOption(option.id)}
            >
              <View style={[
                styles.rideOptionIconContainer, 
                option.id === 3 && styles.premiumIconContainer,
                option.selected && styles.selectedIconContainer
              ]}>
                <Ionicons 
                  name={option.iconName} 
                  size={30} 
                  color={option.selected ? "#FFB800" : "#444"} 
                />
              </View>
              <Text style={styles.rideOptionName}>{option.name}</Text>
              <Text style={styles.rideOptionPrice}>{option.price}</Text>
              <Text style={styles.rideOptionTime}>{option.time}</Text>
              
              {option.selected && (
                <View style={styles.selectedCheck}>
                  <Ionicons name="checkmark-circle" size={24} color="#FFB800" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Payment method and promo code */}
        <View style={styles.paymentRow}>
          <TouchableOpacity 
            style={styles.paymentOption}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <Ionicons name="card-outline" size={20} color="#333" />
            <Text style={styles.paymentOptionText}>Cash</Text>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.promoOption}
            onPress={() => navigation.navigate('PromoCode')}
          >
            <Ionicons name="pricetag-outline" size={20} color="#333" />
            <Text style={styles.promoOptionText}>Promo Code</Text>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </TouchableOpacity>
        </View>
        
        {/* Confirm button */}
        <TouchableOpacity
          style={[styles.confirmButton, loading && styles.disabledButton]}
          onPress={handleConfirmBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Book Ride</Text>
          )}
        </TouchableOpacity>
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  mapContainer: {
    height: 200,
    width: '100%',
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
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
  rideInfoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  locationDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  locationIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  locationSeparator: {
    marginLeft: 16,
    marginVertical: 4,
    height: 20,
    alignItems: 'center',
  },
  dotLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#ddd',
  },
  rideStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  rideStatText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  rideOptionsScroll: {
    marginBottom: 16,
  },
  rideOptionsContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  rideOptionCard: {
    width: 100,
    height: 110,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  rideOptionCardSelected: {
    borderWidth: 2,
    borderColor: '#FFB800',
    backgroundColor: '#FFF9E6',
  },
  rideOptionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumIconContainer: {
    backgroundColor: '#e0e0e0',
  },
  selectedIconContainer: {
    backgroundColor: '#FFF9E6',
  },
  rideOptionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  rideOptionPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rideOptionTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  selectedCheck: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  paymentOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  paymentOptionText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  promoOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  promoOptionText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  errorButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  errorButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ConfirmLocationScreen; 