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
  toString,
  getDownloadURL,
} from "firebase/storage";
import Tweet from "../components/Tweet";
import { v4 as uuidv4 } from "uuid";
// 유튜브 링크 ㅡ https://www.youtube.com/watch?v=YOAeBSCkArA
// 두번쨰 https://acervolima.com/como-fazer-upload-de-arquivos-no-armazenamento-firebase-usando-reactjs/

// getDocs
// https://firebase.google.com/docs/firestore/quickstart
// https://firebase.google.com/docs/firestore/query-data/get-data
// REALTIME DATABASE - querySnapshot
// https://firebase.google.com/docs/firestore/query-data/listen
// 노마드코더-dbService = firebase.firestore()

function Home({ userObj }) {
  const db = getFirestore();
  const storage = getStorage();
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState([]);

  // CREAT

  const onSubmit = async (event) => {
    event.preventDefault();
    // 이미지 부분
    const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(attachmentRef, attachment, "data_url");
    const attachmentUrl = await getDownloadURL(
      attachmentRef,
      attachment,
      "data_url"
    );
    console.log(attachmentUrl);
    console.log(response);
    setAttachment("");

    // 댓글
    // const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
    // const response = await uploadString(fileRef, attachment, "data_url");
    // console.log(response);
    // 노마드코더
    // storageService = const storage = getStorage()
    // const attachmentRef =storaheService.ref().child(`${userObj.uid}/${uuidv4()}`)
    // const response = await attachmentRef.putString(attachment, "data_url")
    // const attachmentUrl = await Response.ref.getDownloadURL()
    // console.log(response)
    // 텍스트 부분
    const docRef = await addDoc(collection(db, "tweet"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setTweet("");
    // console.log(response);
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

  // STORAGE
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setAttachment(finishedEvent.currentTarget.result);
      console.log(finishedEvent.currentTarget);
    };
    reader.readAsDataURL(theFile);
  };

  console.log(tweets);
  const onClearAttachment = () => setAttachment(null);
  const onChange = (event) => {
    setTweet(event.target.value);
  };

  // const [image, setImage] = useState("");
  // const upload = () => {
  //   if (image == null) return;
  // storage
  //   .ref(`/images/${image.name}`)
  //   .put(image)
  //   .on("state_changed", alert("success"), alert);
  // };
  // const attachmentRef = ref(storage, `${userObj.uid}/${uuidv4()}`);

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
        {/*  */}
        {/* {attachment && ( */}
        <>
          <img src={attachment} style={{ width: "50px" }} />
          <button onClick={onClearAttachment}>Clear</button>
        </>
        {/* )} */}
      </form>
      {/* 목록 */}
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
        />
      ))}
      {/* <center>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button onClick={upload}>Upload</button>
      </center> */}
    </>
  );
}

export default Home;
