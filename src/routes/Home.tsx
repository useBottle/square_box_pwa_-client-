import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRealTimeSearchTerm } from "../store/realTimeSearchTermSlice";
import { RootState } from "../store/store";

export default function Home(): JSX.Element {
  const [currentMinutes, setCurrentMinutes] = useState<number>(new Date().getMinutes());
  const dispatch = useDispatch();
  const realTimeSearchTerms = useSelector((state: RootState) => state.realTimeSearchTerm);

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
  }, []);

  useEffect(() => {
    // 5초마다 분단위로만 현재 시간 저장.
    const intervalId = setInterval(() => {
      setCurrentMinutes(new Date().getMinutes());
      console.log(currentMinutes);
    }, 5000);

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
    <div className={styles.container}>
      <p>브라우저의 광고 차단 익스텐션을 사용중이라면 컨텐츠가 제대로 표시되지 않을 수 있습니다.</p>
    </div>
  );
}
