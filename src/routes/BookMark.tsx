import Cookies from "js-cookie";
import styles from "../styles/BookMark.module.scss";
import { useDispatch, useSelector } from "react-redux";
import reissueToken from "../module/reissueToken";
import { setUserCheck, setUsername } from "../store/verificationSlice";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "../types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGE } from "../common/message";
import { RootState } from "../store/store";
import { setSelector } from "../store/bookMarkSlice";
import BookMarkNewsList from "../components/BookMarkNewsList";

export default function BookMark(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = Cookies.get("refreshToken");
  const accessToken = Cookies.get("accessToken");
  const selector = useSelector((state: RootState) => state.bookMark.selector);

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
    <section className={styles.BookMarkContainer}>
      <div className={styles.viewContainer}>
        <h4 className={styles.viewTitle}>View</h4>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h4 className={styles.listTitle}>Contents</h4>
          <div className={styles.selectBtn}>
            <button
              onClick={() => dispatch(setSelector("news"))}
              className={selector === "news" ? styles.selectedBtn : ""}
            >
              News
            </button>
            <button
              onClick={() => dispatch(setSelector("youtube"))}
              className={selector === "youtube" ? styles.selectedBtn : ""}
            >
              Youtube
            </button>
          </div>
        </div>
        <div className={styles.contentList}>
          <BookMarkNewsList />
        </div>
      </div>
      <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>
    </section>
  );
}
