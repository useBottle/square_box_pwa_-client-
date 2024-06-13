import { useForm } from "react-hook-form";
import styles from "../styles/SignUp.module.scss";
import { BsBox } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { MESSAGE } from "../common/message";
import { useNavigate } from "react-router-dom";

export default function SignUp(): JSX.Element {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (): Promise<void> => {};
  const [emailValue, passwordValue, confirmValue] = watch(["email", "password", "confirm"]);
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  return (
    <section className={styles.signUpContainer}>
      <FaArrowLeft className={styles.backArrow} onClick={() => navigate("/")} />
      <div className={styles.viewHead}>
        <BsBox className={styles.icon} />
        <h1>Square Box</h1>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.category}>
          <span>Email</span>
          <span>Password</span>
          <span>Confirm</span>
        </div>
        <div className={styles.inputFields}>
          <input
            {...register("email", {
              required: "이메일 입력은 필수입니다.",
              pattern: { value: emailPattern, message: "" },
            })}
            type="email"
            spellCheck="false"
            autoComplete="off"
          />
          <input
            {...register("password", {
              required: "비밀번호 입력은 필수입니다.",
              pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: "" },
            })}
            type="text"
            spellCheck="false"
            autoComplete="off"
          />
          <input
            {...register("confirm", {
              required: "비밀번호를 한 번 더 입력해 주세요.",
            })}
            type="text"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div className={styles.inputDescription}>
          {emailValue && !emailPattern.test(emailValue) ? (
            <span className={styles.warning}>{MESSAGE.SIGNUP.EMAIL_WRONG}</span>
          ) : (
            <span>{MESSAGE.SIGNUP.EMAIL_INFO}</span>
          )}
          {passwordValue && !passwordPattern.test(passwordValue) ? (
            <span className={styles.warning}>{MESSAGE.SIGNUP.PASSWORD_WRONG}</span>
          ) : (
            <span>{MESSAGE.SIGNUP.PASSWORD_INFO}</span>
          )}
          {passwordValue !== confirmValue ? (
            <span className={styles.warning}>{MESSAGE.SIGNUP.CONFIRM_WRONG}</span>
          ) : (
            <span>{MESSAGE.SIGNUP.PASSWORD_CONFIRM}</span>
          )}
        </div>
        <button type="submit">가입하기</button>
      </form>
    </section>
  );
}
