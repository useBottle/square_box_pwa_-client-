import styles from "../styles/SearchModal.module.css";
import { FaNewspaper, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { setMenuIndex, setSearchModalTrigger } from "../store/userInterfaceSlice";
import { MdCancel } from "react-icons/md";

export default function SearchModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const modalItem = [
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
  ];

  return (
    <div data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.modalContainer}>
        <h2>{process.env.REACT_APP_MODAL_MESSAGE}</h2>
        <ul>
          {modalItem.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  dispatch(setSearchModalTrigger(false));
                  dispatch(setMenuIndex(index + 1));
                  navigate(`${item.path}`);
                }}
              >
                <div className={styles.itemContainer}>
                  <div className={styles.icon}>{item.icon}</div>
                  <div className={styles.label}>{item.label}</div>
                </div>
              </li>
            );
          })}
        </ul>
        <button className={styles.cancel} onClick={() => dispatch(setSearchModalTrigger(false))}>
          <MdCancel />
        </button>
      </div>
    </div>
  );
}
