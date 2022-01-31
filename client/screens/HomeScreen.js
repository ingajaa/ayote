import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useSearchProductQuery } from '../services/spoonacular';
const HomeScreen = () => {
  const { data, error, isLoading } = useSearchProductQuery('pizza');
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Oops, an error occured</Text>;
  }
  return (
    <SafeAreaView>
      <View>
        {console.log(data)}
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
