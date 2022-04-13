import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  // addDoc,
} from "firebase/firestore";
import "firebase/storage";
import Tweet from "../components/Tweet";
import TweetFactory from "../components/TweetFactory";
// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data
// REALTIME DATABASE - querySnapshot
// https://firebase.google.com/docs/firestore/query-data/listen

function Home({ userObj }) {
  // const db = getFirestore();
  const [tweets, setTweets] = useState([]);

  // READ (일반)
  // useEffect(async () => {
  // const querySnapshot = await getDocs(collection(db, "tweet"));
  // querySnapshot.forEach((doc) => {
  //   const newObj = {
  //     ...doc.data(),
  //     id: doc.id,
  //   };
  //   setTweets((prev) => [newObj, ...prev]);
  //   console.log(doc.data());
  //   });
  // }, []);

  // READ (REALTIME)
  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "tweet"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const tweetArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(tweetArray);
      // 노마드코더
      // dbService.collection("tweet").onSnapshot((snapshot) => {
      //   const tweetArray = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}));
    });
  }, []);

  console.log(tweets);

  return (
    <>
      {/* 목록 */}
      <TweetFactory userObj={userObj} />
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
        />
      ))}
    </>
  );
}

export default Home;
