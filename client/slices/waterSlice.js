import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  glasses: 0
};

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setGlasses: (state, action) => {
      state.glasses = action.payload;
    },
    addGlass: (state, action) => {
      state.glasses++;
    }
  }
});

export const {
  addGlass
} = waterSlice.actions;

export const selectGlasses = (state) => {
  return state.water.glasses;
};

export default waterSlice.reducer;
