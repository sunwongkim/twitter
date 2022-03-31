import React, { useState } from "react";
import AppRouter from "./components/AppRouter";
// import firebase from "./firebase";
import "./App.css";
import { getAuth } from "firebase/auth";

function App() {
  const onClick = () => setIsLoggedIn(!isLoggedIn);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(getAuth().currentUser);
  console.log(getAuth().currentUser);

  return (
    <>
      <div>
        <button onClick={onClick} style={{ fontSize: "20px" }}>
          CHANGE
        </button>
      </div>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
