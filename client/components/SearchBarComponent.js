import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBarComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchResultsScreen')} style={styles.container}>
      <View pointerEvents="none">
        <Searchbar placeholder="Search" />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: { alignSelf: 'stretch', paddingHorizontal: 10 }
});
