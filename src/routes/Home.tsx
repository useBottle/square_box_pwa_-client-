import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRealTimeSearchTerm } from "../store/realTimeSearchTermSlice";
import { RootState } from "../store/store";
import KeywordIndicator from "../components/KeywordIndicator";

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const realTimeSearchTerms = useSelector((state: RootState) => state.realTimeSearchTerm);
  const darkLightToggle = useSelector((state: RootState) => state.darkLight);
  const [gauge, setGauge] = useState<number>(0);

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_KEYWORDS_API_URL);
      const result = response.data;
      dispatch(setRealTimeSearchTerm(result));
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  useEffect(() => {
    fetchKeyword();

    // 페이지 로드 시간 기준으로 초기 게이지 수치 설정.
    const seconds = new Date().getSeconds();
    setGauge(Number(((seconds / 6) * 10).toFixed(2)));

    // 현재 초 시간 기준으로 게이지 값 설정.
    const countInterval = setInterval(() => {
      const seconds = new Date().getSeconds();
      setGauge(Number(((seconds / 6) * 10).toFixed(2)));
      if (seconds === 0) {
        fetchKeyword();
      }
    }, 1000);

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.HomeContainer}>
        <div className={styles.realTimeContainer}>
          <h4 className={styles.realTimeTitle}>실시간 검색어 Top 10</h4>
          <div className={styles.updateCounter}>
            <div className={styles.gauge} style={{ width: `${gauge}%` }} />
          </div>
          <ul className={styles.realTime}>
            {realTimeSearchTerms && realTimeSearchTerms.top10 && realTimeSearchTerms.top10.length > 0 ? (
              realTimeSearchTerms.top10.map((item, index) => {
                return (
                  <li key={index}>
                    <span className={styles.rank}>{item.rank}</span>
                    <span className={styles.text}>{item.keyword}</span>
                    <KeywordIndicator indicator={item.state as string} />
                  </li>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </div>
        <p>{process.env.REACT_APP_EXTENSION_NOTICE}</p>
      </div>
    </section>
  );
}
