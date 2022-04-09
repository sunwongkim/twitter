import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import firebase from "../firebase";
import Tweet from "../components/Tweet";
import { upload } from "@testing-library/user-event/dist/upload";
import { storage, getStorage, ref } from "firebase/storage";

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
  const [attachment, setAttachment] = useState([]);
  //
  const [image, setImage] = useState("");

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
  //     const tweetArray = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id,}));
  //     setTweets(tweetArray);
  //   });
  // },[])

  console.log(tweets);

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  //
  // STORAGE
  const onFileChange = (event) => {
    // storaheService = firebase.storage()
    // storaheService.ref().child(`${userObj.uid}/`)
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent.currentTarget.result);
      setAttachment(finishedEvent.currentTarget.result);
      reader.readAsDataURL(theFile);
    };
  };
  const onClearAttachment = () => setAttachment(null);

  //

  const upload = () => {
    if (image == null) return;
    firebase
      .storage()
      .ref(`/images/${image.name}`)
      .put(image)
      .on("state_changed", alert("success"), alert);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={tweet}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
        <input type="file" onChange={onFileChange} accept="image/*" />
        {/*  */}
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={upload}>Upload</button>
        {/*  */}
        {attachment && (
          <>
            <img src={attachment} style={{ width: "50px" }} />
            <button onClick={onClearAttachment}>Clear</button>
          </>
        )}
      </form>

      {/* 목록 */}
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
