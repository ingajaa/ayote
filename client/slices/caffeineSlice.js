import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cupCount: 0
};

export const coffeeSlice = createSlice({
  name: 'caffeine',
  initialState,
  reducers: {
    setCupCount: (state, action) => {
      state.cupCount = action.payload;
    },
    addCup: (state, action) => {
      state.cupCount++;
    }
  }
});

export const { setCupCount, addCup } = coffeeSlice.actions;

export const selectCupCount = (state) => {
  return state.caffeine.cupCount;
};

export default coffeeSlice.reducer;
