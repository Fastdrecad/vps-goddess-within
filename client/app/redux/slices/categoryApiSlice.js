import { CATEGORIES_URL } from '../../../constants';
import { apiSlice } from './apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`
      }),
      providesTags: ['Categories'],
      keepUnusedDataFor: 5
    }),
    getCategoriesList: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}/list`
      }),
      providesTags: ['Categories'],
      keepUnusedDataFor: 5
    }),

    getCategoriesBySlug: builder.query({
      query: ({
        slug,
        size,
        rating,
        price,
        skirts,
        dresses,
        tShirts,
        trousers,
        blazers,
        sort,
        page,
        limit
      }) => {
        let queryString = `${CATEGORIES_URL}/${slug}?`;

        if (size) {
          queryString += `size=${size}&`;
        }

        if (rating) {
          queryString += `rating=${rating}&`;
        }

        if (price) {
          queryString += `price=${price}&`;
        }
        if (skirts) {
          queryString += `skirts=${skirts}&`;
        }
        if (dresses) {
          queryString += `dresses=${dresses}&`;
        }
        if (tShirts) {
          queryString += `tShirts=${tShirts}&`;
        }
        if (trousers) {
          queryString += `trousers=${trousers}&`;
        }
        if (blazers) {
          queryString += `blazers=${blazers}&`;
        }

        if (sort) {
          queryString += `sort=${sort}&`;
        }

        if (page) {
          queryString += `page=${page}&`;
        }

        if (limit) {
          queryString += `limit=${limit}&`;
        }

        return queryString;
      }
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesListQuery,
  useGetCategoriesBySlugQuery
} = categoriesApiSlice;
