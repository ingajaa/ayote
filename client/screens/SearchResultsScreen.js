import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Layout, List, ListItem, Divider, Button } from '@ui-kitten/components';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm, selectSearchTermResults, setSearchTermResults, selectSkip, setSkip } from '../slices/searchSlice';
import { useSearchRecipesQuery } from '../services/spoonacular';
import SearchResultTile from '../components/SearchResultTile';

const SearchResultsScreen = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermResults = useSelector(selectSearchTermResults);
  const skip = useSelector(selectSkip);
  const dispatch = useDispatch();

  const onChange = (query) => dispatch(setSearchTerm(query));

  const { data, error, isLoading } = useSearchRecipesQuery(searchTerm, { skip });

  if (data) {
    dispatch(setSearchTermResults(data));
    dispatch(setSkip(true));
  }

  if (error) console.log(error);

  const onSearchIconPress = () => {
    dispatch(setSkip(false));
  };

  const renderItem = ({ item }) => {
    return <SearchResultTile item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Searchbar style={styles.searchBar} placeholder="Search" onIconPress={onSearchIconPress} onChangeText={onChange} value={searchTerm} />
        <FlatList data={searchTermResults} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </Layout>
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#F5F5F5',
    shadowColor: '#FFFFFF',
  }
});
