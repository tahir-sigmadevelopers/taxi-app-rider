import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';

const ScheduleRideScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState('00');
  const [selectedTime, setSelectedTime] = useState({ hour: '00', period: 'PM' });

  const dates = [
    { day: 'Fri', date: '16', month: 'Feb' },
    { day: 'Sat', date: '17', month: 'Feb' },
    { day: 'Mon', date: '19', month: 'Feb' },
    { day: 'Tue', date: '20', month: 'Feb' },
    { day: 'Wed', date: '21', month: 'Feb' },
  ];

  const times = Array.from({ length: 24 }, (_, i) => ({
    hour: i.toString().padStart(2, '0'),
    period: i < 12 ? 'AM' : 'PM'
  }));

  const handleConfirm = () => {
    navigation.navigate('RideSharing', {
      ...route.params,
      scheduledDate: selectedDate,
      scheduledTime: selectedTime
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
        <Text style={styles.headerTitle}>Book Ride</Text>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Add markers and route line here */}
      </MapView>

      {/* Schedule Section */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleTitle}>Schedule Ride</Text>
        
        {/* Date Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dates.map((item) => (
            <TouchableOpacity
              key={item.date}
              style={[
                styles.dateItem,
                selectedDate === item.date && styles.selectedDateItem
              ]}
              onPress={() => setSelectedDate(item.date)}
            >
              <Text style={[
                styles.dayText,
                selectedDate === item.date && styles.selectedText
              ]}>
                {item.day}
              </Text>
              <Text style={[
                styles.dateText,
                selectedDate === item.date && styles.selectedText
              ]}>
                {item.date}
              </Text>
              <Text style={[
                styles.monthText,
                selectedDate === item.date && styles.selectedText
              ]}>
                {item.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Selection */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.timeScroll}
        >
          {times.map((time) => (
            <TouchableOpacity
              key={time.hour}
              style={[
                styles.timeItem,
                selectedTime.hour === time.hour && styles.selectedTimeItem
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime.hour === time.hour && styles.selectedTimeText
              ]}>
                {time.hour}
              </Text>
              <Text style={[
                styles.periodText,
                selectedTime.hour === time.hour && styles.selectedTimeText
              ]}>
                {time.period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Confirm Button */}
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
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
  map: {
    height: 300,
  },
  scheduleContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scheduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateScroll: {
    marginBottom: 20,
  },
  dateItem: {
    width: 70,
    height: 90,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateItem: {
    backgroundColor: '#FFB800',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  monthText: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  timeScroll: {
    marginBottom: 20,
  },
  timeItem: {
    width: 60,
    height: 70,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeItem: {
    backgroundColor: '#FFB800',
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  periodText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
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

export default ScheduleRideScreen;