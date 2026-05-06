import type { Animal } from "../types/animal";
import { baseApi } from "./baseApi";

interface GetAnimalsParams {
  page?: number;
  search?: string;
  type?: string;
  status?: string;
}

interface GetAnimalsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  animals: Animal[];
}

export const animalsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnimals: builder.query<GetAnimalsResponse, GetAnimalsParams | void>({
      query: (params) => {
        const { page, search, type, status } = params || {};

        return {
          url: "/animals",
          params: {
            page,
            search,
            type,
            status,
            perPage: 12,
          },
        };
      },
      providesTags: ["Animals"],
    }),

    getAnimalById: builder.query({
      query: (id) => `/animals/${id}`,
      providesTags: ["Animals"],
    }),

    addAnimal: builder.mutation({
      query: (body) => ({
        url: "/animals",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Animals"],
    }),
    updateAnimal: builder.mutation({
      query: ({ id, body }) => ({
        url: `/animals/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Animals"],
    }),
    deleteAnimal: builder.mutation({
      query: (id) => ({
        url: `/animals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Animals"],
    }),
  }),
});
export const {
  useGetAnimalsQuery,
  useGetAnimalByIdQuery,
  useAddAnimalMutation,
  useUpdateAnimalMutation,
  useDeleteAnimalMutation,
} = animalsApi;
