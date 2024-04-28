import { useState } from "react";

export default function News(): JSX.Element {
  interface Article {
    title: string;
    description: string;
    pubDate: string;
    originallink: string;
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<Article[]>([]);

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
          }),
        );

        setData(textData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  return (
    <div>
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
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
