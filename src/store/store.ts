import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    api: baseApi.reducer,
    theme: themeReducer,
  },

  middleware: (
    getDefaultMiddleware, // getDefaultMiddleware - стандартні middleware Redux Toolkit
  ) => getDefaultMiddleware().concat(baseApi.middleware), //baseApi.middleware -  додає middleware RTK Query (fetch, cache, refetch. loading, invalidation)
});

// RootState = тип усього Redux store

// store.getState() повертає весь Redux state

// ReturnType автоматично бере
// тип того,
// що повертає getState()

export type RootState = ReturnType<typeof store.getState>;

// AppDispatch = тип dispatch function

// typeof бере тип store.dispatch

export type AppDispatch = typeof store.dispatch;
