import styles from "../styles/YoutubePlayer.module.scss";
import { useCallback, useEffect } from "react";
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
  const channelTitle = currentYoutube.snippet.channelTitle;
  const username = useSelector((state: RootState) => state.verification.username);

  // 유튜브 데이터가 있을 경우, 초기 로드 시에 가장 처음 데이터 보여주기.
  useEffect(() => {
    youtubeData.length !== 0 ? dispatch(setCurrentYoutube(youtubeData[0])) : null;
  }, [youtubeData, dispatch]);

  const addToBookMark = useCallback(async () => {
    // 해당 유저 이름으로 데이터 검색 요청.
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
      console.log(result);

      // 북마크된 데이터 10개 미만인 경우 북마크 추가.
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
  }, [dispatch, username, currentYoutube]);

  return (
    <div className={styles.youtubePreview}>
      <div className={styles.videoSlider}>
        {currentYoutube && currentYoutube.id.videoId ? (
          <YouTube
            key={currentYoutube.id.videoId}
            videoId={currentYoutube.id.videoId}
            opts={{
              width: "100%",
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
            <div className={styles.timestamp}>{currentYoutube.snippet.publishedAt}</div>
            <button className={styles.bookMark} onClick={addToBookMark}>
              <FaBookmark />
            </button>
          </div>
          <div className={styles.channel}>{channelTitle}</div>
          <div className={styles.description}>{currentYoutube.snippet.description}</div>
        </div>
      </div>
    </div>
  );
}
