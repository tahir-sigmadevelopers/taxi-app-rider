import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../assets/Onboarding 01.png'),
    title: 'Welcome to Your',
    highlightedTitle: 'Ultimate\nTransportation Solution',
    description: 'Experience seamless rides with our user-friendly transportation service that connects you with reliable drivers.',
  },
  {
    id: '2',
    image: require('../../assets/Onboarding 2.png'),
    title: 'Choose Your Comfort:',
    highlightedTitle: 'Enjoy a Luxurious Ride',
    description: 'Select from a variety of vehicle options to match your needs and preferences for a comfortable journey.',
  },
  {
    id: '3',
    image: require('../../assets/Onboarding 3.png'),
    title: 'Book a Ride',
    highlightedTitle: 'Anywhere,\nAnytime!',
    description: 'Get instant access to nearby drivers and book your ride with just a few taps on your screen.',
  },
  {
    id: '4',
    image: require('../../assets/Onboarding 4.png'),
    title: 'Elevate Your',
    highlightedTitle: 'Ride Tracking\nExperience',
    description: 'Track your ride in real-time and enjoy a safe, transparent journey to your destination.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.replace('SignIn')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Image source={item.image} style={styles.image} resizeMode="contain" />

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {item.title}{' '}
            <Text style={styles.highlightedTitle}>{item.highlightedTitle}</Text>
          </Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.navigationContainer}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentIndex === index ? styles.paginationDotActive : null,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {currentIndex > 0 && (
              <TouchableOpacity
                style={[styles.navButton, styles.prevButton]}
                onPress={() => {
                  const prevIndex = currentIndex - 1;
                  flatListRef.current?.scrollToIndex({
                    index: prevIndex,
                    animated: true,
                  });
                  setCurrentIndex(prevIndex);
                }}
              >
                <Ionicons name="chevron-back" size={24} color="#FFB800" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => {
                if (currentIndex === slides.length - 1) {
                  navigation.replace('SignIn');
                } else {
                  const nextIndex = currentIndex + 1;
                  flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                  });
                  setCurrentIndex(nextIndex);
                }
              }}
            >
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {currentIndex === 0 && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {currentIndex === slides.length - 1 && (
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.replace('SignIn')}
          >
            <Text style={styles.getStartedButtonText}>Let's Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        bounces={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#FFB800',
    fontWeight: '600',
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    marginTop: height * 0.1,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlightedTitle: {
    color: '#FFB800',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: -105,
    left: 0,
    right: 0,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFE5B2',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: '#FFB800',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  prevButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  nextButton: {
    backgroundColor: '#FFB800',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  signInText: {
    fontSize: 16,
    color: '#FFB800',
    fontWeight: 'bold',
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#FFB800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen; 