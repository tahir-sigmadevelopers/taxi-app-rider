import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { registerWithEmailAndPassword } from '../config/firebase';
import userService from '../services/userService';
import * as ImagePicker from 'expo-image-picker';

// Custom SafeAreaView wrapper component
const CustomSafeArea = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.safeAreaContent}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const showMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Message', message);
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
        setProfileImage(result.assets[0].uri);
        setErrorMessage('');
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
        setProfileImage(result.assets[0].uri);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !phoneNumber || !gender) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!profileImage) {
      setErrorMessage('Please upload a profile picture');
      return;
    }

    if (!isChecked) {
      setErrorMessage('Please agree to the Terms and Conditions');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const { user, error } = await registerWithEmailAndPassword(email, password, name);
      
      if (error) {
        setErrorMessage(error);
        setIsLoading(false);
        return;
      }

      if (user) {
        // Save additional user data to your backend
        try {
          console.log(user);
          
          // Prepare the user data to be sent to the API
          const userData = {
            name,
            email,
            phoneNumber,
            gender,
            profileImage
          };
          
          // Only add firebaseUid if it exists
          if (user.uid) {
            userData.firebaseUid = user.uid;
          }
          
          // Call the API to save the user data
          const response = await userService.saveUserData(userData);
          
          if (response.success) {
            console.log('User data saved to API:', response.data);
          } else {
            console.error('API Error:', response.message);
          }
          
          // Successfully registered and data saved
          navigation.navigate('EnableLocationAccess');
        } catch (dataError) {
          console.error('Error saving additional user data:', dataError);
          
          // Still navigate to next screen even if API save fails
          // Firebase user is created, but backend data might be incomplete
          showMessage('Account created, but some profile data could not be saved');
          navigation.navigate('EnableLocationAccess');
        }
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomSafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <TouchableOpacity 
              style={styles.profileImageContainer} 
              onPress={pickImage}
            >
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Ionicons name="person" size={40} color="#ccc" />
                </View>
              )}
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
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrorMessage('');
              }}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setErrorMessage('');
              }}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[styles.genderButton, gender === 'Male' && styles.genderButtonSelected]}
                onPress={() => setGender('Male')}
              >
                <Text style={[styles.genderButtonText, gender === 'Male' && styles.genderButtonTextSelected]}>
                  Male
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.genderButton, gender === 'Female' && styles.genderButtonSelected]}
                onPress={() => setGender('Female')}
              >
                <Text style={[styles.genderButtonText, gender === 'Female' && styles.genderButtonTextSelected]}>
                  Female
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.genderButton, gender === 'Other' && styles.genderButtonSelected]}
                onPress={() => setGender('Other')}
              >
                <Text style={[styles.genderButtonText, gender === 'Other' && styles.genderButtonTextSelected]}>
                  Other
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage('');
                }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                onPress={() => setIsChecked(!isChecked)}
              >
                {isChecked && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                I agree to the{' '}
                <Text style={styles.link}>Terms and Conditions</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.signUpButton, isLoading && styles.disabledButton]} 
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.signUpButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or Sign up with</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaContent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 10 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
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
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  genderButtonSelected: {
    backgroundColor: '#FFF9D9',
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  genderButtonText: {
    fontSize: 16,
    color: '#666',
  },
  genderButtonTextSelected: {
    color: '#000',
    fontWeight: '500',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFB800',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFB800',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#FFB800',
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#FFB800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  signInText: {
    fontSize: 16,
    color: '#FFB800',
    fontWeight: 'bold',
  },
});

// Export both the screen and the CustomSafeArea for reuse in other screens
export { CustomSafeArea };
export default SignUpScreen; 