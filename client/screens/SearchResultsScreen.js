import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Layout, List, ListItem, Divider, Button } from '@ui-kitten/components';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm, selectSearchTermResults, setSearchTermResults, selectSkip, setSkip } from '../slices/searchSlice';
import { useSearchAllFoodQuery } from '../services/spoonacular';
import SearchResultTile from '../components/SearchResultTile';

const SearchResultsScreen = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermResults = useSelector(selectSearchTermResults);
  const skip = useSelector(selectSkip);
  const dispatch = useDispatch();

  const onChange = (query) => dispatch(setSearchTerm(query));

  const { data, error, isLoading } = useSearchAllFoodQuery(searchTerm, { skip });
  if (data) {
    dispatch(setSearchTermResults(data));
    dispatch(setSkip(true));
  }

  const onSearchIconPress = () => {
    dispatch(setSkip(false));
  };

  const renderItem = ({ item }) => {
    return <SearchResultTile item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Searchbar placeholder="Search" onIconPress={onSearchIconPress} onChangeText={onChange} value={searchTerm} />
        <FlatList data={searchTermResults} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </Layout>
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create();
