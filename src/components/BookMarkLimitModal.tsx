import styles from "../styles/BookMarkLimitModal.module.scss";
import { MESSAGE } from "../common/message";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setBookMarkLimitModalTrigger } from "../store/userInterfaceSlice";
import { IoIosWarning } from "react-icons/io";

export default function BookMarkLimitModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={styles.modalContainer}>
      <div className={styles.infoIcon}>
        <IoIosWarning style={{ color: "#ff3737" }} />
      </div>
      <h2>{MESSAGE.BOOKMARK.NUMBER_LIMIT}</h2>
      <button className={styles.confirmBtn} onClick={() => dispatch(setBookMarkLimitModalTrigger(false))}>
        확인
      </button>
    </div>
  );
}
