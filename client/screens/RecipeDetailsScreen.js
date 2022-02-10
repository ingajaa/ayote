import React, { useEffect, useState, useRef } from 'react';
import { Layout, Text, Spinner, Card, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View, Image, ScrollView } from 'react-native';
import { useGetRecipeInformationQuery } from '../services/spoonacular';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useGetSimilarRecipesQuery } from '../services/spoonacular';
import RecommendedRecipe from '../components/RecommendedRecipeComponent';
import BackTopNav from '../components/BackTopNav';
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
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
    style={styles.footerControl}
    size="medium" status='basic'
    onPress={() => props.navigation.navigate('TrackFoodScreen')}
    >
      TRACK
    </Button>
  </View>
);

const RecipeDetailsScreen = () => {
  const currentItemId = useSelector(selectId);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = useRef();

  const { data, error, refetch, isLoading } = useGetRecipeInformationQuery(currentItemId, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
  const similarRecipesQuery = useGetSimilarRecipesQuery(currentItemId, { refetchOnMountOrArgChange: true, refetchOnReconnect: true, refetchOnFocus: true });
  const [similarRecipes, setSimilarRecipes] = useState([]);

  useEffect(() => {
    if (data) {
      dispatch(setName(data.name));
      dispatch(setCategory('recipes'));
      dispatch(setImage(data.image));
      dispatch(setProteinPerGram(data.proteinPerGram));
      dispatch(setCarbsPerGram(data.carbsPerGram));
      dispatch(setFatPerGram(data.fatPerGram));
      dispatch(setCaloriesPerGram(data.caloriesPerGram));
    }
    if (similarRecipesQuery.data && similarRecipesQuery.data.length > 0) {
      setSimilarRecipes(similarRecipesQuery.data);
    }
  }, [data, similarRecipesQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <BackTopNav />
      <ScrollView ref={scrollRef}>
        <Layout style={styles.layout}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Card
              style={styles.card}
              header={<Header data={data} />}
              footer={<Footer data={data}
              navigation={navigation} />}
              >
                <Image style={styles.image} source={{ uri: data.image }} />
                <Text>Caloric Breakdown (100g)</Text>
                <Text>Calories: {+(data.caloriesPerGram * 100).toFixed(2)}Kcal</Text>
                <Text>Protein: {+(data.proteinPerGram * 100).toFixed(2)}g</Text>
                <Text>Carbs: {+(data.carbsPerGram * 100).toFixed(2)}g</Text>
                <Text>Fat: {+(data.fatPerGram * 100).toFixed(2)}g</Text>
              </Card>
              {similarRecipes.length > 0 && (
                <View style={styles.similarRecipesContainer}>
                  <Text category="h6" style={styles.similarRecipesHeading}>
                    Similar Recipes ({similarRecipes.length})
                  </Text>
                  {similarRecipes.map((recipe) => {
                    return <RecommendedRecipe key={recipe.id} recipe={recipe} />;
                  })}
                </View>
              )}
            </>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#151515'
  },
  container: {
    flex: 1,
    backgroundColor: '#151515'
  },
  similarRecipesContainer: {
    flex: 1,
    width: '85%'
  },
  card: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    width: '85%'
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  footerControl: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'black'
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 190
  },
  similarRecipesHeading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff'
  }
});
