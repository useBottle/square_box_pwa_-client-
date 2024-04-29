import { Article } from "../types/types";
import styles from "../styles/NewsCard.module.css";

interface NewsCardProps {
  data: Article;
  unique: string;
}

export default function NewsCard({ data, unique }: NewsCardProps): JSX.Element {
  if (data) {
    return (
      <div className={`${styles.card} ${styles[unique]}`}>
        <img src={data.imageUrls[0]} alt="articleImage" className={styles.articleImage} />
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    );
  } else {
    return <div className={styles.card}></div>;
  }
}
