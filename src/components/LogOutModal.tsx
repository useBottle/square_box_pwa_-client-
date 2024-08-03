import { useDispatch } from "react-redux";
import { MESSAGE } from "../common/message";
import styles from "../styles/LogOutModal.module.scss";
import { AppDispatch } from "../store/store";
import { setLogOutModalTrigger, setNavSwitch } from "../store/userInterfaceSlice";
import { setUserCheck } from "../store/verificationSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogOutModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_DELETE_TOKEN, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(setUserCheck(false));
        dispatch(setLogOutModalTrigger(false));
        dispatch(setNavSwitch(false));
        navigate("/");
      }
    } catch (error) {
      console.error("Tokens are invalid.", error);
    }
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
