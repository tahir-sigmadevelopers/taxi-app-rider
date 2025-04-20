import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RideCompleteScreen = ({ navigation, route }) => {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const { 
    driver = {
      name: 'Jenny Wilson',
      vehicle: 'Sedan (4 Seater)',
      image: require('../../assets/driver-profile.png'),
    },
    amount = 12.5,
  } = route.params || {};

  const handleSubmitRating = () => {
    // Handle rating submission
    navigation.navigate('Home');
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starContainer}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={32}
            color="#FFB800"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.checkIcon}>
          <Ionicons name="checkmark-circle" size={60} color="#FFB800" />
        </View>

        <Text style={styles.title}>Ride Complete</Text>
        <Text style={styles.subtitle}>Thanks for riding with us!</Text>

        <View style={styles.fareContainer}>
          <Text style={styles.fareLabel}>Total Fare</Text>
          <Text style={styles.fareAmount}>${amount}</Text>
        </View>

        <View style={styles.driverInfo}>
          <Image source={driver.image} style={styles.driverImage} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.vehicleType}>{driver.vehicle}</Text>
          </View>
        </View>

        <Text style={styles.ratingTitle}>Rate your trip</Text>
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>

        <TextInput
          style={styles.feedbackInput}
          placeholder="Additional comments..."
          value={feedback}
          onChangeText={setFeedback}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmitRating}
        >
          <Text style={styles.submitButtonText}>Submit Rating</Text>
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
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  checkIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  fareContainer: {
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  fareLabel: {
    fontSize: 16,
    color: '#000',
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  driverDetails: {
    flex: 1,
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
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  starContainer: {
    marginHorizontal: 4,
  },
  feedbackInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FFB800',
    width: '100%',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideCompleteScreen; 