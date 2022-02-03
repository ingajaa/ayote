import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MacroBar = () => {
  return (
    <View style={styles.macroBarStyle}>
      <Text>Calories</Text>
    <Text>Macros</Text>
    </View>
  );
};

export default MacroBar;

const styles = StyleSheet.create({
  macroBarStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 128,
    paddingVertical: 45,
    marginHorizontal: 20,
    borderRadius: 5
  },
})

