import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "../src/styles/App.module.css";
import Home from "./routes/Home";
import News from "./routes/News";
import { IoSearch } from "react-icons/io5";
import { GoSun, GoMoon, GoSignIn } from "react-icons/go";
import { FaNewspaper, FaYoutube, FaInstagram, FaBookmark } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setInputValue } from "./store/inputValueSlice";
import { useEffect } from "react";
import { setNewsData } from "./store/newsDataSlice";
import { setIconIndex } from "./store/iconIndexSlice";
import { BsBox } from "react-icons/bs";
import SearchModal from "./components/SearchModal";
import { setSearchModalTrigger } from "./store/searchModalTriggerSlice";
import { setDarkLight } from "./store/darkLightSlice";
import axios from "axios";
import { setPreviewToggle } from "./store/previewToggleSlice";
import { setNewsLoading } from "./store/loadingStatusSlice";

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const iconIndex = useSelector((state: RootState) => state.iconIndex);
  const searchModalTrigger = useSelector((state: RootState) => state.searchModalTrigger);
  const darkLightToggle = useSelector((state: RootState) => state.darkLight);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    dispatch(setPreviewToggle(false));
    dispatch(setNewsLoading(true));
    iconIndex === -1 ? dispatch(setSearchModalTrigger(true)) : null;
    e.preventDefault();
    const fetchNewsData = async (): Promise<void> => {
      try {
        const response = await axios.put(
          process.env.REACT_APP_GET_NEWS_API_URL as string,
          { inputValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = response.data;

        dispatch(setNewsData(result));
        dispatch(setNewsLoading(false));
      } catch (error) {
        console.error("Error fetching news data: ", error);
        dispatch(setNewsLoading(false));
      }
    };

    const fetchYoutubeData = async (): Promise<void> => {
      try {
        const response = await axios.put(
          process.env.REACT_APP_GET_YOUTUBE_API_URL as string,
          { inputValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const result = response.data;
        console.log(result);
      } catch (error) {
        console.error("Error fetching news data: ", error);
      }
    };

    // fetchNewsData();
    fetchYoutubeData();
  };

  const navItem = [
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
    { path: "/instagram", icon: <FaInstagram />, label: "Instagram" },
    { path: "/x", icon: <FaXTwitter />, label: "X" },
    { path: "/bookmark", icon: <FaBookmark />, label: "Bookmark" },
  ];

  const themeExchange = () => {
    if (darkLightToggle === "dark") {
      dispatch(setDarkLight("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setDarkLight("dark"));
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    localStorage.getItem("theme") === "dark" ? dispatch(setDarkLight("dark")) : dispatch(setDarkLight("light"));
  }, [dispatch]);

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.modalSet} style={searchModalTrigger === true ? { display: "block" } : {}}>
        <SearchModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setSearchModalTrigger(false))} />
      </div>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.circle4} />
      <div className={styles.finalBackground} />
      <div className={styles.mainContainer}>
        <header className={styles.header}>
          <h1
            className={styles.logo}
            onClick={() => {
              dispatch(setIconIndex(-1));
              navigate("/");
            }}
          >
            <BsBox />
            <span>Square Box</span>
          </h1>

          <form onSubmit={inputValue ? onSubmit : (e) => e.preventDefault()}>
            <div className={styles.searchBar}>
              <input
                type="text"
                onChange={onChange}
                value={inputValue}
                placeholder="Search"
                spellCheck="false"
                autoComplete="off"
              />
              <div
                role="button"
                className={styles.clearBtn}
                onClick={() => dispatch(setInputValue(""))}
                style={inputValue === "" ? { display: "none" } : { display: "block" }}
              >
                <span className={`${styles.iconSet} ${styles.part1}`}></span>
                <span className={`${styles.iconSet} ${styles.part2}`}></span>
              </div>
              <button className={styles.searchIconBox} type="submit">
                <IoSearch className={styles.searchIcon} />
              </button>
            </div>
          </form>

          <button className={styles.darkModeBtn} onClick={themeExchange}>
            {darkLightToggle === "dark" ? (
              <GoSun className={styles.darkModeIcon} onClick={() => {}} />
            ) : (
              <GoMoon className={styles.darkModeIcon} />
            )}
          </button>

          <button className={styles.signInBtn}>
            <GoSignIn className={styles.signInIcon} />
            <span>Sign in</span>
          </button>
        </header>

        <nav className={styles.navbar}>
          <ul>
            {navItem.map((item, index) => {
              return (
                <li
                  className={iconIndex === index ? `${styles.menuIcon}` : ""}
                  key={index}
                  onClick={() => {
                    dispatch(setIconIndex(index));
                    navigate(`${item.path}`);
                  }}
                >
                  <div>{item.icon}</div>
                  <span className={iconIndex === index ? `${styles.menuText}` : ""}>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
