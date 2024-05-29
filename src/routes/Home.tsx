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
  const [startTime, setStartTime] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
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

    // 페이지 최초 로드 한 순간의 시간 저장.
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    // 저장된 페이지 최초 로드 시간으로 스타트 시간 설정.
    setStartTime((minutes % 10) * 60 + seconds);

    // 페이지 첫 로드 이후 초 단위 시간 카운트.
    const intervalId = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // 10분 단위 안에서 현 시간 기준으로 지난 시간을 백분율로 소수점 두 자리수 까지 계산.
    if (gauge < 100) {
      setGauge(Number(((startTime + count) / 6).toFixed(2)));
    } else {
      fetchKeyword();
      const minutes = new Date().getMinutes();
      const seconds = new Date().getSeconds();
      setGauge(0);
      setCount(0);

      setStartTime((minutes % 10) * 60 + seconds);
      setGauge(Number(((startTime + count) / 6).toFixed(2)));
    }
    console.log("count: " + count);
    console.log("loadedTime: " + startTime);
    console.log("gauge: " + gauge);
    console.log("");
  }, [count]);

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
