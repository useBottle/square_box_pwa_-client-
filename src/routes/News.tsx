import { useState } from "react";
import styles from "../styles/News.module.css";
import NewsCard from "../components/NewsCard";
import { Article } from "../types/types";

export default function News(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<Article[]>([]);
  const [amount, setAmount] = useState<string[]>(["class0", "class1", "class2"]);

  const stripHtml = (html: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
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

        setData(textData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  console.log(data[0]);

  return (
    <div className={styles.newsContainer}>
      <div className={styles.cardSet}>
        {amount.map((item, index) => {
          return <NewsCard data={data[index]} cardClass={item} />;
        })}
      </div>
      <div className={styles.titleList}>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={inputValue} />
          <button type="submit">Search</button>
        </form>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <a href={item.originallink} target="_blank" rel="noreferrer">
                <h3>{item.title}</h3>
              </a>
              <p>{item.pubDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
