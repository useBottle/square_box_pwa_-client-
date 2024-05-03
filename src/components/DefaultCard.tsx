import { useSelector } from "react-redux";
import styles from "../styles/DefaultCard.module.css";
import { RootState } from "../store/store";

export default function DefaultCard(): JSX.Element {
  const amount = useSelector((state: RootState) => state.amount);

  return (
    <div>
      {amount.map((item, index) => {
        return (
          <div className={`${styles.card} ${styles[item]}`} key={index}>
            <img src={`/images/news_image_${item}.jpg`} alt="replaceImage" className={styles.articleImage} />
            <h3>News</h3>
            <p>Please search for the news...</p>
          </div>
        );
      })}
    </div>
  );
}
