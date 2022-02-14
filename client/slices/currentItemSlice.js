import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  category: null,
  proteinPerGram: null,
  carbsPerGram: null,
  fatPerGram: null,
  caloriesPerGram: null,
  proteinPerServing: null,
  carbsPerServing: null,
  fatPerServing: null,
  caloriesPerServing: null,
  image: null,
  trackedCalories: null,
  trackedProtein: null,
  trackedCarbs: null,
  trackedFat: null,
  trackedGrams: null
};

export const currentItemSlice = createSlice({
  name: 'currentItem',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setProteinPerGram: (state, action) => {
      state.proteinPerGram = action.payload;
    },
    setCarbsPerGram: (state, action) => {
      state.carbsPerGram = action.payload;
    },
    setFatPerGram: (state, action) => {
      state.fatPerGram = action.payload;
    },
    setCaloriesPerGram: (state, action) => {
      state.caloriesPerGram = action.payload;
    },
    setProteinPerServing: (state, action) => {
      state.proteinPerServing = action.payload;
    },
    setCarbsPerServing: (state, action) => {
      state.carbsPerServing = action.payload;
    },
    setFatPerServing: (state, action) => {
      state.fatPerServing = action.payload;
    },
    setCaloriesPerServing: (state, action) => {
      state.caloriesPerServing = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setTrackedCalories: (state, action) => {
      state.trackedCalories = action.payload;
    },
    setTrackedProtein: (state, action) => {
      state.trackedProtein = action.payload;
    },
    setTrackedCarbs: (state, action) => {
      state.trackedCarbs = action.payload;
    },
    setTrackedFat: (state, action) => {
      state.trackedFat = action.payload;
    },
    setTrackedGrams: (state, action) => {
      state.trackedGrams = action.payload;
    }
  }
});

export const {
  setId,
  setName,
  setCategory,
  setProteinPerGram,
  setCarbsPerGram,
  setFatPerGram,
  setCaloriesPerGram,
  setProteinPerServing,
  setCarbsPerServing,
  setFatPerServing,
  setCaloriesPerServing,
  setImage,
  setTrackedCalories,
  setTrackedProtein,
  setTrackedCarbs,
  setTrackedFat,
  setTrackedGrams
} = currentItemSlice.actions;

export const selectId = (state) => {
  return state.currentItem.id;
};

export const selectName = (state) => {
  return state.currentItem.name;
};

export const selectCategory = (state) => {
  return state.currentItem.category;
};

export const selectProteinPerGram = (state) => {
  return state.currentItem.proteinPerGram;
};

export const selectCarbsPerGram = (state) => {
  return state.currentItem.carbsPerGram;
};

export const selectFatPerGram = (state) => {
  return state.currentItem.fatPerGram;
};

export const selectCaloriesPerGram = (state) => {
  return state.currentItem.caloriesPerGram;
};

export const selectProteinPerServing = (state) => {
  return state.currentItem.proteinPerServing;
};

export const selectCarbsPerServing = (state) => {
  return state.currentItem.carbsPerServing;
};

export const selectFatPerServing = (state) => {
  return state.currentItem.fatPerServing;
};

export const selectCaloriesPerServing = (state) => {
  return state.currentItem.caloriesPerServing;
};

export const selectImage = (state) => {
  return state.currentItem.image;
};

export const selectTrackedCalories = (state) => {
  return state.currentItem.trackedCalories;
};

export const selectTrackedProtein = (state) => {
  return state.currentItem.trackedProtein;
};

export const selectTrackedCarbs = (state) => {
  return state.currentItem.trackedCarbs;
};

export const selectTrackedFat = (state) => {
  return state.currentItem.trackedFat;
};

export const selectTrackedGrams = (state) => {
  return state.currentItem.trackedGrams;
};

export default currentItemSlice.reducer;
