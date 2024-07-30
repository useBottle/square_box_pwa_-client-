import styles from "../styles/BookMarkNewsView.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setMarkedNews, setMouseOnNews } from "../store/bookMarkSlice";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { MESSAGE } from "../common/message";

export default function BookMarkNewsView(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { markedNews } = useSelector((state: RootState) => state.bookMark);
  const { mouseOnNews } = useSelector((state: RootState) => state.bookMark);
  const newsId = useSelector((state: RootState) => state.bookMark.newsId);

  // 북마크된 뉴스 데이터가 있을 경우 초기 로드 시에 가장 처음 데이터 보여주기.
  useEffect(() => {
    markedNews.length !== 0 ? dispatch(setMouseOnNews(markedNews[0])) : null;
  }, [markedNews, dispatch]);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  // 북마크 뉴스 데이터 제거
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
    <div className={styles.newsView}>
      {markedNews.length !== 0 ? (
        <div>
          <img src={mouseOnNews.imageUrl} alt="news-view" />
          <h3>{mouseOnNews.title}</h3>
          <div className={styles.block}>
            <p className={styles.articleDate}>{mouseOnNews.pubDate}</p>
            <button className={styles.bookMarkRemover} onClick={removeBookMark}>
              <FaTrash />
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
