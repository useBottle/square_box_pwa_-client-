import { Article } from "../types/types";
import styles from "../styles/NewsCard.module.css";

interface NewsCardProps {
  data: Article;
  cardClass: string;
}

export default function NewsCard({ data, cardClass }: NewsCardProps): JSX.Element {
  if (data) {
    return (
      <div className={`${styles.card} ${styles[cardClass]}`}>
        <img src={data.imageUrls[0]} alt="articleImage" className={styles.articleImage} />
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    );
  } else {
    return (
      <div className={`${styles.card} ${styles[cardClass]}`}>
        <img src={`/images/news_image_${cardClass}.jpg`} alt="123" className={styles.articleImage} />
        <h3>News</h3>
        <p>Please search for the news...</p>
      </div>
    );
  }
}
