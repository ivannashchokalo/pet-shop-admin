import { baseApi } from "./baseApi";

interface StatisticsResponse {
  animalsAvailableCount: number;
  happyOwnersCount: number;
  availableDogsCount: number;
  availableCatsCount: number;
  availableBirdsCount: number;
  availableRodentsCount: number;
  reservedCount: number;
  soldCount: number;
}

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query<StatisticsResponse, void>({
      query: () => "/statistics",
      providesTags: ["Animals", "Requests"],
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
