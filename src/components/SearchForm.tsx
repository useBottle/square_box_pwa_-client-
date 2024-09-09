import styles from "../styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { IoSearch } from "react-icons/io5";
import { FormEvent, useCallback, useRef } from "react";
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

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatch(setInputValue(e.target.value));
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      dispatch(setNewsData([]));
      dispatch(setYoutubeData([]));
      dispatch(setNewsLoading(true));
      dispatch(setYoutubeLoading(true));
      dispatch(setSearchBarTrigger(false));
      refInputValue.current = inputValue;

      // Home 메뉴 활성화되어 있을 경우, onSubmit 시 SearchModal 띄우기.
      menuIndex === 0 && dispatch(setSearchModalTrigger(true));
      e.preventDefault();

      // 뉴스 데이터 가져오기.
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

      // 유튜브 데이터 가져오기
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
    },
    [dispatch, inputValue],
  );

  return (
    <form
      onSubmit={
        inputValue && refInputValue.current !== inputValue
          ? onSubmit
          : (e: FormEvent<HTMLFormElement>) => e.preventDefault()
      }
    >
      <div className={styles.searchBar}>
        <button className={styles.searchIconBox} type="submit">
          <IoSearch className={styles.searchIcon} />
        </button>
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
      </div>
    </form>
  );
}
