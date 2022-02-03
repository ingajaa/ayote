import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MealContainer = () => {
  return (
    <View style={styles.mealContainerStyle}>
    <Text>My Snack Today</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  mealContainerStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 101,
    paddingVertical: 40,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})

export default MealContainer;