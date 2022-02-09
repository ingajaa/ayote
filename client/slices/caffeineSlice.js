import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  glassCount: 0,
  dailyGlassGoal: null
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setGlassCount: (state, action) => {
      state.glassCount = action.payload;
    },
    setDailyGlassGoal: (state, action) => {
      state.dailyGlassGoal = action.payload;
    },
    addGlass: (state, action) => {
      state.glassCount++;
    }
  }
});

export const { setGlassCount, addGlass, setDailyGlassGoal } = waterSlice.actions;

export const selectGlassCount = (state) => {
  return state.water.glassCount;
};
export const selectDailyGlassGoal = (state) => {
  return state.water.dailyGlassGoal;
};

export default waterSlice.reducer;