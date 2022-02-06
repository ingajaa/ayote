import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetAllMealsQuery } from '../services/ayote';

const MealContainer = () => {
  const { data, error, isLoading } = useGetAllMealsQuery();
  return (
    <>
      {data && data.length > 0 ? (
        data.map((meal) => (
          <View style={styles.mealContainerStyle} key={meal._id}>
            <Text style={styles.mealTitle}>{meal.foodName}</Text>
            <Text>Calories: {meal.totalCalories}</Text>
            <Text>Protein: {meal.totalProtein}</Text>
            <Text>Carbs: {meal.totalCarbs}</Text>
            <Text>Fat: {meal.totalFat}</Text>
          </View>
        ))
      ) : (
        <Text>You are not tracking any meal...</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mealContainerStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center'
  },
  mealTitle: {
    fontWeight: 'bold'
  }
});

export default MealContainer;
