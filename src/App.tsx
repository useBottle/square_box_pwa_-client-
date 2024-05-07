import { Route, Routes, Link } from "react-router-dom";
import styles from "../src/styles/App.module.css";
import Home from "./routes/Home";
import News from "./routes/News";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setInputValue } from "./store/inputValueSlice";
import { Article } from "./types/types";
import { setData } from "./store/dataSlice";

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const inputValue = useSelector((state: RootState) => state.inputValue);

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
          }),
        );

        dispatch(setData(textData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  return (
    <div className={styles.mainContainer}>
      <Link to="/">
        <h1 className={styles.logo}>Custom Board</h1>
      </Link>
      <form onSubmit={onSubmit}>
        <div className={styles.searchBar}>
          <input onChange={onChange} value={inputValue} />
          <button type="submit">
            <IoSearch />
          </button>
        </div>
      </form>
      <nav className={styles.navbar}>
        <ul>
          <Link to="/news">
            <li>News</li>
          </Link>
          <li>Youtube</li>
          <li>Instagram</li>
          <li>X</li>
          <li>Favorites</li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedules" element={"sample"} />
      </Routes>
    </div>
  );
}

export default App;
