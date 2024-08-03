import styles from "../styles/News.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import NewsPreview from "../components/NewsPreview";
import Loading from "../components/Loading";
import Articles from "../components/Articles";
import defaultImage from "../assets/images/news_image_class0.webp";
import { MESSAGE } from "../common/message";
import { useEffect } from "react";
import { setMenuIndex } from "../store/userInterfaceSlice";

export default function News(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { newsData } = useSelector((state: RootState) => state.data);
  const { newsLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);

  useEffect(() => {
    dispatch(setMenuIndex(1));
  }, [dispatch]);

  return (
    <section className={styles.newsContainer}>
      {newsLoading === false ? (
        <div className={styles.innerFrame}>
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
    </section>
  );
}
