import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Divider } from '@ui-kitten/components';

const SearchResultTile = ({ item }) => {
  return (
    <View>
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.metaInfo}>
          <Text style={styles.title}>{`${item.name.toUpperCase()}`}</Text>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
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
