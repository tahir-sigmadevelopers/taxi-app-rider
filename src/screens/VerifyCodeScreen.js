import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';

const VerifyCodeScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [];

  // Start countdown timer for resend code
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setError('');

    // Move to next input if there's a value and next input exists
    if (text && index < 3) {
      inputRefs[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 4) {
      setError('Please enter all 4 digits');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your actual verification API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      
      // Successful verification
      navigation.navigate('CompleteProfile');
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setLoading(true);
    try {
      // TODO: Replace with your actual resend code API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      // Reset timer and states
      setTimer(30);
      setCanResend(false);
      setCode(['', '', '', '']);
      inputRefs[0]?.focus();
      Alert.alert('Success', 'Verification code has been resent');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        Please enter the code we just sent to email{'\n'}
        <Text style={styles.email}>example@email.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs[index] = ref)}
            style={[
              styles.codeInput,
              error && !code[index] && styles.errorInput
            ]}
            maxLength={1}
            keyboardType="numeric"
            value={code[index]}
            onChangeText={(text) => handleCodeChange(text, index)}
            editable={!loading}
          />
        ))}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      <TouchableOpacity 
        style={styles.resendContainer} 
        onPress={handleResendCode}
        disabled={!canResend || loading}
      >
        <Text style={styles.resendText}>Didn't receive OTP?</Text>
        <Text style={[
          styles.resendLink,
          (!canResend || loading) && styles.resendDisabled
        ]}>
          {canResend ? 'Resend code' : `Resend code in ${timer}s`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          styles.verifyButton,
          loading && styles.verifyButtonDisabled
        ]}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  email: {
    color: '#FFB800',
    fontWeight: '500',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: '#666',
    fontSize: 16,
    marginBottom: 8,
  },
  resendLink: {
    color: '#666',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  resendDisabled: {
    color: '#999',
  },
  verifyButton: {
    backgroundColor: '#FFB800',
    borderRadius: 30,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  verifyButtonDisabled: {
    backgroundColor: '#FFB800AA',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyCodeScreen; 