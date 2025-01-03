import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import KeywordIndicator from "../components/KeywordIndicator";
import { setInputValue } from "../store/inputValueSlice";
import { setNewsData, setRealTimeSearchTerms, setYoutubeData } from "../store/dataSlice";
import { setMenuIndex, setNewsLoading, setSearchModalTrigger, setYoutubeLoading } from "../store/userInterfaceSlice";
import { MESSAGE } from "../common/message";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { realTimeSearchTerms } = useSelector((state: RootState) => state.data);
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const { userCheck } = useSelector((state: RootState) => state.verification);
  const [gauge, setGauge] = useState<number>(0);
  const [clickTrigger, setClickTrigger] = useState<boolean>(false);

  // 실시간 검색어 데이터 요청.
  const fetchKeyword = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_KEYWORDS_API_URL);
      const result = response.data;
      dispatch(setRealTimeSearchTerms(result));
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  }, [dispatch]);

  // Home 에 초기 접속 시 실행 로직.
  useEffect(() => {
    dispatch(setMenuIndex(0));
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
  }, [userCheck, dispatch, navigate]);

  // 뉴스 데이터 가져오기.
  const fetchNewsData = async (): Promise<void> => {
    dispatch(setNewsData([]));
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

  // 유튜브 데이터 가져오기.
  const fetchYoutubeData = async (): Promise<void> => {
    dispatch(
      setYoutubeData({
        kind: "",
        etag: "",
        items: [],
        nextPageToken: "",
        pageInfo: {
          totalResults: 0,
          resultsPerPage: 0,
        },
      }),
    );
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
      dispatch(setYoutubeData(result));
      dispatch(setYoutubeLoading(false));
    } catch (error) {
      console.error("Error fetching youtube data: ", error);
    }
  };

  // 실시간 검색어 클릭 시 뉴스 및 유튜브 데이터 검색 요청.
  useEffect(() => {
    if (inputValue !== "") {
      Promise.all([fetchNewsData(), fetchYoutubeData()]);
    }
  }, [clickTrigger]);

  return (
    <section className={styles.homeContainer}>
      <div className={styles.landingContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.iconSet}>
            <FaInfoCircle className={styles.infoIcon} />
            <div className={styles.iconBack} />
          </div>
          <div className={styles.infoText}>
            <p>
              <span>Square Box</span> 에 오신 것을 환영합니다. <br />
            </p>
            <p>
              검색어를 입력해 검색하면 관련 뉴스 기사 및 유튜브 영상을 보실 수 있습니다. <br />
            </p>
            <p>
              이 서비스는 웹 스크래핑 기술로 컨텐츠를 제공합니다. <br />
              서버에서 데이터를 수집하는 시간으로 인해 로딩 시간이 길어질 수 있습니다.
            </p>
            <p>뉴스 기사는 언론사 측의 보안 설정에 따라 원활히 제공되지 않는 경우도 있을 수 있습니다.</p>
            <p>
              실시간 검색어의 업데이트 주기는 약 10분이며, <br />
              브라우저 환경을 고려해 1분마다 업데이트 여부를 갱신하고 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.realTimeContainer}>
        <div className={styles.realTimeHeader}>
          <h4 className={styles.realTimeTitle}>실시간 검색어 Top 10</h4>
          <div className={styles.updateCounter}>
            <div className={styles.gauge} style={{ width: `${gauge}%` }} />
          </div>
        </div>
        <div className={styles.keywordsList}>
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
      </div>
      <p className={styles.notice}>{MESSAGE.INFO.EXTENSION_NOTICE}</p>
    </section>
  );
}
