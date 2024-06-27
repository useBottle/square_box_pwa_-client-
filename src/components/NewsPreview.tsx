import styles from "../styles/NewsPreview.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentNews } from "../store/newsSlice";
import defaultImage from "../assets/images/news_image_class0.webp";
import { MESSAGE } from "../common/message";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";
import { setNewsDataExistence } from "../store/bookMarkSlice";
import { setBookMarkLimitModalTrigger, setBookMarkModalTrigger } from "../store/userInterfaceSlice";

export default function NewsPreview(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { currentNews } = useSelector((state: RootState) => state.news);
  const { newsData } = useSelector((state: RootState) => state.data);
  const username = useSelector((state: RootState) => state.verification.username);

  useEffect(() => {
    newsData.length !== 0 ? dispatch(setCurrentNews(newsData[0])) : null;
  }, [newsData, dispatch]);

  let imageUrl;
  if (currentNews.imageUrls?.[0]?.startsWith("https://") || currentNews.imageUrls?.[0]?.startsWith("http://")) {
    imageUrl = currentNews.imageUrls[0];
  } else {
    imageUrl = defaultImage;
  }

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const refinedText =
    currentNews.articleText && koreanRegex.test(currentNews.articleText)
      ? currentNews.articleText
      : MESSAGE.ERROR.NO_ARTICLE;

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const bookMarkNewsData = {
    title: currentNews.title,
    pubDate: currentNews.pubDate,
    originallink: currentNews.originallink,
    imageUrl: currentNews.imageUrls[0],
    articleText: refinedText,
  };

  const addToBookMark = async (): Promise<void> => {
    try {
      const result = await axios.put(
        process.env.REACT_APP_FIND_DATA as string,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (result.data.newsData.length < 10) {
        const response = await axios.post(
          process.env.REACT_APP_ADD_NEWS_DATA,
          { bookMarkNewsData, username },
          {
            headers: {
              "Content-Type": "application/json",
            },
            validateStatus: (status) => {
              return status >= 200 && status < 500;
            },
          },
        );
        if (response.status === 409) {
          dispatch(setNewsDataExistence(true));
        } else if (response.status === 200) {
          dispatch(setNewsDataExistence(false));
        }
        dispatch(setBookMarkModalTrigger(true));
      } else if (result.data.newsData.length >= 10) {
        dispatch(setBookMarkLimitModalTrigger(true));
      }
    } catch (error) {
      console.error("News data upload fail.");
    }
  };

  return (
    <div>
      <div className={styles.newsPreview}>
        <img src={imageUrl} alt="articleImage" />
        <h3>{currentNews.title}</h3>
        <div className={styles.block}>
          <p className={styles.articleDate}>{currentNews.pubDate}</p>
          <button className={styles.bookMark} onClick={addToBookMark}>
            <FaBookmark />
          </button>
        </div>
        <button className={styles.originalLink} onClick={() => openNewTab(currentNews.originallink as string)}>
          원문 링크
        </button>
        <p>{refinedText as string}</p>
      </div>
    </div>
  );
}
