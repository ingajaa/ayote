import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: null,
  searchTermResults: null,
  skip: true,
  selectedSearchResult: null
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
    },
    setSelectedSearchResult: (state, action) => {
      state.selectedSearchResult = action.payload;
    }
  }
});

export const { setSearchTerm, setSearchTermResults, setSkip, setSelectedSearchResult } = searchSlice.actions;

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

export const selectSelectedSearchResult = (state) => {
  return state.search.selectedSearchResult;
};

export default searchSlice.reducer;
