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
  image: null
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
  setImage
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

export default currentItemSlice.reducer;
