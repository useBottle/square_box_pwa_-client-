import { NewsProps } from "../types/types";
import styles from "../styles/NewsPrivew.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCurrentNews } from "../store/currentNewsSlice";

export default function NewsPreview({ article }: NewsProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    article ? dispatch(setCurrentNews(article)) : null;
  }, [article, dispatch]);

  const imageUrl = article.imageUrls?.[0]?.startsWith("https://")
    ? article.imageUrls[0]
    : process.env.REACT_APP_DEFAULT_NEWS_IMAGE;

  function cleanText(text: string, keyword1: string, keyword2: string, keyword3: string) {
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

    // 키워드를 중심으로 그 이후 텍스트 삭제.
    const index1 = removeSpaces.indexOf(keyword1);
    if (index1 !== -1) {
      return removeSpaces.slice(0, index1);
    }
    const index2 = removeSpaces.indexOf(keyword2);
    if (index2 !== -1) {
      return removeSpaces.slice(0, index2);
    }

    const index3 = removeSpaces.indexOf(keyword3);
    if (index3 !== -1) {
      return removeSpaces.slice(index3);
    }
    return removeSpaces;
  }

  const editedText = cleanText(article.articleText, "좋아요", "Copyright", "가장크게");

  return (
    <div className={styles.newsPreview}>
      <img src={imageUrl} alt="articleImage" />
      <h3>{article.title}</h3>
      <p className={styles.articleDate}>{article.pubDate}</p>
      <a className={styles.originalLink} href={article.originallink} target="_blank" rel="noreferrer">
        원문 링크
      </a>
      <p>{editedText ? editedText : process.env.REACT_APP_NO_ARTICLE_MESSAGE}</p>
    </div>
  );
}
