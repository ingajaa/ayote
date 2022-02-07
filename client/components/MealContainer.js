import React, { useState } from 'react';
import { Animated, View, StyleSheet, FlatList } from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, Button, Card, Modal, useTheme } from '@ui-kitten/components';
import { useGetAllMealsQuery } from '../services/ayote';
import { useDeleteMealMutation } from '../services/ayote';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const MealContainer = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { data, error, isLoading } = useGetAllMealsQuery();
  const [deleteMeal, results] = useDeleteMealMutation();
  const [visible, setVisible] = React.useState(false);

  const onSwipePress = async (itemId) => {
    await deleteMeal(itemId);
  };

  const renderRightActions = (progress, dragX, itemId) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={[styles.swipedRow]}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onSwipePress(itemId)}>
          <Animated.View>
            <Text style={styles.deleteButtonText}>Confirm Deletion</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item._id)}>
        <LinearGradient colors={['#D16BA5', '#86A8E7', '#5FFBF1']} style={styles.mealContainerStyle} key={item._id}>
          <Text style={styles.mealTitle}>{item.foodName}</Text>
          <Text style={styles.macros}>Calories: {item.totalCalories}</Text>
          <Text style={styles.macros}>Protein: {item.totalProtein}</Text>
          <Text style={styles.macros}>Carbs: {item.totalCarbs}</Text>
          <Text style={styles.macros}>Fat: {item.totalFat}</Text>
        </LinearGradient>
      </Swipeable>
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
            <Button
              style={styles.modalButton}
              onPress={() => {
                setVisible(false);
                navigation.navigate('TrackCustomMealScreen');
              }}
            >
              ADD CUSTOM MEAL
            </Button>
            <Button
              style={styles.modalButton}
              onPress={() => {
                setVisible(false);
                navigation.navigate('BarcodeScannerScreen');
              }}
            >
              SCAN BARCODE
            </Button>
          </Card>
        </Modal>
      </View>
      {data && data.length > 0 ? (
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} />
      ) : (
        <Text style={styles.text}>You are not tracking any meal..</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    marginBottom: 60
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
    borderWidth: 0,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mealTitle: {
    fontWeight: 'bold',
    color: '#fff'
  },
  macros: {
    color: '#fff'
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
  },
  swipedRow: {
    width: '100%',
    backgroundColor: '#FF3D71',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'column',
    padding: 10
  },
  swipedConfirmationContainer: {
    flex: 1
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold'
  },
  deleteButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  deleteButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    padding: 3
  }
});

export default MealContainer;
