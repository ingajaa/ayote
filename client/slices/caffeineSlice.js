import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  caffeineCount: 0
};

export const caffeineSlice = createSlice({
  name: 'caffeine',
  initialState,
  reducers: {
    setCaffeineCount: (state, action) => {
      state.caffeineCount = action.payload;
    },
    addCaffeine: (state, action) => {
      state.caffeineCount++;
    }
  }
});

export const { setCaffeineCount, addCaffeine } = caffeineSlice.actions;

export const selectCaffeineCount = (state) => {
  return state.caffeine.caffeineCount;
};
export const selectDailyCaffeineGoal = (state) => {
  return state.caffeine.dailyCaffeineGoal;
};

export default caffeineSlice.reducer;