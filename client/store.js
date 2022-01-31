import { configureStore } from '@reduxjs/toolkit';
import navReducer from './slices/navSlice';
import { spoonacularApi } from './services/spoonacular';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    // Add the generated reducer as a specific top-level slice
    [spoonacularApi.reducerPath]: spoonacularApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spoonacularApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
