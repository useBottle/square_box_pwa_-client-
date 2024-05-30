import styles from "../styles/News.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ArticleContainer from "../components/ArticleContainer";
import { useEffect, useState } from "react";
import NewsPreview from "../components/NewsPrivew";
import Loading from "../components/Loading";

export default function News(): JSX.Element {
  const { newsData } = useSelector((state: RootState) => state.data);
  const { currentNewsIndex } = useSelector((state: RootState) => state.newsState);
  const [borderToggle, setBorderToggle] = useState<boolean>(true);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const { previewToggle } = useSelector((state: RootState) => state.newsState);
  const { newsLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);

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
        {newsLoading === false ? (
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
                newsData
                  .slice(currentNewsIndex, currentNewsIndex + 1)
                  .map((item) => <NewsPreview article={item} key={currentNewsIndex} />)}
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
