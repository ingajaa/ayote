import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AYOTE_API_BASE_URL } from '@env';

// Define a service using a base URL and expected endpoints
export const ayoteApi = createApi({
  reducerPath: 'ayoteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AYOTE_API_BASE_URL
  }),
  tagTypes: ['Meal'],
  endpoints: (builder) => ({
    getAllMeals: builder.query({
      query: () => `/meals`,
      providesTags: ['Meal']
    }),
    addMeal: builder.mutation({
      query: (body) => ({
        url: `/meals`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Meal']
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllMealsQuery, useAddMealMutation } = ayoteApi;
