import YouTube, { YouTubeEvent } from "react-youtube";
import styles from "../styles/BookMarkYoutubeView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useCallback, useEffect } from "react";
import { setMarkedYoutube, setMouseOnYoutube } from "../store/bookMarkSlice";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { MESSAGE } from "../common/message";

export default function BookMarkYoutubeView(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { markedYoutube } = useSelector((state: RootState) => state.bookMark);
  const { mouseOnYoutube } = useSelector((state: RootState) => state.bookMark);
  const youtubeId = useSelector((state: RootState) => state.bookMark.youtubeId);

  // 북마크된 유튜브 데이터가 있을 경우 초기 로드 시에 가장 처음 데이터 보여주기.
  useEffect(() => {
    markedYoutube.length !== 0 ? dispatch(setMouseOnYoutube(markedYoutube[0])) : null;
  }, [markedYoutube, dispatch]);

  // a 태그 대신 사용. 브라우저 하단에 URL 미리보기 나타나는 것 방지하기 위한 용도.
  const openNewTab = useCallback((url: string): void => {
    window.open(url, "_blank", "noopener, noreferrer");
  }, []);

  // 북마크 유튜브 데이터 제거.
  const removeBookMark = useCallback(async (): Promise<void> => {
    // UI 에서 즉시 제거.
    const removedYoutubeArray = markedYoutube.filter((item) => item.videoId !== mouseOnYoutube.videoId);
    dispatch(setMarkedYoutube(removedYoutubeArray));

    // DB 에 저장된 북마크된 유튜브 데이터에서 제거할 수 있도록 해당 newsId 전송.
    try {
      await axios.put(
        process.env.REACT_APP_DELETE_YOUTUBE as string,
        { youtubeId },
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Data remove request is failed.", error);
    }
  }, [dispatch, mouseOnYoutube, youtubeId]);

  return (
    <div className={styles.youtubeView}>
      {markedYoutube.length !== 0 ? (
        <div className={styles.videoSlider}>
          <YouTube
            videoId={mouseOnYoutube.videoId}
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
            onEnd={(e: YouTubeEvent) => {
              e.target.stopVideo(0);
            }}
          />

          <h3>{mouseOnYoutube.title}</h3>
          <div className={styles.contentInfo}>
            <div className={styles.detailInfoSet}>
              <button
                className={styles.channel}
                onClick={() => openNewTab("https://www.youtube.com/" + mouseOnYoutube.channelHandle)}
              >
                <img src={mouseOnYoutube.channelThumbnail} alt="channelId" />
                <span>{mouseOnYoutube.channelTitle}</span>
              </button>
              <button className={styles.bookMarkRemover} onClick={removeBookMark}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.defaultView}>{MESSAGE.BOOKMARK.DEFAULT_INFO}</div>
      )}
    </div>
  );
}
