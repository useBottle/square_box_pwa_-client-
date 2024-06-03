import { NewsProps } from "../types/types";
import styles from "../styles/NewsPreview.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentNews } from "../store/newsSlice";

export default function NewsPreview({ article }: NewsProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  useEffect(() => {
    article ? dispatch(setCurrentNews(article)) : null;
  }, [article, dispatch]);

  let imageUrl;
  if (article.imageUrls?.[0]?.startsWith("https://")) {
    imageUrl = article.imageUrls[0];
  } else if (article.imageUrls?.[0]?.startsWith("http://")) {
    imageUrl = article.imageUrls[0];
  } else {
    imageUrl = process.env.REACT_APP_DEFAULT_NEWS_IMAGE;
  }

  const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const refineText =
    article.articleText && koreanRegex.test(article.articleText)
      ? article.articleText
      : (process.env.REACT_APP_NO_ARTICLE_MESSAGE as string);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.newsPreview}>
        <img src={imageUrl} alt="articleImage" />
        <h3>{article.title}</h3>
        <p className={styles.articleDate}>{article.pubDate}</p>
        <button className={styles.originalLink} onClick={() => openNewTab(article.originallink as string)}>
          원문 링크
        </button>
        <p>{refineText as string}</p>
      </div>
    </div>
  );
}
