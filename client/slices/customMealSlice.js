import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customMealAttributes: {
    foodName: null,
    foodCategory: 'custom',
    totalCalories: null,
    totalProtein: null,
    totalCarbs: null,
    totalFat: null,
    totalGrams: null
  }
};

export const customMealSlice = createSlice({
  name: 'customMeal',
  initialState,
  reducers: {
    setCustomMealAttributes: (state, action) => {
      state.customMealAttributes = { ...state.customMealAttributes, ...action.payload };
    }
  }
});

export const { setCustomMealAttributes } = customMealSlice.actions;

export const selectCustomMealAttributes = (state) => {
  return state.customMeal.customMealAttributes;
};

export default customMealSlice.reducer;
