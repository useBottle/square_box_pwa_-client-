import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRealTimeSearchTerm } from "../store/realTimeSearchTermSlice";
import { RootState } from "../store/store";
import KeywordIndicator from "../components/KeywordIndicator";

export default function Home(): JSX.Element {
  const [currentMinutes, setCurrentMinutes] = useState<number>(new Date().getMinutes());
  const dispatch = useDispatch();
  const realTimeSearchTerms = useSelector((state: RootState) => state.realTimeSearchTerm);
  const darkLightToggle = useSelector((state: RootState) => state.darkLight);
  const [loadedTime, setLoadedTime] = useState<number>(0);
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

    // 로드 시간을 10분 = 600초 구간안에서 몇 초인지  계산.
    setLoadedTime((minutes % 10) * 60 + seconds);

    // 페이지 첫 로드 이후 초 단위 시간 카운트.
    const intervalId = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setCount(0);
      setGauge(0);
    };
  }, []);

  useEffect(() => {
    // 10분 단위 안에서 현 시간 기준으로 지난 시간을 백분율로 소수점 두 자리수 까지 계산.
    setGauge(Number(((loadedTime + count) / 6).toFixed(2)));
  }, [count]);

  useEffect(() => {
    // 5초마다 분단위로만 현재 시간 저장.
    const intervalId = setInterval(() => {
      const minutes = new Date().getMinutes();
      setCurrentMinutes(minutes);
    }, 1000);

    // 매 시간 minute 가 10의 배수일 때만 실시간 검색어 요청.
    if (currentMinutes % 10 === 0) {
      fetchKeyword();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentMinutes]);

  // 데이터 fetching 성공 여부 확인용.
  useEffect(() => {
    console.log(realTimeSearchTerms);
  }, [realTimeSearchTerms]);

  return (
    <section data-theme={darkLightToggle === "dark" ? "" : "light"}>
      <div className={styles.HomeContainer}>
        <div className={styles.realTimeContainer}>
          <h4 className={styles.realTimeTitle}>실시간 검색어 Top 10</h4>
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
