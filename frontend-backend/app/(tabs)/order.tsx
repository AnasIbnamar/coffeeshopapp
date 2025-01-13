import { Text, View, StatusBar, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import PageHeader from '@/components/PageHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Product } from '@/types/types';
import { fetchProducts } from '@/services/productService';
import ProductList from '@/components/CartProductList';
import { useCart } from '@/components/CartContext';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

const Order = () => {
  const { cartItems, SetQuantityCart, emptyCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotal = (products: Product[], quantities: { [key: string]: number }): number => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.name] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  useEffect(() => {
    const total = calculateTotal(products, cartItems);
    setTotalPrice(total);
  }, [cartItems, products]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError(`Error fetching products: ${err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const orderNow = () => {
    emptyCart();
    Toast.show('Order placed successfully!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
    router.push('/thankyou');
  };

  if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <PageHeader title="Order" showHeaderRight={false} bgColor="#F9F9F9" />

      <View style={styles.contentContainer}>
        {/* Product List */}
        <View style={styles.productListContainer}>
          <ProductList
            products={products}
            quantities={cartItems}
            setQuantities={SetQuantityCart}
            totalPrice={totalPrice}
          />
        </View>

        {/* Bottom Order Section */}
        <View style={styles.bottomSection}>
          {/* Payment Info */}
          <View style={styles.paymentInfo}>
            <Ionicons name="wallet-outline" size={24} color="#C67C4E" />
            <View style={styles.paymentTextContainer}>
              <Text style={styles.paymentTextTitle}>Cash/Wallet</Text>
              <Text style={styles.paymentTextAmount}>
                ${totalPrice === 0 ? 0 : totalPrice + 1}
              </Text>
            </View>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </View>

          {/* Order Button */}
          <TouchableOpacity
            style={[
              styles.orderButton,
              totalPrice === 0 ? styles.disabledButton : styles.enabledButton,
            ]}
            disabled={totalPrice === 0}
            onPress={orderNow}
          >
            <Text style={styles.orderButtonText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productListContainer: {
    height: '75%',
  },
  bottomSection: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentTextContainer: {
    marginLeft: 10,
  },
  paymentTextTitle: {
    color: '#242424',
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
  },
  paymentTextAmount: {
    color: '#C67C4E',
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
  },
  orderButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  enabledButton: {
    backgroundColor: '#C67C4E', // Active state
  },
  disabledButton: {
    backgroundColor: '#EDEDED', // Disabled state
  },
  orderButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Sora-Regular',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});
