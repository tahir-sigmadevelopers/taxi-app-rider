import React from 'react';
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

const InviteFriendsScreen = ({ navigation }) => {
  // Function to generate a color based on the contact's name
  const getAvatarColor = (name) => {
    const colors = ['#FFB800', '#4CAF50', '#2196F3', '#9C27B0', '#F44336'];
    const sum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[sum % colors.length];
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const contacts = [
    {
      id: '1',
      name: 'Carla Schoen',
      phone: '203.555.0119',
    },
    {
      id: '2',
      name: 'Esther Howard',
      phone: '702.555.0122',
    },
    {
      id: '3',
      name: 'Jacob Jones',
      phone: '316.555.0116',
    },
    {
      id: '4',
      name: 'Esther Howard',
      phone: '702.555.0122',
    },
    {
      id: '5',
      name: 'Esther Howard',
      phone: '702.555.0122',
    },
    {
      id: '6',
      name: 'Esther Howard',
      phone: '702.555.0122',
    },
    {
      id: '7',
      name: 'Jacob Jones',
      phone: '316.555.0116',
    },
    {
      id: '8',
      name: 'Jacob Jones',
      phone: '316.555.0116',
    },
    {
      id: '9',
      name: 'Jacob Jones',
      phone: '316.555.0116',
    },
    {
      id: '10',
      name: 'Jacob Jones',
      phone: '316.555.0116',
    },
  ];

  const handleInvite = (contactId) => {
    // Implement invite functionality
    console.log('Inviting contact:', contactId);
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
        <Text style={styles.headerTitle}>Invite Friends</Text>
      </View>

      <ScrollView style={styles.content}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <View 
                style={[
                  styles.contactImage, 
                  { backgroundColor: getAvatarColor(contact.name) }
                ]}
              >
                <Text style={styles.contactInitials}>
                  {getInitials(contact.name)}
                </Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.inviteButton}
              onPress={() => handleInvite(contact.id)}
            >
              <Text style={styles.inviteButtonText}>Invite</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  content: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactDetails: {
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  inviteButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default InviteFriendsScreen; 