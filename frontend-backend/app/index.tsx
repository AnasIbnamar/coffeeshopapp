import React from "react";
import { Text, View, SafeAreaView, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook

export default function App() {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.container}> {/* Full screen View */}
      <ImageBackground
        source={require("../assets/images/index_bg_image.png")} // Ensure the correct image path
        style={styles.imageBackground} // Full screen background style
        resizeMode="cover" // Ensures the image scales proportionally
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.upperSection} />
          <View style={styles.lowerSection}>
            <Text style={styles.heading}>
              Fall in Love with Coffee in Carribou Way!
            </Text>

            <Text style={styles.subheading}>
              Welcome to our cozy coffee corner, where every cup is a delight for you
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push("/(tabs)/home"); // Navigate to the home screen
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  upperSection: {
    flex: 6, // Represents 60% height
  },
  lowerSection: {
    flex: 8, // Represents 80% height
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20, // Adds padding to the sides for better readability
  },
  heading: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Sora-SemiBold", // Use your loaded custom font here
  },
  subheading: {
    marginTop: 12, // Adds spacing between the heading and subheading
    color: "#A2A2A2",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Sora-Regular", // Use your loaded custom font here
  },
  button: {
    marginTop: 20, // Spacing between the button and other elements
    backgroundColor: "#C67C4E", // Button background color
    paddingVertical: 12, // Vertical padding for the button
    paddingHorizontal: 32, // Horizontal padding for the button
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center the button content
  },
  buttonText: {
    fontSize: 18,
    color: "white", // Text color for the button
    fontFamily: "Sora-SemiBold", // Use your loaded custom font here
  },
});

