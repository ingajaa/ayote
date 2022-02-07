import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useGetAllMealsQuery } from '../services/ayote';

const MealContainer = () => {
  const { data, error, isLoading } = useGetAllMealsQuery();
  const renderItem = ({ item }) => {
    return (
      <View style={styles.mealContainerStyle} key={item._id}>
        <Text style={styles.mealTitle}>{item.foodName}</Text>
        <Text>Calories: {item.totalCalories}</Text>
        <Text>Protein: {item.totalProtein}</Text>
        <Text>Carbs: {item.totalCarbs}</Text>
        <Text>Fat: {item.totalFat}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label} category="label">
        Your Meals
      </Text>
      {data && data.length > 0 ? <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} /> : <Text style={styles.text}>You are not tracking any meal..</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%'
  },
  mealContainerStyle: {
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTitle: {
    fontWeight: 'bold'
  },
  text: {
    color: '#fff',
    textAlign: 'center'
  },
  label: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 10
  }
});

export default MealContainer;
