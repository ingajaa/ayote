import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar, Colors } from 'react-native-paper';
import { useGetUserProfileQuery } from '../services/ayote';
import {
  selectDailyCaloriesGoal,
  setDailyCaloriesGoal,
  selectDailyProteinGoal,
  setDailyProteinGoal,
  selectDailyCarbsGoal,
  setDailyCarbsGoal,
  selectDailyFatGoal,
  setDailyFatGoal
} from '../slices/userProfileSlice';
import { useGetAllMealsQuery } from '../services/ayote';
import CircularProgress from 'react-native-circular-progress-indicator';

const MacroStats = () => {
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
      dispatch(setDailyCarbsGoal(targets.data[0].dailyCarbsGoal));
      dispatch(setDailyFatGoal(targets.data[0].dailyFatGoal));
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
  const dailyCarbsGoal = useSelector(selectDailyCarbsGoal);
  const dailyFatGoal = useSelector(selectDailyFatGoal);

  const formatNutritionValue = (value) => {
    return value ? value.toFixed(0) : value;
  };

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

  //const unconsumedCalories = dailyCaloriesGoal - consumedCalories;
  const unconsumedProtein = dailyProteinGoal - consumedProtein;
  const unconsumedCarbs = dailyCarbsGoal - consumedCarbs;
  const unconsumedFat = (dailyFatGoal - consumedFat).toFixed(2);

  const remainingCalories = consumedCalories - dailyCaloriesGoal;
  const remainingProtein = consumedProtein - dailyProteinGoal;
  const remainingCarbs = consumedCarbs - dailyCarbsGoal;
  const remainingFat = consumedFat - dailyFatGoal;

  const consumedMacroPercent = (consumed, goal) => {
    return consumed && goal ? +((consumed * 100) / (goal * 100)).toFixed(2) : 0;
  };
  return (
    <LinearGradient colors={['#FB7BA2', '#F6D285', '#F9D29D']} style={styles.container}>
      <View style={styles.caloriesSection}>
        <CircularProgress
          value={consumedCalories ? consumedCalories : 0}
          radius={50}
          maxValue={dailyCaloriesGoal > consumedCalories ? dailyCaloriesGoal : consumedCalories}
          activeStrokeColor={'#fff'}
          inActiveStrokeColor={'#000'}
          inActiveStrokeOpacity={0.2}
          fontSize={20}
          title={'kcal'}
          activeStrokeWidth={10}
          inActiveStrokeWidth={10}
        />
        <View>
          <LinearGradient colors={['#FB7BA2', '#F6D285', '#F9D29D']} style={styles.highlight}>
            <Text style={styles.caloriesSectionText}>Goal: {dailyCaloriesGoal} kcal</Text>
          </LinearGradient>
          <LinearGradient colors={['#FB7BA2', '#F6D285', '#F9D29D']} style={styles.highlight}>
            <Text style={styles.caloriesSectionText}>
              Delta: {remainingCalories > 0 ? '+' : ''}
              {formatNutritionValue(remainingCalories)} kcal
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.macrosSection}>
        <View style={styles.macrosSectionColumn}>
          <Text style={styles.macrosSectionText}>Protein</Text>
          <ProgressBar progress={consumedMacroPercent(consumedProtein, dailyProteinGoal)} color={'#fff'} style={styles.progressBar} />
          <Text style={styles.macrosSectionFooter}>
            {formatNutritionValue(consumedProtein)} / {formatNutritionValue(dailyProteinGoal)}
          </Text>
        </View>
        <View style={styles.macrosSectionColumn}>
          <Text style={styles.macrosSectionText}>Carbs</Text>
          <ProgressBar progress={consumedMacroPercent(consumedCarbs, dailyCarbsGoal)} color={'#fff'} style={styles.progressBar} />
          <Text style={styles.macrosSectionFooter}>
            {formatNutritionValue(consumedCarbs)} / {formatNutritionValue(dailyCarbsGoal)}
          </Text>
        </View>
        <View style={styles.macrosSectionColumn}>
          <Text style={styles.macrosSectionText}>Fat</Text>
          <ProgressBar progress={consumedMacroPercent(consumedFat, dailyFatGoal)} color={'#fff'} style={styles.progressBar} />
          <Text style={styles.macrosSectionFooter}>
            {formatNutritionValue(consumedFat)} / {formatNutritionValue(dailyFatGoal)}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default MacroStats;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginVertical: 10,
    borderRadius: 8
  },
  caloriesSection: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10
  },
  highlight: {
    justifyContent: 'center',
    borderRadius: 10 / 2,
    marginVertical: 5,
    opacity: 0.85
  },
  caloriesSectionText: {
    color: '#fff',
    marginVertical: 5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  macrosSection: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  macrosSectionColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  macrosSectionText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  macrosSectionFooter: {
    color: '#fff',
    fontWeight: 'bold'
  },
  progressBar: {
    height: 5,
    width: 90,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 6
  }
});
