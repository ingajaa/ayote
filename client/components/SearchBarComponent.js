import React, { useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBarComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchResultsScreen')}>
      <Searchbar placeholder="Search" />
    </TouchableOpacity>
  );
};

export default SearchBarComponent;
