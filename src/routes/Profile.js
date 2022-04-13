import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";
import firebase from "../firebase";

// import { useHistory } from "react-router-dom";

function Profile({ userObj }) {
  const db = getFirestore();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  // 로그아웃
  // const history = useHistory;
  const onLogOutClick = () => {
    getAuth().signOut();
    // history.push("/");
  };

  // user id 유효성 검사
  const getMyTweets = async () => {
    // 댓글
    const q = query(
      collection(db, "tweet"),
      where("creatorId", "==", userObj.uid),
      orderBy(
        "createdAt"
        // , "desc" 쿼리 추가 필요
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    // 노마드코더
    // const tweets = await dbService
    //   .collection("nweets")
    //   .where("creatorId", "==", userObj.uid)
    //   .orderBy("createdAt")
    //   .get();
    // console.log(tweets.docs.map((doc) => doc.data()));
    // };
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  console.log(newDisplayName);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={newDisplayName}
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>;
    </>
  );
}

export default Profile;
