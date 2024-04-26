import styles from "../src/styles/App.module.css";

function App(): JSX.Element {
  return (
    <div>
      <h1 className={styles.logo}>Custom Board</h1>
      <nav className={styles.navbar}>
        <ul>
          <li>News</li>
          <li>Schedule</li>
          <li>Something</li>
          <li>Something</li>
          <li>Favorites</li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
