import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';

/**
 * CustomSafeArea - A reusable component that properly handles safe area insets 
 * across different devices and platforms.
 * 
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Child components to render inside the safe area
 * @param {string} props.backgroundColor - Background color for the safe area (default: '#fff')
 * @param {string} props.statusBarColor - Color for the status bar (default: '#fff')
 * @param {'dark-content' | 'light-content'} props.barStyle - Status bar style (default: 'dark-content')
 * @param {boolean} props.forceInset - Force additional top padding even on iOS (default: false)
 * @returns {JSX.Element} - Rendered component
 */
const CustomSafeArea = ({ 
  children, 
  backgroundColor = '#fff',
  statusBarColor = '#fff',
  barStyle = 'dark-content',
  forceInset = false
}) => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle={barStyle} backgroundColor={statusBarColor} />
      <View 
        style={[
          styles.container, 
          { backgroundColor },
          (Platform.OS === 'android' || forceInset) && styles.androidTopPadding
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  androidTopPadding: {
    paddingTop: StatusBar.currentHeight || 10
  }
});

export default CustomSafeArea; 