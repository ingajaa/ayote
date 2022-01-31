import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserProfile from './UserProfile';
import WaterReminder from './WaterReminder';

const NavBar = () => {
  return (
    <View style={styles.navBarStyle}>
      <UserProfile />
      <WaterReminder />
    </View>
  );
};

const styles = StyleSheet.create({
  navBarStyle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20
  },
})

export default NavBar;
