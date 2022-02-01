import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const BottomNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} style={{ width: '100%', position: 'absolute', bottom: 0 }}>
    <BottomNavigationTab title="USERS" />
    <BottomNavigationTab title="ORDERS" />
    <BottomNavigationTab title="TRANSACTIONS" />
  </BottomNavigation>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});

