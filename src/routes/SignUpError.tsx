import { useNavigate } from "react-router-dom";
import styles from "../styles/SignUpError.module.scss";
import { BsBox } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

export default function SignUpError(): JSX.Element {
  const navigate = useNavigate();
  const signUpCheck = useSelector((state: RootState) => state.verification);

  useEffect(() => {
    signUpCheck && navigate("/");
  });

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
