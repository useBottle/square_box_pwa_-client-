import styles from "../styles/News.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import NewsPreview from "../components/NewsPreview";
import Loading from "../components/Loading";
import Articles from "../components/Articles";
import defaultImage from "../assets/images/news_image_class0.webp";
import { MESSAGE } from "../common/message";
import { useEffect } from "react";
import reissueToken from "../module/reissueToken";
import { setUserCheck, setUsername } from "../store/verificationSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "../types/types";
import { setMenuIndex } from "../store/userInterfaceSlice";

export default function News(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { newsData } = useSelector((state: RootState) => state.data);
  const { newsLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);
  const { userCheck } = useSelector((state: RootState) => state.verification);
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");

  // 엑세스 토큰 재발급 후 인증 처리.
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

  // 보유한 토큰에 따라 인증 처리 및 리디렉션.
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
    dispatch(setMenuIndex(1));
  }, [userCheck, dispatch, navigate]);

  return (
    <section className={styles.newsContainer}>
      {newsLoading === false ? (
        <div className={styles.innerFrame}>
          <div className={styles.previewContainer}>
            <h4 className={styles.previewTitle}>Preview</h4>
            {newsData.length !== 0 ? (
              <NewsPreview />
            ) : (
              <div className={styles.defaultPreview}>
                <img src={defaultImage} alt="replacement" />
                <h3>News</h3>
                <p>{MESSAGE.INFO.NEWS_DEFAULT}</p>
              </div>
            )}
          </div>
          <div className={styles.contentsContainer}>
            <h4 className={styles.contentsTitle}>Articles</h4>
            {newsData.length !== 0 ? (
              <div className={styles.articleList}>
                <Articles />
              </div>
            ) : (
              <div className={`${styles.articleList} ${styles.borderEffect}`}>
                <div className={styles.text}>{MESSAGE.INFO.CONTENTS_DEFAULT}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      {newsLoading === false && <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>}
    </section>
  );
}
