import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import BackTopNav from '../components/BackTopNav';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCustomMealAttributes, selectCustomMealAttributes } from '../slices/customMealSlice';
import { useAddMealMutation } from '../services/ayote';

const TrackCustomMealScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const customMeal = useSelector(selectCustomMealAttributes);
  const [addMeal, result] = useAddMealMutation();

  const onChange = (value, input) => {
    if (input === 'name') dispatch(setCustomMealAttributes({ foodName: value }));
    if (input === 'quantity') dispatch(setCustomMealAttributes({ totalGrams: Number(value) }));
    if (input === 'calories') dispatch(setCustomMealAttributes({ totalCalories: Number(value) }));
    if (input === 'protein') dispatch(setCustomMealAttributes({ totalProtein: Number(value) }));
    if (input === 'carbs') dispatch(setCustomMealAttributes({ totalCarbs: Number(value) }));
    if (input === 'fat') dispatch(setCustomMealAttributes({ totalFat: Number(value) }));
  };

  const onPress = async () => {
    const body = {
      userId: 1,
      ...customMeal
    };
    await addMeal(body);

    // Reset form
    dispatch(
      setCustomMealAttributes({
        foodName: null,
        foodCategory: 'custom',
        totalCalories: null,
        totalProtein: null,
        totalCarbs: null,
        totalFat: null,
        totalGrams: null
      })
    );

    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackTopNav backgroundColor={'#fe615a'} />
      <Layout style={styles.container} level="1">
        <Text style={styles.text} category="label">
          MEAL NAME
        </Text>
        <Input style={styles.input} placeholder="Enter meal name" onChangeText={(value) => onChange(value, 'name')} />
        <Text style={styles.text} category="label">
          QUANTITY
        </Text>
        <Input style={styles.input} placeholder="Enter meal quantity in grams" onChangeText={(value) => onChange(value, 'quantity')} />
        <Text style={styles.text} category="label">
          TOTAL CALORIES
        </Text>
        <Input style={styles.input} placeholder="Enter total calories in Kcal" onChangeText={(value) => onChange(value, 'calories')} />
        <Text style={styles.text} category="label">
          TOTAL PROTEIN
        </Text>
        <Input style={styles.input} placeholder="Enter total protein in grams" onChangeText={(value) => onChange(value, 'protein')} />
        <Text style={styles.text} category="label">
          TOTAL CARBS
        </Text>
        <Input style={styles.input} placeholder="Enter total carbs in grams" onChangeText={(value) => onChange(value, 'carbs')} />
        <Text style={styles.text} category="label">
          TOTAL FAT
        </Text>
        <Input style={styles.input} placeholder="Enter total fat in grams" onChangeText={(value) => onChange(value, 'fat')} />
        <Button style={styles.submit} size="medium" onPress={onPress}>
          ADD MEAL
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default TrackCustomMealScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fe615a'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fe615a'
  },
  input: {
    marginBottom: 20,
    marginTop: 20
  },
  submit: {
    marginTop: 20,
    backgroundColor: '#fe908c',
    borderWidth: 0
  },
  text: { marginTop: 3, color: '#fff' }
});
