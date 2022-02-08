import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBarComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchResultsScreen')} style={styles.container}>
      <View pointerEvents="none">
        <Searchbar placeholder="Search" style={styles.searchBar} />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginBottom: 15
  },
  searchBar: {
    borderRadius: 10,
    opacity: 0.8,
    shadowOpacity: 0
  }
});
