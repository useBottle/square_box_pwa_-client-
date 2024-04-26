import { Route, Routes, Link } from "react-router-dom";
import styles from "../src/styles/App.module.css";
import Home from "./routes/Home";
import News from "./routes/News";

function App(): JSX.Element {
  return (
    <div>
      <Link to="/">
        <h1 className={styles.logo}>Custom Board</h1>
      </Link>
      <nav className={styles.navbar}>
        <ul>
          <Link to="/news">
            <li>News</li>
          </Link>
          <li>Schedules</li>
          <li>Something</li>
          <li>Something</li>
          <li>Favorites</li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/schedules" element={"sample"} />
      </Routes>
    </div>
  );
}

export default App;
