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

const NotificationScreen = ({ navigation }) => {
  const notifications = {
    today: [
      {
        id: '1',
        title: 'Ride Booked Successfully',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1h',
        icon: 'calendar-outline',
      },
      {
        id: '2',
        title: '50% Off on First Ride',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1h',
        icon: 'ticket-outline',
      },
    ],
    yesterday: [
      {
        id: '3',
        title: 'Ride Booked Successfully',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        icon: 'calendar-outline',
      },
      {
        id: '4',
        title: '50% Off on First Ride',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        icon: 'ticket-outline',
      },
      {
        id: '5',
        title: 'Ride Booked Successfully',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        icon: 'calendar-outline',
      },
      {
        id: '6',
        title: '50% Off on First Ride',
        description: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
        time: '1d',
        icon: 'ticket-outline',
      },
    ],
  };

  const renderNotificationSection = (title, items) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>
      {items.map((notification) => (
        <View key={notification.id} style={styles.notificationItem}>
          <View style={styles.iconContainer}>
            <Ionicons name={notification.icon} size={24} color="#FFB800" />
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDescription}>
              {notification.description}
            </Text>
          </View>
          <Text style={styles.timeText}>{notification.time}</Text>
        </View>
      ))}
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
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>2 NEW</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {renderNotificationSection('TODAY', notifications.today)}
        {renderNotificationSection('YESTARDAY', notifications.yesterday)}
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
    justifyContent: 'space-between',
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
  },
  newBadge: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  markAllText: {
    fontSize: 14,
    color: '#FFB800',
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationScreen; 