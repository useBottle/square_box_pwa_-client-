import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import styles from "../styles/Youtube.module.scss";
import Videos from "../components/Videos";
import Loading from "../components/Loading";
import YoutubePlayer from "../components/YoutubePlayer";
import defaultImage from "../assets/images/youtube_logo.webp";
import { MESSAGE } from "../common/message";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import reissueToken from "../module/reissueToken";
import { setUserCheck, setUsername } from "../store/verificationSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "../types/types";

export default function Youtube(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { youtubeData } = useSelector((state: RootState) => state.data);
  const { youtubeLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");

  const verifyToken = async () => {
    try {
      const response = await reissueToken();
      if (response.status === 200 && accessToken) {
        const decodedToken = jwtDecode<TokenInfo>(accessToken);
        dispatch(setUserCheck(true));
        dispatch(setUsername(decodedToken.username));
      }
    } catch (error) {
      console.error("Token reissue failed.", error);
    }
  };

  useEffect(() => {
    if (!accessToken && refreshToken) {
      verifyToken();
    } else if (!accessToken && !refreshToken) {
      dispatch(setUserCheck(false));
      navigate("/");
    } else if (accessToken) {
      const decodedToken = jwtDecode<TokenInfo>(accessToken);
      dispatch(setUserCheck(true));
      dispatch(setUsername(decodedToken.username));
    }
  }, []);

  return (
    <section className={styles.youtubeContainer}>
      {youtubeLoading === false ? (
        <div>
          <div className={styles.playerContainer}>
            <h4 className={styles.playerTitle}>Player</h4>
            {youtubeData.length !== 0 ? (
              <YoutubePlayer />
            ) : (
              <div className={styles.defaultPlayer}>
                <img src={defaultImage} alt="replacement" />
                <h3>Youtube</h3>
                <p>{MESSAGE.INFO.YOUTUBE_DEFAULT}</p>
              </div>
            )}
          </div>
          <div className={styles.videosContainer}>
            <h4 className={styles.videosTitle}>Videos</h4>{" "}
            {youtubeData.length !== 0 ? (
              <div className={styles.videoList}>
                <Videos />
              </div>
            ) : (
              <div className={`${styles.videoList} ${styles.borderEffect}`}>
                <div className={styles.text}>{MESSAGE.INFO.CONTENTS_DEFAULT}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {youtubeLoading === false && <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>}
    </section>
  );
}
