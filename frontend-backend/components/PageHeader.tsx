import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router, Stack } from 'expo-router';

interface HeaderProps {
  title: string;
  showHeaderRight: boolean;
  bgColor: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title, showHeaderRight, bgColor }) => {
  return (
    <Stack.Screen
      options={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTitleAlign: 'center',
        headerTitle: () => <Text style={styles.headerTitle}>{title}</Text>,
        headerRight: showHeaderRight
          ? () => (
              <FontAwesome5
                style={styles.headerRightIcon}
                name="heart"
                size={24}
                color="black"
              />
            )
          : undefined,
        headerBackVisible: false,
        headerLeft: () => (
          <GestureHandlerRootView style={styles.headerLeftContainer}>
            <TouchableOpacity style={styles.headerLeftIcon} onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </GestureHandlerRootView>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    color: '#242424',
    fontFamily: 'Sora-SemiBold',
  },
  headerRightIcon: {
    marginRight: 10,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftIcon: {
    paddingLeft: 10,
  },
});

export default PageHeader;
