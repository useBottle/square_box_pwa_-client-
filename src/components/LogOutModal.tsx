import { useDispatch } from "react-redux";
import { MESSAGE } from "../common/message";
import styles from "../styles/LogOutModal.module.scss";
import { AppDispatch } from "../store/store";
import { setLogOutModalTrigger, setNavSwitch } from "../store/userInterfaceSlice";
import Cookies from "js-cookie";
import { setUserCheck } from "../store/verificationSlice";
import { useNavigate } from "react-router-dom";

export default function LogOutModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logOut = (): void => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(setUserCheck(false));
    dispatch(setLogOutModalTrigger(false));
    dispatch(setNavSwitch(false));
    navigate("/");
  };

  return (
    <div className={styles.modalContainer}>
      <h4>{MESSAGE.LOGOUT.CONFIRM}</h4>
      <div className={styles.btnSet}>
        <button onClick={logOut}>확인</button>
        <button onClick={() => dispatch(setLogOutModalTrigger(false))}>취소</button>
      </div>
    </div>
  );
}
