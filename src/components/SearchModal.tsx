import styles from "../styles/SearchModal.module.css";
import { FaNewspaper, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchModalTrigger } from "../store/searchModalTriggerSlice";
import { setIconIndex } from "../store/iconIndexSlice";
import { AppDispatch } from "../store/store";

export default function SearchModal(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const modalItem = [
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
    { path: "/instagram", icon: <FaInstagram />, label: "Instagram" },
    { path: "/x", icon: <FaXTwitter />, label: "X" },
  ];

  return (
    <div className={styles.modalContainer}>
      <h2>검색에 사용할 플랫폼을 선택해주세요</h2>
      <ul>
        {modalItem.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                dispatch(setSearchModalTrigger("none"));
                dispatch(setIconIndex(index));
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
    </div>
  );
}
