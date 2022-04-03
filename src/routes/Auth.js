import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  // GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Auth() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    // email or password 입력창 판별용 조건문
    if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "password") {
      setPassword(inputValue);
    }
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 계정 생성 함수
  const onSubmit = async (event) => {
    event.preventDefault();
    // 노마드코더ver
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // 유튜브ver
    // const result = await createUserWithEmailAndPassword(auth, email, password);
    // console.log(result);
    // if (newAccount) {
    //   const result = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   console.log(result);
    // } else {
    //   const result = await signInWithEmailAndPassword(auth, email, password);
    //   console.log(result);
    // }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    console.log(event.target.name);
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      // provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
  };
  //유튜브ver
  // const handle = () => {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider).then((result) => {
  //     const user = result.userclg;
  //     console.log(user);
  //   });
  // };
  //단축ver
  // const handle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider);
  // };

  return (
    <>
      <h1>Auth</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        ></input>
        <input
          type="submit"
          value={newAccount ? "계정 생성" : "로그인"}
        ></input>
      </form>
      <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span>
      <button name="google" onClick={onSocialClick}>
        Continue with Google
      </button>
      {/* <button name="github" onClick={onSocialClick}>
        Continue with github
      </button> */}
    </>
  );
}

export default Auth;
