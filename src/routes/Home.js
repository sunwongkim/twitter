import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data

function Home() {
  const db = getFirestore();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  // const [aaa, setAaa] = useState([1, 2, 3]);
  // useEffect(() => {
  //   console.log(aaa);
  //   const newArray = [...aaa];
  //   newArray[0] = "asddsadsasda";
  //   setAaa(newArray);
  // }, []);
  // console.log(aaa);

  // READ
  const getTweets = async () => {
    const querySnapshot = await getDocs(collection(db, "tweet"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().tweet);
      setTweets((prev) => [doc.data().tweet, ...prev]);
    });
    // 노마드코더
    // const dbTweets = await dvService.collection("tweets").get();
    // dbTweets.forEach((document) => {
    //   setTweets((prev)=>[document.data(), ...prev])
    // })
  };
  console.log(tweets);

  useEffect(() => {
    getTweets();
  }, []);

  // CREAT
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "tweet"), {
      tweet,
      createdAt: Date.now(),
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
      <div>
        {tweets.map((tweets, index) => (
          <h4 key={index}>{tweets}</h4>
        ))}
      </div>
    </>
  );
}

export default Home;
