import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OPENFOODFACTS_BASE_URL } from '@env';
import { create, all } from 'mathjs';

const config = { number: 'number' };
const math = create(all, config);

const capitaliseWords = (str) => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const openFoodFactsApi = createApi({
  reducerPath: 'openFoodFactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: OPENFOODFACTS_BASE_URL
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (eanCode) => `/product/${eanCode}.json`,
      transformResponse: (response) => {
        if (!response.hasOwnProperty('product')) return response;
        const product = response.product;
        const transformedResponse = {
          id: product.code,
          name: capitaliseWords(`${product.brands_tags && product.brands_tags.length > 0 ? product.brands_tags[0] + ' ' : ''}${product.product_name}`),
          image: product.image_url,
          proteinPerGram: math.divide(product.nutriments.proteins_100g, 100),
          carbsPerGram: math.divide(product.nutriments.carbohydrates_100g, 100),
          fatPerGram: math.divide(product.nutriments.fat_100g, 100),
          caloriesPerGram: math.divide(product.nutriments['energy-kcal_100g'], 100),
          category: 'products'
        };
        return transformedResponse;
      }
    })
  })
});

export const { useGetProductQuery } = openFoodFactsApi;

// transformResponse: (response) => {
//     if (!response.hasOwnProperty('product')) return response;
//     const product = response.product;
//     const transformedResponse = {
//       id: eanCode,
//       name: `${product.product_name}${product.brands_tags && product.brands_tags.length > 0 ? ' (' + product.brands_tags[0] + ')' : ''}`,
//       image: product.image_url,
//       proteinPerGram: math.divide(product.nutriments.proteins_100g, 100),
//       carbsPerGram: math.divide(product.nutriments.carbohydrates_100g, 100),
//       fatPerGram: math.divide(product.nutriments.fat_100g, 100),
//       category: 'products'
//     };
//     return transformedResponse;
//   }
