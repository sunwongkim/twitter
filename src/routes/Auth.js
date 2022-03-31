import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccount) {
      // 계정 생성
      // 공식문서ver
      createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
    console.log(createUserWithEmailAndPassword);
  };
  // const onSubmit2 = async (event) => {
  //   event.preventDefault();
  //   try {
  //     let data;
  //     if (newAccount) {
  //       data = await createUserWithEmailAndPassword(email, password);
  //     } else {
  //       const auth = getAuth();
  //       data = await signInWithEmailAndPassword(auth, email, password);
  //     }
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => console.log(getAuth()), []);

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
      <button>Continue with Google</button>
    </>
  );
}

export default Auth;
