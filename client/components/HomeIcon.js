import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

const HomeIcon = () => (
  <Icon
    style={styles.icon}
    fill='#8F9BB3'
    name='home'
  />
);

export default HomeIcon;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});