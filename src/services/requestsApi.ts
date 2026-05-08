import type { Request, RequestId, UpdateRequestData } from "../types/request";
import { baseApi } from "./baseApi";

export const requestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query<Request[], void>({
      query: () => "/requests",
      providesTags: ["Requests"],
    }),
    updateRequest: builder.mutation<Request, UpdateRequestData>({
      query: ({ _id, ...body }) => ({
        url: `/requests/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Requests"],
    }),

    deleteRequest: builder.mutation<Request, RequestId>({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestsApi;
