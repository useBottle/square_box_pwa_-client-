import { Route, Routes, Link, useNavigate } from "react-router-dom";
import styles from "../src/styles/App.module.css";
import Home from "./routes/Home";
import News from "./routes/News";
import { IoSearch } from "react-icons/io5";
import { GoSun, GoSignIn } from "react-icons/go";
import { FaNewspaper, FaYoutube, FaInstagram, FaBookmark } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setInputValue } from "./store/inputValueSlice";
import { Article } from "./types/types";
import { useState } from "react";
import { setNewsData } from "./store/newsDataSlice";
import { setIconIndex } from "./store/iconIndexSlice";
import SearchModal from "./components/SearchModal";
import { setSearchModalTrigger } from "./store/searchModalTriggerSlice";

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const [toggle, setToggle] = useState<number>(1);
  const iconIndex = useSelector((state: RootState) => state.iconIndex);
  const searchModalTrigger = useSelector((state: RootState) => state.searchModalTrigger);

  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    iconIndex === -1 ? dispatch(setSearchModalTrigger("block")) : null;
    e.preventDefault();
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(process.env.REACT_APP_GET_NEWS_API_URL as string, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ inputValue }),
        });
        const result = await response.json();

        const textData = result.map(
          (item: Article): Article => ({
            title: stripHtml(item.title),
            description: stripHtml(item.description),
            pubDate: stripHtml(item.pubDate),
            originallink: stripHtml(item.originallink),
            imageUrls: item.imageUrls,
            articleText: stripHtml(item.articleText),
          }),
        );

        dispatch(setNewsData(textData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  const navItem = [
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
    { path: "/instagram", icon: <FaInstagram />, label: "Instagram" },
    { path: "/x", icon: <FaXTwitter />, label: "X" },
    { path: "/bookmark", icon: <FaBookmark />, label: "Bookmark" },
  ];

  return (
    <div>
      <div className={styles.modalSet} style={{ display: `${searchModalTrigger}` }}>
        <SearchModal />
        <div className={styles.overlay} />
      </div>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h1
            className={styles.logo}
            onClick={() => {
              dispatch(setIconIndex(-1));
              navigate("/");
            }}
          >
            Custom Board
          </h1>

          <form onSubmit={onSubmit}>
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
                style={inputValue === "" ? { opacity: 0 } : { opacity: 1 }}
              >
                <span className={`${styles.part1} ${styles.iconSet}`}></span>
                <span className={`${styles.part2} ${styles.iconSet}`}></span>
              </div>
              <button className={styles.searchIcon} type="submit">
                <IoSearch />
              </button>
            </div>
          </form>

          <div className={styles.darkmode} style={{ opacity: `${toggle}` }}>
            <span className={styles.darkModeIcon}>
              <GoSun />
            </span>
          </div>

          <button className={styles.signInBtn} onMouseOver={() => setToggle(0)} onMouseOut={() => setToggle(1)}>
            <div className={styles.icon}>
              <GoSignIn />
            </div>
            <span>Sign in</span>
          </button>
        </div>

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
