import styles from "../styles/News.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ArticleContainer from "../components/ArticleContainer";
import { useEffect, useState } from "react";
import NewsPreview from "../components/NewsPrivew";
import Loading from "../components/Loading";

export default function News(): JSX.Element {
  const newsData = useSelector((state: RootState) => state.newsData);
  const current = useSelector((state: RootState) => state.visibility);
  const [borderToggle, setBorderToggle] = useState<boolean>(true);
  const darkLightToggle = useSelector((state: RootState) => state.darkLight);
  const previewToggle = useSelector((state: RootState) => state.previewToggle);
  const loadingToggle = useSelector((state: RootState) => state.loadingToggle);

  useEffect(() => {
    if (newsData.length !== 0) {
      setBorderToggle(false);
    } else {
      setBorderToggle(true);
    }
  }, [newsData]);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.newsContainer}>
        {loadingToggle === false ? (
          <div>
            <div className={styles.previewContainer}>
              <h4 className={styles.previewTitle}>Preview</h4>
              {previewToggle === true && (
                <div className={styles.defaultPreview}>
                  <img src={process.env.REACT_APP_DEFAULT_NEWS_IMAGE} alt="replacement" />
                  <h3>News</h3>
                  <p>Please search for the news...</p>
                </div>
              )}
              {newsData.length !== 0 &&
                newsData.slice(current, current + 1).map((item) => <NewsPreview article={item} key={current} />)}
            </div>
            <div className={styles.contentsContainer}>
              <h4 className={styles.contentsTitle}>Contents</h4>
              <div className={`${styles.articleList} ${borderToggle ? styles.borderEffect : null}`}>
                {newsData.length !== 0 ? (
                  <ArticleContainer />
                ) : (
                  <div className={styles.text}>Search for your interests.</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}
