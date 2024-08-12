import axios from "axios";
import styles from "../styles/SignIn.module.scss";
import { useForm } from "react-hook-form";
import { BsBox } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MESSAGE } from "../common/message";
import { useDispatch } from "react-redux";
import { setUserCheck, setUsername } from "../store/verificationSlice";
import tokenVerification from "../module/tokenVerification";
import { AppDispatch } from "../store/store";
import { setSignUpTrigger } from "../store/signUpTriggerSlice";

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [idError, setIdError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // 페이지 초기 로드 시 엑세스 토큰 검증.
  // 엑세스 토큰이 이미 있으면 /home 으로 리디렉션.
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await tokenVerification();
        if (response && response.status === 200) {
          dispatch(setUserCheck(true));
          navigate("/home");
        } else {
          dispatch(setUserCheck(false));
        }
      } catch (error) {
        console.error("Token is invalid.", error);
      }
    };
    verifyToken();
    return;
  }, []);

  // id, password, JWT 로 로그인 요청.
  const onSubmit = async (): Promise<void> => {
    const [idValue, passwordValue] = getValues(["id", "password"]);

    try {
      const response = await axios.put(
        process.env.REACT_APP_LOGIN,
        { idValue, passwordValue },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          validateStatus: (status) => {
            return status >= 200 && status < 500;
          },
        },
      );
      if (response.status === 404) {
        setIdError(true);
        setPasswordError(false);
      } else if (response.status === 401) {
        setIdError(false);
        setPasswordError(true);
      } else if (response.status === 200) {
        dispatch(setUserCheck(true));
        navigate("/home");
      }
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
        <div className={styles.inputSet}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setUsername(e.target.value))}
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
        </div>
        <div className={styles.btnSet}>
          <button className={styles.logInBtn} type="submit">
            Login
          </button>
          <button
            className={styles.signUpBtn}
            onClick={() => {
              dispatch(setSignUpTrigger(true));
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </div>
        {idError && <strong>{MESSAGE.LOGIN.ID_ERROR}</strong>}
        {passwordError && <strong>{MESSAGE.LOGIN.PW_ERROR}</strong>}
      </form>
    </section>
  );
}
