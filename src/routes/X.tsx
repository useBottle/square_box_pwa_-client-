import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import styles from "../styles/X.module.css";

export default function X(): JSX.Element {
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.xContainer}></div>
    </section>
  );
}
