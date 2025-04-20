import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const ManageAddressScreen = ({ navigation }) => {
  const addresses = [
    {
      id: '1',
      type: 'Home',
      address: '1901 Thoridgr Cir. Shiloh, Hawali 81063',
    },
    {
      id: '2',
      type: 'Office',
      address: '4517 Washington Ave. MAnchester, Kentucky 39495',
    },
    {
      id: '3',
      type: "Parent's House",
      address: '8502 Preston Rd. Inglewood, Maine 98380',
    },
    {
      id: '4',
      type: "Friend's House",
      address: '2464 Royak Ln. Mesa, New Jersey 45463',
    },
  ];

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
        <Text style={styles.headerTitle}>Manage Address</Text>
      </View>

      <ScrollView style={styles.content}>
        {addresses.map((item) => (
          <TouchableOpacity key={item.id} style={styles.addressItem}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={24} color="#FFB800" />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressType}>{item.type}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addAddressButton}>
          <Ionicons name="add" size={24} color="#FFB800" />
          <Text style={styles.addAddressText}>Add Address</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  addressIcon: {
    marginRight: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#FFB800',
    borderRadius: 8,
  },
  addAddressText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FFB800',
    fontWeight: '600',
  },
  applyButton: {
    margin: 16,
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageAddressScreen; 