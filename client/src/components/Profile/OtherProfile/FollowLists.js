import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";


import Followers from "../../modals/Followers";
import Following from "../../modals/Following";

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

function FollowLists({ user, followers, following, loading }) {
  const classes = useStyles();

  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

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
