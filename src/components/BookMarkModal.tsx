import { useDispatch, useSelector } from "react-redux";
import { MESSAGE } from "../common/message";
import styles from "../styles/BookMarkModal.module.scss";
import { AppDispatch, RootState } from "../store/store";
import { FaInfoCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { setBookMarkModalTrigger } from "../store/userInterfaceSlice";

export default function BookMarkModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { newsDataExistence } = useSelector((state: RootState) => state.bookMark);

  return (
    <div className={styles.modalContainer}>
      {newsDataExistence === false ? (
        <div className={styles.modalContents}>
          <div className={styles.infoIcon}>
            <FaInfoCircle />
          </div>
          <h2>{MESSAGE.BOOKMARK.ADD_COMPLETE}</h2>
        </div>
      ) : (
        <div className={styles.modalContents}>
          <div className={styles.infoIcon} style={{ color: "#ff3737" }}>
            <IoIosWarning />
          </div>
          <h2>{MESSAGE.BOOKMARK.ALREADY_EXIST}</h2>
        </div>
      )}
      <button className={styles.confirmBtn} onClick={() => dispatch(setBookMarkModalTrigger(false))}>
        확인
      </button>
    </div>
  );
}
