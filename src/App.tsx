import { Route, Routes, Link } from "react-router-dom";
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

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const [toggle, setToggle] = useState<number>(1);

  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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

  return (
    <div>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <Link to="/">
            <h1 className={styles.logo}>Custom Board</h1>
          </Link>
          <form onSubmit={onSubmit}>
            <div className={styles.searchBar}>
              <input onChange={onChange} value={inputValue} placeholder="Search" />
              <button type="submit">
                <IoSearch />
              </button>
            </div>
          </form>
          <div className={styles.darkmode} style={{ opacity: `${toggle}` }}>
            <span className={styles.darkModeIcon}>
              <GoSun />
            </span>
          </div>
          <button
            className={styles.signInBtn}
            onMouseOver={() => setToggle(0)}
            onFocus={() => setToggle(0)}
            onMouseOut={() => setToggle(1)}
            onBlur={() => setToggle(1)}
          >
            <div className={styles.icon}>
              <GoSignIn />
            </div>
            <span>Sign in</span>
          </button>
        </div>
        <nav className={styles.navbar}>
          <ul>
            <Link to="/news">
              <li>
                <div>
                  <FaNewspaper />
                </div>
                <span>News</span>
              </li>
            </Link>
            <li>
              <div>
                <FaYoutube />
              </div>
              <span>Youtube</span>
            </li>
            <li>
              <div>
                <FaInstagram />
              </div>
              <span>Instagram</span>
            </li>
            <li>
              <div>
                <FaXTwitter />
              </div>
              <span>X</span>
            </li>
            <li>
              <div>
                <FaBookmark />
              </div>
              <span>Bookmark</span>
            </li>
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
