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

const SettingsScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      title: 'Notification Settings',
      icon: 'notifications-outline',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
    {
      id: '2',
      title: 'Password Manager',
      icon: 'key-outline',
      onPress: () => navigation.navigate('PasswordManager'),
    },
    {
      id: '3',
      title: 'Delete Account',
      icon: 'trash-outline',
      onPress: () => navigation.navigate('DeleteAccount'),
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <View 
                style={[
                  styles.menuIconContainer,
                  item.title === 'Delete Account' && styles.deleteIconContainer
                ]}
              >
                <Ionicons name={item.icon} size={24} color="#FFB800" />
              </View>
              <Text 
                style={[
                  styles.menuTitle,
                  item.title === 'Delete Account' && styles.deleteText
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
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
  deleteIconContainer: {
    backgroundColor: '#f5f5f5',
  },
  menuTitle: {
    fontSize: 16,
    color: '#000',
  },
  deleteText: {
    color: '#000',
    fontWeight: '500',
  },
}); 

export default SettingsScreen;
