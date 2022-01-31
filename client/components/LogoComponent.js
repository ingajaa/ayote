import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogoComponent = () => {
  return (
    <View><Text style={styles.logoStyle}> AYOTE </Text></View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#ff007f',
    fontSize: 16,
    paddingVertical: 15
  },
})

export default LogoComponent;
