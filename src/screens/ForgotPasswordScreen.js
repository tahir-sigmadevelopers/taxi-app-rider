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
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { resetPassword } from '../config/firebase';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      const { error } = await resetPassword(email);
      
      if (error) {
        setErrorMessage(error);
      } else {
        setSuccessMessage('Password reset email sent. Please check your inbox.');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Forgot Password</Text>
          </View>

          <View style={styles.logoContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-open-outline" size={80} color="#FFB800" />
            </View>
          </View>

          <Text style={styles.description}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage('');
                setSuccessMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}

            {successMessage ? (
              <Text style={styles.successMessage}>{successMessage}</Text>
            ) : null}

            <TouchableOpacity 
              style={[styles.resetButton, isLoading && styles.disabledButton]} 
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backToSignInButton} 
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.backToSignInText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 30,
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
    fontSize: 16,
    marginBottom: 20,
  },
  errorMessage: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 20,
  },
  successMessage: {
    color: '#34C759',
    fontSize: 14,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#FFB800',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#FFD980',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToSignInButton: {
    alignItems: 'center',
    padding: 15,
  },
  backToSignInText: {
    color: '#FFB800',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen; 