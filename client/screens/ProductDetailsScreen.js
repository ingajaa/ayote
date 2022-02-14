import React from 'react';
import { Layout, Text, Spinner, Card, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  selectId,
  selectName,
  selectImage,
  selectCategory,
  selectProteinPerGram,
  selectCarbsPerGram,
  selectFatPerGram,
  selectCaloriesPerGram
} from '../slices/currentItemSlice';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">{props.name.toUpperCase()}</Text>
    <Text category="s1"></Text>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button
    style={styles.footerControl}
    size="medium"
    status='basic'
    onPress={() => props.navigation.navigate('TrackFoodScreen')}
    >
      TRACK
    </Button>
  </View>
);

const ProductDetailsScreen = () => {
  const navigation = useNavigation();

  const currentItemId = useSelector(selectId);
  const name = useSelector(selectName);
  const category = useSelector(selectCategory);
  const proteinPerGram = useSelector(selectProteinPerGram);
  const carbsPerGram = useSelector(selectCarbsPerGram);
  const fatPerGram = useSelector(selectFatPerGram);
  const caloriesPerGram = useSelector(selectCaloriesPerGram);
  const image = useSelector(selectImage);

  const macroPer100Grams = (macro) => {
    return +(macro * 100).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Card
        style={styles.card}
        header={<Header name={name} />}
        footer={<Footer navigation={navigation} />}
        >
           <View style={styles.nutritionInfo}>
          <Image style={styles.image} source={{ uri: image }} />
          <Text style={styles.caloricBreakdown}>Caloric Breakdown (100g)</Text>
          <Text style={styles.calories}>Calories: {macroPer100Grams(caloriesPerGram)}Kcal</Text>
          <Text style={styles.protein}>Protein: {macroPer100Grams(proteinPerGram)}g</Text>
          <Text style={styles.carbs}>Carbs: {macroPer100Grams(carbsPerGram)}g</Text>
          <Text style={styles.fat}>Fat: {macroPer100Grams(fatPerGram)}g</Text>
          </View>
        </Card>
      </Layout>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

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
    width: '85%',
    marginVertical: 20
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
nutritionInfo: {
  borderWidth: 1,
  borderColor: 'lightgrey',
  borderRadius: 5,
  backgroundColor: '#151515',
  paddingHorizontal: 20,
  paddingVertical: 40
},
  footerControl: {
    marginHorizontal: 2,
    borderColor: 'grey',
    marginTop: 20
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 190,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  similarRecipesHeading: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff'
  },
  caloricBreakdown: {
    textAlign: 'center',
    marginTop: 30,
    color: '#fff'
  },
  calories: {
    textAlign: 'center',
    color: '#fff'
  },
  protein: {
    textAlign: 'center',
    color: '#fff'
  },
  carbs: {
    textAlign: 'center',
    color: '#fff'
  },
  fat: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  }
});
