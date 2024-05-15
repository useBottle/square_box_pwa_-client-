import styles from "../styles/News.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import ArticleContainer from "../components/ArticleContainer";
import { useEffect, useState } from "react";
import NewsPreview from "../components/NewsPrivew";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { setCurrentImg } from "../store/currentImgSlice";

export default function News(): JSX.Element {
  const newsData = useSelector((state: RootState) => state.newsData);
  const current = useSelector((state: RootState) => state.visibility);
  const currentNews = useSelector((state: RootState) => state.currentNews);
  const currentImg = useSelector((state: RootState) => state.currentImg);
  const [borderToggle, setBorderToggle] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (newsData.length !== 0) {
      setBorderToggle(false);
    } else {
      setBorderToggle(true);
    }
  }, [newsData]);

  const onLeftClick = () => {
    if (currentImg === 0) {
      return;
    } else if (currentImg < currentNews.imageUrls.length) {
      dispatch(setCurrentImg(currentImg - 1));
    }
  };

  const onRightClick = () => {
    currentImg < currentNews.imageUrls.length - 1 ? dispatch(setCurrentImg(currentImg + 1)) : null;
  };

  console.log(currentImg);

  return (
    <div>
      <div className={styles.newsContainer}>
        <div className={styles.previewContainer}>
          <div className={styles.topBar}>
            <div className={styles.previewTitle}>Preview</div>
            {currentNews.title !== "" ? (
              <div className={styles.imgSeletor}>
                <IoMdArrowDropleft className={`${styles.leftBtn} ${styles.btn}`} onClick={onLeftClick} />
                <IoMdArrowDropright className={`${styles.rightBtn} ${styles.btn}`} onClick={onRightClick} />
              </div>
            ) : null}
          </div>
          {newsData.length !== 0 ? (
            newsData.slice(current, current + 1).map((item) => <NewsPreview article={item} key={current} />)
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
          <div className={`${styles.articleList} ${borderToggle ? styles.borderEffect : null}`}>
            {newsData.length !== 0 ? (
              <ArticleContainer />
            ) : (
              <div className={styles.text}>Search for your interests.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
