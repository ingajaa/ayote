import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSearchResult } from '../slices/searchSlice';
import { useNavigation } from '@react-navigation/native';

const SearchResultTile = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectRoute = (category) => {
    if (category === 'products') return 'ProductDetailsScreen';
    if (category === 'simpleFoods') return 'SimpleFoodDetailsScreen';
    if (category === 'recipes') return 'RecipeDetailsScreen';
    if (category === 'menuItems') return 'MenuItemDetailsScreen';
  };

  return (
    <>
      {item && (
        <View>
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
              dispatch(setSelectedSearchResult(item));
              console.log(item);
              navigation.navigate(selectRoute(item.category));
            }}
          >
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{`${item.name.toUpperCase()}`}</Text>
            </View>
          </TouchableOpacity>
          <Divider />
        </View>
      )}
    </>
  );
};

export default SearchResultTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 300,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    alignSelf: 'stretch',
    padding: 10
  }
});
