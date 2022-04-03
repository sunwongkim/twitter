import React from "react";
import { getAuth } from "firebase/auth";
// import { useHistory } from "react-router-dom";

function Profile() {
  // const history = useHistory;
  const onLogOutClick = () => {
    getAuth().signOut();
    // history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>;
    </>
  );
}

export default Profile;
