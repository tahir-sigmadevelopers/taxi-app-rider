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

const PreBookedRidesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('07');
  
  const weekDays = [
    { id: 'sun', label: 'S' },
    { id: 'mon', label: 'M' },
    { id: 'tue', label: 'T' },
    { id: 'wed', label: 'W' },
    { id: 'thu', label: 'T' },
    { id: 'fri', label: 'F' },
    { id: 'sat', label: 'S' },
  ];
  const dates = [
    ['01', '02', '03'],
    ['04', '05', '06', '07', '08', '09', '10'],
  ];

  const rides = [
    {
      id: '1',
      driver: {
        name: 'Robert Fox',
        image: require('../../assets/driver1.png'),
        rating: 5.0,
        vehicle: 'MPV (5 Seater)',
      },
      distance: '4.5 Mile',
      duration: '4 Mins',
      price: '$1.25',
      date: 'Oct 18,2023',
      time: '08:00 AM',
      pickup: '6391 Westheimer RD. San..',
      dropoff: '1901 Thoridgr Cir Sh..',
      carNumber: 'GR 678-UVUX',
      seats: '05',
    },
    {
      id: '2',
      driver: {
        name: 'Jenny Wilson',
        image: require('../../assets/profile-image.png'),
        rating: 5.0,
        vehicle: 'Sedan (4 Seater)',
      },
      distance: '4.5 Mile',
      duration: '4 Mins',
      price: '$1.25',
      date: 'Oct 18,2023',
      time: '10:00 AM',
      pickup: '6391 Westheimer RD. San..',
      dropoff: '1901 Thoridgr Cir Sh..',
      carNumber: 'GR 678-UVUX',
      seats: '04',
    },
  ];

  const renderDateCell = (date) => (
    <TouchableOpacity
      key={date}
      style={[
        styles.dateCell,
        selectedDate === date && styles.selectedDateCell,
      ]}
      onPress={() => setSelectedDate(date)}
    >
      <Text
        style={[
          styles.dateText,
          selectedDate === date && styles.selectedDateText,
        ]}
      >
        {date}
      </Text>
    </TouchableOpacity>
  );

  const renderRideCard = (ride) => (
    <View key={ride.id} style={styles.rideCard}>
      <View style={styles.driverInfo}>
        <Image source={ride.driver.image} style={styles.driverImage} />
        <View style={styles.driverDetails}>
          <View style={styles.driverNameRow}>
            <Text style={styles.driverName}>{ride.driver.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingText}>{ride.driver.rating}</Text>
            </View>
          </View>
          <Text style={styles.vehicleType}>{ride.driver.vehicle}</Text>
        </View>
      </View>

      <View style={styles.rideStats}>
        <View style={styles.statItem}>
          <Ionicons name="location" size={20} color="#FFB800" />
          <Text style={styles.statText}>{ride.distance}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={20} color="#FFB800" />
          <Text style={styles.statText}>{ride.duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="wallet-outline" size={20} color="#FFB800" />
          <Text style={styles.statText}>{ride.price}<Text style={styles.perMile}>/mile</Text></Text>
        </View>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date & Time</Text>
          <Text style={styles.detailValue}>{ride.date} | {ride.time}</Text>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.locationDot} />
          <View style={styles.locationLine} />
          <View style={[styles.locationDot, styles.destinationDot]} />
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{ride.pickup}</Text>
            <Text style={styles.address}>{ride.dropoff}</Text>
          </View>
        </View>

        <View style={styles.carDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Car Number</Text>
            <Text style={styles.detailValue}>{ride.carNumber}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>No. of Seats</Text>
            <Text style={styles.detailValue}>{ride.seats}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonCircle}>
            <Ionicons name="close" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonCircle}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonCircle}>
            <Ionicons name="call-outline" size={24} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>Pre-Booked Rides</Text>
      </View>

      <View style={styles.calendar}>
        <View style={styles.weekDays}>
          {weekDays.map((day) => (
            <Text key={day.id} style={styles.weekDayText}>
              {day.label}
            </Text>
          ))}
        </View>
        {dates.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.weekRow}>
            {week.map((date) => renderDateCell(date))}
          </View>
        ))}
      </View>

      <ScrollView style={styles.ridesContainer}>
        {rides.map((ride) => renderRideCard(ride))}
      </ScrollView>
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
    borderBottomColor: '#f0f0f0',
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
    flex: 1,
    textAlign: 'center',
    marginRight: 56,
  },
  calendar: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDayText: {
    fontSize: 16,
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dateCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedDateCell: {
    backgroundColor: '#FFB800',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
  },
  ridesContainer: {
    flex: 1,
    padding: 16,
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
  driverNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
  },
  rideStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
  },
  perMile: {
    color: '#666',
    fontSize: 12,
  },
  rideDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginTop: 5,
  },
  locationLine: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
    marginLeft: 4,
    marginVertical: 4,
  },
  destinationDot: {
    backgroundColor: '#FFB800',
    position: 'absolute',
    left: 0,
    top: 40,
  },
  addressContainer: {
    flex: 1,
    marginLeft: 16,
  },
  address: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
  carDetails: {
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    marginHorizontal: 16,
  },
  actionButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreBookedRidesScreen; 