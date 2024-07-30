import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/BookMarkNewsList.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { setMarkedNews, setMouseOnNews, setNewsId } from "../store/bookMarkSlice";
import { MESSAGE } from "../common/message";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";

export default function BookMarkNewsList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { mouseOnNews } = useSelector((state: RootState) => state.bookMark);
  const { markedNews } = useSelector((state: RootState) => state.bookMark);
  const newsId = useSelector((state: RootState) => state.bookMark.newsId);

  useEffect(() => {
    dispatch(setNewsId(mouseOnNews._id));
  }, [mouseOnNews, dispatch]);

  // 북마크 뉴스 데이터 제거.
  const removeBookMark = async (): Promise<void> => {
    // UI 에서 즉시 제거.
    const removedNewsArray = markedNews.filter((item) => item.originallink !== mouseOnNews.originallink);
    dispatch(setMarkedNews(removedNewsArray));

    // DB 에 저장된 북마크된 뉴스 데이터에서 제거할 수 있도록 해당 newsId 전송.
    try {
      await axios.put(
        process.env.REACT_APP_DELETE_NEWS as string,
        { newsId },
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Data remove request is failed.", error);
    }
  };

  return (
    <div>
      {markedNews.length !== 0 ? (
        <div className={styles.newsSlider}>
          {markedNews.map((item, index) => {
            const onMouseEnter = (): void => {
              dispatch(setMouseOnNews(item));
            };

            return (
              <div className={styles.articleSet} key={index}>
                <div onMouseEnter={onMouseEnter} className={styles.article}>
                  <div>
                    <h3>{item.title}</h3>
                    <div className={styles.block}>
                      <p>{item.pubDate}</p>
                      <button onClick={removeBookMark}>
                        <FaTrash className={styles.bookMarkRemover} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.defaultView}>{MESSAGE.BOOKMARK.DEFAULT_INFO}</div>
      )}
    </div>
  );
}
