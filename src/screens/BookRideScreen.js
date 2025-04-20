import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';

const BookRideScreen = ({ navigation, route }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('cash');

  const vehicles = [
    {
      id: '1',
      type: 'Mini',
      price: '$5.50',
      time: '2 min',
      seats: 4,
      icon: 'car-sport-outline'
    },
    {
      id: '2',
      type: 'Premier',
      price: '$8.50',
      time: '3 min',
      seats: 4,
      icon: 'car-outline'
    },
    {
      id: '3',
      type: 'XL',
      price: '$12.50',
      time: '5 min',
      seats: 6,
      icon: 'car-estate-outline'
    }
  ];

  const handleScheduleRide = () => {
    navigation.navigate('ScheduleRide');
  };

  const handleRideSharing = () => {
    navigation.navigate('RideSharing');
  };

  const handlePaymentMethod = () => {
    navigation.navigate('PaymentMethods');
  };

  const handlePromoCode = () => {
    navigation.navigate('PromoCode');
  };

  const handleBookNow = () => {
    // Get the selected vehicle details
    const vehicle = vehicles.find(v => v.id === selectedVehicle);
    
    // Navigate to the DriverArrivingScreen with ride details
    navigation.navigate('DriverArrivingScreen', {
      driver: {
        name: 'Jenny Wilson',
        vehicle: vehicle ? vehicle.type : 'Sedan',
        carNumber: 'GR 678-UVWX',
        seats: vehicle ? vehicle.seats : 4,
        rate: parseFloat(vehicle ? vehicle.price.replace('$', '') : '5.50'),
        image: require('../../assets/driver-profile.png'),
      },
      fare: parseFloat(vehicle ? vehicle.price.replace('$', '') : '5.50'),
      // Add any other ride details you want to pass
    });
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
        <Text style={styles.headerTitle}>Book Ride</Text>
        <TouchableOpacity 
          style={styles.scheduleButton}
          onPress={handleScheduleRide}
        >
          <Text style={styles.scheduleButtonText}>Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Add markers and route line here */}
        </MapView>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <ScrollView>
          {/* Vehicle Options */}
          <Text style={styles.sectionTitle}>Select Vehicle Type</Text>
          {vehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleOption,
                selectedVehicle === vehicle.id && styles.selectedVehicle,
              ]}
              onPress={() => setSelectedVehicle(vehicle.id)}
            >
              <View style={styles.vehicleInfo}>
                <Ionicons name={vehicle.icon} size={32} color="#FFB800" />
                <View style={styles.vehicleDetails}>
                  <Text style={styles.vehicleType}>{vehicle.type}</Text>
                  <Text style={styles.vehicleTime}>{vehicle.time}</Text>
                </View>
              </View>
              <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
            </TouchableOpacity>
          ))}

          {/* Additional Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.option}
              onPress={handleRideSharing}
            >
              <Ionicons name="people-outline" size={24} color="#FFB800" />
              <Text style={styles.optionText}>Share Ride</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option}
              onPress={handlePaymentMethod}
            >
              <Ionicons name="cash-outline" size={24} color="#FFB800" />
              <Text style={styles.optionText}>Cash</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.option}
              onPress={handlePromoCode}
            >
              <Ionicons name="pricetag-outline" size={24} color="#FFB800" />
              <Text style={styles.optionText}>Promo Code</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Book Button */}
          <TouchableOpacity 
            style={[
              styles.bookButton,
              !selectedVehicle && styles.disabledButton
            ]}
            disabled={!selectedVehicle}
            onPress={handleBookNow}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    justifyContent: 'space-between',
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
  scheduleButton: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scheduleButtonText: {
    color: '#FFB800',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    maxHeight: '60%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vehicleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedVehicle: {
    borderColor: '#FFB800',
    backgroundColor: '#FFF9E6',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vehicleDetails: {
    marginLeft: 12,
  },
  vehicleType: {
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleTime: {
    fontSize: 14,
    color: '#666',
  },
  vehiclePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  bookButton: {
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#FFD980',
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookRideScreen; 