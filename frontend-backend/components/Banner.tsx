import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <View style={styles.backgroundBar} />
      <Image
        source={require("../assets/images/banner.png")}
        style={styles.bannerImage}
      />
      <View style={styles.textOverlay}>
        {/* Promo Badge */}
        <View style={styles.promoBadge}>
          <Text style={styles.promoText}>Promo</Text>
        </View>

        {/* Promo Title */}
        <Text style={styles.promoTitle}>Buy one get one FREE</Text>
        <Text style={styles.promoSubtitle}>
          Limited time offer at our stores.
        </Text>
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  backgroundBar: {
    position: "absolute",
    width: "100%",
    height: 90,
    top: -1,
    backgroundColor: "#222222",
  },
  bannerImage: {
    width: "90%",
    height: 144,
    borderRadius: 20,
  },
  textOverlay: {
    position: "absolute",
    width: "90%",
    paddingLeft: 16,
    top: 10,
  },
  promoBadge: {
    backgroundColor: "#ED5151",
    borderRadius: 10,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  promoText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Sora-SemiBold",
  },
  promoTitle: {
    color: "white",
    fontSize: 24,
    fontFamily: "Sora-SemiBold",
    marginTop: 16,
    lineHeight: 30,
  },
  promoSubtitle: {
    color: "#A2A2A2",
    fontSize: 14,
    fontFamily: "Sora-Regular",
    marginTop: 8,
  },
});
