import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PromoCodeScreen = ({ navigation, route }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);

  const promos = [
    {
      code: 'WELCOME200',
      description: 'Add items worth $2 more to unlock',
      discount: '50% OFF',
    },
    {
      code: 'CASHBACK12',
      description: 'Add items worth $2 more to unlock',
      discount: 'Up to $12.00 cashback',
    },
    {
      code: 'CASHBACK12',
      description: 'Add items worth $2 more to unlock',
      discount: 'Up to $12.00 cashback',
    },
    {
      code: 'CASHBACK12',
      description: 'Add items worth $2 more to unlock',
      discount: 'Up to $12.00 cashback',
    },
  ];

  const handleApplyCode = () => {
    // Implement promo code application logic
    setAppliedCode(promoCode);
  };

  const handleCopyCode = (code) => {
    setPromoCode(code);
  };

  const handleContinue = () => {
    navigation.navigate('BookRide', {
      ...route.params,
      promoCode: appliedCode
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
        <Text style={styles.headerTitle}>Promo</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Promo for you</Text>

        {/* Promo Cards */}
        {promos.map((promo, index) => (
          <View key={index} style={styles.promoCard}>
            <View style={styles.promoInfo}>
              <Text style={styles.promoCode}>{promo.code}</Text>
              <Text style={styles.promoDescription}>{promo.description}</Text>
              <View style={styles.discountContainer}>
                <Ionicons name="pricetag" size={16} color="#FFB800" />
                <Text style={styles.discountText}>{promo.discount}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => handleCopyCode(promo.code)}
            >
              <Text style={styles.copyButtonText}>COPY CODE</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Input Section */}
      <View style={styles.bottomSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Promo Code"
            value={promoCode}
            onChangeText={setPromoCode}
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={handleApplyCode}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  promoInfo: {
    marginBottom: 16,
  },
  promoCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 14,
    color: '#FFB800',
    marginLeft: 8,
  },
  copyButton: {
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 12,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#FFB800',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PromoCodeScreen; 