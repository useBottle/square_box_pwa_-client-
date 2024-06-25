import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/BookMarkNewsList.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { setMouseOnNews } from "../store/bookMarkSlice";
import { MESSAGE } from "../common/message";

export default function BookMarkNewsList(): JSX.Element {
  const { markedNews } = useSelector((state: RootState) => state.bookMark);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      {markedNews.length !== 0 ? (
        <div className={styles.newsSlider}>
          {markedNews.map((item, index) => {
            const onMouseEnter = (): void => {
              dispatch(setMouseOnNews(item));
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
      ) : (
        <div className={styles.defaultView}>{MESSAGE.BOOKMARK.DEFAULT_INFO}</div>
      )}
    </div>
  );
}
