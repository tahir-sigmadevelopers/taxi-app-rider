import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const RideHistoryScreen = () => {
  const [rides, setRides] = useState([
    {
      id: '1',
      date: '12 May, 2023',
      time: '10:30 AM',
      from: '123 Main St, Anytown',
      to: '456 Oak Ave, Somewhere',
      amount: '$12.50',
      status: 'completed',
    },
    {
      id: '2',
      date: '10 May, 2023',
      time: '2:15 PM',
      from: '789 Pine Rd, Elsewhere',
      to: '101 Maple Dr, Nowhere',
      amount: '$8.75',
      status: 'completed',
    },
    {
      id: '3',
      date: '5 May, 2023',
      time: '8:45 AM',
      from: '222 Cedar Ln, Anyplace',
      to: '333 Birch Ct, Someplace',
      amount: '$15.20',
      status: 'cancelled',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date} • {item.time}</Text>
        <Text
          style={[
            styles.rideStatus,
            item.status === 'completed'
              ? styles.statusCompleted
              : styles.statusCancelled,
          ]}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>

      <View style={styles.rideDetails}>
        <View style={styles.locationContainer}>
          <View style={styles.locationDot} />
          <View style={styles.locationLine} />
          <View style={[styles.locationDot, styles.destinationDot]} />
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{item.from}</Text>
          <Text style={styles.addressText}>{item.to}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <Text style={styles.rideAmount}>{item.amount}</Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <CustomSafeArea>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ride History</Text>
      </View>

      {rides.length > 0 ? (
        <FlatList
          data={rides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ridesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="car-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No ride history yet</Text>
          <Text style={styles.emptySubtext}>
            Your completed rides will appear here
          </Text>
        </View>
      )}
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ridesList: {
    padding: 16,
  },
  rideItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
  },
  rideStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusCompleted: {
    color: '#4CAF50',
  },
  statusCancelled: {
    color: '#F44336',
  },
  rideDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  locationContainer: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  destinationDot: {
    backgroundColor: '#F44336',
  },
  locationLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginVertical: 4,
  },
  addressContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 60,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rideAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailsButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFB800',
    borderRadius: 20,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default RideHistoryScreen; 