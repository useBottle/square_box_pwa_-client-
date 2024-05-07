import styles from "../styles/DefaultArticle.module.css";

export default function DefaultArticle(): JSX.Element {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.text}>Search for your interests.</div>
    </div>
  );
}
