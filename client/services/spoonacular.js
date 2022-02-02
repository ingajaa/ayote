import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SPOONACULAR_API_KEY } from '@env';

// Define a service using a base URL and expected endpoints
export const spoonacularApi = createApi({
  reducerPath: 'spoonacularApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spoonacular.com' }),
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (searchTerm) => `/food/products/search?query=${searchTerm}&apiKey=${SPOONACULAR_API_KEY}`
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchProductQuery } = spoonacularApi;
