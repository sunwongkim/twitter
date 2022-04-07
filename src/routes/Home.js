import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data

function Home({ userObj }) {
  const db = getFirestore();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  // READ (일반)
  const getTweets = async () => {
    const querySnapshot = await getDocs(collection(db, "tweet"));
    querySnapshot.forEach((doc) => {
      const newObj = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [newObj, ...prev]);
      console.log(doc.data());
    });
  };
  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    // const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    //   const tweetArray = doc.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setTweets(tweetArray);
    // });
    // 노마드코더
    // dbService.collection("tweet").onSnapshot((snapshot) => {
    //   const tweetArray = snapshot.docs.map((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setTweets(tweetArray);
    // });
  }, []);
  // 공식문서
  // const q = query(collection(db, "tweet"), where("state", "==", "CA"));
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //     cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });
  // unsubscribe();
  // 유튜브버전
  // const colRef = collection(db, "tweet");
  // onSnapshot(colRef, (snapshot) => {
  //   let books = [];
  //   snapshot.docs.forEach((doc) => {
  //     books.push({ ...doc.data(), id: doc.id });
  //   });
  //   console.log(books);
  // });

  // 유튜브 개량
  useEffect(() => {
    // const colRef = collection(db, "tweet");
    // onSnapshot(colRef, (snapshot) => {
    //   const tweetArray = snapshot.docs.forEach((doc) => ({
    //     ...doc.data(),
    //     id: doc.id,
    //   }));
    //   setTweets(tweetArray);
    //   // console.log(tweets);
    //   console.log("something changed");
    // });
  }, []);

  // useEffect(() => {
  //   const q = query(collection(db, "nweet"), orderBy("createdAt", "desc"));
  //   onSnapshot(q, (snapshot) => {
  //     const nweetArr = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTweets(nweetArr);
  //     console.log(tweets);
  //   });
  // }, []);

  // 노마드코더
  // useEffect(() => {
  // dbService.collection("tweet").onSnapshot((snapshot) => {
  //   const tweetArray = snapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));
  //   setTweets(tweetArray);
  //   });
  // }, []);

  console.log(tweets);

  // CREAT
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "tweet"), {
      // tweet,
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    console.log("Document writtfen with ID: ", docRef.id);
    setTweet("");
    // 노마드코더-dbService = firebase.firestore()
    // await dbService.collection("tweets").add({tweet,createdAt: Date.now(),})
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
      {/* <div>
        {tweets.map((tweets) => (
          <h4 key={tweets.id}>{tweets.text}</h4>
        ))}
      </div> */}
    </>
  );
}

export default Home;
