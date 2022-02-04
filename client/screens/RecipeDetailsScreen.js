import React from 'react';
import { Layout, Text, Spinner, Card, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { useGetRecipeInformationQuery } from '../services/spoonacular';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  selectId,
  setId,
  selectName,
  setName,
  selectImage,
  setImage,
  selectCategory,
  setCategory,
  selectProteinPerGram,
  setProteinPerGram,
  selectCarbsPerGram,
  setCarbsPerGram,
  selectFatPerGram,
  setFatPerGram,
  selectCaloriesPerGram,
  setCaloriesPerGram
} from '../slices/currentItemSlice';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">{props.data.name.toUpperCase()}</Text>
    <Text category="s1">(Recipe)</Text>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button style={styles.footerControl} size="medium" onPress={() => props.navigation.navigate('TrackFoodScreen')}>
      TRACK
    </Button>
  </View>
);

const RecipeDetailsScreen = () => {
  const currentItemId = useSelector(selectId);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { data, error, isLoading } = useGetRecipeInformationQuery(currentItemId);
  if (data) {
    console.log(data);
    dispatch(setId(data.id));
    dispatch(setName(data.name));
    dispatch(setCategory('recipes'));
    dispatch(setImage(data.image));
    dispatch(setProteinPerGram(data.proteinPerGram));
    dispatch(setCarbsPerGram(data.carbsPerGram));
    dispatch(setFatPerGram(data.fatPerGram));
    dispatch(setCaloriesPerGram(data.caloriesPerGram));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Card style={styles.card} header={<Header data={data} />} footer={<Footer data={data} navigation={navigation} />}>
            <Image style={styles.image} source={{ uri: data.image }} />
            <Text>Caloric Breakdown (100g)</Text>
            <Text>Calories: {+(data.caloriesPerGram * 100).toFixed(2)}Kcal</Text>
            <Text>Protein: {+(data.proteinPerGram * 100).toFixed(2)}g</Text>
            <Text>Carbs: {+(data.carbsPerGram * 100).toFixed(2)}g</Text>
            <Text>Fat: {+(data.fatPerGram * 100).toFixed(2)}g</Text>
          </Card>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    margin: 2,
    alignItems: 'center'
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerControl: {
    marginHorizontal: 2
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 190
  }
});
