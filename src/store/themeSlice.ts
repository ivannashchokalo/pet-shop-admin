import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  mode: Theme;
}

const savedTheme = localStorage.getItem("theme");

const initialState: ThemeState = {
  mode: savedTheme === "dark" ? "dark" : "light",
};

// createSlice створює:
// - reducer - це функція, яка змінює state.
// - actions - яку зміну потрібно виконати.

const themeSlice = createSlice({
  name: "theme", // назва slice

  initialState,

  reducers: {
    toggleTheme(state) {
      // RTK використовує Immer - дозволяє писати код НІБИ ти мутуєш object, але насправді створює новий immutable object
      // тому можна мутувати state

      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
