import styles from "../styles/Home.module.css";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <p>브라우저의 광고 차단 익스텐션을 사용중이라면 컨텐츠가 제대로 표시되지 않을 수 있습니다.</p>
    </div>
  );
}
