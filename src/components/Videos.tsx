import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Videos.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentYoutube } from "../store/youtubeSlice";
import { YouTubeVideo } from "../types/types";
import { useEffect } from "react";

export default function Videos(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { youtubeData } = useSelector((state: RootState) => state.data);

  const onMouseEnter = (item: YouTubeVideo): void => {
    dispatch(setCurrentYoutube(item));
  };

  return (
    <div className={styles.videoSlider}>
      {youtubeData.map((item, index) => {
        return (
          <div key={index} className={styles.videoList}>
            <div onMouseEnter={() => onMouseEnter(item)} className={styles.video}>
              <img
                src={item.snippet.thumbnails.high !== undefined ? item.snippet.thumbnails.high.url : ""}
                alt="thumbnail"
              />
              <div className={styles.videoText}>
                <h3>{item.snippet.title}</h3>
                <div className={styles.block}>
                  <span className={styles.timeStamp}>{item.snippet.publishedAt}</span>
                  <span className={styles.channelTitle}>{item.snippet.channelTitle}</span>
                  <span className={styles.description}>{item.snippet.description}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
