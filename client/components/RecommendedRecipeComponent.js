import { StyleSheet, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from '@ui-kitten/components';
import { setId } from '../slices/currentItemSlice';
import { useDispatch } from 'react-redux';

const RecommendedRecipeComponent = ({ recipe }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setId(recipe.id));
      }}
    >
      <View>
        <LinearGradient colors={['#02aab0', '#00cdac']} style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendedRecipeComponent;

const styles = StyleSheet.create({
  recipeContainer: {
    borderWidth: 0,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 10
  },
  recipeTitle: {
    color: '#fff',
    marginHorizontal: 25,
    fontWeight: '500'
  }
});
