import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/ArticleContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNews, setCurrentNewsIndex } from "../store/newsSlice";

export default function ArticleContainer(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { newsData } = useSelector((state: RootState) => state.data);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.articleList}>
        {newsData.map((item, index) => {
          const onMouseEnter = (): void => {
            dispatch(setCurrentNews(item));
          };

          // JSX에서 이벤트 핸들러 사용
          return (
            <div
              key={index}
              className={styles.article}
              onMouseEnter={() => {
                dispatch(setCurrentNewsIndex(index));
              }}
            >
              <div onMouseEnter={onMouseEnter}>
                <h3>{item.title}</h3>
                <p>{item.pubDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
