import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

// Assuming you have a Product type defined somewhere, otherwise define it like this:
interface Product {
  id: string; // or another unique identifier
  name: string;
  ingredients: string;
  category: string;
  image_url: string;
}

interface SearchAreaProps {
  products: Product[]; // Specify the type for the products prop
}

const SearchArea: React.FC<SearchAreaProps> = ({ products }) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Hay Riad");
  const [searchQuery, setSearchQuery] = useState(""); // Track search input for general search
  const [selectedFilter, setSelectedFilter] = useState("name"); // Default filter is by name
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Locations (or could be any data you want to search)
  const locations = [
    "Hay Riad",
    "Agdal",
    "Temara",
    "Harhoura",
    "Souissi",
    "Hassan",
    "Sale",
    "Kenitra",
  ];

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationModalVisible(false); // Close location modal when a location is selected
    setSearchQuery(""); // Reset search query when a location is selected
  };

  // Handle applying the filter for products
  const handleFilterApply = () => {
    if (!Array.isArray(products)) return; // Safeguard: Check if products is an array

    // Apply the filter based on the selected filter type
    if (selectedFilter === "name") {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (selectedFilter === "ingredients") {
      setFilteredProducts(
        products.filter((product) =>
          product.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (selectedFilter === "category") {
      setFilteredProducts(
        products.filter((product) =>
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setFilterModalVisible(false); // Close filter modal after applying filter
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Location Selector */}
        <Text style={styles.locationLabel}>Location</Text>
        <TouchableOpacity
          style={styles.locationRow}
          onPress={() => setLocationModalVisible(true)}
        >
          <Text style={styles.locationValue}>{selectedLocation}</Text>
          <AntDesign
            name="down"
            size={14}
            color="white"
            style={styles.locationIcon}
          />
        </TouchableOpacity>

        {/* Modal for Location Dropdown */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={locationModalVisible}
          onRequestClose={() => setLocationModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>

              {/* Search bar inside modal to filter locations */}
              <TextInput
                placeholder="Search location..."
                placeholderTextColor="#A2A2A2"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInputModal}
              />
              <FlatList
                data={filteredLocations}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleLocationSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Search and Filter Section */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <View style={styles.iconWrapper}>
              <AntDesign name="search1" size={24} color="white" />
            </View>
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#A2A2A2"
              style={styles.searchInput}
              onChangeText={setSearchQuery} // Update search query while typing
              value={searchQuery}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)} // Open filter modal
          >
            <Entypo name="sound-mix" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Modal for Filtering Products */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>

              {/* Filter options */}
              <Text style={styles.modalTitle}>Filter by:</Text>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => setSelectedFilter("name")}
              >
                <Text style={styles.modalItemText}>Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => setSelectedFilter("ingredients")}
              >
                <Text style={styles.modalItemText}>Ingredients</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => setSelectedFilter("category")}
              >
                <Text style={styles.modalItemText}>Category</Text>
              </TouchableOpacity>

              {/* Apply Button */}
              <TouchableOpacity style={styles.applyButton} onPress={handleFilterApply}>
                <Text style={styles.applyButtonText}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Display filtered products */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productIngredients}>{item.ingredients}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SearchArea;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#222222",
    paddingBottom: 24,
  },
  innerContainer: {
    width: "90%",
    paddingTop: 32,
  },
  locationLabel: {
    color: "#A2A2A2",
    fontSize: 14,
    fontFamily: "Sora-Regular",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Sora-Regular",
  },
  locationIcon: {
    marginLeft: 6,
  },
  searchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "80%",
    height: 56,
  },
  iconWrapper: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Sora-Regular",
  },
  filterButton: {
    width: 56,
    height: 56,
    backgroundColor: "#C67C4E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    fontSize: 16,
    color: "#FF6347", // A red color for the "Close" button
    fontFamily: "Sora-Regular",
    marginBottom: 10, // Space between the "Close" button and search bar
    textAlign: "right", // Align button to the right
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Sora-SemiBold",
    marginBottom: 10,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Sora-Regular",
  },
  applyButton: {
    backgroundColor: "#4CAF50", // Green color
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  productContainer: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 14,
    color: "#888",
  },
  productIngredients: {
    fontSize: 12,
    color: "#888",
  },
});
