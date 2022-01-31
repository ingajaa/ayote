import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaterReminder = () => {
  return (
    <View><Text style={styles.waterStyle}> 💧 </Text></View>
  );
};

const styles = StyleSheet.create({
  waterStyle: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    marginLeft: 235,
  },
})

export default WaterReminder;
