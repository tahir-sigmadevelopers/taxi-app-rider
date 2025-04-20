import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';
import * as ImagePicker from 'expo-image-picker';
import userService from '../services/userService';
import { auth } from '../config/firebase';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(require('../../assets/profile-image.png'));
  const [isCustomImage, setIsCustomImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      console.log('Fetching user profile...', auth.currentUser);
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        const response = await userService.getUserByFirebaseUid(currentUser.uid);
        
        if (response.success) {
          const userData = response.data;
          setName(userData.name || '');
          setEmail(userData.email || '');
          setPhoneNumber(userData.phoneNumber || '');
          setGender(userData.gender || '');
          
          if (userData.profileImage) {
            setProfileImage({ uri: userData.profileImage });
            setIsCustomImage(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrorMessage('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      // Request permission
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to allow access to your photos to upload a profile picture.");
        return;
      }

      // Launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
        setIsCustomImage(true);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const takePhoto = async () => {
    try {
      // Request camera permission
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to allow access to your camera to take a profile photo.");
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
        setIsCustomImage(true);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  // Update user profile
  const handleUpdateProfile = async () => {
    try {
      if (!name || !phoneNumber || !email || !gender) {
        setErrorMessage('Please fill in all required fields');
        return;
      }

      setUpdating(true);
      setErrorMessage('');
      
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setErrorMessage('You must be logged in to update your profile');
        setUpdating(false);
        return;
      }
      
      // Prepare user data to update
      const userData = {
        name,
        email,
        phoneNumber,
        gender,
      };
      
      // Only include profile image if it's a custom image, not the default one
      if (isCustomImage && profileImage.uri) {
        userData.profileImage = profileImage.uri;
      }
      
      // Call API to update user profile
      const response = await userService.updateUserProfile(currentUser.uid, userData);
      
      if (response.success) {
        Alert.alert(
          'Success',
          'Profile updated successfully',
          [{ text: 'OK', onPress: () => navigation.navigate('Profile') }]
        );
      } else {
        setErrorMessage(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message || 'An error occurred while updating your profile');
    } finally {
      setUpdating(false);
    }
  };

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
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFB800" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.profileImageSection}>
              <TouchableOpacity 
                style={styles.profileImageContainer} 
                onPress={pickImage}
              >
                <Image
                  source={isCustomImage ? { uri: profileImage.uri } : profileImage}
                  style={styles.profileImage}
                />
                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={18} color="#FFF" />
                </View>
              </TouchableOpacity>
              <View style={styles.photoOptions}>
                <TouchableOpacity 
                  style={styles.photoOptionButton} 
                  onPress={pickImage}
                >
                  <Ionicons name="image-outline" size={18} color="#333" />
                  <Text style={styles.photoOptionText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.photoOptionButton} 
                  onPress={takePhoto}
                >
                  <Ionicons name="camera-outline" size={18} color="#333" />
                  <Text style={styles.photoOptionText}>Camera</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formContainer}>
              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="Enter your phone number"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'Male' && styles.selectedGenderButton,
                    ]}
                    onPress={() => setGender('Male')}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        gender === 'Male' && styles.selectedGenderButtonText,
                      ]}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'Female' && styles.selectedGenderButton,
                    ]}
                    onPress={() => setGender('Female')}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        gender === 'Female' && styles.selectedGenderButtonText,
                      ]}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      gender === 'Other' && styles.selectedGenderButton,
                    ]}
                    onPress={() => setGender('Other')}
                  >
                    <Text
                      style={[
                        styles.genderButtonText,
                        gender === 'Other' && styles.selectedGenderButtonText,
                      ]}
                    >
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[styles.updateButton, updating && styles.disabledButton]} 
            onPress={handleUpdateProfile}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Update</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFB800',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  photoOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  photoOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
  },
  photoOptionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#666',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedGenderButton: {
    borderColor: '#FFB800',
    backgroundColor: '#FFB800',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#666',
  },
  selectedGenderButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 16,
  },
  disabledButton: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen; 