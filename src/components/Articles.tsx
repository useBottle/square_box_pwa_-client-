import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Articles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNews } from "../store/newsSlice";

export default function Articles(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { newsData } = useSelector((state: RootState) => state.data);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.articleSlider}>
        {newsData.map((item, index) => {
          const onMouseEnter = (): void => {
            dispatch(setCurrentNews(item));
          };

          return (
            <div
              key={index}
              className={styles.articleList}
              onMouseEnter={() => {
                dispatch(setCurrentNews(item));
              }}
            >
              <div onMouseEnter={onMouseEnter} className={styles.article}>
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
