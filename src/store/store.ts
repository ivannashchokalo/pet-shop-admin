import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    api: baseApi.reducer,
    theme: themeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
