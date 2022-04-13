import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "firebase/storage";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; //랜덤 값

function TweetFactory({ userObj }) {
  const db = getFirestore();
  const storage = getStorage();
  const [tweet, setTweet] = useState("");
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
    //
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

  // STORAGE
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader(); // FileReader API
    reader.onloadend = (event) => {
      setAttachment(event.currentTarget.result); // URL
      console.log(event.currentTarget);
    };
    reader.readAsDataURL(theFile);
  };

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
            <button onClick={() => setAttachment(null)}>Clear</button>
          </>
        )}
      </form>
    </>
  );
}

export default TweetFactory;
