import { BRANDS_URL, PRODUCTS_URL, UPLOAD_URL } from "../../../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/list`
      }),
      keepUnusedDataFor: 5
    }),
    getProductsByType: builder.query({
      query: ({ type }) => ({
        url: `${PRODUCTS_URL}/featured?type=${type}`
      })
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),

    getFilteredProducts: builder.query({
      query: ({ size, rating, price, categories, sort, page, limit }) => {
        let queryString = `${PRODUCTS_URL}?`;
        if (size) {
          queryString += `size=${size}&`;
        }
        if (rating) {
          queryString += `rating=${rating}&`;
        }
        if (price) {
          queryString += `price=${price}&`;
        }
        // Convert categories array to a comma-separated string
        const categoriesParam = Array.isArray(categories)
          ? categories.join(",")
          : categories;
        // Check if categoriesParam is not empty before adding it to the query string
        if (categoriesParam) {
          queryString += `category=${categoriesParam}&`;
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
    }),
    getFilteredProductsByBrand: builder.query({
      query: ({
        size,
        rating,
        price,
        categories,
        sort,
        page,
        limit,
        brandSlug
      }) => {
        let queryString = `${BRANDS_URL}/${brandSlug}?`;
        if (size) {
          queryString += `size=${size}&`;
        }
        if (rating) {
          queryString += `rating=${rating}&`;
        }
        if (price) {
          queryString += `price=${price}&`;
        }
        // Convert categories array to a comma-separated string
        const categoriesParam = Array.isArray(categories)
          ? categories.join(",")
          : categories;
        // Check if categoriesParam is not empty before adding it to the query string
        if (categoriesParam) {
          queryString += `category=${categoriesParam}&`;
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
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      })
    }),
    addToWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCTS_URL}/wishlist`,
        method: "PUT",
        body: { productId }
      }),
      invalidatesTags: ["Products"]
    }),
    createProduct: builder.mutation({
      query: ({ formData }) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Products", "Brand", "Categories"]
    }),
    updateProduct: builder.mutation({
      query: ({ formData, productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: formData
      }),
      invalidatesTags: ["Products", "Brands", "Categories"]
    }),
    uploadProductImages: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData
      })
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useGetProductsQuery,
  useGetProductsByTypeQuery,
  useGetProductQuery,
  useGetFilteredProductsQuery,
  useGetFilteredProductsByBrandQuery,
  useUpdateProductMutation,
  useCreateReviewMutation,
  useAddToWishlistMutation,
  useCreateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductMutation
} = productsApiSlice;
