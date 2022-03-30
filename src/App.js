import React, { useState } from "react";
import AppRouter from "./components/AppRouter";
import firebase from "./firebase";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClick = () => setIsLoggedIn(!isLoggedIn);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <div>
        <button onClick={onClick} style={{ fontSize: "50px" }}>
          ON/OFF
        </button>
      </div>
    </>
  );
}

export default App;
