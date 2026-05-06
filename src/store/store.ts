// імпортуємо configureStore
import { configureStore } from "@reduxjs/toolkit";

// імпортуємо baseApi (а НЕ authApi)
import { baseApi } from "../services/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
