import styles from "../styles/BookMark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { MESSAGE } from "../common/message";
import { AppDispatch, RootState } from "../store/store";
import { setMarkedNews, setMarkedYoutube, setSelector } from "../store/bookMarkSlice";
import BookMarkNewsList from "../components/BookMarkNewsList";
import axios from "axios";
import BookMarkYoutubeList from "../components/BookMarkYoutubeList";
import BookMarkNewsView from "../components/BookMarkNewsView";
import BookMarkYoutubeView from "../components/BookMarkYoutubeView";
import { FaNewspaper, FaYoutube } from "react-icons/fa";
import { setBookMarkLoading, setMenuIndex } from "../store/userInterfaceSlice";
import Loading from "../components/Loading";

export default function BookMark(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { selector } = useSelector((state: RootState) => state.bookMark);
  const { username } = useSelector((state: RootState) => state.verification);
  const { bookMarkLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);

  // 북마크한 데이터 가져오기.
  const getBookMarkData = useCallback(async (): Promise<void> => {
    try {
      dispatch(setBookMarkLoading(true));
      const result = await axios.put(
        process.env.REACT_APP_FIND_DATA as string,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      dispatch(setMarkedNews(result.data.newsData));
      dispatch(setMarkedYoutube(result.data.youtubeData));
      dispatch(setBookMarkLoading(false));
    } catch (error) {
      console.error("Data request failed.", error);
    }
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(setMenuIndex(3));
    getBookMarkData();
  }, []);

  return (
    <section className={styles.bookMarkContainer}>
      {bookMarkLoading === false ? (
        <div className={styles.innerFrame}>
          <div className={styles.viewContainer}>
            <h4 className={styles.viewTitle}>View</h4>
            {selector === "news" ? <BookMarkNewsView /> : <BookMarkYoutubeView />}
          </div>
          <div className={styles.listContainer}>
            <div className={styles.listHeader}>
              <h4 className={styles.listTitle}>Contents</h4>
              <div className={styles.selectBtn}>
                <button
                  onClick={() => dispatch(setSelector("news"))}
                  className={selector === "news" ? styles.selectedBtn : ""}
                >
                  <FaNewspaper />
                </button>
                <button
                  onClick={() => dispatch(setSelector("youtube"))}
                  className={selector === "youtube" ? styles.selectedBtn : ""}
                >
                  <FaYoutube />
                </button>
              </div>
            </div>
            <div className={styles.contentList}>
              {selector === "news" ? <BookMarkNewsList /> : <BookMarkYoutubeList />}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>
    </section>
  );
}
