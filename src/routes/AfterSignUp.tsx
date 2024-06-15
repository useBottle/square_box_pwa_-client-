import { useEffect } from "react";
import styles from "../styles/AfterSignUp.module.scss";
import { BsBox } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function ExportSignUp(): JSX.Element {
  const signUpCheck = useSelector((state: RootState) => state.verification);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpCheck) {
      navigate("/signup", { replace: true });
    }
  });

  return (
    <section className={styles.mainContainer}>
      <div className={styles.viewHead}>
        <BsBox className={styles.icon} />
        <h1>Square Box</h1>
      </div>
      <div className={styles.textContainer}>
        <h2>환영합니다!</h2>
        <h4 className={styles.mainText}>회원 가입이 완료되었습니다.</h4>
        <p>로그인 화면으로 이동해주세요.</p>
      </div>
      <button onClick={() => navigate("/")}>로그인하러 가기</button>
    </section>
  );
}
