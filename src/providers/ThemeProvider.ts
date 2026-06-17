import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ThemeProvider() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return null;
}
