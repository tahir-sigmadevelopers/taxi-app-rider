import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RideSharingScreen = ({ navigation, route }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    {
      id: 'self',
      name: 'My Self',
      type: 'self',
    },
    {
      id: 'john',
      name: 'John Doe',
      phone: '(239) 555-0108',
      type: 'contact',
    },
  ];

  const handleConfirm = () => {
    navigation.navigate('PromoCode', {
      ...route.params,
      sharedWith: selectedContact
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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

      {/* Map View (same as previous screen) */}
      <View style={styles.mapPlaceholder} />

      {/* Contact Selection */}
      <View style={styles.contactsContainer}>
        <Text style={styles.title}>Some one else taking this ride?</Text>
        <Text style={styles.subtitle}>
          Choose a contact so that they also get driver number, vehicle details and ride OTP vis SMS.
        </Text>

        <ScrollView style={styles.contactsList}>
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactItem}
              onPress={() => setSelectedContact(contact)}
            >
              <View style={styles.contactLeft}>
                {contact.type === 'self' ? (
                  <View style={styles.selfIcon}>
                    <Ionicons name="person" size={24} color="#FFB800" />
                  </View>
                ) : (
                  <View style={styles.contactInitials}>
                    <Text style={styles.initialsText}>
                      {getInitials(contact.name)}
                    </Text>
                  </View>
                )}
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  {contact.phone && (
                    <Text style={styles.contactPhone}>{contact.phone}</Text>
                  )}
                </View>
              </View>
              <View style={styles.radioButton}>
                <View style={[
                  styles.radioInner,
                  selectedContact?.id === contact.id && styles.radioSelected
                ]} />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addContactButton}>
            <View style={styles.addContactIcon}>
              <Ionicons name="people" size={24} color="#FFB800" />
            </View>
            <Text style={styles.addContactText}>Choose another contacts</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity 
          style={[
            styles.confirmButton,
            !selectedContact && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirm}
          disabled={!selectedContact}
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
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  contactsContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selfIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioSelected: {
    backgroundColor: '#FFB800',
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  addContactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addContactText: {
    fontSize: 16,
    color: '#FFB800',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: '#FFD980',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideSharingScreen; 