import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';

const DropletIcon = (props) => <Icon {...props} name="droplet-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} style={{ width: '100%', position: 'absolute', bottom: 0 }}>
      <BottomNavigationTab icon={DropletIcon} />
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={UserIcon} />
    </BottomNavigation>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
