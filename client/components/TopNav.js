import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Tab, TabBar } from '@ui-kitten/components';

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);


const TopNav = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <TabBar
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab style={styles.profileIconStyle} icon={PersonIcon} title='USERS'/>
    </TabBar>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  profileIconStyle: {
    alignItems: 'flex-start',
    marginRight: 300,
    marginTop: 20,
  }
});