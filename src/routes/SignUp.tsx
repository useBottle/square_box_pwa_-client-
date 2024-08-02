import { useForm } from "react-hook-form";
import styles from "../styles/SignUp.module.scss";
import { BsBox } from "react-icons/bs";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { MESSAGE } from "../common/message";
import { useNavigate } from "react-router-dom";
import { FormValues, IdCheck } from "../types/types";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpCheck } from "../store/verificationSlice";
import { AppDispatch, RootState } from "../store/store";
import { setSignUpLoading } from "../store/userInterfaceSlice";
import SignUpLoading from "../components/SignUpLoading";

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [idValue, passwordValue, confirmValue] = watch(["id", "password", "confirm"]);
  const [prevIdValue, setPrevIdValue] = useState<string>();
  const { signUpLoading } = useSelector((state: RootState) => state.userInterface.loadingStatus);

  const idPattern = /^[A-Za-z0-9]{6,20}$/;
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  const isIdValid = idPattern.test(idValue);
  const isPasswordValid = passwordPattern.test(passwordValue);
  const isPasswordConfirmed = passwordValue === confirmValue;
  const emptyPassword = !passwordValue && !confirmValue;
  const confirmCondition = isPasswordConfirmed && !emptyPassword && isPasswordValid;
  const [userDuplication, setUserDuplication] = useState<IdCheck>("default");

  // ID, password 로 회원 가입 요청.
  const onSubmit = async (): Promise<void> => {
    dispatch(setSignUpLoading(true));

    try {
      const result = await axios.post(
        process.env.REACT_APP_SIGNUP,
        { idValue, passwordValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (result.status === 200) {
        dispatch(setSignUpCheck(true));
        dispatch(setSignUpLoading(false));
        navigate("/welcome");
      } else if (result.status !== 200) {
        navigate("/signup_error");
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("An error occurred during ID check:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  // ID 중복 검사.
  const checkId = async (): Promise<void> => {
    if (idValue && isIdValid) {
      try {
        const result = await axios.put(
          process.env.REACT_APP_ID_CHECK,
          { idValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (result.status === 200) {
          setUserDuplication("not-duplication");
        } else if (result.status === 201) {
          setUserDuplication("duplication");
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error("An error occurred during ID check:", error);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
    return;
  };

  // 이전 입력 ID 와 현재 입력 ID 가 다르면 중복 확인 버튼 활성화.
  useEffect(() => {
    prevIdValue !== idValue && setUserDuplication("default");
  }, [idValue]);

  // ID 유효성 검사 결과에 따른 메세지 출력.
  const IdText = () => {
    if (!idValue) {
      return (
        <span>
          <button className={styles.duplicateBtn}>중복 확인</button>
          <div className={styles.infoText}>
            <div>{MESSAGE.SIGNUP.ID.INFO}</div>
            <div>{MESSAGE.SIGNUP.ID.INFO_SUB}</div>
          </div>
        </span>
      );
    } else if (idValue && !isIdValid) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.ID.WRONG}</span>;
    } else if (idValue && isIdValid && userDuplication === "default") {
      return (
        <span className={styles.warning}>
          <button
            className={styles.duplicateBtn}
            onClick={() => {
              setPrevIdValue(idValue);
              checkId();
            }}
          >
            중복 확인
          </button>
          {MESSAGE.SIGNUP.ID.CHECK}
        </span>
      );
    } else if (idValue && isIdValid && userDuplication === "duplication") {
      return (
        <span className={styles.warning}>
          <button className={styles.duplicateBtn}>중복 확인</button>
          {MESSAGE.SIGNUP.ID.DUPLICATION}
        </span>
      );
    } else if (idValue && isIdValid && userDuplication === "not-duplication") {
      return <span className={styles.pass}>{MESSAGE.SIGNUP.ID.PASS}</span>;
    }
  };

  // password 유효성 검사 결과에 따른 메세지 출력.
  const PasswordText = () => {
    if (!passwordValue) {
      return (
        <span>
          <div>{MESSAGE.SIGNUP.PASSWORD.INFO}</div>
          <div>{MESSAGE.SIGNUP.PASSWORD.INFO_SUB}</div>
        </span>
      );
    } else if (passwordValue && !isPasswordValid) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.PASSWORD.WRONG}</span>;
    } else if (isPasswordValid) {
      return <span className={styles.pass}>{MESSAGE.SIGNUP.PASSWORD.PASS}</span>;
    } else if (!isPasswordConfirmed) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.CONFIRM.WRONG}</span>;
    }
  };

  // password 확인 유효성 검사 결과에 따른 메세지 출력.
  const ConfirmText = () => {
    if (!confirmValue) {
      return <span>{MESSAGE.SIGNUP.CONFIRM.INFO}</span>;
    } else if (confirmValue && !passwordValue) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.PASSWORD.REQUIRED}</span>;
    } else if (isPasswordConfirmed && !emptyPassword && !isPasswordValid) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.PASSWORD.WRONG}</span>;
    } else if (!isPasswordConfirmed) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.CONFIRM.WRONG}</span>;
    } else if (isPasswordConfirmed && isPasswordValid) {
      return <span className={styles.pass}>{MESSAGE.SIGNUP.CONFIRM.PASS}</span>;
    }
  };

  return (
    <div>
      {signUpLoading ? (
        <SignUpLoading />
      ) : (
        <section className={styles.signUpContainer}>
          <FaArrowLeft className={styles.backArrow} onClick={() => navigate("/")} />
          <div className={styles.viewHead}>
            <BsBox className={styles.icon} />
            <h1>Square Box</h1>
          </div>
          <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.idCategory}>
              <div className={styles.idField}>
                <div className={styles.title}>ID</div>
                <input
                  {...register("id", {
                    required: MESSAGE.SIGNUP.ID.REQUIRED,
                    pattern: { value: idPattern, message: MESSAGE.SIGNUP.ID.WRONG },
                  })}
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                />
                {idValue && isIdValid && userDuplication === "not-duplication" ? (
                  <FaCheck className={styles.checkIcon} />
                ) : (
                  <div className={styles.blank} />
                )}
              </div>
              <IdText />
            </div>
            <div className={styles.passwordCategory}>
              <div className={styles.passwordField}>
                <div className={styles.title}>Password</div>
                <input
                  {...register("password", {
                    required: MESSAGE.SIGNUP.PASSWORD.REQUIRED,
                    pattern: { value: passwordPattern, message: MESSAGE.SIGNUP.PASSWORD.WRONG },
                  })}
                  type="password"
                  spellCheck="false"
                  autoComplete="off"
                />
                {isPasswordValid ? <FaCheck className={styles.checkIcon} /> : <div className={styles.blank} />}
              </div>
              <PasswordText />
            </div>
            <div className={styles.confirmCategory}>
              <div className={styles.confirmField}>
                <div className={styles.title}>Confirm</div>
                <input
                  {...register("confirm", {
                    required: MESSAGE.SIGNUP.CONFIRM.REQUIRED,
                  })}
                  type="password"
                  spellCheck="false"
                  autoComplete="off"
                />
                {confirmCondition ? <FaCheck className={styles.checkIcon} /> : <div className={styles.blank} />}
              </div>
              <ConfirmText />
            </div>
            {isIdValid && isPasswordValid && isPasswordConfirmed && userDuplication === "not-duplication" ? (
              <button type="submit" className={styles.joinBtn}>
                가입하기
              </button>
            ) : (
              <button className={styles.disableBtn}>양식을 채워주세요</button>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
