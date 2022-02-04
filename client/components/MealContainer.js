import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetAllMealsQuery } from '../services/ayote';

const MealContainer = () => {
  const { data, error, isLoading } = useGetAllMealsQuery();
  if (data) console.log(data);
  return (
    <>
      {data && data.length > 0 ? (
        data.map((meal) => (
          <View style={styles.mealContainerStyle} key={meal._id}>
            <Text>{meal.foodName}</Text>
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
    marginVertical: 20,
    paddingHorizontal: 101,
    paddingVertical: 40,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default MealContainer;
