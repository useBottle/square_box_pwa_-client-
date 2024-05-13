import { NewsProps } from "../types/types";
import styles from "../styles/NewsPrivew.module.css";

export default function NewsPreview({ article }: NewsProps): JSX.Element {
  const imageUrl = article.imageUrls?.[0]?.startsWith("https://")
    ? article.imageUrls[0]
    : process.env.REACT_APP_DEFAULT_NEWS_IMAGE;

  function cleanText(text: string) {
    // 빈 줄을 기준으로 텍스트를 분할
    let sections = text.split(/\n\s*\n/);

    // 20자 이하의 섹션 제거
    sections = sections.filter((section) => section.trim().length > 20);

    // 모든 섹션을 하나의 문자열로 병합하고, 두 줄 이상의 빈 줄을 하나로 통일
    return sections.join("\n\n").replace(/\n{3,}/g, "\n\n");
  }

  // "다." 문자를 기준으로 줄 바꿈 삽입하여 문단 나누기.
  function addEmptyLine(text: string) {
    return text.replace(/다\.\s*(?=\S)/g, "다.\n\n");
  }

  // 텍스트 전문의 맨 앞과 뒤의 공백 모두 제거.
  function removeSpaces(text: string) {
    return text.trim();
  }

  const cleandText = cleanText(article.articleText);
  const removedEmptyText = addEmptyLine(cleandText);
  const editedText = removeSpaces(removedEmptyText);
  return (
    <div className={styles.newsPreview}>
      <img src={imageUrl} alt="articleImage" />
      <h3>{article.title}</h3>
      <a className={styles.originalLink} href={article.originallink} target="_blank" rel="noreferrer">
        원문 링크
      </a>
      <p>{editedText ? editedText : process.env.REACT_APP_NO_ARTICLE_MESSAGE}</p>
    </div>
  );
}
