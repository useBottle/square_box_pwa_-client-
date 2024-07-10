import styles from "../styles/YoutubePlayer.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentYoutube } from "../store/youtubeSlice";
import YouTube, { YouTubeEvent } from "react-youtube";
import defaultImage from "../assets/images/youtube_logo.webp";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";
import { setBookMarkLimitModalTrigger, setBookMarkModalTrigger } from "../store/userInterfaceSlice";
import { setBookMarkDataExistence } from "../store/bookMarkSlice";

export default function YoutubePreview(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { currentYoutube } = useSelector((state: RootState) => state.youtube);
  const { youtubeData } = useSelector((state: RootState) => state.data);
  const channelThumbnails = currentYoutube.snippet.channelThumbnails[0].url;
  const channelTitle = currentYoutube.snippet.channelTitle;
  const username = useSelector((state: RootState) => state.verification.username);

  useEffect(() => {
    youtubeData.length !== 0 ? dispatch(setCurrentYoutube(youtubeData[0])) : null;
  }, [youtubeData, dispatch]);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = (url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const addToBookMark = async () => {
    try {
      const result = await axios.put(
        process.env.REACT_APP_FIND_DATA as string,
        { username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (result.data.youtubeData.length < 10) {
        const response = await axios.post(
          process.env.REACT_APP_ADD_YOUTUBE_DATA,
          { currentYoutube, username },
          {
            headers: {
              "Content-Type": "application/json",
            },
            validateStatus: (status) => {
              return status >= 200 && status < 500;
            },
          },
        );
        if (response.status === 409) {
          dispatch(setBookMarkDataExistence(true));
        } else if (response.status === 200) {
          dispatch(setBookMarkDataExistence(false));
        }
        dispatch(setBookMarkModalTrigger(true));
      } else if (result.data.youtubeData.length >= 10) {
        dispatch(setBookMarkLimitModalTrigger(true));
      }
    } catch (error) {
      console.error("Youtube data upload fail.");
    }
  };

  return (
    <div className={styles.youtubePreview}>
      <div className={styles.videoSlider}>
        {currentYoutube && currentYoutube.id ? (
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
            onEnd={(e: YouTubeEvent) => {
              e.target.stopVideo(0);
            }}
          />
        ) : (
          <img src={defaultImage} alt="defaultImage" />
        )}
        <h3>{currentYoutube.snippet.title}</h3>
        <div className={styles.contentInfo}>
          <div className={styles.detailInfoSet}>
            <span>{currentYoutube.snippet.timestamp}</span>
            <span className={styles.views}>{currentYoutube.snippet.views} views</span>
            <button className={styles.bookMark} onClick={addToBookMark}>
              <FaBookmark />
            </button>
          </div>
          <button
            className={styles.channel}
            onClick={() => openNewTab("https://www.youtube.com/" + currentYoutube.snippet.channelHandle)}
          >
            <img src={channelThumbnails} alt="channelId" />
            <span>{channelTitle}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
