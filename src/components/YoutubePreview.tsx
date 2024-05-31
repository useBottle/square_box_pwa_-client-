import { videoProps } from "../types/types";
import styles from "../styles/NewsPrivew.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentYoutube } from "../store/youtubeSlice";

export default function YoutubePreview({ video }: videoProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  useEffect(() => {
    video ? dispatch(setCurrentYoutube(video)) : null;
  }, [video, dispatch]);

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.youtubePreview}>
        <h3>{video.snippet.title}</h3>
        <p className={styles.youtubeDate}>{video.snippet.timestamp}</p>
      </div>
    </div>
  );
}
