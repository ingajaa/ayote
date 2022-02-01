import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TopNavigation, Text } from '@ui-kitten/components';

const TopNavBar = () => {
  return <TopNavigation title={(evaProps) => <Text {...evaProps}>👤</Text>} subtitle={(evaProps) => <Text {...evaProps}>My Profile</Text>} />;
};

export default TopNavBar;

const styles = StyleSheet.create({});
