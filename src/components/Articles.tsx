import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Articles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNews } from "../store/newsSlice";

export default function Articles(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { newsData } = useSelector((state: RootState) => state.data);

  return (
    <div className={styles.articleSlider}>
      {newsData.map((item, index) => {
        const onMouseEnter = (): void => {
          dispatch(setCurrentNews(item));
        };

        return (
          <div className={styles.articleSet} key={index}>
            <div onMouseEnter={onMouseEnter} className={styles.article}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.pubDate}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
