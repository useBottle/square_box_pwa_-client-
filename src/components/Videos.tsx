import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Videos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentYoutube, setCurrentYoutubeIndex } from "../store/youtubeSlice";

export default function Videos(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { youtubeData } = useSelector((state: RootState) => state.data);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
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
                dispatch(setCurrentYoutubeIndex(index));
              }}
            >
              <div onMouseEnter={onMouseEnter} className={styles.video}>
                <h3>{item.snippet.title}</h3>
                <p>{item.snippet.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
