import type { Animal } from "../types/animal";
import { baseApi } from "./api";

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
      query: ({ id, formData }) => ({
        url: `/animals/${id}`,
        method: "PATCH",
        body: formData,
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

// import type {
//   Animal,
//   AnimalId,
//   CreateNewAnimal,
//   UpdateAnimalData,
// } from "../types/animal";
// import type { RequestId, UpdateRequest } from "../types/request";
// import { api } from "./api";

// export type AnimalsResponse = {
//   page: number;
//   perPage: number;
//   totalItems: number;
//   totalPages: number;
//   animals: Animal[];
// };

// export const fetchAnimals = async (
//   page: number,
//   search: string | null,
//   type: string | null,
//   status: string | null,
// ) => {
//   const { data } = await api.get<AnimalsResponse>("/animals", {
//     params: {
//       search,
//       type,
//       status,
//       perPage: 12,
//       page,
//     },
//   });

//   return data;
// };

// export const fetchAnimalById = async (id: AnimalId) => {
//   const { data } = await api.get<Animal>(`/animals/${id}`);
//   return data;
// };

// export const deleteAnimal = async (id: AnimalId) => {
//   const { data } = await api.delete<Animal>(`/animals/${id}`);
//   return data;
// };

// export const addAnimal = async (animal: CreateNewAnimal) => {
//   const { data } = await api.post<Animal>("/animals", animal);

//   return data;
// };

// export const updateAnimal = async ({
//   id,
//   ...updateAnimalData
// }: UpdateAnimalData) => {
//   const { data } = await api.patch<Animal>(`/animals/${id}`, updateAnimalData);
//   return data;
// };

// export const fetchRequests = async () => {
//   const { data } = await api.get<Request[]>("/requests");
//   return data;
// };

// export const updateRequest = async ({
//   _id,
//   ...updateRequestData
// }: UpdateRequest) => {
//   const { data } = await api.patch<Request>(
//     `/requests/${_id}`,
//     updateRequestData,
//   );
//   return data;
// };

// export const deleteRequest = async (id: RequestId) => {
//   const { data } = await api.delete(`/requests/${id}`);
//   return data;
// };
