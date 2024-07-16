import { MESSAGE } from "../common/message";
import styles from "../styles/SearchBarModal.module.scss";
import SearchForm from "./SearchForm";

export default function SearchBarModal(): JSX.Element {
  return (
    <div className={styles.modalContainer}>
      <h4>{MESSAGE.SEARCH.INFO}</h4>
      <SearchForm />
    </div>
  );
}
