import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface DetailsHeaderInterface {
  image_url: string;
  name: string;
  type: string;
  rating: number;
}

const DetailsHeader = ({ image_url, name, type, rating }: DetailsHeaderInterface) => {
  console.log("DetailsHeader image_url:", image_url); // Debug log

  return (
    <>
      <Image
        source={{
          uri: image_url || "https://via.placeholder.com/150",
        }}
        style={styles.image}
        onError={() => console.log("Failed to load image:", image_url)} // Debug log for failed image
      />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.type}>{type}</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="delivery-dining" size={24} color="#C67C4E" style={styles.icon} />
            <FontAwesome name="coffee" size={24} color="#C67C4E" style={styles.icon} />
            <MaterialCommunityIcons name="food-croissant" size={24} color="#C67C4E" style={styles.icon} />
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Octicons name="star-fill" size={24} color="#FBBE21" />
          <Text style={styles.rating}>{rating}</Text>
        </View>

        {/* Horizontal line */}
        <View style={styles.separator} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    color: "#242424",
    fontSize: 20,
    fontFamily: "Sora-SemiBold",
  },
  type: {
    color: "#A2A2A2",
    fontSize: 14,
    fontFamily: "Sora-Regular",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
  },
  separator: {
    height: 1,
    backgroundColor: "#EDEDED", 
    marginVertical: 15,
    width: "100%",
  },
});

export default DetailsHeader;
