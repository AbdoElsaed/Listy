import React, { useState, useEffect } from "react";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

import { getUserByHandle } from "../../utils/api";

const Profile = ({ match }) => {
  const [otherUser, setOtherUser] = useState(null);
  const [loadingOtherUser, setLoadingOtherUser] = useState(false);

  const user = JSON.parse(localStorage.getItem("listyUser"));
  const currentUser = match.params.username === user.uniqueUrl ? true : false;

  useEffect(() => {
    (async () => {
      setLoadingOtherUser(true)
      const handle = match.params?.username;
      const token = JSON.parse(localStorage.getItem("token"));
      const result = await getUserByHandle(handle, token);
      if(result.err && result.err === 'invalid user name') {
        setOtherUser(null);
      } else {
        setOtherUser(result);
      }
      setLoadingOtherUser(false)
    })();
  }, []);

  return (
    <div>{currentUser ? <MyProfile /> : <OtherProfile handle={match.params.username} user={otherUser} loading={loadingOtherUser} />}</div>
  );
};

export default Profile;