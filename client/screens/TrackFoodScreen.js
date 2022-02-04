import { Layout, Text, Spinner, Card, Button, Input } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAddMealMutation } from '../services/ayote';
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
  selectProteinPerGram,
  setProteinPerGram,
  selectCarbsPerGram,
  setCarbsPerGram,
  selectFatPerGram,
  setFatPerGram,
  selectCaloriesPerGram,
  setCaloriesPerGram,
  selectTrackedCalories,
  setTrackedCalories,
  selectTrackedProtein,
  setTrackedProtein,
  selectTrackedCarbs,
  setTrackedCarbs,
  selectTrackedFat,
  setTrackedFat,
  selectTrackedGrams,
  setTrackedGrams
} from '../slices/currentItemSlice';

const TrackFoodScreen = () => {
  const dispatch = useDispatch();
  const caloriesPerGram = useSelector(selectCaloriesPerGram);
  const proteinPerGram = useSelector(selectProteinPerGram);
  const carbsPerGram = useSelector(selectCarbsPerGram);
  const fatPerGram = useSelector(selectFatPerGram);
  const trackedGrams = useSelector(selectTrackedGrams);
  const trackedCalories = useSelector(selectTrackedCalories);
  const trackedProtein = useSelector(selectTrackedProtein);
  const trackedCarbs = useSelector(selectTrackedCarbs);
  const trackedFat = useSelector(selectTrackedFat);
  const foodId = useSelector(selectId);
  const foodName = useSelector(selectName);
  const foodCategory = useSelector(selectCategory);

  const [addMeal, result] = useAddMealMutation();

  const navigation = useNavigation();

  const onChange = (query) => {
    dispatch(setTrackedGrams(query));
    dispatch(setTrackedCalories(+(caloriesPerGram * query).toFixed(2)));
    dispatch(setTrackedProtein(+(proteinPerGram * query).toFixed(2)));
    dispatch(setTrackedCarbs(+(carbsPerGram * query).toFixed(2)));
    dispatch(setTrackedFat(+(fatPerGram * query).toFixed(2)));
  };

  const onButtonPress = () => {
    const body = {
      userId: 1,
      foodId,
      foodName,
      foodCategory,
      imageUrl: 'test',
      totalCalories: trackedCalories,
      totalProtein: trackedProtein,
      totalCarbs: trackedCarbs,
      totalFat: trackedFat,
      totalGrams: trackedGrams
    };
    addMeal(body);
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={styles.container} level="1">
        <Text>{foodName.toUpperCase()}</Text>
        <Input style={styles.input} placeholder="Quantity in grams" value={trackedGrams} onChangeText={onChange} />
        <Text>Calories: {trackedCalories}</Text>
        <Text>Protein: {trackedProtein}</Text>
        <Text>Carbs: {trackedCarbs}</Text>
        <Text>Fat: {trackedFat}</Text>
        <Button style={styles.submit} size="medium" onPress={onButtonPress}>
          ADD
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default TrackFoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  input: {
    borderColor: '#696a6b',
    marginBottom: 20,
    marginTop: 20
  },
  submit: {
    marginTop: 20
  }
});
