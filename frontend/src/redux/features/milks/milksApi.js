import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../util/baseURL";

const milksApi = createApi({
  reducerPath: "milksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/milks`, // Adjust base URL according to your endpoint
    credentials: "include",
  }),
  tagTypes: ["Milks"],
  endpoints: (builder) => ({
    fetchAllMilks: builder.query({
      query: () => "/",
      providesTags: ["Milks"],
    }),

    fetchMilkById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Milks", id }],
    }),

    addMilk: builder.mutation({
      query: (newMilk) => ({
        url: "/create-milk",
        method: "POST",
        body: newMilk,
        credentials: "include",
      }),
      invalidatesTags: ["Milks"],
    }),

    fetchRelatedMilks: builder.query({
      query: (id) => `/related/${id}`, // Fetch related milks by category
    }),

    updateMilk: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-milk/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Milks"],
    }),

    deleteMilk: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Milks", id }],
    }),
  }),
});

export const {
  useFetchAllMilksQuery,
  useFetchMilkByIdQuery,
  useAddMilkMutation,
  useUpdateMilkMutation,
  useDeleteMilkMutation,
  useFetchRelatedMilksQuery,
} = milksApi;

export default milksApi;
