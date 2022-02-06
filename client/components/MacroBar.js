import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserProfileQuery } from '../services/ayote';
import { selectDailyCaloriesGoal, setDailyCaloriesGoal } from '../slices/userProfileSlice';
import { useGetAllMealsQuery } from '../services/ayote';

const MacroBar = () => {
  const dispatch = useDispatch();
  const targets = useGetUserProfileQuery(1);
  const meals = useGetAllMealsQuery(1);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [consumedProtein, setConsumedProtein] = useState(0);
  const [consumedcarbs, setConsumedCarbs] = useState(0);
  const [consumedFat, setConsumedFat] = useState(0);

  useEffect(() => {
    if (targets.data && targets.data.length > 0) {
      dispatch(setDailyCaloriesGoal(targets.data[0].dailyCaloriesGoal));
    }
    if (meals.data && meals.data.length > 0) {
      setConsumedCalories(aggregateConsumedCalories(meals.data));
      setConsumedProtein(aggregateConsumedProtein(meals.data));
      setConsumedCarbs(aggregateConsumedCarbs(meals.data));
      setConsumedFat(aggregateConsumedFat(meals.data));
    }
  }, [targets.data, meals.data]);

  const dailyCaloriesGoal = useSelector(selectDailyCaloriesGoal);

  const aggregateConsumedCalories = (meals) => {
    if (!meals.length) return 0;
    if (meals.length === 1) return meals[0].totalCalories;
    return meals.reduce((a, b) => {
      return +((a.totalCalories * 100 + b.totalCalories * 100) / 100).toFixed(0);
    });
  };

  const aggregateConsumedProtein = (meals) => {
    if (!meals.length) return 0;
    if (meals.length === 1) return meals[0].totalProtein;
    return meals.reduce((a, b) => {
      return +((a.totalProtein * 100 + b.totalProtein * 100) / 100).toFixed(0);
    });
  };

  const aggregateConsumedCarbs = (meals) => {
    if (!meals.length) return 0;
    if (meals.length === 1) return meals[0].totalCarbs;
    return meals.reduce((a, b) => {
      return +((a.totalCarbs * 100 + b.totalCarbs * 100) / 100).toFixed(0);
    });
  };

  const aggregateConsumedFat = (meals) => {
    if (!meals.length) return 0;
    if (meals.length === 1) return meals[0].totalFat;
    return meals.reduce((a, b) => {
      return +((a.totalFat * 100 + b.totalFat * 100) / 100).toFixed(0);
    });
  };

  return (
    <View style={styles.macroBarStyle}>
      <Text>
        Calories: {consumedCalories}/{dailyCaloriesGoal}
      </Text>
      <Text>{`Protein: ${consumedProtein}  Carbs: ${consumedcarbs} Fat: ${consumedFat}`}</Text>
    </View>
  );
};

export default MacroBar;

const styles = StyleSheet.create({
  macroBarStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 20,
    width: '85%',
    paddingVertical: 45,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center'
  }
});
