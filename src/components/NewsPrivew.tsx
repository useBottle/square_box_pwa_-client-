import styles from "../styles/NewsPreview.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentNews } from "../store/newsSlice";
import defaultImage from "../assets/images/news_image_class0.webp";
import { MESSAGE } from "../common/message";

export default function NewsPreview(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const { currentNews } = useSelector((state: RootState) => state.news);
  const { newsData } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    newsData ? dispatch(setCurrentNews(newsData[0])) : null;
  }, [newsData, dispatch]);

  let imageUrl;
  if (currentNews.imageUrls?.[0]?.startsWith("https://") || currentNews.imageUrls?.[0]?.startsWith("http://")) {
    imageUrl = currentNews.imageUrls[0];
  } else {
    imageUrl = defaultImage;
  }

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const refineText =
    currentNews.articleText && koreanRegex.test(currentNews.articleText)
      ? currentNews.articleText
      : MESSAGE.ERROR.NO_ARTICLE;

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.newsPreview}>
        <img src={imageUrl} alt="articleImage" />
        <h3>{currentNews.title}</h3>
        <p className={styles.articleDate}>{currentNews.pubDate}</p>
        <button className={styles.originalLink} onClick={() => openNewTab(currentNews.originallink as string)}>
          원문 링크
        </button>
        <p>{refineText as string}</p>
      </div>
    </div>
  );
}
