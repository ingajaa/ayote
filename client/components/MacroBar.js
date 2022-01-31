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

const styles = StyleSheet.create({
  macroBarStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 120,
    paddingVertical: 40,
    borderRadius: 5
  },
})

export default MacroBar;
