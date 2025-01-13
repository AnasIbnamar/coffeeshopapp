import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const ThankyouPage = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Ionicons name="checkmark-circle-outline" size={80} color="#C67C4E" style={styles.icon} />

        {/* Thank You Text */}
        <Text style={styles.thankYouText}>Thank you for your Order</Text>
        <Text style={styles.subText}>Your order has been successfully placed!</Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)/home')}
        >
          <Text style={styles.buttonText}>Return to Home Page</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default ThankyouPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  thankYouText: {
    fontSize: 28,
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
    color: '#242424',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    fontFamily: 'Sora-Regular',
    textAlign: 'center',
    color: '#A2A2A2',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#C67C4E',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)', // Updated shadow
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Sora-Regular',
  },
});
