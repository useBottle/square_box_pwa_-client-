import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/ArticleContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setVisibility } from "../store/visibilitySlice";
import { setCurrentNews } from "../store/currentNewsSlice";
import { setImgIndex } from "../store/imgIndexSlice";

export default function ArticleContainer(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const newsData = useSelector((state: RootState) => state.newsData);

  return (
    <div className={styles.articleList}>
      {newsData.map((item, index) => {
        const onMouseEnter = (): void => {
          dispatch(setCurrentNews(item));
          dispatch(setImgIndex(0));
        };

        // JSX에서 이벤트 핸들러 사용
        return (
          <div
            key={index}
            className={styles.article}
            onMouseEnter={() => {
              dispatch(setVisibility(index));
            }}
            onFocus={() => {
              dispatch(setVisibility(index));
            }}
          >
            <div role="button" tabIndex={0} onMouseEnter={onMouseEnter} onFocus={onMouseEnter}>
              <span style={{ display: "none" }}>{index}</span>
              <h3>{item.title}</h3>
              <p>{item.pubDate}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
