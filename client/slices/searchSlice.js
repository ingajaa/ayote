import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: null,
  searchTermResults: null,
  skip: true
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchTermResults: (state, action) => {
      state.searchTermResults = action.payload;
    },
    setSkip: (state, action) => {
      state.skip = action.payload;
    }
  }
});

export const { setSearchTerm, setSearchTermResults, setSkip } = searchSlice.actions;

// Selectors, for "grabbing" data
export const selectSearchTerm = (state) => {
  return state.search.searchTerm;
};
export const selectSearchTermResults = (state) => {
  return state.search.searchTermResults;
};
export const selectSkip = (state) => {
  return state.search.skip;
};

export default searchSlice.reducer;
