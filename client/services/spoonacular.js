import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SPOONACULAR_API_KEY, SPOONACULAR_API_HOST, SPOONACULAR_API_BASE_URL } from '@env';
import { camelCase } from 'lodash';

// Define a service using a base URL and expected endpoints
export const spoonacularApi = createApi({
  reducerPath: 'spoonacularApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SPOONACULAR_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Host', SPOONACULAR_API_HOST);
      headers.set('X-RapidAPI-Key', SPOONACULAR_API_KEY);

      return headers;
    }
  }),
  endpoints: (builder) => ({
    searchProduct: builder.query({
      query: (searchTerm) => `/food/products/search?query=${searchTerm}`,
      transformResponse: (response) => response.products
    }),
    searchAllFood: builder.query({
      query: (searchTerm, totalResults) => `/food/search?query=${searchTerm}&number=${totalResults}`,
      transformResponse: (response) => {
        const mutatedResponse = [];
        response.searchResults.forEach((categoryResults) => {
          categoryResults.results.forEach((result) => {
            result.category = camelCase(categoryResults.name);
            mutatedResponse.push(result);
          });
        });
        return mutatedResponse.filter((result) => ['recipes', 'simpleFoods'].includes(result.category));
      }
    }),
    searchRecipes: builder.query({
      query: (searchTerm, totalResults = 25) => `/recipes/search?query=${searchTerm}&number=${totalResults}`,
      transformResponse: (response) => {
        const mutatedResponse = [];
        response.results.forEach((result) => {
          result.category = 'recipes';
          mutatedResponse.push(result);
        });
        return mutatedResponse;
      }
    }),
    getIngredientInformation: builder.query({
      query: (ingredientId, amount = 1) => `/food/ingredients/${ingredientId}/information?amount=${amount}`,
      transformResponse: (response) => {
        const mutatedResponse = {};

        // Caloric breakdown per serving
        const weightPerServing = response.nutrition.weightPerServing.amount;
        const proteinPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Protein')[0].amount;
        const carbsPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Carbohydrates')[0].amount;
        const fatPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Fat')[0].amount;
        const caloriesPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Calories')[0].amount;

        // Convert per gram
        const proteinPerGram = (proteinPerServing * 100) / (weightPerServing * 100);
        const carbsPerGram = (carbsPerServing * 100) / (weightPerServing * 100);
        const fatPerGram = (fatPerServing * 100) / (weightPerServing * 100);
        const caloriesPerGram = (caloriesPerServing * 100) / (weightPerServing * 100);

        // Build new response
        mutatedResponse.id = response.id;
        mutatedResponse.name = response.name;
        mutatedResponse.image = `https://spoonacular.com/cdn/ingredients_250x250/${response.image}`;
        mutatedResponse.proteinPerGram = proteinPerGram;
        mutatedResponse.carbsPerGram = carbsPerGram;
        mutatedResponse.fatPerGram = fatPerGram;
        mutatedResponse.caloriesPerGram = caloriesPerGram;

        return mutatedResponse;
      }
    }),
    getProductInformation: builder.query({
      query: (productId) => `/food/products/${productId}`,
      transformResponse: (response) => {
        const mutatedResponse = {};

        // Caloric breakdown per serving
        const proteinPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Protein')[0].amount;
        const carbsPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Carbohydrates')[0].amount;
        const fatPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Fat')[0].amount;
        const caloriesPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Calories')[0].amount;

        // Build new response
        mutatedResponse.id = response.id;
        mutatedResponse.name = response.title;
        mutatedResponse.brand = response.brand;
        mutatedResponse.upc = response.upc;
        mutatedResponse.image = response.image;
        mutatedResponse.description = response.description;
        mutatedResponse.ingredientList = response.ingredientList;
        mutatedResponse.proteinPerServing = proteinPerServing;
        mutatedResponse.carbsPerServing = carbsPerServing;
        mutatedResponse.fatPerServing = fatPerServing;
        mutatedResponse.caloriesPerServing = caloriesPerServing;

        return mutatedResponse;
      }
    }),
    getRecipeInformation: builder.query({
      query: (recipeId) => `/recipes/${recipeId}/information?includeNutrition=true`,
      transformResponse: (response) => {
        const mutatedResponse = {};

        // Caloric breakdown per serving
        const weightPerServing = response.nutrition.weightPerServing.amount;
        const proteinPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Protein')[0].amount;
        const carbsPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Carbohydrates')[0].amount;
        const fatPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Fat')[0].amount;
        const caloriesPerServing = response.nutrition.nutrients.filter((nutrient) => nutrient.name === 'Calories')[0].amount;

        // Convert per gram
        const proteinPerGram = (proteinPerServing * 100) / (weightPerServing * 100);
        const carbsPerGram = (carbsPerServing * 100) / (weightPerServing * 100);
        const fatPerGram = (fatPerServing * 100) / (weightPerServing * 100);
        const caloriesPerGram = (caloriesPerServing * 100) / (weightPerServing * 100);

        // Build new response
        mutatedResponse.id = response.id;
        mutatedResponse.name = response.title;
        mutatedResponse.image = response.image;
        mutatedResponse.vegan = response.vegan;
        mutatedResponse.glutenFree = response.glutenFree;
        mutatedResponse.summary = response.summary;
        mutatedResponse.proteinPerGram = proteinPerGram;
        mutatedResponse.carbsPerGram = carbsPerGram;
        mutatedResponse.fatPerGram = fatPerGram;
        mutatedResponse.caloriesPerGram = caloriesPerGram;

        return mutatedResponse;
      }
    }),
    getSimilarRecipes: builder.query({
      query: (recipeId) => `/recipes/${recipeId}/similar`
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSearchProductQuery,
  useSearchRecipesQuery,
  useSearchAllFoodQuery,
  useGetIngredientInformationQuery,
  useGetRecipeInformationQuery,
  useGetProductInformationQuery,
  useGetSimilarRecipesQuery
} = spoonacularApi;
