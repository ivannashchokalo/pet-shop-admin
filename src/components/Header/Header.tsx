import { Link, NavLink, useNavigate } from "react-router";
import styles from "./Header.module.scss";
import Icon from "../Icon/Icon";
import Container from "../Container/Container";
import toast from "react-hot-toast";
import { authApi, useLogoutMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import ThemeButton from "../ThemeButton/ThemeButton";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      dispatch(authApi.util.resetApiState());

      navigate("/sign-in");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header>
      <Container>
        <div className={styles.headerContainer}>
          <nav className={styles.nav}>
            <Link to="/" className={styles.logoLink}>
              <Icon name="logo" size={50} className={styles.logoIcon} />
            </Link>
            <ul className={styles.navList}>
              <li className={styles.navListItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.navListLink} ${isActive && styles.activeLink}`
                  }
                >
                  <Icon size={20} className={styles.navListIcon} name="home" />{" "}
                  Home
                </NavLink>
              </li>
              <li className={styles.navListItem}>
                <NavLink
                  to="/animals"
                  className={({ isActive }) =>
                    `${styles.navListLink} ${isActive && styles.activeLink}`
                  }
                >
                  <Icon
                    size={16}
                    className={styles.navListIcon}
                    name="animals"
                  />{" "}
                  Animals
                </NavLink>
              </li>
              <li className={styles.navListItem}>
                <NavLink
                  to="/requests"
                  className={({ isActive }) =>
                    `${styles.navListLink} ${isActive && styles.activeLink}`
                  }
                >
                  <Icon
                    size={20}
                    className={styles.navListIcon}
                    name="request"
                  />{" "}
                  Requests
                </NavLink>
              </li>
              <li className={styles.navListItem}>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `${styles.navListLink} ${isActive && styles.activeLink}`
                  }
                >
                  <Icon
                    size={20}
                    className={styles.navListIcon}
                    name="settings"
                  />
                  Settings
                </NavLink>
              </li>
            </ul>
          </nav>
          <ThemeButton />
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Container>
    </header>
  );
}
