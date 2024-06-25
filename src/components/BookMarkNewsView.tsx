import styles from "../styles/BookMarkNewsView.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setMarkedNews, setMouseOnNews } from "../store/bookMarkSlice";
import { FaMinusCircle } from "react-icons/fa";
import axios from "axios";
import { MESSAGE } from "../common/message";

export default function BookMarkNewsView(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { markedNews } = useSelector((state: RootState) => state.bookMark);
  const { mouseOnNews } = useSelector((state: RootState) => state.bookMark);
  const [newsUniqueValue, setNewsUniqueValue] = useState<string>("");

  useEffect(() => {
    markedNews.length !== 0 ? dispatch(setMouseOnNews(markedNews[0])) : null;
  }, [markedNews, dispatch]);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const removeBookMark = async (): Promise<void> => {
    const removedNewsArray = markedNews.filter((item) => item.originallink !== mouseOnNews.originallink);
    dispatch(setMarkedNews(removedNewsArray));
    setNewsUniqueValue(mouseOnNews._id);

    try {
      await axios.put(
        process.env.REACT_APP_DELETE_NEWS as string,
        { newsUniqueValue },
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Data remove request is failed.", error);
    }
  };

  return (
    <div className={styles.newsView}>
      {markedNews.length !== 0 ? (
        <div>
          <img src={mouseOnNews.imageUrl} alt="news-view" />
          <h3>{mouseOnNews.title}</h3>
          <div className={styles.block}>
            <p className={styles.articleDate}>{mouseOnNews.pubDate}</p>
            <button className={styles.bookMark} onClick={removeBookMark}>
              <FaMinusCircle />
            </button>
          </div>
          <button className={styles.originalLink} onClick={() => openNewTab(mouseOnNews.originallink)}>
            원문 링크
          </button>
          <p>{mouseOnNews.articleText}</p>
        </div>
      ) : (
        <div className={styles.defaultView}>{MESSAGE.BOOKMARK.DEFAULT_INFO}</div>
      )}
    </div>
  );
}
