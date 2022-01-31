import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { SearchResults } from './types'

// Define a service using a base URL and expected endpoints
export const spoonacularApi = createApi({
  reducerPath: 'spoonacularApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spoonacular.com' }),
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (searchTerm) => `/food/products/search?query=${searchTerm}&apiKey=5fed4e6aee5e41ae8add5eb1c05821ac`
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchProductQuery } = spoonacularApi;
