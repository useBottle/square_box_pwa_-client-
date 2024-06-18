import axios from "axios";
import styles from "../styles/Login.module.scss";
import { useForm } from "react-hook-form";
import { BsBox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MESSAGE } from "../common/message";

export default function Login(): JSX.Element {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const [idState, setIdState] = useState<number>(-1);
  const [passwordState, setPasswordState] = useState<number>(-1);

  const onSubmit = async (): Promise<void> => {
    const [idValue, passwordValue] = getValues(["id", "password"]);

    try {
      const result = await axios.put(
        process.env.REACT_APP_LOGIN_API_URL,
        { idValue, passwordValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      result.status === 404 && setIdState(0);
      result.status === 401 && setPasswordState(0);
    } catch (error) {
      console.error("Login failed.", error);
    }
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
              value: /^[A-Za-z0-9]{6,20}$/,
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
        {idState === 0 && <strong>{MESSAGE.LOGIN.ID_ERROR}</strong>}
        {passwordState === 0 && <strong>{MESSAGE.LOGIN.PW_ERROR}</strong>}
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
