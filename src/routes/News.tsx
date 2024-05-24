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
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.newsContainer}>
        {loadingToggle === false ? (
          <div>
            <div className={styles.previewContainer}>
              <div className={styles.previewTitle}>Preview</div>
              {previewToggle === true && (
                <div className={styles.defaultPreview}>
                  <img src="images/news_image_class0.jpg" alt="replacement" />
                  <h3>News</h3>
                  <p>Please search for the news...</p>
                </div>
              )}
              {/* {newsData.length !== 0 && loadingToggle === false
            ? newsData.slice(current, current + 1).map((item) => <NewsPreview article={item} key={current} />)
            : loadingToggle === true && <Loading />}
          {newsData.length !== 0 && loadingToggle === true && <Loading />} */}
              {newsData.length !== 0 &&
                newsData.slice(current, current + 1).map((item) => <NewsPreview article={item} key={current} />)}
            </div>
            <div className={styles.contentsContainer}>
              <div className={styles.contentsTitle}>Contents</div>
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
    </div>
  );
}
