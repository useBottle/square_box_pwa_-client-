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
        setData(result);
        // console.log(data);
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
        {data.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })}
      </form>
    </div>
  );
}
