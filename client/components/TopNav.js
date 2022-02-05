import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Tab, TabBar } from '@ui-kitten/components';

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
);

const TopNav = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar style={styles.topTabBar}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab style={styles.profileIconStyle} icon={PersonIcon} title='USERS'/>
      <Tab style={styles.bellIcon} icon={BellIcon} title='ORDERS'/>
    </TabBar>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  topTabBar: {
    // borderWidth: 1,

  },
  profileIconStyle: {
    alignItems: 'flex-start',
    marginRight: 310,
    marginTop: 30,
  },
  bellIcon: {
    marginTop: 30,
    alignItems: 'flex-end'
  }
});