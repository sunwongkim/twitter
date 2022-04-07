import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import Tweet from "../components/Tweet";
// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data
// REALTIME DATABASE - querySnapshot
// https://firebase.google.com/docs/firestore/query-data/listen
// 노마드코더-dbService = firebase.firestore()

function Home({ userObj }) {
  const db = getFirestore();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  // READ (일반)
  // useEffect(async () => {
  //   const querySnapshot = await getDocs(collection(db, "tweet"));
  //   querySnapshot.forEach((doc) => {
  //     const newObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setTweets((prev) => [newObj, ...prev]);
  //     console.log(doc.data());
  //   });
  // }, []);

  // READ (REALTIME)
  useEffect(() => {
    const q = query(collection(db, "tweet"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const tweetArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(tweetArray);
    });
  }, []);
  // 노마드코더
  // useEffect(()=>{
  //   dbService.collection("tweet").onSnapshot((snapshot) => {
  //     const tweetArray = snapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setTweets(tweetArray);
  //   });
  // },[])

  console.log(tweets);

  // CREAT
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "tweet"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    console.log("Document writtfen with ID: ", docRef.id);
    setTweet("");
  };
  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>

      {/* 목록 */}
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
