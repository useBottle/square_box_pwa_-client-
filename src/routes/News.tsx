import styles from "../styles/News.module.css";
import NewsCard from "../components/NewsCard";
import { Article } from "../types/types";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setInputValue } from "../store/inputValueSlice";
import { setData } from "../store/dataSlice";
import { setId } from "../store/idSlice";
import DefaultCard from "../components/DefaultCard";
import { setVisibilityRange } from "../store/visibilitySlice";

export default function News(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const data = useSelector((state: RootState) => state.data);
  const { start, end } = useSelector((state: RootState) => state.visibility);

  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setInputValue(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(process.env.REACT_APP_GET_NEWS_API_URL as string, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({ inputValue }),
        });
        const result = await response.json();

        const textData = result.map(
          (item: Article): Article => ({
            title: stripHtml(item.title),
            description: stripHtml(item.description),
            pubDate: stripHtml(item.pubDate),
            originallink: stripHtml(item.originallink),
            imageUrls: item.imageUrls,
          }),
        );

        dispatch(setData(textData));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  return (
    <div>
      {data.length !== 0 ? (
        <div className={styles.cardSet}>
          {data.slice(start, end).map((item, index) => (
            <NewsCard article={item} index={index} key={index} />
          ))}
        </div>
      ) : (
        <DefaultCard />
      )}
      <div className={styles.articleContainer}>
        <form onSubmit={onSubmit}>
          <div className={styles.searchBar}>
            <input onChange={onChange} value={inputValue} />
            <button type="submit">
              <IoSearch />
            </button>
          </div>
        </form>
        <div className={styles.articleList}>
          {data.map((item, index) => {
            // 날짜 포맷 변경하기
            const dateString = item.pubDate;
            const date = new Date(dateString);

            function formatDate(d: Date): string {
              const year = d.getFullYear();
              const month = d.getMonth() + 1;
              const day = d.getDate();
              const hours = d.getHours();
              const minutes = d.getMinutes();

              const pad = (num: number) => num.toString().padStart(2, "0");

              return `${year}년 ${pad(month)}월 ${pad(day)}일 ${pad(hours)}:${pad(minutes)}`;
            }
            const changedDate = formatDate(date);

            // JSX에서 이벤트 핸들러 사용
            return (
              <div
                key={index}
                className={styles.article}
                onMouseOver={() => {
                  dispatch(setId(index));
                  dispatch(setVisibilityRange({ start: index, end: index + 3 }));
                }}
                onFocus={() => {
                  dispatch(setId(index));
                  dispatch(setVisibilityRange({ start: index, end: index + 3 }));
                }}
              >
                <a href={item.originallink} target="_blank" rel="noreferrer">
                  <span style={{ display: "none" }}>{index}</span>
                  <h3>{item.title}</h3>
                  <p>{changedDate}</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
