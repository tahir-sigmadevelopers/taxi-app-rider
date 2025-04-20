import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomSafeArea from '../components/CustomSafeArea';

const HelpCenterScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Contact Us');
  const [searchQuery, setSearchQuery] = useState('');

  const contactOptions = [
    {
      id: '1',
      title: 'Customer Service',
      icon: 'headset-outline',
      color: '#FFB800',
    },
    {
      id: '2',
      title: 'Whatsapp',
      icon: 'logo-whatsapp',
      color: '#FFB800',
      details: '(480) 555-0103',
    },
    {
      id: '3',
      title: 'Website',
      icon: 'globe-outline',
      color: '#FFB800',
    },
    {
      id: '4',
      title: 'Facebook',
      icon: 'logo-facebook',
      color: '#FFB800',
    },
    {
      id: '5',
      title: 'Twitter',
      icon: 'logo-twitter',
      color: '#FFB800',
    },
    {
      id: '6',
      title: 'Instagram',
      icon: 'logo-instagram',
      color: '#FFB800',
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
        <Text style={styles.headerTitle}>Help Center</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in reviews"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Faq' && styles.activeTab]}
          onPress={() => setActiveTab('Faq')}
        >
          <Text style={[styles.tabText, activeTab === 'Faq' && styles.activeTabText]}>
            Faq
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Contact Us' && styles.activeTab]}
          onPress={() => setActiveTab('Contact Us')}
        >
          <Text style={[styles.tabText, activeTab === 'Contact Us' && styles.activeTabText]}>
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {contactOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.contactOption}>
            <View style={styles.optionLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name={option.icon} size={24} color={option.color} />
              </View>
              <View>
                <Text style={styles.optionTitle}>{option.title}</Text>
                {option.details && (
                  <Text style={styles.optionDetails}>{option.details}</Text>
                )}
              </View>
            </View>
            <Ionicons name="chevron-down" size={24} color="#666" />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFB800',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#FFB800',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  optionDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default HelpCenterScreen;
