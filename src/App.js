import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";
import AppRouter from "./components/AppRouter";
import "./App.css";

// 노마드코더 변수 authService = getAuth()
function App() {
  const onClick = () => setIsLoggedIn(!isLoggedIn); //토글

  const [init, setInit] = useState(false); //초기값 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  // 로그인 상태 감지
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user.email);
    });
  }, []);

  return (
    <>
      <div>
        <button onClick={onClick} style={{ fontSize: "20px" }}>
          CHANGE
        </button>
      </div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "초기화.."}
    </>
  );
}

export default App;
