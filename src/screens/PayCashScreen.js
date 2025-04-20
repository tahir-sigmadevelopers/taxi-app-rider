import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PayCashScreen = ({ navigation, route }) => {
  const { 
    pickupLocation = '6391 Elgin St. Celina, Delawa...',
    dropoffLocation = '1901 Thoridgr Cir Sh..',
    distance = '16 miles',
    otp = '7854',
    driver = {
      name: 'Jenny Wilson',
      vehicle: 'Sedan (4 Seater)',
      image: require('../../assets/driver-profile.png'),
    },
    amount = 12.5,
  } = route.params || {};

  const handleCashPaid = () => {
    // Handle cash payment confirmation
    navigation.navigate('RideComplete');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Cash</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.walletIcon}>
          <Ionicons name="wallet-outline" size={40} color="#FFB800" />
        </View>

        <Text style={styles.title}>Pay Cash</Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: '#000' }]} />
            <Text style={styles.locationText}>{pickupLocation}</Text>
            <Text style={styles.distanceText}>{distance}</Text>
          </View>

          <View style={styles.locationDivider} />

          <View style={styles.locationItem}>
            <View style={[styles.locationDot, { backgroundColor: '#FFB800' }]} />
            <Text style={styles.locationText}>{dropoffLocation}</Text>
          </View>
        </View>

        <View style={styles.otpContainer}>
          <Text style={styles.otpText}>OTP - {otp}</Text>
        </View>

        <View style={styles.driverInfo}>
          <Image source={driver.image} style={styles.driverImage} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.vehicleType}>{driver.vehicle}</Text>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount</Text>
          <Text style={styles.amountValue}>${amount}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleCashPaid}
      >
        <Text style={styles.confirmButtonText}>Cash Paid</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  walletIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  locationContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  locationDivider: {
    height: 20,
    width: 1,
    backgroundColor: '#ddd',
    marginLeft: 5,
  },
  otpContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  otpText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  amountContainer: {
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    color: '#000',
  },
  amountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    margin: 16,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PayCashScreen; 