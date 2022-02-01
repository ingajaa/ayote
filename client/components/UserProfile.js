import React from 'react';
//import * as eva from '@eva-design/eva';
import { Layout, Text } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

const UserProfile = () => {
  return (
    <View>
      <Text style={styles.logoStyle}> 👤 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    backgroundColor: '#fff'
  }
});

export default UserProfile;
