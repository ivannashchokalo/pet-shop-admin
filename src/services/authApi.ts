import type { AuthData, User } from "../types/user";
import { baseApi } from "./baseApi";

// "розширюємо" api новими endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, AuthData>({
      query: (body) => ({
        url: "/auth/admin/login",
        method: "POST",
        body,
      }),

      // після логіну кеш auth застаріває → треба оновити
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      invalidatesTags: ["Auth"],
    }),

    getMe: builder.query<User, void>({
      query: () => "/auth/me",

      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
