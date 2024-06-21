import Cookies from "js-cookie";
import styles from "../styles/BookMark.module.scss";
import { useDispatch } from "react-redux";
import reissueToken from "../module/reissueToken";
import { setUserCheck, setUsername } from "../store/verificationSlice";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "../types/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookMark(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <section className={styles.BookMarkContainer}>
      <div></div>
    </section>
  );
}
