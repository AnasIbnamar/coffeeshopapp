import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Product } from '@/types/types';
import OrdersHeader from './OrdersHeader';
import OrdersFooter from './OrdersFooter';

interface ProductListProps {
  products: Product[];
  quantities: { [key: string]: number };
  setQuantities: (itemKey: string, delta: number) => void;
  totalPrice: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, quantities, setQuantities, totalPrice }) => {
  const filteredProducts = products.filter((product) => (quantities[product.name] || 0) > 0);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantities(item.name, -1)}>
          <Text style={styles.quantityButton}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantities[item.name] || 0}</Text>
        <TouchableOpacity onPress={() => setQuantities(item.name, 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {filteredProducts.length > 0 ? (
        <FlatList
          ListHeaderComponent={<OrdersHeader />}
          ListFooterComponent={<OrdersFooter totalPrice={totalPrice} />}
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartTitle}>No items in your cart yet</Text>
          <Text style={styles.emptyCartSubtitle}>Let's Go Get some Delicious Goodies</Text>
        </View>
      )}
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 28, // Equivalent to mx-7
    paddingBottom: 12, // Equivalent to pb-3
  },
  productImage: {
    width: 64, // Equivalent to w-16
    height: 64, // Equivalent to h-16
    borderRadius: 8, // Equivalent to rounded-lg
  },
  productDetails: {
    flex: 1,
    marginLeft: 16, // Equivalent to ml-4
  },
  productName: {
    fontSize: 18, // Equivalent to text-lg
    fontFamily: 'Sora-SemiBold',
    color: '#242424',
  },
  productCategory: {
    fontSize: 12, // Equivalent to text-xs
    fontFamily: 'Sora-Regular',
    color: '#A2A2A2',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 24, // Equivalent to text-xl
    fontFamily: 'Sora-SemiBold',
  },
  quantityText: {
    marginHorizontal: 8, // Equivalent to mx-2
    fontSize: 16, // Equivalent to default text size
    fontFamily: 'Sora-Regular',
  },
  emptyCartContainer: {
    marginHorizontal: 28, // Equivalent to mx-7
    alignItems: 'center',
  },
  emptyCartTitle: {
    fontSize: 24, // Equivalent to text-2xl
    fontFamily: 'Sora-SemiBold',
    color: '#A2A2A2',
    marginBottom: 16, // Equivalent to mb-4
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: 18, // Equivalent to text-xl
    fontFamily: 'Sora-SemiBold',
    color: '#A2A2A2',
    textAlign: 'center',
  },
});
