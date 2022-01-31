import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = () => {
  return (
    <View><Text style={styles.logoStyle}> 👤 </Text></View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    backgroundColor: '#fff',
  },
})

export default UserProfile;
