import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/BookMarkYoutubeList.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { setMarkedYoutube, setMouseOnYoutube, setYoutubeId } from "../store/bookMarkSlice";
import { MESSAGE } from "../common/message";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";

export default function BookMarkYoutubeList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { markedYoutube } = useSelector((state: RootState) => state.bookMark);
  const { mouseOnYoutube } = useSelector((state: RootState) => state.bookMark);
  const youtubeId = useSelector((state: RootState) => state.bookMark.youtubeId);

  // 리스트에서 onMouse 된 요소의 ID 값 저장.
  useEffect(() => {
    dispatch(setYoutubeId(mouseOnYoutube._id));
  }, [mouseOnYoutube, dispatch]);

  // 북마크 유튜브 데이터 제거.
  const removeBookMark = async (): Promise<void> => {
    // UI 에서 즉시 제거.
    const removedYoutubeArray = markedYoutube.filter((item) => item.videoId !== mouseOnYoutube.videoId);
    dispatch(setMarkedYoutube(removedYoutubeArray));

    // DB 에 저장된 북마크된 유튜브 데이터에서 제거할 수 있도록 해당 youtubeId 전송.
    try {
      await axios.put(
        process.env.REACT_APP_DELETE_YOUTUBE as string,
        { youtubeId },
        { headers: { "Content-Type": "application/json" } },
      );
    } catch (error) {
      console.error("Data remove request is failed.", error);
    }
  };

  return (
    <div>
      {markedYoutube.length !== 0 ? (
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
                  <div className={styles.block1}>
                    <h3>{item.title}</h3>
                    <div className={styles.block2}>
                      <p>{item.channelTitle}</p>
                      <button onClick={removeBookMark}>
                        <FaTrash className={styles.bookMarkRemover} />
                      </button>
                    </div>
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
