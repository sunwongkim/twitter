import React, { useState } from "react";
import { getFirestore, deleteDoc, updateDoc, doc } from "firebase/firestore";

function Tweet({ tweetObj, isOwner }) {
  const db = getFirestore();
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  // UPDATE
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "tweet", tweetObj.id), {
      text: newTweet,
    });
    setEditing(false);
    // 노마드코더
    // await dbService.doc(`tweets/${tweetObj.id}`).update({
    //   text: newTweet
    // });
  };

  // DELETE
  const onDeleteClick = async () => {
    const ok = window.confirm("sure delete?");
    console.log(ok);
    if (ok) {
      await deleteDoc(doc(db, "tweet", tweetObj.id));
      // 노마드코더 - await dbService.doc(`tweets/${tweetObj.id}`).delete();
    }
  };

  const onChange = (event) => {
    setNewTweet(event.target.value);
  };
  // 삭제<->취소
  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="input edit"
              value={newTweet}
              required
            />
            <input type="submit" value="Update Tweet" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Tweet;
