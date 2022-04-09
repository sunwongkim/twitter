import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";
import Router from "./components/Router";
import "./App.css";
// 노마드코더 변수
// authService = getAuth()
// dbService = firebase.firestore()
// storaheService = firebase.storage()
function App() {
  const [init, setInit] = useState(false); //초기값 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 로그인 상태 감지
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user.email);
    });
  }, []);

  const onClick = () => setIsLoggedIn(!isLoggedIn); //토글
  console.log(isLoggedIn);

  return (
    <>
      <div>
        <button onClick={onClick} style={{ fontSize: "20px" }}>
          CHANGE
        </button>
      </div>
      {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} /> : "초기화.."}
    </>
  );
}

export default App;
