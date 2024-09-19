import { AUTH_URL, USERS_URL } from "../../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST"
      })
    }),
    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`
      }),
      invalidatesTags: ["Users"],
      keepUnusedDataFor: 5
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Users"]
    }),
    getUsers: builder.query({
      query: ({ page, limit }) => {
        let queryString = `${USERS_URL}?`;
        if (page) {
          queryString += `page=${page}&`;
        }
        if (limit) {
          queryString += `limit=${limit}&`;
        }
        return queryString;
      },
      keepUnusedDataFor: 5,
      providesTags: ["Users"]
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE"
      })
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`
      }),
      keepUnusedDataFor: 5
    }),
    updateUser: builder.mutation({
      query: ({ formData, userId }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "PUT",
        body: formData
      }),
      invalidatesTags: ["Users"]
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation
} = usersApiSlice;
