import { videoProps } from "../types/types";
import styles from "../styles/YoutubePlayer.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentYoutube } from "../store/youtubeSlice";
import YouTube from "react-youtube";

export default function YoutubePreview({ video }: videoProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const { currentYoutube } = useSelector((state: RootState) => state.youtube);
  const channelThumbnails = video.snippet.channelThumbnails[0].url;
  const channelTitle = video.snippet.channelTitle;

  useEffect(() => {
    video ? dispatch(setCurrentYoutube(video)) : null;
  }, [video, dispatch]);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.youtubePreview}>
        <div className={styles.videoSlider}>
          {currentYoutube && currentYoutube.id && (
            <YouTube
              videoId={currentYoutube.id.videoId}
              opts={{
                width: "550",
                height: "350",
                playerVars: {
                  autoplay: 0, // 자동재생 O
                  rel: 0, // 관련 동영상 표시하지 않음
                  modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                },
              }}
              // 이벤트 리스너
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
          <h3>{video.snippet.title}</h3>
          <div className={styles.contentInfo}>
            <div className={styles.detailInfoSet}>
              <span className={styles.timestamp}>{video.snippet.timestamp}</span>
              <span className={styles.views}>{video.snippet.views} views</span>
            </div>
            <button
              className={styles.channel}
              onClick={() => openNewTab("https://www.youtube.com/" + video.snippet.channelHandle)}
            >
              <img src={channelThumbnails} alt="channelId" />
              <span>{channelTitle}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
