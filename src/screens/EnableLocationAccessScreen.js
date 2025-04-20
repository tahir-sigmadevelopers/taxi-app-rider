import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EnableLocationAccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Location Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="location" size={40} color="#FFB800" />
        </View>
      </View>

      <Text style={styles.title}>Enable Location Access</Text>
      <Text style={styles.subtitle}>
        To ensure a seamless and efficient experience, allow us access to your location.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.allowButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.allowButtonText}>Allow Location Access</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.maybeLaterText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF9E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  allowButton: {
    backgroundColor: '#FFB800',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  allowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  maybeLaterText: {
    color: '#FFB800',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EnableLocationAccessScreen; 