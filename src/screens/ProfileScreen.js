import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';
import { auth } from '../config/firebase';
import userService from '../services/userService';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh profile data whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      console.log('Profile screen focused, refreshing data');
      fetchUserProfile();
      return () => {};
    }, [])
  );

  // Initial load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      
      if (currentUser) {
        console.log('Fetching user profile for:', currentUser.uid);
        const response = await userService.getUserByFirebaseUid(currentUser.uid);
        
        if (response.success) {
          console.log('User data fetched successfully:', response.data);
          setUserData(response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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
          {loading ? (
            <ActivityIndicator size="large" color="#FFB800" />
          ) : (
            <>
              <View style={styles.profileImageContainer}>
                {userData && userData.profileImage ? (
                  <Image 
                    source={{ uri: userData.profileImage }} 
                    style={styles.profileImage} 
                  />
                ) : (
                  <View style={styles.profileImage}>
                    <Text style={styles.profileInitials}>
                      {userData ? getInitials(userData.name) : 'U'}
                    </Text>
                  </View>
                )}
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditProfile')}
                >
                  <Ionicons name="pencil" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              <Text style={styles.userName}>
                {userData ? userData.name : 'User'}
              </Text>
            </>
          )}
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