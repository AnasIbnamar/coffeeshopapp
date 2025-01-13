import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import React from "react";

interface DetailsInterface {
  description: string;
}

const DescriptionSection = ({ description }: DetailsInterface) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
          {expanded ? description : `${description.slice(0, 100)}...`}
        </Text>
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMore}>{expanded ? " Read Less" : "Read More"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    color: "#242424",
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  description: {
    color: "#A2A2A2",
    fontSize: 14,
    fontFamily: "Sora-Regular",
  },
  readMore: {
    color: "#C67C4E",
    fontSize: 14,
    fontFamily: "Sora-Regular",
    marginTop: 5,
  },
});

export default DescriptionSection;
