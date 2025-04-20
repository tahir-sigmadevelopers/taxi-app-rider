import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const PaymentMethodsScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('cash');

  const paymentSections = [
    {
      title: 'Cash',
      items: [
        {
          id: 'cash',
          title: 'Cash',
          icon: 'cash-outline',
        },
      ],
    },
    {
      title: 'Loyalty Points',
      items: [
        {
          id: 'points',
          title: '200 Points',
          icon: 'medal-outline',
        },
      ],
    },
    {
      title: 'Wallet',
      items: [
        {
          id: 'wallet',
          title: 'Wallet',
          icon: 'wallet-outline',
        },
      ],
    },
    {
      title: 'Credit & Debit Card',
      items: [
        {
          id: 'add_card',
          title: 'Add Card',
          icon: 'card-outline',
          showArrow: true,
        },
      ],
    },
    {
      title: 'More Payment Options',
      items: [
        {
          id: 'paypal',
          title: 'Paypal',
          image: require('../../assets/paypal.png'),
        },
        {
          id: 'apple_pay',
          title: 'Apple Pay',
          image: require('../../assets/apple.png'),
        },
        {
          id: 'google_pay',
          title: 'Google Pay',
          image: require('../../assets/google.png'),
        },
      ],
    },
  ];

  const handleMethodSelect = (methodId) => {
    if (methodId === 'add_card') {
      // Navigate to add card screen
      navigation.navigate('AddCard');
    } else {
      setSelectedMethod(methodId);
      navigation.navigate('BookRide', { selectedPaymentMethod: methodId });
    }
  };

  return (
    <CustomSafeArea>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView style={styles.content}>
        {paymentSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.paymentItem}
                onPress={() => handleMethodSelect(item.id)}
              >
                <View style={styles.paymentItemLeft}>
                  {item.image ? (
                    <Image source={item.image} style={styles.paymentIcon} />
                  ) : (
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={24} color="#FFB800" />
                    </View>
                  )}
                  <Text style={styles.paymentItemTitle}>{item.title}</Text>
                </View>
                {item.showArrow ? (
                  <Ionicons name="chevron-forward" size={24} color="#FFB800" />
                ) : (
                  <View style={[
                    styles.radioButton,
                    selectedMethod === item.id && styles.radioButtonSelected
                  ]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.bookButtonText}>Book Mini</Text>
      </TouchableOpacity>
    </CustomSafeArea>
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
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  paymentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  paymentItemTitle: {
    fontSize: 16,
    color: '#000',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioButtonSelected: {
    borderColor: '#FFB800',
    backgroundColor: '#FFB800',
  },
  bookButton: {
    backgroundColor: '#FFB800',
    margin: 16,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentMethodsScreen; 