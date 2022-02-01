import React from 'react';
import { View, StyleSheet } from 'react-native';
//import * as eva from '@eva-design/eva';
import { Layout, Button, Text } from '@ui-kitten/components';
//import { default as theme } from '../assets/custom-theme.json';

const WaterReminderIcon = () => {
  return (
    <View>
      <Text style={styles.waterStyle}> 💧 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  waterStyle: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    marginLeft: 235,
  },
})

export default WaterReminderIcon;