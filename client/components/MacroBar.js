import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { useGetUserProfileQuery } from '../services/ayote';
import {
  selectDailyCaloriesGoal,
  setDailyCaloriesGoal,
  selectDailyProteinGoal,
  setDailyProteinGoal,
} from '../slices/userProfileSlice';
import { useGetAllMealsQuery } from '../services/ayote';
import CircularProgress from 'react-native-circular-progress-indicator';

const MacroBar = () => {
  const dispatch = useDispatch();
  const targets = useGetUserProfileQuery(1);
  const meals = useGetAllMealsQuery(1);
  const [consumedCalories, setConsumedCalories] = useState(0);
  const [consumedProtein, setConsumedProtein] = useState(0);
  const [consumedCarbs, setConsumedCarbs] = useState(0);
  const [consumedFat, setConsumedFat] = useState(0);

  useEffect(() => {
    if (targets.data && targets.data.length > 0) {
      dispatch(setDailyCaloriesGoal(targets.data[0].dailyCaloriesGoal));
      dispatch(setDailyProteinGoal(targets.data[0].dailyProteinGoal));
    }
    if (meals.data && meals.data.length > 0) {
      setConsumedCalories(aggregateConsumedCalories(meals.data)?.totalCalories);
      setConsumedProtein(aggregateConsumedProtein(meals.data)?.totalProtein);
      setConsumedCarbs(aggregateConsumedCarbs(meals.data)?.totalCarbs);
      setConsumedFat(aggregateConsumedFat(meals.data)?.totalFat);
    }
  }, [targets.data, meals.data]);

  const dailyCaloriesGoal = useSelector(selectDailyCaloriesGoal);
  const dailyProteinGoal = useSelector(selectDailyProteinGoal);

  const aggregateConsumedCalories = (meals) => {
    if (!meals.length) return { totalCalories: 0 };
    if (meals.length === 1) return { totalCalories: meals[0].totalCalories };
    return meals.reduce((a, b) => {
      return { totalCalories: +((a.totalCalories * 100 + b.totalCalories * 100) / 100).toFixed(0) };
    });
  };

  const aggregateConsumedProtein = (meals) => {
    if (!meals.length) return { totalProtein: 0 };
    if (meals.length === 1) return { totalProtein: meals[0].totalProtein };
    return meals.reduce((a, b) => {
      return { totalProtein: +((a.totalProtein * 100 + b.totalProtein * 100) / 100).toFixed(0) };
    });
  };

  const aggregateConsumedCarbs = (meals) => {
    if (!meals.length) return { totalCarbs: 0 };
    if (meals.length === 1) return { totalCarbs: meals[0].totalCarbs };
    return meals.reduce((a, b) => {
      return { totalCarbs: +((a.totalCarbs * 100 + b.totalCarbs * 100) / 100).toFixed(0) };
    });
  };

  const aggregateConsumedFat = (meals) => {
    if (!meals.length) return { totalFat: 0 };
    if (meals.length === 1) return { totalFat: meals[0].totalFat };
    return meals.reduce((a, b) => {
      return { totalFat: +((a.totalFat * 100 + b.totalFat * 100) / 100).toFixed(0) };
    });
  };

  return (
    <View style={styles.macroBarStyle}>
      <View style={styles.summarySection}>
        <Text style={styles.summarySectionText}>
          Calories ({consumedCalories}/{dailyCaloriesGoal} Kcal)
        </Text>
        <ProgressBar
        progress={consumedCalories && dailyCaloriesGoal ? +((consumedCalories * 100) / (dailyCaloriesGoal * 100)).toFixed(2) : 0}
        color={'#FFBF00'}
        style={styles.caloriesProgressBar}
        />
      </View>
      <View style={styles.summarySection}>
        <Text
        style={styles.summarySectionText}
        >
          Protein: ({consumedProtein}/{dailyProteinGoal})
          Carbs: ${consumedCarbs}
          Fat: ${consumedFat}
          </Text>
      </View>
      <View styles={styles.macrosSection}>
        <CircularProgress
          value={consumedProtein ? consumedProtein : 0}
          radius={25}
          maxValue={100}
          activeStrokeColor={'#355c7d'}
          inActiveStrokeColor={'#9b59b6'}
          inActiveStrokeOpacity={0.2}
          fontSize={12}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
        />
        <CircularProgress
          value={consumedCarbs ? consumedCarbs : 0}
          radius={25}
          maxValue={100}
          activeStrokeColor={'#c06c84'}
          inActiveStrokeColor={'#9b59b6'}
          inActiveStrokeOpacity={0.2}
          fontSize={12}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
        />
        <CircularProgress
          value={consumedFat ? consumedFat : 0}
          radius={25}
          maxValue={100}
          activeStrokeColor={'#f67280'}
          inActiveStrokeColor={'#9b59b6'}
          inActiveStrokeOpacity={0.2}
          fontSize={12}
          activeStrokeWidth={6}
          inActiveStrokeWidth={6}
        />
      </View>
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
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'left'
  },
  summarySection: {
    marginVertical: 5
  },
  caloriesProgressBar: {
    height: 15,
    width: 300,
    marginVertical: 5,
    borderRadius: 6
  },
  summarySectionText: {
    color: '#333432'
  },
  macrosSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
