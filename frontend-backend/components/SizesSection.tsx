import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const SizesSection = () => {
  const [selectedSize, setSelectedSize] = useState<String>('M');
  const sizes = ['S', 'M', 'L'];

  const handleSelect = (size: String) => {
    setSelectedSize(size);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Size</Text>
      <View style={styles.sizeOptions}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            onPress={() => handleSelect(size)}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    color: '#242424',
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    marginLeft: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    alignItems: 'center',
    width: '30%',
  },
  selectedSizeButton: {
    backgroundColor: '#fdf5f0',
    borderColor: '#C67C4E',
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: 'Sora-Regular',
    color: '#000',
  },
  selectedSizeText: {
    color: '#C67C4E',
  },
});

export default SizesSection;
