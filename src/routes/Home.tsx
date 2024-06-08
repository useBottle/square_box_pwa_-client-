import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import KeywordIndicator from "../components/KeywordIndicator";
import { setInputValue } from "../store/inputValueSlice";
import { setNewsData, setRealTimeSearchTerms, setYoutubeData } from "../store/dataSlice";
import { setNewsLoading, setSearchModalTrigger, setYoutubeLoading } from "../store/userInterfaceSlice";

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const { realTimeSearchTerms } = useSelector((state: RootState) => state.data);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const [gauge, setGauge] = useState<number>(0);
  const [clickTrigger, setClickTrigger] = useState<boolean>(false);

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_KEYWORDS_API_URL);
      const result = response.data;
      dispatch(setRealTimeSearchTerms(result));
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  useEffect(() => {
    fetchKeyword();
    dispatch(setInputValue(""));

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

  const fetchNewsData = async (): Promise<void> => {
    dispatch(setNewsLoading(true));
    try {
      const response = await axios.put(
        process.env.REACT_APP_GET_NEWS_API_URL as string,
        { inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = response.data;
      dispatch(setNewsData(result));
      dispatch(setNewsLoading(false));
    } catch (error) {
      console.error("Error fetching news data: ", error);
      dispatch(setNewsLoading(false));
    }
  };

  const fetchYoutubeData = async (): Promise<void> => {
    dispatch(setYoutubeLoading(true));
    try {
      const response = await axios.put(
        process.env.REACT_APP_GET_YOUTUBE_API_URL as string,
        { inputValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = response.data.items;
      console.log(result);
      dispatch(setYoutubeData(result));
      dispatch(setYoutubeLoading(false));
    } catch (error) {
      console.error("Error fetching youtube data: ", error);
    }
  };

  useEffect(() => {
    if (inputValue !== "") {
      Promise.all([fetchNewsData(), fetchYoutubeData()]);
    }
  }, [clickTrigger]);

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
                  <li
                    key={index}
                    onClick={() => {
                      dispatch(setInputValue(item.keyword as unknown as string));
                      dispatch(setNewsLoading(true));
                      dispatch(setSearchModalTrigger(true));
                      clickTrigger === false ? setClickTrigger(true) : setClickTrigger(false);
                    }}
                  >
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
        <p className={styles.notice}>{process.env.REACT_APP_EXTENSION_NOTICE}</p>
      </div>
    </section>
  );
}
