import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DeliveryToggle: React.FC = () => {
  const [isDelivery, setIsDelivery] = useState(true); // State to manage the selected option

  return (
    <View style={styles.container}>
      {/* Delivery Button */}
      <TouchableOpacity
        style={[
          styles.button,
          isDelivery ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => setIsDelivery(true)}
      >
        <Text
          style={[
            styles.text,
            isDelivery ? styles.activeText : styles.inactiveText,
          ]}
        >
          Deliver
        </Text>
      </TouchableOpacity>

      {/* Pick Up Button */}
      <TouchableOpacity
        style={[
          styles.button,
          !isDelivery ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => setIsDelivery(false)}
      >
        <Text
          style={[
            styles.text,
            !isDelivery ? styles.activeText : styles.inactiveText,
          ]}
        >
          Pick Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    marginHorizontal: 28, // Equal to mx-7
    padding: 8, // Equivalent to p-1
    borderRadius: 12, // Equivalent to rounded-xl
    marginTop: 28, // Equivalent to mt-7
  },
  button: {
    paddingVertical: 8, // Equivalent to py-1
    paddingHorizontal: '15%', // Equivalent to px-[15%]
    borderRadius: 12, // Equivalent to rounded-xl
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#C67C4E', // Active background
  },
  inactiveButton: {
    backgroundColor: 'transparent', // Inactive background
  },
  text: {
    fontSize: 16, // Equivalent to text-lg
    fontFamily: 'Sora-SemiBold',
  },
  activeText: {
    color: '#FFFFFF', // Active text color
  },
  inactiveText: {
    color: '#000000', // Inactive text color
  },
});
