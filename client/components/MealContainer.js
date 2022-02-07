import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Button, Card, Modal } from '@ui-kitten/components';
import { useGetAllMealsQuery } from '../services/ayote';
import { useNavigation } from '@react-navigation/native';

const MealContainer = () => {
  const navigation = useNavigation();
  const { data, error, isLoading } = useGetAllMealsQuery();
  const [visible, setVisible] = React.useState(false);
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
      <View style={styles.header}>
        <Text style={styles.label} category="label">
          Your Meals
        </Text>
        <Button style={styles.customMealButton} size="small" status="success" onPress={() => setVisible(true)}>
          Add
        </Button>
        <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
            <Button
              style={styles.modalButton}
              onPress={() => {
                setVisible(false);
                navigation.navigate('SearchResultsScreen');
              }}
            >
              SEARCH ITEM
            </Button>
            <Button style={styles.modalButton} onPress={() => setVisible(false)}>
              ADD CUSTOM MEAL
            </Button>
            <Button style={styles.modalButton} onPress={() => setVisible(false)}>
              SCAN BARCODE
            </Button>
          </Card>
        </Modal>
      </View>
      {data && data.length > 0 ? <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} /> : <Text style={styles.text}>You are not tracking any meal..</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  customMealButton: {
    borderRadius: 100
  },
  modalButton: {
    marginVertical: 5
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
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default MealContainer;
