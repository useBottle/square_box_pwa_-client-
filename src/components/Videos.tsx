import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Videos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentYoutube } from "../store/youtubeSlice";

export default function Videos(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { youtubeData } = useSelector((state: RootState) => state.data);

  return (
    <div className={styles.videoSlider}>
      {youtubeData.map((item, index) => {
        const onMouseEnter = (): void => {
          dispatch(setCurrentYoutube(item));
        };

        return (
          <div
            key={index}
            className={styles.videoList}
            onMouseEnter={() => {
              dispatch(setCurrentYoutube(item));
            }}
          >
            <div onMouseEnter={onMouseEnter} className={styles.video}>
              <img src={item.snippet.thumbnails[0].url} alt="thumbnail" />
              <h3>{item.snippet.title}</h3>
              <span className={styles.timeStamp}>{item.snippet.timestamp}</span>
              <span className={styles.views}>{item.snippet.views} views</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
