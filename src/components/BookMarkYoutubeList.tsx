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

  useEffect(() => {
    dispatch(setYoutubeId(mouseOnYoutube._id));
  }, [mouseOnYoutube]);

  const removeBookMark = async (): Promise<void> => {
    const removedYoutubeArray = markedYoutube.filter((item) => item.videoId !== mouseOnYoutube.videoId);
    dispatch(setMarkedYoutube(removedYoutubeArray));

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
                  <h3>{item.title}</h3>
                  <div className={styles.block}>
                    <p>{item.channelTitle}</p>
                    <button onClick={removeBookMark}>
                      <FaTrash className={styles.bookMarkRemover} />
                    </button>
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
