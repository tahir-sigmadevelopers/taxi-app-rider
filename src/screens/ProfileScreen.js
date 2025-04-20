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

const ProfileScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      title: 'Your Profile',
      icon: 'person-outline',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: '2',
      title: 'Manage Address',
      icon: 'location-outline',
      onPress: () => navigation.navigate('ManageAddress'),
    },
    {
      id: '3',
      title: 'Notification',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: '4',
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: '5',
      title: 'Pre-Booked Rides',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('PreBookedRides'),
    },
    {
      id: '6',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('Settings'),
    },
    /* Commented out Emergency Contact
    {
      id: '7',
      title: 'Emergency Contact',
      icon: 'alert-circle-outline',
      onPress: () => navigation.navigate('EmergencyContact'),
    },
    */
    {
      id: '8',
      title: 'Help Center',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('HelpCenter'),
    },
    {
      id: '9',
      title: 'Invite Friends',
      icon: 'people-outline',
      onPress: () => navigation.navigate('InviteFriends'),
    },
    {
      id: '10',
      title: 'Coupon',
      icon: 'pricetag-outline',
      onPress: () => navigation.navigate('Coupons'),
    },
    {
      id: '11',
      title: 'Logout',
      icon: 'log-out-outline',
      onPress: () => navigation.replace('SignIn'),
    },
  ];

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
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>JW</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Jenny Wilson</Text>
          <Text style={styles.loyaltyPoints}>200 Loyalty Points</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={item.title === 'Logout' ? '#000' : '#FFB800'} 
                  />
                </View>
                <Text style={[
                  styles.menuTitle,
                  item.title === 'Logout' && styles.logoutText
                ]}>
                  {item.title}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
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
    marginRight: 56, // To center the title accounting for back button
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FFB800',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  loyaltyPoints: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#000',
  },
  logoutText: {
    color: '#000',
    fontWeight: '500',
  },
});

export default ProfileScreen; 