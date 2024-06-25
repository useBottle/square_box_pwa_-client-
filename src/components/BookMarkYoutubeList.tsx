import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/BookMarkYoutubeList.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { setMouseOnYoutube } from "../store/bookMarkSlice";

export default function BookMarkYoutubeList(): JSX.Element {
  const { markedYoutube } = useSelector((state: RootState) => state.bookMark);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.videoSlider}>
      {markedYoutube.map((item, index) => {
        const onMouseEnter = (): void => {
          dispatch(setMouseOnYoutube(item));
        };

        return (
          <div
            key={index}
            className={styles.videoList}
            onMouseEnter={() => {
              dispatch(setMouseOnYoutube(item));
            }}
          >
            <div onMouseEnter={onMouseEnter} className={styles.video}>
              <img src={item.thumbnail} alt="thumbnail" />
              <h3>{item.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
