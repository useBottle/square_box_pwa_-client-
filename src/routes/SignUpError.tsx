import { useNavigate } from "react-router-dom";
import styles from "../styles/SignUpError.module.scss";
import { BsBox } from "react-icons/bs";

export default function SignUpError(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className={styles.mainContainer}>
      <div className={styles.viewHead}>
        <BsBox className={styles.icon} />
        <h1>Square Box</h1>
      </div>
      <div className={styles.textContainer}>
        <h2>회원 가입 과정에서 오류가 발생했습니다!</h2>
        <p>회원 가입을 다시 진행해주세요.</p>
      </div>
      <button onClick={() => navigate("/signup")}>회원 가입 다시하기</button>
    </section>
  );
}
