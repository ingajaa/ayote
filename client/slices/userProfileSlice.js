import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  dailyGlassCountGoal: null,
  dailyCaloriesGoal: null,
  dailyCaffeineCountGoal: null
};

export const waterSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setDailyCaloriesGoal: (state, action) => {
      state.dailyCaloriesGoal = action.payload;
    },
    setDailyGlassCountGoal: (state, action) => {
      state.dailyGlassCountGoal = action.payload;
    },
    setDailyCaffeineCountGoal: (state, action) => {
      state.dailyCaffeineCountGoal = action.payload;
    }
  }
});

export const { setUserId, setDailyCaloriesGoal, setDailyGlassCountGoal, setDailyCaffeineCountGoal } = waterSlice.actions;

export const selectUserId = (state) => {
  return state.userProfile.userId;
};

export const selectDailyCaloriesGoal = (state) => {
  return state.userProfile.dailyCaloriesGoal;
};

export const selectDailyGlassCountGoal = (state) => {
  return state.userProfile.dailyGlassCountGoal;
};

export const selectDailyCaffeineCountGoal = (state) => {
  return state.userProfile.dailyCaffeineCountGoal;
};

export default waterSlice.reducer;
