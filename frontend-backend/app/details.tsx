import { Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/PageHeader";
import { useCart } from "@/components/CartContext";
import Toast from "react-native-root-toast";
import DescriptionSection from "@/components/DescriptionSection";
import SizesSection from "@/components/SizesSection";
import DetailsHeader from "@/components/DetailsHeader";

const DetailsPage = () => {
  const { addToCart } = useCart();

  const {
    name,
    image_url,
    type,
    description,
    price,
    rating,
  } = useLocalSearchParams() as {
    name: string;
    image_url: string;
    type: string;
    description: string;
    price: string;
    rating: string;
  };

  const buyNow = () => {
    addToCart(name, 1);
    Toast.show(`${name} added to cart`, {
      duration: Toast.durations.SHORT,
    });
    router.back();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <PageHeader title={"Detail"} showHeaderRight={true} bgColor="#F9F9F9" />

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <DetailsHeader
            image_url={image_url || "https://via.placeholder.com/150"}
            name={name}
            type={type}
            rating={Number(rating)}
          />
          <DescriptionSection description={description} />
          <SizesSection />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 25,
          }}
        >
          <View>
            <Text
              style={{
                color: "#A2A2A2",
                fontSize: 14,
                fontFamily: "Sora-Regular",
                paddingBottom: 5,
              }}
            >
              Price
            </Text>
            <Text
              style={{
                color: "#C67C4E", // Assuming `app_orange_color`
                fontSize: 24,
                fontFamily: "Sora-SemiBold",
              }}
            >
              ${price}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#C67C4E", // Assuming `app_orange_color`
              width: "70%",
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={buyNow}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontFamily: "Sora-Regular",
              }}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailsPage;
