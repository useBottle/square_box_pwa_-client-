import axios from "axios";
import styles from "../styles/Login.module.scss";
import { useForm } from "react-hook-form";
import { BsBox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Login(): JSX.Element {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (): Promise<void> => {
    const [idValue, passwordValue] = getValues(["id", "password"]);
    await axios.put(
      "",
      { idValue, passwordValue },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  return (
    <section className={styles.loginView}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.viewHead}>
          <BsBox className={styles.icon} />
          <h1>Square Box</h1>
        </div>
        <input
          {...register("id", {
            required: "ID 입력은 필수 입니다.",
            pattern: {
              value: /^[A-Za-z0-9]{6,19}$/,
              message: "ID 형식에 맞지 않습니다.",
            },
          })}
          spellCheck="false"
          placeholder="ID"
          autoComplete="off"
        />
        <input
          {...register("password", {
            required: "Password 입력은 필수 입니다.",
          })}
          spellCheck="false"
          placeholder="Password"
          autoComplete="off"
        />
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
        <button className={styles.signUpBtn} onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </form>
    </section>
  );
}
