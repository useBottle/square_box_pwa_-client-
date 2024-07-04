import styles from "../styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { IoSearch } from "react-icons/io5";
import { FormEvent, useRef } from "react";
import { setInputValue } from "../store/inputValueSlice";
import {
  setNewsLoading,
  setSearchBarTrigger,
  setSearchModalTrigger,
  setYoutubeLoading,
} from "../store/userInterfaceSlice";
import axios from "axios";
import { setNewsData, setYoutubeData } from "../store/dataSlice";

export default function SearchForm(): JSX.Element {
  const refInputValue = useRef("");
  const dispatch = useDispatch<AppDispatch>();
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const { menuIndex } = useSelector((state: RootState) => state.userInterface);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    dispatch(setNewsLoading(true));
    dispatch(setYoutubeLoading(true));
    dispatch(setSearchBarTrigger(false));
    refInputValue.current = inputValue;

    menuIndex === 0 && dispatch(setSearchModalTrigger(true));
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
      } catch (error: unknown) {
        console.error("Error fetching news data: ", error);
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
        const result = response.data.items;

        dispatch(setYoutubeData(result));
        dispatch(setYoutubeLoading(false));
      } catch (error: unknown) {
        console.error("Error fetching youtube data: ", error);
      }
    };

    Promise.all([fetchNewsData(), fetchYoutubeData()]);
  };

  return (
    <form
      onSubmit={
        inputValue && refInputValue.current !== inputValue
          ? onSubmit
          : (e: FormEvent<HTMLFormElement>) => e.preventDefault()
      }
    >
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
  );
}
