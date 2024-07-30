import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "../src/styles/App.module.scss";
import Home from "./routes/Home";
import News from "./routes/News";
import Youtube from "./routes/Youtube";
import SignUp from "./routes/SignUp";
import AfterSignUp from "./routes/AfterSignUp";
import SignUpError from "./routes/SignUpError";
import BookMark from "./routes/BookMark";
import LogIn from "./routes/LogIn";
import { IoMenu, IoSearch } from "react-icons/io5";
import { GoSun, GoMoon, GoSignOut } from "react-icons/go";
import { FaUser, FaHome, FaNewspaper, FaYoutube, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { setUserCheck, setUsername } from "./store/verificationSlice";
import { useEffect } from "react";
import { BsBox } from "react-icons/bs";
import SearchModal from "./components/SearchModal";
import {
  setBookMarkLimitModalTrigger,
  setBookMarkModalTrigger,
  setDarkLight,
  setLogOutModalTrigger,
  setMenuIndex,
  setNavSwitch,
  setSearchBarTrigger,
  setSearchModalTrigger,
} from "./store/userInterfaceSlice";
import Cookies from "js-cookie";
import reissueToken from "./module/reissueToken";
import { jwtDecode } from "jwt-decode";
import { TokenInfo } from "./types/types";
import BookMarkModal from "./components/BookMarkModal";
import BookMarkLimitModal from "./components/BookMarkLimitModal";
import LogOutModal from "./components/LogOutModal";
import SearchForm from "./components/SearchForm";
import SearchBarModal from "./components/SearchBarModal";
import MobileNav from "./components/MobileNav";

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { menuIndex } = useSelector((state: RootState) => state.userInterface);
  const { searchModalTrigger } = useSelector((state: RootState) => state.userInterface.modalTrigger);
  const { searchBarTrigger } = useSelector((state: RootState) => state.userInterface.modalTrigger);
  const { bookMarkModalTrigger } = useSelector((state: RootState) => state.userInterface.modalTrigger);
  const { bookMarkLimitModalTrigger } = useSelector((state: RootState) => state.userInterface.modalTrigger);
  const { logOutModalTrigger } = useSelector((state: RootState) => state.userInterface.modalTrigger);
  const { darkLightToggle } = useSelector((state: RootState) => state.userInterface);
  const { userCheck } = useSelector((state: RootState) => state.verification);
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const { username } = useSelector((state: RootState) => state.verification);
  const { navSwitch } = useSelector((state: RootState) => state.userInterface);
  const signUpTrigger = useSelector((state: RootState) => state.signUpTrigger);

  // 엑세스 토큰 재발급 후 인증 처리.
  const verifyToken = async (): Promise<Response | void> => {
    try {
      const response = await reissueToken();
      if (response.status === 200 && accessToken) {
        const decodedToken = jwtDecode<TokenInfo>(accessToken);
        dispatch(setUserCheck(true));
        dispatch(setUsername(decodedToken.username));
      }
    } catch (error) {
      console.error("Token reissue failed.", error);
    }
  };

  // 기본 경로 접속 시 보유한 토큰에 따라 인증 처리.
  useEffect(() => {
    if (!accessToken && refreshToken) {
      verifyToken();
    } else if (!accessToken && !refreshToken && !signUpTrigger) {
      dispatch(setUserCheck(false));
      navigate("/");
    } else if (accessToken) {
      const decodedToken = jwtDecode<TokenInfo>(accessToken);
      dispatch(setUsername(decodedToken.username));
    }
  }, [userCheck, dispatch, navigate]);

  // 다크모드 버튼 클릭 시 모든 HTML 요소에 현재 모드의 어트리뷰트 설정.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkLightToggle);
  }, [darkLightToggle]);

  // 로컬 스토리지에 저장된 값에 따라 다크모드 적용.
  useEffect(() => {
    localStorage.getItem("theme") === "dark" ? dispatch(setDarkLight("dark")) : dispatch(setDarkLight("light"));
  }, [dispatch]);

  // 다크모드 토글 버튼 클릭 시 테마 체인지 및 로컬스토리지에 저장.
  const themeExchange = (): void => {
    if (darkLightToggle === "dark") {
      dispatch(setDarkLight("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setDarkLight("dark"));
      localStorage.setItem("theme", "dark");
    }
  };

  const menuItem = [
    { path: "/home", icon: <FaHome />, label: "Home" },
    { path: "/news", icon: <FaNewspaper />, label: "News" },
    { path: "/youtube", icon: <FaYoutube />, label: "Youtube" },
    { path: "/bookmark", icon: <FaBookmark />, label: "Bookmark" },
  ];

  return (
    <div className={styles.bodyContainer}>
      {/* 각종 모달 창 세트 */}
      <div className={styles.modalSet} style={searchModalTrigger ? { display: "block" } : { display: "none" }}>
        <SearchModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setSearchModalTrigger(false))} />
      </div>
      <div className={styles.searchBarModalSet} style={searchBarTrigger ? { display: "block" } : { display: "none" }}>
        <SearchBarModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setSearchBarTrigger(false))} />
      </div>
      <div
        className={styles.bookMarkModalSet}
        style={bookMarkModalTrigger ? { display: "block" } : { display: "none" }}
      >
        <BookMarkModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setBookMarkModalTrigger(false))} />
      </div>
      <div
        className={styles.bookMarkLimitModalSet}
        style={bookMarkLimitModalTrigger ? { display: "block" } : { display: "none" }}
      >
        <BookMarkLimitModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setBookMarkLimitModalTrigger(false))} />
      </div>
      <div className={styles.logOutModalSet} style={logOutModalTrigger ? { display: "block" } : { display: "none" }}>
        <LogOutModal />
        <div className={styles.overlay} role="button" onClick={() => dispatch(setLogOutModalTrigger(false))} />
      </div>

      <div className={styles.backgroundSet}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
        <div className={styles.circle4} />
        <div className={styles.finalBackground} />
      </div>

      <div>
        <div className={styles.mainContainer}>
          {userCheck && (
            <div>
              <header className={styles.header}>
                <h1
                  className={styles.logo}
                  onClick={() => {
                    dispatch(setMenuIndex(0));
                    navigate("/home");
                  }}
                >
                  <BsBox />
                  <span>Square Box</span>
                </h1>
                <div className={styles.headerBlock}>
                  <SearchForm />
                  <div className={styles.user}>
                    <FaUser className={styles.icon} />
                    <span>{username}</span>
                  </div>
                  <button className={styles.darkModeBtn} onClick={themeExchange}>
                    {darkLightToggle === "dark" ? (
                      <GoSun className={styles.darkModeIcon} />
                    ) : (
                      <GoMoon className={styles.darkModeIcon} />
                    )}
                  </button>
                  <button className={styles.logOutBtn} onClick={() => dispatch(setLogOutModalTrigger(true))}>
                    <GoSignOut className={styles.logOutIcon} />
                    <span>Log Out</span>
                  </button>
                  <button className={styles.searchModalIcon} onClick={() => dispatch(setSearchBarTrigger(true))}>
                    <IoSearch />
                  </button>
                  <button
                    className={styles.menuSwitch}
                    onClick={() => dispatch(navSwitch ? setNavSwitch(false) : setNavSwitch(true))}
                  >
                    <IoMenu />
                  </button>
                </div>
              </header>
              <nav className={styles.navbar}>
                <h4>MENU</h4>
                <ul>
                  {menuItem.map((item, index) => {
                    return (
                      <li
                        className={menuIndex === index ? `${styles.menuIcon}` : ""}
                        key={index}
                        onClick={() => {
                          dispatch(setMenuIndex(index));
                          navigate(`${item.path}`);
                        }}
                      >
                        <div className={styles.icon}>{item.icon}</div>
                        <span className={menuIndex === index ? `${styles.menuText}` : ""}>{item.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <MobileNav />
            </div>
          )}

          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/bookmark" element={<BookMark />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/welcome" element={<AfterSignUp />} />
            <Route path="/signup_error" element={<SignUpError />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
