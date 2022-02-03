import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const DropletIcon = (props) => <Icon {...props} name="droplet-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} style={styles.navBar}>
          <TouchableHighlight style={styles.touchableStyle} onPress={() => navigation.navigate('WaterTrackScreen')}>
      <BottomNavigationTab style={styles.waterIcon} icon={DropletIcon} />
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchableStyle}>
      <BottomNavigationTab icon={BellIcon} />
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchableStyle}>
      <BottomNavigationTab icon={UserIcon} />
      </TouchableHighlight>
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
    paddingTop: 15,
  },
  waterIcon: {
    backgroundColor: '#fff'
  },
  touchableStyle: {
    paddingHorizontal: 25,
  }
});
