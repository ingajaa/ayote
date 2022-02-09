import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import currentItemReducer from './slices/currentItemSlice';
import waterReducer from './slices/waterSlice';
import userProfileReducer from './slices/userProfileSlice';
import customMealReducer from './slices/customMealSlice';
import { spoonacularApi } from './services/spoonacular';
import { ayoteApi } from './services/ayote';
import { openFoodFactsApi } from './services/openFoodFacts';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    // State Slices
    search: searchReducer,
    currentItem: currentItemReducer,
    water: waterReducer,
    userProfile: userProfileReducer,
    customMeal: customMealReducer,

    // Services
    [spoonacularApi.reducerPath]: spoonacularApi.reducer,
    [ayoteApi.reducerPath]: ayoteApi.reducer,
    [openFoodFactsApi.reducerPath]: openFoodFactsApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spoonacularApi.middleware, ayoteApi.middleware, openFoodFactsApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
