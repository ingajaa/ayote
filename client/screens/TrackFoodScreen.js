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
    dispatch(setCaloriesPerGram(null))
    dispatch(setProteinPerGram(null))
    dispatch(setCarbsPerGram(null))
    dispatch(setFatPerGram(null))
    dispatch(setTrackedGrams(null))
    dispatch(setTrackedCalories(null))
    dispatch(setTrackedProtein(null))
    dispatch(setTrackedCarbs(null))
    dispatch(setTrackedFat(null))
    dispatch(setId(null))
    dispatch(setName(null))
    dispatch(setCategory(null))
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#151515' }}>
      <Layout style={styles.container} level="1">
        <Text style={styles.foodName}>{foodName?.toUpperCase()}</Text>
        <Input style={styles.input} placeholder="Quantity in grams" value={trackedGrams} onChangeText={onChange} />
        <Text style={styles.caloriesText} >Calories: {trackedCalories}</Text>
        <Text style={styles.proteinText} >Protein: {trackedProtein}</Text>
        <Text style={styles.carbsText}>Carbs: {trackedCarbs}</Text>
        <Text style={styles.fatText}>Fat: {trackedFat}</Text>
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
    paddingHorizontal: 30,
    backgroundColor: '#151515'
  },
  foodName: {
    color: '#fff'
  },
  input: {
    borderColor: '#696a6b',
    marginBottom: 20,
    marginTop: 20
  },
  submit: {
    marginTop: 20
  },
  caloriesText: {
    color: '#fff'
  },
  proteinText: {
    color: '#fff'
  },
  carbsText: {
    color: '#fff'
  },
  fatText: {
    color: '#fff'
  }
});
