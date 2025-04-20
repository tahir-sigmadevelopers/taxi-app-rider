import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';

const DriverArrivingScreen = ({ navigation, route }) => {
  const { driver, fare } = route.params || {
    driver: {
      name: 'Jenny Wilson',
      vehicle: 'Sedan',
      carNumber: 'GR 678-UVWX',
      seats: 4,
      rate: 1.25,
      image: require('../../assets/driver-profile.png'),
    },
    fare: 10.00,
  };

  const handleArriveAtDestination = () => {
    // Navigate to the ArrivedAtDestinationScreen with the necessary data
    navigation.navigate('ArrivedAtDestinationScreen', {
      destination: '6391 Elgin St. Celina, Delaware',
      amount: fare,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Arriving</Text>
      </View>

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
          {/* Driver Marker */}
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
          >
            <View style={styles.carMarker}>
              <Ionicons name="car" size={20} color="#000" />
            </View>
          </Marker>

          {/* User Marker */}
          <Marker
            coordinate={{
              latitude: 37.78925,
              longitude: -122.4324,
            }}
          >
            <Image
              source={driver?.image}
              style={styles.userMarker}
            />
          </Marker>

          {/* Route Line */}
          <Polyline
            coordinates={[
              { latitude: 37.78825, longitude: -122.4324 },
              { latitude: 37.78925, longitude: -122.4324 },
            ]}
            strokeColor="#FFB800"
            strokeWidth={3}
          />
        </MapView>

        <View style={styles.fareInfo}>
          <Ionicons name="information-circle" size={20} color="#FFB800" />
          <Text style={styles.fareText}>
            ${fare?.toFixed(2)} are your estimated fares for your ride
          </Text>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.driverInfo}>
          <Text style={styles.arrivalStatus}>Driver is Arriving...</Text>
          <Text style={styles.timeAway}>5 min Away</Text>
        </View>

        <View style={styles.driverDetails}>
          <View style={styles.driverProfile}>
            <Image source={driver.image} style={styles.driverImage} />
            <View style={styles.driverTextInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.vehicleType}>{driver.vehicle}</Text>
            </View>
          </View>
          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#FFB800" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="call" size={24} color="#FFB800" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rideInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Rate per</Text>
            <Text style={styles.infoValue}>${driver.rate}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Car Number</Text>
            <Text style={styles.infoValue}>{driver.carNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>No. of Seats</Text>
            <Text style={styles.infoValue}>{driver.seats} Seats</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel Ride</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.arriveButton}
            onPress={handleArriveAtDestination}
          >
            <Text style={styles.arriveButtonText}>Simulate Arrival</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  carMarker: {
    backgroundColor: '#FFB800',
    padding: 8,
    borderRadius: 20,
  },
  userMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFB800',
  },
  fareInfo: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  fareText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrivalStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  timeAway: {
    fontSize: 16,
    color: '#666',
  },
  driverDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  driverTextInfo: {
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
  },
  contactButtons: {
    flexDirection: 'row',
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 30,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arriveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 30,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  arriveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverArrivingScreen; 