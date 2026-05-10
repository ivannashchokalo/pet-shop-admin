import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./ThemeButton.module.scss";

export default function ThemeButton() {
  const dispatch = useDispatch<AppDispatch>(); // функція, яка відправляє actions у Redux

  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(toggleTheme());

    localStorage.setItem("theme", newTheme);
  };

  return (
    <button onClick={handleThemeToggle} className={styles.button}>
      {theme === "light" ? (
        <Icon name="moon" size={20} className={styles.moon} />
      ) : (
        <Icon name="sun" size={20} className={styles.sun} />
      )}
    </button>
  );
}
