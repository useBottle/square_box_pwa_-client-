import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "../styles/Youtube.module.css";
import { useEffect, useState } from "react";
import Videos from "../components/Videos";
import Loading from "../components/Loading";
import YoutubePlayer from "../components/YoutubePlayer";

export default function Youtube(): JSX.Element {
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const [borderToggle, setBorderToggle] = useState<boolean>(true);
  const { youtubeData } = useSelector((state: RootState) => state.data);
  const { youtubeLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);
  const { playerToggle } = useSelector((state: RootState) => state.youtube);

  useEffect(() => {
    if (youtubeData.length !== 0) {
      setBorderToggle(false);
    } else {
      setBorderToggle(true);
    }
  }, [youtubeData]);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.youtubeContainer}>
        {youtubeLoading === false ? (
          <div>
            <div className={styles.playerContainer}>
              <h4 className={styles.playerTitle}>Player</h4>
              {playerToggle === true && (
                <div className={styles.defaultPlayer}>
                  <img src={process.env.REACT_APP_DEFAULT_YOUTUBE_IMAGE} alt="replacement" />
                  <h3>Youtube</h3>
                  <p>{process.env.REACT_APP_YOUTUBE_DEFAULT}</p>
                </div>
              )}
              {youtubeData.length !== 0 && <YoutubePlayer />}
            </div>
            <div className={styles.videosContainer}>
              <h4 className={styles.videosTitle}>Videos</h4>
              <div className={`${styles.videoList} ${borderToggle ? styles.borderEffect : null}`}>
                {youtubeData.length !== 0 ? (
                  <Videos />
                ) : (
                  <div className={styles.text}>{process.env.REACT_APP_CONTENTS_DEFAULT}</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
        {youtubeLoading === false && <p className={styles.notice}>{process.env.REACT_APP_EXTENSION_NOTICE}</p>}
      </div>
    </section>
  );
}
