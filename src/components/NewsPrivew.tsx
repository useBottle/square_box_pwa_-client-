import { NewsProps } from "../types/types";
import styles from "../styles/NewsPrivew.module.css";
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

  const imageUrl = article.imageUrls?.[0]?.startsWith("https://")
    ? article.imageUrls[0]
    : process.env.REACT_APP_DEFAULT_NEWS_IMAGE;

  function cleanText(text: string): string | void {
    try {
      // 빈 줄을 기준으로 텍스트를 분할
      let sections = text.split(/\n\s*\n/);

      // 20자 이하의 섹션 제거
      sections = sections.filter((section) => section.trim().length > 20);

      // 모든 섹션을 하나의 문자열로 병합하고, 두 줄 이상의 빈 줄을 하나로 통일
      const pressedText = sections.join("\n\n").replace(/\n{3,}/g, "\n\n");

      // "다." 문자를 기준으로 줄 바꿈 삽입하여 문단 나누기.
      const addEmptyLine = pressedText.replace(/다\.\s*(?=\S)/g, "다.\n\n");

      // 텍스트 전문의 맨 앞과 뒤의 공백 모두 제거.
      const removeSpaces = addEmptyLine.trim();

      return removeSpaces;
    } catch (error) {
      console.error(error);
    }
  }

  const editedText = article.articleText
    ? cleanText(article.articleText)
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
        <p>{editedText as string}</p>
      </div>
    </div>
  );
}
