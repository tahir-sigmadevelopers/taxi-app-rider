import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/firebase';

const CompleteProfileScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [profileImage, setProfileImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const genderOptions = [
    { id: '1', label: 'Male' },
    { id: '2', label: 'Female' },
  ];

  const handleSelectGender = (selectedGender) => {
    setGender(selectedGender.label);
    setShowGenderModal(false);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setLocalImage(result.assets[0].uri);
        // In a real app, you would upload the image to Firebase here
        setIsLoading(true);
        setErrorMessage('');
        
        try {
          // Using the improved mock storage
          const storageRef = storage.ref(`profile_images/user-profile.jpg`);
          await storageRef.putFile(result.assets[0].uri);
          const imageUrl = await storageRef.getDownloadURL();
          setProfileImage(imageUrl);
          setIsLoading(false);
        } catch (error) {
          console.error('Error uploading image:', error);
          setErrorMessage('Failed to upload image. Please try again.');
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setErrorMessage('Failed to pick image. Please try again.');
    }
  };

  const handleCompleteProfile = () => {
    if (!phoneNumber) {
      setErrorMessage('Please enter your phone number');
      return;
    }

    if (!gender) {
      setErrorMessage('Please select your gender');
      return;
    }

    setErrorMessage('');
    // In a real app, you would save the profile data to your backend here
    // For now, we'll just navigate to the next screen
    navigation.navigate('EnableLocationAccess');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profileImageWrapper} onPress={pickImage} disabled={isLoading}>
          {localImage ? (
            <Image source={{ uri: localImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Ionicons name="person" size={40} color="#ccc" />
            </View>
          )}
          {isLoading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="small" color="#FFB800" />
            </View>
          ) : (
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload Profile Picture</Text>
      </View>

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>+{callingCode}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setErrorMessage('');
            }}
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <TouchableOpacity
          style={styles.genderSelector}
          onPress={() => setShowGenderModal(true)}
        >
          <Text style={gender ? styles.genderText : styles.genderPlaceholder}>
            {gender || 'Select your gender'}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.continueButton, isLoading && styles.disabledButton]}
        onPress={handleCompleteProfile}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={showGenderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={genderOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.genderOption}
                  onPress={() => handleSelectGender(item)}
                >
                  <Text style={styles.genderOptionText}>{item.label}</Text>
                  {gender === item.label && (
                    <Ionicons name="checkmark" size={20} color="#FFB800" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFB800',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  errorMessage: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  genderSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  genderPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  continueButton: {
    backgroundColor: '#FFB800',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFD980',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genderOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  genderOptionText: {
    fontSize: 16,
  },
});

export default CompleteProfileScreen;
