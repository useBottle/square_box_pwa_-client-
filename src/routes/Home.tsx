import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home(): JSX.Element {
  const [currentMinutes, setCurrentMinutes] = useState<number>(new Date().getMinutes());

  const fetchKeyword = async (): Promise<void> => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_KEYWORDS_API_URL);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error("Failed fetching keyword data.", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMinutes(new Date().getMinutes());
      console.log(currentMinutes);
    }, 10000);

    if (currentMinutes % 10 === 0) {
      fetchKeyword();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentMinutes]);

  return (
    <div className={styles.container}>
      <p>브라우저의 광고 차단 익스텐션을 사용중이라면 컨텐츠가 제대로 표시되지 않을 수 있습니다.</p>
    </div>
  );
}
