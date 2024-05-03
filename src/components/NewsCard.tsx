import styles from "../styles/NewsCard.module.css";
import { NewsCardProps } from "../types/types";

export default function NewsCard({ article, index }: NewsCardProps): JSX.Element {
  const styleValue = `card${index}`;
  const isHttps = article.imageUrls[0].startsWith("https://");
  return (
    <div className={`${styles.card} ${styles[styleValue]}`}>
      <img
        src={isHttps ? article.imageUrls[0] : "/images/news_image_class0.jpg"}
        alt="articleImage"
        className={styles.articleImage}
      />
      <h3>{article.title}</h3>
      <p>{article.description}</p>
    </div>
  );
}
