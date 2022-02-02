import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Button, Text } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const WaterReminderIcon = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('WaterTrackScreen')}>
    <Text>Water</Text>
  </TouchableOpacity>
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