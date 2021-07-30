import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import Followers from "../../modals/Followers";
import Following from "../../modals/Following";
import { useAuth } from "../../shared/Auth";

// import { getFollowersList } from "../../../utils/api";
// import { getFollowingList } from "../../../utils/api";

const useStyles = makeStyles((theme) => ({
  followLists: {
    marginBottom: 20,
    marginTop: 5,
  },
  btn: {
    textTransform: "capitalize",
    fontSize: 16,
    color: '#CCC'
  },
}));

function FollowLists() {
  const classes = useStyles();

  const { followers, following } = useAuth();


  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       let token = JSON.parse(localStorage.getItem("token"));
//       const followers = await getFollowersList(token);
//       setFollowers(followers);
//       const following = await getFollowingList(token);
//       setFollowing(following);
//       setLoading(false);
//     })();
//   }, []);

  const handleOpenFollowers = () => {
    setOpenFollowers(true);
  };

  const handleCloseFollowers = () => {
    setOpenFollowers(false);
  };

  const handleOpenFollowing = () => {
    setOpenFollowing(true);
  };

  const handleCloseFollowing = () => {
    setOpenFollowing(false);
  };

  return (
    <div>
      <ButtonGroup
        className={classes.followLists}
        disableElevation
        variant="text"
        color="secondary"
      >
        <Button className={classes.btn} onClick={handleOpenFollowers}>
          {followers.length} Followers
        </Button>
        <Button className={classes.btn} onClick={handleOpenFollowing}>
          {following.length} Following
        </Button>
      </ButtonGroup>

      <Followers
        open={openFollowers}
        setOpen={setOpenFollowers}
        handleOpen={handleOpenFollowers}
        handleClose={handleCloseFollowers}
        followers={followers}
      />

      <Following
        open={openFollowing}
        setOpen={setOpenFollowing}
        handleOpen={handleOpenFollowing}
        handleClose={handleCloseFollowing}
        following={following}
      />
    </div>
  );
}

export default FollowLists;
