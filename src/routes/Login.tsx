import axios from "axios";
import styles from "../styles/Login.module.scss";
import { useForm } from "react-hook-form";
import { BsBox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MESSAGE } from "../common/message";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserCheck } from "../store/verificationSlice";

export default function Login(): JSX.Element {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const accessToken = Cookies.get("accessToken");

  const onSubmit = async (): Promise<void> => {
    const [idValue, passwordValue] = getValues(["id", "password"]);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await axios.put(
        process.env.REACT_APP_LOGIN_API_URL,
        { idValue, passwordValue },
        {
          headers,
          withCredentials: true,
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        },
      );
      dispatch(setUserCheck(true));
      response.status === 404 && setIdError(true);
      response.status === 401 && setPasswordError(true);
      response.status === 200 && navigate("/home");
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
          type="password"
          {...register("password", {
            required: "Password 입력은 필수 입니다.",
          })}
          spellCheck="false"
          placeholder="Password"
          autoComplete="off"
        />
        {idError === true && <strong>{MESSAGE.LOGIN.ID_ERROR}</strong>}
        {passwordError === true && <strong>{MESSAGE.LOGIN.PW_ERROR}</strong>}
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
