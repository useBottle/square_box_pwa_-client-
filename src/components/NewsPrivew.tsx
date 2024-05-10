import { NewsProps } from "../types/types";
import styles from "../styles/NewsPrivew.module.css";

export default function NewsPreview({ article }: NewsProps): JSX.Element {
  const isHttps = article.imageUrls[0].startsWith("https://");
  return (
    <div className={styles.newsPreview}>
      <img src={isHttps ? article.imageUrls[0] : "/images/news_image_class0.jpg"} alt="articleImage" />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
    </div>
  );
}
