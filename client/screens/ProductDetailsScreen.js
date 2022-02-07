import React from 'react';
import { Layout, Text, Spinner, Card, Button } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import { useGetProductInformationQuery } from '../services/spoonacular';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectId,
  setId,
  selectName,
  setName,
  selectImage,
  setImage,
  selectCategory,
  setCategory,
  selectProteinPerServing,
  setProteinPerServing,
  selectCarbsPerServing,
  setCarbsPerServing,
  selectFatPerServing,
  setFatPerServing,
  selectCaloriesPerServing,
  setCaloriesPerServing
} from '../slices/currentItemSlice';

const Header = (props) => (
  <View {...props}>
    <Text category="h6">{props.data.name.toUpperCase()}</Text>
    <Text category="s1">(Product)</Text>
  </View>
);

const Footer = (props) => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Button style={styles.footerControl} size="small">
      TRACK
    </Button>
  </View>
);

const ProductDetailsScreen = () => {
  const currentItemId = useSelector(selectId);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductInformationQuery(currentItemId);
  if (data) {
    dispatch(setId(data.id));
    dispatch(setName(data.name));
    dispatch(setCategory('recipes'));
    dispatch(setImage(data.image));
    dispatch(setProteinPerServing(data.proteinPerServing));
    dispatch(setCarbsPerServing(data.carbsPerServing));
    dispatch(setFatPerServing(data.fatPerServing));
    dispatch(setCaloriesPerServing(data.caloriesPerServing));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Text>Ooops, we don't have nutrional information on this product</Text>
        ) : (
          <Card style={styles.card} header={<Header data={data} />} footer={<Footer data={data} />}>
            <Image style={styles.image} source={{ uri: data.image }} />
            <Text>Caloric Breakdown (per serving)</Text>
            <Text>Calories: {+data.caloriesPerServing.toFixed(2)}Kcal</Text>
            <Text>Protein: {+data.proteinPerServing.toFixed(2)}g</Text>
            <Text>Carbs: {+data.carbsPerServing.toFixed(2)}g</Text>
            <Text>Fat: {+data.fatPerServing.toFixed(2)}g</Text>
          </Card>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

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
