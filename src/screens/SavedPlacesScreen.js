import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedPlacesScreen = ({ navigation, route }) => {
  // Get the pickup location from route params or use a default
  const pickupLocation = route?.params?.pickupLocation || null;

  const savedPlaces = [
    '2972 Westheimer RD. San..',
    '2118 Thornridge Cir.Syra..',
    '6391 Elgin St. Celina, Dela..',
    '2118 Thornridge Cir.Syra..',
    '2118 Thornridge Cir. Da..',
    '6391 Elgin St. Celina, Dela..',
    '6392 Thornridge Cir.Syra..',
    '2118 Thornridge Cir.Syra..',
    '8531 Ranchview Dr. Ric..',
    '2118 Thornridge Cir.Syra..',
    '3521 W. Gray St. Utica, Pe..',
    '2972 Westheimer Rd. San..',
    '2118 Thornridge Cir.Syra..',
  ];

  const handleSelectPlace = (place) => {
    // Create a destination object from the selected place
    const destination = {
      id: Math.random().toString(),
      name: 'Saved Place',
      address: place
    };
    
    navigation.navigate('Destination', { 
      pickupLocation,
      selectedDestination: destination 
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
        <Text style={styles.headerTitle}>Saved Places</Text>
      </View>

      {/* Saved Places List */}
      <ScrollView style={styles.content}>
        {savedPlaces.map((place, index) => (
          <View key={index} style={styles.placeItem}>
            <TouchableOpacity 
              style={styles.placeButton}
              onPress={() => handleSelectPlace(place)}
            >
              <View style={[
                styles.placeIcon,
                index === 0 && { backgroundColor: '#FFB800' }
              ]}>
                <View style={styles.placeIconCircle} />
              </View>
              <Text style={styles.placeText}>{place}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="close" size={24} color="#FFB800" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  placeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  placeText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
});

export default SavedPlacesScreen; 