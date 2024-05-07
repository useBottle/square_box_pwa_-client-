import styles from "../styles/News.module.css";
import NewsCard from "../components/NewsCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DefaultCard from "../components/DefaultCard";
import ArticleContainer from "../components/ArticleContainer";
import DefaultArticle from "../components/DefaultArticle";

export default function News(): JSX.Element {
  const data = useSelector((state: RootState) => state.data);
  const { start, end } = useSelector((state: RootState) => state.visibility);

  return (
    <div>
      <div className={styles.cardSet}>
        {data.length !== 0 ? (
          data.slice(start, end).map((item, index) => <NewsCard article={item} index={index} key={index} />)
        ) : (
          <DefaultCard />
        )}
      </div>
      {data.length !== 0 ? <ArticleContainer /> : <DefaultArticle />}
    </div>
  );
}
