// імпортуємо базовий API
import type { AuthData, User } from "../types/user";
import { baseApi } from "./baseApi";

// "розширюємо" api новими endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, AuthData>({
      // mutation = зміна даних (POST, PATCH, DELETE)
      query: (body) => ({
        url: "/auth/admin/login", // endpoint
        method: "POST", // HTTP метод
        body, // тіло запиту (email, password)
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
      // query = отримання даних (GET)
      query: () => "/auth/me",

      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
