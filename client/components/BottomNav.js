import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Text, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const DropletIcon = (props) => <Icon {...props} name="droplet-outline" fill="#fe615a" />;

const BellIcon = (props) => <Icon {...props} name="home-outline" fill="#fe615a" />;

const UserIcon = (props) => <Icon {...props} name="bell-outline" fill="#fe615a" />;

const BottomNav = () => {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const routes = ['WaterTrackScreen', 'HomeScreen', 'CaffeineTrackScreen'];
  return (
    <BottomNavigation
      style={styles.navBar}
      appearance="noIndicator"
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
        navigation.navigate(routes[index]);
      }}
    >
      <BottomNavigationTab icon={DropletIcon} />
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={UserIcon} />
    </BottomNavigation>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  navBar: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-around',
    bottom: 0,
    paddingTop: 30,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  touchableStyle: {
    paddingHorizontal: 25
  }
});