import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  mode: Theme;
}

const savedTheme = localStorage.getItem("theme");

const initialState: ThemeState = {
  mode: savedTheme === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
