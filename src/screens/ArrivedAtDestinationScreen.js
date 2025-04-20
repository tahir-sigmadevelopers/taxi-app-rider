import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const ArrivedAtDestinationScreen = ({ navigation, route }) => {
  const { destination, amount } = route.params || {
    destination: '6391 Elgin St. Celina, Delawa...',
    amount: 12.5,
  };

  const handlePayCash = () => {
    navigation.navigate('PayCash', {
      destination,
      amount,
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
        <Text style={styles.headerTitle}>Active At Destination</Text>
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
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
          >
            <View style={styles.destinationMarker}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
          </Marker>
        </MapView>

        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={40} color="#000" />
          </View>
        </View>

        <Text style={styles.arrivalText}>Arrived At Destination</Text>
        <Text style={styles.destinationText}>{destination}</Text>

        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayCash}
        >
          <Text style={styles.payButtonText}>Pay Cash ${amount}</Text>
        </TouchableOpacity>
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
  destinationMarker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sosButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: '#FFB800',
    borderRadius: 30,
    padding: 12,
    paddingHorizontal: 24,
  },
  sosText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomContent: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  destinationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  payButton: {
    backgroundColor: '#FFB800',
    width: '100%',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArrivedAtDestinationScreen; 