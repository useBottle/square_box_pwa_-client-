import { Indicator } from "../types/types";
import { FaPlus, FaMinus, FaCaretUp, FaCaretDown } from "react-icons/fa6";
import styles from "../styles/Home.module.css";

export default function KeywordIndicator({ indicator }: Indicator): JSX.Element | undefined {
  if (indicator === "n") {
    return <FaPlus className={`${styles.new} ${styles.indicator}`} />;
  } else if (indicator === "s") {
    return <FaMinus className={`${styles.stay} ${styles.indicator}`} />;
  } else if (indicator === "+") {
    return <FaCaretUp className={`${styles.up} ${styles.indicator}`} />;
  } else if (indicator === "-") {
    return <FaCaretDown className={`${styles.down} ${styles.indicator}`} />;
  }
}
