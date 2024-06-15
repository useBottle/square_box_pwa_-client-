import { useForm } from "react-hook-form";
import styles from "../styles/SignUp.module.scss";
import { BsBox } from "react-icons/bs";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { MESSAGE } from "../common/message";
import { useNavigate } from "react-router-dom";
import { FormValues, IdCheck } from "../types/types";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignUpCheck } from "../store/verificationSlice";

export default function SignUp(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [idValue, passwordValue, confirmValue] = watch(["id", "password", "confirm"]);

  const idPattern = /^[A-Za-z0-9]{6,20}$/;
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

  const isIdValid = idPattern.test(idValue);
  const isPasswordValid = passwordPattern.test(passwordValue);
  const isPasswordConfirmed = passwordValue === confirmValue;
  const emptyPassword = !passwordValue && !confirmValue;
  const confirmCondition = isPasswordConfirmed && !emptyPassword && isPasswordValid;
  const [userDuplication, setUserDuplication] = useState<IdCheck>("default");

  const onSubmit = async (): Promise<void> => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_SIGNUP_API_URL,
        { idValue, passwordValue },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (result.status === 200) {
        dispatch(setSignUpCheck(true));
        navigate("/welcome");
      } else if (result.status !== 200) {
        navigate("/signup_error");
      }
      console.log("sign up result : ", result);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("An error occurred during ID check:", error);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const checkId = async (): Promise<void> => {
    if (idValue && isIdValid) {
      try {
        const result = await axios.put(
          process.env.REACT_APP_ID_CHECK_API_URL,
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
        console.log("id check result : ", result);
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

  const IdText = () => {
    if (!idValue) {
      return (
        <span>
          <button className={styles.duplicateBtn} onClick={() => checkId()}>
            중복 확인
          </button>
          {MESSAGE.SIGNUP.ID.INFO}
        </span>
      );
    } else if (idValue && !isIdValid) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.ID.WRONG}</span>;
    } else if (idValue && isIdValid && userDuplication === "default") {
      return (
        <span className={styles.warning}>
          <button className={styles.duplicateBtn} onClick={() => checkId()}>
            중복 확인
          </button>
          {MESSAGE.SIGNUP.ID.CHECK}
        </span>
      );
    } else if (idValue && isIdValid && userDuplication === "duplication") {
      return (
        <span className={styles.warning}>
          <button className={styles.duplicateBtn} onClick={() => checkId()}>
            중복 확인
          </button>
          {MESSAGE.SIGNUP.ID.DUPLICATION}
        </span>
      );
    } else if (idValue && isIdValid && userDuplication === "not-duplication") {
      return <span className={styles.pass}>{MESSAGE.SIGNUP.ID.PASS}</span>;
    }
  };

  const PasswordText = () => {
    if (!passwordValue) {
      return <span>{MESSAGE.SIGNUP.PASSWORD.INFO}</span>;
    } else if (passwordValue && !isPasswordValid) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.PASSWORD.WRONG}</span>;
    } else if (isPasswordValid) {
      return <span className={styles.pass}>{MESSAGE.SIGNUP.PASSWORD.PASS}</span>;
    } else if (!isPasswordConfirmed) {
      return <span className={styles.warning}>{MESSAGE.SIGNUP.CONFIRM.WRONG}</span>;
    }
  };

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
    <section className={styles.signUpContainer}>
      <FaArrowLeft className={styles.backArrow} onClick={() => navigate("/")} />
      <div className={styles.viewHead}>
        <BsBox className={styles.icon} />
        <h1>Square Box</h1>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.checkIconSet}>
          {idValue && isIdValid && userDuplication === "not-duplication" ? (
            <FaCheck className={styles.checkIcon} />
          ) : (
            <span className={styles.blank} />
          )}
          {isPasswordValid && <FaCheck className={styles.checkIcon} />}
          {confirmCondition && <FaCheck className={styles.checkIcon} />}
        </div>
        <div className={styles.category}>
          <span>ID</span>
          <span>Password</span>
          <span>Confirm</span>
        </div>
        <div className={styles.inputFields}>
          <input
            {...register("id", {
              required: MESSAGE.SIGNUP.ID.REQUIRED,
              pattern: { value: idPattern, message: MESSAGE.SIGNUP.ID.WRONG },
            })}
            type="text"
            spellCheck="false"
            autoComplete="off"
          />
          <input
            {...register("password", {
              required: MESSAGE.SIGNUP.PASSWORD.REQUIRED,
              pattern: { value: passwordPattern, message: MESSAGE.SIGNUP.PASSWORD.WRONG },
            })}
            type="password"
            spellCheck="false"
            autoComplete="off"
          />
          <input
            {...register("confirm", {
              required: MESSAGE.SIGNUP.CONFIRM.REQUIRED,
            })}
            type="password"
            spellCheck="false"
            autoComplete="off"
          />
        </div>

        <div className={styles.inputDescription}>
          <IdText />
          <PasswordText />
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
  );
}
