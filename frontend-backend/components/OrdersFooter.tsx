import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrdersFooterProps {
  totalPrice: number;
}

const OrdersFooter: React.FC<OrdersFooterProps> = ({ totalPrice }) => {
  return (
    <>
      <View style={styles.divider} />
      <Text style={styles.headerText}>Payment Summary</Text>

      <View style={styles.summaryRow}>
        <Text style={styles.labelText}>Price</Text>
        <Text style={styles.valueText}>$ {totalPrice}</Text>
      </View>

      <View style={styles.summaryRow}>
        <Text style={styles.labelText}>Delivery Fee</Text>
        <Text style={styles.valueText}>$ {totalPrice === 0 ? 0 : 1}</Text>
      </View>
    </>
  );
};

export default OrdersFooter;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 4,
    borderBottomColor: '#F9F2ED',
    marginTop: 12, // Equivalent to mt-3
  },
  headerText: {
    marginHorizontal: 28, // Equivalent to mx-7
    color: '#242424',
    fontSize: 18, // Equivalent to text-lg
    fontFamily: 'Sora-SemiBold',
    marginBottom: 16, // Equivalent to mb-4
    marginTop: 16, // Equivalent to mt-4
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 28, // Equivalent to mx-7
    marginBottom: 12, // Equivalent to mb-3
    paddingBottom: 16, // Equivalent to pb-8
  },
  labelText: {
    fontSize: 16, // Equivalent to text-base
    fontFamily: 'Sora-Regular',
  },
  valueText: {
    fontSize: 16, // Equivalent to text-base
    fontFamily: 'Sora-SemiBold',
  },
});
