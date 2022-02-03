import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DropletIcon = (props) => <Icon {...props} name="droplet-outline" />;

const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const UserIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomNav = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigation = useNavigation();
  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <TouchableOpacity style={styles.touchableStyle} onPress={() => navigation.navigate('WaterTrackScreen')}>
      <BottomNavigationTab style={styles.waterStyle} icon={DropletIcon} />
      </TouchableOpacity>
      <BottomNavigationTab icon={BellIcon} />
      <BottomNavigationTab icon={UserIcon} />
    </BottomNavigation>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  waterStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
  },
  touchableStyle: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 0
  }
});
