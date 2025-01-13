import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Product, ProductCategory } from "@/types/types";
import { fetchProducts } from "@/services/productService";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-root-toast';
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchArea from "@/components/SearchArea";
import Banner from "@/components/Banner";
import { useCart } from '@/components/CartContext';
import { useRouter } from "expo-router";

const Home = () => {
  const { addToCart , cartItems} = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Use router for navigation

  // Load products and categories
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        const categories = productsData.map((product) => product.category || "Uncategorized");
        const uniqueCategories = Array.from(new Set(["All", ...categories])).map((category) => ({
          id: category,
          selected: category === selectedCategory,
        }));

        setProductCategories(uniqueCategories);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  const addButton = (name:string) => {
    addToCart(name, 1);
    Toast.show(`${name} added to cart`, {
      duration: Toast.durations.SHORT,
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <SearchArea />
              <Banner />
              <FlatList
                data={productCategories}
                horizontal
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.categoryList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.id)}
                    style={[
                      styles.categoryButton,
                      item.id === selectedCategory && styles.categoryButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        item.id === selectedCategory && styles.categoryTextSelected,
                      ]}
                    >
                      {item.id}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/details',
                    params: {
                      name: item.name,
                      image_url: item.image_url,
                      type: item.category,
                      price: item.price,
                      rating: item.rating,
                      description: item.description,
                    },
                  })
                }
              >
                <View style={styles.imageWrapper}>
                  <Image
                    style={styles.productImage}
                    source={{
                      uri: item.image_url || "https://via.placeholder.com/150",
                    }}
                  />
                </View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
              </TouchableOpacity>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>${item.price}</Text>
                <TouchableOpacity
                  onPress={() => addButton(item.name)}
                >
                  <View style={styles.addButton}>
                    <AntDesign name="plus" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Sora-Regular',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)', // Updated shadow
    elevation: 3, // For Android shadow
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    color: '#242424',
    fontFamily: 'Sora-SemiBold',
  },
  productCategory: {
    marginTop: 4,
    fontSize: 14,
    color: '#A2A2A2',
    fontFamily: 'Sora-Regular',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#050505',
    fontFamily: 'Sora-SemiBold',
  },
  addButton: {
    padding: 10,
    backgroundColor: '#C67C4E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
  },
  categoryList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#C67C4E',
  },
  categoryText: {
    fontSize: 14,
    color: '#313131',
    fontFamily: 'Sora-Regular',
  },
  categoryTextSelected: {
    color: 'white',
  },
});
