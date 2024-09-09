import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MobileNav.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { FaUser, FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";
import { setDarkLight, setLogOutModalTrigger, setMenuIndex, setNavSwitch } from "../store/userInterfaceSlice";
import { GoSun, GoMoon, GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function MobileNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { navSwitch } = useSelector((state: RootState) => state.userInterface);
  const { username } = useSelector((state: RootState) => state.verification);
  const { menuIndex } = useSelector((state: RootState) => state.userInterface);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  const menuItem = [
    { path: "/home", icon: <FaHome />, label: "Home" },
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
    { path: "/bookmark", icon: <FaBookmark />, label: "Bookmark" },
  ];

  const themeExchange = useCallback((): void => {
    if (darkLightToggle === "dark") {
      dispatch(setDarkLight("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setDarkLight("dark"));
      localStorage.setItem("theme", "dark");
    }
  }, [dispatch, darkLightToggle]);

  return (
    <div>
      <nav className={`${styles.mobileNav} ${!navSwitch && styles.navHide}`}>
        <h4>MENU</h4>
        <div className={styles.userSet}>
          <div className={styles.user}>
            <FaUser className={styles.icon} />
            <span>{username}</span>
          </div>
        </div>
        <ul>
          {menuItem.map((item, index) => {
            return (
              <li
                className={menuIndex === index ? `${styles.menuIcon}` : ""}
                key={index}
                onClick={() => {
                  dispatch(setMenuIndex(index));
                  dispatch(setNavSwitch(false));
                  navigate(`${item.path}`);
                }}
              >
                <div className={styles.icon}>{item.icon}</div>
                <span className={menuIndex === index ? `${styles.menuText}` : ""}>{item.label}</span>
              </li>
            );
          })}
          <li>
            <button className={styles.darkModeBtn} onClick={themeExchange}>
              {darkLightToggle === "dark" ? (
                <GoSun className={styles.darkModeIcon} />
              ) : (
                <GoMoon className={styles.darkModeIcon} />
              )}
            </button>
          </li>
          <li>
            <button className={styles.logOutBtn} onClick={() => dispatch(setLogOutModalTrigger(true))}>
              <GoSignOut className={styles.logOutIcon} />
            </button>
          </li>
        </ul>
      </nav>
      <div
        className={styles.navOverlay}
        role="button"
        onClick={() => dispatch(navSwitch ? setNavSwitch(false) : setNavSwitch(true))}
        style={navSwitch ? { display: "block" } : { display: "none" }}
      />
    </div>
  );
}
