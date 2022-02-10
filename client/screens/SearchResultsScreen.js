import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm, setSearchTerm, selectSearchTermResults, setSearchTermResults, selectSkip, setSkip } from '../slices/searchSlice';
import { useSearchRecipesQuery } from '../services/spoonacular';
import SearchResultTile from '../components/SearchResultTile';
import { useNavigation } from '@react-navigation/native';

const SearchResultsScreen = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const searchTermResults = useSelector(selectSearchTermResults);
  const skip = useSelector(selectSkip);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const onBackPress = () => {
    dispatch(setSearchTerm(null));
    dispatch(setSearchTermResults(null));
    navigation.pop();
  };

  const renderItem = ({ item }) => {
    return <SearchResultTile item={item} />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#151515' }}>
      <Layout style={styles.background}>
        <View style={styles.backTopNav}>
          <TouchableOpacity onPress={onBackPress}>
            <Icon fill={'#fff'} name={'arrow-back-outline'} style={styles.backIcon} />
          </TouchableOpacity>
          <Searchbar style={styles.searchBar} placeholder="Search" onIconPress={onSearchIconPress} onChangeText={onChange} value={searchTerm} />
        </View>
        <FlatList data={searchTermResults} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </Layout>
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#151515'
  },
  searchBar: {
    backgroundColor: '#F5F5F5',
    shadowColor: '#FFFFFF',
    borderColor: '#000',
    borderWidth: 0.3,
    marginLeft: 5,
    marginRight: 20,
    marginTop: 30
  },
  backTopNav: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30
  },
  backIcon: {
    width: 26,
    height: 26,
    marginTop: 30
  }
});
