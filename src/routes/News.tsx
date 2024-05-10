import styles from "../styles/News.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ArticleContainer from "../components/ArticleContainer";
import { useEffect, useState } from "react";
import NewsPreview from "../components/NewsPrivew";

export default function News(): JSX.Element {
  const data = useSelector((state: RootState) => state.data);
  const current = useSelector((state: RootState) => state.visibility);
  const [toggle, setToggle] = useState<boolean>(true);
  useEffect(() => {
    if (data.length !== 0) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [data]);

  return (
    <div className={styles.newsContainer}>
      <div className={styles.previewContainer}>
        <div className={styles.previewTitle}>Preview</div>
        {data.length !== 0 ? (
          data.slice(current, current + 1).map((item) => <NewsPreview article={item} key={current} />)
        ) : (
          <div className={styles.defaultPreview}>
            <img src="images/news_image_class0.jpg" alt="replacement" />
            <h3>News</h3>
            <p>Please search for the news...</p>
          </div>
        )}
      </div>
      <div className={styles.contentsContainer}>
        <div className={styles.contentsTitle}>Contents</div>
        <div className={`${styles.articleList} ${toggle ? styles.borderEffect : null}`}>
          {data.length !== 0 ? <ArticleContainer /> : <div className={styles.text}>Search for your interests.</div>}
        </div>
      </div>
    </div>
  );
}
