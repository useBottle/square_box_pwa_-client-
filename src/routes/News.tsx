import styles from "../styles/News.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewsPreview from "../components/NewsPrivew";
import Loading from "../components/Loading";
import Articles from "../components/Articles";
import defaultImage from "../assets/images/news_image_class0.webp";
import { MESSAGE } from "../common/message";

export default function News(): JSX.Element {
  const { newsData } = useSelector((state: RootState) => state.data);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const { newsLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.newsContainer}>
        {newsLoading === false ? (
          <div>
            <div className={styles.previewContainer}>
              <h4 className={styles.previewTitle}>Preview</h4>
              {newsData.length !== 0 ? (
                <NewsPreview />
              ) : (
                <div className={styles.defaultPreview}>
                  <img src={defaultImage} alt="replacement" />
                  <h3>News</h3>
                  <p>{MESSAGE.INFO.NEWS_DEFAULT}</p>
                </div>
              )}
            </div>
            <div className={styles.contentsContainer}>
              <h4 className={styles.contentsTitle}>Articles</h4>
              {newsData.length !== 0 ? (
                <div className={styles.articleList}>
                  <Articles />
                </div>
              ) : (
                <div className={`${styles.articleList} ${styles.borderEffect}`}>
                  <div className={styles.text}>{MESSAGE.INFO.CONTENTS_DEFAULT}</div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
        {newsLoading === false && <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>}
      </div>
    </section>
  );
}
