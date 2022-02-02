import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SPOONACULAR_API_KEY } from '@env';
import { camelCase } from 'lodash';

// Define a service using a base URL and expected endpoints
export const spoonacularApi = createApi({
  reducerPath: 'spoonacularApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spoonacular.com' }),
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (searchTerm) => `/food/products/search?query=${searchTerm}&apiKey=${SPOONACULAR_API_KEY}`,
      transformResponse: (response) => response.products
    }),
    searchAllFood: builder.query({
      query: (searchTerm) => `/food/search?query=${searchTerm}&apiKey=${SPOONACULAR_API_KEY}`,
      transformResponse: (response) => {
        const mutatedResponse = [];
        response.searchResults.forEach((categoryResults) => {
          categoryResults.results.forEach((result) => {
            result.category = camelCase(categoryResults.name);
            mutatedResponse.push(result);
          });
        });
        return mutatedResponse.filter((result) => ['recipes', 'products', 'menuItems', 'simpleFoods'].includes(result.category));
      }
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSearchProductQuery, useSearchAllFoodQuery } = spoonacularApi;
