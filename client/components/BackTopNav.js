import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const BackTopNav = ({ backgroundColor, iconFill }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.backTopNav, backgroundColor]}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Icon fill={iconFill || '#fff'} name={'arrow-back-outline'} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default BackTopNav;

const styles = StyleSheet.create({
  backTopNav: {
    // backgroundColor: '#fe615a',
    width: '100%',
    paddingHorizontal: 30
  },
  backIcon: {
    width: 26,
    height: 26,
    marginTop: 30
  }
});
