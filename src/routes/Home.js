import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "firebase/storage";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from "uuid"; //랜덤 값
// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data
// REALTIME DATABASE - querySnapshot
// https://firebase.google.com/docs/firestore/query-data/listen

function Home({ userObj }) {
  const db = getFirestore();
  const storage = getStorage();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState(""); //이미지

  // CREAT
  // 경로 참조 생성 - 업로드 - URL로 다운로드
  const onSubmit = async (event) => {
    event.preventDefault();
    // 이미지 부분
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    console.log(attachmentUrl);
    setAttachment("");
    // 노마드코더
    // storageService = const storage = getStorage()
    // const attachmentRef =storaheService.ref().child(`${userObj.uid}/${uuidv4()}`)
    // const response = await attachmentRef.putString(attachment, "data_url")
    // const attachmentUrl = await Response.ref.getDownloadURL()
    // 텍스트 부분
    const tweetInfo = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "tweet"), tweetInfo);
    setTweet("");
  };

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

  // STORAGE
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader(); // FileReader API
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result); // URL
      console.log(finishedEvent.currentTarget);
    };
    reader.readAsDataURL(theFile);
  };

  console.log(tweets);
  const onClearAttachment = () => setAttachment(null);
  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* 트윗 */}
        <input
          type="text"
          onChange={onChange}
          value={tweet}
          placeholder="what's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" />
        {/* 사진 업로드 */}
        <input type="file" onChange={onFileChange} accept="image/*" />
        {attachment && (
          <>
            <img src={attachment} style={{ width: "50px" }} alt="preview" />
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
