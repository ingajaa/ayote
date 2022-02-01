import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserProfile from './UserProfile';
import WaterReminderIcon from './WaterReminderIcon';

const TopNav = () => {
  return (
      <View style={styles.navBarStyle}>
        <UserProfile />
        <WaterReminderIcon />
      </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  navBarStyle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10
  },
})
