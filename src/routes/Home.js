import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// addDoc: https://firebase.google.com/docs/firestore/quickstart
// getDocs: https://firebase.google.com/docs/firestore/query-data/get-data

function Home() {
  const db = getFirestore();
  const [tweet, setTweet] = useState("");

  const onChange = (event) => {
    setTweet(event.target.value);
    console.log(tweet);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "tweet"), {
      tweet,
      createdAt: Date.now(),
      // 노마드코더-dbService = firebase.firestore()
      // dbService.collection("tweets").add({
      //   tweet,
      //   createdAt: Date.now(),
    });
  };

  // useEffect(async () => {
  //   const querySnapshot = await getDocs(collection(db, "tweet"));
  //   querySnapshot.forEach((tweet) => {
  //     console.log(tweet);
  //   });
  // }, []);

  return (
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
  );
}

export default Home;
